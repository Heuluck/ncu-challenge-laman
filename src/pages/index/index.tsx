import type { ActionType, ProFormInstance } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import CreatePatientDrawer from "./CreatePatientDrawer";
import patientApi from "../../api/patient/patient";
import type { PatientListItem } from "../../api/patient/patient-res";
import { useEffect, useRef, useState } from "react";
import { getColumns } from "./columns";
import useUserStore from "../../store/user";

const requestGroups = async () => {
  try {
    const data = await patientApi.GetPatientGroups();
    const groups = data.data?.groups || [];
    return groups.map((group) => ({
      label: group,
      value: group,
    }));
  } catch (e) {
    console.error("获取组别列表失败:", e);
  }
  return [];
};

function IndexPage() {
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: -1,
    isEdit: false,
  });
  const userStore = useUserStore();
  const isSuperAdmin = userStore.userData.userPermission === "超级管理员";
  const isAdmin =
    userStore.userData.userPermission === "管理员" || isSuperAdmin;

  useEffect(() => {
    formRef.current?.resetFields();
  }, [editData]);

  const columns = getColumns({
    userData: userStore.userData,
    formRef,
    actionRef,
    setEditData,
    setFormOpen,
    requestGroups,
  });

  return (
    <ProTable<PatientListItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, _sorter, _filter) => {
        const { current: page = 1, pageSize: limit = 10, ...rest } = params;
        const data = await patientApi.GetPatientList({
          page,
          limit,
          ...rest,
        });
        return Promise.resolve({
          data: data.data?.items || [],
          total: data.data?.pagination?.total || 0,
          success: true,
        });
      }}
      cardBordered
      search={{
        labelWidth: "auto",
      }}
      scroll={{ x: 1650 }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="表格标题"
      toolBarRender={() => [
        isAdmin && (
          <CreatePatientDrawer
            key="create"
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            formRef={formRef}
            editData={editData}
            setEditData={setEditData}
            actionRef={actionRef}
            requestGroups={requestGroups}
          />
        ),
      ]}
    />
  );
}

export default IndexPage;
