let context = null;

// CARD
const cardForm = document.getElementById('card');
const cardImage = cardForm.querySelector('.admin__item .link img');

cardForm.addEventListener('submit', evt => {
  evt.preventDefault();
});

cardImage.addEventListener('click', evt => {
  imagesPopup.style.display = 'flex';
  document.body.classList.add('lock');
  imagesPopupItems.forEach(item => {
    if (cardImage.getAttribute('src') === item.getAttribute('src')) {
      item.classList.add('image__button--selected');
    } else {
      item.classList.remove('image__button--selected');
    }
  });
  context = cardImage;
});

// PURCHASE
const purchaseForm = document.getElementById('purchase');
const purchaseImagesWrapper = purchaseForm.querySelector('.admin__item .admin__wrapper');
const purchaseImages = purchaseImagesWrapper.querySelectorAll('.admin__item .link img');
const purchaseAdd = document.getElementById('purchase_add');

purchaseForm.addEventListener('submit', evt => {
  evt.preventDefault();
});

purchaseImages.forEach(image => {
  image.addEventListener('click', evt => {
    imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    imagesPopupItems.forEach(item => {
      if (image.getAttribute('src') === item.getAttribute('src')) {
        item.classList.add('image__button--selected');
      } else {
        item.classList.remove('image__button--selected');
      }
    });
    context = image;
  });
});

purchaseAdd.addEventListener('click', evt => {
  imagesPopup.style.display = 'flex';
  document.body.classList.add('lock');
  imagesPopupItems.forEach(item => item.classList.remove('image__button--selected'));
  context = purchaseAdd;
});

// PRODUCT
const productForm = document.getElementById('product');

productForm.addEventListener('submit', evt => {
  evt.preventDefault();
});

// IMAGES POPUP
const imagesPopup = document.getElementById('images_popup');
const imagesPopupCancel = imagesPopup.querySelector('.images .images__cancel');
const imagesPopupItems = imagesPopup.querySelectorAll('.images .link img');

imagesPopupCancel.addEventListener('click', evt => {
  imagesPopup.style.display = 'none';
  document.body.classList.remove('lock');
});

imagesPopupItems.forEach(item => {
  item.addEventListener('click', evt => {
    imagesPopupItems.forEach(item => item.classList.remove('image__button--selected'));
    item.classList.add('image__button--selected');

    if (context === purchaseAdd) {
      insertImageTemplateAt(purchaseImagesWrapper, purchaseAdd.parentElement, item.getAttribute('src'));
    } else {
      context.setAttribute('src', item.getAttribute('src'));
    }

    imagesPopup.style.display = 'none';
    document.body.classList.remove('lock');
  });
});

const insertImageTemplateAt = (target, beforeElement, withSrc) => {
  const templ = document.querySelector('template');
  const clone = templ.content.cloneNode(true);
  const image = clone.querySelector('.admin__item .link img');
  image.setAttribute('src', withSrc);
  target.insertBefore(clone, beforeElement);
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === document.ELEMENT_NODE) {
        const image = node.querySelector('.admin__item .link img');

        image.addEventListener('click', evt => {
          imagesPopup.style.display = 'flex';
          document.body.classList.add('lock');
          imagesPopupItems.forEach(item => {
            if (image.getAttribute('src') === item.getAttribute('src')) {
              item.classList.add('image__button--selected');
            } else {
              item.classList.remove('image__button--selected');
            }
          });

          context = image;
        });
      }
    });
  });
});

observer.observe(purchaseImagesWrapper, { childList: true });
