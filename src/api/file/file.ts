import { instance } from "../instance";
import apiPaths from "../path";
import type * as req from "./file-req";
import type * as res from "./file-res";

/**
 * 上传文件
 * 管理员或超级管理员权限
 */
export const UploadFile = (
  data: req.FileUpload,
): Promise<res.FileUploadResponse> => {
  return instance.post(apiPaths.file.upload, data);
};

/**
 * 下载文件
 * 访客以外均可
 */
export const DownloadFile = (data: req.DownloadRequest): Promise<string> => {
  return instance.post(apiPaths.file.download, data);
};

/**
 * 获取文件列表
 */
export const GetFileList = (
  data: req.FileListQuery,
): Promise<res.FileListResponse> => {
  return instance.post(apiPaths.file.list, data);
};

/**
 * 获取文件类型列表
 */
export const GetFileTypes = (): Promise<res.FileTypesResponse> => {
  return instance.post(apiPaths.file.types);
};

/**
 * 删除文件
 * 管理员或超级管理员权限
 */
export const DeleteFile = (
  data: req.DeleteFileRequest,
): Promise<res.FileDeleteResponse> => {
  return instance.post(apiPaths.file.delete, data);
};

/**
 * 授权下载文件
 * 超级管理员权限
 */
export const AuthorizeDownload = (
  data: req.AuthorizeDownloadRequest,
): Promise<res.AuthorizeDownloadResponse> => {
  return instance.post(apiPaths.file.authorizeDownload, data);
};
