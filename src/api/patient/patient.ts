import { instance } from "../instance"
import apiPaths from "../path"
import type * as req from "./patient-req"
import type * as res from "./patient-res"

/**
 * 创建患者信息
 * 管理员或超级管理员权限
 */
export const CreatePatient = (data: req.PatientCreate): Promise<res.PatientCreateResponse> => {
  return instance.post(apiPaths.patient.create, data)
}

/**
 * 获取患者列表
 */
export const GetPatientList = (data: req.PatientListQuery): Promise<res.PatientListResponse> => {
  return instance.post(apiPaths.patient.list, data)
}

/**
 * 获取患者详情
 */
export const GetPatientDetail = (data: req.GetDetailRequest): Promise<res.PatientDetailResponse> => {
  return instance.post(apiPaths.patient.detail, data)
}

/**
 * 更新患者信息
 * 管理员或超级管理员权限
 */
export const UpdatePatient = (data: req.UpdatePatientRequest): Promise<res.PatientUpdateResponse> => {
  return instance.post(apiPaths.patient.update, data)
}

/**
 * 删除患者信息
 * 超级管理员权限
 */
export const DeletePatient = (data: req.GetDetailRequest): Promise<res.PatientDeleteResponse> => {
  return instance.post(apiPaths.patient.delete, data)
}

/**
 * 获取患者分组列表
 */
export const GetPatientGroups = (): Promise<res.PatientGroupsResponse> => {
  return instance.post(apiPaths.patient.groups)
}