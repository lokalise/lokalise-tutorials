export const getHomePage = (req, res) => {
  const userName = req.query.name || 'Guest';  // Get the user's name from query parameters, default to 'Guest'
  const cartItemCount = parseInt(req.query.items, 10) || 0;  // Get item count from query parameters, default to 0

  res.render('index', { 
    title: req.t('title'),
    welcomeMessage: req.t('welcome_user', { name: userName }),  // Interpolate user's name
    cartMessage: req.t('cart_items', { count: cartItemCount }),  // Display singular/plural based on count
  });
};