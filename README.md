# 🚛 ETS2 Dashboard

A modern web dashboard for **Euro Truck Simulator 2** with real-time telemetry and live vehicle data.

The dashboard connects to the **ETS2 Telemetry Server** and displays information from your current drive in a clean, modern interface.

---

## ✨ Features

- 🚛 Real-time truck data
- 📊 Live telemetry
- 🏎️ Speed & RPM
- ⛽ Fuel information
- 🗺️ Trip information
- 📈 Driving statistics
- 💻 Modern responsive web interface
- ⚡ One-click startup with `Start.bat`

---

## 🛠️ Tech Stack

### Dashboard

- React
- TypeScript
- Tailwind CSS
- Vite

### Telemetry

- [ETS2 Telemetry Server](https://github.com/Funbit/ets2-telemetry-server)
- Euro Truck Simulator 2 telemetry data

---

## 📁 Project Structure

```text
ETS2-Dashboard/
│
├── project/              # Web dashboard
│   ├── src/
│   ├── package.json
│   └── ...
│
├── QuickStart.bat        # First-time setup
├── Start.bat             # Start the dashboard
├── .gitignore
└── README.md