import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  ProTable,
  DrawerForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-components";
import { Button, Form, message, Modal } from "antd";
import { useRef } from "react";
import { GetUserList, DeleteUser } from "../api/user/user";
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
          <Button key="edit">编辑</Button>,
          permission.hasSuperPermission && (
            <Button
              key="delete"
              danger
              onClick={() => {
                confirm({
                  title: "确认删除",
                  onOk: async () => {
                    try {
                      await DeleteUser({ id: entity.id as number });
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

  const renderCreateAction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm<{ username: string }>();

    return (
      <DrawerForm<Omit<userData, "id">>
        title="创建用户"
        form={form}
        trigger={
          <Button type="primary">
            <PlusOutlined />
            创建用户
          </Button>
        }
        autoFocusFirstInput
        drawerProps={{ destroyOnHidden: true }}
        submitTimeout={2000}
        onFinish={async (values) => {
          console.log("创建用户：", values);
          message.success("用户创建成功");
          return true;
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
          options={["超级管理员", "管理员", "访客"]}
          rules={[{ required: true }]}
        />
        <ProFormText name="department" label="部门" />
        <ProFormText name="phone" label="电话" />
      </DrawerForm>
    );
  };

  return (
    <ProTable<userData>
      columns={columns}
      actionRef={actionRef}
      request={async (params, _sorter, _filter) => {
        const { current: page = 1, pageSize: limit = 10, ...rest } = params;
        const resp = await GetUserList({ page, limit, ...rest });
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
  );
}

export default UserPage;
