require('dotenv').config();
const express = require('express');
const path = require('node:path');
const sequelize = require('./connections/db');
const restaurantRouter = require('../src/controllers/restaurante.controller');

sequelize.authenticate().catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit();
});

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../apidoc"), { maxAge: 31557600000 }));

app.get("/", (req, res, next) => { res.redirect("index.html"); });

app.use("/restaurants", restaurantRouter);

app.use((err, req, res, next) =>  {
    if (err) {
        res.status(500).json({
            error: "Internal Server Error.",
            description: "An unexpected error has occurred, please check the logs."
        });
    }
});

app.listen(process.env.PORT || "3000", () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3000} - http://localhost:${process.env.PORT || 3000}`);
});