<template>
  <div class="table-box">
    <ProTable ref="proTable" title="分类列表" :columns="columns" :requestApi="getTableList" :initParam="initParam" :dataCallback="dataCallBack">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')" v-hasPermi="['sys:category:add']">新增分类</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)" v-hasPermi="['sys:category:view']">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)" v-hasPermi="['sys:category:edit']">编辑</el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteRow(scope.row)" v-hasPermi="['sys:category:remove']">删除</el-button>
      </template>
    </ProTable>
    <CategoryDialog ref="dialogRef" />
  </div>
</template>

<script setup name="SysCategory" lang="tsx">
import { SysCategory } from '@/api/interface'
import { ref, reactive } from 'vue'
import { CirclePlus, EditPen, View, Delete } from '@element-plus/icons-vue'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import CategoryDialog from './components/CategoryDialog.vue'
import { getCategoryPage, addCategory, editCategory, deleteCategory } from '@/api/modules/category'
import { dictConfigList } from '@/api/modules/dict/dictConfig'
import { useHandleData } from '@/hooks/useHandleData'

// 删除单个
const deleteRow = async (params: SysCategory.ResCategoryList) => {
  await useHandleData(deleteCategory, [params.pkId], `删除【${params.title}】分类`)
  proTable.value.getTableList()
}

const proTable = ref()

const initParam = reactive({})

const dataCallBack = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}

const getTableList = (params: any) => {
  let newParams = { ...params }
  return getCategoryPage(newParams)
}

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 60 },
  {
    prop: 'title',
    label: '分类标题',
    showOverflowTooltip: true,
    search: { el: 'input' }
  },
  {
    prop: 'type',
    label: '分类',
    width: 100,
    search: { el: 'select', props: { filterable: true } },
    enum: () => dictConfigList('categoryType'),
    fieldNames: { label: 'title', value: 'value' },
    render: (scope) => {
      return <el-tag type={scope.row.type === 0 ? 'success' : 'primary'}>{scope.row.type == 0 ? '网盘类型' : '资源类型'}</el-tag>
    }
  },
  {
    prop: 'description',
    label: '分类描述',
    showOverflowTooltip: true
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
]

// 打开 drawer（新增、查看、编辑）
const dialogRef = ref()
const openDrawer = (title: string, row: Partial<SysCategory.ResCategoryList> = {}) => {
  let params = {
    title,
    row: { ...row },
    isView: title === '查看',
    api: title === '新增' ? addCategory : title === '编辑' ? editCategory : '',
    getTableList: proTable.value.getTableList,
    maxHeight: '200px'
  }
  dialogRef.value.acceptParams(params)
}
</script>

<style scoped></style>
