import { useState, useEffect } from 'react';
import "./pomodoro.css";

function Pomodoro() {
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
    <div className="pomodoro">
      <h1>Pomodoro</h1>
      <div className='vietnam-time'>{vietnamTime}</div>
      <div className="timer">
        <span>{isWorking ? 'Working ' : 'Relaxing '}</span>
        <span>{formatTime(currentTime)}</span>
      </div>
      <div className="buttons">
        <button className='pomodoro__button' onClick={handleStartStopClick}>{isRunning ? 'Pause' : 'Start'}</button>
        <button className='pomodoro__button' onClick={handleResetClick}>Reset</button>
        <button className='pomodoro__button' onClick={handleSettingsClick}>Settings</button>
      </div>
      {showSettings && (
        <form>
          <div>
            <label htmlFor="workingTime">Working Time: </label>
            <input id="workingTime" type="number" value={workingTime} onChange={handleWorkingTimeChange} />
          </div>
          <div>
            <label htmlFor="relaxingTime">Relaxing Time: </label>
            <input id="relaxingTime" type="number" value={relaxingTime} onChange={handleRelaxingTimeChange} />
          </div>
        </form>
      )}
    </div>
  );
}

export default Pomodoro;