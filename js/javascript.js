// Fungsi untuk membuka game
function openGame(gameName) {
    // Sembunyikan semua area game
    document.getElementById('album-game').classList.remove('active');
    document.getElementById('riddle-game').classList.remove('active');
    document.getElementById('message-game').classList.remove('active');
    
    // Tampilkan game yang dipilih
    document.getElementById(gameName + '-game').classList.add('active');
    
    // Inisialisasi game teka-teki jika dipilih
    if (gameName === 'riddle' && typeof initRiddleGame === 'function') {
        initRiddleGame();
    }
    
    // Scroll ke game area
    const element = document.getElementById(gameName + '-game');
    const offsetPosition = element.offsetTop - 50;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Tambahkan fungsi untuk menangani resize window
window.addEventListener('resize', function() {
    // Pastikan kontainer tidak terlalu kecil
    const container = document.querySelector('.container');
    if (window.innerWidth < 350) {
        container.style.minWidth = '350px';
    } else {
        container.style.minWidth = '';
    }
});

// Fungsi untuk menutup game
function closeGame(gameName) {
document.getElementById(gameName + '-game').classList.remove('active');
}

// Fungsi untuk menampilkan foto
function showPhoto(photoId) {
const photoTitles = {
    'photo1': 'Simbol Cinta - Kamu adalah cinta sejatiku',
    'photo2': 'Cahaya Hidupku - Kamu menerangi hari-hariku',
    'photo3': 'Bintangku - Kamu selalu bersinar dalam hidupku',
    'photo4': 'Melodi Hati - Hidupku lebih indah denganmu',
    'photo5': 'Sumber Kebahagiaan - Senyummu adalah segalanya',
    'photo6': 'Tak Terhingga - Cintaku padamu tak akan pernah berakhir'
};

alert(photoTitles[photoId] );
}

// Fungsi untuk mengungkap pesan rahasia
function revealMessage() {
const messages = [
    "Kamu itu penting banget buat aku, karena aku sayang kamu.",
    "Hari aku selalu lebih seru kalau ada kamu.",
    "Senyum kamu tuh kayak tombol auto-happy buat aku.",
    "Aku bersyukur banget bisa dapet kamu, kayak dapet loot langka.",
    "Sejak sama kamu, aku pengen jadi orang baik… walau kadang lupa 😜.",
    "Perasaan aku ke kamu tuh kayak kuota, makin hari makin nambah.",
    "Aku nggak minta banyak, cukup kamu bahagia (sama aku tentunya 😏).",
    "Kamu itu doa aku yang dikabulin plus bonus.",
    "Sama kamu rasanya kayak pulang, tapi nggak perlu buka pagar.",
    "Intinya sih… aku sayang kamu, titik. ❤️"
];

const randomMessage = messages[Math.floor(Math.random() * messages.length)];
const secretMessageDiv = document.getElementById('secret-message');

secretMessageDiv.innerHTML = `"${randomMessage}"`;
secretMessageDiv.classList.add('revealed');

// Ubah tombol
const button = document.querySelector('.reveal-btn');
button.innerHTML = '<i class="fas fa-redo"></i> Pesan Lainnya';
button.onclick = function() {
    revealMessage();
};
}

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', function() {
// Tambahkan efek hover pada kartu game
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Buat efek hujan hati di header
const header = document.querySelector('header');
for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-decoration');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
    heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    header.appendChild(heart);
}
});

// Tambahkan di akhir file javascript.js
window.addEventListener('load', function() {
    // Deteksi zoom dan sesuaikan
    function handleZoom() {
        const container = document.querySelector('.container');
        if (window.innerWidth < document.documentElement.clientWidth) {
            // Jika ada zoom, izinkan overflow
            container.style.minWidth = window.innerWidth + 'px';
        } else {
            container.style.minWidth = '';
        }
    }
    
    // Panggil saat resize dan load
    window.addEventListener('resize', handleZoom);
    handleZoom();
    
    // Pastikan body selalu bisa scroll
    document.body.style.overflowX = 'auto';
    document.body.style.overflowY = 'auto';
    
    // Tambahkan class untuk mencegah isu tertentu
    document.documentElement.style.overflow = 'auto';
});

// Background slideshow
function initBackgroundSlideshow() {
    const slides = document.querySelectorAll('#background-slideshow .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function changeSlide() {
        // Hapus class active dari semua slide
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Tambah class active ke slide saat ini
        slides[currentSlide].classList.add('active');
        
        // Pindah ke slide berikutnya
        currentSlide = (currentSlide + 1) % slides.length;
    }
    
    // Mulai dengan slide pertama
    changeSlide();
    
    // Ganti slide setiap 5 detik
    setInterval(changeSlide, 5000);
}

// Panggil saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    initBackgroundSlideshow();
});

