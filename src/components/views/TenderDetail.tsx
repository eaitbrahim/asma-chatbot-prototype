import { useApp } from '../../context/AppContext';
import tendersData from '../../data/tenders.json';
import type {
  Language,
  Tender,
  DocumentStatus,
  DCEDocument,
} from '../../types';

const translations: Record<
  Language,
  {
    back: string;
    verificationChecklist: string;
    dceDocuments: string;
    alerts: string;
    lots: string;
    generalInfo: string;
    object: string;
    estimate: string;
    deposit: string;
    publicationDate: string;
    openingDate: string;
    siteVisit: string;
    status: string;
    checklist: {
      inProvisionalProgram: string;
      budgetAvailable: string;
      dceComplete: string;
      noDuplicateNumber: string;
      objectMatches: string;
      depositRateValid: string;
      publicationDatesValid: string;
      siteVisitScheduled: string;
    };
    documentStatus: Record<DocumentStatus, string>;
    documentTypes: Record<string, string>;
    lotNumber: string;
    lotDescription: string;
    lotEstimate: string;
    noAlerts: string;
    validatedAt: string;
    pending: string;
  }
> = {
  fr: {
    back: '← Retour',
    verificationChecklist: 'Checklist de Vérification',
    dceDocuments: 'Documents DCE',
    alerts: 'Alertes',
    lots: 'Lots',
    generalInfo: 'Informations générales',
    object: 'Objet',
    estimate: 'Montant estimé',
    deposit: 'Caution provisoire',
    publicationDate: 'Date de publication',
    openingDate: "Date d'ouverture",
    siteVisit: 'Visite de site',
    status: 'Statut',
    checklist: {
      inProvisionalProgram: 'Présent dans le programme provisionnel',
      budgetAvailable: 'Budget disponible',
      dceComplete: 'DCE complet',
      noDuplicateNumber: 'Numéro unique (pas de doublon)',
      objectMatches: 'Objet conforme',
      depositRateValid: 'Taux de caution valide (≤ 2%)',
      publicationDatesValid: 'Dates de publication valides',
      siteVisitScheduled: 'Visite de site programmée',
    },
    documentStatus: {
      complete: 'Complet',
      pending: 'En attente',
      incomplete: 'Incomplet',
      not_applicable: 'Non applicable',
    },
    documentTypes: {
      RC: 'RC (Règlement de Consultation)',
      CPS: 'CPS (Cahier des Prescriptions)',
      BDDE: 'BDDE (Bordereau des Estimations)',
      Estime_Confidentiel: 'Estimé Confidentiel',
      Avis_AO: "Avis d'Appel d'Offres",
      PV_Commission: 'PV de Commission',
    },
    lotNumber: 'Lot',
    lotDescription: 'Description',
    lotEstimate: 'Estimation',
    noAlerts: 'Aucune alerte',
    validatedAt: 'Validé le',
    pending: 'En attente',
  },
  ar: {
    back: '← رجوع',
    verificationChecklist: 'قائمة التحقق',
    dceDocuments: 'وثائق ملف طلب العروض',
    alerts: 'التنبيهات',
    lots: 'الحزم',
    generalInfo: 'معلومات عامة',
    object: 'الموضوع',
    estimate: 'المبلغ المقدر',
    deposit: 'الضمان المؤقت',
    publicationDate: 'تاريخ النشر',
    openingDate: 'تاريخ الفتح',
    siteVisit: 'زيارة الموقع',
    status: 'الحالة',
    checklist: {
      inProvisionalProgram: 'موجود في البرنامج المؤقت',
      budgetAvailable: 'الميزانية متوفرة',
      dceComplete: 'ملف طلب العروض مكتمل',
      noDuplicateNumber: 'رقم فريد (بدون تكرار)',
      objectMatches: 'الموضوع مطابق',
      depositRateValid: 'معدل الضمان صالح (≤ 2%)',
      publicationDatesValid: 'تواريخ النشر صالحة',
      siteVisitScheduled: 'زيارة الموقع مجدولة',
    },
    documentStatus: {
      complete: 'مكتمل',
      pending: 'قيد الانتظار',
      incomplete: 'غير مكتمل',
      not_applicable: 'غير مطبق',
    },
    documentTypes: {
      RC: 'RC (نظام الاستشارة)',
      CPS: 'CPS (دفتر الشروط)',
      BDDE: 'BDDE (كشف التقديرات)',
      Estime_Confidentiel: 'التقدير السري',
      Avis_AO: 'إعلان طلب العروض',
      PV_Commission: 'محضر اللجنة',
    },
    lotNumber: 'الحزمة',
    lotDescription: 'الوصف',
    lotEstimate: 'التقدير',
    noAlerts: 'لا توجد تنبيهات',
    validatedAt: 'تم التحقق في',
    pending: 'قيد الانتظار',
  },
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
      month: 'long',
      day: 'numeric',
    },
  );
}

export function TenderDetail() {
  const { language, selectedTenderId, setCurrentView } = useApp();
  const t = translations[language];

  const tender = (tendersData.tenders as Tender[]).find(
    (t) => t.id === selectedTenderId,
  );

  if (!tender) {
    return (
      <div className="p-6">
        <button
          onClick={() => setCurrentView('tenders')}
          className="text-asma-blue hover:text-blue-700 mb-4"
        >
          {t.back}
        </button>
        <p className="text-gray-500">Tender not found</p>
      </div>
    );
  }

  const checklistItems = [
    {
      key: 'inProvisionalProgram',
      value: tender.verificationChecklist.inProvisionalProgram,
    },
    {
      key: 'budgetAvailable',
      value: tender.verificationChecklist.budgetAvailable,
    },
    { key: 'dceComplete', value: tender.verificationChecklist.dceComplete },
    {
      key: 'noDuplicateNumber',
      value: tender.verificationChecklist.noDuplicateNumber,
    },
    { key: 'objectMatches', value: tender.verificationChecklist.objectMatches },
    {
      key: 'depositRateValid',
      value: tender.verificationChecklist.depositRateValid,
    },
    {
      key: 'publicationDatesValid',
      value: tender.verificationChecklist.publicationDatesValid,
    },
    {
      key: 'siteVisitScheduled',
      value: tender.verificationChecklist.siteVisitScheduled,
    },
  ];

  const completedCount = checklistItems.filter((item) => item.value).length;
  const progressPercentage = (completedCount / checklistItems.length) * 100;

  return (
    <div className="p-6">
      {/* Header */}
      <button
        onClick={() => setCurrentView('tenders')}
        className="text-asma-blue hover:text-blue-700 mb-4 font-medium"
      >
        {t.back}
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? tender.objectAr : tender.object}
          </h1>
          <p className="text-gray-500 mt-1">{tender.id}</p>
        </div>
        <span
          className={`badge ${tender.status === 'en_cours' ? 'badge-info' : 'badge-success'}`}
        >
          {tender.status === 'en_cours'
            ? language === 'ar'
              ? 'جاري'
              : 'En cours'
            : language === 'ar'
              ? 'مغلق'
              : 'Clôturé'}
        </span>
      </div>

      {/* General Info */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t.generalInfo}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">{t.estimate}</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(tender.estimateAmount, language)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t.deposit}</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(tender.provisionalDeposit, language)} (
              {tender.depositRate}%)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t.publicationDate}</p>
            <p className="font-semibold text-gray-900">
              {formatDate(tender.publicationDate, language)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t.openingDate}</p>
            <p className="font-semibold text-gray-900">
              {formatDate(tender.openingDate, language)}
            </p>
          </div>
          {tender.siteVisitDate && (
            <div>
              <p className="text-sm text-gray-500">{t.siteVisit}</p>
              <p className="font-semibold text-gray-900">
                {formatDate(tender.siteVisitDate, language)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t.verificationChecklist}
          </h2>
          <span className="text-sm text-gray-500">
            {completedCount}/{checklistItems.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${progressPercentage === 100 ? 'bg-green-500' : 'bg-asma-blue'}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="space-y-3">
          {checklistItems.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              {item.value ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <span
                className={
                  item.value ? 'text-gray-700' : 'text-red-600 font-medium'
                }
              >
                {t.checklist[item.key as keyof typeof t.checklist]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DCE Documents */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t.dceDocuments}
        </h2>
        <div className="space-y-3">
          {tender.dceDocuments.map((doc: DCEDocument) => (
            <div
              key={doc.type}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {doc.status === 'complete' ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : doc.status === 'pending' ? (
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {t.documentTypes[doc.type] || doc.type}
                  </p>
                  {doc.validatedAt && (
                    <p className="text-xs text-gray-500">
                      {t.validatedAt} {formatDate(doc.validatedAt, language)}
                    </p>
                  )}
                </div>
              </div>
              <span
                className={`badge ${doc.status === 'complete' ? 'badge-success' : doc.status === 'pending' ? 'badge-warning' : 'badge-error'}`}
              >
                {t.documentStatus[doc.status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lots */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.lots}</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  {t.lotNumber}
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  {t.lotDescription}
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                  {t.lotEstimate}
                </th>
              </tr>
            </thead>
            <tbody>
              {tender.lots.map((lot) => (
                <tr key={lot.number} className="border-b border-gray-100">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {lot.number}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {lot.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    {formatCurrency(lot.estimate, language)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.alerts}</h2>
        {tender.alerts.length === 0 ? (
          <p className="text-gray-500 text-sm">{t.noAlerts}</p>
        ) : (
          <div className="space-y-3">
            {tender.alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg flex items-center gap-3 ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : alert.type === 'error'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <span className="text-xl">
                  {alert.type === 'warning'
                    ? '⚠️'
                    : alert.type === 'error'
                      ? '🚨'
                      : 'ℹ️'}
                </span>
                <p
                  className={`text-sm ${
                    alert.type === 'warning'
                      ? 'text-yellow-800'
                      : alert.type === 'error'
                        ? 'text-red-800'
                        : 'text-blue-800'
                  }`}
                >
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
