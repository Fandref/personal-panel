<template>
    <div class="member-team-item"
    :class="[block ? 'block' : 'inline']"
    
    @click="clickHandler">
        <div class="main-part">
            <div class="photo-block">
                <!-- <img src="" alt=""> -->
                <span>{{firstLater}}</span>
            </div>
            <div v-if="block" class="detail-block">
                <div class="name">{{name}}</div>
                <div class="position">{{position}}</div>
            </div>
        </div>
        <div v-if="topical">
            📌
        </div>
        
        
    </div>
</template>

<script>
    export default {
        props:{
            name:{
                type: String,
                required: true
            },
            position:{
                type: String,
                required: true
            },
            photo: {
                type: String,
                required: false,
                default: null
            },
            block:{
                type: Boolean,
                required: false,
                default: true
            },
            topical:{
                type: Boolean,
                required: false,
                default: null
            },
            id :{
                type: Number,
                required: false
            },
            handler:{
                type: Boolean,
                required: false,
                default: null
            },
            
        },
        computed:{
            firstLater(){
                return this.name.charAt(0)
            }
        },
        methods: {
            clickHandler(event){
                if(this.topical !== null)
                    
                    this.$emit('update', {
                        id: this.id,
                        topical: !this.topical

                    });
                else if(this.handler !== null)
                    this.$emit('update', {
                        id: this.id,
                        photo: this.photo,
                        name: this.name,
                        position: this.position,
                        


                    });
            }
        }
    }
</script>

<style scoped>
.block{
    display: flex;
    padding: 10px 16px;
    align-items: center;
    cursor: pointer;
    background: #fff;
    transition: background .5s ease;
    justify-content: space-between;
}
.block:hover{
    background: rgba(000, 000, 000, 0.05)
}
.inline{
    display: inline-flex;
    margin-right: 8px;
}
.main-part{
    display: flex;
    align-items: center;
}
.photo-block{
    display: flex;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    overflow: hidden;
}
.inline .photo-block{
    height: 50px;
    width: 50px;
}
.photo-block span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: var(--light-gray);
    font-family: "Raleway Medium";
    color: #fff;
}
.detail-block{
    margin-left: 12px;
}
.detail-block .name{
    font-family: "Raleway Medium";
    margin-bottom: 6px;
}
.detail-block .position{
    font-size: 16px;
    color: var(--dark-gray);
    
}
</style>