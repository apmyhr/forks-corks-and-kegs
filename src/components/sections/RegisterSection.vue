<template>
  <section>
    <v-parallax src="@/assets/beer.jpg" height="380">
      <v-layout column align-center justify-center>
        <div class="headline outlined-picture-text mb-4 text-center">
          {{ "Unlimited Food & Drinks" }}
        </div>
        <em class="outlined-picture-text">Register today!</em>
        <v-btn
          class="mt-12"
          color="blue lighten-2"
          dark
          large
          @click="openUrl(handbidWebsite)"
          >Register</v-btn
        >
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
export default {
  name: "RegisterSection",
  props: {
    handbidWebsite: String,
  },
  data: () => ({}),
  methods: {
    openUrl(URL) {
      window.open(URL, "_blank");
    },
  },
};
</script>

<style scoped>
.outlined-picture-text {
  font-weight: bold;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
}
</style>
