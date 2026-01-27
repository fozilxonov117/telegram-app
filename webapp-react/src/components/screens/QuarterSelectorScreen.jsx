import { useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { HiTrendingUp } from 'react-icons/hi'
import './QuarterSelectorScreen.css'

function QuarterSelectorScreen() {
  const { setScreen, setSelectedQuarter } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const [selectedQ, setSelectedQ] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  
  const quarters = [
    { 
      quarter: 'Q1', 
      name: '1-й квартал',
      months: 'Январь - Март',
      index: 1 
    },
    { 
      quarter: 'Q2', 
      name: '2-й квартал',
      months: 'Апрель - Июнь',
      index: 2 
    },
    { 
      quarter: 'Q3', 
      name: '3-й квартал',
      months: 'Июль - Сентябрь',
      index: 3 
    },
    { 
      quarter: 'Q4', 
      name: '4-й квартал',
      months: 'Октябрь - Декабрь',
      index: 4 
    }
  ]
  
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
  
  const handleSelectQuarter = (quarter) => {
    setSelectedQ(quarter)
    hapticFeedback('medium')
  }
  
  const handleConfirm = () => {
    if (selectedQ) {
      const quarterData = {
        quarter: selectedQ.quarter,
        quarterIndex: selectedQ.index,
        year: selectedYear,
        quarterName: selectedQ.name
      }
      setSelectedQuarter(quarterData)
      hapticFeedback('success')
      setScreen('generating')
    }
  }
  
  return (
    <div className="screen quarter-selector-screen">
      <h2 className="screen-title">Выберите квартал</h2>
      <p className="screen-subtitle">Отчёт за выбранный квартал</p>
      
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
      
      <div className="quarters-grid">
        {quarters.map((q) => (
          <button
            key={q.quarter}
            className={`quarter-card ${selectedQ?.quarter === q.quarter ? 'selected' : ''}`}
            onClick={() => handleSelectQuarter(q)}
          >
            <div className="quarter-icon">
              <HiTrendingUp size={28} />
            </div>
            <div className="quarter-content">
              <h3>{q.quarter}</h3>
              <p className="quarter-name">{q.name}</p>
              <p className="quarter-months">{q.months}</p>
            </div>
          </button>
        ))}
      </div>
      
      <button 
        className="btn btn-primary btn-large" 
        onClick={handleConfirm}
        disabled={!selectedQ}
      >
        Продолжить
      </button>
    </div>
  )
}

export default QuarterSelectorScreen
