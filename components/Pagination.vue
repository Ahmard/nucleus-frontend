<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="current_page"
      v-model:page-size="page_size"
      :page-sizes="[5, 10, 15, 30, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="true"
      :layout="`total, sizes, prev, pager, next, ${withJumper ? 'jumper' : null}`"
      :total="total_data"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentPage: {type: Number, default: 1},
  pageSize: {type: Number, default: 1},
  totalData: {type: Number, default: 1},
  small: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  withJumper: {type: Boolean, default: false},
})

const emit = defineEmits(['pageChange', 'sizeChange'])

let current_page = ref(props.currentPage)
let page_size = ref(props.pageSize)
const total_data = toRef(props, 'totalData')
const disabled = toRef(props, 'disabled')
const small = toRef(props, 'small')

function onSizeChange(size: number) {
  emit('sizeChange', size)
}

function onPageChange(page: number) {
  emit('pageChange', page)
}
</script>

<style scoped>

</style>
