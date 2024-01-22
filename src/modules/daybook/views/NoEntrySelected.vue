<template>
    <div class="d-flex justify-content-center">
        <h4 class="align-self-center">No hay nada seleccionado</h4>
    </div>
    <Fab/>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
   components:{
     Fab:defineAsyncComponent(()=> import('../components/Fab.vue') )
   }
}
</script>

<style lang="scss" scoped>
div {
    height: 100%;
}
</style>