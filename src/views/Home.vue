<template>
  <div class="page page-home">
    <div class="page-background"></div>
    <div class="page-content">
      <div class="header d-md-flex px-4 py-3 text-center text-md-left">
        <Logo />
        <div class="clearfix"></div>
      </div>
      <div class="main">
        <v-container class="mt-10">
          <v-row justify="center">
            <v-col md="8">
              <h1 class="text-center mb-2 font-primary">The Stack Finder</h1>
              <v-form ref="form" @submit.prevent="search">
                <v-text-field
                  solo
                  label="Enter your domain here"
                  append-icon="mdi-magnify"
                  v-model="domain"
                ></v-text-field>
              </v-form>
              <div v-if="data">
                <div>CMS: {{ cmses }}</div>
                <div>Web Hosting Providers: {{ hostings }}</div>
                <div>Sub Domains: {{ subdomains }}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="footer">
        <div class="float-md-left text-center text-md-left pa-4">
          <span class="copyright">&copy; The Stack Finder </span>
        </div>
        <div class="float-md-right pa-4">
          <a
            class="d-block d-md-inline-block text-center text-md-left"
            href="https://www.theimpactsuite.com/privacy-policy"
            >Privacy Policy</a
          >
          <a
            class="d-block d-md-inline-block text-center text-md-left ml-md-4"
            href="https://www.theimpactsuite.com/terms-conditions"
            >Terms & Conditions</a
          >
          <a
            class="d-block d-md-inline-block text-center text-md-left ml-md-4"
            href="https://www.theimpactsuite.com/faq"
            >FAQ</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DATA from "../../data/domain.json";

import Logo from "@/components/Logo";

export default {
  name: "Home",
  components: { Logo },
  data() {
    return {
      domain: null, //"https://upwork.com",
      data: null,
    };
  },
  mounted() {
    // this.load(DATA);
  },
  computed: {
    cmses() {
      return this.data?.cmses?.join(", ");
    },
    hostings() {
      return this.data?.hostings?.join(", ");
    },
    subdomains() {
      return this.data?.subdomains?.join(", ");
    },
  },
  methods: {
    search() {
      if (!this.domain) {
        this.data = null
        return
      }

      this.axios
        .get(
          `https://api.builtwith.com/v17/api.json?KEY=6ab55e82-f06e-4bea-a75e-59e28d26e798&LOOKUP=${this.domain}`
        )
        .then(({ data }) => {
          console.log(data)
          this.load(data);
        });
    },
    load(data) {
      let cmses = [];
      let hostings = [];
      const subdomains = [];
      data.Results[0].Result.Paths.forEach((path) => {
        cmses = cmses.concat(
          path.Technologies.filter(
            ({ Tag, Name }) => Tag === "cms" && cmses.indexOf(Name) === -1
          ).map(({ Name }) => Name)
        );
        hostings = hostings.concat(
          path.Technologies.filter(
            ({ Tag, Name }) =>
              Tag === "hosting" && hostings.indexOf(Name) === -1
          ).map(({ Name }) => Name)
        );
        path.SubDomain && subdomains.push(`${path.SubDomain}.`);
      });

      cmses = cmses.reduce((distinctCMS, c) => {
        distinctCMS.find(
          (obj) => c.toLowerCase().indexOf(obj.toLowerCase()) !== -1
        ) || distinctCMS.push(c);
        return distinctCMS;
      }, []);

      this.data = {
        cmses: cmses,
        hostings: hostings,
        subdomains: subdomains,
      };
    },
  },
};
</script>
