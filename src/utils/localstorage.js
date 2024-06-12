

export function setToLocalStorage(name,data){

    localStorage.setItem(name,JSON.stringify(data));
}

export function getFromLocalStorage(name){
    let data = localStorage.getItem(name);
    data = JSON.parse(data);
    return data;
}