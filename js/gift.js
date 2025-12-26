// Gift.js - Versi sederhana tanpa canvas yang mengganggu scroll
document.addEventListener('DOMContentLoaded', function() {
    // Buat efek hujan hati di seluruh halaman
    function createFallingHearts() {
        const heartContainer = document.createElement('div');
        heartContainer.id = 'heart-container';
        heartContainer.style.position = 'fixed';
        heartContainer.style.top = '0';
        heartContainer.style.left = '0';
        heartContainer.style.width = '100%';
        heartContainer.style.height = '100%';
        heartContainer.style.pointerEvents = 'none';
        heartContainer.style.zIndex = '9999';
        document.body.appendChild(heartContainer);
        
        // Buat 20 hati jatuh
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createHeart(heartContainer);
            }, i * 300);
        }
    }
    
    function createHeart(container) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.opacity = '0.7';
        heart.style.color = ['#ff758c', '#ff7eb3', '#ffb6c1', '#ff69b4'][Math.floor(Math.random() * 4)];
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        
        container.appendChild(heart);
        
        // Animasi jatuh
        const duration = Math.random() * 3 + 2;
        const endLeft = Math.random() * 100;
        
        heart.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 0.8
            },
            { 
                transform: `translate(${endLeft - parseFloat(heart.style.left)}vw, 100vh) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000);
    }
    
    // Tambahkan event listener untuk tombol hadiah
    const giftText = document.querySelector('footer p');
    if (giftText && giftText.textContent.includes('🎁')) {
        giftText.style.cursor = 'pointer';
        giftText.addEventListener('click', function() {
            createFallingHearts();
            
            // Tampilkan pesan spesial
            const messages = [
                "Hadiah terindahku adalah kamu! 💝",
                "Setiap momen bersamamu adalah hadiah terbaik! 🎀",
                "Kamu adalah keajaiban terbesar dalam hidupku! ✨",
                "Cintaku padamu adalah hadiah sejati! 💖"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            alert(randomMessage);
        });
    }
});