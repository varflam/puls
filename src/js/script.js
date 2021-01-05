// $(document).ready(function(){
//   $('.carousel__inner').slick(
//     {
//       speed: 300,
//       prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/arrow-left.svg"></button>',
//       nextArrow: '<button type="button" class="slick-next"><img src="img/slider/arrow-right.svg"></button>',
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             dots: true,
//             arrows: false
//           }
//         }
//       ]
//     }
//   );
// });

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
  moreInfo[i].classList.toggle('catalog-item__more_disable');
  firstInfo[i].classList.toggle('catalog-item__first_disable');
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