// * 请求响应参数(不包含data)
export interface Result {
  code: string
  msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data: T
}

// * 分页响应参数
export interface ResPage<T> {
  list: T[]
  page: number
  limit: number
  total: number
}

// * 分页请求参数
export interface ReqPage {
  page: number
  limit: number
}

// * 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
    // key: string
    // captcha: string
  }
  export interface ResLogin {
    access_token: string
  }
  // export interface ResLoginCaptcha {
  //   key: string
  //   image: string
  // }
}

// * 管理员管理模块
export namespace SysManager {
  export interface ReqGetManagerParams extends ReqPage {
    username?: string
  }
  export interface ResManagerList {
    pkId: number
    username: string
    avatar: string
    status: number
    createTime: string
  }
  export interface ReqEditManagerParams {
    pkId?: number
    username: string
    avatar: string
    status: number
    roleId: number
    password?: string
  }

  export interface ReqEditPasswordParams {
    password?: string
    code?: string
  }
}

// * 角色模块
export namespace SysRole {
  export interface ReqGetRoleParams extends ReqPage {
    name?: string
  }
  export interface ResRoleList {
    pkId: number
    name: string
    remark: string
    menuIds: number[]
    createTime: string
  }
  export interface ReqEditRoleParams {
    pkId?: number
    name: string
    remark: string
    menuIds: number[]
  }
}

// * 菜单模块
export namespace SysMenu {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ResMenuList {
    title: string
    pkId: number
    pid: number
    path: string
    name: string
    icon: string
    component?: string
    type: 'MENU_DIR' | 'MENU' | 'BUTTON'
    openType: 'TAB' | 'URL'
    url?: string
    auth?: string
    keepalive: boolean
    sort: number
    parentName: String
    children: ResMenuList[]
    hide?: boolean
  }
}

// * 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}

// * 字典
export interface Dict {
  id: number
  title: string
  updateTime: string
  value: number
}

/** 字典设置 */
export interface DictConfigRes {
  createTime: string
  dictNumber: string
  id: number
  title: string
  updateTime: string
  value: number
}

/** 公告管理 */
export namespace SysNotice {
  export interface ReqGetNoticeParams extends ReqPage {
    name?: string
  }
  /** 公告列表 */
  export interface ResNoticeList {
    pkId: number
    title: string
    cover: string
    content: string
    adminId: number
    isTop: number
    isSwiper: number
    deleteFlag: number
    createTime: string
    updateTime: string
  }
  /** 公告编辑 */
  export interface ReqEditNoticeParams {
    pkId?: number
    title: string
    cover: string
    content: string
    adminId: number
    isTop: number
    isSwiper: number
  }
  /** 新增公告 */
  export interface ReqAddNoticeParams {
    pkId?: number
    title: string
    cover: string
    content: string
    adminId: number
    isTop: number
    isSwiper: number
  }
}

/** 标签管理 */
export namespace SysTag {
  export interface ReqGetTagParams extends ReqPage {
    name?: string
  }
  /** 标签列表 */
  export interface ResTagList {
    pkId: number
    title: string
    description: string
    isHot: string
    deleteFlag: number
    createTime: string
    updateTime: string
  }
  /** 标签修改 */
  export interface ReqEditTagParams {
    title: string
    description: string
    isHot: string
  }
  /** 新增标签 */
  export interface ReqAddTagParams {
    title: string
    description: string
    isHot: string
  }
}

/** 分类管理 */
export namespace SysCategory {
  export interface ReqGetCategoryParams extends ReqPage {
    name?: string
  }
  /** 分类列表 */
  export interface ResCategoryList {
    pkId: number
    title: string
    type: number
    description: string
    deleteFlag: number
    createTime: string
    updateTime: string
  }
  /** 分类编辑 */
  export interface ReqEditCategoryParams {
    title: string
    type: number
    description: string
  }
  /** 新增分类 */
  export interface ReqAddCategoryParams {
    title: string
    type: number
    description: string
  }
}

/** 资源管理 */
export namespace SysResource {
  /** 资源请求参数 */
  export interface ReqGetResourceParams extends ReqPage {
    name?: string
  }
  /** 资源列表 */
  export interface ResResourceList {
    pkId: number
    title: string
    author: number
    diskType: number
    resType: number
    tags: string[]
    downloadUrl: string
    detail: string
    price: number
    likeNum: number
    isTop: number
    status: number
    remark: string
    deleteFlag: number
    createTime: string
    updateTime: string
    tagList: string[]
    resTypeList: string[]
  }
  export interface ReqAuditResource {
    pkId: number
    status: number
    remark: string
  }
}
