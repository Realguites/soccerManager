const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at localhost:${port}`)
})