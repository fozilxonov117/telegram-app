import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiTrendingUp, HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import './YearSelectorScreen.css'

function YearSelectorScreen() {
  const { setScreen, setSelectedYear } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const currentYear = new Date().getFullYear()
  const [selectedYearValue, setSelectedYearValue] = useState(null)
  const [startYear, setStartYear] = useState(currentYear - 5)
  
  const years = Array.from({ length: 12 }, (_, i) => startYear + i)
  
  const handleSelectYear = (year) => {
    setSelectedYearValue(year)
    hapticFeedback('medium')
  }
  
  const handlePrevYears = () => {
    setStartYear(startYear - 12)
    hapticFeedback('light')
  }
  
  const handleNextYears = () => {
    setStartYear(startYear + 12)
    hapticFeedback('light')
  }
  
  const handleConfirm = () => {
    if (selectedYearValue) {
      const yearData = {
        year: selectedYearValue
      }
      setSelectedYear(yearData)
      hapticFeedback('success')
      setScreen('generating')
    }
  }
  
  return (
    <div className="screen year-selector-screen">
      <h2 className="screen-title">Выберите год</h2>
      <p className="screen-subtitle">Отчёт за выбранный год</p>
      
      <div className="year-selector-wrapper">
        <div className="year-navigation">
          <button className="nav-btn" onClick={handlePrevYears}>
            <HiChevronLeft size={24} />
          </button>
          <div className="year-range">
            <HiCalendar size={20} />
            <span>{startYear} - {startYear + 11}</span>
          </div>
          <button className="nav-btn" onClick={handleNextYears}>
            <HiChevronRight size={24} />
          </button>
        </div>
        
        <div className="years-grid">
          {years.map((year) => {
            const isCurrent = year === currentYear
            return (
              <button
                key={year}
                className={`year-card ${selectedYearValue === year ? 'selected' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => handleSelectYear(year)}
              >
                <div className="year-content">
                  <HiTrendingUp size={24} />
                  <span className="year-value">{year}</span>
                  {isCurrent && <span className="year-badge">Текущий</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>
      
      <button 
        className="btn btn-primary btn-large" 
        onClick={handleConfirm}
        disabled={!selectedYearValue}
      >
        Продолжить
      </button>
    </div>
  )
}

export default YearSelectorScreen
