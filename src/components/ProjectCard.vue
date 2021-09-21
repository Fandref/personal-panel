<template>
    <div class="project-container" ref="projectContainer" @mouseover="hovered = true" @mouseleave="hovered = false">
        <div class="project-card">
            <div class="left-column">
                <router-link :to="`/projects/${project.id}`">
                    <div class="main-part">
                        <h3 class="project-name">{{project.name}}</h3>
                        <p class="project-description">{{project.description}}</p>
                    </div>
                </router-link>
                
                <project-progress :tasks="project.tasks" />
                <div v-if="hovered" class="members">
                    <memder-team-item v-for="member in project.members" :key="member.id" :name="member.name" :position="member.name" :block="false" />
                </div>
                

            </div>
            <div v-if="hovered" class="right-column">
                <tasks-list :tasks="project.tasks" @changed="updateTask" />
                
            </div>   

        </div>
    </div>
    
</template>

<script>
    
    import MemderTeamItem from './memberTeam/MemderTeamItem'
    import TasksList from './TasksList.vue'
    import ProjectProgress from './ProjectProgress.vue'
    import {mapActions} from 'vuex'

    export default {
        components: {MemderTeamItem, TasksList, ProjectProgress},
        props: {
            
            project: {
                 type: Object,
                 required: true
            }
        },
        data(){
            return{
                isMounted: false,
                hovered: false,
                horisontalOrientation: false
            }
            
        },
        methods: {
            ...mapActions({
                loadProjects: 'projects/loadProjects',
                loadTeam: 'team/loadTeam',
                updateProjectTask: 'projects/updateProjectTask'
            }),
            updateTask(task){
                
                this.updateProjectTask({
                    projectId: this.project.id,
                    task: {name: task.value, complete: task.checked}
                })

            },
        
        },
    }
</script>
<style scoped>
    .project-container{
        position: relative;
    }
    .project-container:before {
        content: "";
        display: block;
        padding-top: 50%;
    }
    .project-container:hover .project-card{
        width: 150%;
    }
    
    .project-card{
        background: #fff;
        padding: 16px;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        max-height: 170%;
        box-sizing: border-box;
        border-radius: var(--m-border-radius);
        flex-direction: row;
    }
    .projects-list .projects-item:nth-child(even) .project-card{
        right: 0;
        left: unset;
        flex-direction: row-reverse;
    }
   
    .project-container:hover .project-card{
        box-shadow: 2px 2px 8px rgba(000, 000, 000, 0.07);
        z-index: 2;
    }
    .left-column, .right-column{
        width: 100%;
    }
    .project-container:hover .left-column{
        flex: 0 0 65.3%;
    }
    .main-part{
        margin-bottom: 22px;
    }
    .project-card .project-name{
        margin-bottom: 12px;

    }
    .project-card .project-description{
        height: 60px;
        overflow: hidden;
        position: relative;
    }
    .project-card .project-description::after{
        content: "";
        background: linear-gradient(-90deg, white, transparent);
        width: 6em;
        height: 1.2em;
        position: absolute;
        border: red;
        bottom: 0;
        right: 0;
    }

    .members{
        margin-top: 24px;
    }
    .right-column{
        overflow: auto;
        max-height:  100%;
        padding: 0 16px
    }
    .tasks-list li{
        margin-bottom: 12px;
    }
</style>