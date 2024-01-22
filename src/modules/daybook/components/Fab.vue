<template>
    <button class="btn btn-primary">
        <i :class="iconClass"></i>
    </button>
</template>

<script>
export default {
  name:'FabComponent',
  props:{
    icon:{
        type:String,
        default:'fa-plus',
        required:true
    }
  },
  computed:{
    iconClass(){
        return `fa fa-2x ${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
    button{
        position: fixed;
        bottom:20px;
        right:20px;
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }
</style>