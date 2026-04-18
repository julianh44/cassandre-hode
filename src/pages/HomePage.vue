<template>
  <div>
    <TheHeader />
    <main>
      <HeroSection />
      <PresentationSection />
      <OsteopathieSection />
      <BiomecanisteSection />
      <ContactSection />
    </main>
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
