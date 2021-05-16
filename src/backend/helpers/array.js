const excludeEquals = (array1, array2, comparisonField) => {
  let smallerArray = [];
  let biggerArray = [];

  if (array1.length >= array2.length) {
    smallerArray = array2;
    biggerArray = array1;
  } else {
    smallerArray = array1;
    biggerArray = array2;
  }

  const indexesToDelete = [];

  smallerArray.forEach(({ [comparisonField]: fieldArray1 }, indexArray1) => {
    const indexArray2 = biggerArray.findIndex(({ [comparisonField]: fieldArray2 }) => fieldArray1 === fieldArray2);

    if (indexArray2 !== -1) {
      indexesToDelete.push({ indexArray1, indexArray2 });
    }
  });

  indexesToDelete.forEach(({ indexArray1, indexArray2 }, index) => {
    smallerArray.splice(indexArray1 - index, 1);
    biggerArray.splice(indexArray2 - index, 1);
  });
}

module.exports = {
  excludeEquals
}
