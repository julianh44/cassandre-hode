<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__col footer__col--brand">
        <img src="@/assets/logo/logo-mark-dark.webp" alt="Logo Cassandre Hodé" class="footer__logo" />
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Navigation</h4>
        <ul class="footer__list">
          <li><a href="#presentation">Présentation</a></li>
          <li><a href="#osteopathie">L'ostéopathie animale</a></li>
          <li><a href="#biomecaniste">La méthode biomécaniste</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Contact</h4>
        <ul class="footer__list">
          <li><a href="tel:+33671300321">06 71 30 03 21</a></li>
          <li><a href="mailto:cassandrehode.oa@gmail.com">cassandrehode.oa@gmail.com</a></li>
          <li class="footer__zone">Ancenis et alentours<br />(44, 49, 85, 53)</li>
        </ul>
      </div>
      <div class="footer__col footer__col--socials">
        <div class="footer__socials">
          <a href="https://www.facebook.com/profile.php?id=61582036331972" target="_blank" rel="noopener" aria-label="Facebook" class="footer__social">
            <svg viewBox="0 0 320 512" width="14" height="14" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
          </a>
          <a href="https://www.instagram.com/cassandre_osteoanimalier/" target="_blank" rel="noopener" aria-label="Instagram" class="footer__social">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <router-link to="/politique-confidentialite" class="footer__privacy">
        Politique de confidentialité
      </router-link>
      <p class="footer__copyright">© 2026 Cassandre Hodé — Ostéopathe animalier</p>
    </div>
  </footer>
</template>

<script>
export default { name: 'TheFooter' }
</script>

<style scoped>
.footer {
  background: var(--color-dark);
  color: var(--color-cream);
  padding: 2.5rem 1.5rem 1.5rem;
}
.footer__top {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: var(--max-width);
  margin: 0 auto 2rem;
}
.footer__col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.9rem;
}
.footer__col--brand {
  gap: 1rem;
}
.footer__logo {
  height: 110px;
  width: auto;
  border-radius: 8px;
}
.footer__heading {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
  opacity: 0.95;
}
.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.footer__list a {
  font-size: 0.85rem;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.footer__list a:hover {
  opacity: 1;
}
.footer__zone {
  font-size: 0.85rem;
  opacity: 0.75;
  line-height: 1.4;
}
.footer__socials {
  display: flex;
  gap: 0.75rem;
}
.footer__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  color: var(--color-cream);
  transition: background 0.2s;
}
.footer__social:hover {
  background: rgba(255, 255, 255, 0.18);
}
.footer__bottom {
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
}
.footer__privacy {
  font-size: 0.75rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.footer__privacy:hover {
  opacity: 1;
}
.footer__copyright {
  font-size: 0.8rem;
  margin: 0;
  opacity: 0.6;
}
@media (min-width: 768px) {
  .footer {
    padding: 3rem 2.5rem 1.8rem;
  }
  .footer__top {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 3rem;
  }
  .footer__col {
    align-items: flex-start;
    text-align: left;
    flex: 1;
  }
  .footer__col--brand {
    flex: 0 0 auto;
  }
  .footer__col--socials {
    flex: 0 0 auto;
    align-self: flex-end;
    align-items: flex-end;
  }
  .footer__logo {
    height: 130px;
  }
  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>
