// ===== VARIÁVEIS GLOBAIS =====
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const shareBtn = document.getElementById('shareBtn');
const galleryModal = document.getElementById('galleryModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalCounter = document.getElementById('modalCounter');
const petalsContainer = document.querySelector('.petals-container');
const welcomeOverlay = document.getElementById('welcomeOverlay');
const welcomeBtn = document.getElementById('welcomeBtn');

// Lista de fotos
const photos = [
    'assets/images/IMG_2069.jpeg',
    'assets/images/IMG_2071.jpeg',
    'assets/images/IMG_2072.jpeg',
    'assets/images/IMG_2073.jpeg',
    'assets/images/IMG_2074.jpeg',
    'assets/images/IMG_2075.jpeg',
    'assets/images/IMG_2076.jpeg',
    'assets/images/IMG_2077.jpeg'
];

let currentSlide = 0;
let carouselInterval;
let isPlaying = true;

// Data de início do relacionamento: 22 de setembro de 2024
const relationshipStartDate = new Date(2024, 8, 22); // Mês é 0-indexed (8 = setembro)

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMusic();
    updateDaysCounter();
    createPetals();
    autoPlayCarousel();
    setupEventListeners();
    setupWelcomeScreen();
    
    // Atualizar contador de dias a cada minuto
    setInterval(updateDaysCounter, 60000);
});

// ===== TELA DE BEM-VINDAS =====
function setupWelcomeScreen() {
    welcomeBtn.addEventListener('click', () => {
        // Remover overlay
        welcomeOverlay.classList.add('hidden');
        
        // Iniciar música
        setTimeout(() => {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
            }).catch(err => {
                console.log('Erro ao tocar música:', err);
            });
            
            // Remover overlay do DOM após a animação
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 500);
        }, 100);
    });
    
    // Permitir clicar em qualquer lugar para iniciar também
    welcomeOverlay.addEventListener('click', (e) => {
        if (e.target === welcomeOverlay || e.target === welcomeBtn) {
            welcomeBtn.click();
        }
    });
}

// ===== MÚSICA =====
function initMusic() {
    // Música não inicia automaticamente - será iniciada pelo overlay
    isPlaying = false;
    musicToggle.classList.remove('playing');
}

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove('playing');
    } else {
        backgroundMusic.play();
        isPlaying = true;
        musicToggle.classList.add('playing');
    }
});

// ===== CARROSSEL =====
function initCarousel() {
    // Criar slides
    photos.forEach((photo) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = photo;
        img.alt = 'Foto nossa';
        img.addEventListener('click', () => openGallery(photos.indexOf(photo)));
        
        slide.appendChild(img);
        carouselTrack.appendChild(slide);
    });

    // Criar indicadores
    photos.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Atualizar indicadores
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % photos.length;
    updateCarousel();
    resetCarouselInterval();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + photos.length) % photos.length;
    updateCarousel();
    resetCarouselInterval();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetCarouselInterval();
}

function autoPlayCarousel() {
    carouselInterval = setInterval(() => {
        nextSlide();
    }, 5500); // 5.5 segundos
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    autoPlayCarousel();
}

// ===== GALERIA MODAL =====
function openGallery(index) {
    currentSlide = index;
    galleryModal.style.display = 'block';
    updateModalImage();
}

function updateModalImage() {
    modalImage.src = photos[currentSlide];
    modalCounter.textContent = `${currentSlide + 1} / ${photos.length}`;
}

closeModal.addEventListener('click', () => {
    galleryModal.style.display = 'none';
});

modalNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % photos.length;
    updateModalImage();
});

modalPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + photos.length) % photos.length;
    updateModalImage();
});

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
    }
});

// Navegação por teclado na galeria
document.addEventListener('keydown', (e) => {
    if (galleryModal.style.display === 'block') {
        if (e.key === 'ArrowRight') modalNext.click();
        if (e.key === 'ArrowLeft') modalPrev.click();
        if (e.key === 'Escape') closeModal.click();
    }
});

// ===== CONTADOR DE DIAS =====
function updateDaysCounter() {
    const today = new Date();
    const timeDiff = today - relationshipStartDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    document.getElementById('daysCount').textContent = daysDiff;
}

// ===== COMPARTILHAR =====
shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: 'Dia dos Namorados - Para Thiane',
        text: 'Venha ver uma dedicação especial feita com muito amor! 💕',
        url: window.location.href
    };

    // Usar Web Share API se disponível
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Erro ao compartilhar:', err);
            }
        }
    } else {
        // Fallback: copiar URL para clipboard
        try {
            await navigator.clipboard.writeText(shareData.url);
            alert('Link copiado para a área de transferência! 📋');
        } catch (err) {
            console.error('Erro ao copiar:', err);
            prompt('Copie este link:', shareData.url);
        }
    }
});

// ===== PÉTALAS ANIMADAS =====
function createPetals() {
    const petalTypes = ['rose', 'sunflower'];
    const symbols = {
        rose: '🌹',
        sunflower: '🌻'
    };

    // Criar pétalas periodicamente
    setInterval(() => {
        const type = petalTypes[Math.floor(Math.random() * petalTypes.length)];
        const petal = document.createElement('div');
        petal.className = `petal ${type}`;
        petal.textContent = symbols[type];
        
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = Math.random() * 20 + 20 + 'px';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.animationDuration = Math.random() * 5 + 5 + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        
        petalsContainer.appendChild(petal);
        
        // Remover pétala após animação
        setTimeout(() => petal.remove(), 12000);
    }, 1000);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// ===== EASTER EGG =====
// Desktop: Pressionar "I" 3 vezes para ativar modo de coração flutuante
let iKeyCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'i') {
        iKeyCount++;
        if (iKeyCount >= 3) {
            createHeartRain();
            iKeyCount = 0;
        }
    } else {
        iKeyCount = 0;
    }
});

// Mobile: Dar 3 toques rápidos no título para ativar chuva de corações
let touchCount = 0;
let lastTouchTime = 0;
const dedicationTitle = document.querySelector('.dedication-title');

if (dedicationTitle) {
    dedicationTitle.addEventListener('touchend', () => {
        const now = Date.now();
        
        // Se passou mais de 1 segundo desde o último toque, reinicia o contador
        if (now - lastTouchTime > 1000) {
            touchCount = 0;
        }
        
        touchCount++;
        lastTouchTime = now;
        
        // Adicionar feedback visual
        dedicationTitle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            dedicationTitle.style.transform = 'scale(1)';
        }, 100);
        
        if (touchCount >= 3) {
            createHeartRain();
            touchCount = 0;
        }
    });
}

function createHeartRain() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💕';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-30px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.zIndex = '999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'fall 5s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}
