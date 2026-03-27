# ASMA Chatbot Prototype

A functional prototype of the ASMA (Agadir Souss Massa Aménagement) conversational agent for managing public procurement processes.

## 🎯 Overview

This prototype demonstrates the core functionalities of the ASMA chatbot system without requiring real APIs, databases, or LLM services. It uses:
- **JSON files** as mock data storage
- **Rule-based chatbot** with intent matching
- **Interactive React frontend** with bilingual support
- **In-memory state** (no persistence required)

## ✨ Features

### Core Modules

| Module | Description |
|--------|-------------|
| **Dashboard** | Overview with statistics, budget engagement, and recent activity |
| **Tender Management** | List and verify Appels d'Offres (AO) with checklist validation |
| **Contract Management** | Track contracts and service orders |
| **Payment Processing** | Monitor payment status and document completeness |
| **Alert Center** | View and manage notifications and reminders |

### Chatbot Features

- 💬 **Rule-based conversation** - Pattern matching for intents
- 🌐 **Bilingual support** - French and Arabic
- 🔗 **Navigation integration** - Chat can navigate to different views
- ⚡ **Quick actions** - Pre-defined commands for common tasks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to prototype directory
cd asma-prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3005/asma-prototype/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🏗️ Project Structure

```
asma-prototype/
├── src/
│   ├── components/
│   │   ├── chatbot/
│   │   │   └── ChatWidget.tsx       # Floating chat interface
│   │   ├── layout/
│   │   │   ├── Header.tsx           # App header with language toggle
│   │   │   └── Sidebar.tsx          # Navigation sidebar
│   │   └── views/
│   │       ├── Dashboard.tsx        # Main dashboard
│   │       ├── TenderList.tsx       # Tender listing
│   │       ├── TenderDetail.tsx     # Tender verification checklist
│   │       ├── ContractList.tsx     # Contract listing
│   │       ├── PaymentList.tsx      # Payment listing
│   │       └── AlertCenter.tsx      # Alert management
│   ├── context/
│   │   └── AppContext.tsx           # Global state management
│   ├── data/
│   │   ├── tenders.json             # Mock tender data
│   │   ├── contracts.json           # Mock contract data
│   │   ├── payments.json            # Mock payment data
│   │   ├── alerts.json              # Mock alert data
│   │   └── chatbot-responses.json   # Chatbot intent patterns
│   ├── services/
│   │   └── chatbotService.ts        # Intent matching logic
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── App.tsx                      # Main application
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── package.json
```

## 💬 Chatbot Commands

The chatbot understands the following commands (in French or Arabic):

| Command (FR) | Command (AR) | Action |
|--------------|--------------|--------|
| Appels d'offres | طلبات العروض | Navigate to tender list |
| Contrats | العقود | Navigate to contract list |
| Paiements | المدفوعات | Navigate to payment list |
| Alertes | التنبيهات | Navigate to alert center |
| Aide | مساعدة | Show help message |
| Vérifier AO-XXX | التحقق من AO-XXX | Open tender verification |

## 🎨 Key Workflows Demonstrated

### 1. Tender Verification (Primary Focus)

1. Navigate to **Appels d'offres** from sidebar
2. Click on a tender to view details
3. Review the **Verification Checklist**:
   - ✅ Present in provisional program
   - ✅ Budget available
   - ✅ DCE complete
   - ✅ No duplicate number
   - ✅ Object matches
   - ✅ Deposit rate valid (≤ 2%)
   - ✅ Publication dates valid
   - ✅ Site visit scheduled
4. Check **DCE Documents** status (RC, CPS, BDDE, etc.)
5. View associated **Alerts**

### 2. Using the Chatbot

1. Click the chat bubble (bottom-right corner)
2. Type a command like "Appels d'offres"
3. The chatbot will respond and navigate to the requested view
4. Use quick action buttons for common commands

### 3. Language Switching

1. Click the language toggle in the header
2. The entire UI switches between French and Arabic
3. RTL layout is automatically applied for Arabic

## 📊 Mock Data

The prototype includes realistic mock data:

- **4 Tenders** (AO-2026-001 to AO-2026-004)
- **3 Contracts** (M-2026-001 to M-2026-003)
- **3 Payments** (P-2026-001 to P-2026-003)
- **7 Alerts** of various types and severities

## 🔧 Technology Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| React Context | State management |

## 🌐 Deployment

### GitHub Pages

The prototype is configured for GitHub Pages deployment:

1. Update `vite.config.ts` with your repository name
2. Build and deploy:
   ```bash
   npm run build
   # Deploy the dist/ folder
   ```

### Local Demo

Simply run `npm run dev` and share the localhost URL for local demonstrations.

## 📝 Notes

- **No persistence**: All data is stored in memory and resets on page refresh
- **No real API**: All data comes from JSON files
- **No real LLM**: Chatbot uses pattern matching, not AI
- **Prototype only**: This is for demonstration purposes

## 📄 Related Documentation

- [Solution Proposal](../plans/solution-proposal.md)
- [User Stories](../plans/user-stories.md)
- [Execution Plan](../plans/execution-plan.md)
- [Prototype Proposal](../plans/prototype-proposal.md)

## 📜 License

This prototype is for demonstration purposes for ASMA (Agadir Souss Massa Aménagement).

---

*Built with ❤️ for ASMA*
