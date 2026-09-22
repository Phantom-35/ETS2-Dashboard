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

## 🌐 CORS Browser Extension

> ⚠️ **Important:** The ETS2 Dashboard requires a CORS browser extension to access telemetry data from the ETS2 Telemetry Server.

During the first-time setup, `QuickStart.bat` will ask which browser you are using:

```text
Chrome
Firefox
Opera
Edge
```

Enter your browser name exactly as shown and press **Enter**. QuickStart will automatically open the appropriate installation page.

### Google Chrome

[Allow CORS: Access-Control-Allow-Origin](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

### Mozilla Firefox

[Allow CORS: Access-Control-Allow-Origin](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/)

### Opera

[CORS Toggle](https://addons.opera.com/de/extensions/details/cors-toggle/)

### Microsoft Edge

[Allow CORS: Access-Control-Allow-Origin](https://microsoftedge.microsoft.com/addons/detail/allow-cors-accesscontro/bhjepjpgngghppolkjdhckmnfphffdag)

After installing the extension, make sure it is **enabled** in your browser.

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
```
