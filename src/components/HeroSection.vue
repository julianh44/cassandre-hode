<template>
  <section class="hero">
    <img src="@/assets/images/contact-fin.webp" alt="Cassandre Hodé avec un cheval" class="hero__photo" />
    <div class="hero__bubble">
      <h1 class="hero__name">Cassandre<br />Hodé</h1>
      <p class="hero__subtitle">Ostéopathe animalier</p>
      <a href="tel:+33671300321" class="hero__phone">06 71 30 03 21</a>
      <div class="hero__socials">
        <a href="https://www.facebook.com/profile.php?id=61582036331972" target="_blank" rel="noopener" aria-label="Facebook" class="hero__social">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.1 8.4h-1.6c-.6 0-.7.3-.7.7v1.3h2.3l-.3 2.3h-2v5.9h-2.4v-5.9H8.7v-2.3h1.7V8.9c0-1.7 1-2.6 2.6-2.6.7 0 1.4.1 1.4.1v1.6l-.3.4z"/></svg>
        </a>
        <a href="https://www.instagram.com/cassandre_osteoanimalier/" target="_blank" rel="noopener" aria-label="Instagram" class="hero__social">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.2 1.4C1.3 2.7.9 3.4.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 2.9.6 1.3.1 1.7.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-2.9.1-1.3.1-1.7.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.2C21.3 1.3 20.6.9 19.9.6 19.1.3 18.2.1 17 .1 15.7 0 15.3 0 12 0zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.8-10.4a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4z"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'HeroSection' }
</script>

<style scoped>
.hero {
  position: relative;
  background: var(--color-dark);
  min-height: calc(100vh - 92px);
  min-height: calc(100dvh - 92px);
  display: flex;
}
.hero__photo {
  width: 100%;
  display: block;
  object-fit: cover;
  object-position: 60% center;
  min-height: calc(100vh - 92px);
  min-height: calc(100dvh - 92px);
}
@media (min-width: 768px) {
  .hero,
  .hero__photo {
    min-height: calc(100vh - 102px);
    min-height: calc(100dvh - 102px);
  }
  .hero__photo {
    object-position: center;
  }
}
.hero__bubble {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: rgba(44, 18, 22, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  color: var(--color-cream);
}
.hero__name {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
}
.hero__subtitle {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
  font-weight: 400;
}
.hero__phone {
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-cream);
  border: 2px solid var(--color-cream);
  padding: 0.5rem 1rem;
}
.hero__socials {
  display: flex;
  gap: 1rem;
}
.hero__social {
  color: var(--color-cream);
}
@media (min-width: 768px) {
  .hero__bubble {
    bottom: 2rem;
    left: 2rem;
    padding: 2rem 2.5rem;
  }
  .hero__name {
    font-size: 3rem;
  }
  .hero__subtitle {
    font-size: 1rem;
  }
}
@media (min-width: 1200px) {
  .hero__bubble {
    bottom: 3rem;
    left: 3rem;
  }
  .hero__name {
    font-size: 3.5rem;
  }
}
</style>
