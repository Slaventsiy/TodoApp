/**
 * Created by Vjaceslavs on 25/11/2015.
 */
var React = require('react');
var Route = require('react-router');
var App = require('./js/components/TodoApp');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.send('index');
});

module.exports = router;
/*export default (
    <Route path='/' component={App} />
);*/