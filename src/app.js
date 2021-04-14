const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//returns absolute dir and file name
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
//hbs stands for handlebars - templating system
//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
     //no need for file extension - loads in html for index.hbs
     res.render('index', {
         title: 'Weather',
         name: 'Patrick Breen'
     })
 })

app.get('/about', (req, res) => {
    res.render('about', {
        title:  'About Me',
        name: 'Patrick Breen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext:  'This is some helpful text',
        title:  'Help',
        message: "Under Construction",
        name: 'Patrick Breen'
    })
})



app.get('/weather', (req, res) => {
    console.log('query search:' + req.query.address)
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData = {}) => {
            if (error) {
                return res.send(error)
            }

            console.log(location)
            console.log(forecastData)

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })
})
//         geocode(req.query.address, (error, {latitude, longitude, location}) => {
//             console.log('geoData: ' + latitude + longitude)
//             if (error) {
//                 return res.send({error})
//             }
    
//             forecast(latitude, longitude, (error, forecastData) => {
//                 if (error) {
//                     return res.send({error})
//                 }
    
//                 res.send({
//                     forecast: forecastData, 
//                     location,
//                     address: req.query.address
//                 })
//             })
//         })  
// })

app.get('/help/*', (req, res) => {
    //res.send('help not found')
     res.render('404', {
         text:  'Help Article Not Found',
         title:  '404 error',
         name: 'Patrick Breen'
     })
})

//asterisk means to match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        text:  'Page Not Found',
        title:  '404 error',
        name: 'Patrick Breen'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })



app.get('/products' , (req,res) => {
    //when there is no search term
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//server on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})