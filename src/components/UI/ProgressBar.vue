<template>
    <div class="progress-bar">
        <div class="progress-line" :style="{width: percent+'%'}"></div>
    </div>
</template>

<script>
    export default {
       props:{
           percent:{
               type: Number,
               required: true,
               validator: perValue => {
                   return perValue >= 0 && perValue <=100;
               }
           }
       } 
    }
</script>

<style scoped>
    .progress-bar{
        height: 10px;
        border-radius: 5px;
        background: black;
        width: 100%;
        overflow: hidden;
    }
    .progress-line{
        height: inherit;
        border-radius: inherit;
        background: var(--accent);
        transition: width .4s ease;
    }
</style>