function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isValidPhone(v) {
  if (typeof v !== 'string') return false
  const cleaned = v.replace(/[\s.\-()]/g, '')
  return /^(?:\+33|0)[1-9]\d{8}$/.test(cleaned)
}

function requireString(val, name, { min = 1, max = 1000 } = {}) {
  if (typeof val !== 'string' || !val.trim()) return `${name} est requis`
  const trimmed = val.trim()
  if (trimmed.length < min) return `${name} : minimum ${min} caractères`
  if (trimmed.length > max) return `${name} : maximum ${max} caractères`
  return null
}

module.exports = { isValidEmail, isValidPhone, requireString }
