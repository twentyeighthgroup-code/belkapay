window.onload = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const response = await fetch('/api/wallet/balance', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const data = await response.json();
  document.getElementById('balance').innerText = data.balance;
};

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
