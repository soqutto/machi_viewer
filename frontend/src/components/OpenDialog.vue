<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
    <div class="modal-content fixed-height">
      <div class="modal-header">
        <h2>市区町村を検索</h2>
        <button type="button" class="close" aria-label="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-header">
        <search-form
          @prefecture-changed="prefectureChanged"
          @input-text-changed="textChanged"
        ></search-form>
      </div>
      <div class="modal-body">
        <table class="table">
          <thead>
            <th scope="col">ID</th>
            <th scope="col">都道府県</th>
            <th scope="col">市区町村</th>
          </thead>
          <template v-for="record in this.filteredResult">
            <tr :key="record.city_id">
              <td>{{record.city_id}}</td>
              <td>{{record.pref_name}}</td>
              <td>{{
                (record.gst_name ? record.gst_name : '') +
                (record.css_name ? record.css_name : '')
              }}
              <button type="button" class="btn btn-primary btn-sm">開く</button>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from './SearchForm'
const axios = require('axios')
const requestURL = '/api/search'

export default {
  components: {
    SearchForm
  },

  data () {
    return {
      inputText: '',
      results: []
    }
  },

  created () {
    axios.get(requestURL).then(res => {
      this.results = res.data
    })
  },

  methods: {
    textChanged (inputText) {
      this.inputText = inputText
    },
    prefectureChanged (selectedPrefCode) {
      axios.get(requestURL, {
        params: {
          pref: selectedPrefCode === '0' ? null : selectedPrefCode
        }
      }).then(res => {
        this.results = res.data
      })
    }
  },

  computed: {
    filteredResult: function () {
      return this.results.filter(record => {
        const concatString = (record.gst_name ? record.gst_name : '') + (record.css_name ? record.css_name : '')
        return concatString.match(
          new RegExp(this.inputText)
        )
      })
    }
  }
}
</script>

<style scoped>
.fixed-height {
  height: 100%;
}
td > button {
  float: right;
}
</style>
