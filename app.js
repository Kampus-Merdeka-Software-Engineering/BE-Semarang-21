const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src', 'views')));

const pengirimanRoutes = require('./backend/routes/pengirimanRoutes');


app.use(bodyParser.json());
app.use(cors());


app.use('/api', pengirimanRoutes);


app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});