<template>
  <v-dialog v-model="localShow" width="450">
    <v-card dark>
      <v-card-text
        style="max-height: calc(80vh); overflow-y: scroll"
        class="ma-0 pa-0"
      >
        <v-list>
          <v-list-item
            v-for="(item, index) in auctionThanksJson"
            v-bind:key="index"
            @click="openUrl(item.url)"
          >
            <v-list-item-icon>
              <v-icon color="yellow">mdi-star</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-btn icon color="info">
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" text @click="localShow = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import auctionJson from "../../auctionThanks.json";

export default {
  name: "Auction",
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

    auctionThanksJson() {
      if (auctionJson) {
        return auctionJson;
      } else {
        return [];
      }
    },
  },
  methods: {
    openUrl(URL) {
      window.open(URL, "_blank");
    },
  },
};
</script>

<style></style>
