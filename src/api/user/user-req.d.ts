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
   * 按科室/部门模糊搜索
   */
  department?: string;
  limit?: number;
  page?: number;
  /**
   * 按用户名模糊搜索
   */
  username?: string;
  /**
   * 按权限精确匹配（例如：超级管理员/管理员/访客）
   */
  userPermission?: string;
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
