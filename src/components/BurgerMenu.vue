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
  border-radius: 50%;
}
</style>
