<template>
  <el-form-item :label="label" :prop="name">
    <el-select
      required
      size="large"
      class="w-100"
      :id="id"
      :style="selectStyle"
      v-model="theValue"
      remote
      clearable
      remote-show-suffix
      default-first-option
      reserve-keyword
      :placeholder="placeholder"
      :filterable="searchable"
      :clearable="clearable"
      :value-key="valueKey"
      :multiple="multiple"
      :remote="true"
      :filter-method="filter"
      :remote-method="searchRemoteData"
      :loading="loading"
      :name="name"
      :disabled="disabled"
      @focus="onFocus">
      <el-option
        v-for="item in results"
        :key="item[valueKey]"
        :label="makeOptionLabel(item)"
        :value="item[valueKey]">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import {xhrGet} from "~/helpers/xhr";

export default {
  name: "Combobox",
  props: {
    id: {default: 'combobox'},
    name: {default: 'combobox'},
    label: {default: 'Choose'},
    rules: {default: () => []},
    selectStyle: {default: null},
    selectClass: {default: null},
    value: {default: null},
    searchable: {default: true},
    clearable: {default: false},
    multiple: {default: false},
    disabled: {default: false},
    withLabel: {default: true},
    textKey: {default: 'title'},
    textSeparator: {default: ' '},
    valueKey: {default: 'value'},
    endpoint: {default: null},
    placeholder: {default: 'Please enter a keyword'},
  },
  watch: {
    theValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value(val) {
      if (val) {
        this.triggerRemoteSearch(val)
      }
    },
  },
  data() {
    return {
      theValue: null,
      loading: true,
      results: [],
    }
  },
  methods: {
    onFocus(e) {
      this.$emit('focus', e)

      if (!this.results.length) {
        this.searchRemoteData('')
      }
    },
    triggerRemoteSearch(value) {
      this.searchRemoteData(value).then(() => {
        setImmediate(() => this.theValue = value)
      })
    },
    makeOptionLabel(data) {
      if (typeof this.textKey === 'string') {
        return data[this.textKey]
      }

      let label = ''
      this.textKey.forEach(key => {
        label += `${data[key]}${this.textSeparator}`
      })

      const separatorLength = this.textSeparator.length
      return label.slice(0, separatorLength - (separatorLength * 2))
    },
    searchRemoteData(q) {
      this.loading = true
      return xhrGet(this.endpoint, {search: q})
        .then(resp => {
          this.results = resp.data
        })
        .finally(() => this.loading = false)
    },

    filter(...x) {
      // console.log(x)
    }
  },
  mounted() {
    if (this.value) {
      this.triggerRemoteSearch(this.value)
    }
  }
}
</script>

<style scoped>

</style>
