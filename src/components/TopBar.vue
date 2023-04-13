<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <span>{{ title }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text icon @click="toggleTheme">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopBar",
  data: () => ({
    title: "Forks, Corks, & Kegs",
  }),
  methods: {
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$cookies.set("darkTheme", this.$vuetify.theme.dark);
    },
  },
};
</script>

<style></style>
