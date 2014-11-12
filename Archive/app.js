var application_root = __dirname,
  fs = require( "fs" ),
  methodOverride = require( "method-override" ),
  static = require( "serve-static" ),
  express = require( "express" ),
  path = require( "path" ),
  mongoose = require( "mongoose" ),
  schemas = require( "./src/schemas.js" ),
  db = require( "./src/db.js"  ),
  bodyParser = require( "body-parser" );

var app = express();

mongoose.connect( "mongodb://localhost/meyermap2" );

app.use( bodyParser.text() );
app.use( methodOverride() );
app.use( static( path.join( application_root, "public" ) ) );
//  app.use( express.errorHandler( {dumpExceptions: true, showStack: true } ) );

app.get( '/api', function( req,res ) {
  res.send( "API RUNNING" );
} );

app.get( '/test', function( req,res ){
  fs.readFile('./data/2011.csv', 'utf8', function( err,data ) {
    if( err ){
      console.log( err );
    }
    else{
      db.addWeatherData( data );
    }
  });
  res.send( "ok" );
} );

app.listen( 8080 );