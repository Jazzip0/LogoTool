var autotrace = require('autotrace');

var trace = function(){
  autotrace('../upload/image.' + extention, {
    outputFile: '../upload/image.svg'
  }, function(err, buffer) {
    if (!err){
      console.log("converted to svg");
      $scope.closeDialog();
      this.upload = true;
    }
  });
}
