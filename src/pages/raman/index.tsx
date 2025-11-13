import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Flex, Modal } from "antd";

const { confirm } = Modal;

export type TableListItem = {
  name: string; // csv 文件名
  filesize: string; // 文件大小
};

const tableListDataSource: TableListItem[] = [
  {
    name: "ZS-00001",
    filesize: "15MB",
  },
  {
    name: "ZS-00002",
    filesize: "20MB",
  },
];

const columns: ProColumns<TableListItem>[] = [
  { title: "文件名", dataIndex: "name", key: "name", fixed: "left" },
  { title: "文件大小", dataIndex: "filesize", key: "filesize", hideInSearch: true },
  {
    title: "操作",
    valueType: "option",
    render: () => {
      return (
        <Flex gap={8}>
          <Button type="primary">查看</Button>
          <Button>下载</Button>
          <Button onClick={()=>{
            confirm({
              title: "确认删除",
              onOk(){},
              onCancel(){}
            })
          }} danger>删除</Button>
        </Flex>
      );
    },
  },
];

function RamanListPage() {
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
      toolBarRender={() => []}
    />
  );
}

export default RamanListPage;
