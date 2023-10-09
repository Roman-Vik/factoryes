const form = document.querySelector('.app__data')
const inputs = document.querySelectorAll('input')

export const data = {host:[]}

function getInputsData(e){
    switch(e.target.name){
        case 'index':{
            data.index = e.target.value
            break;
        }
        case 'name':{
            data.name = e.target.value
            break;
        }
        case 'host-num-first':{
            data.host[0] = e.target.value
            break;
        }
        case 'host-num-second':{
            data.host[1] = `${e.target.value}`;
            break;
        }
        case 'host-num-thrid':{
            data.host[2] = `${e.target.value}`;
            break;
        }
        case 'host-num-fourth':{
            data.host[3]= `${e.target.value}`;
            break;
        }
    }
}

 form.addEventListener('input', getInputsData)

export function clearForm(){
    inputs[0].value = ""
    inputs[1].value = ""
    inputs[2].value = ""
    inputs[3].value = ""
    inputs[4].value = ""
    inputs[5].value = ""
}

document.querySelector('.app__btn-cancel').addEventListener('click', clearForm)






