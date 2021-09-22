import {API} from "@/model"


export const projectModule = {
    state: () => ({
        project: {},
        isLoading: false
    }),
    mutations: {
        setProject(state, project) {
            state.project = project;
        },
        setIsLoading(state, bool) {
            state.isLoading = bool;
        },
        updateProjectTask(state, taskData){
            const taskIndex = state.project.tasks.findIndex(task => task.name == taskData.name)
            state.project.tasks[taskIndex].complete = taskData.complete
        },
        
    },
    actions: {
        async loadProject({state, commit}, id) {
            try {
                commit('setIsLoading', true)
                const projects = await API.loadModel('projects')
                const project = projects.find(project => project.id === id)

               
                commit('setProject', project)
            } catch (e) {
                console.log(e)
            }
            finally{
                commit('setIsLoading', false)
            }
        },
        async saveProject({state}){
            try {
                
                let projects = await API.loadModel('projects')
                state.project.id = state.project.id  || projects[0].id+1
                const id = state.project.id;
                
                const projectIndex = projects.findIndex(project => project.id === id)
                if(projectIndex >= 0)
                    projects[projectIndex] = state.project
                else
                    projects.unshift(state.project)
                
                return API.saveModel("projects", projects)
            } catch (e) {
                console.log(e);
            }
            
        },
        updateProjectTask({commit, dispatch}, projectData){
            commit("updateProjectTask", projectData)

            dispatch('saveProject')

        }
        
    },
    namespaced: true
}