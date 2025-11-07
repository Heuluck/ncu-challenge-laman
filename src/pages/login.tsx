import { ProForm, ProFormText } from '@ant-design/pro-components';

export default function Login() {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
      }}>
      <ProFormText name="name" label="姓名" />
    </ProForm>
  );
}
