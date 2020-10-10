import got from 'got'

// Mailer URL from https://mailer.reaper.im/
const mailerURL = process.env.MAILER_URL

export default function sendEmail ({ msg, to, body }) {
  return got.post(mailerURL, {
    json: {
      to: to,
      subject: msg,
      // Prefer using Text Body but you are free to send html
      html: body
    }
  })
}
