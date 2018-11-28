<template>
  <div class="dash">
    <div class="header">
      <ul>
        <!-- Link to go to homepage -->
        <li style="float:left"><a href="#" class="homelink">Fanmire</a></li>
        <!-- Dropdown Menu -->
        <li style="float:right" class="dropdown">
          <a href="javascript:void(0)" class="dropbtn">[User pic + name]</a>
          <div class="dropdown-content">
            <a href="#">Home</a>
            <a href="#">Edit Setting</a>
            <a href="#">Logout</a>
          </div>
        </li>
      </ul>
    </div>

    <div class="title">
      <h1>{{ msg }}</h1>
    </div>

    <div class="nav">
      <ul>
        <button class="tab" v-on:click="makeActive('fansActive')">Fans</button>
        <button class="tab" v-on:click="makeActive('postActive')">Posts</button>
        <button class="tab" v-on:click="makeActive('eventsActive')">Events</button>
      </ul>
    </div>

    <div class="tabcontent" v-show="isActiveTab('fansActive')">
      <Fans/>
    </div>

    <div class="tabcontent" v-show="isActiveTab('postActive')">
      <h3>Posts component</h3>
      <!-- Add component here -->
    </div>

    <div class="tabcontent" v-show="isActiveTab('eventsActive')">
      <h3>Events component</h3>
      <!-- Add component here -->
    </div>

  </div>
</template>

<script>
import Fans from './Fans'

export default {
  name: 'Dashboard',
  components: {
    Fans
  },
  data () {
    return {
      msg: 'Analytics',
      choice: ''
    }
  },
  methods: {
    makeActive(val) {
      this.choice = val
    },
    isActiveTab(val) {
      return this.choice === val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  /* color: rgb(250, 49, 65); */
  /* position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
.homelink {
  text-decoration: none;
  color: rgb(250, 49, 65);
}
.dropdown:hover .dropbtn {
  background-color: rgb(250, 49, 65);
}
.dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  /* padding: 14px 16px; */
  text-decoration: none;
}
.dropdown {
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  left: auto;
  right: 0;
  margin-right:-10px;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
    display: block;
}
.tab {
  background-color: #555;
  color: white;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 17px;
  width: 33.33%;
}
.tab:hover {
  background-color: #A5A5A5;
}
.tab:focus {
  background-color:#848484;
}
.tabcontent {
  background-color:#848484;
  /* background-color: beige */
  /* background-color:white; */
}
h1, h2 {
  font-weight: normal;
  color: rgb(250, 49, 65);
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
