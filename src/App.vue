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
            <img src="@/assets/BeerandWine-566x392.png" alt="Vuetify.js" height="200" />
            <h1 class="white--text mb-2 display-1 text-center">{{title}}</h1>
            <div class="subheading mb-4 text-center">{{date}}</div>
            <v-btn class="mt-12" color="blue lighten-2" dark large @click="registerDialog = true">Register</v-btn>
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
                <v-flex xs12 md4 v-for="(paragraph, index) in item.paragraphs" v-bind:key="index">
                  <v-card flat class="transparent">
                    <!-- <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Material Design</div>
                    </v-card-title>-->
                    <v-card-text>{{paragraph}}</v-card-text>
                  </v-card>
                </v-flex>
                <!-- <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast development</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card flat class="transparent">
                    <v-card-text class="text-center">
                      <v-icon x-large class="blue--text text--lighten-2">mdi-wrench</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-center">Completely Open Sourced</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>-->
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="@/assets/beer.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-4 text-center">Put a summary tag line here</div>
            <em>Register today!</em>
            <v-btn class="mt-12" color="blue lighten-2" dark large @click="registerDialog = true">Register</v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.</v-card-text>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>(703) 817-1770</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>6720B Union Mill Rd, Clifton, VA 20124</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Somebody@somewhere.com</v-list-item-title>
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
                <v-text-field
                  label="Last name*"
                  required
                ></v-text-field>
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
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 12,
    min: 6
  },
  wordsPerSentence: {
    max: 24,
    min: 6
  }
});

export default {
  name: "App",

  components: {
    //HelloWorld,
  },

  created(){
    if (!this.$cookies.isKey("darkTheme")){
      console.log('No cookie');
      this.$cookies.set("darkTheme", false);
    }

    let darkTheme = this.$cookies.get('darkTheme');
    console.log('darkTheme: ' + darkTheme);
    this.$vuetify.theme.dark = darkTheme == "true"; //darkTheme will be a string
  },

  data: () => ({
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
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1)
        ]
      },
      {
        icon: "mdi-gift-outline",
        text: "Sponsors",
        paragraphs: [lorem.generateParagraphs(1), lorem.generateParagraphs(1)]
      },
      {
        icon: "mdi-gavel",
        title: "Auction",
        text: "Auction",
        paragraphs: [
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1)
        ]
      },
      {
        icon: "mdi-glass-wine",
        title: "BeerWine",
        text: "Beer & Wine",
        paragraphs: [
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1)
        ]
      },
      {
        icon: "mdi-food",
        title: "FoodTrucks",
        text: "Food Trucks",
        paragraphs: [
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1)
        ]
      },
      {
        icon: "mdi-camera",
        title: "Photos",
        text: "Photos",
        paragraphs: [
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1),
          lorem.generateParagraphs(1)
        ]
      }
    ],
    itemsFooter: [
      { icon: "mdi-comment", text: "Send Feedback", clickEvent: (myThis) => { window.open("mailto:"+myThis.emailTo+'?cc='+myThis.emailCC+'&subject='+myThis.feedbackEmailSub+'&body='+myThis.feedbackEmailBody); }},
      { icon: "mdi-contact-mail", text: "Contact Us", clickEvent: (myThis) => { window.open("mailto:"+myThis.emailTo+'?cc='+myThis.emailCC+'&subject='+myThis.contactEmailSub+'&body='+myThis.contactEmailBody); }},
      { icon: "mdi-account-plus", text: "Register", clickEvent: (myThis) => { myThis.registerDialog = true; } }
    ],
    scrollOptions: {
      duration: 600,
      offset: 0,
      easing: "easeInOutCubic"
    },
    emailTo: 'parish.office@st-andrew.org',
    emailCC: 'parish.office@st-andrew.org',
    feedbackEmailSub: 'Forks, Corks, and Kegs Feedback',
    feedbackEmailBody: 'Please write feedback here.  We will get back with you shortly.  Thanks you!',
    contactEmailSub: 'Contact Forks, Corks, and Kegs',
    contactEmailBody: 'Please write your question here.  We will get back with you shortly.  Thanks you!',
  }),  
  methods: {
    getMyThis(){
      return this;
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$cookies.set("darkTheme", this.$vuetify.theme.dark);
    }
  }
};
</script>
