<template>
  <ProTable ref="proTable" title="资源列表" :columns="columns" :requestApi="getTableList" :initParam="initParam" :dataCallback="dataCallback">
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button type="primary" link :icon="EditPen" v-hasPermi="['sys:resource:audit']" @click="openDrawer('审批', scope.row.pkId)" v-if="scope.row.status == 0">审批</el-button>
    </template>
  </ProTable>
  <ResourceDialog ref="dialogRef" />
</template>

<script setup lang="tsx" name="SysResource">
import ResourceDialog from './components/ResourceDialog.vue'
import { EditPen } from '@element-plus/icons-vue'

import { ref, reactive } from 'vue'
import { SysResource } from '@/api/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import ProTable from '@/components/ProTable/index.vue'
import { getResourcePage, auditResource } from '@/api/modules/resource'
import { dictConfigList } from '@/api/modules/dict/dictConfig'
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
  return getResourcePage(newParams)
}
// 表格配置项
const columns: ColumnProps<SysResource.ResResourceList>[] = [
  { type: 'selection', fixed: 'left', width: 60 },
  {
    prop: 'title',
    label: '资源标题',
    search: { el: 'input' }
  },
  {
    prop: 'authorName',
    label: '作者',
    width: 200
  },
  {
    prop: 'diskType',
    label: '⽹盘分类',
    width: 200
  },
  {
    prop: 'resTypeList',
    label: '资源分类',
    showOverflowTooltip: true,
    width: 300,
    render: (scope) => {
      console.log('scope.row:', scope.row) // 调试输出
      const resTypeList = scope.row.resTypeList || []
      if (!Array.isArray(resTypeList)) {
        return <span>无资源分类</span>
      }
      return (
        <div>
          {resTypeList.map((item: string, index: number) => (
            <el-tag key={index} type="success" class="mr-2" effect="dark">
              {item}
            </el-tag>
          ))}
        </div>
      )
    }
  },
  {
    prop: 'tagList',
    label: '标签',
    showOverflowTooltip: true,
    width: 300,
    render: (scope) => {
      console.log('scope.row:', scope.row) // 调试输出
      const tagList = scope.row.tagList || []
      if (!Array.isArray(tagList)) {
        return <span>无标签</span>
      }
      return (
        <div>
          {tagList.map((item: string, index: number) => (
            <el-tag key={index} type="info" class="mr-2" effect="dark">
              {item}
            </el-tag>
          ))}
        </div>
      )
    }
  },
  {
    prop: 'isTop',
    label: '是否置顶',
    width: 100,
    search: { el: 'select', props: { filterable: true } },
    enum: () => dictConfigList('isTop'),
    fieldNames: { label: 'title', value: 'value' },
    render: (scope) => {
      return (
        <el-tag type={scope.row.isTop === 0 ? 'success' : 'warning'} effe ct round>
          {scope.row.isTop === 1 ? '是' : '否'}
        </el-tag>
      )
    }
  },
  {
    prop: 'price',
    label: '积分'
  },
  {
    prop: 'likeNum',
    label: '点赞数'
  },
  {
    prop: 'detail',
    showOverflowTooltip: true,
    label: '详情'
  },
  {
    prop: 'downloadUrl',
    showOverflowTooltip: true,
    label: '下载链接'
  },
  {
    prop: 'status',
    label: '审核状态',
    width: 150,
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'title', value: 'value' },
    enum: () => dictConfigList('status'),
    render: (scope) => {
      let type = scope.row.status === 0 ? 'warning' : scope.row.status === 1 ? 'success' : 'danger'
      return <el-tag type={type}>{scope.row.status === 0 ? '待审核' : scope.row.status === 1 ? '审核通过' : '审核不通过'}</el-tag>
    }
  },
  {
    width: 200,
    prop: 'remark',
    showOverflowTooltip: true,
    label: '审核结果描述'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 200
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 100 }
]

// 打开 drawer(新增、查看、编辑)

const dialogRef = ref()
const openDrawer = (title: string, pkId: number) => {
  let params = {
    title,
    row: { pkId },
    api: auditResource,
    getTableList: proTable.value.getTableList,
    maxHeight: '150px'
  }
  dialogRef.value.acceptParams(params)
}
</script>
