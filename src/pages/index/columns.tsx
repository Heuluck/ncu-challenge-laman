import React from "react";
import type { ProColumns, ProFormInstance } from "@ant-design/pro-components";
import {
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormSlider,
} from "@ant-design/pro-components";
import { Button } from "antd";
import dayjs from "dayjs";
import type { PatientListItem } from "../../api/patient/patient-res";
import type { userData } from "../../api/user/user-res";

export type ColumnsDeps = {
  userData: userData;
  formRef: React.RefObject<ProFormInstance<any> | null>;
  setEditData: (v: { id: number; isEdit: boolean }) => void;
  setFormOpen: (open: boolean) => void;
  requestGroups: () => Promise<{ label: string; value: string }[]>;
};

export function getColumns(deps: ColumnsDeps): ProColumns<PatientListItem>[] {
  const { userData, formRef, setEditData, setFormOpen, requestGroups } = deps;
  const isSuperAdmin = userData.userPermission === "超级管理员";
  const isAdmin = userData.userPermission === "管理员" || isSuperAdmin;

  const columns: ProColumns<PatientListItem>[] = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 45,
      hideInSearch: true,
    },
    { title: "姓名", dataIndex: "name", key: "name", fixed: "left", width: 70 },
    { title: "缩写", dataIndex: "abbr", key: "abbr" },
    { title: "性别", dataIndex: "gender", key: "gender" },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      renderFormItem: () => (
        <ProFormSlider
          min={0}
          max={150}
          range
          fieldProps={{ defaultValue: [0, 150] }}
        />
      ),
      search: {
        transform: (value) => ({
          ageMin: value[0],
          ageMax: value[1],
        }),
      },
    },
    {
      title: "住院/门诊",
      dataIndex: "inpatientOutpatient",
      key: "inpatientOutpatient",
      width: 80,
      valueType: "select",
      valueEnum: {
        住院: { text: "住院" },
        门诊: { text: "门诊" },
      },
    },
    {
      title: "组别",
      dataIndex: "group",
      key: "group",
      valueType: "select",
      width: 100,
      renderFormItem(_, config, form) {
        return <ProFormSelect showSearch {...config} {...form} />;
      },
      request: requestGroups,
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      valueType: "dateTime",
      renderFormItem: () => (
        <ProFormDateRangePicker fieldProps={{ allowEmpty: true }} />
      ),
      search: {
        transform: (value) => ({
          timeStart: Math.floor(dayjs(value[0]).valueOf() / 1000),
          timeEnd: Math.floor(dayjs(value[1]).valueOf() / 1000),
        }),
      },
      width: 120,
      render: (_text, record) =>
        record.time
          ? dayjs(Number(record.time) * 1000)
              .locale("zh-cn")
              .format("YYYY-MM-DD")
          : undefined,
    },
    { title: "流水号", dataIndex: "serialNo", key: "serialNo" },
    { title: "病案号", dataIndex: "caseNo", key: "caseNo" },
    { title: "诊断", dataIndex: "diagnosis", key: "diagnosis", width: 150 },
    {
      title: "是否已检",
      dataIndex: "isTested",
      key: "isTested",
      valueType: "select",
      valueEnum: {
        true: { text: "是" },
        false: { text: "否" },
      },
    },
    {
      title: "TNM 分期",
      key: "tnmStage",
      children: [
        { title: "T", dataIndex: "tStage", key: "tStage" },
        { title: "N", dataIndex: "nStage", key: "nStage" },
        { title: "M", dataIndex: "mStage", key: "mStage" },
      ],
      hideInSearch: true,
    },
    {
      title: "分期组合",
      key: "stageCombination",
      children: [{ title: "分期", dataIndex: "stage", key: "stage" }],
      hideInSearch: true,
    },
    {
      title: "采样前是否接受治疗",
      dataIndex: "preTreatment",
      key: "preTreatment",
      valueType: "select",
      valueEnum: {
        true: { text: "是" },
        false: { text: "否" },
      },
    },
    { title: "接受何种治疗", dataIndex: "treatmentType", key: "treatmentType" },
    {
      title: "备注",
      dataIndex: "memo",
      key: "memo",
      width: 120,
      ellipsis: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 120,
      render: (_text, record) => isAdmin ? [
        isAdmin && <Button
          key="edit"
          size="small"
          onClick={() => {
            setEditData({
              id: record.id,
              isEdit: true,
            });
            setFormOpen(true);
            setTimeout(() => {
              formRef.current?.setFieldsValue({
                ...record,
                isNewGroup: record.group ? false : true,
                time: record.time ? dayjs(Number(record.time) * 1000) : null,
              });
            }, 0);
          }}
        >
          编辑
        </Button>,
        isSuperAdmin && <Button key="delete" size="small" danger>
          删除
        </Button>,
      ] : <p>无权限操作</p>,
    },
  ];

  return columns;
}

export default getColumns;
