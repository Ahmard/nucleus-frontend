<template>
  <div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @row-click="handleRowClick">
      <slot />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search"/>
        </template>
        <template #default="scope">
          <slot name="action" v-bind:row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {xhrGet} from "~/helpers/xhr";

export default {
  name: "Datatable",
  props: {
    tableName: {default: 'Records'},
    endpoint: {default: null},
  },
  watch: {
    search(val) {
      this.fetchData(val)
    }
  },
  data() {
    return {
      isSearchPopoverVisible: true,
      failure: false,
      processing: true,
      tableData: [],
      search: '',
    }
  },
  methods: {
    handleRowClick(rowData, component, event) {
      if (
        event.target.tagName === 'TD'
        ||( event.target.tagName === 'DIV' && event.target.classList.contains('cell'))
      ) {
        this.$emit('row-click', rowData, component, event);
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    fetchData(q) {
      this.processing = true
      xhrGet(this.endpoint, {search: q})
        .then(resp => {
          this.failure = false
          this.tableData = resp.data
        })
        .catch(() => this.failure = true)
        .finally(() => this.processing = false)
    }
  },
  mounted() {
    this.fetchData('')
  }
}
</script>

<style scoped>

</style>
