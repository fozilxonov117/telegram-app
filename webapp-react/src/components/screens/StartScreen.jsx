import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import './StartScreen.css'

function StartScreen() {
  const { setScreen, setMode } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handleDownload = () => {
    hapticFeedback('light')
    setMode('download')
    setScreen('scope')
  }
  
  const handleUpload = () => {
    hapticFeedback('light')
    setMode('upload')
    setScreen('upload')
  }
  
  return (
    <div className="screen start-screen">
      <div className="welcome-section">
        <div className="welcome-icon">📊</div>
        <h2>Добро пожаловать!</h2>
        <p>Выберите действие для работы с отчётами</p>
      </div>
      
      <div className="action-cards">
        <button className="action-card" onClick={handleDownload}>
          <div className="card-icon">📥</div>
          <div className="card-content">
            <h3>Получить отчёт</h3>
            <p>Сгенерировать и скачать отчёт</p>
          </div>
          <div className="card-arrow">›</div>
        </button>
        
        <button className="action-card" onClick={handleUpload}>
          <div className="card-icon">📤</div>
          <div className="card-content">
            <h3>Загрузить отчёт</h3>
            <p>Загрузить готовый XLSX файл</p>
          </div>
          <div className="card-arrow">›</div>
        </button>
      </div>
    </div>
  )
}

export default StartScreen
