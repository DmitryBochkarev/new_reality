var express = require('express'),
    path = require('path'),
    browserify = require('browserify');

var app = express.createServer(),
    bundle = browserify({watch: true, debug: true});

bundle.addEntry(path.resolve(__dirname, '..', 'client/init.js'))

app.use(express.static(path.resolve(__dirname, '..', 'client')));
app.use(bundle);

app.listen(3000);
