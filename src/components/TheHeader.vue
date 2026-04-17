<template>
  <header class="header">
    <router-link to="/" class="header__logo">
      <img src="@/assets/logo/logo-with-text.webp" alt="Cassandre Hodé — Ostéopathe animalier" />
    </router-link>
    <nav class="header__nav">
      <a href="#presentation">Présentation</a>
      <a href="#osteopathie">L'ostéopathie animale</a>
      <a href="#biomecaniste">La méthode biomécaniste</a>
      <a href="#contact">Contact</a>
    </nav>
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
.header__nav {
  display: none;
  gap: 2rem;
  align-items: center;
}
.header__nav a {
  color: var(--color-cream);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
  transition: opacity 0.2s;
}
.header__nav a:hover {
  opacity: 0.7;
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
@media (min-width: 768px) {
  .header {
    padding: 1rem 2.5rem;
  }
  .header__logo img {
    height: 70px;
  }
}
@media (min-width: 960px) {
  .header {
    padding: 1rem 3rem;
  }
  .header__nav {
    display: flex;
  }
  .header__burger {
    display: none;
  }
}
</style>
