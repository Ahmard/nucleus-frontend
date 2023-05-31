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

    <div class="d-flex justify-content-center mt-3">
      <pagination
        :current-page="current_page"
        :page-size="per_page"
        :total-data="total_data"
        @page-change="p => current_page = p"
        @size-change="s => per_page = s"
      />
    </div>
  </div>
</template>

<script>
import {xhrGet} from "~/helpers/xhr";

export default {
  name: "Datatable",
  props: {
    tableName: {default: 'Records'},
    endpoint: {default: null},
    perPage: {default: 10},
  },
  watch: {
    search() {
      nextTick(() => this.fetchData())
    },
    current_page() {
      nextTick(() => this.fetchData())
    },
    per_page() {
      nextTick(() => this.fetchData())
    }
  },
  data() {
    return {
      isSearchPopoverVisible: true,
      failure: false,
      processing: true,
      tableData: [],
      search: '',
      per_page: this.perPage,
      current_page: 1,
      total_data: 0,
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
    fetchData() {
      this.processing = true
      const params = {
        search: this.search,
        page: this.current_page,
        per_page: this.per_page,
      };

      xhrGet(this.endpoint, params)
        .then(resp => {
          console.log(resp)
          this.failure = false
          this.tableData = resp.data
          this.total_data = resp.total_records
        })
        .catch(() => this.failure = true)
        .finally(() => this.processing = false)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>
