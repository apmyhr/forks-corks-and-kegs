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
                  <span class="subtitle-1 center-element"
                    >A Special Thank you to Our 2019 Auction Donors</span
                  >
                  <v-btn
                    color="success"
                    class="center-element"
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

        <PhotosGrid
          v-if="item.photos"
          :photos="item.photos"
          @show-photo="showPhoto"
        />
      </section>

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

      <BottomSection :emailTo="emailTo" />
      <FooterSection />
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
import PhotosGrid from "./components/PhotosGrid.vue";
import BottomSection from "./components/sections/BottomSection.vue";
import FooterSection from "./components/sections/FooterSection.vue";

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
    PhotosGrid,
    BottomSection,
    FooterSection,
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
          "/sponsors2023/AngieHill.png",
          "/sponsors2023/CardMyYard.png",
          "/sponsors2023/CasanelVineyardsWinery.png",
          "/sponsors2023/CentrevilleDance.png",
          "/sponsors2023/CheronOrthodontics.jpg",
          "/sponsors2023/NOVABarbell.png",
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
          "Angie Hill Real Estate",
          "Card My Yard",
          "Casanel Vineyards Winery",
          "Cheron Orthodontics",
          "NOVA Barbell Club",
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
.center-element {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.outlined-picture-text {
  font-weight: bold;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
}
</style>
