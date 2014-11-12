var mongoose = require('mongoose'),
  schemas = require( './schemas.js' );

exports.addFBPosts = function( d ){
  var posts = JSON.parse(d).posts.data;
  for( var i = 0; i < posts.length; i ++ ){
    var thisData = posts[i];
    var postModel = mongoose.model( "fbPost", schemas.fbPost );
    var post = new postModel({
      id: thisData.id,
      postDate: thisData.created_time,
      totalLikes: thisData.likes.data.length
    });
    console.log( thisData.likes.data.length );
}
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
  console.log(posts[0]);
  //console.log(data.length + "points" );
}
