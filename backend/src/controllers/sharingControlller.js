export const generateShareLinks = (req, res) => {
  const { carId } = req.params;
  const { baseUrl } = req.query;

  if (!baseUrl || !carId) {
    return res.status(400).json({ message: "Missing baseUrl or carId" });
  }

  const shareUrl = `${baseUrl}/car/${carId}`;

  const links = {
    whatsapp: `https://wa.me/?text=Check%20this%20car:%20${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check%20out%20this%20car!`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  res.json(links);
};
