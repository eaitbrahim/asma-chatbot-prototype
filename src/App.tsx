import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ChatWidget } from './components/chatbot/ChatWidget';
import { Dashboard } from './components/views/Dashboard';
import { TenderList } from './components/views/TenderList';
import { TenderDetail } from './components/views/TenderDetail';
import { ContractList } from './components/views/ContractList';
import { PaymentList } from './components/views/PaymentList';
import { AlertCenter } from './components/views/AlertCenter';
import { LegalReferences } from './components/views/LegalReferences';

function AppContent() {
  const { language, currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tenders':
        return <TenderList />;
      case 'tender-detail':
        return <TenderDetail />;
      case 'contracts':
        return <ContractList />;
      case 'payments':
        return <PaymentList />;
      case 'alerts':
        return <AlertCenter />;
      case 'legal':
        return <LegalReferences />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Header />
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{renderView()}</main>
      </div>
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
