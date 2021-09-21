<template>
    <label class="pari-check-box">
        <input class="checkbox" :disabled="disabled" type="checkbox" :checked="checked" @change="updateInput" :value="value">

        {{label}}
    </label>
        
        
    
</template>

<script>
    export default {
        props:{
            value:{
                type: String,
                required: true
            },
            checked:{
                type: Boolean,
                required: false,
                default: false,
            },
            label:{
                type: String,
                required: false
            },
            disabled:{
                type: Boolean,
                required: false,
                default: false
            }
        },
        methods:{
            updateInput(event){
                
                this.$emit('changed', {
                    value: this.value,
                    checked: event.target.checked
                });
            }
        },
    
    }
</script>

<style scoped>
    label{
        cursor: pointer;
    }
    .checkbox{
        width: 1.2em;
        height: 1.2em;
        border: none;
        position: relative;
        margin-right: 10px;
    }
    .checkbox::after{
        content: "";
        position: absolute;
        width: 100%;
        background: #fff;
        border: 2px solid black;
        height: 100%;
        top: 0;
        left: 0;

    }
    .checkbox::before{
        content: "";
        font-family: "Raleway Think";
        z-index: 2;
        font-size: 2em;
        line-height: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 60%;
        left: -1px;
        transform-origin: center;
    }
    .checkbox:checked::before{
        content: "✖";
    }

    
    .checkbox:checked:after{
        content: "";
        background: var(--accent);
        
    }
</style>