export const changeLanguage = (req, res) => {
  const { lng } = req.query;  // Get the new language from query parameters
  res.cookie('i18next', lng);  // Set the new language in a cookie

  // Use `Referrer` header or fallback to `/` if it's not set
  const redirectPath = req.get('Referrer') || '/';
  res.redirect(redirectPath);  // Safely redirect back
};