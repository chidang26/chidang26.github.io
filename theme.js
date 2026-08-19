
const themeBtn = document.getElementById('themeToggle');

themeBtn.addEventListener('click', () => {
    // Bật/tắt class 'dark-mode' cho thẻ body
    document.body.classList.toggle('dark-mode');

    // Đổi chữ trên nút cho phù hợp
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.innerText = '☀️ Giao diện Sáng';
    } else {
        themeBtn.innerText = '🌙 Giao diện Tối';
    }
});

