# 🥷 Kunai API

## 🛠️ Main Features

* **⚡ Professional Architecture:** Modular structure (Controllers, Routes, Services, Utils) following scalable design patterns.
* **🔒 Advanced Security:** Authentication via `X-API-KEY` for all endpoints.
* **💎 Special Track (N1NJ4):** NFT ownership verification (`requirePremium` middleware) to access sensitive data.
* **📊 Real-Time Analytics:** Monitoring of Requests Per Second (RPS) and top endpoints in memory.
* **🧪 Test Coverage:** Robust unit tests using Jest and Supertest.

## 🚀 Installation and Execution

### Prerequisites
* Node.js (v16+)
* npm

### Steps
1. **Clone the repository:**
```bash
git clone https://github.com/ManyRios/kunai-api
cd kunai-api
```
2. **Install dependencies:**
```bash
npm install
```
3. **Run in development mode:**
```bash
npm run dev
# Or using ts-node directly:
npx ts-node src/app.ts
```
## 🧪 Unit Testing

To run the unit test suite and ensure code integrity:

```bash
npm run test
