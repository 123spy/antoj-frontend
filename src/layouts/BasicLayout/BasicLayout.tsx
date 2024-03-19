import {Outlet} from "@@/exports";
import {ProLayout} from "@ant-design/pro-layout";
import {history} from "umi";
import {MenuDataItem} from "@umijs/route-utils";
import menu from "../../../config/BasicHeaderMenu";
import {Link, useAccess} from "@@/exports";
import {BellOutlined, PlusCircleFilled, QuestionCircleOutlined, SearchOutlined} from "@ant-design/icons";
import GlobalAvatar from "@/components/GlobalAvatar/GlobalAvatar";
import {APP_LOGO, APP_TITLE} from "@/constants/AppConstant";
import {PageContainer} from "@ant-design/pro-components";
import {App, Button, Input, theme} from "antd";
import {useState} from "react";

const menuDataRender = (menuList: MenuDataItem[], access: any) => {
  return menuList.filter((menuItem) => {
    return !menuItem.access || access[menuItem.access];
  });
};


const BasicLayout = () => {
  const access = useAccess();

  return (
    <div>
      <App>
        <ProLayout
          layout={"top"}
          title={APP_TITLE}
          logo={APP_LOGO}
          onMenuHeaderClick={() => {
            history.push("/");
          }}
          style={{padding: 0}}
          fixedHeader={true}
          pageTitleRender={false}
          footerRender={() => <div></div>}
          menuDataRender={() => menuDataRender(menu, access)}
          menuItemRender={(
            menuItemProps, defaultDom
          ) => {
            if (menuItemProps.isUrl || !menuItemProps.path) {
              return defaultDom;
            }
            return <Link style={{color: "black"}} to={menuItemProps.path}>{defaultDom}</Link>
          }}
          avatarProps={{
            render: () => <GlobalAvatar></GlobalAvatar>
          }}
        >
          <App style={{backgroundColor: "rgba(245,243,250, 0.8)", minHeight: "100vh"}}>
            <Outlet/>
          </App>
          {/*<PageContainer*/}
          {/*  header={{title: null, breadcrumb: {},}}*/}
          {/*  style={{padding: "0 0px"}}*/}
          {/*>*/}
          {/*  <Outlet/>*/}
          {/*</PageContainer>*/}
        </ProLayout>
      </App>
    </div>
  )
}

export default BasicLayout;
