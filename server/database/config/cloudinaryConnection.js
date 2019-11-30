import cloud from 'cloudinary';

const cloudinary = cloud.v2;

cloudinary.config({
  cloud_name: 'shrinc',
  api_key: '192626321458792',
  api_secret: '5AHnlIpew06zlKP_lS8MqGvJqBk',
});

module.exports = cloudinary;
