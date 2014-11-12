var mongoose = require('mongoose'),
  schemas = require( './schemas.js' ),
  https = require( 'https' );

exports.addFBPosts = function( d ){
  var posts = JSON.parse(d).posts.data;
  console.log('updating data...');
  for( var i = 0; i < posts.length; i ++ ){

    var thisData = posts[i];
    var url = "https://graph.facebook.com/v2.2/";
    url += thisData.id;
    url += "/likes?summary=1"
    url += "&access_token=557612781040092|krAaB7t-HMQeqYpN8NNnGUPfVNA";

    var options = {
      host: '',
      path: url
    }

    var request = https.request(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var likes = parseInt( JSON.parse(data).summary.total_count );
            var postModel = mongoose.model( "fbPost", schemas.fbPost );
            var post = new postModel({
              id: thisData.id,
              postDate: thisData.created_time,
              totalLikes: likes
            });
            postModel.findOne({id:"thisData.id"}, function(error, p){
              if( !p ) post.save();
            });
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
  }
  console.log('data update complete');
  // for( var i = 0; i < data.length; i ++ ) {
  //   var thisPoint = data[i].split(',');
  //   var thisDate = new Date();
  //   var thisDateString = String( thisPoint[5] );
  //   thisDate.setFullYear( parseInt( thisDateString.slice(0,4) ) );
  //   thisDate.setMonth( parseInt( thisDateString.slice(5,6) ) );
  //   thisDate.setDate( parseInt( thisDateString.slice(7,8) ) );
  //   var weatherModel = mongoose.model( 'WeatherPoint', schemas.weatherPoint );
  //   var point = new weatherModel({
  //     station: thisPoint[0],
  //     stationName: thisPoint[1],
  //     elevation: parseFloat( thisPoint[2] ),
  //     lat: parseFloat( thisPoint[3] ),
  //     long: parseFloat( thisPoint[4] ),
  //     date: thisDate,
  //     dt00: thisPoint[6],
  //     totalSnow: parseInt( thisPoint[7] ),
  //     mmxt: thisPoint[8],
  //     mmnt: thisPoint[9],
  //   });
  //   point.save( function( err ) {
  //     if( !err ) {
  //       console.log("created");
  //     }
  //     else
  //     {
  //       console.log( err );
  //     }
  //   } );
  //}
  //console.log(posts[0]);
  //console.log(data.length + "points" );
}
