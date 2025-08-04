async function generateQR() {
  const qrData = document.getElementById('qrData').value;
  if (!qrData) {
    alert('Please enter data to generate QR code');
    return;
  }

  try {
    const response = await fetch('/api/qr/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: qrData }),
    });
    const result = await response.json();
    if (result.error) {
      alert(result.error);
      return;
    }

    document.getElementById('qrImage').innerHTML = `<img src="${result.qrImage}" alt="QR Code">`;
    loadHistory();
  } catch (err) {
    alert('Error generating QR code');
  }
}

async function loadHistory() {
  try {
    const response = await fetch('/api/qr/history');
    const history = await response.json();
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    history.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.data} (Created: ${new Date(item.createdAt).toLocaleString()})`;
      historyList.appendChild(li);
    });
  } catch (err) {
    console.error('Error loading history');
  }
}

// Load history on page load
window.onload = loadHistory;