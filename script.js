document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Premium System Active.");

    // INisialisasi Komponen Interaktif Bootstrap 4 (Sesuai Kebutuhan Gambar Prosedur)
    // 1. Mengaktifkan Fitur Tooltip pada tombol Quick View Katalog
    $('[data-toggle-tooltip="tooltip"]').tooltip();

    // 2. Mengaktifkan Fitur Popover pada teks jaminan higienitas
    $('[data-toggle="popover"]').popover();


    // ================= 3. FITUR NAVIGASI (SPA ROUTING SYSTEM) =================
    const navLinks = document.querySelectorAll("[data-target-page]");
    const sections = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute("data-target-page");

            // Matikan semua section halaman, hidupkan yang dipilih
            sections.forEach(section => {
                section.classList.remove("active-page");
                if (section.id === `page-${targetPage}`) {
                    section.classList.add("active-page");
                }
            });

            // Sinkronisasi status class '.active' pada elemen Navbar
            document.querySelectorAll(".nav-link-premium").forEach(nav => {
                nav.classList.remove("active");
            });
            
            // Berikan class active ke menu navbar yang sesuai
            const matchedNavLink = document.querySelector(`.nav-link-premium[data-target-page="${targetPage}"]`);
            if (matchedNavLink) {
                matchedNavLink.classList.add("active");
            }

            // Tutup menu navbar otomatis di tampilan handphone saat diklik (Responsive)
            const navbarCollapse = document.getElementById("mainNavbar");
            if (navbarCollapse.classList.contains("show")) {
                $("#mainNavbar").collapse("hide");
            }

            // Geser scroll otomatis ke bagian paling atas halaman
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });


    // ================= 4. FITUR KATALOG MENU (MODAL QUICK VIEW DATA) =================
    $('.btn-detail-trigger').on('click', function () {
        const namaProduk = $(this).data('name');
        const deskripsiProduk = $(this).data('desc');

        // Memasukkan teks dinamis ke dalam komponen modal
        document.getElementById("modalNamaProduk").innerText = namaProduk;
        document.getElementById("modalDescProduk").innerText = deskripsiProduk;
    });


    // ================= 5. FITUR INTERAKTIF FAQ ACCORDION (TENTANG KAMI) =================
    $('#faqAccordion').on('show.bs.collapse', function (e) {
        // Memutar ikon panah indikator saat dibuka
        $(e.target).prev('.faq-header').find('.faq-icon').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    }).on('hide.bs.collapse', function (e) {
        // Mengembalikan ikon panah indikator saat ditutup
        $(e.target).prev('.faq-header').find('.faq-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    });


    // ================= 6. FITUR VALIDASI FORMULIR DIGITAL (LOADING STATE & ALERT) =================
    const formKontak = document.getElementById("formKontak");
    const contactAlert = document.getElementById("contactAlert");
    const btnSubmit = document.getElementById("btnSubmit");
    const btnText = document.getElementById("btnText");

    if (formKontak) {
        formKontak.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Mengecek validasi form bawaan HTML5
            if (formKontak.checkValidity() === false) {
                formKontak.classList.add("was-validated");
            } else {
                // Skenario jika form berhasil divalidasi dengan lengkap
                formKontak.classList.remove("was-validated");
                btnSubmit.disabled = true;
                // State loading diaktifkan memberikan kepastian interaksi ke user (Sesuai Dokumen Gambar)
                btnText.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> MEMPROSES...`;

                // Mensimulasikan pengiriman data selama 1.5 detik
                setTimeout(() => {
                    contactAlert.classList.remove("d-none");
                    formKontak.reset(); // Mengosongkan isian form kembali
                    btnSubmit.disabled = false;
                    btnText.innerHTML = `KIRIM FORMULIR <i class="fas fa-paper-plane ml-1"></i>`;

                    // Menyembunyikan notifikasi sukses secara otomatis setelah 4 detik
                    setTimeout(() => {
                        contactAlert.classList.add("d-none");
                    }, 4000);
                }, 1500);
            }
        }, false);
    }
});
