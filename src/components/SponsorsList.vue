<template>
  <v-list
    v-if="sponsors"
    color="transparent"
    style="text-align: center"
    class="mt-0 pt-0"
  >
    <v-list-item v-for="(sponsor, index) in sponsors" :key="index">
      <v-list-item-title class="text-lg-h4 headline">{{
        sponsor
      }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "SponsorsList",
  props: {
    sponsors: Array,
  },
};
</script>
