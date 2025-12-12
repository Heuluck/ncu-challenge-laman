import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProFormSelect, ProTable } from "@ant-design/pro-components";
import { Alert, Button, message, Modal, Tooltip } from "antd";
import { useRef } from "react";
import fileApi from "../../api/file/file";
import patientApi from "../../api/patient/patient";
import userApi from "../../api/user/user";
import useUserPermission from "../../hook/useUserPermission";
import type { requestListItem } from "../../api/file/file-res";
import { Link } from "react-router";
import dayjs from "dayjs";
import type { UserPermission } from "../../api/user/user-req";

const requestUsers = async (permission: UserPermission) => {
  try {
    const resp = await userApi.GetUserList({
      userPermission: permission,
      page: 1,
      limit: 10000,
    });
    const items = resp.data?.items || [];
    return items.map((p) => ({
      label: `${p.username}(${p.id})`,
      value: p.id,
    }));
  } catch (_) {
    return [];
  }
};

const requestPatients = async () => {
  try {
    const resp = await patientApi.GetPatientList({ page: 1, limit: 10000 });
    const items = resp.data?.items || [];
    return items.map((p) => ({
      label: `${p.caseNo} (${p.abbr} - ${p.gender} - ${p.diagnosis})`,
      value: p.id,
    }));
  } catch (_) {
    return [];
  }
};

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

function DownloadReqPage() {
  const actionRef = useRef<ActionType>(null);
  const permission = useUserPermission();
  const { confirm } = Modal;

  const columns: ProColumns<requestListItem>[] = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 45,
      hideInSearch: true,
    },
    {
      title: "请求人",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 120,
      renderFormItem(_, config, form) {
        return <ProFormSelect showSearch {...config} {...form} />;
      },
      request: () => requestUsers("访客"),
      render: (_text, record) => {
        return (
          <Tooltip title={`${record.userId} - ${record.username}`}>
            {record.username}
          </Tooltip>
        );
      },
    },
    {
      title: "相关患者",
      dataIndex: "patientName",
      key: "patientId",
      request: requestPatients,
      renderFormItem(_, config, form) {
        return <ProFormSelect showSearch {...config} {...form} />;
      },
      render: (_text, record) => {
        return (
          <Tooltip
            title={`${
              record.patientName
            } (${record.patientGender}, ${record.patientAge}岁) - ${
              record.patientDiagnosis
            }`}
          >
            <span>
              {record.patientCaseNo} ({record.patientName})
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "文件原名",
      dataIndex: "originalName",
      key: "originalName",
      render: (_text, record) => {
        return (
          <Tooltip
            title={`${record.fileId} - ${record.originalName} - ${record.filename}`}
          >
            {record.originalName}
          </Tooltip>
        );
      },
    },
    { title: "请求理由", dataIndex: "message", key: "message", ellipsis: true },
    {
      title: "请求时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text, record) => {
        return dayjs((record.createdAt ?? 0) * 1000).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "病人组别",
      dataIndex: "patientGroup",
      key: "patientGroup",
      request: requestGroups,
      render: (_text, record) => {
        if (!record.patientGroup) return "-";
        return (
          <Tooltip
            title={`${record.patientId} - ${record.patientName}(${record.patientSerialNo})`}
          >
            {record.patientGroup}
          </Tooltip>
        );
      },
    },
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
      render: (_text, record) => {
        let color = "default";
        let text = "未知状态";
        if (record.status === "pending") {
          color = "blue";
          text = "待处理";
        } else if (record.status === "approved") {
          color = "green";
          text = "已批准";
        } else if (record.status === "rejected") {
          color = "red";
          text = "已拒绝";
        }
        return (
          <Tooltip
            title={
              record.status === "approved" && record.expiresAt
                ? `有效期至 ${dayjs(record.expiresAt * 1000).format("YYYY-MM-DD HH:mm")}`
                : ""
            }
          >
            <span style={{ color }}>{text}</span>
          </Tooltip>
        );
      },
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
          permission.hasSuperPermission && entity.status !== "approved" && (
            <Button
              key="approve"
              size="small"
              type="primary"
              onClick={() => {
                confirm({
                  title: "批准后无法撤销，确定批准该请求吗？",
                  onOk: async () => {
                    if (!entity.id) {
                      message.error("请求 ID 不存在");
                      return;
                    }
                    try {
                      const res = await fileApi.AuthorizeDownload({
                        requestId: entity.id,
                        action: "approve",
                        expiresIn: 1,
                      });
                      console.log(res.data?.expiresAt);
                      message.success(
                        `已批准，将在 ${dayjs((res.data?.expiresAt ?? 0) * 1000).format("YYYY-MM-DD HH:mm")} 失效`,
                      );
                      actionRef.current?.reload();
                    } catch (err) {
                      console.error(err);
                    }
                  },
                });
              }}
            >
              同意
            </Button>
          ),
          permission.hasSuperPermission &&
            entity.status !== "approved" &&
            entity.status !== "rejected" && (
              <Button
                key="reject"
                size="small"
                danger
                onClick={() => {
                  confirm({
                    title: "确定拒绝该请求吗？（拒绝后仍可批准）",
                    onOk: async () => {
                      if (!entity.id) {
                        message.error("请求 ID 不存在");
                        return;
                      }
                      try {
                        const res = await fileApi.AuthorizeDownload({
                          requestId: entity.id,
                          action: "reject",
                          expiresIn: 1,
                        });
                        console.log(res.data?.expiresAt);
                        message.success("已拒绝");
                        actionRef.current?.reload();
                      } catch (err) {
                        console.error(err);
                      }
                    },
                  });
                }}
              >
                拒绝
              </Button>
            ),
          permission.hasSuperPermission && (
            <Button key="lookup" size="small" onClick={() => {}}>
              <Link to={`/raman/view?id=${entity.fileId}`} target="_blank">
                患者详情
              </Link>
            </Button>
          ),
        ];
      },
    },
  ];

  const renderCreateAction = () => {
    return null;
  };

  return (
    <>
      <Alert
        title="鼠标悬停在患者信息上可查看详细信息；点击展开按钮搜索更多选项"
        type="info"
        showIcon
        style={{ marginBottom: 12 }}
      />
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
