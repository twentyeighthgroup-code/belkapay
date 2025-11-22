async function login() {
  const nickname = document.getElementById('nickname').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, password }),
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = 'wallet.html';
  } else {
    document.getElementById('message').innerText = data.error || 'Ошибка';
  }
}
