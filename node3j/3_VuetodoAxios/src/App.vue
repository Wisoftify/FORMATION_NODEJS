<script>
import HelloWorld from './components/HelloWorld.vue'
import MyLocalTodo from './components/myLocalTodo.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MyLocalTodo
  },
  setup() {
    return {
      msg: 'Hello Vue 3 + Vite'
    }
  },

  data() {
    return ({
      count: 0
    })
  },

  methods: {
    onCountChange(e) {
      this.count = e;
    }
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <HelloWorld :msg="'You did it! ' + msg + ' ' + count" />
  </header>

  <main>
    <MyLocalTodo msg="init" @onChange="onCountChange" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
