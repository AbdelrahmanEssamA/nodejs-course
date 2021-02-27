const express = require('express');
const adminData = require('./routes/admin');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');
const app = express();
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
/* const server = http.createServer(app);
server.listen(3000);
 */