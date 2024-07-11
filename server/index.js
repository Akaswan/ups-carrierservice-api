const express = require("express");
const http = require('http');
const ngrok = require('@ngrok/ngrok');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

let price_cap = 499;

let percentage = .10;


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

// ngrok.connect({ addr: PORT, authtoken_from_env: true })
// 	.then(listener => console.log(`Ingress established at: ${listener.url()}`));

app.post('/api/v1', (req, res) => {
    const body = (req.body);

    res.status(200).json(
        {
            "rates": [
                {
                    "service_name": "wisco-overnight",
                    "service_code": "WI",
                    "total_price": calculateShipping(body).toString(),
                    "description": "This is the fastest option by far",
                    "currency": "USD",
                    "min_delivery_date": "2024-07-12 14:48:45 -0400",
                    "max_delivery_date": "2024-07-12 14:48:45 -0400"
                }
            ]
        }
    );
});

function calculateShipping(body) {

    var items = body.rate.items;
    var origin = body.rate.origin;
    var destination = body.rate.destination;

    console.log(
        `
        Origin Address: ${origin.address1} ${origin.address2} ${origin.city}, ${origin.province}, ${origin.country} ${origin.postal_code}
        Destination Address: ${destination.address1} ${destination.address2} ${destination.city}, ${destination.province}, ${destination.country} ${destination.postal_code}
        `    
    );

    console.log(body);

    var subtotal = 0;

    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].price;
    }

    if (subtotal < price_cap) {
        return 2.0;
    } else {
        return subtotal * percentage;
    }
}