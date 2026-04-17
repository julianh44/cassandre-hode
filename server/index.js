const path = require('path')
const express = require('express')
const rateLimit = require('express-rate-limit')
const transporter = require('./mailer')
const { isValidEmail, isValidPhone, requireString } = require('./validate')

const app = express()
const PORT = process.env.PORT || 3000
const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER
const MAIL_TO = process.env.MAIL_TO || 'cassandrehode.oa@gmail.com'

app.set('trust proxy', 1)
app.use(express.json())

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', apiLimiter)

app.post('/api/contact', async (req, res) => {
  const { nom, telephone, email, message, website } = req.body || {}

  if (website && String(website).trim() !== '') {
    return res.json({ ok: true })
  }

  const errors = []
  const nomErr = requireString(nom, 'Nom', { min: 1, max: 100 })
  if (nomErr) errors.push(nomErr)

  const telErr = requireString(telephone, 'Téléphone', { min: 5, max: 30 })
  if (telErr) errors.push(telErr)
  else if (!isValidPhone(telephone)) errors.push('Téléphone : numéro invalide')

  const emailErr = requireString(email, 'Email', { max: 150 })
  if (emailErr) errors.push(emailErr)
  else if (!isValidEmail(email)) errors.push('Email : adresse invalide')

  const messageErr = requireString(message, 'Message', { min: 1, max: 2000 })
  if (messageErr) errors.push(messageErr)

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  const text = `Nom : ${nom}
Téléphone : ${telephone}
Email : ${email}

Message :
${message}
`

  const html = `
    <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(telephone)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: `Nouveau message — site cassandre-hode-osteo.fr`,
      text,
      html,
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return res.status(500).json({ error: "Erreur lors de l'envoi du message" })
  }
})

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
