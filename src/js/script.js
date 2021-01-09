

const slider = tns ({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false
});

document.querySelector('.prev').addEventListener ('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener ('click', function () {
  slider.goTo('next');
});

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

const buttonCons = document.querySelectorAll('.button_cons'),
      buttonBuy = document.querySelectorAll('.button_catalog'),
      buttonFinish = document.querySelectorAll('[data-modal="finish"]'),
      modalCons = document.querySelector('#consultation'),
      modalClose = document.querySelectorAll('.modal__close'),
      overlay = document.querySelector('.overlay'),
      modalBuy = document.querySelector('#order'),
      modalThanks = document.querySelector('#thanks'),
      modalWin = document.querySelectorAll('.modal'),
      modalName = document.querySelector('.modal__name'),
      itemName = document.querySelectorAll('.catalog-item__subtitle');


let showModal = function(btns, modal) {
  btns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let openModal = function() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalName.textContent = itemName[i].textContent;
        modal.classList.add('fade');
        };
        openModal(modal);
    });
  });
};

showModal(buttonCons, modalCons);
showModal(buttonBuy, modalBuy);
showModal(buttonFinish, modalThanks);

let closeModal = function() {
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

overlay.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
      closeModal();
  }
});
