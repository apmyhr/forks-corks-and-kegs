<template>
  <section dark>
    <v-parallax src="@/assets/wine_cheese2.jpg" height="700">
      <v-layout column align-center justify-center class="white--text">
        <span class="text-lg-h1 text-h3 ma-4 pt-4 text-center">{{
          title
        }}</span>
        <div class="text-lg-h5 text-subtitle-2 mb-4 text-center">
          {{ date }}
        </div>
        <img src="@/assets/logo.png" alt="Vuetify.js" height="300" />
        <v-btn
          class="mt-12"
          color="blue lighten-2"
          dark
          large
          @click="openUrl(handbidWebsite)"
          >Register</v-btn
        >
        <v-btn
          class="mt-12"
          color="green lighten-2"
          dark
          large
          @click="openFlyer"
          >View the Flyer</v-btn
        >
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
const PDF_NAME = "2023-ForksCorksKegs-Flyer.pdf";

export default {
  name: "TopSection",
  props: {
    handbidWebsite: String,
  },
  data: () => ({
    title: "Forks, Corks, & Kegs",
    date: "Saturday, May 20th 2023 at 6:00 PM",
  }),
  methods: {
    openUrl(URL) {
      window.open(URL, "_blank");
    },
    openFlyer() {
      window.open(PDF_NAME, "_blank");
    },
  },
};
</script>

<style></style>
