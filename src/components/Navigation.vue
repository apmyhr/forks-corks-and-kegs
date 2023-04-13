<template>
  <v-navigation-drawer
    v-model="localDrawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense>
      <template v-for="item in items">
        <v-list-item :key="item.text" @click="itemClick(item)">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list dense>
        <template v-for="item in itemsFooter">
          <v-list-item :key="item.text" @click="footerItemClick(item)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    items: Array,
    drawer: Boolean,
  },
  data: () => ({
    scrollOptions: {
      duration: 600,
      offset: 0,
      easing: "easeInOutCubic",
    },

    itemsFooter: [
      {
        icon: "mdi-comment",
        text: "Send Feedback",
        emit: "send-feedback",
      },
      {
        icon: "mdi-email",
        text: "Contact Us",
        emit: "contact-us",
      },
      {
        icon: "mdi-account-plus",
        text: "Register",
        emit: "register",
      },
    ],
  }),

  computed: {
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit("set-drawer", val);
      },
    },
  },

  methods: {
    itemClick(item) {
      this.$vuetify.goTo("#scroll-" + item.title, this.scrollOptions);
      this.$emit("set-drawer", this.$vuetify.breakpoint.lgAndUp);
    },
    footerItemClick(item) {
      this.$emit(item.emit);
    },
    onChange(val) {
      this.$emit("set-drawer", val);
    },
  },
};
</script>

<style></style>
