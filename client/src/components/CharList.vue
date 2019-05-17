<template>
  <div class="row no-gutters">
    <div
      class="col-1 py-1 mx-1 my-1 badge"
      :class="{'badge-warning': isUsed(char)}"
      v-for="(char, index) in chars"
      :key="index">
      <h6 class="mb-0">{{char}}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharList',
  props: ['used'],
  data: function () {
    return {
      chars: 'abcdefghijklmnopqrstuvwxyz'
    }
  },
  methods: {
    isUsed: function (char) {
      return this.used.includes(char)
    }
  }
}
</script>
