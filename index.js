import "./show-factory.js"
import "./buttons.js"
import './show-form.js' 
import './crud.js'
import { getAllFactoryes } from "./crud.js"
// Данные из монго записываются в localStorage
function store(factory){
    if(factory){
        localStorage.clear()
        localStorage.setItem('factoryes', `${JSON.stringify(factory)}`)
    }
}
store(await getAllFactoryes())