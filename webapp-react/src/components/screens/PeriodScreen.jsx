import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiChartBar, HiCalendar, HiChevronRight, HiTrendingUp } from 'react-icons/hi'
import './PeriodScreen.css'

function PeriodScreen() {
  const { setScreen, setPeriod, scopeName } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handlePeriod = (periodType, detailType = null) => {
    hapticFeedback('light')
    
    setPeriod(periodType, detailType)
    
    // Navigate to specific selector screen based on period type
    if (periodType === 'date') {
      setScreen('dateSelector')
    } else if (periodType === 'month') {
      setScreen('monthSelector')
    } else if (periodType === 'quarter') {
      setScreen('quarterSelector')
    } else if (periodType === 'year') {
      setScreen('yearSelector')
    } else {
      setScreen('generating')
    }
  }
  
  return (
    <div className="screen period-screen">
      <div className="breadcrumb">
        <span className="badge-icon">
          <HiChartBar size={18} />
        </span>
        <span>Стандартный</span>
        <span className="breadcrumb-sep">
          <HiChevronRight size={16} />
        </span>
        <span>{scopeName}</span>
      </div>
      
      <h2 className="screen-title">Выберите период</h2>
      
      <div className="option-cards">
        <button className="option-card" onClick={() => handlePeriod('date')}>
          <div className="option-icon">
            <HiCalendar size={28} />
          </div>
          <div className="option-content">
            <h3>Дата</h3>
            <p>Отчёт за конкретную дату</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
        
        <button className="option-card" onClick={() => handlePeriod('month')}>
          <div className="option-icon">
            <HiCalendar size={28} />
          </div>
          <div className="option-content">
            <h3>Месяц</h3>
            <p>Месячный отчёт</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
        
        <button className="option-card" onClick={() => handlePeriod('quarter')}>
          <div className="option-icon">
            <HiCalendar size={28} />
          </div>
          <div className="option-content">
            <h3>Квартальный</h3>
            <p>Отчёт по кварталам</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
        
        <button className="option-card" onClick={() => handlePeriod('year')}>
          <div className="option-icon">
            <HiTrendingUp size={28} />
          </div>
          <div className="option-content">
            <h3>Годовой</h3>
            <p>Годовой отчёт</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default PeriodScreen
