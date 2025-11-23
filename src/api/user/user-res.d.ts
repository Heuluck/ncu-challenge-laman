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
  department?: string;
  phone?: string;
  username?: string;
  userPermission?: string;
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
  data?: { [key: string]: any } | null;
}
