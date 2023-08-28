<script>
  export default {
    props: {
      msg: {type: String, required: true},
    },

    emits: ['onChange'],

    setup(props) {
    },

    data() {
      return {
        count: 0,
        message: "init"
      }
    },

    methods: {
      async increment() {
        console.log(this);
        this.count++;
        this.$emit('onChange', this.count);
      },
      decrement() {
        this.count--;
        this.$emit('onChange', this.count);
      },
      onChange(e) {
        this.message = e.target.value;
      }
    }
  }
</script>

<template>
  <h1>TODO</h1>
  
  <!-- basics props & dom binding -->

  <!-- binded dom & attribute, racourci de bind d'attribut dispo a l'aide de l'opérateur : -->
  <h2 :class="message" v-bind:id="message">{{ message }}</h2>
  <p>count: {{ count }}</p>
  <button @click="increment">+</button><!-- @ = raccourci pour v-on -->
  <button @click="decrement">-</button>

  <!-- FORM -->
  <div>
    <input type="text" :value="message" @input="onChange"/>
    <input type="text" v-model="message" />
  </div>

  <!-- Conditionnal rendering -->
  <div v-if="count > 0">
    <p>count > 0</p>

      <!-- List rendering -->
      <ul>
        <li v-for="i in count" :key="i">{{ i }}</li>
      </ul>
  </div>
  <div v-else-if="count < 0">
    <p>count &lt; 0</p>
  </div>
  <div v-else>
    <p>count = 0</p>
  </div>



</template>

<style scoped>
</style>

