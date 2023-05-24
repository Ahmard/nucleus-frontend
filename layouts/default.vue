<template>
  <el-container style="margin: 0!important;">
    <el-aside class="left-sidebar-width">
      <LeftSide :is-collapsed="isCollapsed"/>
    </el-aside>

    <el-container>
      <el-header>
        <Header @toggle_sidebar="toggleSidebar"/>
      </el-header>

      <el-main style="overflow: hidden">
        <nuxt-page></nuxt-page>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import LeftSide from "~/components/Layout/LeftSide.vue";
import Header from "~/components/Layout/Header.vue";

let activeIndex = ref("");
let isCollapsed = ref(false)

function handleSelect() {

}

function toggleSidebar(state: boolean) {
  isCollapsed.value = state;
}

</script>

<style>
body {
  margin: 0 !important;
  height: 100% !important;
  background-color: #f8f5f5;
}

.left-sidebar-width {
  width: inherit;
}
</style>
