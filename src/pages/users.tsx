import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  ProTable,
  DrawerForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-components";
import { Button, Form, message, Modal } from "antd";
import { useRef, useState } from "react";
import type * as req from "../api/user/user-req";
import userApi from "../api/user/user";
import useUserPermission from "../hook/useUserPermission";
import type { userData } from "../api/user/user-res";
// columns will be declared inside the component to access refs and permissions

function UserPage() {
  const actionRef = useRef<ActionType>(null);
  const permission = useUserPermission();
  const { confirm } = Modal;

  const columns: ProColumns<userData>[] = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 120,
    },
    { title: "权限", dataIndex: "userPermission", key: "userPermission" },
    { title: "部门", dataIndex: "department", key: "department" },
    { title: "电话", dataIndex: "phone", key: "phone" },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (_text, entity) => {
        if (!permission.hasCommonPermission) return <p>无权限操作</p>;
        return [
          <Button
            key="edit"
            onClick={() => {
              // open drawer in edit mode and set form values
              setEditData({ id: entity.id as number, isEdit: true });
              setFormOpen(true);
              setTimeout(() => {
                form.setFieldsValue({
                  username: entity.username,
                  userPermission: entity.userPermission,
                  department: entity.department,
                  phone: entity.phone,
                });
              }, 0);
            }}
          >
            编辑
          </Button>,
          permission.hasSuperPermission && (
            <Button
              key="delete"
              danger
              onClick={() => {
                confirm({
                  title: "确认删除",
                  onOk: async () => {
                    try {
                      await userApi.DeleteUser({ id: entity.id as number });
                      message.success("删除成功");
                      actionRef.current?.reload();
                    } catch (err) {
                      console.error(err);
                    }
                  },
                });
              }}
            >
              删除
            </Button>
          ),
        ];
      },
    },
  ];

  // form and drawer state for create / edit
  const [form] = Form.useForm<Partial<userData>>();
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState({ id: -1, isEdit: false });

  const renderCreateAction = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setEditData({ id: -1, isEdit: false });
          form.resetFields();
          setFormOpen(true);
        }}
      >
        <PlusOutlined />
        创建用户
      </Button>
    );
  };

  // DrawerForm for create / edit
  const CreateEditDrawer = (
    <DrawerForm<Partial<userData>>
      title={editData.isEdit ? "编辑用户" : "创建用户"}
      open={formOpen}
      onOpenChange={setFormOpen}
      form={form}
      autoFocusFirstInput
      drawerProps={{ destroyOnHidden: true }}
      submitTimeout={2000}
      onFinish={async (values: Partial<userData>) => {
        try {
          if (editData.isEdit && editData.id > 0) {
            const payload: Partial<req.AdminUpdateUserRequest> = { id: editData.id };
            if (values.username) payload.username = values.username;
            if (values.userPermission) payload.userPermission = values.userPermission as req.UserPermission;
            if (values.department) payload.department = values.department;
            if (values.phone) payload.phone = values.phone;
            await userApi.UpdateUser(payload as req.AdminUpdateUserRequest);
            message.success("修改成功");
          } else {
            const payload: Partial<req.CreateUserRequest> = {};
            if (values.username) payload.username = values.username;
            if (values.userPermission) payload.userPermission = values.userPermission as req.UserPermission;
            if (values.department) payload.department = values.department;
            if (values.phone) payload.phone = values.phone;
            await userApi.CreateUser(payload as req.CreateUserRequest);
            message.success("创建成功");
          }
          setFormOpen(false);
          form.resetFields();
          actionRef.current?.reload();
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }}
    >
      <ProFormText name="username" label="用户名" rules={[{ required: true }]} />
      <ProFormSelect
        name="userPermission"
        label="权限"
        options={["超级管理员", "管理员", "用户", "访客"]}
        rules={[{ required: true }]}
      />
      <ProFormText name="department" label="部门" />
      <ProFormText name="phone" label="电话" />
    </DrawerForm>
  );

  return (
    <>
      {CreateEditDrawer}
      <ProTable<userData>
        columns={columns}
        actionRef={actionRef}
        request={async (params, _sorter, _filter) => {
          const { current: page = 1, pageSize: limit = 10, ...rest } = params;
          const resp = await userApi.GetUserList({ page, limit, ...rest });
          return Promise.resolve({
            data: resp.data?.items || [],
            total: resp.data?.pagination?.total || 0,
            success: true,
          });
        }}
        cardBordered
        search={{
          labelWidth: "auto",
        }}
        scroll={{ x: 800 }}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        dateFormatter="string"
        headerTitle="表格标题"
        toolBarRender={() => [renderCreateAction()]}
      />
    </>
  );
}

export default UserPage;
