<template>

    <page-container title="Новий проєкт">
        <div class="save-message-container" v-if="messageSave" @click="$router.push('/')">
            <div class="save-message-block">
                <h2>{{messageSave}}</h2>
                <primary-button>OK</primary-button>
            </div>
        </div>
        <div class="form">
            <div class="input-group">
                <input type="text" ref="projectName" placeholder="Назва проєкту" v-model.trim="name">
                <div class="error" v-if="errorName">{{errorName}}</div>
            </div>
            <div class="input-group">
                <textarea ref="projectDescription" v-model.trim="description" placeholder="Опис">
                </textarea>
                <div class="error" v-if="errorDescription">{{errorDescription}}</div>
            </div>
            
            <div class="input-group">
                <h3>Задачі</h3>
                <ul class="tasks">
                    <li v-for="task in tasks" :key="task.name" v-on:click="deleteTask(task.name)">
                        {{task.name}} 
                    </li>
                </ul>
                <input placeholder="Нова задача" ref="projectTask" v-model.trim="currentTask" @keyup.enter="addTask" type="text">
                <secondary-button style="margin-left: 20px; font-size: 22px" @click="addTask">+</secondary-button>
                <div class="error" v-if="errorTask">{{errorTask}}</div>
            </div>
            <div class="input-group">
                <div class="add-members-block">
                <div class="members">
                    <h3>Учасники проєкту</h3>
                    <memder-team-item @update="deleteMember" style="background: transparent" v-for="member in members" :key="member.id" :id="member.id"  :name="member.name" :position="member.position" :handler="true" />
                </div>
                <div class="team">
                    <h3>Команда</h3>
                    <memder-team-item @update="addMember" style="background: transparent" v-for="member in unSelectedTeam" :key="member.id" :id="member.id"  :name="member.name" :position="member.position" :handler="true" />
                </div>
            </div>
            <div class="error" v-if="errorMembers">{{errorMembers}}</div>
            </div>
            <primary-button @click="preparationProject">Створити проєкт</primary-button>
        </div>
        
        
       
        
    </page-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SecondaryButton from '../components/UI/buttons/SecondaryButton.vue'
import MemderTeamItem from '../components/memberTeam/MemderTeamItem.vue'
import PageContainer from '../components/PageContainer.vue'
import PrimaryButton from '../components/UI/buttons/PrimaryButton.vue'
    export default {
  components: { SecondaryButton, MemderTeamItem, PageContainer, PrimaryButton },
        
        data(){
            return{
                name: '',
                description: '',
                currentTask: '',
                errorName: '',
                errorDescription: '',
                errorTask: '',
                tasks: [],
                members: [],
                errorMembers: '',
                messageSave: '',
            }
        },
        computed: {
            ...mapState({
                team: state => state.team.team
            }),
            

            unSelectedTeam(){
                 return this.team.filter(memberTeam => {
                    delete memberTeam.topical
                     if(!this.members.find(member => JSON.stringify(member) == JSON.stringify(memberTeam))){
                         return true
                     }
                        
                }
                )
            }
        },
        methods: {
            ...mapActions({
                loadTeam: 'team/loadTeam',
                saveProject: 'project/saveProject'
            }),
            ...mapMutations({
                setProject: 'project/setProject'
            }),
            addMember(member){
                this.members.push(member)
            },
            deleteMember(member){
                
                this.members = this.members.filter(memberProject => JSON.stringify(memberProject) != JSON.stringify(member))
            },
            preparationProject(){
                if(this.name.length == 0){
                    this.errorName = 'Назвіть проєкт'
                    this.$refs.projectName.focus()
                    return
                }
                if(this.description.length < 20){
                    this.errorDescription = 'Опишіть проєкт'
                    this.errorName = ''
                    this.$refs.projectDescription.focus()
                    return
                }
                if(this.tasks.length == 0){
                    this.errorTask = 'Додайте завдання для проєкту'
                    this.errorDescription = ''
                    this.$refs.projectTask.focus()
                    return
                }
                if(this.members.length == 0){
                    this.errorTask = ''
                    this.errorMembers = 'Вкажіть хто буде працювати над проєктом'
                    return
                }
                this.errorMembers = ''
                this.setProject({
                    name: this.name,
                    description: this.description,
                    tasks: this.tasks,
                    members: this.members
                })
                const isSave = this.saveProject()
                if(isSave){
                    this.messageSave = "Проєкт додано"
                }
                else{
                    this.messageSave = "Щось пішло не так"
                }
            },
            addTask(){
                if(this.currentTask){
                    if(!this.tasks.find(task=> task.name.toLowerCase() === this.currentTask.toLowerCase())){
                        this.tasks.push({name: this.currentTask, complete: false})
                        this.currentTask = ''
                        this.errorTask = ""
                    }
                        
                    else{
                        this.errorTask = "Ця задача вже додана"
                    }
                        
                }
                    
            },
            deleteTask(taskName){
               
                this.tasks = this.tasks.filter(task=> task.name.toLowerCase() !== taskName.toLowerCase())
            }
        },
        mounted(){
            this.loadTeam()
        }
    }
</script>

<style scoped>
.add-members-block{
    display: flex;
}
.form{
    width: 80%;
}
.input-group{
    margin-bottom: 60px;
}
.error{
    color: rgb(180, 25, 25);
    margin-top: 12px;
    font-family: "Raleway Medium";
}
.save-message-container{
    display: flex;
    background: rgba(000, 000, 000, 0.6);
    position: fixed;
    backdrop-filter: blur(3px);
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 99;
}
.save-message-block{
    background: #fff;
    padding: 20px;
    border-radius: var(--m-border-radius);
    text-align: center;
}
.save-message-block h2{
    margin-bottom: 26px;
}

input, textarea{
    font-size: 16px;
    font-family: "Raleway";
    padding: 15px;
    outline: none;
    border: 2px solid black;
    background: #fff;
    border-radius: 5px;
}
textarea{
    resize: none;
    width: 100%;
    height: 260px;
}
input:focus, textarea:focus{
    border: 2px solid var(--accent);
}
h3{
    margin-bottom: 16px;
}
.add-members-block>div{
    padding: 0 16px;
    box-sizing: border-box;
    flex: 0 0 50%;
}
.tasks{
    margin-bottom: 16px;
}
.tasks li{
    padding: 12px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1px solid rgba(121, 56, 56, 0);
    border-bottom: 1px solid rgba(121, 56, 56, 0);

}
.tasks li:hover{
   border-bottom-color: rgba(000, 000, 000, 0.05);
   border-top-color: rgba(000, 000, 000, 0.05);

}
.tasks li::after{
    content: '✖';
    display: block;
}
.tasks li:hover::after{
    content: '✖';
    color: var(--accent)
}
.team{
    border-left: 1px solid var(--light-gray);
}
</style>