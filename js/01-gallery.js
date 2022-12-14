import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galeryGard = galleryItems.map(createGalleryItem).join("");
const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("afterbegin", galeryGard);
gallery.addEventListener('click', modalOpen);
let modalWindow;

function createGalleryItem({ preview, original, description }) {
  return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
}

function modalOpen(element) {
  element.preventDefault();
  const imgGallery = element.target.classList.contains('gallery__image');
  if (!imgGallery) {
    return;
  }
  createModalWindow(element.target).show();
}

function createModalWindow(params) {
  const html = `<div class="modal">
  <img src="${params.dataset.source}" alt="${params.alt}" />
 </div>`;

  modalWindow = basicLightbox.create(html, {
        modalShow: () => {
            window.addEventListener('keyup', closeModalKeyUp);
        },
        modalClose: () => {
            window.removeEventListener('keyup', closeModalKeyUp);
        },
    });
    return modalWindow;
}

function closeModalKeyUp(element) {
    console.log(element.code);
    if (element.code !== 'Escape') return;
    modal.close();
}