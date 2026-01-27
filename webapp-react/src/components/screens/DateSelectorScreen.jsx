import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiCalendar, HiChevronLeft, HiChevronRight, HiArrowRight } from 'react-icons/hi'
import './DateSelectorScreen.css'

function DateSelectorScreen() {
  const { setScreen, setSelectedDate } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth }
  }
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    hapticFeedback('light')
  }
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    hapticFeedback('light')
  }
  
  const handleSelectDay = (day) => {
    const selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(selectedFullDate)
      setEndDate(null)
    } else if (startDate && !endDate) {
      // Select end date
      if (selectedFullDate < startDate) {
        setEndDate(startDate)
        setStartDate(selectedFullDate)
      } else {
        setEndDate(selectedFullDate)
      }
    }
    hapticFeedback('medium')
  }
  
  const formatDate = (date) => {
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`
  }
  
  const handleConfirm = () => {
    if (startDate && endDate) {
      const dateRange = {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      }
      setSelectedDate(dateRange)
      hapticFeedback('success')
      setScreen('generating')
    }
  }
  
  const isDateInRange = (day) => {
    if (!startDate || !day) return false
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    
    if (endDate) {
      return checkDate >= startDate && checkDate <= endDate
    }
    return false
  }
  
  const isDateSelected = (day) => {
    if (!day) return false
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return (startDate && checkDate.getTime() === startDate.getTime()) || 
           (endDate && checkDate.getTime() === endDate.getTime())
  }
  
  const { firstDay, daysInMonth } = getDaysInMonth(currentDate)
  const days = []
  
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  
  return (
    <div className="screen date-selector-screen">
      <h2 className="screen-title">Выберите период</h2>
      <p className="screen-subtitle">Отчёт за период (от и до)</p>
      
      {startDate && (
        <div className="date-range-display">
          <div className="date-range-item">
            <span className="date-label">От:</span>
            <span className="date-value">{formatDate(startDate)}</span>
          </div>
          {endDate && (
            <>
              <HiArrowRight size={20} className="date-arrow" />
              <div className="date-range-item">
                <span className="date-label">До:</span>
                <span className="date-value">{formatDate(endDate)}</span>
              </div>
            </>
          )}
        </div>
      )}
      
      <div className="calendar">
        <div className="calendar-header">
          <button className="nav-btn" onClick={handlePrevMonth}>
            <HiChevronLeft size={24} />
          </button>
          <div className="month-year">
            <HiCalendar size={20} />
            <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          </div>
          <button className="nav-btn" onClick={handleNextMonth}>
            <HiChevronRight size={24} />
          </button>
        </div>
        
        <div className="calendar-weekdays">
          <div className="weekday">Пн</div>
          <div className="weekday">Вт</div>
          <div className="weekday">Ср</div>
          <div className="weekday">Чт</div>
          <div className="weekday">Пт</div>
          <div className="weekday">Сб</div>
          <div className="weekday">Вс</div>
        </div>
        
        <div className="calendar-days">
          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${!day ? 'empty' : ''} ${isDateSelected(day) ? 'selected' : ''} ${isDateInRange(day) ? 'in-range' : ''}`}
              onClick={() => day && handleSelectDay(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="btn btn-primary btn-large" 
        onClick={handleConfirm}
        disabled={!startDate || !endDate}
      >
        Продолжить
      </button>
    </div>
  )
}

export default DateSelectorScreen
