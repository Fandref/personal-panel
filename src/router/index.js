import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Projects from '@/views/Projects.vue'
import Project from '@/views/Project.vue'
import Team from '@/views/Team.vue'
import AddProject from '@/views/AddProject.vue'
const routes = [
  {
    
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/projects/add',
    name: 'AddProject',
    component: AddProject
  },

  {
    path: '/team',
    name: 'Team',
    component: Team
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
