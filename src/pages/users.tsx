import type { ProColumns } from "@ant-design/pro-components";
import {
  ProTable,
  DrawerForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

export type UserListItem = {
  username: string; // 用户名
  /**
   * 超级管理员：可授予权限、上传/下载文件、增删用户
   * 管理员：可上传/下载文件
   * 访客：仅查看文件，下载需要超级管理员授权
   */
  userPermission: "超级管理员" | "管理员" | "访客"; // 权限
  department?: string; // 部门
  phone?: string; // 电话
};

const tableListDataSource: UserListItem[] = [
  {
    username: "张三",
    userPermission: "超级管理员",
    department: "IT",
    phone: "123-456-7890",
  },
  {
    username: "李四",
    userPermission: "管理员",
    department: "研究员",
    phone: "098-765-4321",
  },
  {
    username: "王五",
    userPermission: "访客",
    phone: "555-555-5555",
  },
];

const columns: ProColumns<UserListItem>[] = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    fixed: "left",
    width: 70,
  },
  { title: "权限", dataIndex: "userPermission", key: "userPermission" },
  { title: "部门", dataIndex: "department", key: "department" },
  { title: "电话", dataIndex: "phone", key: "phone" },
  {
    title: "操作",
    valueType: "option",
    render: () => {
      return (
        <>
          <Button>编辑</Button>
        </>
      );
    },
    fixed: "right",
    width: 200,
  },
];

function UserPage() {
  const renderCreateAction = () => {
    const [form] = Form.useForm<{ username: string }>();

    return (
      <DrawerForm<Omit<UserListItem, "id">>
        title="创建用户"
        form={form}
        trigger={<Button type="primary">创建用户</Button>}
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
    <ProTable<UserListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      cardBordered
      search={{
        labelWidth: "auto",
      }}
      scroll={{ x: 800 }}
      rowKey="key"
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
