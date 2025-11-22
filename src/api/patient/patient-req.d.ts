/**
 * PatientCreate
 */
export interface PatientCreate {
  name: string;
  serialNo: string;
  abbr?: string;
  time?: number;
  inpatientOutpatient?: "住院" | "门诊";
  group?: string;
  gender?: string;
  age?: number;
  caseNo?: string;
  diagnosis?: string;
  isTested?: boolean;
  preTreatment?: boolean;
  treatmentType?: string;
  memo?: string;
}

/**
 * PatientListQuery
 */
export interface PatientListQuery {
  page?: number;
  limit?: number;
  name?: string;
  serialNo?: string;
  inpatientOutpatient?: string;
  isTested?: boolean;
  diagnosis?: string;
  group?: string;
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
export interface UpdatePatientRequest {
  id: number;
  name?: string;
  serialNo?: string;
  abbr?: string;
  time?: number;
  inpatientOutpatient?: "住院" | "门诊";
  group?: string;
  gender?: string;
  age?: number;
  caseNo?: string;
  diagnosis?: string;
  isTested?: boolean;
  preTreatment?: boolean;
  treatmentType?: string;
  memo?: string;
}

/**
 * DeletePatientRequest
 */
export interface DeletePatientRequest {
  id: number;
}
