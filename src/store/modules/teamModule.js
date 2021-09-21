import { API } from "../../model";

export const teamModule = {
    state: () => ({
        team: [],
    }),
    getters: {
        topicalMembers(state){
            return state.team.filter(member=>member.topical)
        },
        sortedMembers(state){
            return [...state.team].sort((first, second) => (first.topical === second.topical) ? 0 : first.topical ? -1 : 1)
        }
        
    },
    mutations: {
        setTeam(state, team){
            state.team = team
        },
        updateTopical(state, {id, topical}){
           
            const memberIndex = state.team.findIndex(member => member.id == id)
            state.team[memberIndex].topical = topical
        }
    },
    actions: {
        async loadTeam({state, commit}) {
            try {
                
                const response = await API.loadModel('team');
                commit('setTeam', response)
            } catch (e) {
                console.error(e)
            }
        },
        async saveTeam({state}){
            try {
                await API.saveModel('team', state.team)
                
            } catch (e) {
                console.error(e);
            }
            
        },
        updateTopical({commit, dispatch}, memberData){
            commit('updateTopical', memberData)
            dispatch('saveTeam')
        }


        
    },
    namespaced: true
}