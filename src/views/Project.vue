
<template>

    <page-container v-if="!isLoading"  :title="project.name" >
      <div class="project-content">
        <div class="left-column">
          <article>
            {{project.description}}
          </article>
          
          <div class="members-block">
            <h3 style="margin: 16px">Над проєктом працюють:</h3>
            <memder-team-item style="background: transparent" v-for="member in project.members" :key="member.id" :name="member.name" :position="member.position" />
          </div>
          
        </div>
        <div class="right-column">
          <div class="task-container">
            <h3>Список завдань</h3>
            <tasks-list class="task-content" :tasks="project.tasks" @changed="updateTask"/>
            <project-progress :tasks="project.tasks" />
          </div>
          
        </div>
      </div>
      
      
    </page-container>

    
</template>

<script>
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
      beforeMount() {
        
        console.log('e')
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
  padding-left: 40px;
  box-sizing: border-box;
}
.task-container{
  padding: 20px 20px;
  background: #fff;
  position: sticky;
  top: 30px;
  border-radius: var(--m-border-radius);
}
.task-container h3{
  margin-bottom: 14px;
}
.task-content{
  margin-bottom: 30px;
}
article{
  margin-bottom: 40px;
}
.members-block{
  margin-top: 30px;
}

</style>