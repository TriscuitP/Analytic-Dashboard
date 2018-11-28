<template>
  <div class="fansboard">
    <h1>{{msg}}</h1>

    <div class="fancount">
      <p>Total number of fans:</p>
      <p>{{totalFans}}</p>
      <!-- <NewFansChart/> -->
    </div>

    <div class="geo">
      <FanLocation/>
    </div>

    <!-- <div class="aftermap" style="background-color :#848484;">
      <div class="agecount" style="float: left; width: 50%;">
        <h3>Age Groups:</h3>
        <ul v-for="(a, idx) in ageGroups" :key="idx">
          <p>{{a.group}}: {{a.number}}</p>
        </ul>
      </div>
      <div class="passion" style="float: right; width: 50%;">
        <h3>Popular Interests:</h3>
        <InterestChart :interests="orderedVals"/>
      </div>
    </div> -->

    <div class="nav">
      <ul>
        <button class="tab" v-on:click="makeActive('fansInterest')">FANS Interest</button>
        <button class="tab" v-on:click="makeActive('fansEntourage')">FANS Entourage</button>
      </ul>
    </div>

    <div class="tabcontent" v-show="isActiveTab('fansInterest')">
      <InterestChart :interests="orderedVals"/>
    </div>

    <div class="tabcontent" v-show="isActiveTab('fansEntourage')">
      <!-- <h3>Entourage component</h3> -->
      <ArcSubscription/>
      <NewFansChart/>
    </div>

    

  </div>
</template>

<script src="https://d3js.org/d3.v5.js"></script>
<script src="https://d3js.org/d3-hexbin.v0.2.min.js"></script>
<script src="https://d3js.org/topojson.v2.min.js"></script>
<script src="https://d3js.org/d3-queue.v3.min.js"></script>
<script>
import { auth, db } from '../main'
import InterestChart from "./InterestChart";
import FanLocation from "./FanLocation";
import ArcSubscription from "./ArcSubscription"
import NewFansChart from "./NewFansChart"
import _ from 'lodash';

export default {
  name: 'Fans',
  components: {
    InterestChart,
    FanLocation,
    ArcSubscription,
    NewFansChart
  },
  data () {
    return {
      msg: 'Fans Data',
      userId: '',
      fans: [],
      totalFans: 6500,
      allFollowers: [],
      ageGroups: [
        {group: "0-18", number: 3000},
        {group: "25-34", number: 2500},
        {group: "34-100", number: 1000}
      ], //TODO: Male/Female
      interestsVals: [
        {name: "art", value: 60}, {name: "beauty", value: 67}, {name: "cycling", value: 655},
        {name: "dancing", value: 456}, {name: "edm", value: 875}, {name: "excercise", value: 40},
        {name: "fashion", value: 3}, {name: "fitness", value: 850}, {name: "food", value: 789},
        {name: "games", value: 600}, {name: "gardening", value: 15}, {name: "golf", value: 1000},
        {name: "health", value: 900}, {name: "hunting", value: 965}, {name: "kayaking", value: 85},
        {name: "love", value: 600}, {name: "music", value: 1500}, {name: "painting", value: 56}, 
        {name: "photos", value: 452}, {name: "reading",value: 245}, {name: "running", value: 456}, 
        {name: "skiing", value: 76}, {name: "sports", value: 1200}, {name: "swimming", value: 865}, 
        {name: "travel", value: 764}, {name: "volunteer", value: 235}
      ],
      users: [],
      choice: ''
    }
  },
  firestore () {
    // this.userId = auth.currentUser.uid
    return {
      allFollowers: db.collection("follows"),
      users: db.collection("users")
    }
  },
  computed: {
    // Gets total number of fans user has
    getTotalFans() {
      let total = 0;
      for (let index = 0; index < this.allFollowers.length; index++) {
        if(this.allFollowers[index].where("followed_id", "==", this.userId))
          total++;
          // Check if fan is in list
          if(!fans.includes(this.allFollowers[index]))
            this.fans.push(this.allFollowers[index]);
      }
      this.totalFans = total;
      return total;
    },
    // Order interests in desc order
    orderedVals() {
      return _.orderBy(this.interestsVals, 'value').slice().reverse();
    }
  },
  methods: {
    // Calculates age groups of fans
    calculateAgeGroups() {
      for (let index = 0; index < this.fans.length; index++) {
        var dateString = getUserBirth(this.fans[index]);

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
          age--;
        
        if(age < 19)
          this.ageGroups[0].number++
        else if(age > 33)
          this.ageGroups[2].number++
        else
          this.ageGroups[1].number++
      }
    },
    // Gets user birth date from users list
    getUserBirth(fan) {
      for (let index = 0; index < this.users.length; index++) {
        if(this.users.uid == fan.follower_id)
          return this.users.birth_date;
      }
    },
    // Adding to interestVal list
    countInterests() {
      for (let index = 0; index < this.fans.length; index++) {
        const arr = this.fans[index].interests;
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == true)
            this.interestsVals[index].value++;          
        }
      }
    },
    // Gets top 10 interests of fans
    getInterests(arr) {
      return arr.slice(0, 10);
    },
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
.tab {
  background-color: #555;
  color: white;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 17px;
  width: 25%;
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
