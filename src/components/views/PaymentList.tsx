import { useApp } from '../../context/AppContext';
import paymentsData from '../../data/payments.json';
import contractsData from '../../data/contracts.json';
import type {
  Language,
  Payment,
  PaymentStatus,
  PaymentType,
  Contract,
} from '../../types';

const translations: Record<
  Language,
  {
    title: string;
    searchPlaceholder: string;
    contract: string;
    type: string;
    amount: string;
    status: string;
    requestDate: string;
    dueDate: string;
    documents: string;
    statusLabels: Record<PaymentStatus, string>;
    typeLabels: Record<PaymentType, string>;
  }
> = {
  fr: {
    title: 'Paiements',
    searchPlaceholder: 'Rechercher un paiement...',
    contract: 'Contrat',
    type: 'Type',
    amount: 'Montant',
    status: 'Statut',
    requestDate: 'Date de demande',
    dueDate: 'Échéance',
    documents: 'Documents',
    statusLabels: {
      en_cours: 'En cours',
      valide: 'Validé',
      rejete: 'Rejeté',
      paye: 'Payé',
    },
    typeLabels: {
      acompte: 'Acompte',
      partiel: 'Partiel',
      solde: 'Solde',
      retenu_garantie: 'Retenu de garantie',
    },
  },
  ar: {
    title: 'المدفوعات',
    searchPlaceholder: 'البحث عن دفعة...',
    contract: 'العقد',
    type: 'النوع',
    amount: 'المبلغ',
    status: 'الحالة',
    requestDate: 'تاريخ الطلب',
    dueDate: 'تاريخ الاستحقاق',
    documents: 'الوثائق',
    statusLabels: {
      en_cours: 'قيد المعالجة',
      valide: 'معتمد',
      rejete: 'مرفوض',
      paye: 'مدفوع',
    },
    typeLabels: {
      acompte: 'دفعة مقدمة',
      partiel: 'جزئي',
      solde: 'الرصيد',
      retenu_garantie: 'احتياطي الضمان',
    },
  },
};

const statusColors: Record<PaymentStatus, string> = {
  en_cours: 'bg-yellow-100 text-yellow-800',
  valide: 'bg-blue-100 text-blue-800',
  rejete: 'bg-red-100 text-red-800',
  paye: 'bg-green-100 text-green-800',
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

export function PaymentList() {
  const { language } = useApp();
  const t = translations[language];
  const payments = paymentsData.payments as Payment[];
  const contracts = contractsData.contracts as Contract[];

  const getContractObject = (contractId: string): string => {
    const contract = contracts.find((c) => c.id === contractId);
    return contract
      ? language === 'ar'
        ? contract.objectAr
        : contract.object
      : contractId;
  };

  const getDocumentProgress = (payment: Payment): string => {
    const received = payment.documents.filter(
      (d) => d.status === 'received',
    ).length;
    return `${received}/${payment.documents.length}`;
  };

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
                {t.contract}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.type}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.amount}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.documents}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.requestDate}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-medium text-asma-blue">
                    {payment.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-900 truncate">
                      {getContractObject(payment.contractId)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.contractId}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700">
                    {t.typeLabels[payment.type]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(payment.amount, language)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {getDocumentProgress(payment)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${statusColors[payment.status]}`}>
                    {t.statusLabels[payment.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(payment.requestDate, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
