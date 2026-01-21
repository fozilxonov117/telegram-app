import { useEffect, useState } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { reportService } from '../../services/api'
import './GeneratingScreen.css'

function GeneratingScreen() {
  const { scope, scopeName, periodType, detailType, setScreen, setGeneratedReport } = useAppStore()
  const { showAlert } = useTelegram()
  const [progress, setProgress] = useState('Подготовка данных...')
  
  useEffect(() => {
    generateReport()
  }, [])
  
  const generateReport = async () => {
    try {
      setProgress('Подготовка данных...')
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setProgress('Генерация отчёта...')
      
      const data = {
        scope,
        period_type: periodType,
        detail_type: detailType,
        scope_name: scopeName
      }
      
      const result = await reportService.generateReport(data)
      setGeneratedReport(result)
      
      setProgress('Готово!')
      
      setTimeout(() => {
        setScreen('success')
      }, 500)
      
    } catch (error) {
      console.error('Error:', error)
      showAlert('Ошибка при генерации отчёта. Проверьте подключение к серверу.')
      setScreen('start')
    }
  }
  
  return (
    <div className="screen generating-screen">
      <div className="generating-animation">
        <div className="generating-spinner"></div>
        <div className="generating-icon">📊</div>
      </div>
      <h2 className="screen-title">Генерация отчёта</h2>
      <p className="screen-subtitle">Пожалуйста, подождите...</p>
      <div className="progress-text">{progress}</div>
    </div>
  )
}

export default GeneratingScreen
