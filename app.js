//thực hiện theo : https://www.section.io/engineering-education/nodejs-paypal-checkout/
const express = require('express');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const app = express();
const paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': '###client id###',
    'client_secret': '###client_secret###'
});


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;
var router_payment = require("./routers/payment");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, function(req, res, next) {
    console.log(`listen in port ${port}`);
})


app.use("/", router_payment(paypal)); // hàm được module export return router;

app.get('/', (req, res) => res.render("home", { layout: false }));