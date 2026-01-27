import { useState, useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useAppStore } from './store/appStore'
import Header from './components/Header'
import StartScreen from './components/screens/StartScreen'
import ReportTypeScreen from './components/screens/ReportTypeScreen'
import ScopeScreen from './components/screens/ScopeScreen'
import PeriodScreen from './components/screens/PeriodScreen'
import DateSelectorScreen from './components/screens/DateSelectorScreen'
import MonthSelectorScreen from './components/screens/MonthSelectorScreen'
import QuarterSelectorScreen from './components/screens/QuarterSelectorScreen'
import YearSelectorScreen from './components/screens/YearSelectorScreen'
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
    
    // Apply Telegram theme
    const applyTheme = () => {
      const isDark = tg.colorScheme === 'dark'
      document.body.classList.toggle('dark-theme', isDark)
      
      // Apply Telegram theme colors
      if (tg.themeParams.bg_color) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color)
      }
      if (tg.themeParams.text_color) {
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color)
      }
      if (tg.themeParams.button_color) {
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color)
        document.documentElement.style.setProperty('--primary-color', tg.themeParams.button_color)
      }
      if (tg.themeParams.secondary_bg_color) {
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color)
      }
    }
    
    applyTheme()
    
    // Listen for theme changes
    tg.onEvent('themeChanged', applyTheme)
    
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
      tg.offEvent('themeChanged', applyTheme)
    }
  }, [tg, history, goBack])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen />
      case 'reportType':
        return <ReportTypeScreen />
      case 'scope':
        return <ScopeScreen />
      case 'period':
        return <PeriodScreen />
      case 'dateSelector':
        return <DateSelectorScreen />
      case 'monthSelector':
        return <MonthSelectorScreen />
      case 'quarterSelector':
        return <QuarterSelectorScreen />
      case 'yearSelector':
        return <YearSelectorScreen />
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
