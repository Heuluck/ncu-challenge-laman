import type { PatientListItem } from "./patient-res";

/**
 * PatientCreate
 */
export type PatientCreate = Omit<PatientListItem, "createdAt", "id">

/**
 * PatientListQuery
 */
export interface PatientListQuery {
  abbr?: string;
  /**
   * 年龄上限（包含）
   */
  ageMax?: number;
  /**
   * 年龄下限（包含）
   */
  ageMin?: number;
  caseNo?: string;
  /**
   * 创建者用户ID
   */
  createdBy?: number;
  diagnosis?: string;
  /**
   * 男/女/未知/其他
   */
  gender?: string;
  group?: string;
  inpatientOutpatient?: string;
  isTested?: boolean;
  limit?: number;
  memo?: string;
  mStage?: string;
  name?: string;
  nStage?: string;
  page?: number;
  preTreatment?: boolean;
  serialNo?: string;
  stage?: string;
  /**
   * 结束时间（ISO 或 与数据库一致的格式）
   */
  timeEnd?: string;
  /**
   * 起始时间（ISO 或 与数据库一致的格式）
   */
  timeStart?: string;
  treatmentType?: string;
  tStage?: string;
}

/**
 * GetDetailRequest
 */
export interface GetDetailRequest {
  id: number;
}

/**
 * UpdatePatientRequest
 */
export type UpdatePatientRequest = Omit<PatientListItem, "createdAt">

/**
 * DeletePatientRequest
 */
export interface DeletePatientRequest {
  id: number;
}
