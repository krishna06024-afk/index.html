// Build a downloadable SVG card from user input
const form = document.getElementById('cardForm');
const downloadLink = document.getElementById('downloadLink');
const previewBtn = document.getElementById('previewBtn');
let lastBlobUrl = null;

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const from = document.getElementById('fromName').value.trim();
  const to = document.getElementById('toName').value.trim();
  if(!from || !to) return;
  const svg = buildSVGCard({to,from});
  const blob = new Blob([svg], {type:'image/svg+xml'});
  if(lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);
  lastBlobUrl = URL.createObjectURL(blob);
  downloadLink.href = lastBlobUrl;
  downloadLink.download = `girlfriends-day-${to.replace(/\s+/g,'_')}.svg`;
  downloadLink.classList.remove('hidden');
  previewBtn.classList.remove('hidden');
  previewBtn.onclick = ()=> window.open(lastBlobUrl, '_blank');
});

function buildSVGCard({to,from}){
  const width=1200, height=630;
  const safeTo = escapeXML(to);
  const safeFrom = escapeXML(from);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#ffdde1" />
        <stop offset="100%" stop-color="#ee9ca7" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#000" flood-opacity="0.18" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g1)" />

    <g transform="translate(${width/2},${height/2})" text-anchor="middle">
      <g filter="url(#shadow)">
        <path d="M0,-120 C45,-160 120,-160 150,-110 C190,-40 60,40 0,120 C-60,40 -190,-40 -150,-110 C-120,-160 -45,-160 0,-120 Z" fill="#fff" opacity="0.06" />
      </g>
      <path d="M0,-140 C68,-210 210,-210 260,-140 C320,-40 90,40 0,190 C-90,40 -320,-40 -260,-140 C-210,-210 -68,-210 0,-140 Z" fill="#ff5c8a" transform="translate(0,10) scale(0.55)" />
      <text x="0" y="-20" font-family="Poppins, Arial" font-size="48" font-weight="700" fill="#fff">Happy Girlfriend's Day</text>
      <text x="0" y="40" font-family="Poppins, Arial" font-size="38" font-weight="600" fill="#fff">To ${safeTo}</text>
      <text x="0" y="94" font-family="Poppins, Arial" font-size="22" fill="#fff">From ${safeFrom}</text>
    </g>
  </svg>`;
}

function escapeXML(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}