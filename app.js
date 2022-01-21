const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const blogRoutes = require('./api/routes/blogs');
const userRoutes = require('./api/routes/user');
const commentRoutes = require('./api/routes/comment');
const contactRoutes = require('./api/routes/contact');
const { getMaxListeners } = require('./api/models/blog');

//swagger documantation

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Capstone Project",
			version: "1.0.0",
			description: "API documentation",
		},
		servers: [
			{
				url: "https://cyifuzo-backend.herokuapp.com/api/v1",
			},
		],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
	},
	apis: ["./api/routes/*.js"]
};
 const specification = swaggerJSDoc(options)
 app.use("/api/v1/doc", swaggerUi.serve, swaggerUi.setup(specification));


mongoose.connect(
    "mongodb+srv://cyifuzo:" + 
    process.env.MONGO_PW +
    "@cluster0.awubt.mongodb.net/brandBandEnd?retryWrites=true&w=majority");

mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/contact', contactRoutes);

app.use((req, res, next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
