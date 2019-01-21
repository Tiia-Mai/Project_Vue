<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/laugh_liten.png">
<!--Showing vueComponent -->    
<vueComponent/>
  </div>
</template>

<script>
//import components
import vueComponent from './components/vueComponent.vue'

//export vueComponent
export default {
    name: 'app',
    components: {
      vueComponent
      
    }
  };

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
