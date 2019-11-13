const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

const resizeAndSave = async ( dropPath, buffer ) => {
  const filename = `${uuidv4()}.png`;
  const filepath = path.resolve(`${dropPath}/${filename}`);

  await sharp( buffer )
    .resize( 600, 400, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toFile( filepath );

  return filename;
}

module.exports = resizeAndSave;
