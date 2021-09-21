
<template>

    <page-container v-if="!isLoading"  :title="project.name" >
      <div class="project-content">
        <div class="left-column">
          <article>
            {{project.description}}
          </article>
          <div>
            <h3 style="margin: 16px">Над проєктом працюють:</h3>
            <memder-team-item style="background: transparent" v-for="member in project.members" :key="member.id" :name="member.name" :position="member.position" />
          </div>
        </div>
        <div class="right-column">
          <tasks-list :tasks="project.tasks" @changed="updateTask"/>
        </div>
      </div>
      
      
    </page-container>

    
</template>

<script>
// Тут щось не зрозуміле твориться
// Я дуже довго, різними шляхами змусити це запрацювати норм,
// але ніяк не вдалося ... Тому на цій сторінці тількі так(

import PageContainer from '../components/PageContainer.vue'
import ProjectProgress from '../components/ProjectProgress.vue'
import TasksList from '../components/TasksList.vue'
import { mapActions, mapState } from 'vuex'
import MemderTeamItem from '../components/memberTeam/MemderTeamItem.vue'

    export default {
      components: { PageContainer, TasksList, ProjectProgress, MemderTeamItem },
      data(){
        return {
        
        }
      },
        
    mounted(){
        this.loadProject(parseInt(this.$route.params.id))   
        this.loadTeam()
        
      },
      computed: {
        ...mapState({
          isLoading: state => state.project.isLoading,
          project: state => state.project.project,
          team: state => state.team.team
        })
      },
      methods: {
        ...mapActions({
          loadProject: 'project/loadProject',
          loadTeam: 'team/loadTeam',
          updateProjectTask: 'project/updateProjectTask',
          
          
        }),
        
        updateTask(task){
          this.updateProjectTask(
            {name: task.value,
            complete: task.checked}
          )
        }
        
      },
      
    }
  
</script>

<style scoped>
.project-content{
  display: flex;
  flex-wrap: wrap-reverse;
}
.left-column{
  flex: 0 0 65%;
}
.right-column{
  flex: 0 0 35%;
  padding-right: 40px;
  box-sizing: border-box;
}
article{
  margin-bottom: 40px;
}

</style>