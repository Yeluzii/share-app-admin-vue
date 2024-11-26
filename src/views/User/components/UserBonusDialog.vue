<template>
  <Dialog :model-value="dialogVisible" :title="dialogProps.title" :fullscreen="dialogProps.fullscreen" :max-height="dialogProps.maxHeight" :cancel-dialog="cancelDialog">
    <div :style="'width: calc(100% - ' + dialogProps.labelWidth! / 2 + 'px)'">
      <el-collapse accordion v-model="activeName" @change="handleChange" v-if="keys.length > 0">
        <el-collapse-item v-for="(item, key) in userBonusInfo" :title="key" :name="key" :key="key">
          <div class="flex items-center justify-between mb-4 border-b py-2" v-for="(child, cindex) in item" :key="cindex">
            <div class="left flex items-center">
              <span>{{ child.content }}</span>
              <strong class="ml-4 text-md text-[#009688]">{{ child.bonus }}分</strong>
            </div>
            <div class="right">
              <span>{{ child.createTime }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="flex items-center justify-center" v-else>
        <el-empty description="暂无数据" />
      </div>
    </div>
    <template #footer>
      <slot name="footer">
        <el-button @click="cancelDialog">取消</el-button>
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog } from '@/components/Dialog'
import { ref, computed } from 'vue'
import { UserApi } from '@/api/modules/user'

interface DialogProps {
  title: string
  isView: boolean
  fullscreen?: boolean
  row: any
  labelWidth?: number
  maxHeight?: number | string
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  isView: false,
  title: '',
  row: {},
  labelWidth: 160,
  fullscreen: true,
  maxHeight: '500px'
})
// 接收⽗组件传过来的参数
const acceptParams = async (params: DialogProps) => {
  params.row = { ...dialogProps.value.row, ...params.row }
  dialogProps.value = { ...dialogProps.value, ...params }
  // 组件刚加载获取数据
  let { data } = (await UserApi.getUserBonusLog(params.row.pkId)) as any
  // 设置数据
  userBonusInfo.value = data || {}
  // 设置默认激活值
  activeName.value = Object.keys(data)[0] || ''
  dialogVisible.value = true
}
defineExpose({
  acceptParams
})
// 关闭弹框
const cancelDialog = () => {
  dialogVisible.value = false
  activeName.value = ''
}
// 展开项
const activeName = ref('1')
// 点击切换展开项
const handleChange = (val: string) => {
  activeName.value = val
}

const userBonusInfo = ref<any>({})

// 获取对象的key 判断是否有数据
const keys = computed(() => {
  return Object.keys(userBonusInfo.value)
})
</script>

<style scoped></style>
