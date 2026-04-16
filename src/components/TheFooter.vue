<template>
  <footer class="footer">
    <div class="footer__top">
      <img src="@/assets/logo/logo-mark.jpg" alt="Logo Cassandre Hodé" class="footer__logo" />
      <div class="footer__socials">
        <a href="#" aria-label="Facebook" class="footer__social">
          <svg viewBox="0 0 320 512" width="14" height="14" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
        </a>
        <a href="#" aria-label="Instagram" class="footer__social">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
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
.footer__logo {
  height: 80px;
  width: auto;
}
.footer__socials {
  display: flex;
  gap: 1rem;
  color: var(--color-dark);
}
.footer__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(48, 15, 22, 0.7);
  border-radius: 50%;
  color: var(--color-cream);
}
.footer__privacy {
  display: inline-block;
  font-size: 0.7rem;
  text-decoration: none;
  opacity: 0.7;
  margin-bottom: 0.3rem;
}
.footer__copyright {
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.8;
}
@media (min-width: 768px) {
  .footer {
    padding: 2.5rem 2.5rem;
  }
  .footer__logo {
    height: 100px;
  }
}
</style>
