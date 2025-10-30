document.addEventListener("DOMContentLoaded", function() {

    // --- Logik Marquee ---
    // Ini untuk memastikan marquee berulang dengan lancar
    
    const marqueeTrack = document.querySelector('.marquee-track');
    // Dapatkan semua kad asal
    const originalCards = Array.from(marqueeTrack.children);
    
    // Gandakan setiap kad dan tambahkannya ke dalam trek
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        marqueeTrack.appendChild(clone);
    });

    
    // --- Logik Modal ---
    
    // Dapatkan elemen yang diperlukan
    const ketuaCard = document.getElementById('ketuaCard');
    const ketuaModal = document.getElementById('ketuaModal');
    const closeModalButton = document.getElementById('closeModal');

    // 1. Buka modal apabila kad ketua diklik
    if (ketuaCard) {
        ketuaCard.onclick = function() {
            ketuaModal.style.display = "block";
        }
    }

    // 2. Tutup modal apabila butang 'x' diklik
    // Ini akan berfungsi 100% kerana ia menargetkan ID
    if (closeModalButton) {
        closeModalButton.onclick = function() {
            ketuaModal.style.display = "none";
        }
    }

    // 3. Tutup modal apabila pengguna klik di luar kawasan modal
    window.onclick = function(event) {
        if (event.target === ketuaModal) {
            ketuaModal.style.display = "none";
        }
    }
});
