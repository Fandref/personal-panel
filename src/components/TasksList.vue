<template>
    <ul class="tasks-list">
        <li :key="task.name" v-for="task in tasks">
            <pari-check-box :key="task.name" @changed="updateTask" :checked="task.complete" :value="task.name" :label="task.name" />
        
        </li>       
    </ul>
</template>

<script>
import PariCheckBox from './UI/PariCheckBox.vue'
    export default {
  components: { PariCheckBox },
        props: {
            tasks: {
                type: Array,
                required: true
            }
        },
        methods: {
            updateTask(eventData){
                this.$emit('changed', eventData)
            }
        }
    }
</script>

<style scoped>
    .tasks-list li{
        margin-bottom: 10px; 
    }
</style>