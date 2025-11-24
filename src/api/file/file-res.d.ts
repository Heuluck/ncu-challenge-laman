/**
 * File 响应类型声明
 */

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
  importedTable?: string;
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
