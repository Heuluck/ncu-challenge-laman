export type UserPermission = "访客" | "用户" | "管理员" | "超级管理员";

/**
 * LoginRequest
 */
export interface LoginRequest {
  password: string;
  username: string;
}

/**
 * AuthUserListQuery
 */
export interface AuthUserListQuery {
  /**
   * 创建时间结束（ISO）
   */
  createdAtEnd?: string;
  /**
   * 创建时间起始（ISO）
   */
  createdAtStart?: string;
  /**
   * 按科室/部门模糊搜索
   */
  department?: string;
  /**
   * 是否只返回激活用户；未提供则默认为 true
   */
  isActive?: boolean;
  limit?: number;
  page?: number;
  /**
   * 按电话号码模糊搜索
   */
  phone?: string;
  /**
   * 按用户名模糊搜索
   */
  username?: string;
  /**
   * 按权限精确匹配（例如：超级管理员/管理员/访客）
   */
  userPermission?: UserPermission;
}

/**
 * UpdateProfileRequest
 */
export interface Request {
  department?: string;
  phone?: string;
  username?: string;
  userPermission?: UserPermission;
}

/**
 * UpdatePermissionRequest
 */
export interface UpdatePermissionRequest {
  /**
   * 用户 ID（用于标识要修改权限的用户）
   */
  id: number;
  userPermission: UserPermission;
}

/**
 * DeleteUserRequest
 */
export interface DeleteUserRequest {
  /**
   * 要删除的用户 ID
   */
  id: number;
}
