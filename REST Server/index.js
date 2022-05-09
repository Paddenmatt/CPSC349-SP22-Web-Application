
const express = require('express')
const cors = require('cors')
const app = express()
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.set('port', 3000)

app.use(express.json())
app.use(cors()) 

// Retrieves all Items 
app.get('/api/shop', function(req, res){
	if (Object.keys(req.query).length == 0) {
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  const dbo = db.db("D&M-Shop");
		  dbo.collection("shop").find({}).toArray(function(err, result) {
			if (err) throw err;
			db.close()
			res.type('application/json')
			res.status(200)
			res.send(result)
		  });
		});		
	}
})

// Adds Item to Shopping List
app.post('/api/shop', function(req, res) {
	MongoClient.connect(url, function(err, conn) {
	  if (err) throw err;
	  var dbo = conn.db("D&M-Shop");

	  const myObj = new Object()
	  myObj.name = req.body.name
	  myObj.type = req.body.type
	  myObj.price = req.body.price
	  myObj.color = req.body.color
	  myObj.qty = req.body.qty
	  myObj.link = req.body.link

	  dbo.collection("shop").insertOne(myObj, function(err, result) {
		  if (err) console.log(err)
		  else {
			  res.type('application/json')
			  res.status(200)
			  res.json(result)
		  }
	  })		
	})
})

// Delete an Item
app.put('/api/shop/:id', function(req, res){
	const id = req.body.id
	console.log(req.body.id)
	const criteria = {_id : new mongo.ObjectID(req.params.id)}
	const newValues = req.body
	MongoClient.connect(url, function(err, conn) {
		if (err) throw err;
		const dbo = conn.db("D&M-Shop");
		dbo.collection('shop').deleteOne({"_id": mongo.ObjectId(id)}, function(err, result){
			if (err) console.log(err)
			else {
				//
				res.type('application/json')
				res.status(200)
				res.json(result)
			}
		})
  	})
})

app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
