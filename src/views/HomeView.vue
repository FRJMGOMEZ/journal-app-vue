<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hola mundo</h1>
    <button class="btn btn-primary" @click="goToDaybook"> Daybook</button>
    <button class="btn btn-secondary"> segundo</button>
    <button class="btn btn-warning">tercero</button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    
  },
  methods:{
    goToDaybook(){
       this.$router.push({name:'no-entry'})
    }
  }

}
</script>
