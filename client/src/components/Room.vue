<template>
  <div class="container">
    <h1 class="row justify-content-center">{{ room.roomId }}</h1>
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
  </div>
</template>

<script>
import db from "@/db.js";
export default {
  name: "Room",
  data() {
    return {
      // hasJoined: false,
      redTeam: [],
      blueTeam: []
      // createdAt: doc.data().createdAt,
      // name: doc.data().name,
      // totalPlayer: doc.data().totalPlayer,
      // players: doc.data().players,//['siapa','nanya']
      // roomId: doc.id,
      // kuotaRoom: doc.data().kuotaRoom
    };
  },
  props: ["room", "username"],
  mounted() {

  },
  methods: {
    changeSide(team) {
      if (team === "blue") {
        this.redTeam = this.redTeam.filter(
          username => this.username !== username
        );
        if(this.blueTeam.indexOf(this.username) === -1){
          this.blueTeam.push(this.username);
        }
      } else {
        this.blueTeam = this.blueTeam.filter(
          username => this.username !== username
        );
        if(this.blueTeam.indexOf(this.username) === -1){
          this.redTeam.push(this.username);
        }
      }
    }
  }
};
</script>
