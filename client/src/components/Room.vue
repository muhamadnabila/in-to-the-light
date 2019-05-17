<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header bg-primary text-white text-center">BLUE TEAM</div>
          <ul class="list-group list-group-flush">
            <li
              v-for="(player, playerIndex) in roomBlue"
              class="list-group-item"
              :key="playerIndex"
            >{{ player.username }}</li>
          </ul>
          <button @click="changeSide('blue')" type="button" class="btn btn-primary">Join BLUE</button>
        </div>
      </div>
      <h1>VS</h1>
      <div class="col">
        <div class="card">
          <div class="card-header bg-danger text-white text-center">RED TEAM</div>
          <ul class="list-group list-group-flush">
            <li
              v-for="(player, playerIndex) in roomRed"
              class="list-group-item"
              :key="playerIndex"
            >{{ player.username }}</li>
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
      idRoom: "1",
      // username: "",
      room: []
    };
  },
  computed: {
    roomRed() {
      console.log(this.$store.state.rooms["1"]);
      return this.$store.state.rooms[this.idRoom].red;
    },
    roomBlue() {
      console.log(this.$store.state.rooms);
      return this.$store.state.rooms[this.idRoom].blue;
    }
  },
  mounted() {
    console.log("Room created");
    // this.id = localStorage.getItem("id");
    // this.username = localStorage.getItem("username");

    db.collection("redTeam").onSnapshot(
      snapshot => {
        let temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push(snapshot.docs[i].data());
        }
        this["redTeam"] = temp;
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    // getPlayersInRoom(){
    //   this.$store.dispatch('getPlayersInRoom')
    // },
    changeSide(newColl) {
      db.collection("Rooms").doc(this.idRoom).onSnapshot(
        snapshot => {
          let temp = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            temp.push(snapshot.docs[i].data());
          }
          this.room = temp
          // console.log(temp);
          // temp.forEach(element => {
          //   if (temp.rooms[element.room] == undefined) {
          //     temp.rooms[element.room] = {};
          //   }
          //   if (temp.rooms[element.room][element.team] == undefined) {
          //     temp.rooms[element.room][element.team] = [];
          //   }
          //   temp.rooms[element.room][element.team].push(element);
          // });
          // state.rooms = temp;
        },
        error => {
          console.log(error);
        }
      );
      // this.$store.dispatch('changeSides', newColl)
      // db.collection(oldColl).doc(this.id)
      //   .delete()
      //   .then(() =>{
      //     console.log("Document successfully deleted!");
      //   })
      //   .catch((error)=> {
      //     console.error("Error removing document: ", error);
      //   });
      // db.collection(newColl).doc(this.id)
      //   .set({
      //     username: this.username
      //   })
      //   .then(()=> {
      //     console.log("Document written with ID: ");
      //   })
      //   .catch((error)=> {
      //     console.error("Error adding document: ", error);
      //   });
    }
  }
  // props: []
};
</script>
