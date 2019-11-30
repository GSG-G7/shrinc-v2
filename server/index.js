const app = require('./app');
const mongodbConnection = require('./database/config/mongodbConnection');

const port = app.get('port');

mongodbConnection()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB is connected');
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`server is running at http://localhost:${port}`);
    });
  }).catch((err) => console.log(err));
