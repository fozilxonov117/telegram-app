import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { reportService } from '../../services/api'
import './SuccessScreen.css'

function SuccessScreen() {
  const { generatedReport, scopeName, periodType, setScreen, reset } = useAppStore()
  const { showPopup, hapticFeedback } = useTelegram()
  
  const formatPeriodType = (type) => {
    const formats = {
      date: '📅 Дата',
      month: '🗓 Месяц',
      quarter: '📆 Квартал',
      year: '📈 Год'
    }
    return formats[type] || type
  }
  
  const handleDownload = () => {
    hapticFeedback('success')
    const downloadUrl = reportService.getDownloadUrl(generatedReport.filename)
    window.open(downloadUrl, '_blank')
    
    showPopup({
      title: 'Скачивание',
      message: 'Файл отчёта начал скачиваться',
      buttons: [{ type: 'ok' }]
    })
  }
  
  const handleNewReport = () => {
    hapticFeedback('light')
    reset()
    setScreen('start')
  }
  
  if (!generatedReport) {
    return null
  }
  
  return (
    <div className="screen success-screen">
      <div className="success-animation">
        <div className="success-checkmark">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="#4CAF50"/>
            <path d="M25 40 L35 50 L55 30" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <h2 className="screen-title">Отчёт готов!</h2>
      <p className="screen-subtitle">Файл успешно сгенерирован</p>
      
      <div className="report-info">
        <div className="report-info-item">
          <span className="report-info-label">Файл:</span>
          <span className="report-info-value">{generatedReport.filename}</span>
        </div>
        <div className="report-info-item">
          <span className="report-info-label">Объект:</span>
          <span className="report-info-value">{scopeName}</span>
        </div>
        <div className="report-info-item">
          <span className="report-info-label">Период:</span>
          <span className="report-info-value">{formatPeriodType(periodType)}</span>
        </div>
        <div className="report-info-item">
          <span className="report-info-label">Статус:</span>
          <span className="report-info-value">✅ Готов</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn btn-primary btn-large" onClick={handleDownload}>
          <span className="btn-icon">📥</span>
          Скачать отчёт
        </button>
        <button className="btn btn-secondary" onClick={handleNewReport}>
          Новый отчёт
        </button>
      </div>
    </div>
  )
}

export default SuccessScreen
