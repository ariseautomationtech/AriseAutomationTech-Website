import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
    try {
        const { name, email, company, useCase, description } = await req.json()

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // STARTTLS
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: `"Arise Website" <${process.env.GMAIL_USER}>`,
            to: "ariseautomationtech@gmail.com",
            replyTo: email,
            subject: `New Demo Request from ${name || "website visitor"}`,
            html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0d0d0d; color: #f0f0f0; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a2a;">
          <div style="padding: 28px 32px; background: linear-gradient(135deg, #7c3aed22, #6366f122); border-bottom: 1px solid #2a2a2a;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #818cf8;">New Inbound Lead</p>
            <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #f0f0f0;">Demo Request</h1>
          </div>

          <div style="padding: 28px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; width: 110px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 14px; font-weight: 600; color: #f0f0f0;">${name || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 14px; color: #818cf8;">
                  <a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email || "—"}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; vertical-align: top;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; font-size: 14px; color: #f0f0f0;">${company || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 12px; vertical-align: top;">Use Case</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1e1e1e;">
                  <span style="display: inline-block; font-size: 12px; font-weight: 600; color: #818cf8; background: #818cf822; border: 1px solid #818cf840; border-radius: 6px; padding: 3px 10px;">${useCase || "—"}</span>
                </td>
              </tr>
              ${description ? `
              <tr>
                <td style="padding: 14px 0 0; color: #888; font-size: 12px; vertical-align: top;">Details</td>
                <td style="padding: 14px 0 0; font-size: 14px; color: #ccc; line-height: 1.6; white-space: pre-wrap;">${description}</td>
              </tr>` : ""}
            </table>
          </div>

          <div style="padding: 16px 32px; background: #111; border-top: 1px solid #1e1e1e;">
            <p style="margin: 0; font-size: 11px; color: #555;">Sent from ariseautomationtech.com · Reply directly to respond to ${name || "this lead"}.</p>
          </div>
        </div>
      `,
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("Mail error:", err)
        return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
    }
}
