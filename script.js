document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Premium System Active.");

    // Inisialisasi Fitur Interaktif Bootstrap 4
    $('[data-toggle-tooltip="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // ================= FITUR NAVIGASI (SPA ROUTING SYSTEM) =================
    const navLinks = document.querySelectorAll("[data-target-page]");
    const sections = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute("data-target-page");

            // Menyembunyikan semua seksi halaman dan menyalakan seksi yang dipilih
            sections.forEach(section => {
                section.classList.remove("active-page");
                if (section.id === `page-${targetPage}`) {
                    section.classList.add("active-page");
                }
            });

            // Sinkronisasi status class aktif (.active) di elemen link navigasi
            document.querySelectorAll(".nav-link-premium").forEach(nav => {
                nav.classList.remove("active");
            });
            
            const matchedNavLink = document.querySelector(`.nav-link-premium[data-target-page="${targetPage}"]`);
            if (matchedNavLink) {
                matchedNavLink.classList.add("active");
            }

            // Menutup menu drop-down navbar otomatis jika dibuka di handphone
            const navbarCollapse = document.getElementById("mainNavbar");
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                $("#mainNavbar").collapse("hide");
            }

            // Menggulung halaman otomatis secara halus ke bagian paling atas
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ================= DETAIL KATALOG MODAL DATA DATA DATA =================
    $('.btn-detail-trigger').on('click', function () {
        const namaProduk = $(this).data('name');
        const deskripsiProduk = $(this).data('desc');

        document.getElementById("modalNamaProduk").innerText = namaProduk;
        document.getElementById("modalDescProduk").innerText = deskripsiProduk;
    });

    // ================= INTERAKTIF FAQ ACCORDION ICON ROTATION =================
    $('#faqAccordion').on('show.bs.collapse', function (e) {
        $(e.target).prev('.faq-header').find('.faq-icon').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    }).on('hide.bs.collapse', function (e) {
        $(e.target).prev('.faq-header').find('.faq-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    });

    // ================= VALIDASI FORM DIGITAL & FEEDBACK =================
    const formKontak = document.getElementById("formKontak");
    const contactAlert = document.getElementById("contactAlert");
    const btnSubmit = document.getElementById("btnSubmit");
    const btnText = document.getElementById("btnText");

    if (formKontak) {
        formKontak.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (formKontak.checkValidity() === false) {
                formKontak.classList.add("was-validated");
            } else {
                formKontak.classList.remove("was-validated");
                btnSubmit.disabled = true;
                btnText.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> MEMPROSES...`;

                setTimeout(() => {
                    contactAlert.classList.remove("d-none");
                    formKontak.reset();
                    btnSubmit.disabled = false;
                    btnText.innerHTML = `KIRIM FORMULIR <i class="fas fa-paper-plane ml-1"></i>`;

                    setTimeout(() => {
                        contactAlert.classList.add("d-none");
                    }, 4000);
                }, 1500);
            }
        }, false);
    }
});
