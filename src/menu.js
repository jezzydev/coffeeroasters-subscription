const mobileMenuBtn = document.querySelector('.OpenMobileMenuBtn');
const closeMenuBtn = document.querySelector('.CloseMobileMenuBtn');
const mobileMenuContainer = document.querySelector(
    '.HeaderMobileMenuContainer',
);

mobileMenuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (mobileMenuContainer !== null) {
        mobileMenuContainer.style.display = 'grid';
    }
});

closeMenuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (mobileMenuContainer !== null) {
        mobileMenuContainer.style.display = 'none';
    }
});
