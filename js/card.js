        // Fungsi untuk berpindah halaman
        function goToPage(pageId) {
            // Sembunyikan semua halaman
            const pages = document.querySelectorAll('.hero');
            pages.forEach(page => {
                page.classList.remove('active-page');
            });
            
            // Tampilkan halaman yang dipilih
            const activePage = document.getElementById(pageId);
            if (activePage) {
                activePage.classList.add('active-page');
            }
            
            // Scroll ke atas
            window.scrollTo(0, 0);
        }
        
        // Inisialisasi: pastikan halaman pertama aktif
        document.addEventListener('DOMContentLoaded', function() {
            // Pastikan halaman pertama memiliki class active-page
            if (!document.getElementById('home').classList.contains('active-page')) {
                document.getElementById('home').classList.add('active-page');
            }
        });

    // Variabel untuk menyimpan card yang aktif
    let activeCard = null;

    // Fungsi untuk toggle select/unselect card
    function toggleCardSelection(cardElement, designType) {
        // Jika card ini sudah aktif, unselect
        if (cardElement === activeCard) {
            // Unselect card
            cardElement.classList.remove('active');
            activeCard = null;
            window.selectedDesign = null;
            console.log('❌ Design unselected:', designType);
            return;
        }
        
        // Jika ada card lain yang aktif, unselect dulu
        if (activeCard) {
            activeCard.classList.remove('active');
        }
        
        // Select card yang baru diklik
        cardElement.classList.add('active');
        activeCard = cardElement;
        window.selectedDesign = designType;
        console.log('✅ Design selected:', designType);
    }

    // Atau versi yang lebih sederhana:
    function toggleCard(cardElement) {
        // Ambil design type dari data attribute
        const designType = cardElement.getAttribute('data-design-type') || 'unknown';
        
        // Toggle class 'active'
        const isActive = cardElement.classList.toggle('active');
        
        // Update variabel activeCard
        if (isActive) {
            // Jika menjadi aktif
            if (activeCard && activeCard !== cardElement) {
                activeCard.classList.remove('active');
            }
            activeCard = cardElement;
            window.selectedDesign = designType;
            console.log('✅ Design selected:', designType);
        } else {
            // Jika menjadi tidak aktif
            if (activeCard === cardElement) {
                activeCard = null;
                window.selectedDesign = null;
                console.log('❌ Design unselected:', designType);
            }
        }
    }

    // Fungsi untuk inisialisasi
    function initializeCards() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            // Hapus event listener lama
            card.removeEventListener('click', handleCardClick);
            
            // Tambah event listener baru
            card.addEventListener('click', handleCardClick);
            
            // Optional: Tambah efek visual saat hover
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                    this.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }
            });
        });
        
        console.log('🎨 Cards initialized - Click to select, click again to unselect');
    }

    // Event handler untuk klik card
    function handleCardClick(event) {
        // Cegah event bubbling jika perlu
        event.stopPropagation();
        
        // Panggil fungsi toggle
        toggleCard(this);
        
        // Atau jika mau pakai parameter design type:
        // const designType = this.getAttribute('data-design-type');
        // toggleCardSelection(this, designType);
    }

    // Inisialisasi saat halaman dimuat
    document.addEventListener('DOMContentLoaded', initializeCards);

    // Fungsi untuk mendapatkan status card
    function getCardStatus(cardElement) {
        return cardElement.classList.contains('active');
    }

    // Fungsi untuk unselect semua card
    function unselectAllCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('active');
        });
        activeCard = null;
        window.selectedDesign = null;
        console.log('🗑️ All cards unselected');
    }