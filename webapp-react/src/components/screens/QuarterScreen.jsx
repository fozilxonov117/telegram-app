import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import './QuarterScreen.css'

function QuarterScreen() {
  const { setScreen, setPeriod } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handleSelect = (detailType) => {
    hapticFeedback('light')
    setPeriod('quarter', detailType)
    setScreen('generating')
  }
  
  return (
    <div className="screen quarter-screen">
      <h2 className="screen-title">Квартальный отчёт</h2>
      <p className="screen-subtitle">Выберите тип детализации</p>
      
      <div className="option-cards">
        <button className="option-card" onClick={() => handleSelect('by_month')}>
          <div className="option-icon">📊</div>
          <div className="option-content">
            <h3>По месяцам</h3>
            <p>Детализация по месяцам в квартале</p>
          </div>
          <div className="option-arrow">›</div>
        </button>
        
        <button className="option-card" onClick={() => handleSelect('by_quarter')}>
          <div className="option-icon">📈</div>
          <div className="option-content">
            <h3>По кварталам</h3>
            <p>Q1, Q2, Q3, Q4</p>
          </div>
          <div className="option-arrow">›</div>
        </button>
      </div>
    </div>
  )
}

export default QuarterScreen
