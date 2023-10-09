import { data } from "./show-form.js";
import { clearForm } from "./show-form.js";
const list = document.querySelector(".app__list-blocks");
const btnSave = document.querySelector(".app__btn-save");
const blocks = document.querySelectorAll(".app__block");

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

async function createFactory(factory) {
    try {
        const response = await fetch("http://127.0.0.1:4000/factory/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(factory),
        });
    } catch (error) {
        console.error("Ошибка:", error);
    }
}
async function updateFactory(id, factory) {
    try {
        console.log( "Check",id, factory)
        const response = await fetch("http://127.0.0.1:4000/factory/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...factory, host: factory.host.join('.')}),
        }); if (!response.ok) {
            const errorText = await response.text(); // Получите текст ответа для более подробной информации
    throw new Error("Ошибка сети: " + response.status + " " + errorText);
        }
        const data = await response.json();
    } catch (error) {
        console.error("Ошибка:", error);
    }
}
async function postDeleteFactoty(factory) {
    try {
        const response = await fetch("http://127.0.0.1:4000/factory/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(factory), //! если не получиться убери скобки Передаем поля для удаления
        });
        if (!response.ok) {
            throw new Error("Ошибка сети");
        }
        const data = await response.json();
    } catch (error) {
        console.error("Ошибка:", error);
    }
}

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
        let dataFilter = dataLocalStorage.filter(
            (factoryes) => factoryes.name != data.name
        );
        localStorage.removeItem("factoryes");
        localStorage.setItem("factoryes", JSON.stringify(dataFilter));
        const get = localStorage.getItem("factoryes");
        elem.style = "display:none;";
        postDeleteFactoty(data);
    }
}

function changeFactoryHtml(e) {
    const { index, name, host, nodeId } = data;
    const activeStatusBtn = localStorage.getItem("checkBtn");
    switch (activeStatusBtn) {
        case "app__btn-add": {
            console.log("activeStatusBtn = add");
            if (
                index &&
                name &&
                (host.join(".").replace(/[^0-9]/g, "").length > 5 ||
                    host.join(".").replace(/[^0-9]/g, "").length < 13)
            ) {
                const html = `
                    <ul class="app__item item">
                        <li class="item__title">${name}</li>
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
                // location.reload();
                document.querySelector(".app__first-page").style =
                    "display:block;";
                document.querySelector(".app__second-page").style =
                    "display:none;";
            } else {
                alert("форма заполнена некорректно");
            }
            break;
        }
        case "app__btn-change": {
            console.log("updateData пришла", updateData)
            if (index && name) {
                const dataLocalStorage = JSON.parse(localStorage.getItem("factoryes"));
                let changedFactory = null;
                for (let i = 0; i < dataLocalStorage.length; i++) {
                    if (dataLocalStorage[i].name === updateData.name) {
                        
                        // Если нашли подходящий элемент, обновляем его и выходим из цикла
                        dataLocalStorage[i].name  =  data.name;
                        dataLocalStorage[i].index = data.index;
                        dataLocalStorage[i].host  =  data.host;
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
                    host.textContent = changedFactory.host;
                    const idFactory = changedFactory["_id"]
                    updateFactory(idFactory, changedFactory);
                    localStorage.setItem("factoryes",JSON.stringify(dataLocalStorage));
                    console.log("Изменить", changedFactory);
                    document.querySelector(".app__first-page").style =
                        "display:block;";
                    document.querySelector(".app__second-page").style =
                        "display:none;";
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
