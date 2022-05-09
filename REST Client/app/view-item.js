
const objId = prompt('Enter the Item ID you wish to view more details for: ')

const xhr = new XMLHttpRequest()
xhr.open('GET', `http://localhost:3000/api/shop${objId}`)
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        const body = document.getElementsByTagName('body')[0]
        for (const s of this.response) {
            body.appendChild(document.createElement('br'))
            body.appendChild(document.createElement('br'))
            let c = document.createElement('label')
            let txt = document.createTextNode(`Name: ${s.name}`)
            c.appendChild(txt)
            body.appendChild(c)

            body.appendChild(document.createElement('br'))
            c = document.createElement('label')
            txt = document.createTextNode(`ID: ${s._id}`)
            c.appendChild(txt)
            body.appendChild(c)

            body.appendChild(document.createElement('br'))
            c = document.createElement('label')
            txt = document.createTextNode(`Type: ${s.type}`)
            c.appendChild(txt)
            body.appendChild(c)

            body.appendChild(document.createElement('br'))
            c = document.createElement('label')
            txt = document.createTextNode(`Color: ${s.color}`)
            c.appendChild(txt)
            body.appendChild(c)

            body.appendChild(document.createElement('br'))
            c = document.createElement('label')
            txt = document.createTextNode(`Qty: ${s.qty}`)
            c.appendChild(txt)
            body.appendChild(c)

            body.appendChild(document.createElement('br'))
            c = document.createElement('a')
            c.href = s.link
            c.text = 'Link to Item'
            body.appendChild(c)
        }
    }
}
xhr.send()
