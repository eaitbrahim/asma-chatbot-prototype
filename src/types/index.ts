// Types for ASMA Chatbot Prototype

// ============== Common Types ==============

export type Language = 'fr' | 'ar';

export interface TranslatedText {
  fr: string;
  ar: string;
}

// ============== Tender Types ==============

export type TenderStatus = 'en_cours' | 'cloture' | 'annule' | 'reporte';

export interface TenderLot {
  number: number;
  description: string;
  descriptionAr?: string;
  estimate: number;
}

export type DocumentType =
  | 'RC'
  | 'CPS'
  | 'BDDE'
  | 'Estime_Confidentiel'
  | 'Avis_AO'
  | 'PV_Commission';
export type DocumentStatus =
  | 'complete'
  | 'pending'
  | 'incomplete'
  | 'not_applicable';

export interface DCEDocument {
  type: DocumentType;
  status: DocumentStatus;
  validatedAt?: string;
  validatedBy?: string;
  comments?: string;
}

export interface VerificationChecklist {
  inProvisionalProgram: boolean;
  budgetAvailable: boolean;
  dceComplete: boolean;
  noDuplicateNumber: boolean;
  objectMatches: boolean;
  depositRateValid: boolean;
  publicationDatesValid: boolean;
  siteVisitScheduled: boolean;
}

export interface TenderAlert {
  id: string;
  type: 'warning' | 'info' | 'error' | 'reminder';
  message: string;
  messageAr?: string;
  date: string;
  acknowledged: boolean;
}

export interface Tender {
  id: string;
  object: string;
  objectAr: string;
  status: TenderStatus;
  estimateAmount: number;
  provisionalDeposit: number;
  depositRate: number;
  publicationDate: string;
  openingDate: string;
  siteVisitDate?: string;
  lots: TenderLot[];
  dceDocuments: DCEDocument[];
  verificationChecklist: VerificationChecklist;
  alerts: TenderAlert[];
  createdAt: string;
  updatedAt: string;
}

// ============== Contract Types ==============

export type ContractStatus =
  | 'en_execution'
  | 'suspendu'
  | 'termine'
  | 'resilie';
export type ServiceOrderType =
  | 'approbation'
  | 'notification'
  | 'demarrage'
  | 'arret'
  | 'reprise'
  | 'augmentation_masse'
  | 'comite_suivi';

export interface ServiceOrder {
  id: string;
  type: ServiceOrderType;
  date: string;
  status: 'signed' | 'pending' | 'draft';
  signedBy?: string;
  comments?: string;
}

export interface DefinitiveDeposit {
  amount: number;
  rate: number;
  date: string;
  status: 'received' | 'pending' | 'overdue';
}

export interface InsuranceAttestation {
  type: string;
  typeAr?: string;
  validFrom: string;
  validTo: string;
  status: 'valid' | 'expired' | 'pending';
}

export interface Contract {
  id: string;
  tenderId: string;
  object: string;
  objectAr: string;
  contractor: string;
  amount: number;
  status: ContractStatus;
  signatureDate: string;
  endDate?: string;
  serviceOrders: ServiceOrder[];
  definitiveDeposit: DefinitiveDeposit;
  insuranceAttestations: InsuranceAttestation[];
  registrationAttestation?: {
    date: string;
    number: string;
  };
}

// ============== Payment Types ==============

export type PaymentStatus = 'en_cours' | 'valide' | 'rejete' | 'paye';
export type PaymentType = 'acompte' | 'partiel' | 'solde' | 'retenu_garantie';

export interface PaymentDocument {
  type: string;
  typeAr?: string;
  status: 'received' | 'pending' | 'rejected';
  receivedAt?: string;
}

export interface PaymentVerificationChecklist {
  allDocumentsReceived: boolean;
  amountsMatchContract: boolean;
  signaturesValid: boolean;
  cnssUpToDate: boolean;
  taxesUpToDate: boolean;
}

export interface Payment {
  id: string;
  contractId: string;
  type: PaymentType;
  amount: number;
  status: PaymentStatus;
  requestDate: string;
  dueDate?: string;
  documents: PaymentDocument[];
  verificationChecklist: PaymentVerificationChecklist;
  approvedBy?: string;
  approvedAt?: string;
}

// ============== Alert Types ==============

export type AlertType =
  | 'budget'
  | 'reminder'
  | 'compliance'
  | 'document'
  | 'payment';
export type AlertSeverity = 'info' | 'warning' | 'error';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  titleAr?: string;
  message: string;
  messageAr?: string;
  date: string;
  read: boolean;
  actionRequired: boolean;
  relatedEntity?: string;
  relatedEntityType?: 'tender' | 'contract' | 'payment';
}

// ============== Chatbot Types ==============

export type MessageSender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  action?: string;
  data?: unknown;
}

export interface ChatIntent {
  patterns: string[];
  intent: string;
  action?: string;
  responses: string[];
}

export interface ChatbotConfig {
  intents: ChatIntent[];
  fallback: {
    responses: string[];
  };
}

// ============== UI State Types ==============

export interface AppState {
  language: Language;
  currentView: string;
  selectedTenderId: string | null;
  selectedContractId: string | null;
  selectedPaymentId: string | null;
  isChatOpen: boolean;
  alerts: Alert[];
  unreadAlertsCount: number;
}

// ============== Statistics Types ==============

export interface DashboardStats {
  activeTenders: number;
  activeContracts: number;
  pendingPayments: number;
  activeAlerts: number;
  budgetEngagementRate: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'tender' | 'contract' | 'payment' | 'alert';
  action: string;
  entity: string;
  timestamp: string;
}
