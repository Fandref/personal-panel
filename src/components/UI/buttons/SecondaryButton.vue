<template>
    <button class="secondary-button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props:{
            
        }
    }
</script>

<style scoped>
    .secondary-button{
        font-size: inherit;
        padding: 8px 12px;
        border-radius: var(--m-border-radius);
        background: #fff;
        transition: background, color .4s ease;
    }
    .secondary-button:hover{
        background: var(--accent);
        
    }
</style>