import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import './ScopeScreen.css'

function ScopeScreen() {
  const { setScreen, setScope } = useAppStore()
  const { hapticFeedback } = useTelegram()
  
  const handleSelect = (scope, scopeName) => {
    hapticFeedback('light')
    setScope(scope, scopeName)
    setScreen('period')
  }
  
  return (
    <div className="screen scope-screen">
      <div className="info-badge">
        <span className="badge-icon">📊</span>
        <span>Стандартный отчёт</span>
      </div>
      
      <h2 className="screen-title">Выберите объект отчёта</h2>
      
      <div className="option-cards">
        <button className="option-card" onClick={() => handleSelect('slujba', '🏢 Служба')}>
          <div className="option-icon">🏢</div>
          <div className="option-content">
            <h3>Служба</h3>
            <p>Отчёт по службе</p>
          </div>
          <div className="option-check"></div>
        </button>
        
        <button className="option-card" onClick={() => handleSelect('group', '👥 Группа')}>
          <div className="option-icon">👥</div>
          <div className="option-content">
            <h3>Группа</h3>
            <p>Отчёт по группе</p>
          </div>
          <div className="option-check"></div>
        </button>
      </div>
    </div>
  )
}

export default ScopeScreen
