<template>
    <page-container title="Команда">
        <div class="members-list">
            <memder-team-item v-for="member in sortedMembers"
            @update="updateMemberTopical"
            :key="member.id"
            :id="member.id"
            :name="member.name"
            :position="member.position"
            :topical="member.topical">
            </memder-team-item>
        </div>
    </page-container>
</template>

<script>
import PageContainer from '../components/PageContainer.vue'
import MemderTeamItem from '../components/memberTeam/MemderTeamItem.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import PariCheckBox from '../components/UI/PariCheckBox.vue'
    export default {
        components: { PageContainer, MemderTeamItem, PariCheckBox },
        computed: {
            ...mapGetters({
                sortedMembers: "team/sortedMembers"
            })
        },
        methods: {
            ...mapActions({
                loadTeam: "team/loadTeam",
                updateMemberTopical: "team/updateTopical"
            }),

        },
    
        mounted(){
            this.loadTeam()
        }
        
        
    }
</script>

<style scoped>
.members-list{
    background: #fff;
    padding: 24px 0;
    border-radius: var(--m-border-radius);
}
</style>