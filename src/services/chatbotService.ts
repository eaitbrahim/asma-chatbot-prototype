import chatbotConfig from '../data/chatbot-responses.json';
import type { Language } from '../types';

interface ChatIntent {
  patterns: string[];
  intent: string;
  action?: string;
  responses: string[];
  responsesAr?: string[];
}

export interface ChatbotResponse {
  text: string;
  action?: string;
  data?: unknown;
}

// Load intents from config
const intents: ChatIntent[] = chatbotConfig.intents;
const fallback = chatbotConfig.fallback;

/**
 * Normalize text for matching - removes accents and converts to lowercase
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ') // Keep Arabic characters
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity between two strings (simple word overlap)
 */
function calculateSimilarity(input: string, pattern: string): number {
  const inputWords = new Set(input.split(' '));
  const patternWords = new Set(pattern.split(' '));

  let matches = 0;
  inputWords.forEach((word) => {
    if (patternWords.has(word)) matches++;
  });

  return matches / Math.max(inputWords.size, 1);
}

/**
 * Match user input against intent patterns
 */
export function matchIntent(userInput: string): {
  intent: ChatIntent | null;
  confidence: number;
} {
  const normalizedInput = normalizeText(userInput);

  let bestMatch: ChatIntent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const normalizedPattern = normalizeText(pattern);

      // Exact match
      if (normalizedInput.includes(normalizedPattern)) {
        const score = normalizedPattern.split(' ').length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = intent;
        }
      }

      // Similarity match
      const similarity = calculateSimilarity(
        normalizedInput,
        normalizedPattern,
      );
      if (similarity > 0.7 && similarity > bestScore) {
        bestScore = similarity;
        bestMatch = intent;
      }
    }
  }

  return { intent: bestMatch, confidence: bestScore };
}

/**
 * Get a random response from the response array
 */
function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Process user message and return chatbot response
 */
export function processMessage(
  userInput: string,
  language: Language = 'fr',
): ChatbotResponse {
  const { intent, confidence } = matchIntent(userInput);

  // If no intent matched or low confidence, return fallback
  if (!intent || confidence < 0.3) {
    return {
      text: getRandomResponse(
        language === 'ar' ? fallback.responsesAr : fallback.responses,
      ),
    };
  }

  // Get response in appropriate language
  const responses =
    language === 'ar' && intent.responsesAr
      ? intent.responsesAr
      : intent.responses;

  const response: ChatbotResponse = {
    text: getRandomResponse(responses),
    action: intent.action,
  };

  // Add data for specific actions
  if (intent.action) {
    response.data = getActionData(intent.action, userInput);
  }

  return response;
}

/**
 * Get data associated with an action
 */
function getActionData(action: string, userInput: string): unknown {
  // Extract AO number from input if present
  const aoMatch = userInput.match(/AO-\d{4}-\d{3}/i);
  const tenderId = aoMatch ? aoMatch[0].toUpperCase() : null;

  switch (action) {
    case 'showTenderVerification':
      return { tenderId };
    default:
      return null;
  }
}

/**
 * Get quick action suggestions based on context
 */
export function getQuickActions(language: Language = 'fr'): string[] {
  if (language === 'ar') {
    return ['طلبات العروض', 'العقود', 'المدفوعات', 'التنبيهات', 'مساعدة'];
  }

  return ["Appels d'offres", 'Contrats', 'Paiements', 'Alertes', 'Aide'];
}
