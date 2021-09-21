<template>
    <button class="circle-button" :class="{'hover-effect': hoverEffect}">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props:{
            hoverEffect:{
                type: Boolean,
                required: false,
                default: true
            }
        }
    }
</script>

<style scoped>
    .circle-button{
        font-size: inherit;
        height: 40px;
        width: 40px;
        background: #fff;
        border: 4px #fff solid;
        border-radius: 50%;
        box-sizing: border-box;
        transform-origin: center;
        transform: scale(1);
        transition: transform .25s ease;
        
    }
    .circle-button.hover-effect:hover{
        transform: scale(1.2);    
    }
</style>