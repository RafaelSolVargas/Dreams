const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
require('./models/index');
const swaggerDocs = require('../docs/swagger.json');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  routes() {
    this.express.use('/api/v1/', router);
    this.express.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}

module.exports = new AppController().express;
