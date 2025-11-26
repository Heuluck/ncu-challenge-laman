/**
 * File 请求类型声明
 */

/**
 * FileUpload
 */
export interface FileUpload {
  description?: string;
  file: string;
  fileType?: string;
  /**
   * 关联的病人 ID，必填
   */
  patientId: number;
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
  patientId?: number;
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
  expireIn?: number;
}

export interface AuthorizeDownloadRequestDirect {
  requestId: number;
  action: "approve" | "reject";
  expiresIn: number;
}

export interface FileWithPatientRequest {
  /**
   * 文件 ID
   */
  id: number;
}

/**
 * RequestDownloadRequest
 */
export interface RequestDownloadRequest {
  fileId: number;
  /**
   * 申请说明，可选
   */
  message?: string;
}

/**
 * RequestListRequest
 */
export interface RequestListRequest {
  fileId?: number;
  limit?: number;
  page?: number;
  /**
   * 按患者分组精确匹配
   */
  patientGroup?: string;
  /**
   * 按患者姓名模糊搜索
   */
  patientName?: string;
  status?: string;
  userId?: number;
}
