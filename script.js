'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        const itemCategory = filterItems[i].dataset.category.toLowerCase();
        if(selectedValue === "all" || selectedValue === "tous") {
            filterItems[i].classList.add('active');
        } else if (selectedValue === itemCategory) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {

        const targetPage = this.getAttribute('data-page'); // lecture de data-page

        for (let j = 0; j < pages.length; j++) {
            if (pages[j].dataset.page === targetPage) {
                pages[j].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove('active');
                navigationLinks[j]?.classList.remove('active');
            }
        }
    });
}

//Souris
(function() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // positions réelles et lissées (lerp)
  let posX = mouseX, posY = mouseY;
  const speed = 0.35; // plus petit = plus lissé

  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // placer le petit curseur directement (moins de latence)
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  };

  // animations de suivi lissé pour follower
  function animate() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    follower.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }

  // masquer si tactile (pratique supplémentaire)
  function isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  }
  if (isTouchDevice()) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  
  window.addEventListener('mousemove', onMove);
  animate();

  // Gérer les états "hover" sur éléments interactifs
  const interactiveSelector = 'a, button, input, textarea, select, [data-cursor="hover"]';
  const interactives = document.querySelectorAll(interactiveSelector);

  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--active');
      follower.classList.add('cursor-follower--active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--active');
      follower.classList.remove('cursor-follower--active');
    });
  });

  // Optionnel : clic visuel
  window.addEventListener('mousedown', () => {
    cursor.style.transform += ' scale(0.8)';
    follower.style.transform += ' scale(0.9)';
  });
  window.addEventListener('mouseup', () => {
    // remettre à la position normale : petit hack pour annuler le scale temporaire
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    follower.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
  });

})();

