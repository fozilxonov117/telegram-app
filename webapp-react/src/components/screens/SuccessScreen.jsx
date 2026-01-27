import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { reportService } from '../../services/api'
import { HiCheckCircle, HiDownload, HiCalendar, HiOfficeBuilding } from 'react-icons/hi'
import './SuccessScreen.css'

function SuccessScreen() {
  const { generatedReport, scopeName, periodType, setScreen, reset } = useAppStore()
  const { showPopup, hapticFeedback } = useTelegram()
  
  const formatPeriodType = (type) => {
    const formats = {
      date: 'Дата',
      month: 'Месяц',
      quarter: 'Квартал',
      year: 'Год'
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
          <HiCheckCircle size={80} color="#4CAF50" />
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
          <span className="report-info-label">
            <HiOfficeBuilding size={16} style={{marginRight: '4px'}} />
            Объект:
          </span>
          <span className="report-info-value">{scopeName}</span>
        </div>
        <div className="report-info-item">
          <span className="report-info-label">
            <HiCalendar size={16} style={{marginRight: '4px'}} />
            Период:
          </span>
          <span className="report-info-value">{formatPeriodType(periodType)}</span>
        </div>
        <div className="report-info-item">
          <span className="report-info-label">Статус:</span>
          <span className="report-info-value">
            <HiCheckCircle size={16} color="#4CAF50" style={{marginRight: '4px'}} />
            Готов
          </span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn btn-primary btn-large" onClick={handleDownload}>
          <HiDownload size={20} />
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
