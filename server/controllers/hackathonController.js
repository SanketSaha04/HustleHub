import axios from 'axios';

// @desc    Get all hackathons from the DevFolio API
// @route   GET /api/hackathons
// @access  Public
export const getHackathons = async (req, res) => {
  try {
    const response = await axios.get('https://api.devfolio.co/api/hackathons?filter=all&page=1&limit=20');
    
    const hackathonsList = response.data.result;

    if (Array.isArray(hackathonsList)) {
      const formattedHackathons = hackathonsList
        .map(hackathon => {
          // Choose the best available URL
          const hackathonUrl = hackathon.hackathon_setting.site || `https://devfolio.co/hackathons/${hackathon.slug}`;

          return {
            id: hackathon.uuid,
            title: hackathon.name,
            url: hackathonUrl, // Use the smarter URL
            platform: 'Devfolio',
            startsAt: new Date(hackathon.starts_at).toLocaleString(),
            endsAt: new Date(hackathon.ends_at).toLocaleString(),
            imageUrl: hackathon.cover_img,
          };
        });

      res.status(200).json(formattedHackathons);
    } else {
      console.error('Unexpected API response structure from DevFolio: `result` property is not an array.');
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error fetching from DevFolio API:', error.message);
    res.status(500).json({ message: 'Server Error: Could not fetch hackathons' });
  }
};