

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
      backLink = document.querySelectorAll('.catalog-item__link_back'),
      catalog = document.querySelector('.catalog');

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

class ItemCard {
  constructor(src, subtitle, descr, info, oldPrice, newPrice, parentSelector, ...classes) {
    this.src = src;
    this.subtitle = subtitle;
    this.descr = descr;
    this.info = info;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
    this.parentSelector = document.querySelector(parentSelector);
    this.classes = classes;
  }

  createCard() {
    const element = document.createElement('div');
    if (this.classes.length === 0) {
      this.element = 'catalog__content';
      element.classList.add(this.element);
    } else {
      this.classes.forEach (item => {
        element.classList.add(item);
      });
    }
    element.innerHTML = 
    `<div class="catalog-item">
      <div class="catalog-item__first visible">
        <img src="${this.src}" alt="pulsometer" class="catalog-item__img">
        <div class="catalog-item__subtitle">${this.subtitle}</div>
        <div class="catalog-item__descr">${this.descr}</div>
        <a href="#" class="catalog-item__link data-more">ПОДРОБНЕЕ</a>
      </div>
      <div class="catalog-item__more hidden">
        <ul class="catalog-item__info">${this.info}</ul>
        <a href="#" class="catalog-item__link_back">НАЗАД</a>
      </div>
      <div class="catalog-item__footer">
        <div class="catalog-item__price">
            <div class="catalog-item__old-price">${this.oldPrice}</div>
            <div class="catalog-item__new-price">${this.newPrice}</div>
        </div>
      <button class="button_catalog button" data-buy>КУПИТЬ</button>
    </div>`;

      this.parentSelector.append(element);
  }
}

new ItemCard(
  'img/slider/clock.jpg',
  'Пульсометр Polar FT1',
  'Для первых шагов в тренировках, основанных на сердечном ритме',
  'bla bla',
  '4 750 руб.',
  '4 500 руб.',
  '.catalog .container'
).createCard();