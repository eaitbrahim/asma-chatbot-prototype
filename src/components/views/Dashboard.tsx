import { useApp } from '../../context/AppContext';
import type { Language } from '../../types';

const translations: Record<
  Language,
  {
    title: string;
    activeTenders: string;
    activeContracts: string;
    pendingPayments: string;
    activeAlerts: string;
    budgetEngagement: string;
    recentActivity: string;
    tenderVerified: string;
    osSigned: string;
    budgetWarning: string;
  }
> = {
  fr: {
    title: 'Tableau de bord',
    activeTenders: "Appels d'offres actifs",
    activeContracts: 'Contrats en cours',
    pendingPayments: 'Paiements en attente',
    activeAlerts: 'Alertes actives',
    budgetEngagement: "Taux d'engagement",
    recentActivity: 'Activité récente',
    tenderVerified: 'Vérification complétée',
    osSigned: 'OS de démarrage signé',
    budgetWarning: "Alerte budget: 80% d'engagement",
  },
  ar: {
    title: 'لوحة القيادة',
    activeTenders: 'طلبات عروض نشطة',
    activeContracts: 'عقود قيد التنفيذ',
    pendingPayments: 'مدفوعات معلقة',
    activeAlerts: 'تنبيهات نشطة',
    budgetEngagement: 'معدل الالتزام',
    recentActivity: 'النشاط الأخير',
    tenderVerified: 'تم التحقق',
    osSigned: 'تم توقيع أمر الخدمة',
    budgetWarning: 'تنبيه الميزانية: 80% التزام',
  },
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && <p className="text-xs text-gray-400 mt-1">{trend}</p>}
        </div>
        <div
          className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { language, setCurrentView } = useApp();
  const t = translations[language];

  const stats = [
    {
      title: t.activeTenders,
      value: 3,
      color: 'bg-blue-100',
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
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
      title: t.activeContracts,
      value: 2,
      color: 'bg-green-100',
      icon: (
        <svg
          className="w-6 h-6 text-green-600"
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
      title: t.pendingPayments,
      value: 2,
      color: 'bg-yellow-100',
      icon: (
        <svg
          className="w-6 h-6 text-yellow-600"
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
      title: t.activeAlerts,
      value: 5,
      color: 'bg-red-100',
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
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

  const activities = [
    {
      id: 1,
      type: 'tender',
      text: 'AO-2026-001: ' + t.tenderVerified,
      time: '2h',
      icon: '📋',
    },
    {
      id: 2,
      type: 'contract',
      text: 'M-2026-001: ' + t.osSigned,
      time: '4h',
      icon: '📄',
    },
    { id: 3, type: 'alert', text: t.budgetWarning, time: '1j', icon: '⚠️' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Budget Engagement */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t.budgetEngagement}
          </h2>
          <span className="text-2xl font-bold text-asma-blue">80%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-asma-blue h-4 rounded-full transition-all duration-500"
            style={{ width: '80%' }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {language === 'ar'
            ? '40,000,000 درهم من أصل 50,000,000 درهم ملتزم بها'
            : '40,000,000 MAD engagés sur 50,000,000 MAD'}
        </p>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t.recentActivity}
        </h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => {
                if (activity.type === 'tender') setCurrentView('tenders');
                if (activity.type === 'contract') setCurrentView('contracts');
                if (activity.type === 'alert') setCurrentView('alerts');
              }}
            >
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{activity.text}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
