const apiPaths = {
  user: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    list: '/auth/user-list',
    updateProfile: '/auth/profile',
    updatePermission: '/auth/update-permission',
    delete: '/auth/delete',
  },
  patient: {
    create: '/patient/create',
    list: '/patient/list',
    detail: '/patient/detail',
    update: '/patient/update',
    delete: '/patient/delete',
    groups: '/patient/groups',
    statistics: '/patient/statistics',
  },
  file: {
    upload: '/file/upload',
    download: '/file/download',
    list: '/file/list',
    types: '/file/types',
    delete: '/file/delete',
    authorizeDownload: '/file/authorize-download',
  },
}

export default apiPaths;
