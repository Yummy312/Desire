// По умолчанию фильтруется превая категория

var containerEl = document.querySelector('.gallery__inner');
var mixer;

// Проверка: Не запускается ли на другой странице где не используется Mixitup
if (containerEl) {
mixer = mixitup(containerEl, {
        selectors: {
            control: '[data-filter]'
        },
        load: {
            filter: '.living'
        }
});
}