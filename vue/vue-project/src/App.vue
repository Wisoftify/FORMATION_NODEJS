<script>
  import axios from "axios";

  export default {
    name: "App",
    data() {
      return ({
        contacts: [{
          surname: "guilian",
          name: "ganster"
        }],
      })
    },

    methods: {
      async getContacts() {
        const res = await axios.get("http://localhost:3000/api/contacts", {
          headers: {
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg3OTUzMTEwLCJleHAiOjE2ODc5NTY3MTB9.LbF6ihXGSRnl_34PG3RT_chbdwL7OEy26I_uVMDWXuo"
          }
        });
        this.contacts = res.data;
        console.log(this.contacts);
      }
    },

    mounted() {
      this.getContacts();
    }
  }
</script>

<template>
  <h1 v-on:click="getContacts">Contacts</h1>
  <div v-for="contact in contacts" class="row">
    <h3>{{ contact.surname }}</h3>
    <h3>{{ contact.name }}</h3>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>