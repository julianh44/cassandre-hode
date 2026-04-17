<template>
  <section id="contact" class="section section--alt contact">
    <p class="section__subtitle">Prendre rendez-vous</p>
    <h2 class="section__title">Comment me contacter ?</h2>
    <hr class="section__divider" />
    <div class="contact__layout">
      <div class="contact__left">
        <div class="contact__info">
          <a href="tel:+33671300321" class="contact__item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .6 3.6 1 1 0 0 1-.3 1L6.6 10.8z"/></svg>
            06 71 30 03 21
          </a>
          <a href="mailto:cassandrehode.oa@gmail.com" class="contact__item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            cassandrehode.oa@gmail.com
          </a>
          <p class="contact__item contact__item--text">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5z"/></svg>
            Ancenis et alentours (44, 49, 85, 53)
          </p>
        </div>
        <div class="contact__socials">
          <a href="#" aria-label="Facebook" class="contact__social">
            <svg viewBox="0 0 320 512" width="14" height="14" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" class="contact__social">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
        </div>
        <img src="@/assets/images/hero-cheval.webp" alt="Mains sur un cheval" class="contact__photo" />
      </div>
      <div class="contact__right">
        <h3 class="contact__form-title">Formulaire de contact</h3>
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script>
import ContactForm from './ContactForm.vue'
export default { name: 'ContactSection', components: { ContactForm } }
</script>

<style scoped>
.contact__layout {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.contact__left {
  text-align: left;
}
.contact__info {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}
.contact__item {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.95rem;
  font-weight: 500;
  transition: opacity 0.2s;
}
.contact__item:hover {
  opacity: 0.7;
}
.contact__item--text {
  margin: 0;
}
.contact__item--text:hover {
  opacity: 1;
}
.contact__socials {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.contact__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(44, 18, 22, 0.08);
  border-radius: 50%;
  color: var(--color-dark);
  transition: background 0.2s;
}
.contact__social:hover {
  background: rgba(44, 18, 22, 0.15);
}
.contact__photo {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  object-position: center 40%;
  border-radius: 10px;
}
.contact__right {
  text-align: left;
}
.contact__form-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 1.3rem;
  letter-spacing: 0.06em;
  margin: 0 0 1.2rem;
  text-transform: uppercase;
}
@media (min-width: 768px) {
  .contact__layout {
    flex-direction: row;
    gap: 3rem;
    align-items: flex-start;
  }
  .contact__left {
    flex: 1;
    padding-top: 2.8rem;
  }
  .contact__right {
    flex: 1.2;
  }
  .contact__photo {
    max-height: 200px;
  }
}
</style>
