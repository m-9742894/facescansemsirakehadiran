/**
 * DATABASE SIGNUP GURU - SEMSIRA
 * Version Bersih - Tanpa Data Demo
 * Hanya create database kosong, tiada data default
 */

// ===== CONSTANTS =====
const STORAGE_KEYS = {
    GURU: 'semsira_gurus',           // Kunci untuk data guru
    CURRENT_USER: 'semsira_current_user'
};

// ===== INITIALIZE DATABASE =====
function initializeSignupDatabase() {
    console.log('Initializing Signup Database...');
    
    // Cek jika database guru belum wujud, buat database KOSONG
    if (!localStorage.getItem(STORAGE_KEYS.GURU)) {
        // Database kosong sepenuhnya - TIADA DATA DEFAULT
        const emptyGurus = [];
        localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(emptyGurus));
        console.log('Database guru baru telah dicipta (kosong)');
    } else {
        console.log('Database guru sedia ada, jumlah guru:', getTotalGuru());
    }
}

// ===== GURU FUNCTIONS =====
function getGuruDatabase() {
    const data = localStorage.getItem(STORAGE_KEYS.GURU);
    return data ? JSON.parse(data) : [];
}

function saveGuruDatabase(gurus) {
    localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify(gurus));
    console.log('Database guru disimpan. Jumlah sekarang:', gurus.length);
}

function getTotalGuru() {
    return getGuruDatabase().length;
}

function getGuruByEmail(email) {
    const gurus = getGuruDatabase();
    return gurus.find(guru => guru.email.toLowerCase() === email.toLowerCase());
}

function isEmailExists(email) {
    const guru = getGuruByEmail(email);
    return guru !== undefined;
}

// ===== ADD NEW GURU =====
function addNewGuru(guruData) {
    const gurus = getGuruDatabase();
    
    // Buat ID unik (guna timestamp)
    const newGuru = {
        id: Date.now(),
        name: guruData.name,
        email: guruData.email,
        phone: guruData.phone || '',
        password: guruData.password,
        registerDate: new Date().toISOString().split('T')[0],
        registerTime: new Date().toLocaleTimeString('ms-MY'),
        status: 'active',
        lastLogin: null
    };
    
    gurus.push(newGuru);
    saveGuruDatabase(gurus);
    
    console.log('Guru baru ditambah:', newGuru.name);
    return newGuru;
}

// ===== VALIDATION FUNCTIONS =====
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function checkDomainExists(domain) {
    // Domain yang biasa digunakan di Malaysia
    const validDomains = [
        'gmail.com', 
        'yahoo.com', 
        'hotmail.com', 
        'outlook.com',
        'edu.my',
        'moe.edu.my',
        'guru.edu.my',
        'smkss.edu.my',
        'semsira.edu.my',
        'teacher.com',
        'school.my'
    ];
    
    return validDomains.includes(domain.toLowerCase());
}

async function validateEmail(email) {
    if (!email) return { valid: false, reason: 'empty' };
    
    // Check format
    if (!validateEmailFormat(email)) {
        return { valid: false, reason: 'format' };
    }
    
    // Check domain
    try {
        const domain = email.split('@')[1];
        const domainExists = await checkDomainExists(domain);
        
        if (!domainExists) {
            return { valid: false, reason: 'domain' };
        }
        
        return { valid: true };
    } catch (error) {
        console.log('Domain check failed, proceed with format only');
        return { valid: true };
    }
}

function validatePassword(password) {
    if (!password) {
        return { valid: false, reason: 'Kata laluan diperlukan' };
    }
    
    if (password.length < 6) {
        return { valid: false, reason: 'Panjang minimum 6 aksara' };
    }
    
    return { valid: true };
}

function checkPasswordStrength(password) {
    let strength = 0;
    
    if (!password) return { strength: 0, level: 'Tiada', color: 'var(--gray)' };
    
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    let level = 'Lemah';
    let color = 'var(--danger)';
    
    if (strength >= 70) {
        level = 'Kuat';
        color = 'var(--success)';
    } else if (strength >= 40) {
        level = 'Sederhana';
        color = 'var(--warning)';
    }
    
    return { strength, level, color };
}

// ===== DELETE FUNCTIONS (guna kalau nak padam semua) =====
function deleteAllGuru() {
    // Function ni hanya untuk admin/testing - boleh panggil dari console
    localStorage.setItem(STORAGE_KEYS.GURU, JSON.stringify([]));
    console.log('⚠️ SEMUA data guru telah dipadamkan');
    return true;
}

function deleteGuruByEmail(email) {
    const gurus = getGuruDatabase();
    const filtered = gurus.filter(guru => guru.email.toLowerCase() !== email.toLowerCase());
    
    if (filtered.length === gurus.length) {
        console.log('Tiada guru dengan email:', email);
        return false;
    }
    
    saveGuruDatabase(filtered);
    console.log(`Guru dengan email ${email} telah dipadam`);
    return true;
}

// ===== VIEW FUNCTIONS (untuk debugging) =====
function viewAllGuru() {
    const gurus = getGuruDatabase();
    console.log('=== SENARAI GURU TERDAFTAR ===');
    console.log('Jumlah:', gurus.length);
    
    if (gurus.length === 0) {
        console.log('Tiada guru dalam database');
    } else {
        gurus.forEach((guru, index) => {
            console.log(`${index + 1}. ${guru.name} | ${guru.email} | Daftar: ${guru.registerDate}`);
        });
    }
    
    return gurus;
}

// ===== SESSION FUNCTIONS =====
function setCurrentUser(userData, remember = false) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
}

function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    console.log('User telah logout');
}

// ===== EXPORT FUNCTIONS =====
function exportGuruData() {
    const gurus = getGuruDatabase();
    
    if (gurus.length === 0) {
        console.log('Tiada data untuk diexport');
        return false;
    }
    
    const dataStr = JSON.stringify(gurus, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `semsira_guru_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('Data guru telah diexport');
    return true;
}

// ===== INITIALIZE ON LOAD =====
// Panggil function initialize untuk pastikan database wujud (kosong)
initializeSignupDatabase();

// Untuk debugging (boleh dipanggil dari console)
window.semsira = {
    guru: {
        viewAll: viewAllGuru,
        deleteAll: deleteAllGuru,
        deleteByEmail: deleteGuruByEmail,
        export: exportGuruData,
        total: getTotalGuru
    },
    version: '1.0 - Bersih'
};

console.log('✅ Database Signup sedia. Taip "semsira.guru.viewAll()" dalam console untuk lihat data');
