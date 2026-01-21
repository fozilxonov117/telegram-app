import { useState, useRef } from 'react'
import { useAppStore } from '../../store/appStore'
import { useTelegram } from '../../hooks/useTelegram'
import { reportService } from '../../services/api'
import './UploadScreen.css'

function UploadScreen() {
  const { selectedFile, setSelectedFile, setScreen, reset } = useAppStore()
  const { showAlert, showPopup, hapticFeedback } = useTelegram()
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    
    if (!file) return
    
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      showAlert('Пожалуйста, выберите XLSX или XLS файл')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      showAlert('Файл слишком большой. Максимальный размер: 10 МБ')
      return
    }
    
    setSelectedFile(file)
    hapticFeedback('medium')
  }
  
  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    hapticFeedback('light')
  }
  
  const handleUpload = async () => {
    if (!selectedFile) {
      showAlert('Файл не выбран')
      return
    }
    
    try {
      setUploading(true)
      
      await reportService.uploadReport(selectedFile)
      
      showPopup({
        title: 'Успех!',
        message: 'Файл успешно загружен',
        buttons: [{ type: 'ok' }]
      })
      
      hapticFeedback('success')
      
      handleRemoveFile()
      setTimeout(() => {
        reset()
        setScreen('start')
      }, 1000)
      
    } catch (error) {
      console.error('Upload error:', error)
      showAlert('Ошибка при загрузке файла. Проверьте подключение к серверу.')
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <div className="screen upload-screen">
      <div className="upload-section">
        <div className="upload-icon">📤</div>
        <h2 className="screen-title">Загрузка отчёта</h2>
        <p className="screen-subtitle">Выберите XLSX файл для загрузки</p>
        
        {!selectedFile ? (
          <div className="file-upload-area" onClick={() => fileInputRef.current?.click()}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <div className="upload-placeholder">
              <div className="upload-placeholder-icon">📄</div>
              <p>Нажмите для выбора файла</p>
              <span className="upload-hint">Поддерживаются: XLSX, XLS</span>
            </div>
          </div>
        ) : (
          <>
            <div className="uploaded-file-info">
              <div className="file-info-icon">📄</div>
              <div className="file-info-content">
                <div className="file-info-name">{selectedFile.name}</div>
                <div className="file-info-size">{formatFileSize(selectedFile.size)}</div>
              </div>
              <button className="file-remove-btn" onClick={handleRemoveFile}>✕</button>
            </div>
            
            <button 
              className="btn btn-primary btn-large" 
              onClick={handleUpload}
              disabled={uploading}
            >
              <span className="btn-icon">📤</span>
              {uploading ? 'Загрузка...' : 'Загрузить файл'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UploadScreen
