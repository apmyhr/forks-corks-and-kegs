<template>
  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="my-12">
        <v-flex xs12 sm4>
          <v-card flat class="transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">PTO</div>
            </v-card-title>
            <v-card-text>{{ companyInfo }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4 offset-sm1>
          <v-card flat class="transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Contact us</div>
            </v-card-title>
            <v-card-text
              >For the latest updates follow along on social media.</v-card-text
            >
            <v-list class="transparent">
              <v-list-item
                @click="openUrl('https://www.instagram.com/standreweagles/')"
              >
                <v-list-item-action>
                  <v-icon class="red--text text--lighten-2"
                    >mdi-instagram</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>@standreweagles</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="
                  openUrl(
                    'https://www.facebook.com/pages/St%20Andrew%20The%20Apostle%20School/750492388378856/'
                  )
                "
              >
                <v-list-item-action>
                  <v-icon class="blue--text text--lighten-2"
                    >mdi-facebook</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    >St Andrew The Apostle School</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="openUrl('mailto:' + emailTo)">
                <v-list-item-action>
                  <v-icon class="yellow--text text--lighten-2"
                    >mdi-email</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ emailTo }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="
                  openUrl(
                    'https://www.google.com/maps/place/6720+Union+Mill+Rd,+Clifton,+VA+20124'
                  )
                "
              >
                <v-list-item-action>
                  <v-icon class="blue--text text--lighten-2"
                    >mdi-map-marker</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    >6720B Union Mill Rd, Clifton, VA 20124</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "BottomSection",
  props: {
    emailTo: String,
  },
  data: () => ({
    companyInfo:
      "The St Andrew School PTO serves the students of St Andrew the Apostle School in Clifton, Virginia.  We are a 501(c)3 non-profit organization.  All funds raised through Forks, Corks & Kegs goes directly to the talented students of St Andrew’s",
  }),
  methods: {
    openUrl(URL) {
      window.open(URL, "_blank");
    },
  },
};
</script>

<style></style>
