import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import './MonthSelectorScreen.css'

function MonthSelectorScreen() {
  const { setScreen, setSelectedMonth } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const currentYear = new Date().getFullYear()
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  
  const months = [
    { name: 'Январь', index: 1 },
    { name: 'Февраль', index: 2 },
    { name: 'Март', index: 3 },
    { name: 'Апрель', index: 4 },
    { name: 'Май', index: 5 },
    { name: 'Июнь', index: 6 },
    { name: 'Июль', index: 7 },
    { name: 'Август', index: 8 },
    { name: 'Сентябрь', index: 9 },
    { name: 'Октябрь', index: 10 },
    { name: 'Ноябрь', index: 11 },
    { name: 'Декабрь', index: 12 }
  ]
  
  const handleSelectMonth = (index) => {
    setSelectedMonthIndex(index)
    hapticFeedback('medium')
  }
  
  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1)
    hapticFeedback('light')
  }
  
  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1)
    hapticFeedback('light')
  }
  
  const handleConfirm = () => {
    if (selectedMonthIndex !== null) {
      const monthData = {
        month: selectedMonthIndex,
        year: selectedYear,
        monthName: months[selectedMonthIndex - 1].name
      }
      setSelectedMonth(monthData)
      hapticFeedback('success')
      setScreen('generating')
    }
  }
  
  return (
    <div className="screen month-selector-screen">
      <h2 className="screen-title">Выберите месяц</h2>
      <p className="screen-subtitle">Отчёт за выбранный месяц</p>
      
      <div className="year-selector">
        <button className="year-nav-btn" onClick={handlePrevYear}>
          <HiChevronLeft size={24} />
        </button>
        <div className="year-display">
          <HiCalendar size={20} />
          <span className="year-value">{selectedYear}</span>
          {selectedYear === currentYear && <span className="current-badge">Текущий</span>}
        </div>
        <button className="year-nav-btn" onClick={handleNextYear}>
          <HiChevronRight size={24} />
        </button>
      </div>
      
      <div className="months-grid">
        {months.map((month) => (
          <button
            key={month.index}
            className={`month-card ${selectedMonthIndex === month.index ? 'selected' : ''}`}
            onClick={() => handleSelectMonth(month.index)}
          >
            <HiCalendar size={24} />
            <span>{month.name}</span>
          </button>
        ))}
      </div>
      
      <button 
        className="btn btn-primary btn-large" 
        onClick={handleConfirm}
        disabled={selectedMonthIndex === null}
      >
        Продолжить
      </button>
    </div>
  )
}

export default MonthSelectorScreen
