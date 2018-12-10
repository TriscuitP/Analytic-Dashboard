<template>
  <div class="fansboard">
    <div class="geo">
      <div style="padding-top: 30px;">FANS</div>
      <div style="color: #FD2D3A; font-size: 30px;">{{totalFans}}</div>
      <FanLocation/>
    </div>

    <div class="stats">
      <div class="nav">
        <ul>
          <button class="tab" v-on:click="makeActive('fansInterest')">FANS Interest</button>
          <button class="tab" v-on:click="makeActive('fansEntourage')">FANS Entourage</button>
        </ul>
      </div>

      <div class="tabcontent" v-show="isActiveTab('fansInterest')" style="height: 365px">
        <InterestChart :interests="orderedVals" style="float: left; padding-left: 90px;"/>
      </div>

      <div class="tabcontent" v-show="isActiveTab('fansEntourage')">
        <ArcSubscription style="width: 50%; float:left;"/>
        <div style="width: 50%; float:left;">
          <div class="nav" style="float:left">
            <ul>
              <button class="tab2" v-on:click="makeActiveYear('2017')">2017</button>
              <button class="tab2" v-on:click="makeActiveYear('2018')">2018</button>
              <button class="tab2" v-on:click="makeActiveYear('2019')">2019</button>
              <button class="tab2" v-on:click="makeActiveYear('2020')">2020*</button>
            </ul>
          </div>

          <div class="tabcontent" v-show="isActiveTabYear('2017')">
            <div style="padding-top: 90px; padding-right: 40px">
              <div style="text-align: right; font-size: 13px">TOTAL EARNINGS</div>
              <div style="text-align: right; font-weight: bold; font-size: 35px">$110,534.00</div>
            </div>
          </div>

          <div class="tabcontent" v-show="isActiveTabYear('2018')">
            <div style="padding-top: 90px; padding-right: 40px">
              <div style="text-align: right; font-size: 13px">DECEMBER EARNINGS</div>
              <div style="text-align: right; font-weight: bold; font-size: 35px">$13,201.00</div>
              <div style="text-align: right; font-size: 13px">EXPECTED*</div>
            </div>
          </div>

          <div class="tabcontent" v-show="isActiveTabYear('2019')">
            2019
          </div>

          <div class="tabcontent" v-show="isActiveTabYear('2020')">
            2020
          </div>
        </div>
        <!-- <NewFansChart/> -->
      </div>
    </div>
    <!-- <br> -->
    <div v-show="isActiveTab('fansEntourage')" style="clear:both;">
      <NewFansChart/>
    </div>
    
  </div>
</template>

<script src="https://d3js.org/d3.v5.js"></script>
<script src="https://d3js.org/topojson.v2.min.js"></script>
<script src="https://d3js.org/d3-queue.v3.min.js"></script>
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
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
      fansHome: [],
      followDates: [],
      subscribers: [],
      // Dummy Data
      totalFans: 6545329,
      allFollowers: [],
      // Dummy Data (Change values to zero when connecting to firebase)
      ageGroups: [
        {group: "0-18", number: 3000},
        {group: "25-34", number: 2500},
        {group: "34-100", number: 1000}
      ],
      // Dummy Data (Change values to zero when connecting to firebase)
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
      // Choice and year used for tabs
      choice: 'fansInterest',
      year: ''
    }
  },
  firestore () {
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
    // Might be better to sort list and just use one loop to go through both lists
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
        if(this.users[index].uid == fan.follower_id)
          return this.users.birth_date;
      }
    },
    // Adding to interestVal list
    countInterests() {
      for (let index = 0; index < this.fans.length; index++) {
        const arr = getUserInterest(this.fans[index]);
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == true)
            this.interestsVals[index].value++;          
        }
      }
    },
    getUserInterest(fan) {
      for (let index = 0; index < this.users.length; index++) {
        if(this.users[index].uid == fan.follower_id)
          return this.users.interests;
      }
    },
    // Gets top 10 interests of fans
    getInterests(arr) {
      return arr.slice(0, 10);
    },
    // Finds location of all fans and store in list
    // Might be better to sort list and just use one loop to go through both lists
    calculatePopulation() {
      for (let index = 0; index < this.fans.length; index++) {
        var dateTown = getUserBirth(this.fans[index]);
        this.fansHome.push(dateTown);
      }
    },
    // Gets location of fan
    getLocation(fan) {
      for (let index = 0; index < this.users.length; index++) {
        if(this.users.uid == fan.follower_id)
          return this.users.hometown;
      }
    },
    // Get dates of when fans followed
    getFollowDate() {
      for (let index = 0; index < this.fans.length; index++) {
        this.followDates.push(this.fans[index].created_date);     
      }
    },
    // Get dates of when fans subscribed 
    getSubscribers() {
      for (let index = 0; index < this.fans.length; index++) {
        this.subscribers.push(this.fans[index].subscribe_date);
        
      }
    },

    // For tabs
    makeActive(val) {
      this.choice = val
    },
    makeActiveYear(val) {
      this.year = val
    },
    isActiveTab(val) {
      return this.choice === val
    },
    isActiveTabYear(val) {
      return this.year === val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.geo {
  width: 50%;
  float: left;
  background-color: #383838;
}
.stats {
  width: 50%;
  float: left;
  overflow: hidden;
  /* margin: 0 auto; */
  background-color: #383838;
}

.tab {
  background-color: #555;
  color: white;
  /* float: left; */
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 20px;
  /* width: 25%; */
}
.tab2 {
  background-color: #383838;
  color: white;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 12px;
  height: 50px;
  width: 25%;
}
.tab:hover {
  background-color: #A5A5A5;
}
.tab:focus {
  background-color:#848484;
}
.tab2:focus {
  /* background-color:#848484; */
  font-size: 20px;
  font-weight: bold;
}
.tabcontent {
  background-color:#383838;
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
