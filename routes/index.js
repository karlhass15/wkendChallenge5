var express = require("express");
var router = express.Router();
var path = require('path');


var bodyParser = require('body-parser');

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get("/*", function(req, res) {
    var file = req.params[0] || "admin.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;