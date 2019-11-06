(() => {

  let $context = null;

  // PRODUCT
  const $productForm = document.getElementById('product');

  $productForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.formatElementsPayload(evt.target, 'input', 'value');

    try {
      await zeitgeber.sendHttpRequest('PUT', window.location.pathname, {
        product: {
          ...inputsPayload
        }
      });

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    }
  });

  // CARD
  const $cardForm = document.getElementById('card');
  const $cardImage = $cardForm.querySelector('.admin__item .link img');

  $cardForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.formatElementsPayload(evt.target, 'input', 'value');
    const imgsPayload = zeitgeber.formatElementsPayload(evt.target, 'img', 'src');

    try {
      await zeitgeber.sendHttpRequest('PUT', window.location.pathname, {
        card: {
          ...inputsPayload,
          ...imgsPayload
        }
      });

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    }
  });

  $cardImage.addEventListener('click', evt => {
    $imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    $imagesPopupItems.forEach(item => {
      if ($cardImage.getAttribute('src') === item.getAttribute('src')) {
        item.classList.add('image__button--selected');
      } else {
        item.classList.remove('image__button--selected');
      }
    });
    $context = $cardImage;
  });

  // PURCHASE
  const $purchaseForm = document.getElementById('purchase');
  const $purchaseImagesWrapper = $purchaseForm.querySelector('.admin__item .admin__wrapper');
  const $purchaseImages = $purchaseImagesWrapper.querySelectorAll('.admin__item .link img');
  const $purchaseAdd = document.getElementById('purchase_add');

  $purchaseForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputsPayload = zeitgeber.formatElementsPayload(evt.target, 'input', 'value');
    const textareasPayload = zeitgeber.formatElementsPayload(evt.target, 'textarea', 'value');
    const $imgs = evt.target.querySelectorAll('img');
    const imgsPayload = Array.from($imgs).map($img => $img.src);

    try {
      await zeitgeber.sendHttpRequest('PUT', window.location.pathname, {
        purchase: {
          ...inputsPayload,
          ...textareasPayload,
          images: imgsPayload
        }
      });

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    }
  });

  $purchaseImages.forEach(image => {
    image.addEventListener('click', evt => {
      $imagesPopup.style.display = 'flex';
      document.body.classList.add('lock');
      $imagesPopupItems.forEach(item => {
        if (image.getAttribute('src') === item.getAttribute('src')) {
          item.classList.add('image__button--selected');
        } else {
          item.classList.remove('image__button--selected');
        }
      });
      $context = image;
    });
  });

  $purchaseAdd.addEventListener('click', evt => {
    $imagesPopup.style.display = 'flex';
    document.body.classList.add('lock');
    $imagesPopupItems.forEach(item => item.classList.remove('image__button--selected'));
    $context = $purchaseAdd;
  });

  // INFO
  const $productInfoForm = document.getElementById('product_info');

  $productInfoForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const textareasPayload = zeitgeber.formatElementsPayload(evt.target, 'textarea', 'value');

    try {
      await zeitgeber.sendHttpRequest('PUT', window.location.pathname, {
        productInfo: {
          ...textareasPayload
        }
      });

      // TODO: Avisar ao usuário que as mudanças foram feitas com sucesso
    } catch (err) {
      // TODO: Avisar ao usuário que as mudanças falharam
      console.error(err, err.data);
    }
  });

  // IMAGES POPUP
  const $imagesPopup = document.getElementById('images_popup');
  const $imagesPopupCancel = $imagesPopup.querySelector('.images .images__cancel');
  const $imagesPopupItems = $imagesPopup.querySelectorAll('.images .link img');

  $imagesPopupCancel.addEventListener('click', evt => {
    $imagesPopup.style.display = 'none';
    document.body.classList.remove('lock');
  });

  $imagesPopupItems.forEach($item => {
    $item.addEventListener('click', evt => {
      $imagesPopupItems.forEach($item => $item.classList.remove('image__button--selected'));
      $item.classList.add('image__button--selected');

      if ($context === $purchaseAdd) {
        insertImageTemplate($purchaseImagesWrapper, $purchaseAdd.parentElement, $item.getAttribute('src'));
      } else {
        $context.setAttribute('src', $item.getAttribute('src'));
      }

      $imagesPopup.style.display = 'none';
      document.body.classList.remove('lock');
    });
  });

  const insertImageTemplate = ($atTarget, $beforeElement, withSrc) => {
    const $template = document.querySelector('template');
    const $clone = $template.content.cloneNode(true);
    const $image = $clone.querySelector('.admin__item .link img');
    $image.setAttribute('src', withSrc);
    $atTarget.insertBefore($clone, $beforeElement);
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === document.ELEMENT_NODE) {
          const $image = node.querySelector('.admin__item .link img');

          $image.addEventListener('click', evt => {
            $imagesPopup.style.display = 'flex';
            document.body.classList.add('lock');
            $imagesPopupItems.forEach(item => {
              if ($image.getAttribute('src') === item.getAttribute('src')) {
                item.classList.add('image__button--selected');
              } else {
                item.classList.remove('image__button--selected');
              }
            });

            $context = $image;
          });
        }
      });
    });
  });

  observer.observe($purchaseImagesWrapper, { childList: true });

  document.addEventListener('keydown', evt => {
    if (evt.keyCode === 9) {
      evt.preventDefault();
    }
  });

})();
