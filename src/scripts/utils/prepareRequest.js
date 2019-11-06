(() => {

  zeitgeber.formatElementsPayload = ($atTarget, byTypeOf, withField) => {
    const $elements = $atTarget.querySelectorAll(byTypeOf);
    return Array.from($elements).reduce((acc, $cur) => {
      return {
        ...acc,
        [$cur.name]: $cur[withField]
      };
    }, {});
  }

})();
