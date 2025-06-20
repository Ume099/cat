import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

export async function POST(req: Request) {
  const data = await req.json();

  const transporter = createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_PASS, // アプリパスワード
    },
    secure: true,
  });

  const toHostMailData: Options = {
    from: process.env.MAIL_SENDER,
    to: `${process.env.MAIL_RECEIVER},${process.env.MAIL_RECEIVER2}`,
    subject: `回答されました。`,
    html: `
      <p>
        1: 
        <a href="https://cat-cat-delta.vercel.app/">https://cat-cat-delta.vercel.app${data.no1}</a><br>
        2: 
        <a href="https://cat-cat-delta.vercel.app/">https://cat-cat-delta.vercel.app${data.no2}</a><br>
      </p>
      <p>
        <a href="https://cat-cat-delta.vercel.app/">https://cat-cat-delta.vercel.app/</a>
      </p>
    `,
  };

  try {
    await transporter.sendMail(toHostMailData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("送信エラー:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
