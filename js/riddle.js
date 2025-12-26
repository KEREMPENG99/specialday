// riddle.js - Game Teka-Teki Cinta IMPROVED READABILITY
// =====================================================

// Data teka-teki cinta dengan pilihan yang lebih jelas
const loveRiddles = [
    {
        question: "Dalam hubungan cinta yang sehat, apa yang selalu bertambah seiring berjalannya waktu?",
        options: [
            "Kepercayaan antara pasangan",
            "Kenangan indah bersama",
            "Pengertian satu sama lain",
            "Semua jawaban di atas benar"
        ],
        correct: 3,
        explanation: "Dalam hubungan yang sehat, kepercayaan, kenangan indah, dan pengertian akan terus berkembang dan bertambah seiring waktu berjalan."
    },
    {
        question: "Manakah yang TIDAK bisa dibeli dengan uang dalam hubungan cinta sejati?",
        options: [
            "Kesetiaan yang tulus",
            "Perhatian yang berasal dari hati",
            "Pengorbanan yang dilakukan dengan ikhlas",
            "Semua hal di atas tidak bisa dibeli"
        ],
        correct: 3,
        explanation: "Kesetiaan, perhatian tulus, dan pengorbanan ikhlas adalah nilai-nilai dalam cinta sejati yang tidak memiliki harga dan tidak bisa dibeli dengan uang."
    },
    {
        question: "Apa kunci utama untuk menjaga hubungan cinta agar bisa bertahan lama?",
        options: [
            "Selalu menyetujui semua pendapat pasangan",
            "Saling memaafkan dan mencari jalan tengah",
            "Tidak pernah mengalami konflik atau pertengkaran",
            "Memberikan hadiah mahal secara rutin"
        ],
        correct: 1,
        explanation: "Hubungan yang langgeng dibangun atas dasar kesediaan untuk saling memaafkan dan kemampuan untuk berkompromi ketika terjadi perbedaan pendapat."
    },
    {
        question: "Faktor apa yang membuat ikatan cinta semakin kuat meski telah melalui banyak tahun?",
        options: [
            "Kebersamaan menghadapi berbagai tantangan hidup",
            "Memiliki hobi dan minat yang sama persis",
            "Penampilan fisik yang selalu terjaga",
            "Status ekonomi dan kekayaan materi"
        ],
        correct: 0,
        explanation: "Cinta yang tumbuh melalui kebersamaan menghadapi tantangan hidup akan menguatkan ikatan emosional dan menciptakan fondasi hubungan yang kokoh."
    },
    {
        question: "Menurut pendapatmu, apa makna sebenarnya dari cinta sejati?",
        options: [
            "Menerima pasangan dengan segala kelebihan dan kekurangannya",
            "Selalu berusaha membahagiakan pasangan setiap saat",
            "Saling mendukung impian dan tujuan hidup masing-masing",
            "Semua pernyataan di atas adalah bagian dari cinta sejati"
        ],
        correct: 3,
        explanation: "Cinta sejati adalah perpaduan dari penerimaan, usaha untuk membahagiakan, dan dukungan terhadap impian pasangan - semuanya saling melengkapi."
    },
    {
        question: "Apa yang paling penting dalam komunikasi hubungan cinta?",
        options: [
            "Berbicara sebanyak mungkin setiap hari",
            "Mendengarkan dengan penuh perhatian",
            "Selalu menggunakan kata-kata romantis",
            "Menghindari topik yang sensitif"
        ],
        correct: 1,
        explanation: "Dalam komunikasi yang sehat, kemampuan untuk mendengarkan dengan penuh perhatian lebih penting daripada banyak bicara atau menghindari topik tertentu."
    },
    {
        question: "Kapan waktu yang tepat untuk mengatakan 'Aku mencintaimu'?",
        options: [
            "Saat pertama kali merasa tertarik",
            "Ketika sudah yakin dengan perasaan sendiri",
            "Hanya pada momen-momen spesial",
            "Setelah mendapat balasan yang sama"
        ],
        correct: 1,
        explanation: "Mengungkapkan cinta sebaiknya dilakukan ketika kamu sudah benar-benar yakin dengan perasaanmu sendiri, bukan karena tekanan atau momen tertentu."
    }
];

// State game
let currentScore = 0;
let answeredRiddles = new Set();

// Array huruf untuk pilihan jawaban
const optionLetters = ['A', 'B', 'C', 'D'];

// Fungsi untuk inisialisasi game teka-teki
function initRiddleGame() {
    const riddlesContainer = document.getElementById('riddlesContainer');
    if (!riddlesContainer) return;
    
    riddlesContainer.innerHTML = '';
    
    loveRiddles.forEach((riddle, index) => {
        const riddleCard = document.createElement('div');
        riddleCard.className = 'riddle-card';
        riddleCard.dataset.index = index;
        
        // Container pertanyaan
        const questionContainer = document.createElement('div');
        questionContainer.className = 'riddle-question-container';
        
        // Nomor pertanyaan
        const questionNumber = document.createElement('div');
        questionNumber.className = 'riddle-number';
        questionNumber.textContent = index + 1;
        
        // Pertanyaan
        const question = document.createElement('div');
        question.className = 'riddle-question';
        question.textContent = riddle.question;
        
        questionContainer.appendChild(questionNumber);
        questionContainer.appendChild(question);
        
        // Container pilihan jawaban
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'answer-options';
        
        // Buat pilihan jawaban dengan huruf
        riddle.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.dataset.optionIndex = optionIndex;
            optionElement.dataset.riddleIndex = index;
            optionElement.onclick = () => selectAnswer(index, optionIndex);
            optionElement.setAttribute('role', 'button');
            optionElement.setAttribute('tabindex', '0');
            optionElement.setAttribute('aria-label', `Pilihan ${optionLetters[optionIndex]}: ${option}`);
            
            // Tambahkan event listener untuk keyboard
            optionElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectAnswer(index, optionIndex);
                }
            });
            
            // Huruf pilihan
            const optionLetter = document.createElement('div');
            optionLetter.className = 'option-letter';
            optionLetter.textContent = optionLetters[optionIndex];
            
            // Teks pilihan
            const optionText = document.createElement('div');
            optionText.className = 'option-text';
            optionText.textContent = option;
            
            optionElement.appendChild(optionLetter);
            optionElement.appendChild(optionText);
            optionsContainer.appendChild(optionElement);
        });
        
        // Feedback container
        const feedback = document.createElement('div');
        feedback.className = 'riddle-feedback';
        feedback.id = `feedback-${index}`;
        feedback.setAttribute('aria-live', 'polite');
        
        riddleCard.appendChild(questionContainer);
        riddleCard.appendChild(optionsContainer);
        riddleCard.appendChild(feedback);
        
        riddlesContainer.appendChild(riddleCard);
    });
    
    updateScore();
    const completionMessage = document.getElementById('completionMessage');
    if (completionMessage) {
        completionMessage.style.display = 'none';
    }
    
    // Tambahkan fokus ke kartu pertama untuk aksesibilitas
    const firstCard = document.querySelector('.riddle-card');
    if (firstCard) {
        firstCard.setAttribute('tabindex', '0');
    }
}

// Fungsi untuk memilih jawaban
function selectAnswer(riddleIndex, optionIndex) {
    if (answeredRiddles.has(riddleIndex)) return;
    
    const riddle = loveRiddles[riddleIndex];
    const options = document.querySelectorAll(`.answer-option[data-riddle-index="${riddleIndex}"]`);
    const feedback = document.getElementById(`feedback-${riddleIndex}`);
    
    if (!feedback) return;
    
    // Reset semua pilihan
    options.forEach(option => {
        option.classList.remove('correct', 'wrong');
        option.setAttribute('aria-selected', 'false');
    });
    
    // Tandai jawaban yang dipilih
    const selectedOption = document.querySelector(
        `.answer-option[data-riddle-index="${riddleIndex}"][data-option-index="${optionIndex}"]`
    );
    
    if (selectedOption) {
        selectedOption.setAttribute('aria-selected', 'true');
        
        if (optionIndex === riddle.correct) {
            selectedOption.classList.add('correct');
            feedback.className = 'riddle-feedback feedback-correct';
            feedback.innerHTML = `
                <div><strong>✅ Jawaban Benar!</strong> Kamu memilih pilihan yang tepat!</div>
                <div class="riddle-explanation"><strong>Penjelasan:</strong> ${riddle.explanation}</div>
            `;
            currentScore += 15;
            answeredRiddles.add(riddleIndex);
            
            // Play success sound (optional)
            playSound('correct');
        } else {
            selectedOption.classList.add('wrong');
            feedback.className = 'riddle-feedback feedback-wrong';
            feedback.innerHTML = `
                <div><strong>❌ Jawaban Kurang Tepat</strong> Pilihanmu belum sepenuhnya benar.</div>
                <div class="riddle-explanation"><strong>Penjelasan yang benar:</strong> ${riddle.explanation}</div>
            `;
            
            // Tampilkan jawaban yang benar
            const correctOption = document.querySelector(
                `.answer-option[data-riddle-index="${riddleIndex}"][data-option-index="${riddle.correct}"]`
            );
            if (correctOption) {
                correctOption.classList.add('correct');
                correctOption.setAttribute('aria-selected', 'true');
            }
            
            // Play error sound (optional)
            playSound('wrong');
        }
        
        feedback.style.display = 'block';
        
        // Auto-scroll ke feedback
        setTimeout(() => {
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    updateScore();
    
    // Cek apakah semua teka-teki sudah terjawab
    if (answeredRiddles.size === loveRiddles.length) {
        setTimeout(() => {
            const completionMessage = document.getElementById('completionMessage');
            if (completionMessage) {
                completionMessage.style.display = 'block';
                completionMessage.setAttribute('aria-live', 'assertive');
                completionMessage.innerHTML = `
                    <h3>🎉 Selamat! 🎉</h3>
                    <p>Kamu berhasil menyelesaikan semua ${loveRiddles.length} teka-teki cinta dengan skor sempurna!</p>
                    <div class="completion-hearts">💖💖💖💖💖</div>
                    <p>"Pemahamanmu tentang cinta sangat luar biasa! Kamu layak mendapatkan semua cinta ku!."</p>
                    <div class="hearts-container">
                        <div class="heart-badge" aria-label="Heart trophy">💝</div>
                        <div class="heart-badge" aria-label="Heart trophy">💘</div>
                        <div class="heart-badge" aria-label="Heart trophy">💕</div>
                        <div class="heart-badge" aria-label="Heart trophy">💞</div>
                        <div class="heart-badge" aria-label="Heart trophy">💗</div>
                    </div>
                    <button class="control-btn" onclick="resetRiddles()" aria-label="Main lagi teka-teki cinta">
                        <i class="fas fa-play-circle"></i> Main Lagi
                    </button>
                `;
                
                window.scrollTo({
                    top: completionMessage.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Play celebration sound (optional)
                playSound('celebration');
            }
        }, 1000);
    }
}

// Fungsi untuk update skor
function updateScore() {
    const scoreValue = document.getElementById('scoreValue');
    const heartsEarned = document.getElementById('heartsEarned');
    
    if (scoreValue) {
        scoreValue.textContent = currentScore;
        scoreValue.setAttribute('aria-label', `Skor saat ini: ${currentScore} poin`);
    }
    
    if (heartsEarned) {
        const hearts = Math.floor(currentScore / 15);
        const maxHearts = Math.floor((loveRiddles.length * 15) / 15);
        heartsEarned.innerHTML = `
            <span>💖</span>
            <span>${hearts} dari ${maxHearts} hati terkumpul</span>
        `;
        heartsEarned.setAttribute('aria-label', `${hearts} dari ${maxHearts} hati terkumpul`);
    }
}

// Fungsi untuk reset game
function resetRiddles() {
    currentScore = 0;
    answeredRiddles.clear();
    initRiddleGame();
    
    // Announce reset for screen readers
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'assertive');
    announcement.textContent = 'Game teka-teki cinta telah direset. Silakan mulai dari awal.';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 2000);
    
    // Scroll ke atas
    const riddleGame = document.getElementById('riddle-game');
    if (riddleGame) {
        const gameArea = riddleGame.querySelector('.love-riddle-game');
        if (gameArea) {
            gameArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Fungsi untuk memeriksa semua jawaban
function checkAllAnswers() {
    let unansweredCount = 0;
    
    loveRiddles.forEach((riddle, index) => {
        if (!answeredRiddles.has(index)) {
            unansweredCount++;
            const feedback = document.getElementById(`feedback-${index}`);
            if (feedback) {
                feedback.className = 'riddle-feedback feedback-wrong';
                feedback.innerHTML = `
                    <div><strong>⚠️ Pertanyaan Belum Dijawab</strong></div>
                    <div class="riddle-explanation"><strong>Jawaban yang benar:</strong> ${riddle.options[riddle.correct]}</div>
                    <div class="riddle-explanation"><strong>Penjelasan:</strong> ${riddle.explanation}</div>
                `;
                feedback.style.display = 'block';
                
                // Tampilkan jawaban yang benar
                const correctOption = document.querySelector(
                    `.answer-option[data-riddle-index="${index}"][data-option-index="${riddle.correct}"]`
                );
                if (correctOption) {
                    correctOption.classList.add('correct');
                    correctOption.setAttribute('aria-selected', 'true');
                }
            }
        }
    });
    
    // Announce for screen readers
    if (unansweredCount > 0) {
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'assertive');
        announcement.textContent = `Masih ada ${unansweredCount} pertanyaan yang belum dijawab.`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 2000);
    } else {
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'assertive');
        announcement.textContent = 'Selamat! Semua pertanyaan sudah terjawab.';
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 2000);
    }
    
    // Scroll ke pertanyaan pertama yang belum terjawab
    const unansweredIndex = loveRiddles.findIndex((_, index) => !answeredRiddles.has(index));
    if (unansweredIndex !== -1) {
        const unansweredCard = document.querySelector(`.riddle-card[data-index="${unansweredIndex}"]`);
        if (unansweredCard) {
            unansweredCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            unansweredCard.focus();
        }
    }
}

// Fungsi untuk efek suara (opsional)
function playSound(type) {
    // Ini adalah implementasi sederhana, bisa diganti dengan audio files
    try {
        if (type === 'correct') {
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
            audio.volume = 0.3;
            audio.play().catch(() => {});
        } else if (type === 'wrong') {
            // Simple beep for wrong answer
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        // Fallback silent
    }
}

// Tambahkan styles untuk screen reader (optional)
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    /* Focus styles for better accessibility */
    .answer-option:focus-visible {
        outline: 3px solid #ff6b9d;
        outline-offset: 3px;
        box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.3);
    }
    
    .control-btn:focus-visible {
        outline: 3px solid white;
        outline-offset: 3px;
        box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.5);
    }
`;
document.head.appendChild(style);

// Ekspor fungsi
window.initRiddleGame = initRiddleGame;
window.selectAnswer = selectAnswer;
window.resetRiddles = resetRiddles;
window.checkAllAnswers = checkAllAnswers;