export interface Pagination {
  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
}

export interface PatientListItem {
  id?: number;
  abbr?: string;
  time?: number;
  name?: string;
  serialNo?: string;
  inpatientOutpatient?: string;
  group?: string;
  gender?: string;
  age?: number;
  caseNo?: string;
  diagnosis?: string;
  isTested?: boolean;
  tStage?: string;
  nStage?: string;
  mStage?: string;
  stage?: string;
  preTreatment?: string | boolean;
  memo?: string;
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
    groups?: { name?: string; count?: number }[];
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
