import galleryItems from "./js/gallery-items.js";

const preview = document.querySelector(".js-gallery");
const modal = document.querySelector(".lightbox");
const btn = document.querySelector('.lightbox__button');
const modalImg = document.querySelector('.lightbox__image');
let currentIndex = 0;
galleryItems.forEach((item, i) => {


    const listItem = `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${item.preview}"
    >
    <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
        data-index ="${i}"
    />
    </a>
</li>`;

    preview.innerHTML += listItem

});

function previewClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    };

    let bigImg = event.target;

    openModal(bigImg);

}

function openModal(img = {}) {
    modalImg.src = img.dataset.source;
    modalImg.alt = img.alt;
    currentIndex = img.dataset.index;
    modal.classList.add('is-open');
    modal.addEventListener('click', modalClick);

    window.addEventListener("keydown", keyHendler)
}

function keyHendler(event) {
    const key = event.code
    switch (key) {
        case "Escape":
            closeModal();
            break;
        case "ArrowRight":
            onArrowRight();
            break;
        case "ArrowLeft":
            onArrowLeft();
            break;

    }
}


function onArrowRight() {
    if (currentIndex + 1 > galleryItems.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++
    }
    modalImg.src = galleryItems[currentIndex].original;
    modalImg.alt = galleryItems[currentIndex].description;
}


function onArrowLeft() {
    if (currentIndex - 1 < 0) {
        currentIndex = galleryItems.length - 1;
    } else {
        currentIndex--
    }
    modalImg.src = galleryItems[currentIndex].original;
    modalImg.alt = galleryItems[currentIndex].description;
}

function modalClick(event) {
    if (event.target.nodeName === 'BUTTON' || event.target.nodeName === "DIV") {
        closeModal();
    }
}

function closeModal() {
    window.removeEventListener('keydown', keyHendler);
    modal.classList.remove('is-open');

}

preview.addEventListener('click', previewClick);
