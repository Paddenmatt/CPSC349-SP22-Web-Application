
const objId = prompt('Enter the Item ID you wish to delete: ')

const xhr = new XMLHttpRequest()
xhr.open('PUT', `http://localhost:3000/api/shop/${objId}`)

const newValues = {id : objId}

// JSON encoding 
const jsonStr = JSON.stringify(newValues)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
		
	}
}
xhr.send(jsonStr)
