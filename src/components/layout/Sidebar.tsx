import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Language } from '../../types';

const translations: Record<
  Language,
  {
    dashboard: string;
    tenders: string;
    contracts: string;
    payments: string;
    alerts: string;
    settings: string;
  }
> = {
  fr: {
    dashboard: 'Tableau de bord',
    tenders: "Appels d'offres",
    contracts: 'Contrats',
    payments: 'Paiements',
    alerts: 'Alertes',
    settings: 'Paramètres',
  },
  ar: {
    dashboard: 'لوحة القيادة',
    tenders: 'طلبات العروض',
    contracts: 'العقود',
    payments: 'المدفوعات',
    alerts: 'التنبيهات',
    settings: 'الإعدادات',
  },
};

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const { language, currentView, setCurrentView, unreadAlertsCount } = useApp();
  const t = translations[language];

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: t.dashboard,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: 'tenders',
      label: t.tenders,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 'contracts',
      label: t.contracts,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      id: 'payments',
      label: t.payments,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 'alerts',
      label: t.alerts,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full sidebar-item ${currentView === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {item.id === 'alerts' && unreadAlertsCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadAlertsCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
          {language === 'ar' ? 'إحصائيات سريعة' : 'Statistiques rapides'}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{language === 'ar' ? 'طلبات عروض نشطة' : 'AO actifs'}</span>
            <span className="font-medium text-gray-900">3</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>
              {language === 'ar' ? 'عقود قيد التنفيذ' : 'Contrats en cours'}
            </span>
            <span className="font-medium text-gray-900">2</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>
              {language === 'ar' ? 'مدفوعات معلقة' : 'Paiements en attente'}
            </span>
            <span className="font-medium text-gray-900">2</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
