<template>
    <div class="progress-status">
            <div class="progress-label">
                Виконано {{getCountTasksComplete}} задач з {{getCountTasksAll}}
            </div>
        <progress-bar :percent="percentComplete"></progress-bar>
       
    </div>
</template>

<script>
import ProgressBar from './UI/ProgressBar.vue';
    export default {
        components: { ProgressBar },
        props: {
            tasks:{
                type:Array,
                required: true
            }
        },
        computed: {
            getCountTasksAll(){
                return this.tasks.length;
            },
            getCountTasksComplete(){
               
                const completeTask = this.tasks.filter(task => task.complete);
                
                return completeTask.length;
            },
            percentComplete (){
                return this.getCountTasksComplete / this.getCountTasksAll * 100;
            },
        }

    }
</script>

<style scoped>
.progress-label{
        color: var(--dark-gray);
        font-size: 16px;
        font-family: "Raleway Medium";
        margin-bottom: 18px;
    }

</style>