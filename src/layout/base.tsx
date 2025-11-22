import {
  AreaChartOutlined,
  DotChartOutlined,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
  type ProSettings,
} from "@ant-design/pro-components";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const routeList = {
  path: "/",
  routes: [
    {
      path: "/",
      name: "病人列表",
      icon: <HomeFilled />,
    },
    {
      name: "拉曼光谱",
      icon: <DotChartOutlined />,
      children: [
        {
          path: "/raman/",
          name: "示例图",
        },
        {
          path: "/raman/test",
          name: "测试",
        },
      ],
    },
    {
      path: "/user",
      name: "用户管理",
      icon: <UserOutlined />,
    },
  ],
};

function BaseLayout() {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>();
  const location = useLocation();
  return (
    <div id="pro-layout-container">
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return (
              document.getElementById("pro-layout-container") || document.body
            );
          }}
        >
          <ProLayout
            {...settings}
            title="拉曼光谱数据库"
            logo={<AreaChartOutlined />}
            location={{
              pathname: location.pathname,
            }}
            menuItemRender={(item, dom) =>
              item.path ? <Link to={item.path}>{dom}</Link> : dom
            }
            route={routeList}
            menuFooterRender={() => (
              <div className="text-center">
                <Link to="/login">登录</Link>
              </div>
            )}
          >
            <PageContainer>
              <ProCard>
                <Outlet />
              </ProCard>
            </PageContainer>
          </ProLayout>
          <SettingDrawer
            pathname={location.pathname}
            enableDarkTheme
            getContainer={(e: any) => {
              if (typeof window === "undefined") return e;
              return document.getElementById("pro-layout-container");
            }}
            settings={settings}
            onSettingChange={(changeSetting) => {
              setSetting(changeSetting);
            }}
            disableUrlParams={false}
          />
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
}

export default BaseLayout;
