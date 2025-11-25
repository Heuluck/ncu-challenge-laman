import useUserStore from "../store/user";

const useUserPermission = () => {
  const userStore = useUserStore();

  const hasSuperPermission = userStore.userData.userPermission === "超级管理员";
  const hasAdminPermission =
    userStore.userData.userPermission === "管理员" || hasSuperPermission;
  const hasCommonPermission =
    userStore.userData.userPermission === "普通用户" || hasAdminPermission;

  return {
    hasSuperPermission,
    hasAdminPermission,
    hasCommonPermission,
  };
};

export default useUserPermission;