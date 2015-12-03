var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/',function(req, res){
    //console.log('yes');
    var price = req.body.price;
    var size = req.body.size;
    var location = req.body.location;
    db.select(size, price, location, function(err, rows){
        if(typeof req.user === 'undefined'){
            res.render('search', {user: null, result: rows});
        }
        else{
            res.render('search', {user: req.user, result:rows});
        }
    });
});

router.get('/:id', function(req, res){
    var id = +req.params.id;
    if(!isNaN(id)){
        db.read(id, function(err, row){
            if(typeof req.user === 'undefined'){
                res.render('house',{user: null, result: row});
            }
            else{
                db.updateHistory(req.user['username'], id, function(err, result){
                    if(result === 1){
                        console.log('successfully update user ' + id + ' history');
                    }
                });
                res.render('house', {user: req.user, result:row});
            }
        });
    }
});

module.exports = router;