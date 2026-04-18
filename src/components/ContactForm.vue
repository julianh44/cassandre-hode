<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="contact-form__row">
      <label>
        <span>NOM</span>
        <input v-model="form.nom" type="text" required maxlength="100" />
      </label>
      <label>
        <span>TÉLÉPHONE</span>
        <input
          v-model="form.telephone"
          type="tel"
          required
          maxlength="30"
          pattern="^(\+33|0)[\s.\-]?[1-9](?:[\s.\-]?\d{2}){4}$"
          title="Numéro français, ex. 06 71 30 03 21"
        />
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
    <input
      v-model="form.website"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
      class="contact-form__honeypot"
      aria-hidden="true"
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
  position: relative;
  background: rgba(44, 18, 22, 0.04);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  margin: 0;
  max-width: none;
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
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  font-weight: 500;
  text-transform: uppercase;
  min-width: 0;
}
.contact-form input,
.contact-form textarea {
  border: none;
  border-bottom: 1.5px solid rgba(44, 18, 22, 0.25);
  background: transparent;
  padding: 0.5rem 0;
  font-family: inherit;
  font-size: 1rem;
  color: var(--color-dark);
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.contact-form input:focus,
.contact-form textarea:focus {
  border-bottom-color: var(--color-dark);
}
.contact-form__honeypot {
  position: absolute !important;
  left: -9999px !important;
  width: 1px;
  height: 1px;
}
.contact-form__submit {
  align-self: center;
  background: var(--color-dark);
  color: var(--color-cream);
  border: none;
  border-radius: 6px;
  padding: 0.9rem 2.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  transition: opacity 0.2s;
}
.contact-form__submit:hover {
  opacity: 0.85;
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
@media (min-width: 768px) {
  .contact-form {
    padding: 2.5rem 3rem;
  }
}
</style>
