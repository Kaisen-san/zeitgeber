(() => {

  const autoClose = ( triggers, switcher ) => {
    triggers.forEach( t => {
      t.addEventListener( 'click', evt => {
        switcher.checked = false;
      });
    });
  }

  const navItems = Array.from( document.querySelectorAll('.menu__item') );
  const switcher = document.querySelector('.menu__switcher');

  autoClose( navItems, switcher );

})();
