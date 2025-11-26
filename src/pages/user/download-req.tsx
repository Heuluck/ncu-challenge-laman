import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Tooltip } from "antd";
import { useRef } from "react";
import userApi from "../../api/user/user";
import fileApi from "../../api/file/file";
import useUserPermission from "../../hook/useUserPermission";
import type { requestListItem } from "../../api/file/file-res";

function DownloadReqPage() {
  const actionRef = useRef<ActionType>(null);
  const permission = useUserPermission();
  const { confirm } = Modal;

  const columns: ProColumns<requestListItem>[] = [
    {
      title: "请求人",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 120,
      render: (_text, record) => {
        return (
          <Tooltip title={`${record.userId} - ${record.username}`}>
            {record.username}
          </Tooltip>
        );
      },
    },
    { title: "病人姓名", dataIndex: "patientName", key: "patientName" },
    { title: "文件原名", dataIndex: "originalName", key: "originalName" },
    { title: "请求理由", dataIndex: "message", key: "message", ellipsis: true },
    { title: "病人组别", dataIndex: "patientGroup", key: "patientGroup" },
    {
      title: "文件名",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      valueType: "select",
      request: async () => {
        return [
          { label: "待处理", value: "pending" },
          { label: "已批准", value: "approved" },
          { label: "已拒绝", value: "rejected" },
        ];
      },
    },
    {
      title: "操作",
      valueType: "option",
      width: 200,
      render: (_text, entity) => {
        if (!permission.hasSuperPermission) return <p>无权限操作</p>;
        return [
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

  const renderCreateAction = () => {
    return (
      <Button type="primary">
        <PlusOutlined />
        创建用户
      </Button>
    );
  };

  return (
    <>
      <ProTable<requestListItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params, _sorter, _filter) => {
          const { current: page = 1, pageSize: limit = 10, ...rest } = params;
          const resp = await fileApi.RequestList({ page, limit, ...rest });
          return Promise.resolve({
            data: resp.data?.items || [],
            total: resp.data?.pagination?.total || 0,
            success: true,
          });
        }}
        columnsState={{
          defaultValue: {
            filename: { show: false },
          },
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

export default DownloadReqPage;
