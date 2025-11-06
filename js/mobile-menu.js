// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = mainNav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}
