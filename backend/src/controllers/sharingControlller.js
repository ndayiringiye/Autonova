const generateShareLinks = (req, res) => {
  const { carId } = req.params;
  const { baseUrl } = req.query; 

  const shareUrl = `${baseUrl}/car/${carId}`;

  const links = {
    whatsapp: `https://wa.me/?text=Check%20this%20car:%20${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check%20out%20this%20car!`,
    instagram: `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`, 
  };

  res.json(links);
};
