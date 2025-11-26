import { instance } from "../instance";
import type { AxiosRequestConfig } from "axios";
import apiPaths from "../path";
import type * as req from "./file-req";
import type * as res from "./file-res";

/**
 * 上传文件
 * 管理员或超级管理员权限
 */
export const UploadFile = (
  data: FormData | req.FileUpload | Record<string, unknown>,
): Promise<res.FileUploadResponse | res.FileUploadResponse[]> => {
  if (data instanceof FormData) {
    return instance.post(apiPaths.file.upload, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // 将文件项转换为 File/Blob
  const resolveFileObj = (f: unknown): File | Blob | null => {
    if (!f) return null;
    // AntD Upload item shape: { uid, name, status, response, url, originFileObj }
    const maybe = f as { originFileObj?: File; file?: File } | File | Blob;
    return (
      (maybe as { originFileObj?: File }).originFileObj ||
      (maybe as { file?: File }).file ||
      (maybe as File)
    );
  };

  const payload = data as Record<string, unknown>;

  // 支持批量上传字段名：csvFile / csvFiles / files
  const fileField =
    payload.csvFile || payload.csvFiles || payload.files || payload.file;

  // 如果是数组，按后端当前行为逐个单文件上传（每次携带 patientId）
  if (Array.isArray(fileField)) {
    const files = fileField as unknown[];
    const promises: Promise<res.FileUploadResponse>[] = [];
    for (const f of files) {
      const fileObj = resolveFileObj(f);
      if (!fileObj) continue;
      const form = new FormData();
      form.append("file", fileObj as Blob);
      if (payload.patientId != null)
        form.append("patientId", String(payload.patientId));
      if (payload.description)
        form.append("description", String(payload.description));
      if (payload.fileType) form.append("fileType", String(payload.fileType));
      promises.push(
        instance.post(apiPaths.file.upload, form, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      );
    }
    return Promise.all(promises);
  }

  // 如果是单文件对象或包含 file 字段的对象
  const singleFile = resolveFileObj(fileField) || payload.file;
  const form = new FormData();
  if (singleFile) {
    form.append("file", singleFile as Blob);
  } else if (typeof payload.file === "string") {
    // 支持 file 为字符串（例如后端文件 id 或 base64）
    form.append("file", String(payload.file));
  }
  if (payload.patientId != null)
    form.append("patientId", String(payload.patientId));
  if (payload.description)
    form.append("description", String(payload.description));
  if (payload.fileType) form.append("fileType", String(payload.fileType));

  return instance.post(apiPaths.file.upload, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * 下载文件
 * 访客以外均可
 */
export const getFile = (data: req.DownloadRequest, abortSignal?: AbortSignal): Promise<string> => {
  return instance.post(apiPaths.file.download, data, { signal: abortSignal });
};

/**
 * 在浏览器中下载文件
 * 访客以外均可
 */
export const downloadFile = async (
  data: req.DownloadRequest,
  fileName: string = "download.csv",
): Promise<void> => {
  const cfg = {
    rawResponse: true,
  } as AxiosRequestConfig & { rawResponse?: boolean };

  const resp = await instance.post(apiPaths.file.download, data, cfg);

  const text = resp.data;

  const contentType = resp.headers["content-type"] || "text/csv; charset=utf-8";
  const blob = new Blob([text], { type: contentType });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
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
 * 获取单个文件和对应的病人信息
 */
export const GetFileWithPatient = (
  data: req.FileWithPatientRequest,
): Promise<res.FileWithPatientResponse> => {
  return instance.post(apiPaths.file.fileWithPatient, data);
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

/**
 * 请求下载文件
 * 仅访客权限
 */
export const RequestDownload = (
  data: req.RequestDownloadRequest,
): Promise<res.RequestDownloadResponse> => {
  return instance.post(apiPaths.file.requestDownload, data);
};

/**
 * 获取下载请求列表
 * 超级管理员权限
 */
export const RequestList = (
  data: req.RequestListRequest,
): Promise<res.RequestListResponse> => {
  return instance.post(apiPaths.file.requestList, data);
};

export default {
  UploadFile,
  getFile,
  downloadFile,
  GetFileList,
  GetFileWithPatient,
  GetFileTypes,
  DeleteFile,
  AuthorizeDownload,
  RequestDownload,
  RequestList,
} as const;
