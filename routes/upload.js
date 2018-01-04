/**
 * Created by supun on 04/01/18.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    console.log("update richfilemanager")
    var io = req.app.get('io');
    console.log("update");
    io.emit("update",{msg:"upload"});
    res.sendStatus(200);
});

module.exports = router;
