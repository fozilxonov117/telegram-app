import { useAppStore } from '../store/appStore'
import './Header.css'

function Header() {
  const { currentScreen, goBack, history } = useAppStore()
  
  const titles = {
    start: 'Система отчётности',
    scope: 'Объект отчёта',
    period: 'Период отчёта',
    quarter: 'Квартальный отчёт',
    year: 'Годовой отчёт',
    generating: 'Генерация',
    success: 'Готово',
    upload: 'Загрузка отчёта'
  }
  
  return (
    <header className="header">
      {history.length > 0 && (
        <button className="back-btn" onClick={goBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <h1 className="header-title">{titles[currentScreen] || 'Система отчётности'}</h1>
      {history.length > 0 && <div className="header-spacer" />}
    </header>
  )
}

export default Header
