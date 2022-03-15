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
} from "@ant-design/icons";
import PersonIcon from "@material-ui/icons/Person";
import "./defaultlayout.css";
const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Layout className="site-layout">
          <Header
            className="site-layout-background bs1 header"
            style={{ padding: 0 }}
          >
            <div className="d-flex justify-content-between align-items-center bs1">
              <h4>
                {" "}
                <PersonIcon fontSize="large" />{" "}
                {JSON.parse(localStorage.getItem("user")).username}
              </h4>
              <h2>Social Media</h2>
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
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            //window.location.pathname highlight when we are in particular page
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/addpost">Add post</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />}>
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
