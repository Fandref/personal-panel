<template>
  <div class="app-container">
    <header :class="{'hidden-header': !isScrollTop}">
      <circle-button @click="showLeftPanel">=</circle-button>
      <nav class="right-panel">
        <li>
          <circle-button title="Типу сповіщення" :hoverEffect="false" style="background: blue"></circle-button>
        </li>
        <li>
          <circle-button title="Типу вихід" :hoverEffect="false" style="background: red"></circle-button>
        </li>
      </nav>
    </header>
    <div class="left-panel" :class="{active: isLeftPanelOpen}">
      <button class="left-panel-close-button" @click="hideLeftPanel">—</button>
      <nav class="left-menu">
        <li><router-link class="nav-link" to="/">Дашборд</router-link></li>
        <li><router-link class="nav-link" to="/projects">Проєкти</router-link></li>
        <li><router-link class="nav-link" to="/team">Команда</router-link></li>
      </nav>
    </div>
    <div class="content-container">
      <router-view/>
    </div>
  
  </div>
  
  
</template>

<script>
import CircleButton from './components/UI/buttons/CircleButton.vue';

export default {
  
  components: {CircleButton},
  data(){
    return {
      isScrollTop: true,
      lastScrollY: 0,
      pixelCount: 0,
      isLeftPanelOpen: true,
    }
  },
  methods: {
    hideLeftPanel(){
      this.isLeftPanelOpen = false;
    },
    showLeftPanel(){
      this.isLeftPanelOpen = true;
    },
    changeLeftPanel(){
      if(window.innerWidth <= 768)
        this.hideLeftPanel()
    },
    toggleHeader(){
      const scrollY = window.scrollY 
      const isScrollTop = this.lastScrollY > scrollY;
      this.lastScrollY = scrollY;

      if(isScrollTop){
        this.isScrollTop = isScrollTop;
        this.pixelCount = 0;
      }
      else if(!isScrollTop && ++this.pixelCount > 30){
        
        this.isScrollTop = isScrollTop;
        this.pixelCount = 0;
      
      }
    },
  },
  mounted(){
    this.changeLeftPanel()
    window.addEventListener('scroll', this.toggleHeader);
    window.addEventListener('resize', this.changeLeftPanel);
    
  },
  unmounted(){

    window.removeEventListener('scroll', this.toggleHeader);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway');
*{
  margin: 0;
  padding: 0;
}
:root{
  --accent: #ecec56;
  --op-accent: rgba(236, 236, 86, 0.5);
  --m-border-radius: 10px;
  --dark-gray: #606060;
  --light-gray: #C4C4C4; 
}
::-webkit-scrollbar-track {
	background: 0 0
}

::-webkit-scrollbar {
	width: 4px;
	background-color: transparent
}

::-webkit-scrollbar-thumb {
	-webkit-border-radius: 10px;
	border-radius: 10px;
	background-color: var(--accent)
}
button{
  background: transparent;
  border: none;
  padding: none;
  outline: none;
  cursor: pointer;
  font-size: inherit;
}
a{
  color: inherit;
  text-decoration: none;
}

ul, nav{
  list-style: none;
}
body{
  background: #FBFBFB;
  font-size: 18px;
}
#app {
  font-family: 'Raleway';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  min-height: 100vh;
}


header{
  padding: 15px 30px;
  position: fixed;
  z-index: 9;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content:space-between;
  align-items: center;
  transition: top .8s ease;
  top: 0;
  left: 0;
}
.hidden-header{
  top: -70px;
}

.right-panel li{
  display: inline-block;
}
.right-panel li:not(:last-child){
  margin-right: 20px;
}
.left-panel{
  height: 100vh;
  width: 210px;
  padding: 13px 16px 16px 30px;
  background: #fff;
  position: fixed;
  z-index: 10;
  top: 0;
  left: -210px;
  max-width: 100%;
  box-sizing: border-box;
  transition: left 1s ease;

}
.left-panel.active{
  left: 0;
}
.left-menu{
  margin-top: 20px;
}
.left-panel li{
  margin: 14px 0;
}
.left-panel li:first-child{
  margin-top: 0;
}

.nav-link{
  color: #000;
  font-weight: 500;
  font-family: 'Raleway Medium';
  text-decoration: none;
}
.nav-link:hover{
  color: var(--accent);
}
.content-container{
  padding: 15px 30px 30px;
  transition: margin-left 1s ease;
}
.left-panel.active + .content-container{
  margin-left: 210px;
}

@media (max-width:768px) {
  .left-panel{
    width: 100%;
    left: -100%;
  }
  .left-panel.active + .content-container{
    margin-left: 0px;
  }
 
}
</style>
