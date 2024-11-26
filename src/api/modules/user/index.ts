import http from '@/api'
import { _API } from '@/api/axios/servicePort'

/**
 * @name 用户管理模块
 */
export const UserApi = {
  page: (params: any) => http.post(_API + '/user/page', params),
  // add: (params: any) => http.post(_API + '/user/add', params),
  // remove: (params: number[]) => http.post(_API + '/user/remove', params),
  edit: (params: any) => http.post(_API + '/user/edit', params),
  export: (params: any) =>
    http.post(_API + '/user/export', params, {
      responseType: 'blob'
    }),
  // 冻结用户
  freezeUser: (userId: number) => http.post(_API + '/user/enabled?userId=' + userId),
  // 用户积分日志
  getUserBonusLog: (userId: number) => http.get(_API + '/user/bonus/list?userId=' + userId)
}