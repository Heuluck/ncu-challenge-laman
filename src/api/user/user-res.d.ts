export interface Pagination {
  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
}

/**
 * AuthLoginResponse
 *
 * BaseResponse
 */
export interface AuthLoginResponse {
  msg?: string;
  status?: number;
  /**
   * JWT token
   */
  data?: string;
}

/**
 * AuthMeResponse
 *
 * BaseResponse
 */
export interface AuthMeResponse {
  id?: number;
  msg?: string;
  status?: number;
  data?: userData;
}

export interface userData {
  id?: number;
  username: string; // 用户名
  /**
   * 超级管理员：可授予权限、上传/下载文件、增删用户
   * 管理员：可上传/下载文件
   * 访客：仅查看文件，下载需要超级管理员授权
   */
  userPermission: "超级管理员" | "管理员" | "访客"; // 权限
  department?: string; // 部门
  phone?: string; // 电话
}
/**
 * AuthUserListResponse
 *
 * BaseResponse
 */
export interface AuthUserListResponse {
  msg?: string;
  status?: number;
  data?: {
    items?: userData[];
    pagination?: Pagination;
  };
}

/**
 * AuthProfileResponse
 *
 * BaseResponse
 */
export interface AuthProfileResponse {
  msg?: string;
  status?: number;
  data?: null | userData;
}

/**
 * AuthUpdatePermissionResponse
 *
 * BaseResponse
 */
export interface AuthUpdatePermissionResponse {
  msg?: string;
  status?: number;
  data?: null | {
    id?: number;
    username?: string;
    userPermission?: string;
  };
}

/**
 * AuthDeleteUserResponse
 *
 * BaseResponse
 */
export interface AuthDeleteUserResponse {
  msg?: string;
  status?: number;
  data?: object | null;
}

/**
 * CreateUserResponse
 *
 * BaseResponse
 */
export interface CreateUserResponse {
  msg?: string;
  status?: number;
  data?: {
    password?: string;
    user?: {
      data?: userData;
    };
  };
}

/**
 * AdminUpdateUserResponse
 *
 * BaseResponse
 */
export interface Response {
  msg?: string;
  status?: number;
  data?: {
    department?: string;
    id?: number;
    phone?: string;
    username?: string;
    userPermission?: string;
  };
}

/**
 * ResetPasswordResponse
 *
 * BaseResponse
 */
export interface ResetPasswordResponse {
  msg?: string;
  status?: number;
  data?: {
    id?: number;
    newPassword?: string;
    username?: string;
  };
}
