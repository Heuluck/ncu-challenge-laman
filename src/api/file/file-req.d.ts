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
  /**
   * 创建时间结束（ISO）
   */
  createdAtEnd?: string;
  /**
   * 创建时间起始（ISO）
   */
  createdAtStart?: string;
  description?: string;
  filename?: string;
  fileType?: string;
  limit?: number;
  /**
   * 最大文件大小（字节）
   */
  maxSize?: number;
  mimeType?: string;
  /**
   * 最小文件大小（字节）
   */
  minSize?: number;
  originalName?: string;
  page?: number;
  uploadedBy?: string;
  /**
   * 按上传者用户ID过滤
   */
  uploadedById?: number;
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
