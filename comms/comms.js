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
        }
        
        // Inisialisasi: tampilkan hanya halaman pertama
        document.addEventListener('DOMContentLoaded', function() {
            goToPage('home');
});