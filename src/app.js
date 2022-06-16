const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Using static file
const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));

// Defining the view engine to use
app.set("view engine", "hbs");

// Using Views
const viewPath = path.join(__dirname, "../templates/views");
app.set("views", viewPath);

// Register Partials using hbs
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);


// Using the views
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Raj Sankhavara",
        age: 20
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Raj Sankhavara",
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Raj Sankhavara",
        help: "This is my help message"

    })
})

// sending HTML
// app.get("/about", (req, res) => {
//     res.send("<h1>About Page</h1>");
// })

app.get("/weather", (req, res) => {
    if (!req.query.address)
        return res.send("<h1>Enter address in query string</h1>");

    geocode(req.query.address, (err, coordinates) => {
        if (err)
            return res.send({ err });
        else {
            forecast(coordinates.latitude, coordinates.longitude, (err, data) => {
                if (err)
                    return res.send({ err });
                else
                    res.send({
                        forecast: data.current.weather_descriptions[0],
                        location: data.location.name,
                        address: req.query.address
                    });
            })
        }
    })
})

app.get("/help/*", (req, res) => {
    res.render("error404", {
        error: "Help article not found",
        title: "Error 404",
        name: "Raj Sankhavara"
    });
})

// If no match found then this will run
app.get("*", (req, res) => {
    res.render("error404", {
        error: "Page not found",
        title: "Error 404",
        name: "Raj Sankhavara"
    });
})



// Run the Server
app.listen(3000, () => {
    console.log("App running on port 8000");
})


