/**
 * Created by Vjaceslavs on 25/11/2015.
 */
/*var express = require('express'),
    http = require('http'),
    routes = require('./routes');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./routes');

// Create an express instance and set a port variable
var app = express();
app.set('port', process.env.PORT || 3000);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/todomvc-common/"));

// Babel ES6/JSX Compiler
require('babel-core/register');

app.use(function(req, res) {
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('index.html', { html: html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});*/