var express = require('express'),
    path = require('path'),
    browserify = require('browserify');

var app = express.createServer(),
    gameBundle = browserify({watch: true, debug: true, mount: '/game.js'}),
    editorBundle = browserify({watch: true, debug: true, mount: '/editor.js'});

gameBundle.addEntry(path.resolve(__dirname, '..', 'client/game/init.js'));
editorBundle.addEntry(path.resolve(__dirname, '..', 'client/editor/init.js'));

app.use(express.logger('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'client')));
app.use(gameBundle);
app.use(editorBundle);

app.listen(3000);
