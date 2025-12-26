// countdown.js - Timer dan Photo Popup
// ================================
// SET WAKTU TARGET ANDA DI SINI:
// Format: "Bulan/Hari/Tahun Jam:Menit:Detik"
// Contoh: "12/25/2024 20:00:00" (25 Desember 2024 jam 8 malam)
// ================================

// const targetDateTime = "12/30/2025 23:59:59"; // UBAH INI SESUAI TARGET ANDA
const targetDateTime = "12/26/2025 19:31:00"; // UBAH INI SESUAI TARGET ANDA
let countdownInterval;
let currentPhotoIndex = 0;

// Inisialisasi Countdown
function initCountdown() {
    const targetDate = new Date(targetDateTime).getTime();
    
    // Periksa apakah tanggal target valid
    if (isNaN(targetDate)) {
        document.getElementById('countdown-message').textContent = 
            "Tanggal target tidak valid. Silakan periksa format tanggal.";
        return;
    }
    
    // Update countdown setiap detik
    countdownInterval = setInterval(function() {
        updateCountdown(targetDate);
    }, 1000);
    
    // Update segera
    updateCountdown(targetDate);
}

// Update countdown display
function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Jika waktu target sudah tercapai
    if (distance < 0) {
        clearInterval(countdownInterval);
        showCountdownComplete();
        return;
    }
    
    // Hitung hari, jam, menit, detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update pesan berdasarkan waktu tersisa
    updateCountdownMessage(distance, days);
}

// Update pesan countdown
function updateCountdownMessage(distance, days) {
    const messageElement = document.getElementById('countdown-message');
    
    if (days === 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        if (hours < 1) {
            messageElement.textContent = "Hanya beberapa menit lagi! Bersiaplah untuk kejutan spesial!";
            messageElement.style.color = "#ff4757";
        } else if (hours < 6) {
            messageElement.textContent = "Hanya beberapa jam lagi! Aku tidak sabar menunggumu!";
            messageElement.style.color = "#ff6b81";
        } else {
            messageElement.textContent = "Hari yang ditunggu-tunggu akhirnya tiba!";
            messageElement.style.color = "#ff7eb3";
        }
    } else if (days === 1) {
        messageElement.textContent = "Besok adalah hari yang spesial! Aku sangat bahagia!";
        messageElement.style.color = "#ff7eb3";
    } else if (days < 7) {
        messageElement.textContent = `Hanya ${days} hari lagi! Persiapan sudah hampir selesai!`;
        messageElement.style.color = "#ff7eb3";
    } else if (days < 30) {
        messageElement.textContent = `Masih ada ${days} hari menuju momen spesial kita. Sabar ya sayang!`;
        messageElement.style.color = "#ff7eb3";
    } else {
        messageElement.textContent = "Menuju momen yang sangat spesial bersamamu...";
        messageElement.style.color = "#666";
    }
}

// Tampilkan popup foto saat countdown selesai
function showCountdownComplete() {
    // Update teks countdown
    document.getElementById('days').textContent = "00";
    document.getElementById('hours').textContent = "00";
    document.getElementById('minutes').textContent = "00";
    document.getElementById('seconds').textContent = "00";
    
    document.getElementById('countdown-message').textContent = 
        "🎉 WAKTUNYA TELAH TIBA! Ini momen spesial kita! 🎉";
    document.getElementById('countdown-message').style.color = "#ff4757";
    document.getElementById('countdown-message').style.fontWeight = "bold";
    
    // Tampilkan popup foto
    setTimeout(() => {
        showPhotoPopup();
    }, 1000); // Delay 1 detik sebelum popup muncul
    
    // Tambahkan efek konfeti
    createConfetti();
}

// Tampilkan popup foto
function showPhotoPopup() {
    const popup = document.getElementById('photo-popup');
    popup.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Tutup popup foto
function closePhotoPopup() {
    const popup = document.getElementById('photo-popup');
    popup.classList.remove('show');
    document.body.style.overflow = 'auto'; // Allow background scroll again
}

// Navigasi slider foto
function changeSlide(direction) {
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    // Hapus class active dari slide dan dot saat ini
    slides[currentPhotoIndex].classList.remove('active');
    dots[currentPhotoIndex].classList.remove('active');
    
    // Update index
    currentPhotoIndex = (currentPhotoIndex + direction + slides.length) % slides.length;
    
    // Tambah class active ke slide dan dot baru
    slides[currentPhotoIndex].classList.add('active');
    dots[currentPhotoIndex].classList.add('active');
}

// Pergi ke slide tertentu
function goToSlide(index) {
    const slides = document.querySelectorAll('.photo-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    // Hapus class active dari slide dan dot saat ini
    slides[currentPhotoIndex].classList.remove('active');
    dots[currentPhotoIndex].classList.remove('active');
    
    // Update index
    currentPhotoIndex = index;
    
    // Tambah class active ke slide dan dot baru
    slides[currentPhotoIndex].classList.add('active');
    dots[currentPhotoIndex].classList.add('active');
}

// Efek konfeti saat countdown selesai
function createConfetti() {
    const colors = ['#ff758c', '#ff7eb3', '#a78bfa', '#4d96ff', '#6bde7f'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            z-index: 9998;
            opacity: ${Math.random() * 0.7 + 0.3};
        `;
        
        document.body.appendChild(confetti);
        
        // Animasi konfeti
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Hapus elemen setelah animasi selesai
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Auto slide foto setiap 5 detik di dalam popup
function startPhotoSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Event listener untuk menutup popup dengan ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePhotoPopup();
    }
});

// Event listener untuk klik di luar popup
document.getElementById('photo-popup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePhotoPopup();
    }
});

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    startPhotoSlider();
    
    // Tambahkan konfeti untuk testing (bisa dihapus)
    createConfetti(); // Uncomment untuk testing efek konfeti
});