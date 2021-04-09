<template>
  <div class="input-group mb-3">
    <select
      class="custom-select"
      v-model="selectedPrefCode"
      @change="prefectureChanged"
    >
      <option value="0" selected>すべての都道府県</option>
      <option v-for="p in prefectures" v-bind:value="p.pref_code" v-bind:key="p.pref_code">{{p.pref_name}}</option>
    </select>
    <input
      type="text"
      class="form-control"
      v-model="inputText"
      @input="textChanged"
      placeholder="例: 千代田区"
    >
  </div>
</template>

<script>
const axios = require('axios')
const requestURL = '/api/prefectures'

export default {
  data () {
    return {
      prefectures: {},
      selectedPrefCode: 0,
      inputText: ''
    }
  },

  created () {
    axios.get(requestURL).then(res => {
      this.prefectures = res.data
    })
  },

  methods: {
    prefectureChanged () {
      this.$emit('prefecture-changed', this.selectedPrefCode)
    },
    textChanged () {
      this.$emit('input-text-changed', this.inputText)
    }
  }
}
</script>
