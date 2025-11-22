import { instance } from "../instance"
import apiPaths from "../path"
import type * as req from "./user-req"
import type * as res from "./user-res"

/** 
 * 登录
 */
export const Login = (data: req.LoginRequest): Promise<res.AuthLoginResponse> => {
  return instance.post(apiPaths.user.login, data)
}

/**
 * 获取当前用户信息
 */
export const Me = (): Promise<res.AuthMeResponse> => {
  return instance.post(apiPaths.user.me)
}

/**
 * 获取用户列表
 * 管理员或超级管理员权限
 */
export const GetUserList = (data: req.AuthUserListQuery): Promise<res.AuthUserListResponse> => {
  return instance.post(apiPaths.user.list, data )
}

/**
 * 更新当前用户资料
 */
export const UpdateProfile = (data: req.Request): Promise<res.AuthProfileResponse> => {
  return instance.post(apiPaths.user.updateProfile, data)
}

/**
 * 更新用户权限
 * 管理员或超级管理员权限
 */
export const UpdatePermission = (data: req.UpdatePermissionRequest): Promise<res.AuthProfileResponse> => {
  return instance.post(apiPaths.user.updatePermission, data)
}

/**
 * 删除用户
 * 仅超级管理员权限
 */
export const DeleteUser = (data: req.DeleteUserRequest): Promise<res.AuthProfileResponse> => {
  return instance.post(apiPaths.user.delete, data)
}