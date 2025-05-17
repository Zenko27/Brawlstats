const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: 'Tag manquant' });

  try {
    const apiUrl = `https://api.brawlstars.com/v1/players/%23${encodeURIComponent(tag)}`;
    const response = await fetch(apiUrl, {
      headers: { Authorization: 'Bearer YOUR_API_TOKEN' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erreur API Brawl Stars' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
