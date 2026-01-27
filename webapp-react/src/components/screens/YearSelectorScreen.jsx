import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiTrendingUp } from 'react-icons/hi'
import './YearSelectorScreen.css'

function YearSelectorScreen() {
  const { setScreen, setSelectedYear } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const [selectedYearValue, setSelectedYearValue] = useState(null)
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
  
  const handleSelectYear = (year) => {
    setSelectedYearValue(year)
    hapticFeedback('medium')
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
      
      <div className="years-grid">
        {years.map((year) => (
          <button
            key={year}
            className={`year-card ${selectedYearValue === year ? 'selected' : ''}`}
            onClick={() => handleSelectYear(year)}
          >
            <HiTrendingUp size={28} />
            <span className="year-value">{year}</span>
          </button>
        ))}
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
