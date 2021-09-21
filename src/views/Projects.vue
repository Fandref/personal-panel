<template>
    <page-container title="Проєкти">
        <div class="top-bar">
            <tab-bar 
        @update:model-value="setSelectedFilter"
        :defaultTab="selectedFilter"
        :tabs="filterOptions"
        />
            <primary-button @click="$router.push('/projects/add')">Додати проєкт</primary-button>
        </div>
        
        <project-list
        :projects="filteredProjects"
        :style="[filteredProjects.length > 0 ? 'margin: -15px -20px 0 -15px; width: unset' : '']"
        />
         
    </page-container>

</template>

<script>
import PageContainer from '../components/PageContainer.vue'
import ProjectList from '../components/ProjectList.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TabBar from '../components/UI/TabBar.vue'
import PrimaryButton from '../components/UI/buttons/PrimaryButton.vue'

    export default {
  components: { PageContainer, ProjectList, TabBar, PrimaryButton },
    computed: {
         ...mapState({
                projects: state => state.projects.projects,
                selectedFilter: state => state.projects.selectedFilter,
                filterOptions: state => state.projects.filterOptions
            }),
        ...mapGetters({
            filteredProjects: "projects/filteredProjects"
        })
    },
    methods:{
        ...mapMutations({
            setSelectedFilter: "projects/setSelectedFilter",

        }),
        ...mapActions({
            loadProjects: "projects/loadProjects"
        }),
        

    },
    mounted(){
        this.loadProjects()
    }}
</script>

<style scoped>
    .top-bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px
    }
</style>