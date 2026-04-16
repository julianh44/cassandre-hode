<template>
  <div>
    <TheHeader />
    <main class="section politique">
      <h1 class="section__title">Politique de confidentialité</h1>
      <hr class="section__divider" />

      <h2>Responsable du traitement</h2>
      <p>
        Cassandre Hodé, ostéopathe animalier, inscrite au Registre National d'Aptitudes sous le numéro OA2381.
        Téléphone : 06 71 30 03 21 — Mail : cassandrehode.oa@gmail.com.
      </p>

      <h2>Données collectées</h2>
      <p>
        Les données collectées via le formulaire de contact sont : nom, numéro de téléphone, adresse email et contenu du message. Aucune autre donnée n'est collectée automatiquement.
      </p>

      <h2>Finalité</h2>
      <p>
        Ces données sont utilisées uniquement pour répondre à votre demande de contact. Elles ne sont ni revendues, ni utilisées à des fins commerciales, ni intégrées à une quelconque newsletter.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les messages reçus sont conservés pendant une durée maximale de 3 ans à compter du dernier échange, puis supprimés.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur les données vous concernant. Pour les exercer, écrivez à cassandrehode.oa@gmail.com.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site ne dépose aucun cookie de traçage ni d'analyse d'audience.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé sur un serveur privé, géré par son administrateur. Pour toute question liée à l'hébergement, contactez le webmaster.
      </p>

      <p class="politique__back">
        <router-link to="/">← Retour à l'accueil</router-link>
      </p>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  name: 'PolitiqueConfidentialitePage',
  components: { TheHeader, TheFooter },
}
</script>

<style scoped>
.politique {
  text-align: left;
}
.politique h2 {
  font-family: var(--font-sans);
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.politique__back {
  margin-top: 2.5rem;
  text-align: center;
}
.politique__back a {
  text-decoration: underline;
}
</style>
