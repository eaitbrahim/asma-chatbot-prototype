import { useApp } from '../../context/AppContext';
import type { Language, Alert, AlertSeverity, AlertType } from '../../types';

const translations: Record<
  Language,
  {
    title: string;
    markAllRead: string;
    noAlerts: string;
    filterAll: string;
    filterUnread: string;
    typeLabels: Record<AlertType, string>;
    severityLabels: Record<AlertSeverity, string>;
  }
> = {
  fr: {
    title: "Centre d'alertes",
    markAllRead: 'Tout marquer comme lu',
    noAlerts: 'Aucune alerte',
    filterAll: 'Toutes',
    filterUnread: 'Non lues',
    typeLabels: {
      budget: 'Budget',
      reminder: 'Rappel',
      compliance: 'Conformité',
      document: 'Document',
      payment: 'Paiement',
    },
    severityLabels: {
      info: 'Information',
      warning: 'Avertissement',
      error: 'Erreur',
    },
  },
  ar: {
    title: 'مركز التنبيهات',
    markAllRead: 'تحديد الكل كمقروء',
    noAlerts: 'لا توجد تنبيهات',
    filterAll: 'الكل',
    filterUnread: 'غير مقروءة',
    typeLabels: {
      budget: 'الميزانية',
      reminder: 'تذكير',
      compliance: 'الامتثال',
      document: 'وثيقة',
      payment: 'دفع',
    },
    severityLabels: {
      info: 'معلومات',
      warning: 'تحذير',
      error: 'خطأ',
    },
  },
};

const severityColors: Record<
  AlertSeverity,
  { bg: string; border: string; text: string; icon: string }
> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ️',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: '⚠️',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '🚨',
  },
};

function formatDate(dateStr: string, language: Language): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return language === 'ar' ? 'الآن' : "À l'instant";
  } else if (diffHours < 24) {
    return language === 'ar' ? `منذ ${diffHours} ساعة` : `Il y a ${diffHours}h`;
  } else if (diffDays < 7) {
    return language === 'ar' ? `منذ ${diffDays} يوم` : `Il y a ${diffDays}j`;
  } else {
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

export function AlertCenter() {
  const {
    language,
    alerts,
    unreadAlertsCount,
    markAlertAsRead,
    markAllAlertsAsRead,
    setCurrentView,
  } = useApp();
  const t = translations[language];

  const handleAlertClick = (alert: Alert) => {
    if (!alert.read) {
      markAlertAsRead(alert.id);
    }

    // Navigate to related entity
    if (alert.relatedEntityType && alert.relatedEntity) {
      if (alert.relatedEntityType === 'tender') {
        setCurrentView('tenders');
      } else if (alert.relatedEntityType === 'contract') {
        setCurrentView('contracts');
      } else if (alert.relatedEntityType === 'payment') {
        setCurrentView('payments');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          {unreadAlertsCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {unreadAlertsCount}{' '}
              {language === 'ar' ? 'تنبيهات غير مقروءة' : 'alertes non lues'}
            </p>
          )}
        </div>
        {unreadAlertsCount > 0 && (
          <button
            onClick={markAllAlertsAsRead}
            className="text-sm text-asma-blue hover:text-blue-700 font-medium"
          >
            {t.markAllRead}
          </button>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-4xl mb-4 block">📭</span>
          <p className="text-gray-500">{t.noAlerts}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const colors = severityColors[alert.severity];
            return (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert)}
                className={`card cursor-pointer transition-all hover:shadow-lg ${
                  !alert.read ? 'border-l-4 border-l-asma-blue' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{colors.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`badge ${
                          alert.severity === 'error'
                            ? 'badge-error'
                            : alert.severity === 'warning'
                              ? 'badge-warning'
                              : 'badge-info'
                        }`}
                      >
                        {t.severityLabels[alert.severity]}
                      </span>
                      <span className="badge badge-success">
                        {t.typeLabels[alert.type]}
                      </span>
                      {!alert.read && (
                        <span className="w-2 h-2 bg-asma-blue rounded-full"></span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {language === 'ar' && alert.titleAr
                        ? alert.titleAr
                        : alert.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' && alert.messageAr
                        ? alert.messageAr
                        : alert.message}
                    </p>
                    {alert.relatedEntity && (
                      <p className="text-xs text-gray-400 mt-2 font-mono">
                        {alert.relatedEntity}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-400">
                      {formatDate(alert.date, language)}
                    </p>
                    {alert.actionRequired && (
                      <span className="text-xs text-red-500 font-medium mt-1 block">
                        {language === 'ar' ? 'إجراء مطلوب' : 'Action requise'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
