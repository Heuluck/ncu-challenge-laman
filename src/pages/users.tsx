import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";

export type TableListItem = {
  name: string; // 用户名
  userPermission: string; // 权限
  department: string; // 部门
  phone: string; // 电话
};

const tableListDataSource: TableListItem[] = [
  {
    name: "张三",
    userPermission: "管理员",
    department: "技术部",
    phone: "123-456-7890",
  },
  {
    name: "李四",
    userPermission: "用户",
    department: "市场部",
    phone: "098-765-4321",
  },
];

const columns: ProColumns<TableListItem>[] = [
  { title: "用户名", dataIndex: "name", key: "name", fixed: "left", width: 70 },
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
  return (
    <ProTable<TableListItem>
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
      toolBarRender={() => [
        <Button type="primary" key="primary">
          创建用户
        </Button>,
      ]}
    />
  );
}

export default UserPage;
