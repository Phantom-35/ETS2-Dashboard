# 🚛 ETS2 Dashboard

A modern web dashboard for **Euro Truck Simulator 2** with real-time telemetry and live vehicle data.

The dashboard connects to an ETS2 telemetry server and displays information from your current drive in a clean, modern interface.

---

## ✨ Features

- 🚛 Real-time truck data
- 📊 Live telemetry
- 🏎️ Speed & RPM
- ⛽ Fuel information
- 🗺️ Trip information
- 📈 Driving statistics
- 💻 Modern web interface
- ⚡ Simple startup with `start.bat`

---

## 🛠️ Tech Stack

### Dashboard

- React
- TypeScript
- Tailwind CSS
- Vite

### Telemetry

- ETS2 Telemetry Server
- Euro Truck Simulator 2 telemetry data

---

## 📁 Project Structure

```text
ETS2-Dashboard/
│
├── bolt/                 # Web dashboard
│   ├── src/
│   ├── package.json
│   └── ...
│
├── telemetry-server/     # ETS2 telemetry server
│   └── ...
│
├── start.bat             # Starts the required services
│
└── README.md
```

---

# 🚀 Getting Started

## Requirements

Before starting the dashboard, make sure you have:

- 🪟 Windows
- 🚛 Euro Truck Simulator 2
- 🟢 Node.js
- 📡 ETS2 Telemetry Server

---

## 1. Clone the repository

```bash
git clone https://github.com/Phantom-35/ETS2-Dashboard.git
cd ETS2-Dashboard
```

---

## 2. Install dependencies

Navigate into the dashboard folder:

```bash
cd bolt
```

Then install the required packages:

```bash
npm install
```

After the installation is complete, go back to the main project folder:

```bash
cd ..
```

---

## 3. Start the project

The easiest way to start everything is to use the included startup script:

```text
start.bat
```

Simply double-click `start.bat`.

The script is intended to start the required services for the dashboard.

---

## 4. Start Euro Truck Simulator 2

After the required services are running:

1. Start **Euro Truck Simulator 2**
2. Load your profile
3. Start a drive
4. Open the dashboard
5. Your live telemetry data should appear automatically

---

# 📡 Telemetry Server

The dashboard requires an **ETS2 telemetry server** to receive live data from the game.

The telemetry server provides information such as:

- Vehicle speed
- Engine RPM
- Fuel
- Position
- Distance
- Current trip data
- Truck information

The dashboard communicates with the telemetry server through its API.

> Make sure the telemetry server is running before using the dashboard.

---

# ⚙️ Configuration

The dashboard needs to know where the telemetry server is running.

Depending on your setup, this may look similar to:

```text
http://localhost:25555
```

or:

```text
http://192.168.x.x:25555
```

If your telemetry server uses another address or port, update the corresponding configuration in the dashboard.

---

# 🖥️ Development

To run the dashboard manually during development:

```bash
cd bolt
npm install
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

---

# 🗺️ Roadmap

Planned features include:

- [ ] More live telemetry
- [ ] Detailed trip statistics
- [ ] Trip history
- [ ] Fuel consumption statistics
- [ ] Driving analytics
- [ ] More truck information
- [ ] Custom dashboard layouts
- [ ] Improved mobile support

---

# 🤝 Contributing

Suggestions, bug reports and improvements are welcome.

If you find a problem or have an idea for a new feature, feel free to open an **Issue** or create a **Pull Request**.

---

# 📜 License

This project is currently intended for personal and educational use.

Check the licenses of all third-party software and telemetry components before redistributing them.

---

<p align="center">
  Built with 💻, 🚛 and a lot of debugging.
</p>
