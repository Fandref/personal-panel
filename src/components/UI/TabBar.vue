<template>
    <div class="tab-bar">
        <button class="tab-button" :class="[tab.value === defaultTab ? 'active' : '']" @click="updateTab" :key="tab.value" v-for="tab in tabs" :value="tab.value"> 
            {{tab.name}}
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            tabs:{
                type: Array,
                required: true
            },
            defaultTab:{
                type: String,
                required: true
            }
        },
        methods:{
            updateTab(event){
               
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>
    .tab-bar{
        background: #fff;
        border-radius: var(--m-border-radius);
        display: inline-block;
    }
    .tab-button{
        padding: 8px 16px;
    }
    .tab-button.active{
        background: var(--accent);
    }


</style>