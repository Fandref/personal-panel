import { createStore } from 'vuex'
import { projectsModule } from './modules/projectsModule'
import { projectModule } from './modules/projectModule'
import { teamModule } from './modules/teamModule'

export default createStore({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {

    team: teamModule,
    projects: projectsModule,
    project: projectModule
  }
})
