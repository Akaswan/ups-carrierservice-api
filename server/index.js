const express = require("express");
// const multer = require('multer');
// const upload = multer();

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

let price_cap = 499;

let percentage = .10;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

app.get('/', (req, res) => {
    const body = (req.body);

    console.log(body.rate.items[0].price);
    res.status(200).json(
        {
            "rates": [
                {
                    "service_name": "canadapost-overnight",
                    "service_code": "ON",
                    "total_price": calculateShipping(body.rate.items[0].price).toString(),
                    "description": "This is the fastest option by far",
                    "currency": "CAD",
                    "min_delivery_date": "2013-04-12 14:48:45 -0400",
                    "max_delivery_date": "2013-04-12 14:48:45 -0400"
                }
            ]
        }
    );
});

function calculateShipping(subtotal) {
    if (subtotal < price_cap) {
        return 2.0;
    } else {
        return subtotal * percentage;
    }
}