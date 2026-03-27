import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Language, Alert, ChatMessage } from '../types';
import alertsData from '../data/alerts.json';
import { processMessage } from '../services/chatbotService';

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  // Navigation
  currentView: string;
  setCurrentView: (view: string) => void;

  // Selections
  selectedTenderId: string | null;
  setSelectedTenderId: (id: string | null) => void;
  selectedContractId: string | null;
  setSelectedContractId: (id: string | null) => void;
  selectedPaymentId: string | null;
  setSelectedPaymentId: (id: string | null) => void;

  // Alerts
  alerts: Alert[];
  unreadAlertsCount: number;
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;

  // Chat
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendMessage: (text: string) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Language state
  const [language, setLanguage] = useState<Language>('fr');

  // Navigation state
  const [currentView, setCurrentView] = useState('dashboard');

  // Selection state
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null,
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  // Alerts state
  const [alerts, setAlerts] = useState<Alert[]>(alertsData.alerts as Alert[]);

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text:
        language === 'ar'
          ? 'مرحباً! أنا مساعد ASMA. كيف يمكنني مساعدتك؟'
          : "Bonjour! Je suis l'assistant ASMA. Comment puis-je vous aider?",
      timestamp: new Date(),
    },
  ]);

  // Toggle language
  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  }, []);

  // Alert actions
  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const markAlertAsRead = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)),
    );
  }, []);

  const markAllAlertsAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  }, []);

  // Chat actions
  const sendMessage = useCallback(
    (text: string) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, userMessage]);

      // Process and add bot response
      const response = processMessage(text, language);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        action: response.action,
        data: response.data,
      };

      // Handle navigation actions
      if (response.action) {
        switch (response.action) {
          case 'showTenders':
            setCurrentView('tenders');
            break;
          case 'showContracts':
            setCurrentView('contracts');
            break;
          case 'showPayments':
            setCurrentView('payments');
            break;
          case 'showAlerts':
            setCurrentView('alerts');
            break;
          case 'showDashboard':
            setCurrentView('dashboard');
            break;
          case 'showLegal':
            setCurrentView('legal');
            break;
          case 'showTenderVerification':
            if (
              response.data &&
              typeof response.data === 'object' &&
              'tenderId' in response.data &&
              response.data.tenderId
            ) {
              setSelectedTenderId(response.data.tenderId as string);
              setCurrentView('tender-detail');
            }
            break;
        }
      }

      setTimeout(() => {
        setChatMessages((prev) => [...prev, botMessage]);
      }, 500);
    },
    [language],
  );

  const clearChat = useCallback(() => {
    setChatMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text:
          language === 'ar'
            ? 'مرحباً! أنا مساعد ASMA. كيف يمكنني مساعدتك؟'
            : "Bonjour! Je suis l'assistant ASMA. Comment puis-je vous aider?",
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  const value: AppContextType = {
    language,
    setLanguage,
    toggleLanguage,
    currentView,
    setCurrentView,
    selectedTenderId,
    setSelectedTenderId,
    selectedContractId,
    setSelectedContractId,
    selectedPaymentId,
    setSelectedPaymentId,
    alerts,
    unreadAlertsCount,
    markAlertAsRead,
    markAllAlertsAsRead,
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendMessage,
    clearChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
