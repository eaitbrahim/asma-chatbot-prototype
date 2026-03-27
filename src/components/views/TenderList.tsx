import { useApp } from '../../context/AppContext';
import tendersData from '../../data/tenders.json';
import type { Language, Tender, TenderStatus } from '../../types';

const translations: Record<
  Language,
  {
    title: string;
    searchPlaceholder: string;
    status: string;
    estimate: string;
    openingDate: string;
    actions: string;
    viewDetails: string;
    verify: string;
    statusLabels: Record<TenderStatus, string>;
  }
> = {
  fr: {
    title: "Appels d'offres",
    searchPlaceholder: 'Rechercher un AO...',
    status: 'Statut',
    estimate: 'Montant estimé',
    openingDate: "Date d'ouverture",
    actions: 'Actions',
    viewDetails: 'Voir détails',
    verify: 'Vérifier',
    statusLabels: {
      en_cours: 'En cours',
      cloture: 'Clôturé',
      annule: 'Annulé',
      reporte: 'Reporté',
    },
  },
  ar: {
    title: 'طلبات العروض',
    searchPlaceholder: 'البحث عن طلب عروض...',
    status: 'الحالة',
    estimate: 'المبلغ المقدر',
    openingDate: 'تاريخ الفتح',
    actions: 'إجراءات',
    viewDetails: 'عرض التفاصيل',
    verify: 'التحقق',
    statusLabels: {
      en_cours: 'جاري',
      cloture: 'مغلق',
      annule: 'ملغي',
      reporte: 'مؤجل',
    },
  },
};

const statusColors: Record<TenderStatus, string> = {
  en_cours: 'bg-blue-100 text-blue-800',
  cloture: 'bg-gray-100 text-gray-800',
  annule: 'bg-red-100 text-red-800',
  reporte: 'bg-yellow-100 text-yellow-800',
};

function formatCurrency(amount: number, language: Language): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-MA' : 'fr-FR', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string, language: Language): string {
  return new Date(dateStr).toLocaleDateString(
    language === 'ar' ? 'ar-MA' : 'fr-FR',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  );
}

export function TenderList() {
  const { language, setCurrentView, setSelectedTenderId } = useApp();
  const t = translations[language];
  const tenders = tendersData.tenders as Tender[];

  const handleViewDetails = (tenderId: string) => {
    setSelectedTenderId(tenderId);
    setCurrentView('tender-detail');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="input-field w-64"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {language === 'ar' ? 'الموضوع' : 'Objet'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.estimate}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.openingDate}
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tenders.map((tender) => (
              <tr
                key={tender.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-medium text-asma-blue">
                    {tender.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 truncate">
                      {language === 'ar' ? tender.objectAr : tender.object}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tender.lots.length} lot(s)
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${statusColors[tender.status]}`}>
                    {t.statusLabels[tender.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(tender.estimateAmount, language)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(tender.openingDate, language)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleViewDetails(tender.id)}
                    className="text-asma-blue hover:text-blue-700 text-sm font-medium"
                  >
                    {t.viewDetails}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
