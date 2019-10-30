const bcrypt = require('bcrypt');

const { signupSchema, imageSchema } = require('../validation');
const base = require('../../database/config/airtableConnection');
const cloudinary = require('../../database/config/cloudinaryConnection');

module.exports = async (req, res, next) => {
  try {
    const therapist = JSON.parse(req.body.data);
    const therapistInfo = { ...therapist };
    const avalibility = JSON.parse(req.body.avalibility);
    let imageUrl = '';
    if (req.files) {
      const { image } = req.files;
      await imageSchema.validate({ image });
      const uploadedImage = await cloudinary.uploader.upload(image.path);
      imageUrl = uploadedImage.url;
    } else {
      res.status(400).send({ statusCode: 400, message: 'There is no image' });
    }
    await signupSchema.validate({ ...therapist, avalibility });
    const hashedPassword = await bcrypt.hash(therapist.password, 10);
    delete therapistInfo.confirm;
    delete therapistInfo.terms;
    therapistInfo.password = hashedPassword;
    therapistInfo.image = [{ url: imageUrl }];
    therapistInfo.avalibility = req.body.avalibility;
    await base('therapist').create([{
      fields: { ...therapistInfo },
    }]);
    res.send({ statusCode: 200, message: 'successfull signup' });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send({ statusCode: 400, message: 'Validation Error' });
    } else {
      next(e);
    }
  }
};
