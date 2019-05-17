<template>
  <div class="row no-gutters mt-5 mb-5">
    <GuesCell
      v-for="(char, index) in guess"
      :char="char"
      :index="index"
      :key="index"
      @input="handleInput"
      />
  </div>
</template>

<script>
import GuesCell from './GuessCell'

export default {
  name: 'GuessBoard',
  props: ['answer', 'guess'],
  components: {
    GuesCell
  },
  data: function () {
    return {
      inputIndexs: []
    }
  },
  methods: {
    handleInput: function ({val, index}) {
      this.$emit('used', {val, index})
    }
  }
}
</script>
