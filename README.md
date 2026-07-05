# 🚀 FMCG AI Agent

A practical AI-powered business intelligence assistant for FMCG sales analytics. The system allows business users to ask natural language questions about sales, promotions, inventory, and regional performance using a Large Language Model integrated with real business datasets.

---

## 📌 Project Overview

The FMCG AI Agent is designed to simulate an enterprise Business Intelligence assistant capable of answering business questions such as:

- Which region generated the highest sales?
- Did promotions increase revenue?
- Which products performed best?
- How did inventory levels impact sales?
- Which SKUs should receive additional attention?

Instead of relying on static dashboards, users interact using natural language and receive data-driven business insights.

---

## ✨ Features

- ✅ Natural language business analytics
- ✅ Sales performance analysis
- ✅ Promotion effectiveness evaluation
- ✅ Regional comparison analytics
- ✅ Inventory and stock analysis
- ✅ SKU performance reporting
- ✅ Server-side AI orchestration
- ✅ Structured business recommendations
- ✅ Secure API key handling

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | TanStack Start |
| Language | TypeScript |
| AI Model | Groq API |
| Validation | Zod |
| Runtime | Bun |
| Architecture | Server-side AI Gateway |

---

## 🏗️ Project Architecture

```text
                   User
                     │
                     ▼
            TanStack Frontend
                     │
                     ▼
             agent.functions.ts
                     │
                     ▼
            ai-gateway.server.ts
                     │
                     ▼
                  Groq API
                     │
                     ▼
             FMCG Dataset Engine
                     │
                     ▼
              Business Insights
```

---

## 📊 Dataset

The project uses a structured FMCG beverage dataset containing:

- Weekly sales data
- Product SKU information
- Regional performance metrics
- Promotional campaign information
- Inventory statistics
- Stock efficiency indicators

### Regions

- North
- South
- East
- West

### Analysis Categories

- Sales
- Promotions
- Inventory
- Regional Performance
- Product Performance

---

## 💬 Example Questions

### Sales Analysis

```
Which region generated the highest sales?
```

### Promotion Analysis

```
Did promotions improve revenue?
```

### Regional Comparison

```
Compare North and South region performance.
```

### Product Performance

```
Which SKU generated the highest revenue?
```

### Inventory Analysis

```
Which products experienced stock shortages?
```

---

## 📷 Screenshots

### Main Interface

(Add screenshot)

### Sales Analysis

(Add screenshot)

### Promotion Analysis

(Add screenshot)

### Regional Comparison

(Add screenshot)

---

## 📁 Project Structure

```text
fmcg-ai-agent
│
├── routes/
│
├── src/
│   └── lib/
│       ├── agent.functions.ts
│       └── ai-gateway.server.ts
│
├── README.md
├── bun.lock
├── bunfig.toml
└── .gitignore
```

---

## 🔐 Security

- API keys are handled through environment variables.
- No secrets are stored in the repository.
- Server-side API orchestration prevents client-side exposure.

---

## 🚀 Installation

```bash
git clone https://github.com/Yash-Warrior-sys/fmcg-ai-agent.git

cd fmcg-ai-agent

bun install

bun dev
```

---

## 🔮 Future Improvements

- Multi-agent architecture
- Sales forecasting
- Dashboard visualizations
- Retrieval-Augmented Generation (RAG)
- Automated reporting
- Performance monitoring

---

## 👨‍💻 Author

**Yash**

Engineering Student | AI & Data Analytics Enthusiast

---

## ⭐ Project Goal

This project demonstrates practical implementation of:

- Artificial Intelligence
- Business Intelligence
- Large Language Models
- TypeScript Development
- API Integration
- Data Analytics
- Enterprise Software Architecture
