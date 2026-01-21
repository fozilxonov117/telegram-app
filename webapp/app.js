// Telegram WebApp API
const tg = window.Telegram.WebApp;

// Application State
const appState = {
    mode: null,  // 'download' или 'upload'
    scope: null,
    scopeName: null,
    periodType: null,
    detailType: null,
    currentScreen: 'screenStart',
    history: [],
    selectedFile: null,
    generatedReport: null
};

// API Configuration
const API_URL = 'http://127.0.0.1:8000';

// ================= INITIALIZATION =================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Expand WebApp
    tg.expand();
    
    // Apply Telegram theme
    applyTheme();
    
    // Setup file upload
    setupFileUpload();
    
    // Hide loader and show app
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        
        // Show main button if needed
        tg.MainButton.setText('Продолжить');
        tg.MainButton.hide();
    }, 1000);
    
    console.log('App initialized', tg.initDataUnsafe);
}

function applyTheme() {
    // Apply Telegram theme colors
    const root = document.documentElement;
    
    if (tg.themeParams.bg_color) {
        root.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
        root.style.setProperty('--bg-primary', tg.themeParams.bg_color);
    }
    
    if (tg.themeParams.text_color) {
        root.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
        root.style.setProperty('--text-primary', tg.themeParams.text_color);
    }
    
    if (tg.themeParams.button_color) {
        root.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color);
        root.style.setProperty('--primary-color', tg.themeParams.button_color);
    }
    
    if (tg.themeParams.button_text_color) {
        root.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color);
    }
    
    if (tg.themeParams.secondary_bg_color) {
        root.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams.secondary_bg_color);
        root.style.setProperty('--bg-secondary', tg.themeParams.secondary_bg_color);
    }
}

// ================= NAVIGATION =================

function showScreen(screenId, mode = null) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Add to history
        if (appState.currentScreen !== screenId) {
            appState.history.push(appState.currentScreen);
        }
        
        appState.currentScreen = screenId;
        
        // Update header
        updateHeader(screenId);
        
        // Set mode if provided
        if (mode) {
            appState.mode = mode;
        }
        
        // Haptic feedback
        tg.HapticFeedback.impactOccurred('light');
    }
}

function goBack() {
    if (appState.history.length > 0) {
        const previousScreen = appState.history.pop();
        
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        // Show previous screen
        const targetScreen = document.getElementById(previousScreen);
        if (targetScreen) {
            targetScreen.classList.add('active');
            appState.currentScreen = previousScreen;
            
            // Update header
            updateHeader(previousScreen);
            
            // Haptic feedback
            tg.HapticFeedback.impactOccurred('light');
        }
    }
}

function updateHeader(screenId) {
    const headerTitle = document.getElementById('headerTitle');
    const backBtn = document.getElementById('backBtn');
    
    const titles = {
        'screenStart': 'Система отчётности',
        'screenScope': 'Объект отчёта',
        'screenPeriod': 'Период отчёта',
        'screenQuarter': 'Квартальный отчёт',
        'screenYear': 'Годовой отчёт',
        'screenGenerating': 'Генерация',
        'screenSuccess': 'Готово',
        'screenUpload': 'Загрузка отчёта'
    };
    
    headerTitle.textContent = titles[screenId] || 'Система отчётности';
    
    // Show/hide back button
    if (screenId === 'screenStart') {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'flex';
    }
}

// Setup back button handler
document.getElementById('backBtn').addEventListener('click', goBack);

// ================= REPORT GENERATION =================

function selectScope(scope, scopeName) {
    appState.scope = scope;
    appState.scopeName = scopeName;
    
    // Update breadcrumb
    document.getElementById('scopeBreadcrumb').textContent = scopeName;
    
    // Show period screen
    showScreen('screenPeriod');
}

function selectPeriod(periodType, detailType = null) {
    appState.periodType = periodType;
    appState.detailType = detailType;
    
    // Show generating screen
    showScreen('screenGenerating');
    
    // Generate report
    generateReport();
}

async function generateReport() {
    try {
        const progressElement = document.getElementById('generatingProgress');
        progressElement.textContent = 'Подготовка данных...';
        
        // Prepare request
        const requestData = {
            scope: appState.scope,
            period_type: appState.periodType,
            detail_type: appState.detailType,
            scope_name: appState.scopeName
        };
        
        progressElement.textContent = 'Генерация отчёта...';
        
        // Call API
        const response = await fetch(`${API_URL}/api/reports/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            throw new Error('Ошибка генерации отчёта');
        }
        
        const result = await response.json();
        appState.generatedReport = result;
        
        progressElement.textContent = 'Готово!';
        
        // Show success screen
        setTimeout(() => {
            showSuccessScreen(result);
        }, 500);
        
    } catch (error) {
        console.error('Error generating report:', error);
        tg.showAlert('Ошибка при генерации отчёта. Проверьте подключение к серверу.');
        showScreen('screenStart');
    }
}

function showSuccessScreen(reportData) {
    // Update report info
    const reportInfo = document.getElementById('reportInfo');
    reportInfo.innerHTML = `
        <div class="report-info-item">
            <span class="report-info-label">Файл:</span>
            <span class="report-info-value">${reportData.filename}</span>
        </div>
        <div class="report-info-item">
            <span class="report-info-label">Объект:</span>
            <span class="report-info-value">${appState.scopeName}</span>
        </div>
        <div class="report-info-item">
            <span class="report-info-label">Период:</span>
            <span class="report-info-value">${formatPeriodType(appState.periodType)}</span>
        </div>
        <div class="report-info-item">
            <span class="report-info-label">Статус:</span>
            <span class="report-info-value">✅ Готов</span>
        </div>
    `;
    
    // Setup download button
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = () => downloadReport(reportData);
    
    // Show success screen
    showScreen('screenSuccess');
    
    // Haptic success
    tg.HapticFeedback.notificationOccurred('success');
}

function formatPeriodType(periodType) {
    const formats = {
        'date': '📅 Дата',
        'month': '🗓 Месяц',
        'quarter': '📆 Квартал',
        'year': '📈 Год'
    };
    return formats[periodType] || periodType;
}

async function downloadReport(reportData) {
    try {
        // Open download URL
        const downloadUrl = `${API_URL}${reportData.download_url}`;
        window.open(downloadUrl, '_blank');
        
        // Show notification
        tg.showPopup({
            title: 'Скачивание',
            message: 'Файл отчёта начал скачиваться',
            buttons: [{type: 'ok'}]
        });
        
        // Haptic feedback
        tg.HapticFeedback.notificationOccurred('success');
        
    } catch (error) {
        console.error('Error downloading report:', error);
        tg.showAlert('Ошибка при скачивании файла');
    }
}

// ================= FILE UPLOAD =================

function setupFileUpload() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    
    // Click to select file
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File selected
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    });
    
    // Drag and drop (for desktop testing)
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.borderColor = 'var(--primary-color)';
    });
    
    dropArea.addEventListener('dragleave', () => {
        dropArea.style.borderColor = 'var(--border-color)';
    });
    
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.style.borderColor = 'var(--border-color)';
        
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    });
}

function handleFileSelect(file) {
    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        tg.showAlert('Пожалуйста, выберите XLSX или XLS файл');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        tg.showAlert('Файл слишком большой. Максимальный размер: 10 МБ');
        return;
    }
    
    appState.selectedFile = file;
    
    // Show file info
    const uploadedFileInfo = document.getElementById('uploadedFileInfo');
    const dropArea = document.getElementById('dropArea');
    const uploadBtn = document.getElementById('uploadBtn');
    
    uploadedFileInfo.querySelector('.file-info-name').textContent = file.name;
    uploadedFileInfo.querySelector('.file-info-size').textContent = formatFileSize(file.size);
    
    dropArea.style.display = 'none';
    uploadedFileInfo.style.display = 'flex';
    uploadBtn.style.display = 'flex';
    
    // Haptic feedback
    tg.HapticFeedback.impactOccurred('medium');
}

function removeFile() {
    appState.selectedFile = null;
    
    const uploadedFileInfo = document.getElementById('uploadedFileInfo');
    const dropArea = document.getElementById('dropArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    
    fileInput.value = '';
    uploadedFileInfo.style.display = 'none';
    dropArea.style.display = 'block';
    uploadBtn.style.display = 'none';
    
    // Haptic feedback
    tg.HapticFeedback.impactOccurred('light');
}

async function uploadFile() {
    if (!appState.selectedFile) {
        tg.showAlert('Файл не выбран');
        return;
    }
    
    try {
        // Show loader
        document.getElementById('loader').style.display = 'flex';
        
        // Prepare form data
        const formData = new FormData();
        formData.append('file', appState.selectedFile);
        
        // Upload file
        const response = await fetch(`${API_URL}/api/reports/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки файла');
        }
        
        const result = await response.json();
        
        // Hide loader
        document.getElementById('loader').style.display = 'none';
        
        // Show success notification
        tg.showPopup({
            title: 'Успех!',
            message: 'Файл успешно загружен',
            buttons: [{type: 'ok'}]
        });
        
        // Haptic success
        tg.HapticFeedback.notificationOccurred('success');
        
        // Reset and go to start
        removeFile();
        setTimeout(() => {
            showScreen('screenStart');
        }, 1000);
        
    } catch (error) {
        console.error('Error uploading file:', error);
        document.getElementById('loader').style.display = 'none';
        tg.showAlert('Ошибка при загрузке файла. Проверьте подключение к серверу.');
    }
}

// ================= UTILITIES =================

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ================= TELEGRAM EVENTS =================

// Handle back button
tg.BackButton.onClick(() => {
    goBack();
});

// Handle main button (if needed in future)
tg.MainButton.onClick(() => {
    // Custom action
});

// Close confirmation
window.addEventListener('beforeunload', (e) => {
    if (appState.currentScreen !== 'screenStart') {
        e.preventDefault();
        e.returnValue = '';
    }
});

console.log('App.js loaded successfully');
