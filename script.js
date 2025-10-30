Document.addEventListener("DOMContentLoaded", function() {

    // --- 1. DATA UNTUK KAD ---
    // Data untuk kad Ketua (kad khas)
    const ketuaData = {
        name: "Dude",
        role: "Ketua OPREC 24",
        img: "https://plus.unsplash.com/premium_photo-1671656333460-79346b4f8e3f?w=500&q=60", // Ganti dengan gambar kamu
        verticalText: "D U D E"
    };

    // Data untuk 26 ahli lain (Guna 4 contoh ini berulang)
    const memberData = [
        { name: "Ali", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=60" },
        { name: "Sam", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=60" },
        { name: "Joe", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&q=60" },
        { name: "Siti", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=60" }
    ];

    const marqueeTrack = document.querySelector('.marquee-track');
    const modalContainer = document.getElementById('ketuaModal');

    // --- 2. FUNGSI UNTUK BUAT KAD ---
    function createCard(data, isKetua = false) {
        const card = document.createElement('div');
        card.className = 'angkatan-card';
        card.style.backgroundImage = `url(${data.img})`;

        // Teks menegak untuk nama
        let verticalText = data.name.split('').join(' '); // Cth: "ALI" -> "A L I"
        if (isKetua) {
            verticalText = data.verticalText; // Guna format "D U D E"
        }

        card.innerHTML = `
            <div class="card-overlay">
                <div class="overlay-text">${verticalText}</div>
            </div>
            ${isKetua ? '<div class="arrow-indicator"><i class="fas fa-chevron-down"></i></div>' : ''}
        `;

        // Tambah 'click listener' pada setiap kad
        card.addEventListener('click', () => {
            showModal(data, isKetua); // Hantar data kad yang diklik
        });

        return card;
    }

    // --- 3. FUNGSI UNTUK BUAT MODAL (POP-UP) ---
    // Logik ini sudah BETUL, ia menggunakan data yang dihantar
    function showModal(data, isKetua) {
        
        // Tentukan 'role'. Jika data.role wujud (cth: untuk ketua), gunakannya.
        // Jika tidak (untuk ahli biasa), gunakan 'Member' sebagai lalai.
        const roleText = data.role || 'Member'; 

        // Hasilkan HTML modal menggunakan 'data' yang betul dari kad yang diklik
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="close-button" id="closeModal"><i class="fas fa-times"></i></span>
                
                <div class="modal-image-container" style="background-image: url(${data.img});">
                    <div class="modal-info">
                        <p class="role">${roleText}</p>
                        <p class="name">${data.name}</p>
                    </div>
                </div>

                <button class="social-button">
                    <i class="fab fa-instagram"></i>
                    Follow on Instagram
                </button>
            </div>
        `;
        
        // Paparkan modal
        modalContainer.style.display = "block";

        // Tambah event listener untuk butang 'x' yang BARU dibuat
        document.getElementById('closeModal').onclick = closeModal;
    }

    function closeModal() {
        modalContainer.style.display = "none";
    }
    
    // --- 4. JANA (GENERATE) 27 KAD + KLON ---
    
    const originalCardData = []; // Array untuk simpan data 27 kad
    
    // 1. Tambah Kad Ketua
    // Kita simpan objek khas untuk ketua
    originalCardData.push({...ketuaData, isKetua: true}); 
    
    // 2. Tambah 26 Kad Ahli
    for (let i = 0; i < 26; i++) {
        // Kita simpan objek ahli biasa (isKetua: false secara lalai)
        originalCardData.push({...memberData[i % memberData.length], isKetua: false});
    }
    
    // 3. Buat kad asal DAN klon (27 + 27 = 54 kad) dan pasang event listener
    [...originalCardData, ...originalCardData].forEach((data, index) => {
        // Semak properti isKetua pada objek data yang kita cipta tadi
        const isKetuaCard = data.isKetua; 
        
        // Cipta kad
        const card = createCard(data, isKetuaCard);
        
        // Tambah ke marquee
        marqueeTrack.appendChild(card);
    });
    

    // Tutup modal jika klik di luar
    window.onclick = function(event) {
        if (event.target === modalContainer) {
            closeModal();
        }
    }
});
