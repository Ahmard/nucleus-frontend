<template>
  <div>
    <el-row>
      <el-col
        :span="5"
        :xs="22"
        :sm="22"
        :md="forceResize && colMd > 6 ? colMd : 5"
        class="statistic-row">
        <div class="statistic-card pt-3 pb-2 px-3 shadow-sm">
          <el-statistic
            :value="stats?.today_expenses ?? 0"
            prefix="&#8358;"
            title="New expenses today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily Expenses
                <el-tooltip
                  effect="dark"
                  content="Your expenses for today"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <ElIconWarning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
              16%
              <el-icon>
                <ElIconCaretTop/>
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ElIconArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>

      <el-col
        :span="6"
        :xs="22"
        :sm="22"
        :md="colMd"
        class="statistic-row ms-lg-2">
        <div class="statistic-card pt-3 pb-2 px-3 shadow-sm">
          <el-statistic
            :value="stats?.week_expenses ?? 0"
            prefix="&#8358;"
            title="New expenses this week">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Weekly Expenses
                <el-tooltip
                  effect="dark"
                  content="Your expenses for this week"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <ElIconWarning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than last week</span>
              <span class="green">
              16%
              <el-icon>
                <ElIconCaretTop/>
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ElIconArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>

      <el-col
        :span="6"
        :xs="22"
        :sm="22"
        :md="colMd"
        :class="{'big-col': colMd > 6}"
        class="statistic-row ms-lg-2">
        <div class="statistic-card pt-3 pb-2 px-3 shadow-sm">
          <el-statistic
            :value="stats?.month_expenses ?? 0"
            prefix="&#8358;"
            title="New expenses this month">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Monthly Expenses
                <el-tooltip
                  effect="dark"
                  content="Your expenses for this month"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <ElIconWarning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than last month</span>
              <span class="green">
              16%
              <el-icon>
                <ElIconCaretTop/>
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ElIconArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>

      <el-col
        :span="6"
        :xs="22"
        :sm="22"
        :md="colMd"
        :class="{'big-col': colMd > 6}"
        class="statistic-row ms-lg-2">
        <div class="statistic-card pt-3 pb-2 px-3 shadow-sm">
          <el-statistic
            :value="stats?.year_expenses ?? 0"
            prefix="&#8358;"
            title="New expenses this year">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                {{ year }} Expenses
                <el-tooltip
                  effect="dark"
                  content="Your expenses for this year"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <ElIconWarning/>
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than last year</span>
              <span class="green">
              16%
              <el-icon>
                <ElIconCaretTop/>
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ElIconArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>

const year = new Date().getFullYear();
const props = defineProps({
  forceResize: {type: Boolean, default: false},
  colMd: {type: Number, default: 6},
  stats: {
    type: Object,
    required: true,
    default: {
      today_expenses: 0,
      week_expenses: 0,
      month_expenses: 0,
      year_expenses: 0,
    }
  }
})

let stats = toRef(props, 'stats')
</script>

<style scoped>
@import "assets/aggregate.css";

.big-col {
  margin-top: 30px;
  margin-left: 0!important;
  margin-right: 5px;
}
</style>
