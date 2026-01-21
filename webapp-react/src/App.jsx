import { useState, useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useAppStore } from './store/appStore'
import Header from './components/Header'
import StartScreen from './components/screens/StartScreen'
import ScopeScreen from './components/screens/ScopeScreen'
import PeriodScreen from './components/screens/PeriodScreen'
import QuarterScreen from './components/screens/QuarterScreen'
import YearScreen from './components/screens/YearScreen'
import GeneratingScreen from './components/screens/GeneratingScreen'
import SuccessScreen from './components/screens/SuccessScreen'
import UploadScreen from './components/screens/UploadScreen'
import Loader from './components/Loader'
import './styles/App.css'

function App() {
  const { tg, user } = useTelegram()
  const { currentScreen, history, goBack } = useAppStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Telegram WebApp
    tg.ready()
    tg.expand()
    
    // Apply theme colors
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff')
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000')
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2481cc')
    
    // Setup back button
    if (history.length > 0) {
      tg.BackButton.show()
      tg.BackButton.onClick(goBack)
    } else {
      tg.BackButton.hide()
    }
    
    setTimeout(() => setLoading(false), 1000)
    
    return () => {
      tg.BackButton.offClick(goBack)
    }
  }, [tg, history, goBack])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen />
      case 'scope':
        return <ScopeScreen />
      case 'period':
        return <PeriodScreen />
      case 'quarter':
        return <QuarterScreen />
      case 'year':
        return <YearScreen />
      case 'generating':
        return <GeneratingScreen />
      case 'success':
        return <SuccessScreen />
      case 'upload':
        return <UploadScreen />
      default:
        return <StartScreen />
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="app">
      <Header />
      <main className="content">
        {renderScreen()}
      </main>
      <footer className="footer">
        <div className="footer-text">Система отчётности v1.0</div>
      </footer>
    </div>
  )
}

export default App
