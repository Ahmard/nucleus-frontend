<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo left-sidebar-width"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <div class="mt-3 collapse-btn" @click="toggleSidebar">
      <el-icon size="30">
        <Fold v-if="!isCollapsed"/>
        <Expand v-if="isCollapsed"/>
      </el-icon>
    </div>
    <!--    <el-menu-item index="1">Nucleus Family</el-menu-item>-->
    <div class="flex-grow-1"/>
    <el-menu-item index="2" :class="{'d-none': isMobileView}">
      <el-icon>
        <el-icon-list/>
      </el-icon>
      Todo
    </el-menu-item>
    <el-menu-item index="3" :class="{'d-none': isMobileView}">
      <el-icon>
        <el-icon-calendar/>
      </el-icon>
      Events
    </el-menu-item>
    <el-sub-menu index="4">
      <template #title>
        <el-avatar
          :size="32"
          class=""
          src="/gender-neutral-avatar.jpg"
        />
        Account
      </template>
      <el-menu-item index="2-1">
        <el-icon>
          <el-icon-user/>
        </el-icon>
        Profile
      </el-menu-item>
      <el-menu-item index="2-2">
        <el-icon>
          <el-icon-setting/>
        </el-icon>
        Settings
      </el-menu-item>
      <el-menu-item index="2-3" @click="logout">
        <el-icon>
          <el-icon-switch-button/>
        </el-icon>
        Logout
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Expand, Fold} from "@element-plus/icons-vue";
import {useAuth} from "#auth/runtime/composables";
import {useRouter} from "#app/composables/router";

let activeIndex = ref("");
const emit = defineEmits(['toggle_sidebar'])

let canOverrideSidebarToggleState = false
let isMobileView = ref(window.innerWidth <= 768)
let isCollapsed = ref(localStorage.getItem('is_sidebar_collapsed') === 'yes')

emit('toggle_sidebar', isCollapsed.value)

function toggleSidebarResponsively() {
  let isMobile = window.innerWidth <= 768

  if (isMobile) {
    isMobileView.value = true
    doToggleSidebar(true)
    canOverrideSidebarToggleState = true
  }

  if (!isMobile && canOverrideSidebarToggleState) {
    isMobileView.value = false
    doToggleSidebar(false)
  }
}

function handleSelect() {

}

function toggleSidebar() {
  doToggleSidebar()
}

function doToggleSidebar(state: boolean | null = null) {
  isCollapsed.value = state !== null ? state : !isCollapsed.value;
  localStorage.setItem('is_sidebar_collapsed', isCollapsed.value ? 'yes' : 'no')
  emit('toggle_sidebar', isCollapsed.value)
}

async function logout() {
  await useAuth().logout()
  console.log('Logged out')
  await useRouter().push('/login')
}

if (isMobileView.value) {
  toggleSidebarResponsively()
}

window.addEventListener('resize', toggleSidebarResponsively);
</script>

<style>
.el-header {
  padding: 0 !important;
}

.el-sub-menu__title, .el-menu-item {
  color: var(--bs-primary) !important;
}

.el-menu-item.is-active {
  color: var(--bs-primary) !important;
  font-weight: bold !important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: var(--bs-primary) !important;
  border-bottom-color: var(--bs-primary) !important;
  font-weight: bold !important;
}

.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom-color: var(--bs-primary) !important;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 40px;
}
</style>
