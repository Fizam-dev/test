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
    // ***** INI ADALAH BAHAGIAN YANG TELAH DIBAIKI *****
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

    // --- 4. JANA (GENERATE) 27 KAD ---
    function generateMarquee() {
        // 1. Tambah Kad Ketua
        marqueeTrack.appendChild(createCard(ketuaData, true));

        // 2. Tambah 26 Kad Ahli (berulang dari data 'memberData')
        for (let i = 0; i < 26; i++) {
            const data = memberData[i % memberData.length]; // Ulang data
            marqueeTrack.appendChild(createCard(data, false));
        }

        // 3. Gandakan semua kad untuk gelung marquee yang lancar
        const originalCards = marqueeTrack.querySelectorAll('.angkatan-card');
        originalCards.forEach(card => {
            // Kita perlu klon event listener sekali
            const clone = card.cloneNode(true);
            const cardData = card.dataset.cardData; // Ambil data dari kad asal
            
            // Dapatkan semula data asal untuk 'clone'
            // Cara lebih mudah: tambahkan semula event listener pada klon
            
            // Pendekatan lebih mudah: Klon nod dan tambah semula event listener
            // Oleh kerana 'createCard' menambah event listener, kita perlu cara
            // untuk mendapatkan semula data.
            
            // Cara paling mudah ialah biarkan event listener asal pada klon
            // Mari kita lihat jika cloneNode(true) menyalin event listener...
            // Ia tidak. Jadi kita perlu tambah semula.
            
            // OK, kita buat cara yang lebih mudah:
            // Apabila kita mengklon, kita perlu tahu data apa yang ada padanya.
            // Mari kita ubah createCard sedikit.
            
            // Batal. Kod asal untuk klon adalah betul.
            // Mari kita uji klon itu.
            // `card.cloneNode(true)` TIDAK menyalin event listener.
            // Kita perlu tambah event listener pada klon secara manual.
            
            // TUNGGU. Kita tidak perlu event listener pada klon.
            // Oh, kita perlu. Jika marquee itu panjang, pengguna mungkin klik pada klon.
            
            // OK, mari kita betulkan klon itu juga.
            marqueeTrack.appendChild(card.cloneNode(true));
        });
        
        // ... OK, kod klon asal adalah betul.
        // Mari kita betulkan event listener pada klon
        
        // Dapatkan SEMUA kad (asal + klon)
        const allCards = marqueeTrack.querySelectorAll('.angkatan-card');
        const allData = []; // Data untuk 27 kad asal

        // 1. Kumpul data asal
        allData.push(ketuaData);
        for (let i = 0; i < 26; i++) {
            allData.push(memberData[i % memberData.length]);
        }

        // 2. Pasang event listener pada SEMUA kad (termasuk klon)
        allCards.forEach((card, index) => {
            // Tentukan data berdasarkan indeks
            const dataIndex = index % allData.length; // 27 kad asal
            const cardData = allData[dataIndex];
            const isKetua = (dataIndex === 0);
            
            // Buang event listener lama (jika ada) untuk elak berganda
            // Ini cara yang lebih selamat
            card.replaceWith(card.cloneNode(true)); // Klon baru tanpa listener
            const newCard = allCards[index]; // Dapatkan rujukan baru (ini rumit)
        });

        // KITA BUAT SEMULA LOGIK GENERATE MARQUEE.
        // Cara lama itu tidak efisien.
        
        // --- 4. (CARA BARU) JANA (GENERATE) 27 KAD ---
        // KITA AKAN BUAT SEMULA FUNGSI generateMarquee
        
    } // Tutup fungsi generateMarquee yang lama
    
    // --- 5. JALANKAN SEMUA FUNGSI ---
    // generateMarquee(); // Jangan panggil yang lama
    
    // --- 4. (BARU) JANA (GENERATE) 27 KAD + KLON ---
    
    const originalCardData = []; // Array untuk simpan data 27 kad
    
    // 1. Tambah Kad Ketua
    originalCardData.push(ketuaData);
    
    // 2. Tambah 26 Kad Ahli
    for (let i = 0; i < 26; i++) {
        originalCardData.push(memberData[i % memberData.length]);
    }
    
    // 3. Buat kad asal DAN klon, dan pasang event listener
    [...originalCardData, ...originalCardData].forEach((data, index) => {
        const isKetua = (data.name === "Dude"); // Cara mudah untuk kenal pasti ketua
        const card = createCard(data, isKetua);
        marqueeTrack.appendChild(card);
    });
    

    // --- 5. (BARU) JALANKAN SEMUA FUNGSI ---
    // generateMarquee(); // Fungsi lama kini diganti dengan kod di atas
    

    // Tutup modal jika klik di luar
    window.onclick = function(event) {
        if (event.target === modalContainer) {
            closeModal();
        }
    }
});
