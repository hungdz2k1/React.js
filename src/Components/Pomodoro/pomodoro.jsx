import { useState, useEffect } from 'react';
import { Button, Form, Input, Layout, Typography } from 'antd';
import "./pomodoro.css";
import { useTranslation } from "react-i18next";


const { Title, Text } = Typography;
const { Header, Content } = Layout;

function Pomodoro() {
  const { t } = useTranslation();
  const [workingTime, setWorkingTime] = useState(25);
  const [relaxingTime, setRelaxingTime] = useState(5);
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [vietnamTime, setVietnamTime] = useState("");

  useEffect(() => {
    let intervalId;

    if (isRunning && currentTime > 0) {
      intervalId = setInterval(() => {
        setCurrentTime(currentTime => currentTime - 1);
      }, 1000);
    } else if (isRunning && currentTime === 0) {
      setIsWorking(isWorking => !isWorking);

      if (isWorking) {
        setCurrentTime(workingTime * 60);
      } else {
        setCurrentTime(relaxingTime * 60);
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, currentTime, workingTime, relaxingTime, isWorking]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const vietnamTime = date.toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
      setVietnamTime(vietnamTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setIsWorking(true);
    setCurrentTime(workingTime * 60);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleWorkingTimeChange = e => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setWorkingTime(value);
    }
  };

  const handleRelaxingTimeChange = e => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setRelaxingTime(value);
    }
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <>
    <h1 style={{fontSize: '2rem', textAlign: 'left', marginBottom: '1em'}}>Pomodoro</h1>
    <Layout className="pomodoro">
      <Header className="pomodoro__header header--white" style={{flexDirection: 'column'}}>
        <Title style={{marginBottom: '0'}} level={2}>{t("pomodoro.title")}</Title>
        <Text className='vietnam-time' style={{fontSize: '1.4rem'}}>{vietnamTime}</Text>
      </Header>
      <Content className="pomodoro__content">
        <div className="pomodoro__timer">
          <Text className="pomodoro__timer-label" style={{fontSize: '1.2rem'}}>
            {isWorking ? t("pomodoro.working") : t("pomodoro.relaxing")}
          </Text>
          <Text className="pomodoro__timer-time" style={{fontSize: '1.2rem'}}>
            {formatTime(currentTime)}
          </Text>
        </div>
        <div className="pomodoro__buttons">
          <Button className="pomodoro__button" type="primary" onClick={handleStartStopClick}>
            {isRunning ? t("pomodoro.pause") : t("pomodoro.start")}
          </Button>
          <Button className="pomodoro__button" onClick={handleResetClick}>
            {t("pomodoro.reset")}
          </Button>
          <Button className="pomodoro__button"onClick={handleSettingsClick}>
            {t("pomodoro.settings")}
          </Button>
        </div>
        {showSettings && (
          <Form className="pomodoro__settings">
            <Form.Item label={t("pomodoro.workingtime")}>
              <Input
                type="number"
                value={workingTime}
                onChange={handleWorkingTimeChange}
              />
            </Form.Item>
            <Form.Item label={t("pomodoro.relaxingtime")}>
              <Input
                type="number"
                value={relaxingTime}
                onChange={handleRelaxingTimeChange}
              />
            </Form.Item>
          </Form>
        )}
      </Content>
    </Layout>
</>
  );
}

export default Pomodoro;