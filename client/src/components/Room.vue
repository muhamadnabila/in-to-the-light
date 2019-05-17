<template>
  <div class="container">
    <h1 class="row justify-content-center">Room ID : {{ $route.params.id }}</h1>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header bg-primary text-white text-center">BLUE TEAM</div>
          <ul class="list-group list-group-flush">
            <li
              v-for="(player, playerIndex) in blueTeam"
              class="list-group-item"
              :key="playerIndex"
            >{{ player }}</li>
          </ul>
          <button @click="changeSide('blue')" type="button" class="btn btn-primary">Join BLUE</button>
        </div>
      </div>
      <h1 class="align-middle">VS</h1>
      <div class="col">
        <div class="card">
          <div class="card-header bg-danger text-white text-center">RED TEAM</div>
          <ul class="list-group list-group-flush">
            <li
              v-for="(player, playerIndex) in redTeam"
              class="list-group-item"
              :key="playerIndex"
            >{{ player }}</li>
          </ul>
          <button @click="changeSide('red')" type="button" class="btn btn-danger">Join RED</button>
        </div>
      </div>
    </div>
    <div class="row">
      <ol>
        <li v-for="player in players" :key="player">
          <h5>{{ player }}</h5>
        </li>
      </ol>
    </div>
    <div class="row">
      <button v-show="startGame" class="btn btn-success">Start Game</button>
    </div>
  </div>
</template>

<script>
console.log("trigerred");
import db from "@/db.js";
export default {
  name: "Room",
  data() {
    return {
      // hasJoined: false,
      startGame: false,
      redTeam: [],
      blueTeam: [],
      username: "",
      createdAt: "",
      name: "",
      totalPlayer: "",
      players: [], //['siapa','nanya']
      roomId: "",
      kuotaRoom: ""
    };
  },
  props: ["room"],
  mounted() {
    this.username = localStorage.getItem("username");
    console.log(this.username);
    db.collection("room")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        this.createdAt = doc.data().createdAt;
        this.name = doc.data().name;
        this.totalPlayer = doc.data().totalPlayer;
        this.players = doc.data().players;
        this.roomId = doc.id;
        this.kuotaRoom = doc.data().kuotaRoom;
        this.blueTeam = doc.data().blue;
        this.redTeam = doc.data().red;
        if(this.players.length == this.kuotaRoom){
          this.startGame = true
        }
      });
  },
  methods: {
    changeSide(team) {
      this.players = this.players.filter(
          username => this.username !== username
        );
      if (team === "blue") {
        this.redTeam = this.redTeam.filter(
          username => this.username !== username
        );
        if (this.blueTeam.indexOf(this.username) === -1) {
          this.blueTeam.push(this.username);
        }
        
      } else {
        this.blueTeam = this.blueTeam.filter(
          username => this.username !== username
        );
        if (this.blueTeam.indexOf(this.username) === -1) {
          this.redTeam.push(this.username);
        }
      }
      db.collection("room")
          .doc(this.$route.params.id)
          .set({
            createdAt : this.createdAt,
            name : this.name,
            totalPlayer : this.totalPlayer,
            players : this.players,
            roomId : this.$route.params.id,
            kuotaRoom : this.kuotaRoom,
            blue : this.blueTeam,
            red : this.redTeam,
          });
    }
  }
};
</script>
