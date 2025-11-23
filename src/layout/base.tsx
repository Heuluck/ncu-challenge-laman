import {
  AreaChartOutlined,
  DotChartOutlined,
  GithubFilled,
  HomeFilled,
  InfoCircleFilled,
  LogoutOutlined,
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
import { Avatar, ConfigProvider, Tooltip } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import useUserStore from "../store/user";

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
  const navigate = useNavigate();
  const userStore = useUserStore();
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
            menuFooterRender={(props) => {
              if (props?.isMobile) return [];
              if (props?.collapsed) {
                return <></>;
              }
              return [
                <div key={1} className="text-center">
                  {userStore.userData.username ? (
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                          size="small"
                        />
                        <div
                          style={{
                            fontSize: "14px",
                            marginInlineEnd: "32px",
                          }}
                        >
                          {userStore.userData.username}
                        </div>
                      </div>
                      <div className="flex space-x-0.5">
                        <Tooltip
                          title={`${userStore.userData.department} - ${userStore.userData.userPermission}`}
                        >
                          <button className="cursor-pointer rounded-sm px-1 py-0.5 transition-all duration-300 hover:bg-gray-300">
                            <InfoCircleFilled key="InfoCircleFilled" />
                          </button>
                        </Tooltip>
                        <Tooltip title="项目仓库">
                          <button className="cursor-pointer rounded-sm px-1 py-0.5 transition-all duration-300 hover:bg-gray-300">
                            <a
                              style={{ color: "#868686" }}
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://github.com/heuluck/ncu-challenge-laman-DB"
                            >
                              <GithubFilled key="GithubFilled" />
                            </a>
                          </button>
                        </Tooltip>
                        <Tooltip title="退出登录">
                          <button
                            className="cursor-pointer rounded-sm px-1 py-0.5 transition-all duration-300 hover:bg-gray-300"
                            onClick={() => {
                              localStorage.removeItem("authToken");
                              localStorage.removeItem("userData");
                              userStore.removeAllData();
                              navigate("/login");
                            }}
                          >
                            <LogoutOutlined key="QuestionCircleFilled" />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login">登录</Link>
                  )}
                </div>,
              ];
            }}
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
