/**
 * Index Page JavaScript
 * Functions khusus untuk halaman utama
 */

// Smooth scroll function
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Animate numbers counting up
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= end) {
            obj.textContent = end.toLocaleString('ms-MY'); // Format nombor Malaysia
            clearInterval(timer);
        } else {
            obj.textContent = Math.floor(current).toLocaleString('ms-MY');
        }
    }, 16);
}

// Update stats dari database
function updateStatsFromDatabase() {
    // Ambil data dari database.js functions
    const totalGuru = getTotalGuru();
    const totalMurid = getTotalMurid();
    const totalSekolah = getTotalSekolah();
    
    console.log('Updating stats:', { totalGuru, totalMurid, totalSekolah });
    
    // Animate the numbers
    animateValue('totalGuru', 0, totalGuru, 1500);
    animateValue('totalMurid', 0, totalMurid, 2000);
    animateValue('totalSekolah', 0, totalSekolah, 1000);
    
    // Update juga hidden stats untuk debugging
    document.getElementById('totalGuru').setAttribute('data-total', totalGuru);
    document.getElementById('totalMurid').setAttribute('data-total', totalMurid);
    document.getElementById('totalSekolah').setAttribute('data-total', totalSekolah);
}

// Parallax effect untuk background
function initParallax() {
    document.addEventListener('mousemove', function(e) {
        const circles = document.querySelectorAll('.bg-circle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = 20 * (index + 1);
            circle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Check dan display holiday message if needed
function checkHolidayMessage() {
    const today = new Date().toISOString().split('T')[0];
    const tetapan = getTetapan();
    const cutiHariIni = tetapan.cuti.find(c => c.tarikh === today);
    
    if (cutiHariIni) {
        console.log('Hari ini cuti:', cutiHariIni.nama);
        // Boleh tambah banner cuti dekat hero section kalau nak
    }
}

// Loading screen handler
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page load
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 500);
}

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Index page loaded, initializing...');
    
    // 1. Handle loading screen
    handleLoadingScreen();
    
    // 2. Initialize parallax effect
    initParallax();
    
    // 3. Check for holiday
    checkHolidayMessage();
    
    // 4. Update stats from database (with slight delay for smooth animation)
    setTimeout(function() {
        updateStatsFromDatabase();
    }, 600);
    
    // 5. Add active class to current nav
    // (for future use)
});

// ===== EXPORT FUNCTIONS TO GLOBAL SCOPE =====
window.smoothScroll = smoothScroll;
// Optional: function untuk refresh stats
window.refreshStats = updateStatsFromDatabase;
