import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import './PeriodScreen.css'

function PeriodScreen() {
  const { setScreen, setPeriod, scopeName } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handlePeriod = (periodType, detailType = null) => {
    hapticFeedback('light')
    
    if (periodType === 'quarter' && !detailType) {
      setScreen('quarter')
    } else if (periodType === 'year' && !detailType) {
      setScreen('year')
    } else {
      setPeriod(periodType, detailType)
      setScreen('generating')
    }
  }
  
  return (
    <div className="screen period-screen">
      <div className="breadcrumb">
        <span className="badge-icon">📊</span>
        <span>Стандартный</span>
        <span className="breadcrumb-sep">›</span>
        <span>{scopeName}</span>
      </div>
      
      <h2 className="screen-title">Выберите период</h2>
      
      <div className="option-cards">
        <button className="option-card" onClick={() => handlePeriod('date')}>
          <div className="option-icon">📅</div>
          <div className="option-content">
            <h3>Дата</h3>
            <p>Отчёт за конкретную дату</p>
          </div>
          <div className="option-arrow">›</div>
        </button>
        
        <button className="option-card" onClick={() => handlePeriod('month')}>
          <div className="option-icon">🗓</div>
          <div className="option-content">
            <h3>Месяц</h3>
            <p>Месячный отчёт</p>
          </div>
          <div className="option-arrow">›</div>
        </button>
        
        <button className="option-card" onClick={() => handlePeriod('quarter')}>
          <div className="option-icon">📆</div>
          <div className="option-content">
            <h3>Квартальный</h3>
            <p>Отчёт по кварталам</p>
          </div>
          <div className="option-arrow">›</div>
        </button>
        
        <button className="option-card" onClick={() => handlePeriod('year')}>
          <div className="option-icon">📈</div>
          <div className="option-content">
            <h3>Годовой</h3>
            <p>Годовой отчёт</p>
          </div>
          <div className="option-arrow">›</div>
        </button>
      </div>
    </div>
  )
}

export default PeriodScreen
