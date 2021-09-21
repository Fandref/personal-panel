<template>
    <button class="primary-button">
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
    .primary-button{
        font-size: inherit;
        padding: 8px 12px;
        border-radius: var(--m-border-radius);
        background: var(--accent);
        transition: background, color .4s ease;
    }
    .primary-button:hover{
        background: #000;
        color: var(--accent);
    }
</style>