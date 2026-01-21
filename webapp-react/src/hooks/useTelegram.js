import { useEffect, useState } from 'react'

export function useTelegram() {
  const [tg] = useState(() => window.Telegram?.WebApp)
  
  useEffect(() => {
    if (tg) {
      tg.ready()
    }
  }, [tg])
  
  const hapticFeedback = (style = 'light') => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(style)
    }
  }
  
  const showAlert = (message) => {
    if (tg) {
      tg.showAlert(message)
    }
  }
  
  const showPopup = (params) => {
    if (tg) {
      tg.showPopup(params)
    }
  }
  
  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    hapticFeedback,
    showAlert,
    showPopup
  }
}
