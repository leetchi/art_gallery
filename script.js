// Artwork data
const artworks = [
    {
        id: 1,
        title: 'Ethereal Bloom',
        artist: 'Alexandra Chen',
        year: 2023,
        category: 'painting',
        emoji: '🌸',
        price: '$4,500',
        medium: 'Acrylic on Canvas',
        dimensions: '36" x 48"',
        description: 'A stunning abstract interpretation of spring flowers, blending realism with impressionistic strokes to create a dreamlike atmosphere.'
    },
    {
        id: 2,
        title: 'Urban Geometry',
        artist: 'Marcus Rodriguez',
        year: 2024,
        category: 'photography',
        emoji: '🏙️',
        price: '$3,200',
        medium: 'Archival Pigment Print',
        dimensions: '40" x 60"',
        description: 'Capturing the intersection of modern architecture and light, this photograph explores urban landscapes through geometric patterns.'
    },
    {
        id: 3,
        title: 'Serenity Stone',
        artist: 'Yuki Tanaka',
        year: 2023,
        category: 'sculpture',
        emoji: '🗿',
        price: '$8,900',
        medium: 'Marble',
        dimensions: '24" H x 18" W',
        description: 'A contemporary marble sculpture inspired by ancient minimalism, representing tranquility and balance in form.'
    },
    {
        id: 4,
        title: 'Digital Dreams',
        artist: 'Sam Williams',
        year: 2024,
        category: 'digital',
        emoji: '🎨',
        price: '$2,800',
        medium: 'Digital Art Print',
        dimensions: '24" x 36"',
        description: 'An immersive digital creation combining 3D modeling and AI-assisted art techniques to produce surreal landscapes.'
    },
    {
        id: 5,
        title: 'Crimson Sunset',
        artist: 'Elena Rossi',
        year: 2023,
        category: 'painting',
        emoji: '🌅',
        price: '$5,200',
        medium: 'Oil on Canvas',
        dimensions: '48" x 36"',
        description: 'A dramatic oil painting capturing the fleeting moment of sunset, with rich crimson and gold tones that evoke emotion and warmth.'
    },
    {
        id: 6,
        title: 'Monumental Vision',
        artist: 'David Park',
        year: 2022,
        category: 'sculpture',
        emoji: '🏛️',
        price: '$12,500',
        medium: 'Bronze',
        dimensions: '36" H x 28" W',
        description: 'A large-scale bronze sculpture inspired by classical architecture, representing the enduring nature of human achievement.'
    },
    {
        id: 7,
        title: 'Forgotten Memories',
        artist: 'Lisa Morrison',
        year: 2024,
        category: 'photography',
        emoji: '📷',
        price: '$2,400',
        medium: 'Fine Art Photograph',
        dimensions: '20" x 30"',
        description: 'Exploring themes of memory and nostalgia through vintage photographs and contemporary digital manipulation.'
    },
    {
        id: 8,
        title: 'Neon Pulse',
        artist: 'James Chen',
        year: 2024,
        category: 'digital',
        emoji: '⚡',
        price: '$3,100',
        medium: 'Digital NFT Art',
        dimensions: 'Variable',
        description: 'A vibrant digital artwork exploring the intersection of technology and nature through dynamic color and movement.'
    }
];

let currentFilter = 'all';
let selectedArtwork = null;
let scrollRevealObserver = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderArtworks('all');
    initScrollAnimations();
});

// Render artworks
function renderArtworks(filter) {
    currentFilter = filter;
    const grid = document.getElementById('gallery-grid');
    
    let filtered = artworks;
    if (filter !== 'all') {
        filtered = artworks.filter(art => art.category === filter);
    }

    grid.innerHTML = filtered.map(artwork => `
        <div class="artwork-card" onclick="openModal(${artwork.id})">
            <div class="artwork-image">${artwork.emoji}</div>
            <div class="artwork-info">
                <div class="artwork-category">${artwork.category}</div>
                <div class="artwork-title">${artwork.title}</div>
                <div class="artwork-artist">by ${artwork.artist}</div>
                <div class="artwork-price">${artwork.price}</div>
            </div>
        </div>
    `).join('');

    setupArtworkReveal();
}

// Filter artworks
function filterArtworks(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderArtworks(category);
}

// Open modal
function openModal(artworkId) {
    selectedArtwork = artworks.find(art => art.id === artworkId);
    
    if (selectedArtwork) {
        document.getElementById('modalImage').textContent = selectedArtwork.emoji;
        document.getElementById('modalTitle').textContent = selectedArtwork.title;
        document.getElementById('modalArtist').textContent = `by ${selectedArtwork.artist}`;
        document.getElementById('modalYear').textContent = `Year: ${selectedArtwork.year}`;
        document.getElementById('modalDescription').textContent = selectedArtwork.description;
        document.getElementById('modalMedium').textContent = selectedArtwork.medium;
        document.getElementById('modalDimensions').textContent = selectedArtwork.dimensions;
        document.getElementById('modalPrice').textContent = selectedArtwork.price;
        
        document.getElementById('artworkModal').classList.add('show');
    }
}

// Close modal
function closeModal() {
    document.getElementById('artworkModal').classList.remove('show');
    selectedArtwork = null;
}

// Inquire about artwork
function inquireArtwork() {
    if (selectedArtwork) {
        showSection('contact');
        closeModal();
        document.getElementById('contact-subject').value = `Inquiry about "${selectedArtwork.title}" by ${selectedArtwork.artist}`;
        document.getElementById('contact-subject').focus();
    }
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('visible');
    });
    
    document.getElementById(sectionId).classList.add('visible');
    window.scrollTo(0, 0);
    initScrollAnimations();
}

// Submit contact form
function submitContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Show success message
    showNotification('Thank you! We will get back to you soon.');
    
    // Reset form
    document.querySelector('.contact-form').reset();
    
    // Return to gallery after delay
    setTimeout(() => {
        showSection('gallery');
    }, 1500);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease-in-out;
        font-size: 14px;
        letter-spacing: 0.5px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations
function setupRevealTargets() {
    document.querySelectorAll('.hero-content, .section h2, .filter-controls, .about-text, .about-stats, .contact-info, .contact-form, .footer').forEach((el) => {
        el.classList.add('scroll-reveal');
    });
}

function setupArtworkReveal() {
    const cards = document.querySelectorAll('.artwork-card');

    cards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.classList.remove('reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3');

        if (index % 4 === 1) card.classList.add('reveal-delay-1');
        if (index % 4 === 2) card.classList.add('reveal-delay-2');
        if (index % 4 === 3) card.classList.add('reveal-delay-3');

        if (scrollRevealObserver) {
            scrollRevealObserver.observe(card);
        }
    });
}

function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.scroll-reveal').forEach((el) => el.classList.add('revealed'));
        return;
    }

    setupRevealTargets();

    if (scrollRevealObserver) {
        scrollRevealObserver.disconnect();
    }

    scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
        if (!el.classList.contains('revealed')) {
            scrollRevealObserver.observe(el);
        }
    });
}

