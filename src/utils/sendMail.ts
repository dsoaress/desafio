import nodemailer from 'nodemailer'

type Props = {
  subject: string
  html: string
}

const config = {
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER || 'julia.haag25@ethereal.email',
    pass: process.env.EMAIL_PASSWORD || 'rdaZvVx1ufpFPfZch9'
  }
}

const email = process.env.EMAIL_FROM || 'julia.haag25@ethereal.email'

export function sendEmail({ subject, html }: Props) {
  const transporter = nodemailer.createTransport(config)
  transporter.sendMail({ from: email, to: email, subject, html })
}
