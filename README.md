# TruEstate Assignment

Full-stack sales analytics dashboard built for the TruEstate assignment.

- Backend: Node.js + Express + MongoDB (with CSV import support)
- Frontend: React + Vite (table, search, filters, sorting, pagination)
- Data: Large `sales.csv` file kept locally (not pushed to GitHub)

---

## 🔧 Tech Stack

**Backend**

- Node.js, Express.js
- MongoDB (Atlas or local)
- Mongoose
- CSV parsing (csv-parser)
- Dotenv, CORS

**Frontend**

- React
- Vite
- JavaScript (ES Modules)
- PapaParse (for CSV mode)
- Custom CSS

---

## 📁 Project Structure

```text
TruEstate-Assesment/
├── truestate-assignment/
│   ├── backend/
│   │   ├── data/                 # sales.csv (ignored in git)
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── routes/
│   │   │   ├── models/
│   │   │   ├── utils/
│   │   │   └── index.js          # backend entry
│   │   ├── .env
│   │   ├── package.json
│   │   └── README.md (optional)
│   │
│   └── frontend/
│       ├── public/
│       │   └── sales.csv         # optional CSV for direct frontend loading
│       ├── src/
│       │   ├── components/       # SearchBar, FilterPanel, Table, Pagination, etc.
│       │   ├── hooks/            # useSalesQuery
│       │   ├── services/         # api.js
│       │   ├── styles/           # global.css
│       │   ├── utils/            # format helpers
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── index.html
│       ├── vite.config.js
│       ├── package.json
│       └── README.md (optional)
│
└── .gitignore
