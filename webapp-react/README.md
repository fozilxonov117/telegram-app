# 📊 Telegram Report WebApp - React Version

Modern React-based Telegram Mini App for report management system.

## 🚀 Tech Stack

- **React 18.3** - UI library
- **Vite 5** - Fast build tool  
- **Zustand** - State management
- **Axios** - HTTP client
- **Telegram WebApp API** - Integration
- **CSS Modules** - Styling

## 📁 Project Structure

```
webapp-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   └── screens/
│   │       ├── StartScreen.jsx
│   │       ├── ScopeScreen.jsx
│   │       ├── PeriodScreen.jsx
│   │       ├── QuarterScreen.jsx
│   │       ├── YearScreen.jsx
│   │       ├── GeneratingScreen.jsx
│   │       ├── SuccessScreen.jsx
│   │       └── UploadScreen.jsx
│   ├── hooks/
│   │   └── useTelegram.js
│   ├── services/
│   │   └── api.js
│   ├── store/
│   │   └── appStore.js
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠 Installation

### 1. Install Dependencies

```bash
cd webapp-react
npm install
```

### 2. Configure API URL

Edit `src/services/api.js`:
```javascript
const API_URL = 'http://your-backend-url.com'
```

## 🚀 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Option 1: Vercel

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Option 3: GitHub Pages

```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 🔧 Features

- ✅ **Modern React Architecture** - Hooks, functional components
- ✅ **State Management** - Zustand for global state
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Telegram Theme** - Auto-adapts to user's theme
- ✅ **Haptic Feedback** - Native feel
- ✅ **File Upload** - Drag & drop support
- ✅ **Animations** - Smooth transitions
- ✅ **API Integration** - Axios with error handling
- ✅ **Type Safety Ready** - Easy to add TypeScript

## 🎨 Components

### Screens
- `StartScreen` - Main menu
- `ScopeScreen` - Select report scope
- `PeriodScreen` - Select period
- `QuarterScreen` - Quarter details
- `YearScreen` - Year details
- `GeneratingScreen` - Loading state
- `SuccessScreen` - Download success
- `UploadScreen` - File upload

### Hooks
- `useTelegram` - Telegram WebApp utilities

### Store
- `appStore` - Global state management with Zustand

## 🌐 Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## 📝 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License

---

Made with ❤️ using React + Vite
