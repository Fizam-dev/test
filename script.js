// Dapatkan elemen
const ketuaCard = document.getElementById('ketuaCard');
const ketuaModal = document.getElementById('ketuaModal');
const closeModalButton = document.getElementById('closeModal');

// Fungsi untuk membuka modal apabila kad diklik
ketuaCard.onclick = function() {
  ketuaModal.style.display = "block";
}

// Fungsi untuk menutup modal apabila butang 'x' diklik
closeModalButton.onclick = function() {
  ketuaModal.style.display = "none";
}

// Fungsi untuk menutup modal apabila pengguna klik di luar modal
window.onclick = function(event) {
  if (event.target === ketuaModal) {
    ketuaModal.style.display = "none";
  }
}

// Catatan: Jika kamu ingin efek Marquee tradisional untuk teks D U D E, 
// kamu perlu menyesuaikan CSS dan mungkin menambah JavaScript untuk animasi,
// tetapi untuk UI moden, kaedah carousel/swipe yang saya buat ini lebih sesuai.
