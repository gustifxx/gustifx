document.addEventListener('DOMContentLoaded', function() {
    // Elemen modal dan grid
    const modal = document.getElementById('imageGridModal');
    const imageGrid = document.querySelector('.image-grid');
    const closeBtn = document.querySelector('.close-btn');
    const gridTitle = document.querySelector('.image-grid-title');
    
    // Konfigurasi jumlah gambar per baris berdasarkan ukuran layar
    const gridConfig = {
        desktop: 4,   // 4 gambar per baris di desktop
        tablet: 3,    // 3 gambar per baris di tablet
        mobile: 2,    // 2 gambar per baris di mobile
        mobileSmall: 1 // 1 gambar per baris di mobile kecil
    };
    
    // Fungsi untuk menghitung jumlah kolom grid berdasarkan ukuran layar
    function getGridColumns() {
        const width = window.innerWidth;
        
        if (width < 480) {
            return gridConfig.mobileSmall;
        } else if (width < 768) {
            return gridConfig.mobile;
        } else if (width < 1200) {
            return gridConfig.tablet;
        } else {
            return gridConfig.desktop;
        }
    }
    
    // Fungsi untuk mengatur grid berdasarkan ukuran layar
    function setupGridColumns() {
        const columns = getGridColumns();
        imageGrid.style.gridTemplateColumns = `repeat(auto-fill, minmax(calc(100% / ${columns} - 20px), 1fr))`;
    }
    
    // Fungsi untuk membuat image grid
    function createImageGrid(images, title) {
        // Bersihkan grid sebelumnya
        imageGrid.innerHTML = '';
        
        // Set judul grid
        gridTitle.textContent = title;
        
        // Tambahkan gambar ke grid
        images.forEach((imageSrc, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'image-grid-item';
            gridItem.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${title} - Image ${index + 1}`;
            img.loading = 'lazy'; // Optimasi loading
            
            gridItem.appendChild(img);
            imageGrid.appendChild(gridItem);
            
            // Event click untuk memperbesar gambar
            gridItem.addEventListener('click', function() {
                showFullscreenImage(imageSrc, title, index, images);
            });
        });
        
        // Setup grid columns
        setupGridColumns();
    }
    
    // Fungsi untuk menampilkan gambar fullscreen
    function showFullscreenImage(src, title, index, images) {
        // Buat overlay fullscreen
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'fullscreen-overlay';
        fullscreenOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        // Container untuk gambar
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            max-width: 90%;
            max-height: 80vh;
            position: relative;
        `;
        
        // Gambar fullscreen
        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = src;
        fullscreenImg.alt = title;
        fullscreenImg.style.cssText = `
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
        `;
        
        // Navigasi
        const navContainer = document.createElement('div');
        navContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 20px;
        `;
        
        // Tombol prev
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '←';
        prevBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        prevBtn.onmouseover = () => prevBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        prevBtn.onmouseout = () => prevBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        
        // Tombol next
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '→';
        nextBtn.style.cssText = prevBtn.style.cssText;
        nextBtn.onmouseover = () => nextBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        nextBtn.onmouseout = () => nextBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        
        // Tombol close untuk fullscreen
        const fullscreenCloseBtn = document.createElement('button');
        fullscreenCloseBtn.innerHTML = '×';
        fullscreenCloseBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 40px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 2001;
        `;
        fullscreenCloseBtn.onmouseover = () => fullscreenCloseBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        fullscreenCloseBtn.onmouseout = () => fullscreenCloseBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        
        // Fungsi navigasi
        function navigateImage(direction) {
            let newIndex = index + direction;
            
            if (newIndex < 0) newIndex = images.length - 1;
            if (newIndex >= images.length) newIndex = 0;
            
            index = newIndex;
            fullscreenImg.src = images[index];
            fullscreenImg.alt = `${title} - Image ${index + 1}`;
        }
        
        // Event listeners untuk navigasi
        prevBtn.addEventListener('click', () => navigateImage(-1));
        nextBtn.addEventListener('click', () => navigateImage(1));
        fullscreenCloseBtn.addEventListener('click', () => {
            document.body.removeChild(fullscreenOverlay);
        });
        
        // Navigasi dengan keyboard
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(fullscreenOverlay);
                document.removeEventListener('keydown', handleKeyDown);
            } else if (e.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
        
        // Tambahkan event listener untuk keyboard
        document.addEventListener('keydown', handleKeyDown);
        
        // Klik di luar gambar untuk menutup
        fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target === fullscreenOverlay) {
                document.body.removeChild(fullscreenOverlay);
                document.removeEventListener('keydown', handleKeyDown);
            }
        });
        
        // Tambahkan elemen ke overlay
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        imageContainer.appendChild(fullscreenImg);
        imageContainer.appendChild(fullscreenCloseBtn);
        fullscreenOverlay.appendChild(imageContainer);
        fullscreenOverlay.appendChild(navContainer);
        
        // Tambahkan overlay ke body
        document.body.appendChild(fullscreenOverlay);
    }
    
    // Event listeners untuk card
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Cegah event jika mengklik link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Ambil data gambar dari atribut data-images
            const imagesData = this.getAttribute('data-images');
            const images = JSON.parse(imagesData);
            const title = this.querySelector('.text-card h1').textContent;
            
            // Buat dan tampilkan grid
            createImageGrid(images, title);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Mencegah scroll di background
        });
    });
    
    // Event listener untuk tombol close
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Tutup modal dengan klik di luar konten
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Tutup modal dengan tombol Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Responsive grid pada resize window
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (modal.style.display === 'block') {
                setupGridColumns();
            }
        }, 250);
    });
    
    // Inisialisasi
    setupGridColumns();
});

document.addEventListener('DOMContentLoaded', function() {
    // ... kode sebelumnya ...
    
    // Fungsi untuk menutup modal dengan animasi
    function closeModalWithAnimation() {
        modal.classList.add('closing');
        
        // Tunggu animasi selesai sebelum menyembunyikan modal
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('closing');
            document.body.style.overflow = 'auto';
        }, 400); // Durasi sama dengan CSS animation (0.4s)
    }
    
    // Fungsi untuk menampilkan modal dengan animasi
    function openModalWithAnimation() {
        modal.style.display = 'block';
        
        // Trigger reflow untuk memastikan animasi berjalan
        void modal.offsetWidth;
        
        // Reset transform sebelum animasi masuk
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        
        // Animasikan masuk
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
            modal.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }
    
    // Fungsi untuk membuat image grid dengan animasi bertahap
    function createImageGrid(images, title) {
        // Bersihkan grid sebelumnya
        imageGrid.innerHTML = '';
        
        // Set judul grid
        gridTitle.textContent = title;
        
        // Tambahkan gambar ke grid dengan delay animasi
        images.forEach((imageSrc, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'image-grid-item';
            gridItem.dataset.index = index;
            gridItem.style.setProperty('--item-index', index);
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${title} - Image ${index + 1}`;
            img.loading = 'lazy';
            
            // Tambahkan efek loading
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = function() {
                setTimeout(() => {
                    img.style.opacity = '1';
                }, index * 100);
            };
            
            gridItem.appendChild(img);
            imageGrid.appendChild(gridItem);
            
            // Event click untuk memperbesar gambar
            gridItem.addEventListener('click', function() {
                showFullscreenImage(imageSrc, title, index, images);
            });
        });
        
        // Setup grid columns
        setupGridColumns();
    }
    
    // Event listeners untuk card (update bagian ini)
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Cegah event jika mengklik link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Ambil data gambar dari atribut data-images
            const imagesData = this.getAttribute('data-images');
            const images = JSON.parse(imagesData);
            const title = this.querySelector('.text-card h1').textContent;
            
            // Tambahkan efek klik pada card
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Buat dan tampilkan grid dengan animasi
            createImageGrid(images, title);
            openModalWithAnimation();
        });
    });
    
    // Event listener untuk tombol close (update)
    closeBtn.addEventListener('click', function() {
        // Tambahkan efek pada tombol close
        this.style.transform = 'rotate(180deg) scale(0.8)';
        
        closeModalWithAnimation();
        
        // Reset tombol setelah animasi
        setTimeout(() => {
            this.style.transform = '';
        }, 400);
    });
    
    // Tutup modal dengan klik di luar konten (update)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });
    
    // Tutup modal dengan tombol Escape (update)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalWithAnimation();
        }
    });
    
    // Fungsi untuk menampilkan gambar fullscreen dengan animasi
    function showFullscreenImage(src, title, index, images) {
        // Buat overlay fullscreen
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'fullscreen-overlay';
        
        // Container untuk gambar
        const imageContainer = document.createElement('div');
        imageContainer.className = 'fullscreen-image-container';
        imageContainer.style.cssText = `
            max-width: 90%;
            max-height: 80vh;
            position: relative;
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        // Gambar fullscreen
        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = src;
        fullscreenImg.alt = title;
        fullscreenImg.style.cssText = `
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        `;
        
        // Navigasi
        const navContainer = document.createElement('div');
        navContainer.className = 'fullscreen-nav';
        navContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 20px;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
        `;
        
        // Tombol prev
        const prevBtn = createNavButton('←');
        
        // Tombol next
        const nextBtn = createNavButton('→');
        
        // Tombol close untuk fullscreen
        const fullscreenCloseBtn = document.createElement('button');
        fullscreenCloseBtn.innerHTML = '×';
        fullscreenCloseBtn.className = 'fullscreen-close-btn';
        fullscreenCloseBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 40px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 2001;
            opacity: 0;
            transform: rotate(90deg) scale(0);
            animation: rotateIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s forwards;
        `;
        
        fullscreenCloseBtn.onmouseover = () => fullscreenCloseBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        fullscreenCloseBtn.onmouseout = () => fullscreenCloseBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        
        // Fungsi untuk membuat tombol navigasi
        function createNavButton(icon) {
            const btn = document.createElement('button');
            btn.innerHTML = icon;
            btn.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 24px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                opacity: 0;
                transform: scale(0);
                animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
            `;
            
            btn.onmouseover = () => btn.style.background = 'rgba(255, 255, 255, 0.3)';
            btn.onmouseout = () => btn.style.background = 'rgba(255, 255, 255, 0.2)';
            
            return btn;
        }
        
        // Fungsi navigasi gambar dengan animasi
        function navigateImage(direction) {
            let newIndex = index + direction;
            
            if (newIndex < 0) newIndex = images.length - 1;
            if (newIndex >= images.length) newIndex = 0;
            
            // Animasikan perubahan gambar
            fullscreenImg.style.opacity = '0';
            fullscreenImg.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                index = newIndex;
                fullscreenImg.src = images[index];
                fullscreenImg.alt = `${title} - Image ${index + 1}`;
                
                fullscreenImg.style.opacity = '1';
                fullscreenImg.style.transform = 'scale(1)';
                fullscreenImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }, 200);
        }
        
        // Event listeners untuk navigasi
        prevBtn.addEventListener('click', () => navigateImage(-1));
        nextBtn.addEventListener('click', () => navigateImage(1));
        
        // Fungsi untuk menutup fullscreen dengan animasi
        function closeFullscreen() {
            fullscreenOverlay.classList.add('closing');
            
            setTimeout(() => {
                if (fullscreenOverlay.parentNode) {
                    document.body.removeChild(fullscreenOverlay);
                }
                document.removeEventListener('keydown', handleKeyDown);
            }, 300);
        }
        
        fullscreenCloseBtn.addEventListener('click', closeFullscreen);
        
        // Navigasi dengan keyboard
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
            } else if (e.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
        
        // Klik di luar gambar untuk menutup
        fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target === fullscreenOverlay) {
                closeFullscreen();
            }
        });
        
        // Tambahkan event listener untuk keyboard
        document.addEventListener('keydown', handleKeyDown);
        
        // Tambahkan elemen ke overlay
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        imageContainer.appendChild(fullscreenImg);
        imageContainer.appendChild(fullscreenCloseBtn);
        fullscreenOverlay.appendChild(imageContainer);
        fullscreenOverlay.appendChild(navContainer);
        
        // Tambahkan overlay ke body
        document.body.appendChild(fullscreenOverlay);
        
        // Trigger animasi masuk setelah ditambahkan ke DOM
        setTimeout(() => {
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'scale(1)';
            navContainer.style.opacity = '1';
            navContainer.style.transform = 'translateY(0)';
        }, 10);
    }
});