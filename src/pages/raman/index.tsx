import type { ProColumns } from "@ant-design/pro-components";
import {
  ProTable,
  DrawerForm,
  ProFormUploadDragger,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Flex, Modal, Form, message } from "antd";

const { confirm } = Modal;

export type TableListItem = {
  name: string; // csv 文件名
  filesize: string; // 文件大小
  description?: string; // 文件描述
};

const tableListDataSource: TableListItem[] = [
  {
    name: "ZS-00001",
    filesize: "15MB",
    description: "这是第一个文件",
  },
  {
    name: "ZS-00002",
    filesize: "20MB",
    description: "这是第二个文件",
  },
];

const columns: ProColumns<TableListItem>[] = [
  { title: "文件名", dataIndex: "name", key: "name", fixed: "left" },
  {
    title: "文件大小",
    dataIndex: "filesize",
    key: "filesize",
    hideInSearch: true,
  },
  { title: "文件描述", dataIndex: "description", key: "description" },
  {
    title: "操作",
    valueType: "option",
    render: () => {
      return (
        <Flex gap={8}>
          <Button type="primary">查看</Button>
          <Button>下载</Button>
          <Button
            onClick={() => {
              confirm({
                title: "确认删除",
                onOk() {},
                onCancel() {},
              });
            }}
            danger
          >
            删除
          </Button>
        </Flex>
      );
    },
  },
];

function RamanListPage() {
  const renderUploadAction = () => {
    const [form] = Form.useForm();

    return (
      <DrawerForm<Partial<TableListItem>>
        title="上传 CSV 文件"
        form={form}
        trigger={<Button type="primary">上传文件</Button>}
        autoFocusFirstInput
        drawerProps={{ destroyOnHidden: true }}
        submitTimeout={2000}
        onFinish={async (values) => {
          console.log("上传表单值：", values);
          message.success("上传成功");
          return true;
        }}
      >
        <ProFormUploadDragger
          max={20}
          description="支持批量上传最多 20 个 CSV 文件"
          label="csv 文件"
          name="csvFile"
          fieldProps={{
            multiple: true
          }}
          accept=".csv"
          rules={[{ required: true, message: "请上传至少一个 CSV 文件" }]}
        />
        <ProFormText
          name="name"
          label="文件描述（批量添加）"
          placeholder="文件描述"
        />
      </DrawerForm>
    );
  };

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
      toolBarRender={() => [renderUploadAction()]}
    />
  );
}

export default RamanListPage;
