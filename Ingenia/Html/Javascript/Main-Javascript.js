//-------------------------------------------------------// SIGN UP & SIGN IN // --------------------------------------------------------//

let input_name_Re = document.getElementById("input_name_Re");
let input_lastname_Re = document.getElementById("input_lastname_Re");
let input_email_Re = document.getElementById("input_email_Re");
let input_1psw_Re = document.getElementById("input_1psw_Re");
let input_2psw_Re = document.getElementById("input_2psw_Re");
let img_Re = document.getElementById("img_Re");
let account_img = document.getElementById("account_img");
let bttn_google =  document.getElementById("Google");
let bttn_send_txt = document.getElementById("bttn_send_txt");
let bttn_send = document.getElementById("bttn_send");
let loader = document.getElementById("loader");
let input_code_Re = document.getElementById("input_code_Re");
let alert_email_or_2psw = document.getElementById("alert_email_or_2psw");
let alert_name_or_1psw = document.getElementById("alert_name_or_1psw");

input_name_Re.addEventListener("change", retrieveChanges_Re);
input_email_Re.addEventListener("change", retrieveChanges_Re);
input_1psw_Re.addEventListener("change", retrieveChanges_Re);
input_2psw_Re.addEventListener("change", retrieveChanges_Re);
input_code_Re.addEventListener("change", retrieveChanges_Re);

bttn_send.addEventListener("click", async () => {
    animationLoad();
    await delay(500);
    if(getComputedStyle(input_name_Re).display !== "none"){
        next();
    } else if(getComputedStyle(input_code_Re).display !== "none"){
        console.log(sessionStorage.getItem('email'))
        VerificationCodeWindow(sessionStorage.getItem('email'));
    } else{
        verifyPasswords();
    };
});

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('fullname').length !== '{}'){
        const fullname = sessionStorage.getItem('fullname');
        const email = sessionStorage.getItem('email');

        const fullname_array = fullname.split(' ', 2);
        const name = fullname_array[0];
        const surname = fullname_array[1];

        elements_to_show = [input_name_Re, input_email_Re, input_lastname_Re];
        elements_to_hide = [];

        verifyPasswords();
    }
})

function hideLoader(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    loader.style.display = "none";
    bttn_send_txt.style.display = "block";
}

function hideAndShow(elements_to_show, elements_to_hide){
    elements_to_show.forEach(element => {
        element.style.display = "inline-block";
    });
    elements_to_hide.forEach(element => {
        element.style.display = "none";
    }); 
}

function generateUsername(text) {
    let fullName = normalizeText(text);

    let clean = normalizeText(fullName);
    let parts = clean.split(" ");

    let firstName = parts[0];
    let lastName = parts[parts.length - 1];

    return `${firstName}.${lastName}`;
}

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, "")
        .trim();
}

function almacenate(data){
    let username = generateUsername(data['sent_to'][0] + data['sent_to'][1]);
    localStorage.setItem('user', JSON.stringify({
        username: username,
        names: data['sent_to'][0],
        lastnames: data['sent_to'][1],
        email: data['sent_at']
    }));
    sessionStorage.setItem("fullname", data['names'] + ' ' + data['lastnames']);
    sessionStorage.setItem("email", data['email'])
}

function disableInputs(inputs){
    inputs.forEach(i => {
        i.disabled = true;
    })
}

function ableInputs(inputs){
    inputs.forEach(i => { 
        i.disabled = false;
    })
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleCredentialResponse(response) {
    const jwt = response.credential;

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
        const user = json.name.split(' ');
        input_name_Re.value = user[0];
        input_lastname_Re.value = user[1];
        input_email_Re.value = json.email;
        img_Re.src = json.picture;

        let elements_to_show = [input_1psw_Re, input_2psw_Re];
        let elements_to_hide = [input_lastname_Re, input_name_Re, input_email_Re, account_img, bttn_google];
        let inputs_to_disables = [input_lastname_Re, input_name_Re, input_email_Re];
        disableInputs(inputs_to_disables);
        animationLoad();
        await delay(500);
        hideAndShow(elements_to_show, elements_to_hide);
        PasswordsWindow();
    } else{
        console.log(json['error']);
    }
}

async function next(){
    if(input_name_Re.value.length === 0){
        input_name_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        alert_name_or_1psw.style.marginLeft = "15px";
        alert_name_or_1psw.style.color = "white";
        alert_name_or_1psw.textContent = "Campo Obligatorio."
    } else if(input_lastname_Re.value.length === 0){
        input_lastname_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        alert_name_or_1psw.style.marginLeft = "15px";
        alert_name_or_1psw.style.color = "white";
        alert_name_or_1psw.textContent = "Campo Obligatorio."
    } else if(input_email_Re.value.length === 0){
        input_email_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        alert_email_or_2psw.style.marginLeft = "15px";
        alert_email_or_2psw.style.color = "white";
        alert_email_or_2psw.textContent = "Campo Obligatorio.";
    } else{
        let inputs_to_disabled = [input_name_Re, input_lastname_Re, input_email_Re]
        disableInputs(inputs_to_disabled);
        animationLoad();
        await delay(500);
        let json_data = JSON.stringify({
            names: input_name_Re.value,
            lastnames: input_lastname_Re.value,
            email: input_email_Re.value,
            domain: 'google'
        });
        sendCode(json_data);
    }
    hideLoader();
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
    alert_name_or_1psw.textContent = "";
    alert_email_or_2psw.textContent = "";
}

function sendCode(user_data){
    fetch('Php/Emails.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user_data
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        emailSent(JSON.parse(data))
    });
}

function emailSent(response){
    try{
        if(response['error'] === null){
            if(response["status"] === "ok"){
                console.log('Correo enviado');
                let elements_to_show = [input_code_Re];
                let elements_to_hide = [input_lastname_Re, input_name_Re, input_email_Re, account_img, bttn_google];
                disableInputs(elements_to_hide);
                hideAndShow(elements_to_show, elements_to_hide);
                almacenate(response);
            } else{
                console.log('Hubo un error al enviar el correo. ' + 'Estado del envío: ' + response['status']);
            }
        } else {
            console.log(response['error']);
            alert("Recargue la página y vuelva a intentarlo")
        }
    } catch(e){
        console.log({ name: e.name, 
            message: e.message});
        console.log("Error");
    };
}

async function VerificationCodeWindow(email){
    loader.style.display = "none";
    bttn_send.style.display = "block";

    alert_email_or_2psw.style.marginLeft = "15px";
    alert_email_or_2psw.style.color = "white";

    if(!input_code_Re.value){
        alert_email_or_2psw.textContent = "Ingresa el código que te hemos enviado";
        input_code_Re.focus();
    } else {
        if (input_code_Re.value.length < 6){
            alert_email_or_2psw.textContent = "El código requiere de 6 caracteres";
            input_code_Re.focus();
        } else {
            codeVerification(input_code_Re.value, email);
        };
    };
    hideLoader();
}

function codeVerification(code, email){
    fetch('Php/Code-Verification.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code: code, email: email})
    })
    .then(response => response.text())
    .then(data => codeVerificationResponse(JSON.parse(data)));
}

async function codeVerificationResponse(response){
    alert_email_or_2psw.style.marginLeft = "15px";
    alert_email_or_2psw.style.color = "white";
    console.log(response);
    if(response['status'] === 'ok'){
        let elements_to_show = [input_1psw_Re, input_2psw_Re];
        let elements_to_hide = [input_code_Re];
        disableInputs(elements_to_hide);
        hideAndShow(elements_to_show, elements_to_hide);
        PasswordsWindow();
    } else if(response['error'] !== 'null'){
        alert_email_or_2psw.textContent = "Código incorrecto. Digítalo otra vez.";
    }
}

async function PasswordsWindow(){
    bttn_send_txt.textContent = "Registrate";
    bttn_send_txt.style.display = "block";
    loader.style.display = "none";
}

function verifyPasswords(){
    loader.style.display = "none";
    bttn_send.style.display = "block";
    alert_name_or_1psw.style.marginLeft = "15px";
    alert_name_or_1psw.style.color = "white";
    alert_email_or_2psw.style.marginLeft = "15px";
    alert_email_or_2psw.style.color = "white";

    if(input_1psw_Re.value.length < 8){
        alert_name_or_1psw.textContent = 'Contraseña demasiado corta';
    } else if(input_1psw_Re.value !== input_2psw_Re.value){
        alert_email_or_2psw.textContent = 'La contraseña no coincide';
    } else{
        hideLoader();
        let inputs_to_disable = [input_1psw_Re, input_2psw_Re];
        let fullName = input_name_Re.value + ' ' + input_lastname_Re.value;

        disableInputs(inputs_to_disable);
        generateUsername(fullName);
    };
}

function registerUser(){
    fetch('Php/Register_new_user_in_DB.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'username',
            name: 'name',
            lastnames: 'lastnames',
            email: 'email',
            picture: 'picture'
        })  
    })
    .then(response => response.text())
    .then(data => console.log(data))
}

function verifyMicrosoftAccount(){
    const client_id = "c3c3fd20-6fd8-4d78-9500-8ad1cb909b22";
    const redirect_uri = encodeURIComponent("https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Php/Microsoft-Account-Verification.php");

    const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=openid profile email`;
    
    window.location.href = url;
}

function send_outlook(user_data){
    
}