export const datetimeFormats = {
  en: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }
  },
  fr: {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
    }
  },
  ar: {
    short: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
  }
} as const;