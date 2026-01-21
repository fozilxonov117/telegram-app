import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const reportService = {
  async generateReport(data) {
    try {
      const response = await api.post('/api/reports/generate', data)
      return response.data
    } catch (error) {
      console.error('Error generating report:', error)
      throw error
    }
  },
  
  async uploadReport(file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await api.post('/api/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading report:', error)
      throw error
    }
  },
  
  getDownloadUrl(filename) {
    return `${API_URL}/api/reports/download/${filename}`
  }
}
