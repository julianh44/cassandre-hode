# Osteo Cassandre Hodé — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Vue 3 vitrine site for Cassandre Hodé (animal osteopath) with a working contact form backend that sends emails via Nodemailer, packaged in Docker behind Traefik on `cassandre-hode-osteo.fr`.

**Architecture:** Mono-container Node app. Express serves the built Vue SPA as static files and exposes `POST /api/contact` which validates, rate-limits, and sends email through Nodemailer. Docker multi-stage build, deployed behind an existing Traefik instance via labels. Pattern cloned from the sibling `la-parenthese` project.

**Tech Stack:** Vue 3 (vue-cli), vue-router, fontsource, Express 5, Nodemailer, express-rate-limit, Docker, Traefik.

**Spec:** `docs/superpowers/specs/2026-04-15-osteo-cassandre-hode-design.md`

**Note on testing:** The spec explicitly excludes automated tests (small vitrine site for a single client). Verification happens through local smoke runs (`npm run serve`, `curl /api/contact`, visual check).

---

## Task 1: Scaffold the Vue 3 project

**Files:**
- Create: `package.json`
- Create: `vue.config.js`
- Create: `jsconfig.json`
- Create: `babel.config.js`
- Create: `.gitignore`
- Create: `public/index.html`
- Create: `public/favicon.ico` (copy from `Logos/`)
- Create: `src/main.js`
- Create: `src/App.vue`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "osteo-cassandre-hode",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "node server/index.js"
  },
  "dependencies": {
    "@fontsource/cormorant-garamond": "^5.2.8",
    "@fontsource/epilogue": "^5.2.8",
    "core-js": "^3.8.3",
    "express": "^5.2.1",
    "express-rate-limit": "^8.3.2",
    "nodemailer": "^8.0.4",
    "vue": "^3.2.13",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3"
  },
  "eslintConfig": {
    "root": true,
    "env": { "node": true, "vue/setup-compiler-macros": true },
    "extends": ["plugin:vue/vue3-essential", "eslint:recommended"],
    "parserOptions": { "parser": "@babel/eslint-parser" },
    "rules": {}
  },
  "browserslist": ["> 1%", "last 2 versions", "not dead", "not ie 11"]
}
```

- [ ] **Step 2: Create `vue.config.js`** (dev proxy for `/api`)

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
```

- [ ] **Step 3: Create `jsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": { "@/*": ["src/*"] },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  }
}
```

- [ ] **Step 4: Create `babel.config.js`**

```javascript
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
}
```

- [ ] **Step 5: Create `.gitignore`**

```
.DS_Store
node_modules
/dist
.env
.env.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.sw?
.idea
.vscode
```

- [ ] **Step 6: Create `public/index.html`**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title>Cassandre Hodé — Ostéopathe animalier</title>
    <meta name="description" content="Cassandre Hodé, ostéopathe animalier diplômée. Cheval, vache, chien, chat, NACS, petits ruminants. Secteur d'Ancenis, 44/49/85/53." />
  </head>
  <body>
    <noscript>Ce site nécessite JavaScript.</noscript>
    <div id="app"></div>
  </body>
</html>
```

- [ ] **Step 7: Create `src/main.js`**

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 8: Create `src/App.vue`**

```vue
<template>
  <router-view />
</template>
```

- [ ] **Step 9: Install dependencies**

```bash
cd /Users/julianhusson/IdeaProjects/osteo-cassandre-hode
npm install
```

Expected: deps install without errors. `node_modules/` appears.

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Vue 3 project"
```

---

## Task 2: Import client assets (logos + photos)

**Source:** `/Users/julianhusson/Documents/Clients/Osteo Cassandre Hode`

**Files:**
- Create: `src/assets/logo/logo-with-text.jpg`
- Create: `src/assets/logo/logo-mark.jpg`
- Create: `src/assets/images/*.jpg` (renamed from source)
- Copy: `public/favicon.ico` (optional, generate from logo-mark)

- [ ] **Step 1: Create target directories**

```bash
mkdir -p src/assets/logo src/assets/images src/assets/styles
```

- [ ] **Step 2: Copy and rename logos**

```bash
SRC="/Users/julianhusson/Documents/Clients/Osteo Cassandre Hode/Logos"
cp "$SRC/CH_LOGO HD avec texte v2.jpg" src/assets/logo/logo-with-text.jpg
cp "$SRC/CH_LOGO HD v2.jpg"            src/assets/logo/logo-mark.jpg
```

- [ ] **Step 3: Inspect photos to map them to roles**

Open each file in `/Users/julianhusson/Documents/Clients/Osteo Cassandre Hode/Photos` with the Read tool and identify which is which based on content (Cassandre + horse hero / cow legs / calf / horse back / hand-on-back ending shot). Produce a mapping like:

```
image0.jpeg     → hero-cheval.jpg
image1.jpeg     → osteo-vache.jpg
image2.jpeg     → osteo-veau.jpg
image1-1.jpeg   → osteo-cheval-dos.jpg
image0-1.jpeg   → contact-fin.jpg
image1 copie.jpeg → (backup, skip)
image2 copie.jpeg → (backup, skip)
```

- [ ] **Step 4: Copy photos with the identified names**

```bash
SRC="/Users/julianhusson/Documents/Clients/Osteo Cassandre Hode/Photos"
# Replace with actual mapping from step 3
cp "$SRC/image0.jpeg"   src/assets/images/hero-cheval.jpg
cp "$SRC/image1.jpeg"   src/assets/images/osteo-vache.jpg
cp "$SRC/image2.jpeg"   src/assets/images/osteo-veau.jpg
cp "$SRC/image1-1.jpeg" src/assets/images/osteo-cheval-dos.jpg
cp "$SRC/image0-1.jpeg" src/assets/images/contact-fin.jpg
```

- [ ] **Step 5: Commit**

```bash
git add src/assets
git commit -m "chore: import client logos and photos"
```

---

## Task 3: Global styles, fonts and color tokens

**Files:**
- Create: `src/assets/styles/main.css`

- [ ] **Step 1: Create `src/assets/styles/main.css`**

```css
@import "@fontsource/cormorant-garamond/400.css";
@import "@fontsource/cormorant-garamond/600.css";
@import "@fontsource/cormorant-garamond/700.css";
@import "@fontsource/epilogue/400.css";
@import "@fontsource/epilogue/500.css";
@import "@fontsource/epilogue/600.css";

:root {
  --color-bg: #EAC6B0;
  --color-dark: #3B1A1E;
  --color-cream: #F4E3D5;
  --color-accent: #D4A98B;

  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Epilogue", system-ui, sans-serif;

  --max-width: 720px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-bg);
  color: var(--color-dark);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-serif);
  font-weight: 600;
  letter-spacing: 0.05em;
}

a { color: inherit; text-decoration: none; }

img { max-width: 100%; display: block; }

.section {
  padding: 4rem 1.5rem;
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.section__title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 1rem;
}

.section__divider {
  width: 120px;
  height: 3px;
  background: var(--color-dark);
  margin: 0 auto 2rem;
  border: none;
}

.section p {
  margin: 0 0 1.2rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/assets/styles
git commit -m "feat: add global styles, fonts, color tokens"
```

---

## Task 4: Vue router (home + privacy page)

**Files:**
- Create: `src/router.js`
- Create: `src/pages/HomePage.vue` (stub)
- Create: `src/pages/PolitiqueConfidentialitePage.vue` (stub)

- [ ] **Step 1: Create `src/router.js`**

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/politique-confidentialite',
    name: 'politique',
    component: PolitiqueConfidentialitePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 2: Create `src/pages/HomePage.vue` (stub)**

```vue
<template>
  <main>
    <p>Home page — placeholder</p>
  </main>
</template>
```

- [ ] **Step 3: Create `src/pages/PolitiqueConfidentialitePage.vue` (stub)**

```vue
<template>
  <main>
    <h1>Politique de confidentialité</h1>
    <p>Placeholder.</p>
  </main>
</template>
```

- [ ] **Step 4: Verify dev server boots**

```bash
npm run serve
```

Expected: compiles, opens on `http://localhost:8080`, shows "Home page — placeholder". `Ctrl+C` to stop.

- [ ] **Step 5: Commit**

```bash
git add src/router.js src/pages
git commit -m "feat: add vue-router with home and privacy routes"
```

---

## Task 5: Backend — Express server + validate + mailer

**Files:**
- Create: `server/index.js`
- Create: `server/validate.js`
- Create: `server/mailer.js`
- Create: `.env.example`

- [ ] **Step 1: Create `server/validate.js`**

```javascript
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
```

- [ ] **Step 2: Create `server/mailer.js`**

```javascript
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

module.exports = transporter
```

- [ ] **Step 3: Create `server/index.js`**

```javascript
const path = require('path')
const express = require('express')
const rateLimit = require('express-rate-limit')
const transporter = require('./mailer')
const { isValidEmail, requireString } = require('./validate')

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

  // Honeypot: silently accept and discard
  if (website && String(website).trim() !== '') {
    return res.json({ ok: true })
  }

  const errors = []
  const nomErr = requireString(nom, 'Nom', { min: 1, max: 100 })
  if (nomErr) errors.push(nomErr)

  const telErr = requireString(telephone, 'Téléphone', { min: 5, max: 30 })
  if (telErr) errors.push(telErr)

  const emailErr = requireString(email, 'Email', { max: 150 })
  if (emailErr) errors.push(emailErr)
  else if (!isValidEmail(email)) errors.push('Email : adresse invalide')

  const messageErr = requireString(message, 'Message', { min: 1, max: 2000 })
  if (messageErr) errors.push(messageErr)

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  const text = `Nouveau message depuis cassandre-hode-osteo.fr

Nom : ${nom}
Téléphone : ${telephone}
Email : ${email}

Message :
${message}
`

  const html = `
    <h2>Nouveau message depuis cassandre-hode-osteo.fr</h2>
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

// Serve Vue SPA
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
```

- [ ] **Step 4: Create `.env.example`**

```
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=cassandrehode.oa@gmail.com
PORT=3000
```

- [ ] **Step 5: Smoke test the API (without real SMTP)**

Create a temporary `.env` with dummy values, start the server, hit the endpoint with missing fields, expect a 400.

```bash
cp .env.example .env
node server/index.js &
SERVER_PID=$!
sleep 1
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{}'
kill $SERVER_PID
```

Expected: `{"error":"Nom est requis, Téléphone : minimum 5 caractères, Email est requis, Message est requis"}`.

- [ ] **Step 6: Commit**

```bash
git add server .env.example
git commit -m "feat: add Express backend with /api/contact, validation, rate-limit"
```

---

## Task 6: Header + burger menu

**Files:**
- Create: `src/components/TheHeader.vue`
- Create: `src/components/BurgerMenu.vue`

- [ ] **Step 1: Create `src/components/BurgerMenu.vue`**

```vue
<template>
  <teleport to="body">
    <div v-if="open" class="burger-overlay" @click.self="$emit('close')">
      <button class="burger-close" aria-label="Fermer le menu" @click="$emit('close')">×</button>
      <nav class="burger-nav">
        <a href="#presentation" @click="$emit('close')">Présentation</a>
        <hr />
        <a href="#osteopathie" @click="$emit('close')">L'ostéopathie animale</a>
        <hr />
        <a href="#biomecaniste" @click="$emit('close')">La méthode biomécaniste</a>
        <hr />
        <a href="#contact" @click="$emit('close')">Comment me contacter ?</a>
      </nav>
      <img src="@/assets/logo/logo-mark.jpg" alt="" class="burger-logo" />
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'BurgerMenu',
  props: { open: Boolean },
  emits: ['close'],
}
</script>

<style scoped>
.burger-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-dark);
  color: var(--color-cream);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.burger-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--color-cream);
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
}
.burger-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
}
.burger-nav a {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 1rem 0;
}
.burger-nav hr {
  width: 40%;
  border: none;
  border-top: 1px solid var(--color-cream);
  margin: 0 auto;
  opacity: 0.5;
}
.burger-logo {
  width: 80px;
  margin-top: 3rem;
  opacity: 0.9;
}
</style>
```

- [ ] **Step 2: Create `src/components/TheHeader.vue`**

```vue
<template>
  <header class="header">
    <router-link to="/" class="header__logo">
      <img src="@/assets/logo/logo-with-text.jpg" alt="Cassandre Hodé — Ostéopathe animalier" />
    </router-link>
    <button class="header__burger" aria-label="Ouvrir le menu" @click="menuOpen = true">
      <span></span><span></span><span></span>
    </button>
    <BurgerMenu :open="menuOpen" @close="menuOpen = false" />
  </header>
</template>

<script>
import BurgerMenu from './BurgerMenu.vue'
export default {
  name: 'TheHeader',
  components: { BurgerMenu },
  data() {
    return { menuOpen: false }
  },
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-dark);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__logo img {
  height: 60px;
  width: auto;
}
.header__burger {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
}
.header__burger span {
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-cream);
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TheHeader.vue src/components/BurgerMenu.vue
git commit -m "feat: add header with burger menu"
```

---

## Task 7: Hero section

**Files:**
- Create: `src/components/HeroSection.vue`

- [ ] **Step 1: Create `src/components/HeroSection.vue`**

```vue
<template>
  <section class="hero">
    <div class="hero__image">
      <img src="@/assets/images/hero-cheval.jpg" alt="Cassandre Hodé avec un cheval" />
      <div class="hero__card">
        <a href="tel:+33671300321" class="hero__phone">06 71 30 03 21</a>
        <div class="hero__socials">
          <a href="#" aria-label="Facebook" class="hero__social">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="hero__social">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 2.9.6 1.3.1 1.7.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-2.9.1-1.3.1-1.7.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.9.6 19.1.3 18.2.1 17 .1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.8-10.4a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <p class="hero__registration">Inscrite au Registre National d'Aptitudes sous le numéro OA2381</p>
  </section>
</template>

<script>
export default { name: 'HeroSection' }
</script>

<style scoped>
.hero__image {
  position: relative;
}
.hero__image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 70vh;
}
.hero__card {
  position: absolute;
  bottom: 2rem;
  left: 1.5rem;
  background: rgba(59, 26, 30, 0.7);
  color: var(--color-cream);
  padding: 1rem 1.25rem;
  border-radius: 4px;
  backdrop-filter: blur(2px);
}
.hero__phone {
  display: inline-block;
  border: 1.5px solid var(--color-cream);
  padding: 0.5rem 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}
.hero__socials {
  display: flex;
  gap: 0.75rem;
  color: var(--color-cream);
}
.hero__social { color: inherit; }
.hero__registration {
  text-align: center;
  font-size: 0.9rem;
  padding: 1.5rem 1.5rem 0;
  margin: 0;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "feat: add hero section with photo, phone card, socials"
```

---

## Task 8: Présentation section

**Files:**
- Create: `src/components/PresentationSection.vue`

- [ ] **Step 1: Create `src/components/PresentationSection.vue`**

```vue
<template>
  <section id="presentation" class="section">
    <h2 class="section__title">Présentation</h2>
    <hr class="section__divider" />
    <p>
      Je m'appelle Cassandre Hodé, après 5 années d'études à Biopraxia Rennes j'ai obtenu mon diplôme d'ostéopathe animalier en 2025 puis validé mes compétences auprès du Conseil de l'Ordre National des Vétérinaires en 2026.
    </p>
    <p>
      Je suis installée sur le secteur d'Ancenis et me déplace dans un rayon de 1h aux alentours, comprenant les départements du 44, 49, 85 &amp; 53.
    </p>
    <p>
      Je pratique sur toutes les espèces :<br />
      cheval, vache, chien, chat, NACS, petits ruminants.
    </p>
  </section>
</template>

<script>
export default { name: 'PresentationSection' }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PresentationSection.vue
git commit -m "feat: add Présentation section"
```

---

## Task 9: Ostéopathie animale section

**Files:**
- Create: `src/components/OsteopathieSection.vue`

- [ ] **Step 1: Create `src/components/OsteopathieSection.vue`**

```vue
<template>
  <section id="osteopathie" class="section osteo">
    <h2 class="section__title">L'ostéopathie animale</h2>
    <hr class="section__divider" />
    <p>
      L'ostéopathie animale est une thérapie manuelle visant à harmoniser les structures du corps via le diagnostic et le traitement de troubles fonctionnels.
    </p>
    <p>
      L'objectif est de restaurer l'équilibre global du corps afin d'améliorer le bien-être de l'animal.
    </p>
    <blockquote class="osteo__quote">
      <span class="osteo__quote-mark">&ldquo;</span>
      L'ostéopathie ne soigne pas, elle donne les clés au corps pour qu'il s'auto-guérisse.
      <span class="osteo__quote-mark osteo__quote-mark--end">&rdquo;</span>
    </blockquote>
    <div class="osteo__grid">
      <img src="@/assets/images/osteo-vache.jpg" alt="Ostéopathie sur une vache" />
      <img src="@/assets/images/osteo-veau.jpg" alt="Ostéopathie sur un veau" />
      <img src="@/assets/images/osteo-cheval-dos.jpg" alt="Ostéopathie sur un cheval" />
    </div>
  </section>
</template>

<script>
export default { name: 'OsteopathieSection' }
</script>

<style scoped>
.osteo__quote {
  position: relative;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  border: 2px solid var(--color-dark);
  border-radius: 2rem;
  font-style: italic;
}
.osteo__quote-mark {
  font-family: var(--font-serif);
  font-size: 2rem;
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  background: var(--color-bg);
  padding: 0 0.3rem;
  line-height: 1;
}
.osteo__quote-mark--end {
  left: auto;
  right: 1rem;
  top: auto;
  bottom: -0.5rem;
}
.osteo__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: 2rem;
}
.osteo__grid img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
}
@media (max-width: 520px) {
  .osteo__grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/OsteopathieSection.vue
git commit -m "feat: add Ostéopathie animale section with quote and photo grid"
```

---

## Task 10: Biomécaniste section

**Files:**
- Create: `src/components/BiomecanisteSection.vue`

- [ ] **Step 1: Create `src/components/BiomecanisteSection.vue`**

```vue
<template>
  <section id="biomecaniste" class="section">
    <h2 class="section__title">La méthode biomécaniste</h2>
    <hr class="section__divider" />
    <p>
      C'est une méthode définit par la fusion de deux approches. L'une analytique et précise, l'autre globalisante.
    </p>
    <p>
      La méthode biomécaniste me permet ainsi d'avoir une vision précise et clair des phénomènes recrutés, associé à une vision plus étendue et globale afin de prendre en compte l'animal dans sa globalité et en lien avec son environnement.
    </p>
    <p>
      Cette complémentarité permet d'élaborer le diagnostic et le projet de prise en charge lors de la consultation.
    </p>
  </section>
</template>

<script>
export default { name: 'BiomecanisteSection' }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BiomecanisteSection.vue
git commit -m "feat: add Biomécaniste section (fluid centered text)"
```

---

## Task 11: Contact form component

**Files:**
- Create: `src/components/ContactForm.vue`

- [ ] **Step 1: Create `src/components/ContactForm.vue`**

```vue
<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="contact-form__row">
      <label>
        <span>NOM</span>
        <input v-model="form.nom" type="text" required maxlength="100" />
      </label>
      <label>
        <span>TÉLÉPHONE</span>
        <input v-model="form.telephone" type="tel" required maxlength="30" />
      </label>
    </div>
    <label>
      <span>MAIL</span>
      <input v-model="form.email" type="email" required maxlength="150" />
    </label>
    <label>
      <span>MESSAGE</span>
      <textarea v-model="form.message" rows="5" required maxlength="2000"></textarea>
    </label>
    <!-- Honeypot: hidden from real users -->
    <input
      v-model="form.website"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
      class="contact-form__honeypot"
    />
    <button type="submit" :disabled="loading" class="contact-form__submit">
      {{ loading ? 'ENVOI…' : 'ENVOYER' }}
    </button>
    <p v-if="success" class="contact-form__success">
      Merci, votre message a bien été envoyé.
    </p>
    <p v-if="error" class="contact-form__error">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      form: { nom: '', telephone: '', email: '', message: '', website: '' },
      loading: false,
      success: false,
      error: '',
    }
  },
  methods: {
    async submit() {
      this.loading = true
      this.success = false
      this.error = ''
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
          this.success = true
          this.form = { nom: '', telephone: '', email: '', message: '', website: '' }
        } else if (res.status === 429) {
          this.error = 'Trop de tentatives, réessayez dans quelques minutes.'
        } else {
          this.error = data.error || 'Une erreur est survenue.'
        }
      } catch (e) {
        this.error = 'Impossible de joindre le serveur.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.contact-form {
  border: 2px solid var(--color-dark);
  border-radius: 4px;
  padding: 1.5rem;
  margin: 2rem auto 0;
  max-width: 560px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.contact-form label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  font-weight: 500;
}
.contact-form input,
.contact-form textarea {
  border: none;
  border-bottom: 1.5px solid var(--color-dark);
  background: transparent;
  padding: 0.4rem 0;
  font-family: inherit;
  font-size: 1rem;
  color: var(--color-dark);
  outline: none;
  resize: vertical;
}
.contact-form__honeypot {
  position: absolute !important;
  left: -9999px !important;
  width: 1px;
  height: 1px;
}
.contact-form__submit {
  align-self: center;
  background: none;
  border: none;
  border-top: 1.5px solid var(--color-dark);
  padding: 0.8rem 2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
}
.contact-form__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.contact-form__success {
  color: #2a6e2a;
  text-align: center;
  font-weight: 500;
}
.contact-form__error {
  color: #9a2020;
  text-align: center;
  font-weight: 500;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.vue
git commit -m "feat: add contact form with honeypot and API wiring"
```

---

## Task 12: Contact section

**Files:**
- Create: `src/components/ContactSection.vue`

- [ ] **Step 1: Create `src/components/ContactSection.vue`**

```vue
<template>
  <section id="contact" class="section contact">
    <h2 class="section__title">Comment me contacter ?</h2>
    <hr class="section__divider" />
    <p>Téléphone : <a href="tel:+33671300321">06 71 30 03 21</a></p>
    <p>Mail : <a href="mailto:cassandrehode.oa@gmail.com">cassandrehode.oa@gmail.com</a></p>
    <div class="contact__socials">
      <a href="#" aria-label="Facebook">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
      </a>
      <a href="#" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 2.9.6 1.3.1 1.7.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-2.9.1-1.3.1-1.7.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.9.6 19.1.3 18.2.1 17 .1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.8-10.4a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4z"/></svg>
      </a>
    </div>
    <h3 class="contact__form-title">Formulaire de contact</h3>
    <ContactForm />
  </section>
</template>

<script>
import ContactForm from './ContactForm.vue'
export default { name: 'ContactSection', components: { ContactForm } }
</script>

<style scoped>
.contact__socials {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 1.5rem 0;
}
.contact__form-title {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.1em;
  margin: 1.5rem 0 0;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: add contact section wrapping form and coordinates"
```

---

## Task 13: Footer

**Files:**
- Create: `src/components/TheFooter.vue`

- [ ] **Step 1: Create `src/components/TheFooter.vue`**

```vue
<template>
  <footer class="footer">
    <div class="footer__top">
      <img src="@/assets/logo/logo-mark.jpg" alt="Logo Cassandre Hodé" class="footer__logo" />
      <div class="footer__socials">
        <a href="#" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>
        </a>
        <a href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 2.9.6 1.3.1 1.7.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-2.9.1-1.3.1-1.7.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.9.6 19.1.3 18.2.1 17 .1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.8-10.4a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4z"/></svg>
        </a>
      </div>
    </div>
    <router-link to="/politique-confidentialite" class="footer__privacy">
      Politique de confidentialité
    </router-link>
    <p class="footer__copyright">© 2026 Cassandre Hodé — Ostéopathe animalier</p>
  </footer>
</template>

<script>
export default { name: 'TheFooter' }
</script>

<style scoped>
.footer {
  background: var(--color-bg);
  color: var(--color-dark);
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--color-dark);
  text-align: center;
}
.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto 1.2rem;
}
.footer__logo { height: 60px; width: auto; }
.footer__socials { display: flex; gap: 1rem; color: var(--color-dark); }
.footer__privacy {
  display: inline-block;
  font-size: 0.9rem;
  text-decoration: underline;
  margin-bottom: 0.6rem;
}
.footer__copyright {
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.8;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TheFooter.vue
git commit -m "feat: add footer with logo, socials, privacy link, copyright"
```

---

## Task 14: Assemble HomePage and Politique page

**Files:**
- Modify: `src/pages/HomePage.vue`
- Modify: `src/pages/PolitiqueConfidentialitePage.vue`

- [ ] **Step 1: Replace `src/pages/HomePage.vue`**

```vue
<template>
  <div>
    <TheHeader />
    <HeroSection />
    <PresentationSection />
    <OsteopathieSection />
    <BiomecanisteSection />
    <ContactSection />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import PresentationSection from '@/components/PresentationSection.vue'
import OsteopathieSection from '@/components/OsteopathieSection.vue'
import BiomecanisteSection from '@/components/BiomecanisteSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'HomePage',
  components: {
    TheHeader,
    HeroSection,
    PresentationSection,
    OsteopathieSection,
    BiomecanisteSection,
    ContactSection,
    TheFooter,
  },
}
</script>
```

- [ ] **Step 2: Replace `src/pages/PolitiqueConfidentialitePage.vue`**

```vue
<template>
  <div>
    <TheHeader />
    <main class="section politique">
      <h1 class="section__title">Politique de confidentialité</h1>
      <hr class="section__divider" />

      <h2>Responsable du traitement</h2>
      <p>
        Cassandre Hodé, ostéopathe animalier, inscrite au Registre National d'Aptitudes sous le numéro OA2381.
        Téléphone : 06 71 30 03 21 — Mail : cassandrehode.oa@gmail.com.
      </p>

      <h2>Données collectées</h2>
      <p>
        Les données collectées via le formulaire de contact sont : nom, numéro de téléphone, adresse email et contenu du message. Aucune autre donnée n'est collectée automatiquement.
      </p>

      <h2>Finalité</h2>
      <p>
        Ces données sont utilisées uniquement pour répondre à votre demande de contact. Elles ne sont ni revendues, ni utilisées à des fins commerciales, ni intégrées à une quelconque newsletter.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les messages reçus sont conservés pendant une durée maximale de 3 ans à compter du dernier échange, puis supprimés.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur les données vous concernant. Pour les exercer, écrivez à cassandrehode.oa@gmail.com.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site ne dépose aucun cookie de traçage ni d'analyse d'audience.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé sur un serveur privé, géré par son administrateur. Pour toute question liée à l'hébergement, contactez le webmaster.
      </p>

      <p class="politique__back">
        <router-link to="/">← Retour à l'accueil</router-link>
      </p>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  name: 'PolitiqueConfidentialitePage',
  components: { TheHeader, TheFooter },
}
</script>

<style scoped>
.politique {
  text-align: left;
}
.politique h2 {
  font-family: var(--font-sans);
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.politique__back {
  margin-top: 2.5rem;
  text-align: center;
}
.politique__back a {
  text-decoration: underline;
}
</style>
```

- [ ] **Step 3: Run the dev server and visually verify the site**

Start Express backend in one terminal (needs a `.env` with dummy SMTP for now, or comment out the mailer require):

```bash
# Terminal 1: backend
node server/index.js
# Terminal 2: frontend
npm run serve
```

Open `http://localhost:8080`. Expected:
- Header with logo + burger
- Hero photo with phone card
- All 4 sections with correct text
- Footer with logo, socials, privacy link, copyright
- `/politique-confidentialite` renders the legal page
- Burger menu opens fullscreen overlay and anchors work

- [ ] **Step 4: Commit**

```bash
git add src/pages
git commit -m "feat: assemble home and privacy pages"
```

---

## Task 15: Dockerfile + docker-compose (prod + dev)

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `docker-compose.dev.yml`

- [ ] **Step 1: Create `Dockerfile`**

```dockerfile
# Stage 1: Build Vue SPA
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server/ ./server/
COPY --from=build /app/dist ./dist/
EXPOSE 3000
CMD ["node", "server/index.js"]
```

- [ ] **Step 2: Create `docker-compose.yml`**

```yaml
services:
  app:
    build: .
    container_name: osteo-cassandre-hode
    env_file: .env
    restart: unless-stopped
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=web"
      - "traefik.http.routers.osteohode.rule=Host(`cassandre-hode-osteo.fr`) || Host(`www.cassandre-hode-osteo.fr`)"
      - "traefik.http.routers.osteohode.entrypoints=websecure"
      - "traefik.http.routers.osteohode.tls=true"
      - "traefik.http.routers.osteohode.tls.certresolver=resolverhttp"
      - "traefik.http.services.osteohode.loadbalancer.server.port=3000"
      - "traefik.http.middlewares.osteohode-wwwredirect.redirectregex.regex=^https://www\\.cassandre-hode-osteo\\.fr/(.*)"
      - "traefik.http.middlewares.osteohode-wwwredirect.redirectregex.replacement=https://cassandre-hode-osteo.fr/$${1}"
      - "traefik.http.middlewares.osteohode-wwwredirect.redirectregex.permanent=true"
      - "traefik.http.routers.osteohode.middlewares=osteohode-wwwredirect"

networks:
  web:
    external: true
```

- [ ] **Step 3: Create `docker-compose.dev.yml`**

```yaml
services:
  app:
    build: .
    env_file: .env
    ports:
      - "3000:3000"
    restart: unless-stopped
```

- [ ] **Step 4: Build the Docker image locally to verify it works**

```bash
docker build -t osteo-cassandre-hode:local .
```

Expected: build succeeds, both stages complete without error.

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml docker-compose.dev.yml
git commit -m "chore: add Dockerfile and docker-compose for prod/dev"
```

---

## Task 16: Final verification

- [ ] **Step 1: Lint the project**

```bash
npm run lint
```

Expected: no errors. Fix any ESLint issue that appears.

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: `dist/` generated with `index.html` and hashed assets, no build error.

- [ ] **Step 3: Run the prod-like server (Express serves `dist/`)**

```bash
node server/index.js
```

Open `http://localhost:3000`. The site should render identically to `npm run serve`. Test navigating to `/politique-confidentialite` directly — must load thanks to the SPA fallback route.

- [ ] **Step 4: Smoke-test the API end-to-end**

With a real `.env` filled in (SMTP creds from `/Users/julianhusson/Documents/Clients/Osteo Cassandre Hode/Documents/identifiants.pages`):

```bash
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","telephone":"0600000000","email":"test@example.com","message":"Test message"}'
```

Expected: `{"ok":true}`. Confirm the mail arrives at `cassandrehode.oa@gmail.com`.

- [ ] **Step 5: Final commit if anything changed**

```bash
git status
git add -A
git commit -m "chore: final verification adjustments" || true
```

---

## Deployment notes (out of plan, for the user)

On the target server:

1. `git clone` the repo into the deploy folder (or `git pull` if updating).
2. Copy real `.env` onto the server (SMTP creds + `MAIL_TO`).
3. Make sure the external Docker network `web` exists: `docker network ls | grep web`.
4. `docker compose up -d --build`.
5. Check Traefik picks up the labels and issues the certificate for `cassandre-hode-osteo.fr`.
6. Point DNS `cassandre-hode-osteo.fr` and `www.cassandre-hode-osteo.fr` to the server IP.
