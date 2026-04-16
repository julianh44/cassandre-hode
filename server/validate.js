function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function requireString(val, name, { min = 1, max = 1000 } = {}) {
  if (typeof val !== 'string' || !val.trim()) return `${name} est requis`
  const trimmed = val.trim()
  if (trimmed.length < min) return `${name} : minimum ${min} caractères`
  if (trimmed.length > max) return `${name} : maximum ${max} caractères`
  return null
}

module.exports = { isValidEmail, requireString }
