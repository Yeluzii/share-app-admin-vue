<template>
  <div class="table-box">
    <ProTable ref="proTable" title="标签列表" :columns="columns" :requestApi="getTableList" :initParam="initParam" :dataCallback="dataCallBack">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')" v-hasPermi="['sys:tag:add']">新增标签</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="deleteBatch(scope.selectedListIds as unknown as number[])"
          v-hasPermi="['sys:tag:remove']"
          >批量删除标签</el-button
        >
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)" v-hasPermi="['sys:tag:view']">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)" v-hasPermi="['sys:tag:edit']">编辑</el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteRow(scope.row)" v-hasPermi="['sys:tag:remove']">删除</el-button>
      </template>
    </ProTable>
    <TagDialog ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="SysTag">
import { ref, reactive } from 'vue'
import { SysTag } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import TagDialog from './components/TagDialog.vue'
import { CirclePlus, Delete, EditPen, View } from '@element-plus/icons-vue'
import { getTagPage, addTag, editTag, deleteTag } from '@/api/modules/tag'
import { dictConfigList } from '@/api/modules/dict/dictConfig'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useHandleData } from '@/hooks/useHandleData'

// 删除单个
const deleteRow = async (params: SysTag.ResTagList) => {
  await useHandleData(deleteTag, [params.pkId], `删除【${params.title}】标签`)
  proTable.value.getTableList()
}

// 批量删除
const deleteBatch = async (ids: number[]) => {
  if (ids.length === 0) {
    ElMessageBox.alert('请选择需要删除的标签', '提示', { type: 'warning' })
    return
  }
  ElMessageBox.confirm('是否确认删除选中的标签?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteTag(ids)
      ElMessage.success('删除成功')
      proTable.value?.clearSelection()
      proTable.value?.getTableList()
    } catch (error) {
      console.log(error)
      ElMessage.error('删除失败')
    }
  })
}

const proTable = ref()

const initParam = reactive({})

const dataCallBack = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}

// 请求数据
const getTableList = (params: any) => {
  let newParams = { ...params }
  return getTagPage(newParams)
}

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'selecticon', fixed: 'left', width: 60 },
  {
    prop: 'title',
    label: '标签名称',
    search: { el: 'input' }
  },
  {
    prop: 'isHot',
    label: '是否热门',
    width: 100,
    enum: () => dictConfigList('isHot'),
    search: {
      el: 'select',
      props: { filterable: true }
    },
    fieldNames: { label: 'title', value: 'value' },
    render: (scope) => {
      return (
        <el-tag type={scope.row.isHot === 1 ? 'success' : 'info'} effect>
          {scope.row.isHot === 1 ? '是' : '否'}
        </el-tag>
      )
    }
  },
  {
    prop: 'description',
    label: '标签描述'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200
  },
  {
    prop: 'operation',
    label: '操作',
    fixed: 'right',
    width: 330
  }
]

// 打开 drawer（新增、查看、编辑）
const dialogRef = ref()
const openDrawer = (title: string, row: Partial<SysTag.ResTagList> = {}) => {
  let params = {
    title,
    row: { ...row },
    isView: title === '查看',
    api: title === '新增' ? addTag : title === '编辑' ? editTag : '',
    getTableList: proTable.value.getTableList,
    maxHeight: '200px'
  }
  dialogRef.value.acceptParams(params)
}
</script>

<style scoped></style>
