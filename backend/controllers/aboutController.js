const getAboutInfo = async (req, res) => {
    try {
      const aboutInfo = {
        title: 'About Hala Saudi Trip Advisor',
        description: `Welcome to Hala Saudi Trip Advisor, your ultimate travel companion for exploring Saudi Arabia! We specialize in providing personalized travel experiences by offering customized itineraries tailored specifically to your preferences.
  
  Using advanced AI-powered tools, we analyze your interests, budget, and travel style to generate a unique itinerary that perfectly aligns with your needs. Whether you're looking for adventure, cultural experiences, historical sites, or luxury stays, our platform ensures a seamless and hassle-free travel planning experience.
  
  Our mission is to enhance your journey by providing expert recommendations, top-rated accommodations, must-visit attractions, and hidden gems across Saudi Arabia. With Hala Saudi Trip Advisor, every trip is curated to offer you the best experiences, making your stay truly unforgettable.
  
  Let us take care of the planning while you focus on exploring, discovering, and enjoying the beauty of Saudi Arabia! 🌍✨`,
        mission: 'Our mission is to provide the best travel experiences for our users by leveraging advanced technology and personalized recommendations.',
        vision: 'We envision a world where travel planning is seamless, enjoyable, and tailored to individual preferences.',
        team: [
          { name: 'Ziyad', role: 'Founder', major: 'Business Administration', info: 'Experienced entrepreneur with a passion for travel and technology.', linkedin: 'https://www.linkedin.com/in/ziyad' },
          { name: 'Khalid', role: 'Lead Developer', major: 'Computer Science', info: 'Expert in full-stack development and AI technologies.', linkedin: 'https://www.linkedin.com/in/khalid' },
          { name: 'Jane Doe', role: 'UI/UX Designer', major: 'Graphic Design', info: 'Creative designer with a focus on user experience and interface design.', linkedin: 'https://www.linkedin.com/in/janedoe' },
          { name: 'John Smith', role: 'Backend Developer', major: 'Software Engineering', info: 'Skilled backend developer with experience in scalable systems.', linkedin: 'https://www.linkedin.com/in/johnsmith' },
        ],
      };
  
      res.json(aboutInfo);
    } catch (error) {
      console.error('Error fetching about info:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
  module.exports = { getAboutInfo };