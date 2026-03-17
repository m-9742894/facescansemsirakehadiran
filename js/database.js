/**
 * SEMSIRA Database Management
 * Menggunakan localStorage untuk menyimpan semua data sistem
 * Data akan sync dengan akaun Google automatik
 */

// ===== INITIALIZE DATABASE =====
function initializeDatabase() {
    console.log('Initializing SEMSIRA Database...');
    
    // 1. Initialize Guru data
    if (!localStorage.getItem('semsira_gurus')) {
        const defaultGurus = [
            {
                id: 1678901234567,
                name: "Ahmad Albab",
                email: "ahmad@semsira.edu.my",
                phone: "0123456789",
                password: "123",
                sekolah: "SMK Taman Desa",
                registerDate: "2026-01-15"
            },
            {
                id: 1678901234568,
                name: "Siti Aminah",
                email: "siti@semsira.edu.my",
                phone: "0129876543",
                password: "123",
                sekolah: "SMK Taman Mutiara",
                registerDate: "2026-01-16"
            },
            {
                id: 1678901234569,
                name: "Mohd Faiz",
                email: "faiz@semsira.edu.my",
                phone: "01122334455",
                password: "123",
                sekolah: "SEMSIRA International School",
                registerDate: "2026-01-17"
            }
        ];
        localStorage.setItem('semsira_gurus', JSON.stringify(defaultGurus));
        console.log('Default guru data created:', defaultGurus.length);
    }

    // 2. Initialize Murid data
    if (!localStorage.getItem('semsira_murid')) {
        const defaultMurid = [
            {
                id: 1678901234570,
                nama: "Ali bin Abu",
                ic: "080101015563",
                kelasId: null,
                faceDescriptor: null,
                registerDate: "2026-01-20"
            },
            {
                id: 1678901234571,
                nama: "Siti Aisyah",
                ic: "080202026654",
                kelasId: null,
                faceDescriptor: null,
                registerDate: "2026-01-20"
            },
            {
                id: 1678901234572,
                nama: "Ahmad Faiz",
                ic: "080303037745",
                kelasId: null,
                faceDescriptor: null,
                registerDate: "2026-01-21"
            },
            {
                id: 1678901234573,
                nama: "Nurul Iman",
                ic: "080404048856",
                kelasId: null,
                faceDescriptor: null,
                registerDate: "2026-01-21"
            },
            {
                id: 1678901234574,
                nama: "Muhammad Hakim",
                ic: "080505059967",
                kelasId: null,
                faceDescriptor: null,
                registerDate: "2026-01-22"
            }
        ];
        localStorage.setItem('semsira_murid', JSON.stringify(defaultMurid));
        console.log('Default murid data created:', defaultMurid.length);
    }

    // 3. Initialize Kelas data
    if (!localStorage.getItem('semsira_kelas')) {
        const defaultKelas = [
            {
                id: 1678901234580,
                name: "5 Sains 1",
                guruId: 1678901234567,
                subjek: "Matematik",
                createDate: "2026-01-16"
            },
            {
                id: 1678901234581,
                name: "5 Sains 2",
                guruId: 1678901234567,
                subjek: "Fizik",
                createDate: "2026-01-16"
            },
            {
                id: 1678901234582,
                name: "4 Sains 1",
                guruId: 1678901234568,
                subjek: "Biologi",
                createDate: "2026-01-17"
            }
        ];
        localStorage.setItem('semsira_kelas', JSON.stringify(defaultKelas));
        console.log('Default kelas data created:', defaultKelas.length);
    }

    // 4. Initialize Host data
    if (!localStorage.getItem('semsira_host')) {
        const defaultHost = {
            email: "hostsemsira@gmail.com",
            password: "Semsira1969"
        };
        localStorage.setItem('semsira_host', JSON.stringify(defaultHost));
        console.log('Default host data created');
    }

    // 5. Initialize Kehadiran data
    if (!localStorage.getItem('semsira_kehadiran')) {
        // Buat sample kehadiran untuk hari ini
        const today = new Date().toISOString().split('T')[0];
        const sampleKehadiran = [
            {
                id: 1678901234590,
                muridId: 1678901234570,
                tarikh: today,
                status: "Hadir",
                masa: "07:15:23",
                kelasId: 1678901234580
            },
            {
                id: 1678901234591,
                muridId: 1678901234571,
                tarikh: today,
                status: "Hadir",
                masa: "07:20:45",
                kelasId: 1678901234580
            },
            {
                id: 1678901234592,
                muridId: 1678901234572,
                tarikh: today,
                status: "Lewat",
                masa: "07:45:12",
                kelasId: 1678901234581
            }
        ];
        localStorage.setItem('semsira_kehadiran', JSON.stringify(sampleKehadiran));
        console.log('Default kehadiran data created:', sampleKehadiran.length);
    }

    // 6. Initialize Tetapan data (waktu operasi, cuti, dll)
    if (!localStorage.getItem('semsira_tetapan')) {
        const defaultTetapan = {
            hariOperasi: 22,
            waktuBuka: "06:30",
            waktuLewat: "07:30",
            waktuTutup: "14:00",
            cuti: [
                { id: 1, tarikh: "2026-05-01", nama: "Cuti Hari Pekerja" },
                { id: 2, tarikh: "2026-05-07", nama: "Hari Wesak" }
            ]
        };
        localStorage.setItem('semsira_tetapan', JSON.stringify(defaultTetapan));
        console.log('Default tetapan data created');
    }

    console.log('✅ SEMSIRA Database initialized successfully!');
}

// ===== GETTER FUNCTIONS =====
function getAllGuru() {
    return JSON.parse(localStorage.getItem('semsira_gurus')) || [];
}

function getAllMurid() {
    return JSON.parse(localStorage.getItem('semsira_murid')) || [];
}

function getAllKelas() {
    return JSON.parse(localStorage.getItem('semsira_kelas')) || [];
}

function getAllKehadiran() {
    return JSON.parse(localStorage.getItem('semsira_kehadiran')) || [];
}

function getTetapan() {
    return JSON.parse(localStorage.getItem('semsira_tetapan')) || {
        hariOperasi: 22,
        waktuBuka: "06:30",
        waktuLewat: "07:30",
        waktuTutup: "14:00",
        cuti: []
    };
}

function getHost() {
    return JSON.parse(localStorage.getItem('semsira_host')) || {
        email: "hostsemsira@gmail.com",
        password: "Semsira1969"
    };
}

// ===== STATISTICS FUNCTIONS =====
function getTotalGuru() {
    const gurus = getAllGuru();
    return gurus.length;
}

function getTotalMurid() {
    const murid = getAllMurid();
    return murid.length;
}

function getTotalSekolah() {
    const gurus = getAllGuru();
    const sekolahSet = new Set();
    gurus.forEach(guru => {
        if (guru.sekolah) sekolahSet.add(guru.sekolah);
    });
    return sekolahSet.size;
}

function getTotalKelas() {
    const kelas = getAllKelas();
    return kelas.length;
}

function getKehadiranHariIni() {
    const today = new Date().toISOString().split('T')[0];
    const kehadiran = getAllKehadiran();
    return kehadiran.filter(k => k.tarikh === today).length;
}

function getStatistikMengikutTarikh(tarikh) {
    const kehadiran = getAllKehadiran();
    const hadir = kehadiran.filter(k => k.tarikh === tarikh && k.status === "Hadir").length;
    const lewat = kehadiran.filter(k => k.tarikh === tarikh && k.status === "Lewat").length;
    const takHadir = getTotalMurid() - (hadir + lewat);
    
    return { hadir, lewat, takHadir };
}

// ===== CLEAR DATABASE (for testing) =====
function clearAllDatabase() {
    if (confirm('Buang semua data? Ini akan delete semua guru, murid, kelas!'))) {
        localStorage.removeItem('semsira_gurus');
        localStorage.removeItem('semsira_murid');
        localStorage.removeItem('semsira_kelas');
        localStorage.removeItem('semsira_kehadiran');
        localStorage.removeItem('semsira_host');
        localStorage.removeItem('semsira_tetapan');
        
        // Re-initialize with default data
        initializeDatabase();
        
        alert('Database telah direset!');
        location.reload();
    }
}

// Auto-initialize when this script loads
initializeDatabase();
