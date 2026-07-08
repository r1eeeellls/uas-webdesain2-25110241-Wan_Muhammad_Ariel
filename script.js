document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. MEKANISME ROUTER SINGLE PAGE APPLICATION (SPA) ---
    function navigateToPage(pageId) {
        // Sembunyikan seluruh section halaman yang ada
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active-page');
        });

        // Tampilkan halaman target utama
        const targetSection = document.getElementById(`page-${pageId}`);
        if (targetSection) {
            targetSection.classList.add('active-page');
        }

        // Perbarui status tautan aktif di Navbar menu
        document.querySelectorAll('.navbar-nav .nav-item').forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('.nav-link');
            if (link && link.getAttribute('data-target-page') === pageId) {
                li.classList.add('active');
            }
        });

        // Gulirkan layar otomatis kembali ke area atas halaman
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Pasang Event Listener Klik untuk semua elemen navigasi SPA
    document.querySelectorAll('[data-target-page]').forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah reload bawaan tag tautan href '#'
            const pageId = this.getAttribute('data-target-page');
            navigateToPage(pageId);

            // Tutup menu hamburger otomatis di tampilan mobile jika terbuka
            $('.navbar-collapse').collapse('hide');
        });
    });


    // --- 2. POPUP MODAL DETAIL PRODUK DINAMIS ---
    $('#modalDetailRisol').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Tombol pemicu modal
        const namaProduk = button.data('name'); // Ambil atribut data-name
        const deskripsiProduk = button.data('desc'); // Ambil atribut data-desc
        
        const modal = $(this);
        modal.find('#modalNamaProduk').text(namaProduk);
        modal.find('#modalDescProduk').text(deskripsiProduk);
    });


    // --- 3. LOGIKA VALIDASI FORM KONTAK & LOADING STATE ---
    const form = document.getElementById('formKontak');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity() === false) {
                form.classList.add('was-validated');
            } else {
                // Skenario Form Valid: Aktifkan State Loading pada tombol kirim
                const btnSubmit = document.getElementById('btnSubmit');
                const btnText = document.getElementById('btnText');
                const alertBox = document.getElementById('contactAlert');

                btnSubmit.disabled = true;
                btnText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';

                // Simulasi proses pengiriman data AJAX selama 1.5 Detik
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('was-validated');
                    
                    // Kembalikan tombol ke kondisi semula
                    btnSubmit.disabled = false;
                    btnText.innerText = 'Kirim Pesan';

                    // Tampilkan Alert Berhasil
                    alertBox.classList.remove('d-none');
                    setTimeout(() => alertBox.classList.add('d-none'), 3000);
                }, 1500);
            }
        }, false);
    }
});