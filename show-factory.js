function renderFactoryes(arr){
    
    if(arr){
        arr.map(el => {
            const {name, index, host} = el;
            const html = `
            <ul class="app__item item">
                <li class="item__title">${name}</li>
                <li class="item__id">${index}</li>
                <li class="item__host">${host}</li>
            </ul>
            <div class="app__buttons-table">
                <button class="app__btn-change">Изменить</button>
                <button type="submit" class="app__btn-remove">Удалить</button>
            </div>
            `;
            const divElement = document.createElement("div");
            divElement.className = 'app__block';
            divElement.innerHTML = html;

            // Выбираем элемент .item__title только внутри созданного блока
            const titleElement = divElement.querySelector('.item__title');

            if (titleElement) {
                titleElement.textContent = name;
            }

            document.querySelector(".app__list-blocks").appendChild(divElement);
        });
    }
}

renderFactoryes(JSON.parse(localStorage.getItem('factoryes')));
