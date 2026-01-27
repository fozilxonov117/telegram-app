import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiCalendar } from 'react-icons/hi'
import './MonthSelectorScreen.css'

function MonthSelectorScreen() {
  const { setScreen, setSelectedMonth } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  
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
  
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
  
  const handleSelectMonth = (index) => {
    setSelectedMonthIndex(index)
    hapticFeedback('medium')
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
        <label>Год:</label>
        <select 
          value={selectedYear} 
          onChange={(e) => {
            setSelectedYear(Number(e.target.value))
            hapticFeedback('light')
          }}
          className="year-select"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
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
