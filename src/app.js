import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'AAAAAA'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'AAAAAA'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'AAAAAA'
    })
})
app.get('/weather', (req, res) => {
    const address =req.query.address;
    if(!address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(address, (error, data) => {
        if(error){
            return res.send({
                error: 'Geocode unable to connect'
            })
        } 
        forecast(data, (error, forecastData) => {
            // console.log(forecastData)
             if(error){
                return res.send({
                    error: 'Forecast unable to connect'
                })
            } 
            return res.send({
                forecast: forecastData,
                location: data.location,
                address 
            })
        })

       
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        message:'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 page',
        name: 'AAAAAA',
        message:'Page not found'})
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
