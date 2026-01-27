import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiChartBar, HiDownload, HiUpload, HiChevronRight } from 'react-icons/hi'
import './StartScreen.css'

function StartScreen() {
  const { setScreen, setMode } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handleDownload = () => {
    hapticFeedback('light')
    setMode('download')
    setScreen('reportType')
  }
  
  const handleUpload = () => {
    hapticFeedback('light')
    setMode('upload')
    setScreen('upload')
  }
  
  return (
    <div className="screen start-screen">
      <div className="welcome-section">
        <div className="welcome-icon">
          <HiChartBar size={64} />
        </div>
        <h2>Добро пожаловать!</h2>
        <p>Выберите действие для работы с отчётами</p>
      </div>
      
      <div className="action-cards">
        <button className="action-card" onClick={handleDownload}>
          <div className="card-icon">
            <HiDownload size={36} />
          </div>
          <div className="card-content">
            <h3>Получить отчёт</h3>
            <p>Сгенерировать и скачать отчёт</p>
          </div>
          <div className="card-arrow">
            <HiChevronRight size={24} />
          </div>
        </button>
        
        <button className="action-card" onClick={handleUpload}>
          <div className="card-icon">
            <HiUpload size={36} />
          </div>
          <div className="card-content">
            <h3>Загрузить отчёт</h3>
            <p>Загрузить готовый XLSX файл</p>
          </div>
          <div className="card-arrow">
            <HiChevronRight size={24} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default StartScreen
