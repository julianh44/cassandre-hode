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
