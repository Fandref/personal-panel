<template>
    <div class="projects-list">

        <div class="projects-item" v-for="project in projects" :key="project.id">
            <project-card  :project="project"/>
            
        </div>
        <h2 v-if="projects.length == 0">
            😔 Немає тут проєктів
        </h2>

    </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue'
    export default {
        props: {
            projects: {
                type: Array,
                required: true
            }
        },
        components: {ProjectCard },
        
        
    }
</script>

<style scoped>
    h2{
        padding: 15px;
        text-align: center;
        flex: 0 0 100%;
    }
    .projects-list{
        margin: -15px -15px 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .projects-item{
        flex: 0 0 50%;
        box-sizing: border-box;
        padding: 15px
    }
</style>