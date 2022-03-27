import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  UsersOutlined,
} from "@ant-design/icons";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import "./defaultlayout.css";
import AddIcon from "@material-ui/icons/Add";
import PeopleIcon from "@material-ui/icons/People";
const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    //send logged in use data

    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <Layout>
        <Layout className="site-layout">
          <Header
            className="site-layout-background bs1 header"
            style={{
              position: "sticky",
              top: 0,

              width: "100%",
              padding: 0,
              zIndex: 9999,
            }}
          >
            <div className="d-flex justify-content-between align-items-center p-3">
              <h4>
                {" "}
                <PersonIcon fontSize="large" />{" "}
                {JSON.parse(localStorage.getItem("user")).username}
              </h4>

              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
            </div>
          </Header>
          <Content className="site-layout-background" style={{}}>
            {this.props.children}
          </Content>
        </Layout>
        <Sider
          style={{
            position: "sticky",
            top: 0,
            bottom: 0,
            overflow: "auto",
            height: "100vh",
          }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            //window.location.pathname highlight when we are in particular page
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key="/" icon={<HomeIcon fontSize="large" />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="addpost" icon={<AddIcon fontSize="large" />}>
              <Link to="/addpost">Add post</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to={`/profile/${user._id}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="allusers" icon={<PeopleIcon fontSize="large" />}>
              <Link to="/allusers">All Users</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined />}>
              <Link
                onClick={() => {
                  localStorage.removeItem("user", window.location.reload());
                }}
              >
                Log Out
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default DefaultLayout;
