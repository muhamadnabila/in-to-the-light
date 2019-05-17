<template>
  <div class="container-fluid">

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
        <div class="col-8 bg-dark p-2">
        <!-- ROOM LIST -->
        <div>
          <h4 style="color:#FEFDFD">All List Room Available</h4>
        </div>
        <div id="listGroup" class="list-group">
          <a href="#listGroup" v-for="room in roomList" :key="room.roomId" class="list-group-item list-group-item-action list-group-item-danger">
            <div class="row">
              <div class="col-6">
                {{room.name}}
              </div>
              <div class="col md-4">
                 {{ room.totalPlayer }}
              </div>
              <div class="col md-1">
                  <p>{{ room.players.length }}</p>
              </div>
              <div class="col md-1" v-show="checkKuota(room)">
                  <a v-on:click.prevent="joinRoom(room)" href="#"><i class="fas fa-sign-in-alt"></i></a>
              </div>
              <div class="col md-1" v-show="!checkKuota(room)">
                  <p>full</p>
              </div>
            </div>
            </a>
        </div>
        <!-- ROOM LIST -->
        </div>
        <div class="col bg-dark ml-1">
        <!-- CREATE ROOM -->
          <div class="row p-2">
            <form style="width:100%" v-on:submit.prevent="createRoom">
              <div class="form-group">
                <label for="exampleInputEmail1" style="color:#FEFDFD" >Room</label>
                <input v-model="roomName" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Room Name">
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
       <Room/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Room from '@/components/Room.vue'

import Header from '../components/Header'
import db from '../db.js'
import { functions } from 'firebase'
export default {
  name: 'home',
  data () {
    return {
      username: '',
      roomName: null,
      totalPlayer: '',
      feedback: null,
      roomList: []
    }
  },
  components: {
    Room,
    Header
  },
  methods: {
    checkKuota (room) {
      console.log('================')
      console.log(room.players)
      console.log(room.kuotaRoom)
      console.log('===================')
      if (room.players.length >= room.kuotaRoom) {
        return false
      } else { return true }
    },
    createRoom () {
      if (this.roomName) {
        this.feedback = ''
        let kuotaRoom
        if (this.totalPlayer == '1 vs 1') {
          kuotaRoom = 2
        } else if (this.totalPlayer == '2 vs 2') {
          kuotaRoom = 4
        } else if (this.totalPlayer == '3 vs 3') {
          kuotaRoom = 9
        }
        db.collection('room').add({
          name: this.roomName,
          players: [`${this.username}`],
          totalPlayer: this.totalPlayer,
          createdAt: new Date(),
          kuotaRoom: kuotaRoom
        })
          .then(docRef => {
            this.roomName = null
            this.totalPlayer = null
          })
          .catch(err => {
            console.log(err, 'eror nya nih')
          })
      } else {
        this.feedback = 'room name needed!'
      }
    },
    fetchRoomList () {
      db.collection('room').orderBy('createdAt').onSnapshot((querySnapshot) => {
        let allRooms = []
        let count = 0
        querySnapshot.forEach(doc => {
          let getRoom = {
            createdAt: doc.data().createdAt,
            name: doc.data().name,
            totalPlayer: doc.data().totalPlayer,
            players: doc.data().players,
            roomId: doc.id,
            kuotaRoom: doc.data().kuotaRoom
          }
          allRooms.push(getRoom)
        })
        this.roomList = allRooms
      })
    },
    joinRoom (roomSelected) {
      db.collection('room').doc(roomSelected.roomId).get()
        .then(doc => {
          let newRoom = {
            createdAt: doc.data().createdAt,
            name: doc.data().name,
            players: doc.data().players,
            totalPlayer: doc.data().totalPlayer,
            kuotaRoom: doc.data().kuotaRoom
          }
          newRoom.players.push(this.username)
          return db.collection('room').doc(roomSelected.roomId).set({
            ...newRoom
          })
        })
        .then(doc => {
          console.log('berhasil join room')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    var rug = require('random-username-generator')
    this.username = rug.generate()
    this.fetchRoomList()
    db.collection('user').add({
      username: this.username
    })
      .then(docRef => {
        console.log('add new user')
        console.log('idUser', docRef.id)
      })
      .catch(err => {
        console.log(err)
      })
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
