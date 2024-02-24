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
      <TopSection :handbidWebsite="handbidWebsite" />
      <VideoSection />

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
            </v-container>
          </v-flex>
        </v-layout>

        <SponsorsList v-if="item.sponsors" :sponsors="item.sponsors" />
        <PhotosGrid
          v-if="item.photos"
          :photos="item.photos"
          @show-photo="showPhoto"
        />
      </section>

      <RegisterSection :handbidWebsite="handbidWebsite" />
      <BottomSection :emailTo="emailTo" />
      <FooterSection />
    </v-main>

    <Register :showDialog.sync="registerDialog" />

    <ImageEnlarge
      :showDialog.sync="imageFullScreen"
      :imageFullScreenPath="imageFullScreenPath"
    />
  </v-app>
</template>

<script>
//Components
import TopBar from "./components/TopBar.vue";
import Navigation from "./components/Navigation.vue";
import ImageEnlarge from "./components/dialogs/ImageEnlarge.vue";
import Register from "./components/dialogs/Register.vue";
import SponsorsList from "./components/SponsorsList.vue";
import PhotosGrid from "./components/PhotosGrid.vue";
import TopSection from "./components/sections/TopSection.vue";
import VideoSection from "./components/sections/VideoSection.vue";
import RegisterSection from "./components/sections/RegisterSection.vue";
import BottomSection from "./components/sections/BottomSection.vue";
import FooterSection from "./components/sections/FooterSection.vue";

const HANDBID_WEBSITE =
  "https://events.handbid.com/auctions/forks-corks-kegs-2024";

export default {
  name: "App",

  components: {
    TopBar,
    Navigation,
    ImageEnlarge,
    Register,
    SponsorsList,
    PhotosGrid,
    TopSection,
    VideoSection,
    RegisterSection,
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
    imageFullScreen: false,
    imageFullScreenPath: "",
    registerDialog: false,
    drawer: null,
    items: [
      {
        icon: "mdi-home",
        title: "Home",
        text: "Home",
        paragraphs: [
          "St. Andrew the Apostle School PTO will be hosting the fourth annual Forks,Corks, & Kegs on Saturday, May 18, 2024",
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
          `Tickets can be purchased on the <a href='${HANDBID_WEBSITE}'>Handbid website</a> for $55 during Catholic Schools Week Special, Jan. 26th - Feb 4th, $65 before May 11th, and $75 the week of the event. Each ticket includes all you can eat food at the food trucks, all you can drink beer and wine, and a tasting glass.`,
        ],
      },
      {
        icon: "mdi-gift-outline",
        text: "Sponsors",
        paragraphs: [
          "​​Thank you to last year’s generous sponsors!  Our list of sponsors for this year is coming soon. If you are interested in being a sponsor for 2024, please <a href='mailto:crystalmac7@gmail.com'>contact us</a> for details",
        ],
        photos: [
          "/sponsors2023/AngieHill.png",
          "/sponsors2023/CardMyYard.png",
          "/sponsors2023/CentrevilleDance.png",
          "/sponsors2023/CheronOrthodontics.jpg",
          "/sponsors2023/NOVABarbell.png",
          "/sponsors2022/TheFruitfulForest.png",
          "/sponsors2022/PLL_Logo.png",
          "/sponsors2022/VaRealDealsPNG.png",
          "/sponsors2022/DP.png",
          "/sponsors2022/chantilly-glow-logo.png",
          "/sponsors2022/c&r_logo.png",
          "/sponsors2022/pbb-social-badge.png",

          // Removed in 2024
          // "/sponsors2023/CabooseBrewingCo.png",
          // "/sponsors2022/old-bust-head.png",
          // "/sponsors2022/MSB.png",
          // "/sponsors2022/thumbnail_McKing Logo.png",
          // "/sponsors2022/thumbnail_New Headshot.jpg",
          // "/sponsors2022/thumbnail_SRG Logo.jpg",
          // 2024
          "/sponsors2022/Tucked Away Logo 2.png",
          "/sponsors2024/brew-republic-bierwerks.png",
          "/sponsors2024/bunnyman-brewing.png",
          "/sponsors2024/evesdrop-brewery.png",
          "/sponsors2024/heritage-brewing.jpeg",

          // Winneries: Need the list
          "/sponsors2022/wine-logo-2.jpg",
          "/sponsors2023/CasanelVineyardsWinery.png",
          "/sponsors2023/chateau_obrien_logo2.jpg",
        ],
        sponsors: [
          // From 2023 to 2024
          "Angie Hill Real Estate",
          "Card My Yard",
          "Cheron Orthodontics",
          "NOVA Barbell Club",
          "The Fruitful Forest",
          "MCKING Consulting",
          "Design Pro",
          "Maestri Family",
          "Premium Lawn and Landscape",
          "The Maranian Family",
          "C&R Printing",
          "Paris Baguette Centreville",

          // Removed in 2024
          // "Caboose",
          // "Old Bust Head",
          // "Mustang Sally",
          // "VA Real Deals Team",
          // "Chantilly Academy Gymnastics and Preschool",
          // "Showcase Realty Group",
          // 2024
          "Tucked Away",
          "Brew Republic",
          "Bunnyman Brewing",
          "Eavesdrop Brewery",
          "Heritage Brewing",
          // Winneries: Need the list
          "Rappahannock Cellars",
          "Casanel Vineyards & Winery",
          "Chateau O'Brien Winery & Vineyard",
        ],
      },
      {
        icon: "mdi-gavel",
        title: "Auction",
        text: "Auction",
        paragraphs: [
          `The Forks, Corks & Kegs silent auction has included tropical vacation packages, Bethany Beach house vacations, Diamond Club Nationals tickets (sponsored by FH Furr), Capitals tickets, Virginia winery tasting tours, restaurant gift cards, summer camps, sports lessons, museum tickets, children’s birthday party packages, skiing, golf, theater tickets, and every sort of local activity from laser tag to zip lining that will make your family very happy.  Bidding will open at 6:00 am May 10th on our <a href='${HANDBID_WEBSITE}'>Handbid online auction</a> and close at 11:00 pm the night of May 18th.  All purchased items can be picked up at the event, or the following Monday in the school office.`,
          "The silent auction is the primary means by which Forks, Corks & Kegs raises funds and previous donors have included American Shakespeare Center, Aqua-Tots, Burn Boot Camp, Bunnyman Brewing, Caboose Brewing, Casanel Vineyards, Chantilly Gymnastics, Chateau O'Brien, Children's Science Center, Creative Cauldron, Dave & Busters, DC Nationals, DC Capitols, Dulles Golf, Elite Island Resorts, Fairfax Collegiate, First Watch, Flynn O'Hara, Four Seasons Georgetown, Funland, Gadino Cellars, George Mason Athletics, Glory Days, Great American Restaurants, Great Country Farms, GoApe, Heroic Axe, Hillwood Estate, Hogback Mountain Paintball, Hylton Performing Arts Center, International Spy Museum, Jammin Java, KID Museum, Lazy Dog Cafe, Lewis Ginter Botanic Gardens, Luray Caverns, Manassas Ballet, Merrifield Garden Center, Meadows Farms Garden Center, Mission BBQ, Monster Golf, Montpelier, Monticello, Mount Vernon, My Gym, Naked Mountain, Narmada Winery, nZone, Old Farm Winery, Old Bust Head Brewery, Outer Limits Game Lounge, Panera, Paradise Springs, Paschal Lamb, Pev's Paintball, PSA, Potomac River Riders, Potomac River Running, Tennis DNA, Rappahanock Cellars, Rosemary's Thyme, SciGenius Camps, Seven Oaks Lavender Farm, Shadowland, Shenandoah River Outfitters, Showplace ICON Theater, Sight & Sound Theater, Studio Theater, Signature Theater, Skate n Fun Zone, Starbucks, Tarara Winery, Texas de Brazil, Tucked Away Brewing, Capitol Grille, Mariner's Museum, Total Wine & More, Twin Lakes Golf Course, Westfield Golf Course, Westfields Marriott, Ultimate Archery, University Theater, Valvoline, Vertical Rock, Villagio, Virginia International Raceway, Walkerville Southern Railroad, Watermark Cruises, Winery at La Grange, Wolf Trap Performing Arts, and Zavazone.",
        ],
      },
      {
        icon: "mdi-glass-wine",
        title: "BeerWine",
        text: "Beer & Wine",
        paragraphs: [
          "Your ticket includes unlimited samplings of all beer and wine selections.  Breweries sponsoring our event include Tucked Away Brewing Co, Brew Republic, Bunnyman Brewing, Eavesdrop Brewery, and Heritage Brewing. Each brewery offers a contrasting selection of its best brews. We also feature a wide-ranging variety of Virginia wines, sponsored by Rappahannock Cellars, Chateau O'Brien Winery & Vineyard , and Casanel Vineyards & Winery.",
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
          "/sponsors2023/hangry_panda.jpg",
          "/foodtrucks2022/uncle_freds_bbq.jpg",
          "/foodtrucks2022/two_smooth_dudes.jpg",
          "/foodtrucks2022/chutny_marys.jpeg",
          "/foodtrucks2022/mamasdonutsbites.jpg",
        ],
        sponsors: [
          "Hangry Panda",
          "Uncle Fred’s BBQ",
          "Two Smooth Dudes",
          "Chutney Mary’s",
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
</style>
