const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();
const portNumber = 8080;
const sourceDir = 'dist';

app.use(express.static(sourceDir));
app.use(fallback(__dirname + '/dist/index.html'));

app.listen(portNumber, () => {
	console.log('\x1b[36m%s\x1b[0m', `Express web server started: http://localhost:${portNumber}`);
	console.log('\x1b[35m%s\x1b[0m', `Serving content from ./${sourceDir}`);
});
