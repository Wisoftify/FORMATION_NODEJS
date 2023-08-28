<script>
  import axios from 'axios'

  export default {
    name: 'Crm',

    data() {
      return {
        contacts: []
      }
    },

    methods: {
      async getContacts() {
        const response = await axios.get('http://localhost:3000/api/contacts')
        this.contacts = response.data
        console.log(this.contacts);
      },
      async deleteContact(id) {
        await axios.delete(`http://localhost:3000/api/contacts/${id}`)
        this.getContacts()
      }
    },

    mounted() {
      this.getContacts()
    }
  }
</script>

<template>
  <p>coucou</p>

  <div v-for="contact in contacts" :key="contact.id">
    <h2>{{ contact.name }} {{ contact.surname }}</h2>
    <button @click="deleteContact(contact.id)">Supprimer</button>
  </div>
</template>

<style scoped>
</style>