<template>
  <v-app light>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>{{title}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text icon @click="toggleTheme">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            @click="$vuetify.goTo('#scroll-' + item.title, scrollOptions); drawer = $vuetify.breakpoint.lgAndUp"
          >
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
            <v-list-item :key="item.text" @click="item.clickEvent(getMyThis())">
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

    <v-content>
      <section>
        <v-parallax src="@/assets/wine_cheese2.jpg" height="600">
          <v-layout column align-center justify-center class="white--text">
            <h1 class="white--text mb-2 display-1 text-center">{{title}}</h1>
            <div class="subheading mb-4 text-center">{{date}}</div>
            <img src="@/assets/logo.png" alt="Vuetify.js" height="300" />
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              @click="registerDialog = true"
            >Register</v-btn>
            <v-btn
              class="mt-12"
              color="green lighten-2"
              dark
              large
              @click="openFlyer"
            >View the Flyer</v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section v-for="(item, index) in items" v-bind:key="index" :id="'scroll-' + item.title">
        <v-layout column wrap class="my-12" align-center>
          <v-flex xs12 sm4 class="my-4">
            <div class="text-center">
              <v-icon x-large class="blue--text text--lighten-2">{{item.icon}}</v-icon>
              <h2 class="headline">{{item.text}}</h2>
              <!-- <span class="subheading">{{item.text}}</span> -->
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex md4 v-if="item.paragraphs.length == 1 && $vuetify.breakpoint.mdAndUp"></v-flex>
                <v-flex xs12 md4 v-for="(paragraph, index) in item.paragraphs" v-bind:key="index">
                  <v-card flat class="transparent">
                    <v-card-text v-html="paragraph"></v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>

              

              <v-layout v-if="item.title == 'Auction'" row wrap align-center>
                <v-flex xs12>                  
                </v-flex>
              </v-layout>
              <v-layout v-if="item.title == 'Auction'" row wrap align-center>
                <v-flex xs12>
                 <span class="subtitle-1 centerElement">A Special Thank you to Our 2019 Auction Donors</span>
                  <v-btn color="success" class="centerElement" @click="showAuctionThanks = true">View Donors</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
        <v-container v-if="item.photos">
          <v-row>
            <v-col
              v-for="(photo, index) in item.photos"
              :key="index"
              class="d-flex child-flex"
              cols="4"
              @click="showPhoto(photo)"
            >
              <v-card flat tile class="d-flex" color="transparent">
                <v-img :src="photo" aspect-ratio="1" :contain="overrideContain(photo)">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!-- <v-layout row wrap align-center>
          <v-flex v-for="(photo, index) in item.photos" :key="index" xs12 sm6 md4 pa-2>
            <v-card flat tile class="d-flex">
              <v-img
                :src="photo"
                aspect-ratio="1"
                class="grey lighten-2"
                @click="imageFullScreenPath = photo; imageFullScreen = true"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>-->
      </section>

      <section>
        <v-parallax src="@/assets/beer.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-4 text-center">Put a summary tag line here</div>
            <em>Register today!</em>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              @click="registerDialog = true"
            >Register</v-btn>
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
                <v-card-text>Please feel free to contact us through either of the following methods.</v-card-text>
                <v-list class="transparent">
                  <!-- <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>(703) 817-1770</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item> -->
                  <v-list-item @click="openUrl('https://www.google.com/maps/place/6720+Union+Mill+Rd,+Clifton,+VA+20124')">
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>6720B Union Mill Rd, Clifton, VA 20124</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="openUrl('mailto:' + emailTo)">
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{emailTo}}</v-list-item-title>
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
        <a class="white--text" href="http://www.st-andrew.org/" target="_blank">Saint Andrews</a>
        <v-spacer></v-spacer>
        <v-icon class="amber--text">mdi-beer</v-icon>
        <!-- </div>
          </v-flex>
        </v-layout>-->
      </v-footer>
    </v-content>
    <v-dialog v-model="registerDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="First name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Middle name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Last name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required hint="Please enter a valid email address"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="['Tickets', 'Donating to Auction', 'Sponsoring', 'Volunteering']"
                  label="Interested in"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="registerDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="registerDialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="imageFullScreen">
      <v-card>
        <v-btn
          fab
          style="position: fixed; top: 50px; right: 50px; z-index: 100"
          @click="imageFullScreen = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-img :src="imageFullScreenPath" contain>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-dialog>

    <v-dialog v-model="viewFlyerDialog">
      <embed
        src="20-House-ForksCorksKegs-Flyer.pdf"
        style="width: calc(100%); height: calc(100vh - 150px)"
      />
    </v-dialog>
    <v-dialog v-model="showAuctionThanks" width="450"> 
      <v-card dark>
        <v-list>
          <v-list-item v-for="(item, index) in auctionThanksJson" v-bind:key="index" @click="openUrl(item.url)">            
            <v-list-item-icon>
              <v-icon color="yellow">mdi-star</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-btn icon color="info"><v-icon>mdi-web</v-icon></v-btn>
            </v-list-item-avatar>
            <!-- <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content> -->
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

// import { LoremIpsum } from "lorem-ipsum";

// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 12,
//     min: 6
//   },
//   wordsPerSentence: {
//     max: 24,
//     min: 6
//   }
// });

import auctionJson from './auctionThanks.json'

export default {
  name: "App",

  components: {
    //HelloWorld,
  },

  created() {
    if (!this.$cookies.isKey("darkTheme")) {
      console.log("No cookie");
      this.$cookies.set("darkTheme", false);
    }

    let darkTheme = this.$cookies.get("darkTheme");
    console.log("darkTheme: " + darkTheme);
    this.$vuetify.theme.dark = darkTheme == "true"; //darkTheme will be a string
  },

  data: () => ({
    showAuctionThanks: false,
    viewFlyerDialog: false,
    imageFullScreen: false,
    imageFullScreenPath: "",
    registerDialog: false,
    title: "Forks, Corks, & Kegs",
    date: "Saturday, May 16, 2020",
    drawer: null,
    items: [
      {
        icon: "mdi-home",
        title: "Home",
        text: "Home",
        paragraphs: [
          "St. Andrew the Apostle School PTO will be hosting Forks,Corks, & Kegs on Saturday, May 16, 2020 in a huge tent on the lovely school grounds. This exciting tasting festival in Clifton, Virginiawill include local breweries, wineries, and food trucks, a live band, as well as a silent auction and raffles. Your ticket includes all-you-can-eat and drink, plus a tasting glass. There will be representatives from local breweries serving 16-20 beers, a tableof over 50 different Virginia wines, and food trucks pulled up by the tent serving everything from BBQ and hot apple cider donuts to gourmet tater tots and Peruvian specialties.",
          "Past silent auctions have included local beach house vacations, tropical resort vacations, prime seats to a Washington Capitols game, Washington Nationals Diamond Club tickets, Virginia winery tours, ticketsto local museums, sightseeing cruises, luxurious Ritz-Carlton stays, children’s summer camps, and a once-in-a-lifetime chance to hang out with sportscasters Grant & Danny or the Sports Junkies while taping their radio shows. There will be a HUGE ‘Basket ofCheer’ (spirits) being raffled, in addition to the opportunity to send your favorite teacher or staff member on a vacation to Bethany Beach.",
          "All proceeds from Forks, Corks, & Kegs go to the St Andrew’s School PTO to help support our talented students. Past PTO funds have been used to purchase items such as a new preschool playground, RoboticsClub, Activeboards, Science Lab curriculum, textbooks, a new school website, field trips, school assemblies, and an iPad library for classroom use."
        ]
      },
      {
        icon: "mdi-ticket",
        title: "Tickets",
        text: "Tickets",
        paragraphs: [
          "Tickets can be purchased on the <a href='https://events.handbid.com/auctions/st-andrew-forks-corks-and-kegs-2020'>Handbid website</a> for $55 before May 24th, and $65 the week of the event. Each ticket includes all you can eat food at the food trucks and our Paris Baguette-sponsored cake table, all you can drink beer and wine, and a tasting glass.",
        ]
      },
      {
        icon: "mdi-gift-outline",
        text: "Sponsors",
        paragraphs: [
          "Thank you to our generous sponsors in 2019!  Business Sponsors were Clawes Carpets, FH Furr, C&R Printing, ClickFXMarketing, Paris Baguette, and Supplyline Inc.  Our Family Sponsors were The Maestri Family and Duane & Andrew McCliggott.  If you are interested in being a sponsor for 2020, please <a href='mailto:crystalmac7@gmail.com'>contact us</a> for details.",
        ],
        photos: [
          "/sponsors/MSB.png",
          "/sponsors/ParisBaguette.png",
          "/sponsors/thumbnail_Eavesdrop Logo (1).png",
          "/sponsors/thumbnail_Ono Logo 3-16-17.png",
          "/sponsors/thumbnail_solace-website-logo-e433006c5056a36_e43303d3-5056-a36a-07f76b181f2374be-Quick Preset_800x600.jpg",
          "/sponsors/Tucked Away Logo 2.png"
        ]
      },
      {
        icon: "mdi-gavel",
        title: "Auction",
        text: "Auction",
        paragraphs: [
          "The Forks, Corks & Kegs silent auction includes tropical vacation packages, Bethany Beach house vacations, Diamond Club Nationals tickets (sponsored by FH Furr), Capitols tickets, Virginia winery tasting tours, restaurant gift cards, summer camps, sports lessons, museum tickets, children’s birthday party packages, skiing, golf, theater tickets, and every sort of local activity from laser tag to zip lining that will make your family very happy.  Bidding will open at 6:00 am May 8th on our <a href='https://events.handbid.com/auctions/st-andrew-forks-corks-and-kegs-2020'>Handbid online auction</a> and close at 10:00 pm the night of May 16th.  All purchased items can be picked up at the event, or the following Monday in the school office."
        ]
      },
      {
        icon: "mdi-glass-wine",
        title: "BeerWine",
        text: "Beer & Wine",
        paragraphs: [
          "Past breweries that have sponsored Forks, Corks & Kegs include Old Bust Head Brewery, Tucked Away Brewing Co, Ono Brewing Co, Mustang Sally Brewery, Solace Brewing Co, Eavesdrop Brewing Co, Growling Bear Brewery, Heritage Brewery, and Bad Wolf Brewing.  Each brewery brings a selection of four different beers for our guests to enjoy.  A table of Virginia wines is also included in the ticket with over 50 wines to sample.  This year’s wine table will be sponsored by Rappahannock Cellars.",
        ]
      },
      {
        icon: "mdi-food",
        title: "FoodTrucks",
        text: "Food Trucks",
        paragraphs: [
          "All you care to enjoy at our large selection of food trucks is included in the ticket price.  Past favorites have included Sloppy Mama’s BBQ sandwiches, Mama’s Donuts hot apple cider donuts, Crepe Love’s custom crepes, Peruvian Brothers ceviche and sliders, the amazing empanadas of Empanadas de Mendoza, Urban Poutine’s many forms of cheesy fries, Indian street food, gourmet tater tots, and more…  We switch up the food trucks a bit each year so our guests can try new things each time.  2020’s food truck selection will be posted soon!  St Andrew’s favorite, Paris Baguette, will also be sponsoring their amazing cake table under the tent as well.",
        ]
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
          "/images/thumbnail_tent.jpg"
        ]
      }
    ],
    itemsFooter: [
      {
        icon: "mdi-comment",
        text: "Send Feedback",
        clickEvent: myThis => {
          window.open(
            "mailto:" +
              myThis.emailTo +
              "?cc=" +
              myThis.emailCC +
              "&subject=" +
              myThis.feedbackEmailSub +
              "&body=" +
              myThis.feedbackEmailBody
          );
        }
      },
      {
        icon: "mdi-contact-mail",
        text: "Contact Us",
        clickEvent: myThis => {
          window.open(
            "mailto:" +
              myThis.emailTo +
              "?cc=" +
              myThis.emailCC +
              "&subject=" +
              myThis.contactEmailSub +
              "&body=" +
              myThis.contactEmailBody
          );
        }
      },
      {
        icon: "mdi-account-plus",
        text: "Register",
        clickEvent: myThis => {
          myThis.registerDialog = true;
        }
      }
    ],
    scrollOptions: {
      duration: 600,
      offset: 0,
      easing: "easeInOutCubic"
    },
    companyInfo: "The St Andrew School PTO serves the students of St Andrew the Apostle School in Clifton, Virginia.  We are a 501(c)3 non-profit organization.  All funds raised through Forks, Corks & Kegs goes directly to the talented students of St Andrew’s",
    emailTo: "forkscorksandkegs@gmail.com",
    emailCC: "",
    feedbackEmailSub: "Forks, Corks, and Kegs Feedback",
    feedbackEmailBody:
      "Please write feedback here.  We will get back with you shortly.  Thanks you!",
    contactEmailSub: "Contact Forks, Corks, and Kegs",
    contactEmailBody:
      "Please write your question here.  We will get back with you shortly.  Thanks you!"
  }),
  computed: {
    auctionThanksJson(){
      console.log('Hello')
      if (auctionJson){
        console.log(auctionJson);
        return auctionJson;
      }
      else{
        return [];
      }
    }
  },
  methods: {
    overrideContain(photo){
      //Need to use Contain on this one photo because it shows "UCKED"
      return photo.indexOf('Tucked Away Logo') != -1;
    },
    showPhoto(photo) {
      this.imageFullScreen = true;
      this.$nextTick(() => {
        this.imageFullScreenPath = photo;
      });
    },
    openFlyer() {
      window.open("20-House-ForksCorksKegs-Flyer.pdf", "_blank");
    },
    openUrl(URL) {
      window.open(URL, '_blank');
    },
    getMyThis() {
      return this;
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$cookies.set("darkTheme", this.$vuetify.theme.dark);
    }
  }
};
</script>

<style scoped>
.centerElement{
  text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
