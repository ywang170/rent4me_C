var db = require('mysql2');
var pool = db.createPool('mysql://root:951753@http://ec2-52-89-20-60.us-west-2.compute.amazonaws.com/:3306/rent4me');
var utils = require('../utils/utils.js');
var request = require('request');

db.select = function(size, price, location, callback) {
  var minPrice, maxPrice;
  //convert input forms
  switch(price){
      case '1': minPrice = 0;
                maxPrice = 400;
                break;
      case '2': minPrice = 401;
                maxPrice = 600;
                break;
      case '3': minPrice = 601;
                maxPrice = 800;
                break;
      case '4': minPrice = 801;
                maxPrice = 3000;
                break;
      case 'a': minPrice = 0;
                maxPrice = 3000;
                break;
      default: minPrice = 0;
               maxPrice = 3000;
               break;
  }
  //
  if(size == 'a' && location == 'al'){
      var sql = 'SELECT * FROM Property WHERE price >= ? AND price <= ?';
      var params = [minPrice, maxPrice];
  }
  else if(size == 'a' && location != 'al'){
      var sql = 'SELECT * FROM Property WHERE price >= ? AND price <= ? AND location = ?';
      var params = [minPrice, maxPrice, location];
  }
  else if(size != 'a' && location == 'al'){
      var sql = 'SELECT * FROM Property WHERE price >= ? AND price <= ? AND size = ?';
      var params = [minPrice, maxPrice, size];
  }
  else{
      var sql = 'SELECT * FROM Property WHERE price >= ? AND price <= ? AND location = ? AND size = ?';
      var params = [minPrice, maxPrice, location, size];
  }
  
  pool.getConnection(function(err, conn){
    conn.query(sql, params, function(err, rows) {
      conn.release();
      if (utils.isEmpty(rows)) {
        callback(err, {});
      } else {
        callback(err, rows);
      }
    });
  });
};

db.read = function(id, callback) {
  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM Property WHERE pid = ?', [+id], function(err, rows) {
      conn.release();
      if (utils.isEmpty(rows)) {
        callback(err, {});
      } else {
        callback(err, rows[0]);
      }
    });
  });
};

db.readAll = function(callback) {
  pool.getConnection(function(err, conn){
    conn.query('SELECT * FROM Property', function(err, rows) {
      conn.release();
      callback(err, rows);
    });
  });
};

var readyToInsert = function(row){
    pool.getConnection(function(err, conn){
        conn.query('SELECT * FROM Property WHERE address = ?', [row['address']], function(err, rows){
            if (utils.isEmpty(rows)) {
                return true;
            } else {
                return false;
            }
        });
    })
};

db.insert = function(newRow, callback){
    //if (!readyToInsert(newRow)){
    //    callback(err, {});
    //}
    params = [+newRow['price'], newRow['size'], newRow['location'], newRow['address'], newRow['comp_name'], newRow['img_url']];
    pool.getConnection(function(err, conn){
        conn.query('INSERT INTO Property (price, size, location, address, company_name, img_url) values(?, ?, ?, ?, ?, ?)', params, function(err, res){
            conn.release();
            var newId = res.insertId;
            db.read(newId, function(err, row){
                callback(err, row);
            })
        });
    });
};

db.update = function(newRow, callback){
    db.read(newRow['pid'], function(err, row){
        if (utils.isEmpty(row)) {
            callback(err, -1);
        }
    });
    pool.getConnection(function(err,conn){
        params = [+newRow['price'], newRow['size'], newRow['location'], newRow['address'], newRow['comp_name'], newRow['img_url'], +newRow['pid']];
        conn.query('UPDATE Property SET price = ?, size = ?, location = ?, address = ?, company_name = ?, img_url = ? WHERE pid = ?', params, function(err, res){
            conn.release();
            callback(err, res.affectedRows);
        });
    });
};

db.delete = function(id, callback){
    pool.getConnection(function(err, conn){
        conn.query('DELETE FROM Property WHERE pid = ?', [+id], function(err, result){
            conn.release();
            callback(err, result.affectedRows);
        });
    });
};

db.updateHistory = function(user, id, callback){
    pool.getConnection(function(err, conn){
       params = [id, user];
       conn.query('UPDATE users SET history = ? WHERE username = ?', params, function(err, result){
           conn.release();
           callback(err, result.affectedRows);
       }) 
    });
};

db.getHistory = function(user, callback){
    pool.getConnection(function(err,conn){
        conn.query('SELECT P.* from users, Property P WHERE users.username = ? AND P.pid <> 0 AND users.history = P.pid', [user], function(err, rows){
           conn.release();
            if(utils.isEmpty(rows)){
                callback(err, {});
            }
            else{
                var address = rows[0]['address'];
                var street = utils.streetParser(address);
                db.addrParser(street, function(err, result){
                    callback(err, result); 
                });
            }
        });
    });
};

db.addrParser = function(street, callback){
    pool.getConnection(function(err, conn){
       params = ['%'+street+'%'];
       conn.query('SELECT * FROM Property WHERE address LIKE ?', params, function(err, rows){
           conn.release();
           callback(err, rows);
       }) ;
    });
};
/*
db.filter = function(json, callback){
    var siebel = 'Siebel Center, Urbana IL';
    var union = 'Illini Union, Urbana IL';
    var county = '331E Stoughton St, Champaign, IL';
    var ugl = '1402W Gregory Dr, Urbana IL';
    var arc = '201E Peabody Dr, Champaign IL';
    var crce = '1102W Gregory Dr, Urbana, IL';
    var food = '404E Green St, Champaign, IL';
    var custom_place = json.custom_place;
    var arr = new Array();
    if(json.siebel == 'siebel'){
        arr.push(siebel);
    }
    if(json.union == 'union'){
        arr.push(union);
    }
    if(json.county == 'county'){
        arr.push(county);
    }
    if(json.arc == 'arc'){
        arr.push(arc);
    }
    if(json.crce == 'crce'){
        arr.push(crce);
    }
    if(json.food == 'food'){
        arr.push(food);
    }
    if(json.ugl == 'ugl'){
        arr.push(ugl);
    }
    if(json.custom_place != ''){
        arr.push(custom_place);
    }
    //console.log(arr);
    db.readAll(function(err, rows){
       if(!utils.isEmpty(rows)) {
           var scores = [];
           for(var i =0;i<rows.length;i++){
               scores.push(0);
           }
           //console.log(rows.length);
           for(var i =0; i<rows.length;i++){
               for(var j = 0; j<arr.length; j++){
                   var disreq = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+rows[i]['address']+', Champaign IL &destinations='+arr[j]+'&mode=walking&language=en';
                   //console.log(disreq);
                   request(disreq,function(err,res,body){
                       if(!err && res.statusCode == 200){
                           var jsonObj = JSON.parse(body);
                           var distance = jsonObj['rows'][0]['elements'][0]['distance']['value'];
                           if(distance < 300){
                               temp += 5;
                           }
                           else if(distance <600){
                               temp += 3;
                           }
                           else if(distance <1200){
                               //console.log('there, '+scores[i]);
                               temp += 1;
                               console.log('call '+temp);
                           } 
                       } 
                   });
               }
               //console.log("2:"+scores[i]);
           }
           //TODO: get history records
           for(var k =0;k<rows.length;k++){
               console.log(k+': '+scores[k]);
           }
           var result = [];
           for(var m =0; m<1; m++){
                var max = Math.max(scores);
                if(max != -1){
                    var index = scores.indexOf(max);
                    if(index != -1){
                        result.push(rows[index]);
                        scores[index] = -1;
                        console.log(index);
                    }
                }
           }
           callback(err, result);
       }
        else{
            callback(null,null);
        }
    });
};
*/

module.exports = db;