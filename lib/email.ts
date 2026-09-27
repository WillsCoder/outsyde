import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email: string, otp: string) {
  await resend.emails.send({
    from: "Outsyde <no-reply@outsyde.org>",
    to: email,
    subject: `${otp} is your Outsyde verification code`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: ui-sans-serif, system-ui, sans-serif; background: #F4EFE6; margin: 0; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 20px; overflow: hidden;">
            <div style="background: #111110; padding: 32px; text-align: center;">
              <p style="color: #fff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; margin: 0;">
                O<span style="color: #FF5C2B;">ut</span>syde
              </p>
            </div>
            <div style="padding: 32px; text-align: center;">
              <h1 style="font-size: 20px; font-weight: 700; color: #111110; margin: 0 0 8px;">
                Your verification code
              </h1>
              <p style="font-size: 14px; color: #5F5E5A; margin: 0 0 32px;">
                Enter this code to verify your Outsyde account.
              </p>
              <div style="background: #F4EFE6; border-radius: 16px; padding: 24px; margin: 0 0 24px;">
                <p style="font-size: 48px; font-weight: 700; letter-spacing: 12px; color: #FF5C2B; margin: 0;">
                  ${otp}
                </p>
              </div>
              <p style="font-size: 13px; color: #888780; margin: 0;">
                This code expires in <strong>10 minutes</strong>.
              </p>
              <p style="font-size: 13px; color: #888780; margin: 8px 0 0;">
                If you didn't create an account, ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}
