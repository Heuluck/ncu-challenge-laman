const apiPaths = {
  user: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    list: "/auth/user-list",
    updateProfile: "/auth/profile",
    updatePermission: "/auth/update-permission",
    delete: "/auth/delete",
    create: "/auth/create-user",
    resetPassword: "/auth/reset-password",
    updateUser: "/auth/admin-update-user",
  },
  patient: {
    create: "/patient/create",
    list: "/patient/list",
    detail: "/patient/detail",
    update: "/patient/update",
    delete: "/patient/delete",
    groups: "/patient/groups",
    statistics: "/patient/statistics",
  },
  file: {
    upload: "/file/upload",
    download: "/file/download",
    list: "/file/list",
    fileWithPatient: "/file/detail",
    types: "/file/types",
    delete: "/file/delete",
    authorizeDownload: "/file/authorize-download",
  },
};

export default apiPaths;
