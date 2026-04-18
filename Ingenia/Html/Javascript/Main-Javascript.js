let input_name_Re = document.getElementById("input_name_Re");
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
        hideLoader();
        next();
    } else if(getComputedStyle(input_code_Re).display !== "none"){
        hideLoader();
        VerificationCodeWindow(localStorage.getItem('email'));
    } else{
        hideLoader();
        verifyPasswords();
    };
});

function hideLoader(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    loader.style.display = "none";
    bttn_send_txt.style.display = "block";
}

function hideAndShow(elements_to_show, elements_to_hide){
    elements_to_show.forEach(element => {
        element.style.display  = "inline-block";
    });
    elements_to_hide.forEach(element => {
        element.style.display = "none";
    }); 
}

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

        let elements_to_show = [input_1psw_Re, input_2psw_Re];
        let elements_to_hide = [input_name_Re, input_email_Re, account_img, bttn_google];
        animationLoad();
        await delay(500);
        PasswordsWindow(elements_to_show, elements_to_hide);
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
    } else if(input_email_Re.value.length === 0){
        input_email_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        alert_email_or_2psw.style.marginLeft = "15px";
        alert_email_or_2psw.style.color = "white";
        alert_email_or_2psw.textContent = "Campo Obligatorio.";
    } else{
        animationLoad();
        await delay(500);
        sendCode(input_email_Re.value);
    }
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
        emailSent(JSON.parse(data))
    });
}

function emailSent(response){
    try{
        if(response['error'] === null){
            if(response["status"] === "ok"){
                console.log('Correo enviado');
                let elements_to_show = [input_code_Re];
                let elements_to_hide = [input_name_Re, input_email_Re, account_img, bttn_google];

                hideAndShow(elements_to_show, elements_to_hide);
                localStorage.setItem('email', response['sent_at']);
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
    } else {
        if (input_code_Re.value.length < 6){
            alert_email_or_2psw.textContent = "El código requiere de 6 caracteres";
        } else {
            codeVerification(input_code_Re.value, email);
        };
    };
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
    console.log(response['error']);
    if(response['status'] === 'ok'){
        let elements_to_show = [input_1psw_Re, input_2psw_Re];
        let elements_to_hide = [input_code_Re];
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
}

function verification_microsoft_account(){
    let Microsoft = document.getElementById("Microsoft");
    Microsoft.addEventListener("click", ()=>{
        window.location.href = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=c3c3fd20-6fd8-4d78-9500-8ad1cb909b22&response_type=code&redirect_uri=http://localhost/Ingenia/Html/Php/Microsoft-Account-Verification.php&scope=openid profile email";
    });
}
