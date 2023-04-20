<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(photo, index) in photos"
        :key="index"
        class="d-flex child-flex"
        cols="4"
        @click="showPhoto(photo)"
      >
        <v-card light flat tile class="d-flex">
          <v-img
            :src="photo"
            aspect-ratio="1"
            :contain="overrideContain(photo)"
          >
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const OVERRIDE_CONTAINS = [
  "/sponsors2023/CheronOrthodontics.jpg",
  "/sponsors2023/CasanelVineyardsWinery.png",
  "/sponsors2023/CentrevilleDance.png",
  "/sponsors2022/TheFruitfulForest.png",
  "/sponsors2022/Tucked Away Logo 2.png",
];

export default {
  name: "PhotosGrid",
  props: {
    photos: Array,
  },
  methods: {
    overrideContain(photo) {
      //Need to use Contain on this one photo because it shows "UCKED"
      return OVERRIDE_CONTAINS.includes(photo);
    },
    showPhoto(photo) {
      this.$emit("show-photo", photo);
    },
  },
};
</script>

<style></style>
