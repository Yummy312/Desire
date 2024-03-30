
// Создание списка слайдера
const sliders = document.querySelectorAll('.top__slider-item');
let sliderInner = document.body.querySelector(".top__inner")
let wrapperSliderButtons = document.createElement("div");
wrapperSliderButtons.className = "top__wrapper-buttons";
if (sliderInner){
    sliderInner.appendChild(wrapperSliderButtons);
}
// Создание списка кнопок
const buttonList = [];

// Функция создания кнопок
function createButton(){
    let sliderButton = document.createElement("button");
    sliderButton.className="top__slider-button";
    wrapperSliderButtons.appendChild(sliderButton);
    buttonList.push(sliderButton)

}
// Добааление кнопок к слайдерам
function addPagination(){
    sliders.forEach(createButton);
    if(buttonList[0]){
        buttonList[0].classList.add("top__slider-button--active")
    }
    else{
        return
    }
    
}
addPagination()

// --------------

let currentSliderIndex = 0;

function showSlide(){
    if(sliders[currentSliderIndex]){
        sliders[currentSliderIndex].classList.add("top__slider-item--active");
    }
}

function hideSlide(){
    if(sliders[currentSliderIndex]){
        sliders[currentSliderIndex].classList.remove("top__slider-item--active")
    }
}

// Для подсветки активной кнопки
function addActiveClass(){
    if(buttonList[currentSliderIndex]){
        buttonList[currentSliderIndex].classList.add("top__slider-button--active") 
    }
}
function removeActiveClass(){
    if(buttonList[currentSliderIndex]){
        buttonList[currentSliderIndex].classList.remove("top__slider-button--active")
    }
}

function changeSlide(sliderIndex){
    removeActiveClass()
    hideSlide()
    currentSliderIndex = sliderIndex;
    showSlide()
    addActiveClass()
}



// Вешаем прослушиватели событий на каждую кнопку
buttonList.forEach((button, index)=>{
    button.addEventListener("click", () => changeSlide(index));
})

// Функция для переключения на следующий слайд
function nextSlide() {
    const nextIndex = (currentSliderIndex + 1) % sliders.length;
    changeSlide(nextIndex);
}

// Устанавливаем интервал автоматического переключения слайдов (через каждые 5 секунд)
const intervalId = setInterval(nextSlide, 10000);

// Функция для остановки автоматического переключения слайдов
function stopAutoSlide() {
    clearInterval(intervalId);
}

// Слайдер страницы contact.html
$('.contact-slider').slick({
    slidesToShow:10,
    slidesToScroll:10,
    dots:true,
    item:10,
    arrows:false,
    responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 9,
            slidesToScroll: 8,
            
          }
        },
        {
          breakpoint: 1628,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 7,
           
          }
        },
        {
          breakpoint: 1462,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          }
        },
        {
            breakpoint: 1277,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 6,
            }
        },
        {
            breakpoint: 1099,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            }
        },
        {
            breakpoint: 905,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            }
        },
        {
            breakpoint: 739,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
        },
        
        
      ]
});

$('.article-slider__box').slick({
    prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrowleft"><img class="pagination__arrow-icon" src="images/arrow-slide-left.svg" alt="icon"></button>',
    nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrowright"><img class="pagination__arrow-icon" src="images/arrow-slide-right.svg" alt="icon"></button>'
})