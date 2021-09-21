<template>
    <page-container title="Дашборд">
        <div class="dashboard">
            <div class="projects-column">
                <project-list :projects="progressProjects.slice(0, 4)" />
                <secondary-button style="margin-top:20px" @click="$router.push('/projects')">Всі проєкти</secondary-button>
                
            </div>
            <div class="team-column">
                <div class="team">
                    <div class="header-team">
                        <h3>Команда</h3>
                        <router-link to="/team" class="all-team">всі</router-link>
                    </div>
                    <ul class="team-crew">
                        <li>
                            <memder-team-item v-for="member in topicalMembers" :key="member.id" :name="member.name" :position="member.position" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </page-container>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';
import MemderTeamItem from '../components/memberTeam/MemderTeamItem.vue';
import PageContainer from '../components/PageContainer.vue';
import {mapState, mapGetters, mapActions} from 'vuex'
import SecondaryButton from '../components/UI/buttons/SecondaryButton.vue'
import ProjectList from '../components/ProjectList.vue';

    export default {
        components: { ProjectCard, MemderTeamItem, PageContainer, SecondaryButton, ProjectList},
        data(){
            return{}
        },
        computed:{
            ...mapState({
                projects: state => state.projects.projects
            }),
            ...mapGetters({
                topicalMembers: 'team/topicalMembers',
                progressProjects: 'projects/progressProjects'
            })
        },
        methods:{
            
            ...mapActions({
                loadProjects: 'projects/loadProjects',
                loadTeam: 'team/loadTeam'
            })
        },
        mounted(){
            this.loadProjects()
            this.loadTeam()
            
        },
    }
</script>

<style scoped>
    
    .dashboard{
        display: flex;
        flex-wrap: wrap;
    }
    .projects-column{
        
        flex: 0 0 75%;
        
    }
    
    .team-column{
        flex: 0 0 25%;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .team{
        padding: 16px;
        background: #fff;
        border-radius: var(--m-border-radius);
        min-height: 400px;
    }
    .header-team{
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .all-team{
        color: var(--dark-gray);
        transition: color .5s ease;
    }
    .all-team:hover{
        color: #000;
    }
    .team-crew{
        margin-left: -16px;
        margin-right: -16px;
    }
</style>