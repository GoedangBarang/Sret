// Data Produk (Contoh - Ganti dengan data produk Anda dari Blogspot atau API eksternal)
        const allProducts = [
            {
                id: 1,
                name: "Smartphone Canggih X1",
                price: 3500000,
                category: "elektronik",
                image: "https://placehold.co/300x300/3b82f6/ffffff?text=Smartphone+X1",
                description: "Smartphone terbaru dengan kamera 108MP dan layar AMOLED. Performa super cepat untuk gaming dan multitasking.",
                tags: ["hp", "android", "kamera bagus"]
            },
            {
                id: 2,
                name: "Laptop Gaming Pro G7",
                price: 12500000,
                category: "elektronik",
                image: "https://placehold.co/300x300/10b981/ffffff?text=Laptop+Gaming",
                description: "Laptop gaming dengan prosesor Intel Core i7 generasi terbaru, RTX 3060, dan layar 144Hz.",
                tags: ["laptop", "intel", "nvidia", "game"]
            },
            {
                id: 3,
                name: "Kaos Katun Premium",
                price: 150000,
                category: "fashion",
                image: "https://placehold.co/300x300/ef4444/ffffff?text=Kaos+Katun",
                description: "Kaos katun combed 30s yang nyaman dipakai sehari-hari. Tersedia berbagai warna.",
                tags: ["baju", "pakaian", "casual"]
            },
            {
                id: 4,
                name: "Sepatu Lari ZoomR",
                price: 750000,
                category: "olahraga",
                image: "https://placehold.co/300x300/f59e0b/ffffff?text=Sepatu+Lari",
                description: "Sepatu lari ringan dengan teknologi bantalan responsif untuk kenyamanan maksimal.",
                tags: ["alas kaki", "sport", "running"]
            },
            {
                id: 5,
                name: "Blender Multifungsi",
                price: 450000,
                category: "rumah-tangga",
                image: "https://placehold.co/300x300/8b5cf6/ffffff?text=Blender",
                description: "Blender serbaguna untuk membuat jus, smoothie, dan menghaluskan bumbu dapur.",
                tags: ["dapur", "alat masak", "jus"]
            },
            {
                id: 6,
                name: "Kemeja Flanel Pria",
                price: 280000,
                category: "fashion",
                image: "https://placehold.co/300x300/6366f1/ffffff?text=Kemeja+Flanel",
                description: "Kemeja flanel lengan panjang dengan motif kotak-kotak klasik. Cocok untuk gaya kasual.",
                tags: ["baju pria", "kemeja", "flanel"]
            },
            {
                id: 7,
                name: "Smartwatch SW200",
                price: 1200000,
                category: "elektronik",
                image: "https://placehold.co/300x300/ec4899/ffffff?text=Smartwatch",
                description: "Smartwatch dengan fitur lengkap: monitor detak jantung, GPS, notifikasi, dan tahan air.",
                tags: ["jam tangan pintar", "wearable", "gadget"]
            },
            {
                id: 8,
                name: "Tas Ransel Outdoor",
                price: 320000,
                category: "olahraga",
                image: "https://placehold.co/300x300/06b6d4/ffffff?text=Tas+Ransel",
                description: "Tas ransel kapasitas besar, tahan air, cocok untuk hiking dan traveling.",
                tags: ["tas", "backpack", "hiking", "travel"]
            }
        ];

        let cart = []; // Inisialisasi keranjang belanja

        // Fungsi untuk menampilkan produk
        function displayProducts(productsToDisplay) {
            const productList = document.getElementById('productList');
            const noResultsMessage = document.getElementById('noResultsMessage');
            if (!productList || !noResultsMessage) {
                console.error("Elemen #productList atau #noResultsMessage tidak ditemukan.");
                return;
            }
            productList.innerHTML = ''; 

            if (productsToDisplay.length === 0) {
                noResultsMessage.classList.remove('hidden');
                productList.classList.add('hidden');
                return;
            }
            
            noResultsMessage.classList.add('hidden');
            productList.classList.remove('hidden');

            productsToDisplay.forEach(product => {
                const productCard = `
                    <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
                        <div class="relative">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/300x300/e2e8f0/94a3b8?text=Error+Memuat';">
                            ${product.id % 3 === 0 ? '<span class="badge">Diskon!</span>' : ''}
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2 truncate" title="${product.name}">${product.name}</h3>
                            <p class="text-gray-600 mb-1 text-sm">Kategori: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                            <p class="text-2xl font-bold text-blue-600 mb-4">Rp ${product.price.toLocaleString('id-ID')}</p>
                            <div class="mt-auto flex space-x-2">
                                <button onclick="openProductModal(${product.id})" class="flex-1 btn-secondary py-2 px-4 rounded-md text-sm font-medium"><i class="fas fa-eye mr-1"></i> Detail</button>
                                <button onclick="addToCart(${product.id}, 1)" class="flex-1 btn-primary py-2 px-4 rounded-md text-sm font-medium"><i class="fas fa-cart-plus mr-1"></i> Keranjang</button>
                            </div>
                        </div>
                    </div>
                `;
                productList.innerHTML += productCard;
            });
        }

        function formatPrice(price) {
            return `Rp ${price.toLocaleString('id-ID')}`;
        }

        function performSearch() {
            const searchInput = document.getElementById('searchInput');
            if (!searchInput) return;
            const searchTerm = searchInput.value.toLowerCase();
            applyFilters(searchTerm);
        }
        
        const searchInputGlobal = document.getElementById('searchInput');
        if (searchInputGlobal) {
            searchInputGlobal.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    performSearch();
                }
            });
        }

        function applyFilters(searchTerm = null) {
            const categoryFilterEl = document.getElementById('filterCategory');
            const priceFilterEl = document.getElementById('filterPrice');
            const searchInputEl = document.getElementById('searchInput');

            if (!categoryFilterEl || !priceFilterEl || !searchInputEl) {
                 console.error("Elemen filter atau search input tidak ditemukan.");
                 return;
            }

            const categoryFilter = categoryFilterEl.value;
            const priceFilter = priceFilterEl.value;
            const currentSearchTerm = searchTerm !== null ? searchTerm : searchInputEl.value.toLowerCase();

            let filteredProducts = allProducts.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(currentSearchTerm) || (product.tags && product.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm)));
                const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
                
                let priceMatch = true;
                if (priceFilter !== 'all') {
                    const [minPriceStr, maxPriceStr] = priceFilter.split('-');
                    const minPrice = parseInt(minPriceStr);
                    if (maxPriceStr === undefined || maxPriceStr === '+') { 
                        priceMatch = product.price >= minPrice;
                    } else {
                        priceMatch = product.price >= minPrice && product.price <= parseInt(maxPriceStr);
                    }
                }
                return nameMatch && categoryMatch && priceMatch;
            });
            displayProducts(filteredProducts);
        }
        
        const cartButton = document.getElementById('cartButton');
        const cartModalBackdrop = document.getElementById('cartModalBackdrop');
        const cartModal = document.getElementById('cartModal');
        const closeCartModal = document.getElementById('closeCartModal');
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartItemCountElement = document.getElementById('cartItemCount');
        const checkoutButton = document.getElementById('checkoutButton');
        const emptyCartMessage = document.getElementById('emptyCartMessage');

        function addToCart(productId, quantity = 1) {
            const product = allProducts.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...product, quantity: quantity });
            }
            updateCartDisplay();
            showToast(`${product.name} ditambahkan ke keranjang!`);
        }

        function updateCartDisplay() {
            if (!cartItemsContainer || !cartTotalElement || !cartItemCountElement || !emptyCartMessage || !checkoutButton) {
                console.error("Satu atau lebih elemen keranjang tidak ditemukan.");
                return;
            }
            cartItemsContainer.innerHTML = ''; 
            let total = 0;
            let itemCount = 0;

            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                checkoutButton.disabled = true;
            } else {
                emptyCartMessage.classList.add('hidden');
                checkoutButton.disabled = false;
                cart.forEach(item => {
                    const itemElement = `
                        <div class="flex items-center justify-between py-3 border-b last:border-b-0">
                            <div class="flex items-center">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-4" onerror="this.onerror=null;this.src='https://placehold.co/64x64/e2e8f0/94a3b8?text=Err';">
                                <div>
                                    <h4 class="font-semibold text-gray-700 truncate w-48" title="${item.name}">${item.name}</h4>
                                    <p class="text-sm text-gray-500">${formatPrice(item.price)}</p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" class="w-16 text-center border rounded-md p-1 mr-2">
                                <p class="font-semibold text-gray-700 w-24 text-right">${formatPrice(item.price * item.quantity)}</p>
                                <button onclick="removeFromCart(${item.id})" class="ml-4 text-red-500 hover:text-red-700"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.innerHTML += itemElement;
                    total += item.price * item.quantity;
                    itemCount += item.quantity;
                });
            }
            
            cartTotalElement.textContent = formatPrice(total);
            cartItemCountElement.textContent = itemCount;
            cartItemCountElement.classList.toggle('hidden', itemCount === 0);
        }

        function updateQuantity(productId, newQuantity) {
            const quantity = parseInt(newQuantity);
            if (isNaN(quantity)) return; 
            
            if (quantity < 1) {
                removeFromCart(productId);
                return;
            }
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity = quantity;
            }
            updateCartDisplay();
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartDisplay();
        }

        if (cartButton && cartModal && cartModalBackdrop && closeCartModal) {
            cartButton.addEventListener('click', () => {
                cartModal.classList.remove('hidden', 'opacity-0', 'scale-95');
                cartModalBackdrop.classList.remove('hidden');
            });
            closeCartModal.addEventListener('click', () => {
                closeCartModalAndBackdrop();
            });
            cartModalBackdrop.addEventListener('click', () => {
                closeCartModalAndBackdrop();
            });
        }
        
        // Fungsi untuk menutup modal keranjang
        function closeCartModalAndBackdrop() {
            if (cartModal && cartModalBackdrop) {
                cartModal.classList.add('hidden', 'opacity-0', 'scale-95');
                cartModalBackdrop.classList.add('hidden');
            }
        }

        if (checkoutButton) {
            checkoutButton.addEventListener('click', async () => { // Jadikan async
                if (cart.length > 0) {
                    // 1. Kumpulkan detail pesanan
                    const grossAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const orderId = "ORDER-" + new Date().getTime() + "-" + Math.random().toString(36).substr(2, 5).toUpperCase();

                    const orderDetails = {
                        transaction_details: {
                            order_id: orderId,
                            gross_amount: grossAmount,
                        },
                        item_details: cart.map(item => ({
                            id: item.id.toString(),
                            price: item.price,
                            quantity: item.quantity,
                            name: item.name.substring(0, 50) // Midtrans punya batasan panjang nama
                        })),
                        customer_details: { // Detail pelanggan contoh, idealnya diambil dari form
                            first_name: "Pelanggan",
                            last_name: "TokoKu",
                            email: "pelanggan@example.com", // Ganti dengan email valid
                            phone: "081234567890" // Ganti dengan nomor telepon valid
                        }
                        // Anda bisa menambahkan callback URLs di sini jika backend Anda mengaturnya
                        // "callbacks": {
                        //   "finish": "https://tokoanda.blogspot.com/p/payment-success.html"
                        // }
                    };

                    // 2. Panggil fungsi untuk memulai pembayaran Midtrans
                    try {
                        showToast('Memproses pembayaran dengan Midtrans...');
                        checkoutButton.disabled = true;
                        checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Memproses...';

                        // ==============================================================================
                        // PERHATIAN: INTEGRASI MIDTRANS SEBENARNYA MEMBUTUHKAN BACKEND!
                        // Kode di bawah ini adalah SIMULASI dan KONSEP.
                        // Anda WAJIB membuat endpoint backend (misalnya di Google Cloud Functions, Vercel, dll.)
                        // yang aman berkomunikasi dengan API Midtrans untuk mendapatkan snap_token.
                        // JANGAN PERNAH MENYIMPAN SERVER KEY MIDTRANS ANDA DI CLIENT-SIDE JAVASCRIPT.
                        // Endpoint fiktif: '/api/create-midtrans-transaction'
                        // ==============================================================================
                        
                        // Ganti URL ini dengan URL endpoint backend Anda yang sebenarnya.
                        // const backendEndpoint = 'URL_BACKEND_ANDA_UNTUK_CREATE_TRANSACTION';
                        // const response = await fetch(backendEndpoint, {
                        //     method: 'POST',
                        //     headers: { 'Content-Type': 'application/json', },
                        //     body: JSON.stringify(orderDetails)
                        // });

                        // SIMULASI: Anggap saja backend mengembalikan snap_token setelah 1 detik.
                        // HAPUS SIMULASI INI DAN GUNAKAN FETCH KE BACKEND ASLI ANDA.
                        await new Promise(resolve => setTimeout(resolve, 1000)); 
                        const simulatedPaymentData = { snap_token: "SNAP_TOKEN_DARI_BACKEND_ANDA" }; 
                        // AKHIR SIMULASI

                        // if (!response.ok) {
                        //     const errorData = await response.json().catch(() => ({ message: "Gagal memproses permintaan ke backend." }));
                        //     throw new Error(`Gagal mendapatkan token Midtrans: ${errorData.message || response.statusText}`);
                        // }
                        // const paymentData = await response.json(); // Harusnya berisi snap_token

                        const paymentData = simulatedPaymentData; // Gunakan data simulasi

                        if (paymentData.snap_token && paymentData.snap_token !== "SNAP_TOKEN_DARI_BACKEND_ANDA") { // Cek jika token asli
                            if (typeof snap !== 'undefined') {
                                snap.pay(paymentData.snap_token, {
                                    onSuccess: function(result){
                                        console.log('Pembayaran Berhasil:', result);
                                        showToast('Pembayaran berhasil! Terima kasih.');
                                        // Arahkan ke halaman sukses atau tampilkan pesan
                                        // window.location.href = '/p/payment-success.html?order_id=' + result.order_id;
                                        cart = [];
                                        updateCartDisplay();
                                        closeCartModalAndBackdrop();
                                    },
                                    onPending: function(result){
                                        console.log('Pembayaran Tertunda:', result);
                                        showToast('Pembayaran Anda tertunda. Silakan selesaikan.');
                                        // Arahkan ke halaman pending atau tampilkan pesan
                                        // window.location.href = '/p/payment-pending.html?order_id=' + result.order_id;
                                        closeCartModalAndBackdrop();
                                    },
                                    onError: function(result){
                                        console.error('Pembayaran Gagal:', result);
                                        showToast('Pembayaran gagal. Silakan coba lagi.');
                                    },
                                    onClose: function(){
                                        showToast('Anda menutup jendela pembayaran.');
                                    }
                                });
                            } else {
                                console.error("Midtrans Snap.js tidak dimuat. Pastikan script Snap.js sudah ditambahkan di <head>.");
                                showToast("Error: Gagal memuat library pembayaran.");
                            }
                        } else if (paymentData.snap_token === "SNAP_TOKEN_DARI_BACKEND_ANDA") {
                             // Ini masih menggunakan token placeholder, berarti backend belum diimplementasikan
                            console.warn("Menggunakan Snap Token placeholder. Implementasikan backend Anda.");
                            showToast("Mode Demo: Lanjutkan dengan token placeholder.");
                             // Untuk demo, kita bisa coba redirect ke halaman Midtrans dengan parameter (TIDAK AMAN UNTUK PRODUKSI)
                             // atau cukup tampilkan pesan bahwa ini adalah simulasi.
                             alert("Ini adalah simulasi pembayaran Midtrans.\nAnda perlu mengimplementasikan backend untuk mendapatkan Snap Token asli.\n\nDetail Pesanan:\n" + JSON.stringify(orderDetails, null, 2));

                        } else if (paymentData.redirect_url) { // Jika backend mengembalikan redirect_url
                             window.location.href = paymentData.redirect_url;
                        } else {
                            throw new Error("Format respons dari backend tidak dikenali.");
                        }

                    } catch (error) {
                        console.error('Error saat proses checkout Midtrans:', error);
                        showToast(`Error: ${error.message}. Coba lagi.`);
                    } finally {
                        // Aktifkan kembali tombol checkout jika tidak ada redirect atau Snap popup
                        if (!(typeof snap !== 'undefined' && paymentData && paymentData.snap_token && paymentData.snap_token !== "SNAP_TOKEN_DARI_BACKEND_ANDA") && !(paymentData && paymentData.redirect_url)) {
                           checkoutButton.disabled = false;
                           checkoutButton.innerHTML = 'Lanjut ke Pembayaran';
                        }
                    }
                }
            });
        }


        const productModalBackdrop = document.getElementById('productModalBackdrop');
        const productModal = document.getElementById('productModal');
        const closeProductModal = document.getElementById('closeProductModal');
        const productModalName = document.getElementById('productModalName');
        const productModalImage = document.getElementById('productModalImage');
        const productModalDescription = document.getElementById('productModalDescription');
        const productModalPrice = document.getElementById('productModalPrice');
        const productModalQuantityInput = document.getElementById('productModalQuantity');
        const productModalAddToCartButton = document.getElementById('productModalAddToCart');
        let currentProductIdInModal = null;

        function openProductModal(productId) {
            const product = allProducts.find(p => p.id === productId);
            if (!product || !productModalName || !productModalImage || !productModalDescription || !productModalPrice || !productModalQuantityInput || !productModal || !productModalBackdrop) {
                console.error("Elemen modal produk atau produk tidak ditemukan.");
                return;
            }

            currentProductIdInModal = productId;
            productModalName.textContent = product.name;
            productModalImage.src = product.image;
            productModalImage.alt = product.name;
            productModalDescription.textContent = product.description;
            productModalPrice.textContent = formatPrice(product.price);
            productModalQuantityInput.value = 1;

            productModal.classList.remove('hidden', 'opacity-0', 'scale-95');
            productModalBackdrop.classList.remove('hidden');
        }

        function closeProductModalAndBackdrop() {
             if (productModal && productModalBackdrop) {
                productModal.classList.add('hidden', 'opacity-0', 'scale-95');
                productModalBackdrop.classList.add('hidden');
            }
        }

        if (closeProductModal && productModal && productModalBackdrop) {
            closeProductModal.addEventListener('click', () => {
                closeProductModalAndBackdrop();
            });
            productModalBackdrop.addEventListener('click', () => {
                closeProductModalAndBackdrop();
            });
        }
        
        if (productModalAddToCartButton) {
            productModalAddToCartButton.addEventListener('click', () => {
                if (currentProductIdInModal && productModalQuantityInput) {
                    const quantity = parseInt(productModalQuantityInput.value) || 1;
                    addToCart(currentProductIdInModal, quantity);
                    closeProductModalAndBackdrop();
                }
            });
        }

        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        function showToast(message) {
            const existingToast = document.querySelector('.custom-toast-notification');
            if (existingToast) {
                existingToast.remove();
            }

            const toast = document.createElement('div');
            toast.className = 'custom-toast-notification fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-lg z-[1000] animate-fadeInOutToast'; // Z-index tinggi
            toast.textContent = message;
            document.body.appendChild(toast);

            const styleCheck = document.getElementById('toastAnimationStyle');
            if (!styleCheck) {
                const style = document.createElement('style');
                style.id = 'toastAnimationStyle';
                style.innerHTML = `
                    @keyframes fadeInOutToast {
                        0% { opacity: 0; transform: translateY(20px); }
                        10% { opacity: 1; transform: translateY(0); }
                        90% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(20px); }
                    }
                    .animate-fadeInOutToast {
                        animation: fadeInOutToast 3s ease-in-out forwards;
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        document.addEventListener('DOMContentLoaded', () => {
            displayProducts(allProducts); 
            updateCartDisplay(); 
            const currentYearEl = document.getElementById('currentYear');
            if (currentYearEl) {
                currentYearEl.textContent = new Date().getFullYear();
            }
            applyFilters(); 
        });