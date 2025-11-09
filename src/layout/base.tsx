import { AreaChartOutlined, HomeFilled } from "@ant-design/icons";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Button } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

function BaseLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <ProLayout
        title="拉曼光谱数据库"
        logo={<AreaChartOutlined />}
        onPageChange={(loc) => {
          if (loc?.pathname) {
            console.log(loc.pathname);
            navigate(loc.pathname);
          }
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) =>
          item.path ? <Link to={item.path}>{dom}</Link> : dom
        }
        route={{
          path: "/",
          routes: [
            {
              path: "/",
              name: "病人列表",
              icon: <HomeFilled />,
            },
          ],
        }}
        menuFooterRender={() => (
          <div className="text-center">
            <Button autoInsertSpace={false} size="small">
              <Link to="/login">登录</Link>
            </Button>
          </div>
        )}
      >
        <PageContainer>
          <ProCard>
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </>
  );
}

export default BaseLayout;
