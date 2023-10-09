import "./show-factory.js"
import "./buttons.js"
import './show-form.js' 







export const listFactoryes = JSON.parse(localStorage.getItem('factoryes')) || []




// Данные из монго записываются в localStorage

async function  getAllFactoryes(){
    try {
        const response = await fetch('http://127.0.0.1:4000/factory') 
        return response.json()
    } catch (error) {
        throw new Error(error)
    }
}

let data = await getAllFactoryes()
function store(factory){
        localStorage.clear()
        localStorage.setItem('factoryes', `${JSON.stringify(factory)}`)
    
}
store(data)

