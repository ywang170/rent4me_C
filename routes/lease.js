var express = require('express');
var router = express.Router();
var db = require('../db/db');
var utils = require('../utils/utils.js');
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/add', function(req, res){
    var json = req.body;
    db.insert(json, function(err, rows){
        if(utils.isEmpty(rows)){
            res.send('failed to insert data');
        }
        else{
            res.redirect('/lease');
        }
    });
});

module.exports = router;