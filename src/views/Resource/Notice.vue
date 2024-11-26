<template>
  <div class="table-box">
    <ProTable ref="proTable" title="通知列表" :columns="columns" :requestApi="getTableList" :initParam="initParam" :dataCallback="dataCallback">
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')" v-hasPermi="['sys:notice:add']">新增公告</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)" v-hasPermi="['sys:notice:view']">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)" v-hasPermi="['sys:notice:edit']">编辑</el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteRow(scope.row)" v-hasPermi="['sys:notice:remove']">删除</el-button>
      </template>
    </ProTable>
    <NoticeDialog ref="dialogRef" />
  </div>
</template>

<script setup name="SysNotice" lang="tsx">
import { ref, reactive } from 'vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { getNoticePage, addNotice, editNotice, deleteNotice } from '@/api/modules/notice'
import { SysNotice } from '@/api/interface'
import { CirclePlus, EditPen, View, Delete } from '@element-plus/icons-vue'
import { dictConfigList } from '@/api/modules/dict/dictConfig'
import NoticeDialog from './components/NoticeDialog.vue'
import { useHandleData } from '@/hooks/useHandleData'

const proTable = ref()
const initParam = reactive({})
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}
const getTableList = (params: any) => {
  let newParams = { ...params }
  const res = getNoticePage(newParams)
  console.log(res)
  return res
}

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 60 },
  {
    prop: 'title',
    label: '通知标题',
    showOverflowTooltip: true,
    search: { el: 'input' }
  },
  {
    prop: 'isTop',
    label: '是否置顶',
    width: 100,
    enum: () => dictConfigList('isTop'),
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'title', value: 'value' },
    render: (scope) => {
      return <el-tag type={scope.row.isTop === 0 ? 'success' : 'warning'}>{scope.row.isTop === 1 ? '是' : '否'}</el-tag>
    }
  },
  {
    prop: 'isSwiper',
    label: '是否轮播',
    width: 100,
    enum: () => dictConfigList('isSwiper'),
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'title', value: 'value' },
    render: (scope) => {
      return (
        <el-tag type={scope.row.isSwiper === 1 ? 'primary' : 'info'} effect>
          {scope.row.isSwiper === 1 ? '是' : '否'}
        </el-tag>
      )
    }
  },
  {
    prop: 'cover',
    label: '封⾯',
    width: 100,
    render: (scope) => {
      return (
        <div class={['flex', 'justify-center', 'p-1']}>
          {scope.row.cover ? <el-image style="width: 50px; height 50px" src={scope.row.cover} fit="cover"></el-image> : '暂⽆图⽚'}
        </div>
      )
    }
  },
  {
    prop: 'content',
    label: '通知内容'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
]

// 打开 drawer(新增、查看、编辑)
const dialogRef = ref()
const openDrawer = (title: string, row: Partial<SysNotice.ResNoticeList> = {}) => {
  let params = {
    title,
    row: { ...row },
    isView: title === '查看',
    api: title === '新增' ? addNotice : title === '编辑' ? editNotice : '',
    getTableList: proTable.value.getTableList
  }
  dialogRef.value.acceptParams(params)
}

// 删除
const deleteRow = async (params: SysNotice.ResNoticeList) => {
  await useHandleData(deleteNotice, [params.pkId], `删除【${params.title}】通知`)
  proTable.value.getTableList()
}
</script>

<style lang="scss" scoped></style>
