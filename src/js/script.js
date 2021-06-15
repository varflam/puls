window.addEventListener('DOMContentLoaded', () => {
  //More Button
  const moreInfo = document.querySelectorAll('.catalog-item__more'),
      moreInfoLink = document.querySelectorAll('.catalog-item__link'),
      firstInfo = document.querySelectorAll('.catalog-item__first'),
      backLink = document.querySelectorAll('.catalog-item__link_back');

  const changeInfo = function(i) {
    moreInfo[i].classList.toggle('hidden');
    firstInfo[i].classList.toggle('hidden');
    firstInfo[i].classList.add('fade');
    moreInfo[i].classList.add('fade');
  };


  moreInfoLink.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      changeInfo(i);
    });
  });

  backLink.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      changeInfo(i);
    });
  });
  
  //Modals

  const modalClose = document.querySelectorAll('.modal__close'),
        overlay = document.querySelector('.overlay'),
        modalWin = document.querySelectorAll('.modal'),
        modalName = document.querySelector('.modal__name'),
        itemName = document.querySelectorAll('.catalog-item__subtitle');


  let openModal = function (modal, i) {
    const modalWin = document.querySelector(modal);
    modalWin.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (i) {
      modalName.textContent = itemName[i].textContent;
    }
    modalWin.classList.add('fade');
  };

  let showModal = function(btns, modal) {
    const modalBtns = document.querySelectorAll(btns);
    const modalWin = document.querySelector(modal);
    modalBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
          openModal(modalWin, i);
      });
    });
  };

  showModal('.button_cons', '#consultation');
  showModal('.button_catalog', '#order');

  let closeModal = function () {
    modalWin.forEach(modal => {
      modal.style.display = 'none';
    });
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  modalClose.forEach(item => {
    item.addEventListener('click', () => {
      closeModal();
    });
  });

  overlay.addEventListener('click', (evt) => {
    if (evt.target === overlay || evt.target.getAttribute('data-close') == '') {
      closeModal();
  }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape' && overlay.classList.contains('visible')) {
        closeModal();
    }
});

//Slider

  const slides = document.querySelectorAll('.slide'),
          prev = document.querySelector('.prev'),
          next = document.querySelector('.next'),
          sliderWrapper = document.querySelector('.carousel__container'),
          sliderInner = document.querySelector('.carousel__inner'),
          width = window.getComputedStyle(sliderWrapper).width,
          maxOffset = +width.slice(0, width.length - 2);
          
    let slideIndex = 1,
        offset = 0;

    slides.forEach(slide => slide.style.cssText += `
    padding-left: 85px;
    `);

        
    sliderInner.style.width = 100 * slides.length + '%';
    slides.forEach(slide => slide.style.width = width);
    sliderInner.style.cssText += 'display: flex; transition: all 0.3s;';
    sliderWrapper.style.overflow = 'hidden';

    next.addEventListener('click', () => {
        if (offset == maxOffset * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += maxOffset;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = maxOffset * (slides.length - 1);
        } else {
            offset -= maxOffset;
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
    });
  
    //Forms
    const forms = document.querySelectorAll('form');

    const postData = async (url, data) => {
      let res = await fetch(url, {
          method: 'POST',
          body: data
      });
      
      return await res;
    };

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

            postData('js/mailer/smart.php', formData)
            .then(() => {
                openModal('#thanks');
            }).finally(() => {
                setInterval(closeModal, 2000);
            });
      });
    });

});

