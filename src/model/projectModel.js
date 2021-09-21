import {API} from './index'


export default {
    projects : [],
    async loadProject (id){
        this.projects =  await API.loadModel('projects')
        const project = this.projects.find(project => project.id === id)
        return new Promise(resolve => resolve(project))

    },
 
    async saveProject (project){
        this.projects = await API.loadModel('projects')
        const {id} = project
        const projectIndex = this.projects.findIndex(project => project.id === id)
        if(projectIndex >= 0)
            projects[projectIndex] = project
        else
            projects(project)

        API.saveModel("projects", projects)
        return new Promise(resolve => resolve(true))
       
    },
    
}
