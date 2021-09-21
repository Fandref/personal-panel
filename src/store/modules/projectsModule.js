import { API } from "../../model";

export const projectsModule = {
    state: () => ({
        projects: [],
        selectedFilter: 'allProjects',
        filterOptions: [
            {value: 'allProjects', name: 'Всі'},
            {value: 'completeProjects', name: 'Завершенні'},
            {value: 'progressProjects', name: 'В процесі'},
            
        ]
    }),
    getters: {
        filteredProjects (state, getters){
            const filterMethod = state.selectedFilter;
            switch (filterMethod) {
                case "progressProjects":
                    return getters.progressProjects
                    break;

                    case "completeProjects":
                        return getters.completeProjects
                        break;
            
                default:
                    return getters.allProjects
                    break;
            }
            
            
        },
        isProgressProject: state => projectIndex => {
           
                const project = state.projects[projectIndex]
              
                const tasks = project.tasks
                const noCompleteTaskIndex= tasks.findIndex(task => {
                    if(!task.complete)
                        return true
                })
                const isprogressTasks = noCompleteTaskIndex >= 0 ? true : false
               
                return isprogressTasks
        },
        completeProjects(state, getters){
            
            return state.projects.filter((post, index)=> {
                return !getters.isProgressProject(index);
            })
        },
        progressProjects(state, getters){
            return state.projects.filter((post, index)=> {
                return getters.isProgressProject(index);
        
            })
        },
        allProjects(state){
           
            return state.projects
        }
    },
    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        updateProjectTask(state, projectData){
            const {projectId, task: taskData} = projectData
            const projectIndex = state.projects.findIndex(project => project.id == projectId)
            const taskIndex = state.projects[projectIndex].tasks.findIndex(task => task.name == taskData.name)
            state.projects[projectIndex].tasks[taskIndex].complete = taskData.complete
        },
        
        setSelectedFilter(state, selectedFilter) {
            state.selectedFilter = selectedFilter
        },
    
    },
    actions: {
        async loadProjects({state, commit}) {
            try {
                
                const response = await API.loadModel('projects');
                commit('setProjects', response)
            } catch (e) {
                console.log(e)
            }
        },
        async saveProjects({state}){
            try {
                await API.saveModel('projects', state.projects)
            } catch (e) {
                console.log(e);
            }
            
        },
        updateProjectTask({commit, dispatch}, projectData){
            commit("updateProjectTask", projectData)

            dispatch('saveProjects')

        }
        
    },
    namespaced: true
}