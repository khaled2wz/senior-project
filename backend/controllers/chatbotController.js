const handleChatbotRequest = (req, res) => {
  const { queryResult } = req.body;
  const intent = queryResult.intent.displayName;

  let responseText = 'I am not sure how to respond to that.';

  if (intent === 'CreateAccount') {
    responseText = "To create an account, click 'Sign Up' on the top-right corner, enter your details, and verify your email.";
  } else if (intent === 'ResetPassword') {
    responseText = "You can reset your password by clicking 'Forgot Password' on the login page. A reset link will be sent to your email.";
  } else if (intent === 'SearchForTrips') {
    responseText = "Use the search bar at the top of the page. Enter your destination, travel dates, and preferences to see tailored results.";
  } else if (intent === 'BookHotel') {
    responseText = "After searching for a destination, click on 'Hotels' to see available options. Select your preferred hotel, choose your dates, and proceed to payment.";
  } else if (intent === 'LoginIssues') {
    responseText = "Make sure you’re using the correct email and password. If you’ve forgotten your password, click 'Forgot Password' to reset it. If the issue persists, clear your browser cache or try a different browser.";
  } else if (intent === 'PageNotLoading') {
    responseText = "Try refreshing the page or clearing your browser cache. If the issue persists, check your internet connection or try accessing the platform from a different device.";
  } else if (intent === 'ContactSupport') {
    responseText = "You can contact our support team by emailing support@aiwanderlustksa.com or calling +966-XXX-XXXX. Our team is available 24/7 to assist you.";
  }

  res.json({
    fulfillmentText: responseText,
  });
};

module.exports = { handleChatbotRequest };