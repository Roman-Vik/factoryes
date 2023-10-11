export async function  getAllFactoryes(){
    try {
        const response = await fetch('http://127.0.0.1:4000/factory') 
        return response.json()
    } catch (error) {
        throw new Error(error)
    }
}
export async function createFactory(factory) {
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
export async function updateFactory(id, factory) {
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
export async function deleteFactoty(factory) {
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