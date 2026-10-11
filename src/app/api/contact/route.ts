import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Rate limit: 5 contact requests per 10 minutes
    const rateCheck = checkRateLimit(`contact:${ip}`, {
      intervalMs: 10 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait before submitting again or use direct email.",
          resetSeconds: rateCheck.resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.resetSeconds),
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    // Honeypot spam protection: if hidden field is filled, silently ignore
    if (body.botField || body.website) {
      return NextResponse.json({
        success: true,
        message: "Message received.",
      });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "Portfolio Inquiry";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Server-side validations
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email) || email.length > 120) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10 || message.length > 2500) {
      return NextResponse.json(
        { error: "Message must be between 10 and 2500 characters." },
        { status: 400 }
      );
    }

    // Optional MongoDB persistence if MONGODB_URI is provided
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri) {
      try {
        // Dynamic import to keep cold starts lean when not using DB
        const { MongoClient } = await import("mongodb").catch(() => ({ MongoClient: null }));
        if (MongoClient) {
          const client = new MongoClient(mongoUri);
          await client.connect();
          const db = client.db("portfolio");
          await db.collection("contact_submissions").insertOne({
            name,
            email,
            subject,
            message,
            ip,
            createdAt: new Date(),
          });
          await client.close();
        }
      } catch (dbErr) {
        console.warn("[API/contact] Optional MongoDB persistence skipped:", dbErr);
      }
    }

    // Check if an automated email service is configured
    // Mailto fallback link (always prepared)
    const mailtoFallback = `mailto:sameersheikh0288@gmail.com?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject} - from ${name}`
    )}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\nMessage:\n${message}`
    )}`;

    // SMTP Configuration (e.g. Gmail SMTP or custom host)
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || "sameersheikh0288@gmail.com";
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465;

    if (smtpPass) {
      try {
        const nodemailer = (await import("nodemailer")).default;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact - ${name}" <${smtpUser}>`,
          to: "sameersheikh0288@gmail.com",
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fafafa;">
              <h2 style="color: #0f172a; margin-top: 0;">New Portfolio Transmission</h2>
              <p style="color: #475569; font-size: 14px;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
              <p style="color: #475569; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
              <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 16px 0;" />
              <div style="color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                ${message}
              </div>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Sent via Sameer Ali's Portfolio Contact Form (SMTP).</p>
            </div>
          `,
        });

        return NextResponse.json({
          success: true,
          delivered: true,
          message: "Transmission delivered successfully! Sameer will review your message and reply shortly.",
        });
      } catch (smtpErr) {
        console.warn("[API/contact] SMTP transmission error:", smtpErr);
      }
    }

    // Honest fallback when SMTP credentials are not configured
    return NextResponse.json({
      success: true,
      delivered: false,
      mailtoFallback,
      message:
        "Message logged! Note: SMTP password is not configured in .env, so an automatic dispatch could not be confirmed. Click the button below to send directly via your email client.",
    });
  } catch (err: unknown) {
    console.error("[API/contact] Internal error:", err);
    return NextResponse.json(
      { error: "Unable to submit message at this time. Please email sameersheikh0288@gmail.com directly." },
      { status: 500 }
    );
  }
}
