let input_name_Re = document.getElementById("input_name_Re");
let input_email_Re = document.getElementById("input_email_Re");
let input_1psw_Re = document.getElementById("input_1psw_Re");
let input_2psw_Re = document.getElementById("input_2psw_Re");
let img_Re = document.getElementById("img_Re");
let account_img = document.getElementById("account_img");
let bttn_google =  document.getElementById("Google");
let bttn_send_txt = document.getElementById("bttn_send_txt");
let loader = document.getElementById("loader");

input_name_Re.addEventListener("change", retrieveChanges_Re);
input_email_Re.addEventListener("change", retrieveChanges_Re);
input_1psw_Re.addEventListener("change", retrieveChanges_Re);
input_2psw_Re.addEventListener("change", retrieveChanges_Re);

bttn_send_txt.addEventListener("click", () => {
    animationLoad();
    next();
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleCredentialResponse(response) {
    const jwt = response.credential;
    console.log(jwt)

    // Enviar al backend
    fetch('Php/Account-Verification.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: jwt })
    })
    .then(response => response.text())
    .then(data => {
        console.log(JSON.parse(data));
        transformData(JSON.parse(data));
    });
}

async function transformData(json){
    if(json["status"] === "ok"){
        input_name_Re.value = json.name;
        input_email_Re.value = json.email;
        img_Re.src = json.picture;

        let elements_to_show = [input_1psw_Re.id, input_2psw_Re.id];
        let elements_to_hide = [input_name_Re.id, input_email_Re.id, account_img.id, bttn_google.id];
        animationLoad();
        await delay(500);
        showPasswordsWindow(elements_to_show, elements_to_hide);
    }
}

async function next(){
    if(input_name_Re.value.length === 0){
        input_name_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        let alert_name_or_1psw = document.getElementById("alert_name_or_1psw");
        alert_name_or_1psw.textContent = "Campo Obligatorio."
    } else if(input_email_Re.value.length === 0){
        input_email_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        let alert_email_or_2psw = document.getElementById("alert_email_or_2psw");
        alert_email_or_2psw.textContent = "Campo Obligatorio."
    } else{
        let elements_to_show = [input_1psw_Re.id, input_2psw_Re.id];
        let elements_to_hide = [input_name_Re.id, input_email_Re.id, account_img.id, bttn_google.id];
        animationLoad();
        await delay(500);
        sendCode(input_email_Re.value)
        showPasswordsWindow(elements_to_show, elements_to_hide)
    }
}

function showPasswordsWindow(elements_to_show, elements_to_hide){
    bttn_send_txt.textContent = "Registrate";
    bttn_send_txt.style.display = "block";
    loader.style.display = "none";

    elements_to_show.forEach(id => {
        let element = document.getElementById(id);
        element.style.display  = "block";
    });

    elements_to_hide.forEach(id => {
        let element = document.getElementById(id);
        element.style.display = "none";
    }); 

}

function choosePicture(){
    const img_LogIn = document.getElementById("img_Re");
    const input_picture = document.getElementById("input_file_Re");

    img_LogIn.addEventListener("click", () => {
        input_picture.click();
    });
}

function animationLoad(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    bttn_send_txt.style.display = "none";
    loader.style.display = "block";
}

function retrieveChanges_Re(){
    let alert_name_or_1psw = document.getElementById("alert_name_or_1psw");
    alert_name_or_1psw.textContent = ""

    let alert_email_or_2psw = document.getElementById("alert_email_or_2psw");
    alert_email_or_2psw.textContent = ""
}

function sendCode(email_txt){
    console.log(email_txt);
    fetch('Php/Emails.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email_txt})
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    });
}