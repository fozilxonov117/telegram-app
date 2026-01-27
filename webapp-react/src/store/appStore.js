import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // Navigation
  currentScreen: 'start',
  history: [],
  
  // Report Data
  mode: null,
  reportType: null,
  scope: null,
  scopeName: null,
  periodType: null,
  detailType: null,
  selectedDate: null,
  selectedMonth: null,
  selectedQuarter: null,
  selectedYear: null,
  selectedFile: null,
  generatedReport: null,
  
  // Actions
  setScreen: (screen) => set((state) => ({
    currentScreen: screen,
    history: state.currentScreen !== screen ? [...state.history, state.currentScreen] : state.history
  })),
  
  goBack: () => set((state) => {
    if (state.history.length > 0) {
      const newHistory = [...state.history]
      const previousScreen = newHistory.pop()
      return {
        currentScreen: previousScreen,
        history: newHistory
      }
    }
    return state
  }),
  
  setMode: (mode) => set({ mode }),
  
  setReportType: (reportType) => set({ reportType }),
  
  setScope: (scope, scopeName) => set({ scope, scopeName }),
  
  setPeriod: (periodType, detailType = null) => set({ periodType, detailType }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  
  setSelectedQuarter: (quarter) => set({ selectedQuarter: quarter }),
  
  setSelectedYear: (year) => set({ selectedYear: year }),
  
  setSelectedFile: (file) => set({ selectedFile: file }),
  
  setGeneratedReport: (report) => set({ generatedReport: report }),
  
  reset: () => set({
    currentScreen: 'start',
    history: [],
    mode: null,
    reportType: null,
    scope: null,
    scopeName: null,
    periodType: null,
    detailType: null,
    selectedDate: null,
    selectedMonth: null,
    selectedQuarter: null,
    selectedYear: null,
    selectedFile: null,
    generatedReport: null
  })
}))
