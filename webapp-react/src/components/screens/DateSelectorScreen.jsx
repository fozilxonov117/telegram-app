import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import './DateSelectorScreen.css'

function DateSelectorScreen() {
  const { setScreen, setSelectedDate, periodType } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  
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
    setSelectedDay(day)
    hapticFeedback('medium')
  }
  
  const handleConfirm = () => {
    if (selectedDay) {
      const dateStr = `${selectedDay}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${currentDate.getFullYear()}`
      setSelectedDate(dateStr)
      hapticFeedback('success')
      setScreen('generating')
    }
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
      <h2 className="screen-title">Выберите дату</h2>
      <p className="screen-subtitle">Отчёт за конкретную дату</p>
      
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
              className={`calendar-day ${!day ? 'empty' : ''} ${day === selectedDay ? 'selected' : ''}`}
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
        disabled={!selectedDay}
      >
        Продолжить
      </button>
    </div>
  )
}

export default DateSelectorScreen
