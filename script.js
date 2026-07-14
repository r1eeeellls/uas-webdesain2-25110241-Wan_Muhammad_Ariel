document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Premium System with Cart Feature Active.");

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
            navigateToPage(targetPage);
        });
    });

    function navigateToPage(targetPage) {
        sections.forEach(section => {
            section.classList.remove("active-page");
            if (section.id === `page-${targetPage}`) {
                section.classList.add("active-page");
            }
        });

        document.querySelectorAll(".nav-link-premium").forEach(nav => {
            nav.classList.remove("active");
        });
        
        const matchedNavLink = document.querySelector(`.nav-link-premium[data-target-page="${targetPage}"]`);
        if (matchedNavLink) {
            matchedNavLink.classList.add("active");
        }

        const navbarCollapse = document.getElementById("mainNavbar");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            $("#mainNavbar").collapse("hide");
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Menghubungkan tombol jumbotron ke SPA
    const btnExplore = document.getElementById("btn-explore-menu");
    const btnLearn = document.getElementById("btn-learn-about");
    if(btnExplore) { btnExplore.addEventListener("click", () => navigateToPage("menu")); }
    if(btnLearn) { btnLearn.addEventListener("click", () => navigateToPage("about")); }

    // ================= DETAIL KATALOG MODAL DATA =================
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


    // ================= FITUR MANAGEMEN KERANJANG BELANJA (CART SYSTEM) =================
    let cart = [];

    // Fungsi memperbarui Tampilan Counter & Isi Modal Keranjang
    function updateCartUI() {
        const cartTableBody = document.getElementById("cart-table-body");
        const cartEmptyMsg = document.getElementById("cart-empty-msg");
        const cartTotalPrice = document.getElementById("cart-total-price");
        const cartCounter = document.getElementById("cart-counter");

        cartCounter.innerText = cart.length;
        cartTableBody.innerHTML = "";

        if (cart.length === 0) {
            cartEmptyMsg.classList.remove("d-none");
            cartTotalPrice.innerText = "Rp 0";
            return;
        }

        cartEmptyMsg.classList.add("d-none");
        let grandTotal = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            grandTotal += subtotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="text-left font-weight-bold text-dark align-middle">${item.name}</td>
                <td class="align-middle">Rp ${item.price.toLocaleString("id-ID")}</td>
                <td class="align-middle">
                    <div class="input-group input-group-sm justify-content-center">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-dark btn-qty-minus rounded-0" data-index="${index}">-</button>
                        </div>
                        <input type="text" class="form-control text-center p-0" value="${item.quantity}" readonly style="max-width: 40px; font-weight: bold;">
                        <div class="input-group-append">
                            <button class="btn btn-outline-dark btn-qty-plus rounded-0" data-index="${index}">+</button>
                        </div>
                    </div>
                </td>
                <td class="align-middle font-weight-bold text-danger">Rp ${subtotal.toLocaleString("id-ID")}</td>
                <td class="align-middle">
                    <button class="btn btn-sm btn-danger btn-remove-item rounded-0" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });

        cartTotalPrice.innerText = `Rp ${grandTotal.toLocaleString("id-ID")}`;
        attachCartEvents();
    }

    // Listener interaksi di dalam Tabel Keranjang (Tambah, Kurang, Hapus)
    function attachCartEvents() {
        document.querySelectorAll(".btn-qty-plus").forEach(btn => {
            btn.onclick = function() {
                const idx = this.getAttribute("data-index");
                cart[idx].quantity += 1;
                updateCartUI();
            };
        });

        document.querySelectorAll(".btn-qty-minus").forEach(btn => {
            btn.onclick = function() {
                const idx = this.getAttribute("data-index");
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity -= 1;
                } else {
                    cart.splice(idx, 1);
                }
                updateCartUI();
            };
        });

        document.querySelectorAll(".btn-remove-item").forEach(btn => {
            btn.onclick = function() {
                const idx = this.getAttribute("data-index");
                cart.splice(idx, 1);
                updateCartUI();
            };
        });
    }

    // Tombol PESAN di Katalog ditekan (Menambahkan ke Keranjang)
    $('.btn-add-to-cart').on('click', function () {
        const name = $(this).data('name');
        const price = parseInt($(this).data('price'));

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: name, price: price, quantity: 1 });
        }

        updateCartUI();
        alert(`"${name}" berhasil ditambahkan ke keranjang belanja.`);
    });


    // ================= PROSES CHECKOUT KE WHATSAPP PENJUAL =================
    const btnCheckout = document.getElementById("btn-checkout-whatsapp");
    if(btnCheckout) {
        btnCheckout.addEventListener("click", function() {
            if (cart.length === 0) {
                alert("Keranjang belanja Anda masih kosong! Silakan pilih risol terlebih dahulu.");
                return;
            }

            const buyerName = document.getElementById("cart-buyer-name").value.trim();
            if (buyerName === "") {
                alert("Mohon masukkan nama pemesan terlebih dahulu untuk memudahkan penjual.");
                document.getElementById("cart-buyer-name").focus();
                return;
            }

            const deliveryMethod = document.getElementById("cart-delivery-method").value;
            const targetPhone = "6285371646103"; 

            let textWA = `*HALO DAILY RUBY PEKANBARU*\n`;
            textWA += `Saya ingin memesan risol premium dengan rincian berikut:\n\n`;
            textWA += `👤 *Nama Pemesan:* ${buyerName}\n`;
            textWA += `🚚 *Metode Penyerahan:* ${deliveryMethod}\n`;
            textWA += `---------------------------------------------------------\n`;

            let totalHarga = 0;
            cart.forEach((item, index) => {
                const subtotal = item.price * item.quantity;
                totalHarga += subtotal;
                textWA += `${index + 1}. *${item.name}* (${item.quantity} pcs) - Rp ${subtotal.toLocaleString("id-ID")}\n`;
            });

            textWA += `---------------------------------------------------------\n`;
            textWA += `💰 *TOTAL HARGA:* Rp ${totalHarga.toLocaleString("id-ID")}\n\n`;
            textWA += `Mohon segera konfirmasi pesanan saya ya admin. Terima kasih!`;

            const encodedText = encodeURIComponent(textWA);
            const waURL = `https://wa.me/${targetPhone}?text=${encodedText}`;

            cart = [];
            updateCartUI();
            document.getElementById("cart-buyer-name").value = "";
            $('#modalCart').modal('hide');
            window.open(waURL, "_blank");
        });
    }

});
