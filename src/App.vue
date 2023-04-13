<template>
  <v-app dark>
    <TopBar @toggle-drawer="toggleDrawer" />
    <Navigation
      :drawer="drawer"
      :items="items"
      @set-drawer="setDrawer"
      @send-feedback="sendFeedback"
      @contact-us="contactUs"
      @register="register"
    />

    <v-main>
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

      <section
        v-for="(item, index) in items"
        v-bind:key="index"
        :id="'scroll-' + item.title"
      >
        <v-layout column wrap class="my-12" align-center>
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <v-icon x-large class="blue--text text--lighten-2">{{
                item.icon
              }}</v-icon>
              <h2 class="text-lg-h4 headline">{{ item.text }}</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex
                  xs12
                  v-for="(paragraph, index) in item.paragraphs"
                  v-bind:key="index"
                >
                  <v-card flat class="transparent">
                    <v-card-text
                      class="text-lg-h5"
                      v-html="paragraph"
                    ></v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-layout v-if="item.title == 'Auction'" row wrap align-center>
                <v-flex xs12> </v-flex>
              </v-layout>
              <v-layout v-if="item.title == 'Auction'" row wrap align-center>
                <v-flex xs12>
                  <span class="subtitle-1 centerElement"
                    >A Special Thank you to Our 2019 Auction Donors</span
                  >
                  <v-btn
                    color="success"
                    class="centerElement"
                    @click="showAuctionThanks = true"
                    >View Donors</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-list
          v-if="item.sponsors"
          color="transparent"
          style="text-align: center"
          class="mt-0 pt-0"
        >
          <v-list-item v-for="(sponsor, index) in item.sponsors" :key="index">
            <v-list-item-title class="text-lg-h4 headline">{{
              sponsor
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-container v-if="item.photos">
          <v-row>
            <v-col
              v-for="(photo, index) in item.photos"
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
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
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
      </section>

      <section>
        <v-parallax src="@/assets/beer.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline outlinedPictureText mb-4 text-center">
              {{ "Unlimited Food & Drinks" }}
            </div>
            <em class="outlinedPictureText">Register today!</em>
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

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">PTO</div>
                </v-card-title>
                <v-card-text v-text="companyInfo"></v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text
                  >For the latest updates follow along on social
                  media.</v-card-text
                >
                <v-list class="transparent">
                  <v-list-item
                    @click="
                      openUrl('https://www.instagram.com/standreweagles/')
                    "
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
                        >6720B Union Mill Rd, Clifton, VA
                        20124</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer color="blue darken-2">
        <!-- <v-layout row wrap align-center>
          <v-flex xs12>
        <div class="white--text ml-4">-->
        <v-icon class="red--text">mdi-glass-wine</v-icon>
        <v-spacer></v-spacer>
        <a class="white--text" href="http://www.st-andrew.org/" target="_blank"
          >St. Andrew the Apostle</a
        >
        <v-spacer></v-spacer>
        <v-icon class="amber--text">mdi-beer</v-icon>
        <!-- </div>
          </v-flex>
        </v-layout>-->
      </v-footer>
    </v-main>

    <Register :showDialog.sync="registerDialog" />

    <ImageEnlarge
      :showDialog.sync="imageFullScreen"
      :imageFullScreenPath="imageFullScreenPath"
    />

    <Auction
      :showDialog.sync="showAuctionThanks"
      :imageFullScreenPath="imageFullScreenPath"
    />
  </v-app>
</template>

<script>
//Components
import TopBar from "./components/TopBar.vue";
import Navigation from "./components/Navigation.vue";
import Auction from "./components/dialogs/Auction.vue";
import ImageEnlarge from "./components/dialogs/ImageEnlarge.vue";
import Register from "./components/dialogs/Register.vue";

const HANDBID_WEBSITE =
  "https://events.handbid.com/auctions/forks-corks-and-kegs-2023";
const PDF_NAME = "2023-ForksCorksKegs-Flyer.pdf";

export default {
  name: "App",

  components: {
    TopBar,
    Navigation,
    Auction,
    ImageEnlarge,
    Register,
  },

  created() {
    if (!this.$cookies.isKey("darkTheme")) {
      console.log("No cookie");
      this.$cookies.set("darkTheme", true);
    }

    let darkTheme = this.$cookies.get("darkTheme");
    console.log("darkTheme: " + darkTheme);
    this.$vuetify.theme.dark = darkTheme == "true"; //darkTheme will be a string
  },

  data: () => ({
    showAuctionThanks: false,
    imageFullScreen: false,
    imageFullScreenPath: "",
    registerDialog: false,
    title: "Forks, Corks, & Kegs",
    date: "Saturday, May 20th 2023 at 6:00 PM",
    drawer: null,
    items: [
      {
        icon: "mdi-home",
        title: "Home",
        text: "Home",
        paragraphs: [
          "St. Andrew the Apostle School PTO will be hosting the fourth annual Forks,Corks, & Kegs on Saturday, May 20, 2023",
          "This exciting tasting festival in Clifton, Virginia will include local breweries, wineries, and food trucks, a live band, as well as a silent auction and raffles. Your ticket includes all-you-can-eat and drink, plus a tasting glass.",
          "Past silent auctions have included local beach house vacations, tropical resort vacations, prime seats to a Washington Capitals game, Washington Nationals Diamond Club tickets, Virginia winery tours and more!",
          "All proceeds from Forks, Corks, & Kegs go to the St Andrew’s School PTO to help support our talented students. Past PTO funds have been used to purchase a new preschool playground, Robotics Club, ActiveBoards, Science Lab curriculum, textbooks, a new school website, field trips, school assemblies, and an iPad library for classroom use.",
        ],
      },
      {
        icon: "mdi-ticket",
        title: "Tickets",
        text: "Tickets",
        paragraphs: [
          `Tickets can be purchased on the <a href='${HANDBID_WEBSITE}'>Handbid website</a> for $55 during Catholic Schools Week Special, Jan. 30th - Feb 5th, $65 before May 15th, and $75 the week of the event. Each ticket includes all you can eat food at the food trucks, all you can drink beer and wine, and a tasting glass.`,
        ],
      },
      {
        icon: "mdi-gift-outline",
        text: "Sponsors",
        paragraphs: [
          "​​Thank you to last year’s generous sponsors!  Our list of sponsors for this year is coming soon. If you are interested in being a sponsor for 2023, please <a href='mailto:lofar9ex56@gmail.com'>contact us</a> for details",
        ],
        photos: [
          "/sponsors2022/TheFruitfulForest.png",
          "/sponsors2022/MSB.png",
          "/sponsors2022/Eavesdrop.png",
          "/sponsors2022/Ono.webp",
          "/sponsors2022/Tucked Away Logo 2.png",
          "/sponsors2022/PLL_Logo.png",
          "/sponsors2022/VaRealDealsPNG.png",
          "/sponsors2022/DP.png",
          "/sponsors2022/wine-logo-2.jpg",
          "/sponsors2022/old-bust-head.png",
          "/sponsors2022/chantilly-glow-logo.png",
          "/sponsors2022/carahsoft.jpeg",
          "/sponsors2022/socium_updated.png",
          "/sponsors2022/thumbnail_McKing Logo.png",
          "/sponsors2022/thumbnail_New Headshot.jpg",
          "/sponsors2022/thumbnail_SRG Logo.jpg",
          "/sponsors2022/c&r_logo.png",
          "/sponsors2022/pbb-social-badge.png",
          "/sponsors2022/threaces.webp",
          "/sponsors2022/burke_centre_pet_sitting.jpg",
        ],
        sponsors: [
          "The Fruitful Forest",
          "MCKING Consulting",
          "Design Pro",
          "Maestri Family",
          "Premium Lawn and Landscape",
          "The Maranian Family",
          "VA Real Deals Team",
          "Chantilly Academy Gymnastics and Preschool",
          "Carahsoft",
          "Socium Advisors",
          "Showcase Realty Group",
          "C&R Printing",
          "Paris Baguette Centreville",
          "3 Aces Home Healthcare",
          "Burke Centre Pet Sitting",
        ],
      },
      {
        icon: "mdi-gavel",
        title: "Auction",
        text: "Auction",
        paragraphs: [
          `The Forks, Corks & Kegs silent auction includes tropical vacation packages, Bethany Beach house vacations, Diamond Club Nationals tickets (sponsored by FH Furr), Capitals tickets, Virginia winery tasting tours, restaurant gift cards, summer camps, sports lessons, museum tickets, children’s birthday party packages, skiing, golf, theater tickets, and every sort of local activity from laser tag to zip lining that will make your family very happy.  Bidding will open at 6:00 am May 14th on our <a href='${HANDBID_WEBSITE}'>Handbid online auction</a> and close at 10:00 pm the night of May 20th.  All purchased items can be picked up at the event, or the following Monday in the school office.`,
        ],
      },
      {
        icon: "mdi-glass-wine",
        title: "BeerWine",
        text: "Beer & Wine",
        paragraphs: [
          "Your ticket includes unlimited samplings of all beer and wine selections.  Breweries sponsoring our event include Old Bust Head Brewery, Tucked Away Brewing Co, Ono Brewing Co, Mustang Sally Brewery, and Eavesdrop Brewing Co. Each brewery offers a contrasting selection of its best brews. We also feature a wide-ranging variety of Virginia wines, all sponsored by Rappahannock Cellars.",
        ],
      },
      {
        icon: "mdi-food",
        title: "FoodTrucks",
        text: "Food Trucks",
        paragraphs: [
          "All you care to enjoy at our large selection of food trucks is included in the ticket price. Below is our 2023 food truck lineup!",
        ],
        photos: [
          "/foodtrucks2022/uncle_freds_bbq.jpg",
          "/foodtrucks2022/two_smooth_dudes.jpg",
          "/foodtrucks2022/chutny_marys.jpeg",
          "/foodtrucks2022/ChixNStix.png",
          "/foodtrucks2022/mamasdonutsbites.jpg",
        ],
        sponsors: [
          "Uncle Fred’s BBQ",
          "Two Smooth Dudes",
          "Chutney Mary’s",
          "Chix N Stix",
          "Mama’s Donuts",
        ],
      },
      {
        icon: "mdi-camera",
        title: "Photos",
        text: "Photos",
        paragraphs: [],
        photos: [
          "/images/thumbnail_15.jpg",
          "/images/thumbnail_17.jpg",
          "/images/thumbnail_32.jpg",
          "/images/thumbnail_band.jpg",
          "/images/thumbnail_beer.jpg",
          "/images/thumbnail_food trucks.jpg",
          "/images/thumbnail_Forks glasses.jpg",
          "/images/thumbnail_people.jpg",
          "/images/thumbnail_standrewpic1.jpg",
          "/images/thumbnail_tent day.jpg",
          "/images/thumbnail_tent.jpg",
        ],
      },
    ],
    companyInfo:
      "The St Andrew School PTO serves the students of St Andrew the Apostle School in Clifton, Virginia.  We are a 501(c)3 non-profit organization.  All funds raised through Forks, Corks & Kegs goes directly to the talented students of St Andrew’s",
    emailTo: "forkscorksandkegs@gmail.com",
    emailCC: "",
    feedbackEmailSub: "Forks, Corks, and Kegs Feedback",
    feedbackEmailBody:
      "Please write feedback here.  We will get back with you shortly.  Thanks you!",
    contactEmailSub: "Contact Forks, Corks, and Kegs",
    contactEmailBody:
      "Please write your question here.  We will get back with you shortly.  Thanks you!",
    handbidWebsite: HANDBID_WEBSITE,
    pdfName: PDF_NAME,
  }),
  computed: {},
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    setDrawer(val) {
      this.drawer = val;
    },
    overrideContain(photo) {
      //Need to use Contain on this one photo because it shows "UCKED"
      return photo.indexOf("Tucked Away Logo") != -1;
    },
    showPhoto(photo) {
      this.imageFullScreen = true;
      this.$nextTick(() => {
        this.imageFullScreenPath = photo;
      });
    },
    openFlyer() {
      window.open(PDF_NAME, "_blank");
    },
    openUrl(URL) {
      window.open(URL, "_blank");
    },
    sendFeedback() {
      window.open(
        "mailto:" +
          this.emailTo +
          "?cc=" +
          this.emailCC +
          "&subject=" +
          this.feedbackEmailSub +
          "&body=" +
          this.feedbackEmailBody
      );
    },
    contactUs() {
      window.open(
        "mailto:" +
          this.emailTo +
          "?cc=" +
          this.emailCC +
          "&subject=" +
          this.contactEmailSub +
          "&body=" +
          this.contactEmailBody
      );
    },
    register() {
      this.openUrl(this.handbidWebsite);
    },
  },
};
</script>

<style scoped>
.centerElement {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.outlinedPictureText {
  font-weight: bold;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
}

.image-full-screen {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
