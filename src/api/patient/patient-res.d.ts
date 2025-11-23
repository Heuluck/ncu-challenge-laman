export interface Pagination {
  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
}

export interface PatientListItem {
  id: number; // 编号
  abbr: string; // 缩写
  time: number; // 时间（时间戳）
  name: string; // 姓名
  serialNo: string; // 流水号
  inpatientOutpatient: "住院" | "门诊"; // 住院/门诊
  group: string; // 组别
  gender: string; // 性别
  age: number; // 年龄
  caseNo: string; // 病案号
  diagnosis: string; // 诊断
  isTested: boolean; // 是否已检
  tStage?: string; // T 分期
  nStage?: string; // N 分期
  mStage?: string; // M 分期
  stage?: string; // 分期组合
  preTreatment: boolean; // 采样前是否接受治疗
  treatmentType?: string; // 接受何种治疗
  memo: string; // 备注
  createdAt?: string;
}

/**
 * PatientCreateResponse
 */
export interface PatientCreateResponse {
  msg?: string;
  status?: number;
  data?: PatientListItem;
}

/**
 * PatientListResponse
 */
export interface PatientListResponse {
  msg?: string;
  status?: number;
  data?: {
    items?: PatientListItem[];
    pagination?: Pagination;
  } | null;
}

/**
 * PatientDetailResponse
 */
export interface PatientDetailResponse {
  msg?: string;
  status?: number;
  data?: PatientListItem | null;
}

/**
 * PatientUpdateResponse
 */
export interface PatientUpdateResponse {
  msg?: string;
  status?: number;
  data?: { [key: string]: any } | null;
}

/**
 * PatientDeleteResponse
 */
export interface PatientDeleteResponse {
  msg?: string;
  status?: number;
  data?: { [key: string]: any } | null;
}

/**
 * PatientGroupsResponse
 */
export interface PatientGroupsResponse {
  msg?: string;
  status?: number;
  data?: {
    groups?: string[];
  } | null;
}

/**
 * PatientStatisticsResponse
 */
export interface PatientStatisticsResponse {
  msg?: string;
  status?: number;
  data?: {
    total?: number;
    byGroup?: { group?: string; count?: number }[];
    byDiagnosis?: { diagnosis?: string; count?: number }[];
  } | null;
}
