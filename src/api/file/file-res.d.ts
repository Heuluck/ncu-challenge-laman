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
  createdAt?: number;
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

export type FileListInfo = (FileInfo & { hasPermission: boolean })

export interface FileListResponse {
  msg?: string;
  status?: number;
  data?: {
    files?: FileListInfo[];
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
    username?: string;
    fileId?: number;
    expiresAt?: number;
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
    createdAt?: number;
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
  createdAt?: number;
  fileId?: number;
  filename?: string;
  id?: number;
  message?: string;
  originalName?: string;
  patientGroup?: string;
  patientName?: string;
  patientId?: number;
  patientSerialNo?: string;
  status?: string;
  userId?: number;
  username?: string;
  expiresAt?: number;
}
