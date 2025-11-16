# 🌦️ MooseBroWeather

Modern weather forecast application with **glassmorphism UI**, interactive temperature charts, and smart city search. Built with cutting-edge Vue 3 Composition API and professional architecture patterns.

## 🚀 [Live Demo](https://mikyviz.github.io/MooseBroWeather/)

![Vue](https://img.shields.io/badge/Vue-3.5.13-42b883?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646cff?logo=vite)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.8-ff6384?logo=chartdotjs)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** with backdrop-filter effects
- **Dynamic Backgrounds** that change based on weather conditions
- **Smooth Animations** and transitions throughout
- **Responsive Layout** optimized for mobile, tablet, and desktop
- **Two-Column Layout**: Controls (1/3) + Interactive Chart (2/3)

### 🌍 **Weather Data**
- **Real-time Weather** for any city worldwide
- **5-Day Forecast** with detailed predictions
- **Detailed Metrics**: Temperature, Feels Like, Humidity, Pressure, Wind Speed, Visibility, Cloudiness
- **Sunrise/Sunset Times** with local timezone support
- **Weather Icons** with animated visuals

### 📊 **Interactive Charts**
- **Chart.js Integration** for professional data visualization
- **Temperature History Graph** with 24-hour data points
- **Interactive Tooltips** showing exact values
- **Dual Datasets**: Actual temperature + Feels Like
- **Responsive Scaling** adapts to screen size

### 🔍 **Smart Search**
- **City Autocomplete** powered by OpenWeatherMap Geocoding API
- **Debounced Search** (300ms) for optimal performance
- **Dropdown Suggestions** with country codes
- **Geolocation Support** using browser API

### 🌡️ **Temperature Units**
- **Celsius/Fahrenheit Toggle** with instant conversion
- **Data Refetching** ensures accurate converted values
- **Persistent Unit Selection** throughout session

---

## 🏗️ Architecture

### **Composables Pattern** (Vue 3 Best Practice)
```
src/composables/
├── useWeatherAPI.js       # Weather data state management
├── useGeolocation.js      # Browser geolocation handling
└── useTemperatureUnit.js  # Unit conversion logic
```

### **Service Layer** (API Encapsulation)
```
src/services/
└── weatherService.js      # OpenWeatherMap API singleton
```

### **Component Structure**
```
src/components/
├── CurentDate.vue         # Real-time clock display
├── SearchLocation.vue     # City search with autocomplete
├── MyLocation.vue         # Geolocation button
├── WeatherImg.vue         # Weather icon display
├── WeatherDetails.vue     # Detailed metrics grid
├── TemperatureChart.vue   # Chart.js graph component
└── FiveDayForecast.vue    # 5-day forecast cards
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vue 3** | 3.5.13 | Progressive JavaScript framework with Composition API |
| **Vite** | 6.0.5 | Next-generation frontend build tool |
| **Chart.js** | 4.4.8 | Professional interactive charts |
| **vue-chartjs** | 5.3.2 | Vue wrapper for Chart.js |
| **OpenWeatherMap API** | 2.5 | Weather data provider |
| **Vitest** | 2.1.8 | Unit testing framework |
| **ESLint** | 9.16.0 | Code quality and consistency |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API Key ([Get it free](https://openweathermap.org/api))

### Setup

1. **Clone the repository**
```sh
git clone https://github.com/MikyViz/MooseBroWeather.git
cd MooseBroWeather
```

2. **Install dependencies**
```sh
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_OPENWEATHER_IMG_URL=https://openweathermap.org/img/wn
```

4. **Run development server**
```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Build & Deploy

### Production Build
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

### Deploy to GitHub Pages
This project uses **GitHub Actions** for automated deployment:

1. Push to `bootstrap-free` branch
2. GitHub Actions automatically builds and deploys
3. Live site updates at `https://mikyviz.github.io/MooseBroWeather/`

**Required GitHub Secrets:**
- `VITE_OPENWEATHER_API_KEY`
- `VITE_OPENWEATHER_BASE_URL`
- `VITE_OPENWEATHER_IMG_URL`

---

## 🧪 Testing

### Run Unit Tests
```sh
npm run test:unit
```

### Lint Code
```sh
npm run lint
```

---

## 🎯 API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `/weather` | Current weather data for a city |
| `/forecast` | 5-day weather forecast |
| `/geo/1.0/direct` | City name geocoding for autocomplete |

---

## 📱 Responsive Breakpoints

| Device | Max Width | Layout Changes |
|--------|-----------|----------------|
| **Desktop** | 1400px+ | Full two-column layout |
| **Laptop** | 1024px | Compact two-column |
| **Tablet** | 768px | Single column, stacked |
| **Mobile** | 480px | Mobile-optimized spacing |
| **Small Mobile** | 360px | Minimal spacing |

---

## 🎨 Design Features

- **Glass Effect**: `backdrop-filter: blur(10px)` with transparency
- **Dynamic Gradients**: Weather-based background colors
- **Custom Animations**: Logo pulse, card hover effects
- **Modern Typography**: Clean, readable font hierarchy
- **Color Palette**: Consistent theme with weather-based accents

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👨‍💻 Author

**MikyViz**
- GitHub: [@MikyViz](https://github.com/MikyViz)
- Repository: [MooseBroWeather](https://github.com/MikyViz/MooseBroWeather)

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Chart.js](https://www.chartjs.org/) for interactive charts
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for lightning-fast development

---

## 🔮 Future Enhancements

- [ ] Hourly forecast view
- [ ] Weather alerts and notifications
- [ ] Multiple location comparison
- [ ] Historical weather data
- [ ] Dark/light theme toggle
- [ ] PWA support with offline mode
- [ ] Weather maps integration

---

**Built with ❤️ and ☕ by MikyViz**
