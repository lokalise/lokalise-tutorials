export const numberFormats = {
  en: {
    currency: {
      style: 'currency', currency: 'USD'
    },
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    }
  },
  fr: {
    currency: {
      style: 'currency', currency: 'EUR'
    },
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    }
  },
  ar: {
    currency: {
      style: 'currency', currency: 'AED'
    },
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    }
  }
} as const;