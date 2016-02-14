	//SRC:http://code.tutsplus.com/tutorials/nodejs-for-beginners--net-26314
var http = require('http'), mysql = require("mysql");
var pool = mysql.createPool({ // createConnection({
  host : 'localhost', //101.129.108.171',
  port : 3306,
  database: 'test',
  user : 'root',
  password : ''
});
// Create a simple Web Server to respond to requests
var thisConnection;

http.createServer(function (request, response) { 
	console.log('request in');
    pool.getConnection(function(err, connection) {
        if(err != null) {
            response.end('Error connecting to mysql:' + err+'\n');
        } else {
			connection.query('SELECT * FROM users;', function (err, rows, fields) { 
				if (err) throw err;
	  			console.log('The number of rows: ', rows[0].count);
	  			console.dir(rows);
				response.writeHead(200, { 
					'Content-Type': 'application/json' 
				}); 
				//response.end("Number of rows: "+rows[0].count);
				response.write(JSON.stringify( rows ));  // { a: 1 }
			}); 
            connection.release();
		}
	});
}).listen(8181);
console.log("Listening on 8181");

