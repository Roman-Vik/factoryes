import { data } from "./show-form.js";
import { clearForm } from "./show-form.js";
const list = document.querySelector(".app__list-blocks");
const btnSave = document.querySelector(".app__btn-save");
const blocks = document.querySelectorAll(".app__block");
import { createFactory, updateFactory, deleteFactoty } from "./crud.js";

document.querySelector(".app__btn-add").addEventListener("click", (e) => {
    localStorage.removeItem("checkBtn");
    localStorage.setItem("checkBtn", e.target.className);
    document.querySelector(".app__first-page").style = "display:none;";
    document.querySelector(".app__second-page").style = "display:block;";
});

const updateData = {};
blocks.forEach((elem, i) => {
    elem.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target.classList.contains("app__btn-change")) {
            const listData =
                e.target.parentElement.parentElement.firstElementChild.children;
            updateData.name = listData[0].innerText;
            updateData.index = listData[1].innerText;
            updateData.host = listData[2].innerText;
            updateData.nodeId = i;

            localStorage.removeItem("checkBtn");
            localStorage.setItem("checkBtn", e.target.className);
            document.querySelector(".app__first-page").style = "display:none;";
            document.querySelector(".app__second-page").style =
                "display:block;";
        }
    });
});



function removeFactoryHtml(e) {
    if (e.target.classList.contains("app__btn-remove")) {
        let listData =
        e.target.parentElement.parentElement.firstElementChild.children;
        let elem = e.target.parentElement.parentElement;
        let data = {
            index: listData[1].innerText,
            name: listData[0].innerText,
            host: listData[2].innerText,
        };
        console.log("remove element ", data);
        const dataLocalStorage = JSON.parse(localStorage.getItem("factoryes"));
        console.log( "localstorage", dataLocalStorage);

        let dataFilter = dataLocalStorage.filter( (factoryes) => factoryes.name != data.name);
            elem.style = "display:none;";   
        localStorage.removeItem("factoryes");
        localStorage.setItem("factoryes", JSON.stringify(dataFilter));
         deleteFactoty(data);
         location.reload();
         
    }
}
function changeFactoryHtml(e) {
    const { index, name, host, nodeId } = data;
    const activeStatusBtn = localStorage.getItem("checkBtn");
    switch (activeStatusBtn) {
        
        case "app__btn-add": {
            const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

            let duble =  JSON.parse(localStorage.getItem('factoryes')).find(e => e.name.toLowerCase() === name.toLowerCase())
           if(duble){
            alert("такое имя уже существует")
        } else if ( index && name && ipPattern.test(host.join("."))
                
) {
                const html = `
                    <ul class="app__item item">
                        <li class="item__title">"${name}"</li>
                        <li class="item__id">${index}</li>
                        <li class="item__host">${host.join(".")}</li>
                    </ul>
                    <div class="app__buttons-table">
                    <button class="app__btn-change">Изменить</button>
                   <button class="app__btn-remove">Удалить</button>
               </div>
                    `;
                const divElement = document.createElement("div");
                divElement.className = "app__block";
                divElement.innerHTML = html;
                list.appendChild(divElement);
                clearForm();
                const dataLocalStorage = localStorage.getItem("factoryes");
                let dataArr = JSON.parse(dataLocalStorage) || [];
                dataArr.push(data);
                localStorage.removeItem("factoryes");
                localStorage.setItem("factoryes", JSON.stringify(dataArr));
                const get = localStorage.getItem("factoryes");
                console.log("localstorage", JSON.parse(get));
                createFactory({ ...data, host: data.host.join(".") });
                alert("Завод добавлен");
                document.querySelector(".app__first-page").style = "display:block;";
                document.querySelector(".app__second-page").style = "display:none;";
                    location.reload();
            } else {
                alert("форма заполнена некорректно");
            }
            break;
        }
        case "app__btn-change": {
            const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
            console.log("updateData пришла host", ipPattern.test(host.join(".")))
            if (index && name && ipPattern.test(host.join("."))) {
                const dataLocalStorage = JSON.parse(localStorage.getItem("factoryes"));
                let changedFactory = null;
                for (let i = 0; i < dataLocalStorage.length; i++) {
                    if (dataLocalStorage[i].name === updateData.name) {
                        // Если нашли подходящий элемент, обновляем его и выходим из цикла
                        dataLocalStorage[i].name  =  data.name;
                        dataLocalStorage[i].index = data.index;
                        dataLocalStorage[i].host  =  data.host
                        dataLocalStorage[i].nodeId = updateData.nodeId
                        changedFactory = dataLocalStorage[i];
                        break;
                    }
                }
                if (changedFactory) {
                    // Получаем ссылку на элемент с указанным классом
                    let name =blocks[changedFactory.nodeId].querySelector( ".item__title" );
                     name.textContent = changedFactory.name;
                    let id = blocks[changedFactory.nodeId].querySelector( ".item__id");
                    id.textContent = changedFactory.index;
                    let host =blocks[changedFactory.nodeId].querySelector(".item__host");
                    host.textContent = changedFactory.host.join('.');
                    const idFactory = changedFactory["_id"]
                    updateFactory(idFactory, changedFactory);
                    localStorage.setItem("factoryes",JSON.stringify(dataLocalStorage));
                    document.querySelector(".app__first-page").style =
                        "display:block;";
                    document.querySelector(".app__second-page").style =
                        "display:none;";
                        location.reload();
                } else {
                    console.log(
                        "Не удалось найти подходящий элемент для изменения."
                    );
                }
            } 
            break;
        }
    }
}

btnSave.addEventListener("click", changeFactoryHtml);
list.addEventListener("click", removeFactoryHtml);