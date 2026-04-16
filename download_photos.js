const fs = require('fs');
const https = require('https');
const path = require('path');

const fetchUnsplash = async (query, filename) => {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=1`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const imageUrl = json.results[0].urls.raw + '&w=1200&h=800&fit=crop';
        
        console.log(`Downloading ${filename} from ${imageUrl}`);
        const file = fs.createWriteStream(path.join(__dirname, 'public/images', filename));
        
        https.get(imageUrl, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Successfully downloaded ${filename}`);
          });
        });
      } catch (err) {
        console.error(`Error parsing JSON for ${query}:`, err);
      }
    });
  }).on('error', err => {
    console.error(`Error fetching ${query}:`, err.message);
  });
};

const images = [
  { q: "medical surgery operation room", f: "photo_surgery.jpg" },
  { q: "hospital monitoring technology dashboard", f: "photo_dashboard.jpg" },
  { q: "business meeting doctors handshake", f: "photo_meeting.jpg" },
  { q: "biomedical engineer working laboratory", f: "photo_engineer.jpg" },
  { q: "mri scanner machine hospital", f: "photo_mri.jpg" },
  { q: "medical equipment maintenance", f: "photo_maintenance.jpg" },
  { q: "robotic arm industry precision", f: "photo_robotics.jpg" },
  { q: "healthcare technology data screen", f: "photo_datascene.jpg" }
];

images.forEach(img => fetchUnsplash(img.q, img.f));
