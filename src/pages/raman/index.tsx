import { PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import {
  ProTable,
  DrawerForm,
  ProFormUploadDragger,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Flex, Modal, Form, message } from "antd";
import fileApi from "../../api/file/file";
import { toHumanReadableSize } from "../../utils/toHuman";
import type { FileInfo } from "../../api/file/file-res";

const { confirm } = Modal;

export type TableListItem = {
  originalName?: string; // 原始文件名
  filename?: string; // csv 文件名
  size?: number; // 文件大小
  description?: string; // 文件描述
};

const columns: ProColumns<FileInfo>[] = [
  {
    title: "文件原名",
    dataIndex: "originalName",
    key: "originalName",
    fixed: "left",
  },
  {
    title: "文件大小",
    dataIndex: "size",
    key: "size",
    render: (_, entity) => toHumanReadableSize(entity.size),
    hideInSearch: true,
  },
  { title: "文件描述", dataIndex: "description", key: "description" },
  { title: "文件名", dataIndex: "filename", key: "filename" },
  {
    title: "上传者",
    key: "uploadedBy",
    render: (_, entity) =>
      entity.uploadedBy ? `${entity.uploadedBy} - ${entity.uploadedByUsername}` : entity.uploadedByUsername,
  },
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm();

    return (
      <DrawerForm<Partial<TableListItem>>
        title="上传 CSV 文件"
        form={form}
        trigger={
          <Button type="primary">
            <PlusOutlined />
            上传文件
          </Button>
        }
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
            multiple: true,
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
    <ProTable<FileInfo>
      columns={columns}
      columnsState={{
        defaultValue: {
          filename: { show: false },
        },
      }}
      request={async (params, _sorter, _filter) => {
        const { current: page = 1, pageSize: limit = 10, ...rest } = params;
        const data = await fileApi.GetFileList({
          page,
          limit,
          ...rest,
        });
        return Promise.resolve({
          data: data.data?.files || [],
          total: data.data?.pagination?.total || 0,
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
