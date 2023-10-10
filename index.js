import "./show-factory.js"
import "./buttons.js"
import './show-form.js' 
import "./crud.js"
import { getAllFactoryes } from "./crud.js"

let data = await getAllFactoryes()
function store(factory){
        localStorage.clear()
        localStorage.setItem('factoryes', `${JSON.stringify(factory)}`)
}
store(data)

