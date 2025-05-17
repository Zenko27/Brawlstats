const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: 'Tag manquant' });

  try {
    const apiUrl = `https://api.brawlstars.com/v1/players/%23${encodeURIComponent(tag)}`;
    const response = await fetch(apiUrl, {
      headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjNlYjI2Nzk1LTkxZWEtNDEyMy1iMzYyLWJmMzAyYmI5ZjQ5MSIsImlhdCI6MTc0NzM5MDQzNCwic3ViIjoiZGV2ZWxvcGVyL2RlZmZmY2VkLTdjYjYtZjM3NC1mMmE1LWNhOWE0ZjFiYjJiOSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTg4LjE2NS4zMy4xMzMiXSwidHlwZSI6ImNsaWVudCJ9XX0.um6ftlTZ7KJkadj0FcBskL75bAUJeRQQr1EHNCrtYVp3ISvcqRvhCpQ4ugPLIUvvBe2lJnRX7YjI9UKnBdMusg' }
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
