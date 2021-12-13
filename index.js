const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const newHandlebars = require('handlebars')
const Handlebars= require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const flash = require('connect-flash')
const helmet = require('helmet')
const compression = require('compression')

///////////////////////////////////////////
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/adminPanel");
const coursesRoutes = require("./routes/products");
const cardRoutes = require("./routes/card")
const ordersRouter = require('./routes/orders')
const authRout = require('./routes/auth')
const profileRout = require('./routes/profile')
const deliveryRouter = require('./routes/delivery')
const paymentRouter = require('./routes/payment')
const detailsRouter = require('./routes/details')

///////////////////////////////////////////
const userModel = require('./middleware/userModel')
const varMiddleWare = require('./middleware/variations')
const errorPage = require('./middleware/error')
const fileMiddleware = require('./middleware/uploadFile')
const keys = require('./keys')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();


const hbs = Handlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(newHandlebars),
});

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.DB_CONNECTION_STRING
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use('/img', express.static(path.join(__dirname, "img")));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}))
app.use(csrf())
app.use(fileMiddleware.single('avatar'))
app.use(flash())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression())
app.use(varMiddleWare)
app.use(userModel)


app.use("/", homeRoutes);
app.use("/panel", addRoutes);
app.use("/products", coursesRoutes);
app.use("/card", cardRoutes);
app.use('/orders', ordersRouter)
app.use('/auth', authRout)
app.use('/profile', profileRout)
app.use('/delivery', deliveryRouter)
app.use('/payment', paymentRouter)
app.use('/details', detailsRouter)

app.use(errorPage)

const APP_PORT = process.env.APP_PORT || 3000;

async function start(){
  try{
    await mongoose.connect(keys.DB_CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    
    app.listen(APP_PORT, () => {
      console.log(`Server started on ${APP_PORT}`);
    })
  }catch (err) {
    console.log(err);
  }
}

start()
