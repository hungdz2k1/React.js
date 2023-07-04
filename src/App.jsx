import "./App.css";
import { Layout, Menu, Button } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppstoreOutlined, CalculatorOutlined, MoneyCollectOutlined, FormOutlined, MenuOutlined,ClockCircleOutlined } from '@ant-design/icons';
import Pomodoro from "./Components/Pomodoro/pomodoro";
import Caculator from "./Components/Caculator/caculator";
import CurrencyConverter from "./Components/Currency/currency";
import HelloWorld from "./Components/HelloWorld/helloworld";
import ChessBoard from "./Components/ChessBoard/chessboard";
import { useState } from "react";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo" />
          <Button type="primary" onClick={toggle} className="sider-button">
            <MenuOutlined />
          </Button>
            <div className="header-title">SUPER APP</div>
        </Header>
        <Layout>
          <Sider
            breakpoint="md"
            collapsed={collapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
            >
              <Menu.Item key="/chessboard" icon={<AppstoreOutlined />}>
                <Link to="/chessboard">Chessboard</Link>
              </Menu.Item>
              <Menu.Item key="/caculator" icon={<CalculatorOutlined />}>
                <Link to="/caculator">Calculator</Link>
              </Menu.Item>
              <Menu.Item key="/currency" icon={<MoneyCollectOutlined />}>
                <Link to="/currency">Currency</Link>
              </Menu.Item>
              <Menu.Item key="/pomodoro" icon={<ClockCircleOutlined />}>
                <Link to="/pomodoro">Pomodoro</Link>
              </Menu.Item>
              <Menu.Item key="/helloworld" icon={<FormOutlined />}>
                <Link to="/helloworld">HelloWorld</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Switch>
                <Route path="/chessboard"><ChessBoard /></Route>
                <Route path="/caculator"><Caculator /></Route>
                <Route path="/currency"><CurrencyConverter /></Route>
                <Route path="/pomodoro"><Pomodoro /></Route>
                <Route path="/helloworld"><HelloWorld /></Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;