import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiChartBar, HiTrendingUp, HiClipboardList, HiChevronRight } from 'react-icons/hi'
import './YearScreen.css'

function YearScreen() {
  const { setScreen, setPeriod } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handleSelect = (detailType) => {
    hapticFeedback('light')
    setPeriod('year', detailType)
    setScreen('generating')
  }
  
  return (
    <div className="screen year-screen">
      <h2 className="screen-title">Годовой отчёт</h2>
      <p className="screen-subtitle">Выберите тип детализации</p>
      
      <div className="option-cards">
        <button className="option-card" onClick={() => handleSelect('by_month')}>
          <div className="option-icon">
            <HiChartBar size={28} />
          </div>
          <div className="option-content">
            <h3>По месяцам</h3>
            <p>Детализация по месяцам года</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
        
        <button className="option-card" onClick={() => handleSelect('by_quarter')}>
          <div className="option-icon">
            <HiTrendingUp size={28} />
          </div>
          <div className="option-content">
            <h3>По кварталам</h3>
            <p>Q1, Q2, Q3, Q4</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
        
        <button className="option-card" onClick={() => handleSelect('total')}>
          <div className="option-icon">
            <HiClipboardList size={28} />
          </div>
          <div className="option-content">
            <h3>Итоговый</h3>
            <p>Сводный годовой отчёт</p>
          </div>
          <div className="option-arrow">
            <HiChevronRight size={20} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default YearScreen
