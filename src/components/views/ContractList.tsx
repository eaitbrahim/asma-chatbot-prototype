import { useApp } from '../../context/AppContext';
import contractsData from '../../data/contracts.json';
import type { Language, Contract, ContractStatus } from '../../types';

const translations: Record<
  Language,
  {
    title: string;
    searchPlaceholder: string;
    status: string;
    amount: string;
    contractor: string;
    signatureDate: string;
    actions: string;
    viewDetails: string;
    statusLabels: Record<ContractStatus, string>;
  }
> = {
  fr: {
    title: 'Contrats',
    searchPlaceholder: 'Rechercher un contrat...',
    status: 'Statut',
    amount: 'Montant',
    contractor: 'Titulaire',
    signatureDate: 'Date de signature',
    actions: 'Actions',
    viewDetails: 'Voir détails',
    statusLabels: {
      en_execution: 'En exécution',
      suspendu: 'Suspendu',
      termine: 'Terminé',
      resilie: 'Résilié',
    },
  },
  ar: {
    title: 'العقود',
    searchPlaceholder: 'البحث عن عقد...',
    status: 'الحالة',
    amount: 'المبلغ',
    contractor: 'المتعاقد',
    signatureDate: 'تاريخ التوقيع',
    actions: 'إجراءات',
    viewDetails: 'عرض التفاصيل',
    statusLabels: {
      en_execution: 'قيد التنفيذ',
      suspendu: 'معلق',
      termine: 'منتهي',
      resilie: 'ملغي',
    },
  },
};

const statusColors: Record<ContractStatus, string> = {
  en_execution: 'bg-green-100 text-green-800',
  suspendu: 'bg-yellow-100 text-yellow-800',
  termine: 'bg-gray-100 text-gray-800',
  resilie: 'bg-red-100 text-red-800',
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

export function ContractList() {
  const { language } = useApp();
  const t = translations[language];
  const contracts = contractsData.contracts as Contract[];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className="input-field w-64"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>

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
                {t.contractor}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.amount}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.signatureDate}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr
                key={contract.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-medium text-asma-blue">
                    {contract.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 truncate">
                      {language === 'ar' ? contract.objectAr : contract.object}
                    </p>
                    <p className="text-xs text-gray-500">
                      {contract.serviceOrders.length} OS
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {contract.contractor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(contract.amount, language)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${statusColors[contract.status]}`}>
                    {t.statusLabels[contract.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(contract.signatureDate, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
