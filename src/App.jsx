import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t, i18n } = useTranslation();
  const { width, height } = useWindowSize();
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [pomodorosUntilLongBreak, setPomodorosUntilLongBreak] = useState(4);
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const [theme, setTheme] = useState('light');
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef(null);

  // テーマの適用
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 通知許可の要求
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // タイマーロジック
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 10); // 100倍速
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      handleSwitchSession();
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  // 設定変更の反映
  useEffect(() => {
    if (!isActive) {
      if (isWorkSession) {
        setTimeLeft(workTime * 60);
      } else if (isLongBreak) {
        setTimeLeft(longBreakTime * 60);
      } else {
        setTimeLeft(breakTime * 60);
      }
    }
  }, [workTime, breakTime, longBreakTime, isWorkSession, isLongBreak]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/vite.svg' });
    }
  };

  const handleSwitchSession = () => {
    playNotificationSound();
    
    if (isWorkSession) {
      // 作業完了のお祝い
      setShowConfetti(true);
      showNotification(t('notificationFocusTitle'), t('notificationFocusBody'));

      const newPomodoros = pomodoros + 1;
      setPomodoros(newPomodoros);
      setIsWorkSession(false);

      if (newPomodoros % pomodorosUntilLongBreak === 0) {
        setIsLongBreak(true);
        setTimeLeft(longBreakTime * 60);
      } else {
        setIsLongBreak(false);
        setTimeLeft(breakTime * 60);
      }
    } else {
      showNotification(t('notificationBreakTitle'), t('notificationBreakBody'));
      setIsWorkSession(true);
      setIsLongBreak(false);
      setTimeLeft(workTime * 60);
    }
    
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setIsLongBreak(false);
    setTimeLeft(workTime * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 999) {
      if (type === 'work') setWorkTime(value);
      if (type === 'break') setBreakTime(value);
      if (type === 'longBreak') setLongBreakTime(value);
      if (type === 'pomodorosUntilLong') setPomodorosUntilLongBreak(value);
    }
  };

  const getCurrentMaxTime = () => {
    if (isWorkSession) return workTime * 60;
    if (isLongBreak) return longBreakTime * 60;
    return breakTime * 60;
  };

  const getSessionLabel = () => {
    if (isWorkSession) return t('focus');
    if (isLongBreak) return t('longBreak');
    return t('break');
  };

  const getContainerClass = () => {
    if (isWorkSession) return 'work-mode';
    if (isLongBreak) return 'long-break-mode';
    return 'break-mode';
  };

  const getProgressCircleClass = () => {
    if (isWorkSession) return 'work';
    if (isLongBreak) return 'long-break';
    return 'break';
  };

  return (
    <div className={`container ${getContainerClass()}`}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="top-controls">
        <div className="lang-select-wrapper">
          <select 
            className="lang-select" 
            onChange={changeLanguage} 
            value={i18n.language}
            aria-label="Select language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="timer-card">
        <h2 className="session-label">
          {getSessionLabel()}
        </h2>
        
        <div className="timer-container">
          <svg className="progress-ring" width="260" height="260">
            <circle
              className="progress-ring__circle-bg"
              strokeWidth="8"
              fill="transparent"
              r="120"
              cx="130"
              cy="130"
            />
            <circle
              className={`progress-ring__circle ${getProgressCircleClass()}`}
              strokeWidth="8"
              fill="transparent"
              r="120"
              cx="130"
              cy="130"
              style={{
                strokeDasharray: `${2 * Math.PI * 120} ${2 * Math.PI * 120}`,
                strokeDashoffset: (2 * Math.PI * 120) - ((timeLeft / getCurrentMaxTime()) * (2 * Math.PI * 120))
              }}
            />
          </svg>
          <div className="timer-display">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="settings-panel">
          <div className="setting-group">
            <div className="setting-item">
              <label>{t('work')}</label>
              <input 
                type="number" 
                value={workTime} 
                onChange={(e) => handleTimeChange(e, 'work')}
                disabled={isActive}
                min="1"
              />
            </div>
            <div className="setting-item">
              <label>{t('break')}</label>
              <input 
                type="number" 
                value={breakTime} 
                onChange={(e) => handleTimeChange(e, 'break')}
                disabled={isActive}
                min="1"
              />
            </div>
          </div>
          <div className="setting-group">
            <div className="setting-item">
              <label>{t('lBreak')}</label>
              <input 
                type="number" 
                value={longBreakTime} 
                onChange={(e) => handleTimeChange(e, 'longBreak')}
                disabled={isActive}
                min="1"
              />
            </div>
            <div className="setting-item">
              <label>{t('rounds')}</label>
              <input 
                type="number" 
                value={pomodorosUntilLongBreak} 
                onChange={(e) => handleTimeChange(e, 'pomodorosUntilLong')}
                disabled={isActive}
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="controls">
          <button 
            className={`btn-primary ${isActive ? 'active' : ''}`}
            onClick={toggleTimer}
          >
            {isActive ? t('pause') : t('start')}
          </button>
          <button className="btn-secondary" onClick={resetTimer}>
            {t('reset')}
          </button>
        </div>
        <div className="status-indicator">
          <div className={`dot ${isWorkSession ? 'dot-work' : isLongBreak ? 'dot-long-break' : 'dot-break'}`}></div>
          <span>{isWorkSession ? t('keepGoing') : t('takeRest')}</span>
        </div>
        
        {pomodoros > 0 && (
          <div className="pomodoro-count">
            <div className="tomato-container">
              {Array.from({ length: pomodoros }).map((_, index) => (
                <span key={index} role="img" aria-label="tomato">🍅</span>
              ))}
            </div>
            <p className="count-label">{t('completed')}: {pomodoros}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
