import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiClock, HiCalendar, HiChevronRight } from 'react-icons/hi'
import './ReportTypeScreen.css'

function ReportTypeScreen() {
  const { setScreen, setReportType } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handleSelectType = (type) => {
    hapticFeedback('light')
    setReportType(type)
    setScreen('scope')
  }
  
  return (
    <div className="screen report-type-screen">
      <h2 className="screen-title">Выберите тип отчёта</h2>
      <p className="screen-subtitle">Отчёт по часам или по дням</p>
      
      <div className="type-cards">
        <button className="type-card" onClick={() => handleSelectType('hourly')}>
          <div className="card-icon">
            <HiClock size={36} />
          </div>
          <div className="card-content">
            <h3>Почасовой отчёт</h3>
            <p>Данные по каждому часу</p>
          </div>
          <div className="card-arrow">
            <HiChevronRight size={24} />
          </div>
        </button>
        
        <button className="type-card" onClick={() => handleSelectType('daily')}>
          <div className="card-icon">
            <HiCalendar size={36} />
          </div>
          <div className="card-content">
            <h3>Дневной отчёт</h3>
            <p>Данные по каждому дню</p>
          </div>
          <div className="card-arrow">
            <HiChevronRight size={24} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default ReportTypeScreen
