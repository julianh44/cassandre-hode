<template>
  <section id="contact" class="section section--alt contact">
    <p class="section__subtitle">Prendre rendez-vous</p>
    <h2 class="section__title">Comment me contacter ?</h2>
    <hr class="section__divider" />
    <div class="contact__info">
      <a href="tel:+33671300321" class="contact__item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.3 1L6.6 10.8z"/></svg>
        06 71 30 03 21
      </a>
      <a href="mailto:cassandrehode.oa@gmail.com" class="contact__item">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        cassandrehode.oa@gmail.com
      </a>
    </div>
    <div class="contact__socials">
      <a href="#" aria-label="Facebook" class="contact__social">
        <svg viewBox="0 0 320 512" width="16" height="16" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
      </a>
      <a href="#" aria-label="Instagram" class="contact__social">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
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
.contact__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.contact__item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  font-weight: 500;
  transition: opacity 0.2s;
}
.contact__item:hover {
  opacity: 0.7;
}
.contact__socials {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
}
.contact__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(48, 15, 22, 0.08);
  border-radius: 50%;
  color: var(--color-dark);
  transition: background 0.2s;
}
.contact__social:hover {
  background: rgba(237, 198, 175, 0.25);
}
.contact__form-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.06em;
  margin: 2rem 0 0;
}
</style>
