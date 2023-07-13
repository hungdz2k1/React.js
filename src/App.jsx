import "./App.css";
import { Layout, Menu, Button , Avatar ,Typography} from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppstoreOutlined,
  CalculatorOutlined,
  MoneyCollectOutlined,
  FormOutlined,
  MenuOutlined,
  ClockCircleOutlined,
  ZhihuOutlined
} from "@ant-design/icons";
import Pomodoro from "./Components/Pomodoro/pomodoro";
import Caculator from "./Components/Caculator/caculator";
import CurrencyConverter from "./Components/Currency/currency";
import HelloWorld from "./Components/HelloWorld/helloworld";
import ChessBoard from "./Components/ChessBoard/chessboard";
import Quote from "./Components/Quote/quote";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./Components/LanguageSelector/LanguageSelector";
import logo from "./assets/react.svg";
import avatar from "./assets/avatar.jpg";
import { Switch as AntSwitch} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const {Title , Text} = Typography;
function App() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Sider theme={theme} style={{borderRight: '1px solid whitesmoke'}} breakpoint="md" collapsed={collapsed}>
            <div className="logo-sider">
              <img className="logo" src={logo} alt="Logo" />
              {!collapsed && (
                <Text className="header-title">React.js</Text>
              )}
            </div>
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',gap: '0.5em',marginTop: '2em'}} >
              <Avatar size={64} src={avatar} alt="Avatar" />
                {!collapsed && (
                  <Title style={{fontSize: '1.1rem', color: '#00d5fc'}}>Lê Việt Hưng</Title>
                )}
           </div>
            <Menu
            theme={theme}
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <AppstoreOutlined />,
                label: <Link to={"/chessboard"}>{t("menu.chessboard")}</Link>,
              },
              {
                key: "2",
                icon: <CalculatorOutlined />,
                label: <Link to={"/caculator"}>{t("menu.calculator")}</Link>,
              },
              {
                key: "3",
                icon: <MoneyCollectOutlined />,
                label: <Link to={"/currency"}>{t("menu.currency")}</Link>,
              },
              {
                key: "4",
                icon: <ClockCircleOutlined />,
                label: <Link to={"/pomodoro"}>{t("menu.pomodoro")}</Link>,
              },
              {
                key: " 5",
                icon: <FormOutlined />,
                label: <Link to={"/helloworld"}>{t("menu.helloworld")}</Link>,
              },
              {
                key: " 6",
                icon: <ZhihuOutlined />,
                label: <Link to={"/quote"}>{t("menu.quote")}</Link>,
              },
            ]}
          />
          </Sider>
          <Layout>
            <Content>
              <Header style={{background: 'white'}} className="header">
                <Button
                  type="text"
                  onClick={toggle}
                  className="sider-button"
                >
                  <MenuOutlined />
                </Button>
                <div style={{display: 'flex',alignItems: 'center', gap: '0.5em'}}>
                  <AntSwitch checked={theme === "dark"} onChange={toggleTheme} checkedChildren="Dark" unCheckedChildren="Light" />
                  <LanguageSelector />
                </div>
              </Header>
              <div className="mini-apps">
                <Switch>
                  <Route path="/chessboard">
                    <ChessBoard />
                  </Route>
                  <Route path="/caculator">
                    <Caculator />
                  </Route>
                  <Route path="/currency">
                    <CurrencyConverter />
                  </Route>
                  <Route path="/pomodoro">
                    <Pomodoro />
                  </Route>
                  <Route path="/helloworld">
                    <HelloWorld />
                  </Route>
                  <Route path="/quote">
                    <Quote />
                  </Route>
                  <Route path="/">
                    <ChessBoard />
                  </Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}className="footer">{t("app.footer")}</Footer>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;