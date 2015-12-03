var express = require('express');
var router = express.Router();
var db = require('../db/db');
var utils = require('../utils/utils.js');
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/update', function(req, res){
    var json = req.body;
    db.update(json, function(err, result){
        if(result == 1){
            res.redirect('/updateAndDelete');
        }
        if(result == -1){
            res.redirect('/error');
        }
    });
});

router.post('/delete', function(req, res){
    db.delete(req.body.id, function(err, result){
        if(result == 1){
            res.redirect('/updateAndDelete');
        }
        if(result != 1){
            res.redirect('/error');
        }
    });
});

module.exports = router;