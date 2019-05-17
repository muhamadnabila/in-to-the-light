<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col border-right">
        <template v-if="user.team === 'red'">
          <h2>{{ user.team }} Team</h2>
          <hr>
          <QuestionBox :question="question"/>
          <GuessBoard :answer="answer" :guess="guess" @used="handleUsed"/>
          <CharList :used="used"/>
        </template>
      </div>
      <div class="col">
        <template v-if="user.team === 'blue'">
          <h2>{{ user.team }} Team</h2>
          <hr>
          <QuestionBox :question="question"/>
          <GuessBoard :answer="answer" :guess="guess" @used="handleUsed"/>
          <CharList :used="used"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import GuessBoard from '@/components/GuessBoard.vue'
import CharList from '@/components/CharList.vue'
import QuestionBox from '@/components/QuestionBox.vue'

import db from '@/firebase/firebase.js'

export default {
  name: 'GameWindow',
  components: {
    QuestionBox,
    GuessBoard,
    CharList
  },
  data: function () {
    return {
      used: [],
      question: '',
      answer: '',
      guess: '',
      user: {
        team: localStorage.getItem('team'),
        roomId: localStorage.getItem('roomId')
      }
    }
  },
  watch: {
    guess: function (val) {
      // this.used = Array.from(new Set(val.split('').filter(char => /[a-zA-Z]/gi.test(char))))
      // db
      //   .collection('rooms')
      //   .doc(this.user.roomId)
      //   .set({
      //     red: {
      //       guess: val,
      //       used: this.used
      //     }
      //   }, { merge: true })
      //   .then()
      //   .catch(err => console.log(err))
    },
    answer: function (val) {
      let alpha = Array.from(new Set(this.answer.split('')))
        .filter(char => /[a-zA-Z]/gi.test(char))
        .sort(() => 0.5 - Math.random())

      let mid = Math.floor(alpha.length / 2)
      let toBeGuessed = alpha
        .slice(0, mid)
      if (!this.guess) {
        this.guess = this.answer
          .split('')
          .map(char => toBeGuessed.includes(char) ? '*' : char)
          .join('')
      }
    }
  },
  created: function () {
    this.fetchJoke()
  },
  methods: {
    fetchJoke: function () {
      db
        .collection('room')
        .doc(this.$route.params.id)
        .onSnapshot((doc) => {
          let data = doc.data()
          if (data && Object.keys(data).length && data.question) {
            this.question = data.question
            this.answer = data.answer
            this.guess = data[this.user.team+'Game'].guess
            this.used = data[this.user.team+'Game'].used
          } else {
            axios
              .get('https://official-joke-api.appspot.com/jokes/ten')
              .then(({ data }) => {
                let joke = data.find(d => d.setup.includes('?'))
                this.question = joke.setup
                this.answer = joke.punchline.toLowerCase().trim()
                this.used = Array.from(new Set(this.guess.split('').filter(char => /[a-zA-Z]/gi.test(char))))

                db.collection('room').doc(this.$route.params.id).set({
                  question: this.question,
                  answer: this.answer,
                  redGame: {
                    guess: this.guess,
                    used: this.used
                  },
                  blueGame: {
                    guess: this.guess,
                    used: this.used
                  }
                })
              })
              .catch(err => console.log(err))
          }
        })


      // if (!localStorage.getItem('roomId')) {

      // } else {
      //
      // }
    },
    handleUsed: function ({ val, index }) {
      let docRef = db
        .collection('room')
        .doc(this.$route.params.id)

      docRef
        .get()
        .then(doc => {
          docRef
            .set({
              [this.user.team+'Game']: {
                guess: this.guess
                  .split('')
                  .map((char, i) => this.answer[i] === val ? val : char)
                  .join(''),
                used: [...this.used, val.toLowerCase()]
              }
            }, { merge: true })
        })
        .catch(err => console.log(err))
      // this.used.push(val.toLowerCase())
      // if (this.answer[index] === val) {
      //   this.guess = this.guess
      //     .split('')
      //     .map((char, i) => this.answer[i] === val ? val : char)
      //     .join('')
      // }
    }
  }
}
</script>

<style>

</style>
