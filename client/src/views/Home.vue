<template>
  <div class="container-fluid">
  <Header />
    <div class="container mt-4" style="width:70%">
      <h2>Community Activity</h2>
      <h4>Public chat</h4>
      <div class="row mt-3">
        <div class="col" style="height:300px; background-color:#EEC2B6" >
          <!-- PUBLIC CHAT ROOM -->
          <!-- LALALALALALALA -->
          <!-- PUBLIC CHAT ROOM -->
        </div>
      </div>

      <div id="level" class="row mt-3 mb-0">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item ml-3">
              <a class="nav-link" href="#level">All</a>
            </li>
            <li class="nav-item ml-3">
              <a class="nav-link" href="#level">Legend</a>
            </li>
            <li class="nav-item ml-3">
              <a class="nav-link" href="#level">Pro</a>
            </li>
            <li class="nav-item ml-3">
              <a class="nav-link" href="#level">Advance</a>
            </li>
            <li class="nav-item ml-3">
              <a class="nav-link" href="#level">Beginner</a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
          <hr class="mt-0" style="height:2px; color:#1111; background-color:#1111;">
      <div class="row mb-5">
        <div class="col-8 bg-dark" style="height:200px">
        <!-- ROOM LIST -->
        {{roomList}}
        <!-- ROOM LIST -->
        </div>
        <div class="col bg-dark ml-1">
        <!-- CREATE ROOM -->
          <div class="row p-2">
            <form style="width:100%" v-on:submit.prevent="createRoom"> 
              <div class="form-group">
                <label for="exampleInputEmail1" style="color:#FEFDFD" >Name Room</label>
                <input v-model="roomName" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name Room">
              </div>
                <label for="exampleInputEmail1" style="color:#FEFDFD">Total Player</label>
              <select v-model="totalPlayer" class="form-control form-control-sm">
                  <option>1 vs 1</option>
                  <option>2 vs 2</option>
                  <option>3 vs 3</option>
              </select>
              <p v-show="feedback" style="color:red">{{ feedback }}</p>
              <div class="mt-5">
                <button type="submit" class="btn btn-danger mb-2 create" style="width:100%">Create Room</button>

              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header'
import db from "../firebase/firebase.js"
import { functions } from 'firebase';
export default {
  name: 'home',
  data () {
    return {
      username: '',
      roomName : null,
      totalPlayer: '',
      feedback: null,
      roomList : []
    }
  },
  components: {
    Header
  },
  methods: {
    createRoom() {
      if(this.roomName) {
        this.feedback = ''
        db.collection("room").add({
          name: this.roomName,
          players: [`${this.username}`],
          totalPlayer: this.totalPlayer,
          createdAt: new Date()
        })
        .then(docRef=>{
          console.log('berhasil');
          this.roomName = null
          this.totalPlayer = null
          
          console.log('ini documents id :' ,docRef.id )
        })
        .catch(err =>{
          console.log(err,'eror nya nih')
        })
      }else {
        this.feedback = 'room name needed!'
      }
     
    },
    fetchRoomList() {
      db.collection('room').orderBy('createdAt').onSnapshot((querySnapshot)=>{
        let allRooms = []
        querySnapshot.forEach(doc =>{
          allRooms.push(doc.data())
        })
        this.roomList = allRooms
        // console.log(allRooms,' ini all rooms dari firestorenya');
       
      })
    }
  },
  created () {
    var rug = require('random-username-generator');
    var new_username = rug.generate();
    this.username = new_username
    this.fetchRoomList()
  }
}
</script>
<style>
  
 .container-fluid {
   background-color: #B89E9B
 }
 .nav-link {
 -webkit-box-shadow: 0px -4px 5px 0px rgba(199,165,199,1);
  -moz-box-shadow: 0px -4px 5px 0px rgba(199,165,199,1);
  box-shadow: 0px -4px 5px 0px rgba(199,165,199,1);

 }
 .nav-link:hover {
   background-color:#D67979
 }
 .nav-link:focus {
   background-color:#D67979
 }
 .nav-link:active {
   background-color:#D67979
 }
 .create {
   -webkit-box-shadow: 0px 0px 5px 2px rgba(255,0,0,1);
    -moz-box-shadow: 0px 0px 5px 2px rgba(255,0,0,1);
    box-shadow: 0px 0px 5px 2px rgba(255,0,0,1);
 }
 
</style>

