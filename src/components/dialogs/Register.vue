<template>
  <v-dialog v-model="showDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="registrationFirstName"
                label="First name*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="registrationMiddleName"
                label="Middle name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="registrationLastName"
                label="Last name*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="registrationInterestedIn"
                :items="[
                  'Tickets',
                  'Donating to Auction',
                  'Sponsoring',
                  'Volunteering',
                ]"
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
        <v-btn color="blue darken-1" text @click="showDialog = false"
          >Close</v-btn
        >
        <v-btn
          color="blue darken-1"
          text
          @click="
            showDialog = false;
            submitRegistration;
          "
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Register",
  props: {
    showDialog: Boolean,
  },
  data: () => ({
    registrationFirstName: "",
    registrationMiddleName: "",
    registrationLastName: "",
    // registrationEmail: "",
    registrationInterestedIn: [],
  }),

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

  methods: {
    submitRegistration() {
      let fullName = this.registrationFirstName;
      if (this.registrationMiddleName) {
        fullName += " " + this.registrationMiddleName;
      }
      fullName += " " + this.registrationLastName;
      let subject = "Forks, Corks, & Kegs Registration for " + fullName;
      let body = `I, ${fullName}, would like to register for Forks, Corks, and Kegs.\r\n`;

      let interested = this.registrationInterestedIn.slice();
      let lastInterested = interested.pop();

      if (interested.length > 0) {
        body += `I'm interested in ${interested.join(
          ", "
        )} and ${lastInterested}.`;
      } else {
        body += `I'm interested in ${lastInterested}.`;
      }

      //Properly encode the strings first
      subject = encodeURIComponent(subject);
      body = encodeURIComponent(body);

      window.open(
        "mailto:" +
          this.emailTo +
          "?cc=" +
          this.emailCC +
          "&subject=" +
          subject +
          "&body=" +
          body
      );
    },
  },
};
</script>

<style></style>
