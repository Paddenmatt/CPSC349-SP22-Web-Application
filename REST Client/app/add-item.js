
import {Item} from '/item.js'

document.getElementById('create').addEventListener('click', function(event){
	console.log('The Create button was clicked...')
	
	// 1. Retrieve user's inputs
	const name = document.getElementById('name').value
	const type = document.getElementById('type').value
	const price = document.getElementById('price').value
	const color = document.getElementById('color').value
	const qty = document.getElementById('qty').value
	const link = document.getElementById('link').value

	// 2. Prepare and send REST request
	console.log('Sending REST request to save object ...')
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/shop')
	const stObj = new Item(name, type, price, color, qty, link)

	// Set the Content-Type 
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			window.location.href = 'http://localhost:4020/'
		}
	}
	// JSON encoding 
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)

})
