document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const yOffset = -200;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
});



var swiper1 = new Swiper(".testimonials-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".testimonials-slider .swiper-button-next",
    prevEl: ".testimonials-slider .swiper-button-prev",
  },
});


document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
      overlay = document.querySelector('body'),
      closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

  var currentOpenModal = null;

  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
          modalElem = document.querySelector('.modal-dialog.' + modalId);

      if (currentOpenModal && currentOpenModal !== modalElem) {
        closeModalDirectly(currentOpenModal);
      }

      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';

      setTimeout(function() {
        modalElem.classList.add('modal-opening');
        currentOpenModal = modalElem;
        resolve();
      }, 0);
    });
  }

  async function closeModal(closeBtn) {
    return new Promise(resolve => {
      var modal = closeBtn.closest('.modal-dialog');
      modal.classList.remove('modal-opening');
      modal.classList.add('modal-closing');

      setTimeout(function() {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
        overlay.classList.remove('modal-open');
        if (currentOpenModal === modal) {
          currentOpenModal = null;
        }
        resolve();
      }, 500);
    });
  }

  function closeModalDirectly(modalElem) {
    modalElem.classList.remove('modal-opening');
    modalElem.style.display = 'none';

    if (currentOpenModal === modalElem) {
      currentOpenModal = null;
    }

    var anyModalOpen = document.querySelector('.modal-dialog[style*="display: flex"]');
    if (!anyModalOpen) {
      overlay.classList.remove('modal-open');
    }
  }

  /* open modal */
  modalButtons.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  /* close modal */
  closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', async function(e) {
      await closeModal(closeBtn);
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(function(item) {
    item.addEventListener('click', async function(e) {
      if (e.target !== e.currentTarget) {
        return;
      } else {
        await closeModal(this);
      }
    });
  });

});
