<template>
  <v-dialog v-model="localShow">
    <v-card light>
      <v-btn
        fab
        style="position: fixed; top: 50px; right: 50px; z-index: 100"
        @click="localShow = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-img :src="imageFullScreenPath" class="image-full-screen" contain>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ImageEnlarge",
  props: {
    showDialog: Boolean,
    imageFullScreenPath: String,
  },
  computed: {
    localShow: {
      get() {
        return this.showDialog;
      },
      set(val) {
        this.$emit("update:showDialog", val);
      },
    },
  },
};
</script>

<style scoped>
.image-full-screen {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
