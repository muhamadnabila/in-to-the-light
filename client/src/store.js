import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/db.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    username: '',
    rooms: {}
  },
  mutations: {
    storeUser (state) {
      state.id = localStorage.getItem('id')
      state.username = localStorage.getItem('username')
      console.log(state.id, state.username)
    },
    pushPlayersInRoom (state, players) {
      // /*
      //   {
      //     1: {
      //       red: [{}],
      //       blue: [{}],
      //     }
      //   }
      // */
      // console.log(players);
      // const result = {};
      // for (let i = 0; i < players.length; i++) {
      //   const player = players[i];
      //   if (!result[player.room]) {
      //     result[player.room] = { red: [], blue: [] };
      //   } else {
      //     result[player.room][player.team].push(player);
      //   }
      // }
      // state.rooms = {...result};
      let temp = {}
      players.forEach(element => {
        if (temp.rooms[element.room] == undefined) {
          temp.rooms[element.room] = {}
        }
        if (temp.rooms[element.room][element.team] == undefined) {
          temp.rooms[element.room][element.team] = []
        }
        temp.rooms[element.room][element.team].push(element)
      })
      state.rooms = temp
      console.log(state.rooms)
    }
    // changeSides (state, newColl) {
    //   db.collection('players').doc(state.id/* `MhmBodnfRveEZLPE7ItZ` */)
    //     .set({
    //       team: newColl
    //     })
    //     .then(() => {
    //       console.log('Changed Sides to ' + newColl)
    //     })
    //     .catch((error) => {
    //       console.error('Error adding document: ', error)
    //     })
    // }
  },
  actions: {
    // getPlayersInRoom (context) {
    // db.collection('players').onSnapshot(
    //   snapshot => {
    //     console.log(snapshot)
    //     let temp = []
    //     for (let i = 0; i < snapshot.docs.length; i++) {
    //       temp.push(snapshot.docs[i].data())
    //     }
    //     console.log(temp)
    //     context.commit('pushPlayersInRoom', temp)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    // },
    // changeSides (context, newColl) {
    //   context.commit('changeSides', newColl)
    // }
  }

})
