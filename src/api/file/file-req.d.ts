/**
 * File 请求类型声明
 */

/**
 * FileUpload
 */
export interface FileUpload {
  file: File | Blob | any;
  filename?: string;
  fileType?: string;
  description?: string;
  metadata?: { [key: string]: any } | string;
}

/**
 * DownloadRequest
 */
export interface DownloadRequest {
  id: number;
}

/**
 * FileListQuery
 */
export interface FileListQuery {
  page?: number;
  limit?: number;
  filename?: string;
  fileType?: string;
  uploadedBy?: number;
  importedTable?: string;
}

/**
 * FilePreviewRequest
 */
export interface FilePreviewRequest {
  id: number;
}

/**
 * DeleteFileRequest
 */
export interface DeleteFileRequest {
  id: number;
}

/**
 * AuthorizeDownloadRequest
 */
export interface AuthorizeDownloadRequest {
  fileId: number;
  userId: number;
}
