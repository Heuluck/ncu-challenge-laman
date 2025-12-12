import { CopyOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  ProTable,
  DrawerForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-components";
import { Alert, Button, Form, message, Modal } from "antd";
import { useRef, useState } from "react";
import type * as req from "../../api/user/user-req";
import userApi from "../../api/user/user";
import useUserPermission from "../../hook/useUserPermission";
import type { userData } from "../../api/user/user-res";

function UserPage() {
  const actionRef = useRef<ActionType>(null);
  const permission = useUserPermission();
  const { confirm } = Modal;
  const showPasswordModal = (password: string, title = "密码") => {
    Modal.info({
      title,
      content: (
        <div className="my-3">
          <span>请妥善保存新密码，并及时修改：</span>
          <div className="bg-gray-0 flex items-center justify-between rounded-lg border border-gray-300 shadow-md shadow-gray-200">
            <span className="px-4 select-all">{password}</span>
            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(password);
                  message.success("复制成功");
                } catch (_) {
                  message.success("复制失败");
                }
              }}
              className="ml-2 rounded-r-lg border-l border-gray-300 bg-gray-200 px-2 py-1 hover:cursor-pointer hover:bg-gray-300 active:bg-gray-400"
            >
              <CopyOutlined style={{ height: 18, width: 18 }} />
            </button>
          </div>
        </div>
      ),
      okText: "关闭",
    });
  };

  const columns: ProColumns<userData>[] = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 45,
      hideInSearch: true,
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 120,
    },
    {
      title: "权限",
      dataIndex: "userPermission",
      key: "userPermission",
      valueType: "select",
      request: async () => {
        return [
          { label: "超级管理员", value: "超级管理员" },
          { label: "管理员", value: "管理员" },
          { label: "用户", value: "用户" },
          { label: "访客", value: "访客" },
        ];
      },
    },
    { title: "部门", dataIndex: "department", key: "department" },
    { title: "电话", dataIndex: "phone", key: "phone" },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (_text, entity) => {
        if (!permission.hasSuperPermission) return <p>无权限操作</p>;
        return [
          permission.hasSuperPermission && (
            <Button
              size="small"
              key="edit"
              type="primary"
              onClick={() => {
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
            </Button>
          ),
          permission.hasSuperPermission && (
            <Button
              size="small"
              key="reset"
              onClick={() => {
                confirm({
                  title: "确认重置密码",
                  onOk: async () => {
                    try {
                      const resp = await userApi.ResetPassword({
                        id: entity.id as number,
                      });
                      if (!resp.data?.newPassword) {
                        message.error("重置密码失败，未返回新密码");
                        return;
                      }
                      const pwd = resp.data?.newPassword;
                      showPasswordModal(pwd, "新密码");
                      message.success("重置成功");
                      actionRef.current?.reload();
                    } catch (err) {
                      console.error(err);
                    }
                  },
                });
              }}
            >
              重设密码
            </Button>
          ),
          permission.hasSuperPermission && (
            <Button
              key="delete"
              size="small"
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

  const [form] = Form.useForm<Partial<userData>>();
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState({ id: -1, isEdit: false });

  const renderCreateAction = () => {
    if (!permission.hasSuperPermission) return null;
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
            const payload: Partial<req.AdminUpdateUserRequest> = {
              id: editData.id,
            };
            if (values.username) payload.username = values.username;
            if (values.userPermission)
              payload.userPermission =
                values.userPermission as req.UserPermission;
            if (values.department) payload.department = values.department;
            if (values.phone) payload.phone = values.phone;
            await userApi.UpdateUser(payload as req.AdminUpdateUserRequest);
            message.success("修改成功");
          } else {
            const payload: Partial<req.CreateUserRequest> = {};
            if (values.username) payload.username = values.username;
            if (values.userPermission)
              payload.userPermission =
                values.userPermission as req.UserPermission;
            if (values.department) payload.department = values.department;
            if (values.phone) payload.phone = values.phone;
            const resp = await userApi.CreateUser(
              payload as req.CreateUserRequest,
            );
            const pwd = resp.data?.password || "无法获取密码";
            showPasswordModal(pwd, "初始密码");
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
      <ProFormText
        name="username"
        label="用户名"
        rules={[{ required: true }]}
      />
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
      <Alert
        title="点击展开按钮搜索更多选项"
        type="info"
        showIcon
        style={{ marginBottom: 12 }}
      />
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
