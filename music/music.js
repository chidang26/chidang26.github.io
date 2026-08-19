const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackTitle = document.getElementById('trackTitle');
const trackSinger = document.getElementById('trackSinger');
const cdThumb = document.getElementById('cdThumb');
const playlist = document.getElementById('playlist');

// === DANH SÁCH BÀI NHẠC CỦA BẠN ===
const songs = [];
const tongSoBaiHat = 3; // Đổi số này thành tổng số bài nhạc bạn đã tải lên

for (let i = 1; i <= tongSoBaiHat; i++)
{
    songs.push({
        name: `Bản nhạc số ${i}`,
        singer: "Thư giãn", // Bạn có thể đổi tên ca sĩ chung ở đây
        path: `music${i}.mp3`, // File trên GitHub phải đặt tên chuẩn: nhac-1.mp3, nhac-2.mp3...
        image: "https://cdn-icons-png.flaticon.com/512/3011/3011236.png"
    });
}
let currentIndex = 0;
let isPlaying = false;

// Tải dữ liệu bài hát lên giao diện
function loadSong(song) {
    trackTitle.innerText = song.name;
    trackSinger.innerText = song.singer;
    audio.src = song.path;
    cdThumb.style.backgroundImage = `url('${song.image}')`;
}

// Lệnh Phát nhạc
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerText = "⏸️"; // Đổi icon thành nút Pause
    cdThumb.classList.add('playing'); // Quay đĩa CD
    renderPlaylist(); // Cập nhật màu sắc danh sách
}

// Lệnh Tạm dừng
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerText = "▶️"; // Đổi icon thành nút Play
    cdThumb.classList.remove('playing'); // Dừng đĩa CD
}

// Xử lý nút Play/Pause
playBtn.addEventListener('click', () => {
    if (isPlaying) pauseSong();
    else playSong();
});

// Chuyển bài trước đó
function prevSong() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = songs.length - 1;
    loadSong(songs[currentIndex]);
    playSong();
}

// Chuyển bài tiếp theo
function nextSong() {
    currentIndex++;
    if (currentIndex > songs.length - 1) currentIndex = 0;
    loadSong(songs[currentIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Tự động chuyển bài khi bài hiện tại kết thúc
audio.addEventListener('ended', nextSong);

// Hiển thị danh sách phát
function renderPlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song-item');
        // Đánh dấu màu nổi bật cho bài đang phát
        if (index === currentIndex) songDiv.classList.add('active');

        songDiv.innerHTML = `
            <div style="margin-left: 10px;">
                <div style="font-weight: bold;">${song.name}</div>
                <div style="font-size: 12px; opacity: 0.8;">${song.singer}</div>
            </div>
        `;

        // Bấm vào tên bài nào thì phát bài đó
        songDiv.addEventListener('click', () => {
            currentIndex = index;
            loadSong(songs[currentIndex]);
            playSong();
        });

        playlist.appendChild(songDiv);
    });
}

// Khởi chạy khi vừa mở web
loadSong(songs[currentIndex]);
renderPlaylist();
