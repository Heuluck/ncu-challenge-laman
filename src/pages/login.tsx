import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
      <div
        className="h-min bg-white rounded-lg shadow-lg"
        style={{
          backgroundImage:
            'radial-gradient(circle at 93% 1e+02%, rgba(22, 119, 255, 0.17) 0%, rgba(255, 255, 255, 0.05) 23%, rgba(255, 255, 255, 0.03) 87%, rgba(22, 119, 255, 0.12) 109%)',
        }}>
        <div className='m-8'>
          <LoginForm title="拉曼光谱数据">
            <div className="mt-8" />
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>
    </div>
  );
};
