'use strict'

let fs = require('fs')
  , ASSETS_EXTENSIONS = 'ico,jpg,png,js,json,xml,map'.split(',')
  ;

let getRoot = function getRoot(req, res) {
    let config = this.config
      , Logger = this.Logger
      ;
    let tplName = req.params.url
      , valid=true
      ;
    if(!tplName){
        tplName = "index.html";
    }
    ASSETS_EXTENSIONS.forEach(function(ext){
      if(tplName.endsWith('.'+ext)){
        valid = false;
      }
    });
    if(!valid){
      Logger.log('warning','Requested file is an asset ['+tplName+'].');
      return res.status(404).send("<h1>404 - Not Found</h1>Requested path not found.");
    }
    res.render(tplName, {title: "Hello"}, function renderTemplate(err, html) {
        if (err) {
            Logger.log('critical','Rendering error:'+err.message);
            return res.status(404).send("<h1>404 - Not Found</h1>Requested path not found.");
        }
        res.send(html);
    });
};


let paths = {
    '/:url([a-z]*)?': {
        "get": getRoot
    }
}


module.exports = paths;

