declare interface UserType {
  pkId: number
  wxOpenId: string
  account: string
  nickname: string
  avatar?: any
  phone: string
  gender: number
  birthday: string
  bonus: number
  remark: string
  deleteFlag: number
  createTime?: string
  updateTime?: string
  enabled: number
}

declare interface ReqPageUser {
  limit: number
  page: number
  order?: string
  asc?: boolean
  nickname?: string
  phone?: string
}
