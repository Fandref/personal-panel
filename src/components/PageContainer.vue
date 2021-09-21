<template>
    <div class="page-container">
        <h1 class="title">{{title}}</h1>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            title:{
                type:String,
                required: true
            }
        }
        
    }
</script>

<style scoped>
.page-container{
    font-size: inherit;
}
.title{
        margin-left: 0;
        margin-bottom: 30px;
        transition: margin-left 1s ease;
    }
    div:not(.active) + div .title{
        margin-left: 60px;

    }
/* .title{
    margin-left: 0;
    margin-bottom: 30px;
} */
</style>