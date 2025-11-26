/**
 * File 响应类型声明
 */

import type { PatientListItem } from "../patient/patient-res";

export interface FileInfo {
  id: number;
  filename: string;
  originalName?: string;
  mimeType?: string;
  size: number;
  fileType?: string;
  description?: string;
  metadata?: object | string;
  downloadCount?: number;
  createdAt?: string;
  uploadedBy?: number;
  uploadedByUsername?: string;
  patientId?: number;
  patientName?: string;
}

export interface FileUploadResponse {
  msg?: string;
  status?: number;
  data?: FileInfo | null;
}

export type FileDownloadSuccess = Blob | ArrayBuffer | string;

export interface FileDownloadError {
  msg?: string;
  status?: number;
  data?: object | null;
}

export interface Pagination {
  limit?: number;
  page?: number;
  total?: number;
  totalPages?: number;
}

export interface FileListResponse {
  msg?: string;
  status?: number;
  data?: {
    files?: FileInfo[];
    pagination?: Pagination;
  } | null;
}

export interface FileTypesResponse {
  msg?: string;
  status?: number;
  data?: {
    types?: { key?: string; name?: string }[];
  } | null;
}

export interface FileDeleteResponse {
  msg?: string;
  status?: number;
  data?: object | null;
}

export interface AuthorizeDownloadResponse {
  msg?: string;
  status?: number;
  data?: {
    url?: string;
    token?: string;
    expiresAt?: string;
  } | null;
}

export interface FileWithPatientResponse {
  msg?: string;
  status?: number;
  data?: {
    file?: FileInfo;
    patient?: PatientListItem;
  };
}

/**
 * RequestDownloadResponse
 *
 * BaseResponse
 */
export interface RequestDownloadResponse {
  msg?: string;
  status?: number;
  data?: null | {
    createdAt?: Date;
    fileId?: number;
    id?: number;
    message?: string;
    status?: string;
    userId?: number;
    username?: string;
  };
}

/**
 * RequestListResponse
 *
 * BaseResponse
 */
export interface RequestListResponse {
  msg?: string;
  status?: number;
  data?: {
    items?: requestListItem[];
    pagination?: Pagination;
  };
}

export interface requestListItem {
  createdAt?: Date;
  fileId?: number;
  filename?: string;
  id?: number;
  message?: string;
  originalName?: string;
  patientGroup?: string;
  patientName?: string;
  status?: string;
  userId?: number;
  username?: string;
}
