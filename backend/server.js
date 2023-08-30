require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const vueGeneratorRouter = require('./vue-generator/vue-generator.router');
const app = express();
app.use(express.json());

// Allow cors
const cors = require('cors');
app.use(
    cors({
        origin: '*',
    })
);

// Use the routers
app.use('/vue-generator', vueGeneratorRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
