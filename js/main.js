var siteNameInput = document.getElementById('SiteName') ;
var siteUrlInput = document.getElementById('SiteURL') ;
var secondPage = document.getElementById('secondPage');
var url = siteUrlInput.value ;


var sitesList = [];

if (localStorage.getItem('sites') !== null) {
    sitesList = JSON.parse (localStorage.getItem('sites'));
    displaySite(sitesList);
}

function addSite() {
    
    if (nameValidation() === true && urlValidation() === true) {
        // create Site
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    };
    // push to list
    sitesList.push(site);
    console.log(sitesList);
    
    // clear inputs 
    clearInputs();

    // set site at local storage and display 
    setSiteAtLocalStorage();
    } else {
        showAlert();
    }
    
}

function clearInputs(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displaySite(list){
    var item = ``;
    for ( i = 0; i < list.length; i++) {
        
        item += `
        <tr>
        <td>${i+1}</td>
        <td>${list[i].name}</td>
        <td><a href="${list[i].url}" target= "_blank"  class="btn btn-visit text-white px-3 fs-6">
        <i class="fa-solid fa-eye pe-1"></i>
        visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteSite(${i});">
        <i class="fa-solid fa-trash-can pe-1"></i>
        Delete</button></td>
        </tr> `
    }

    document.getElementById('tbody').innerHTML = item;
}


function setSiteAtLocalStorage(){
    localStorage.setItem('sites', JSON.stringify(sitesList));
    displaySite(sitesList);
}


function deleteSite(index){
    sitesList.splice(index , 1);
    setSiteAtLocalStorage();
}


function nameValidation(){
    var validName = /^[a-zA-Z]{3,10}$/;
    if (validName.test(siteNameInput.value) === true) {
        return true ;
    } else {
        return false ;
    }
}

function urlValidation() {
    var validUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/ ;
    if (validUrl.test(siteUrlInput.value) === true) {
        return true ;
    } else {
        return false ;
    }

}

function showAlert() {
    secondPage.classList.replace('d-none' , 'd-block');
}


function hideAlert() {
    secondPage.classList.replace('d-block' , 'd-none');
}


function filteredsiteListByName(term) {
    var filterdArray = [];
    var lowerCaseTerm = term.toLocaleLowerCase();


    for (i = 0; i < sitesList.length; i++) {
        if (sitesList[i].name.toLocaleLowerCase().includes(lowerCaseTerm) === true) {
            filterdArray.push(sitesList[i]);
        }
    }
    displaySite(filterdArray);
    
}