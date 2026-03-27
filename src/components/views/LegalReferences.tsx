import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import legalData from '../../data/legal-references.json';
import type { Language } from '../../types';

const translations: Record<
  Language,
  {
    title: string;
    searchPlaceholder: string;
    categories: string;
    keyArticles: string;
    viewDetails: string;
    hideDetails: string;
    articleTitle: string;
    noReferences: string;
    year: string;
    summary: string;
  }
> = {
  fr: {
    title: 'Références Légales',
    searchPlaceholder: 'Rechercher une loi ou un décret...',
    categories: 'Catégories',
    keyArticles: 'Articles clés',
    viewDetails: 'Voir les articles',
    hideDetails: 'Masquer',
    articleTitle: 'Article',
    noReferences: 'Aucune référence trouvée',
    year: 'Année',
    summary: 'Résumé',
  },
  ar: {
    title: 'المراجع القانونية',
    searchPlaceholder: 'البحث عن قانون أو مرسوم...',
    categories: 'الفئات',
    keyArticles: 'المواد الرئيسية',
    viewDetails: 'عرض المواد',
    hideDetails: 'إخفاء',
    articleTitle: 'المادة',
    noReferences: 'لا توجد مراجع',
    year: 'السنة',
    summary: 'ملخص',
  },
};

interface KeyArticle {
  number: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

interface LegalReference {
  id: string;
  name: string;
  nameAr: string;
  fullName: string;
  fullNameAr: string;
  category: string;
  year: number;
  summary: string;
  summaryAr: string;
  keyArticles: KeyArticle[];
  applicationDomains: string[];
}

interface Category {
  id: string;
  name: string;
  nameAr: string;
}

export function LegalReferences() {
  const { language } = useApp();
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const references = legalData.legalReferences as LegalReference[];
  const categories = legalData.categories as Category[];

  const filteredReferences = references.filter((ref) => {
    const matchesCategory =
      !selectedCategory || ref.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      ref.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.nameAr.includes(searchQuery) ||
      ref.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((c) => c.id === categoryId);
    return category
      ? language === 'ar'
        ? category.nameAr
        : category.name
      : categoryId;
  };

  const toggleExpand = (refId: string) => {
    setExpandedRef(expandedRef === refId ? null : refId);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field w-64"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          {t.categories}
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'ar' ? 'الكل' : 'Tous'}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? category.nameAr : category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Legal References List */}
      <div className="space-y-4">
        {filteredReferences.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">{t.noReferences}</p>
          </div>
        ) : (
          filteredReferences.map((ref) => (
            <div key={ref.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-info">
                      {getCategoryName(ref.category)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {t.year}: {ref.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'ar' ? ref.nameAr : ref.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'ar' ? ref.fullNameAr : ref.fullName}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'ar' ? ref.summaryAr : ref.summary}
                  </p>
                </div>
              </div>

              {/* Expand Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleExpand(ref.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  {expandedRef === ref.id ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      {t.hideDetails}
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      {t.viewDetails} ({ref.keyArticles.length})
                    </>
                  )}
                </button>
              </div>

              {/* Key Articles */}
              {expandedRef === ref.id && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {t.keyArticles}
                  </h4>
                  {ref.keyArticles.map((article, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {t.articleTitle} {article.number}
                        </span>
                        <span className="font-medium text-gray-900">
                          {language === 'ar' ? article.titleAr : article.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {language === 'ar'
                          ? article.descriptionAr
                          : article.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
