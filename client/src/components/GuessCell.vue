<template>
  <div
    class="col-auto text-center cell"
    :class="{'border-bottom': isDrawBorder, 'has-border': isDrawBorder}"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave">
    <template v-if="isGuess">
      <input
        type="text"
        class="form-control"
        max-length="1"
        size="1"
        v-if="input"
        :id="`input-${index}`"
        v-model="inputValue">
    </template>
    <template v-else-if="char === ' '">
      &nbsp;&nbsp;
    </template>
    <template v-else>
      {{char}}
    </template>
  </div>
</template>

<script>
export default {
  name: 'GuesCell',
  props: ['char', 'index'],
  data: function () {
    return {
      inputValue: '',
      input: false
    }
  },
  watch: {
    inputValue: function (val) {
      this.input = false

      let re = /[a-zA-Z]/
      if (!re.test(val)) {
        this.$set(this, 'inputValue', '')
      } else {
        this.$emit('input', { val, index: this.index })
      }
    }
  },
  computed: {
    isDrawBorder: function () {
      return this.isGuess && !this.input
    },
    isGuess: function () {
      return this.char === '*'
    }
  },
  methods: {
    handleClick: function () {
      this.inputValue = ''
      this.input = true
    },
    handleMouseOver: function () {
      this.inputValue = ''
      this.input = true
    },
    handleMouseLeave: function () {
      this.input = false
    }
  }
}
</script>

<style scoped>
.cell {
  font-family: serif;
  font-size: 1.5em;
  margin-left: 0.05em;
  margin-right: 0.05em;
}
.has-border {
  min-width: 1em;
  border-width: 2px!important;
  border-color: #696969!important;
}
input {
  font-size: 0.8em;
  max-width: 0.1em;
  max-height: 1.4em;
  position: relative;
  top: 0.2em;
}
</style>
