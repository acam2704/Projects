//-------------------------------------------------------// SIGN UP & SIGN IN // --------------------------------------------------------//

// Definición de las variables de todos los elementos de html que se usarán en cada rincón de este Javascript
let input_name_Re = document.getElementById("input_name_Re");
let input_lastname_Re = document.getElementById("input_lastname_Re");
let input_email_Re = document.getElementById("input_email_Re");
let input_1psw_Re = document.getElementById("input_1psw_Re");
let input_2psw_Re = document.getElementById("input_2psw_Re");
let input_code_Re = document.getElementById("input_code_Re");
let input_DUI_Re = document.getElementById("input_DUI_Re");
let img_Re = document.getElementById("img_Re");
let account_img = document.getElementById("account_img");
let bttn_microsoft = document.getElementById("Microsoft");
let bttn_google =  document.getElementById("Google");
let bttn_send_txt = document.getElementById("bttn_send_txt");
let bttn_send = document.getElementById("bttn_send");
let loader = document.getElementById("loader");
let alert_email_or_2psw = document.getElementById("alert_email_or_2psw");
let alert_name_or_1psw = document.getElementById("alert_name_or_1psw");
let legal_information_section_text = document.getElementById("legal_information_section_text");
let error_text_alert = document.getElementById("error_text_alert");
let content_check_buttons_with = document.getElementById("content_check_buttons_with");

// Se ingresa la función retrieveChanges_Re, que quita los text_alert, cuando el valor cambia
input_name_Re.addEventListener("change", retrieveChanges_Re);
input_email_Re.addEventListener("change", retrieveChanges_Re);
input_1psw_Re.addEventListener("change", retrieveChanges_Re);
input_2psw_Re.addEventListener("change", retrieveChanges_Re);
input_code_Re.addEventListener("change", retrieveChanges_Re);

// Función que permite simular 
function Go_back(){

}

// Función que permite deshabilitar los inputs al cargar la página
function disable_all_inputs(){
    let inputs = [input_name_Re, input_lastname_Re, input_email_Re, input_1psw_Re, input_2psw_Re, input_code_Re, input_DUI_Re];
    disableInputs(inputs);
}

// Se ingresa, en el evento "click" de el botón de Registrarse condiciones que ejecutan funciones
// dependiendo del campo en el que el usuario se encuentra
bttn_send.addEventListener("click", async () => {
    // Se deshabilitan todos los inputs
    disable_all_inputs();

    // Se oculta el texto de alerta, por si hubo un error anteriormente
    error_text_alert.style.display = 'none';
    // Se reestablece el marginTop de bttn_send
    bttn_send.style.marginTop = "20px";

    // Al dar click, se muestra la animación de carga en el botón
    animationLoad();
    // Se espera medio segundo
    await delay(500);

    // Se valida el campo en el que se encuentra el usuario según los inputs mostrados
    if(getComputedStyle(input_name_Re).display !== "none"){
        // Se validan los campos de ingreso de Información Personal
        next();
    } else if(getComputedStyle(input_code_Re).display !== "none"){
        // Se valida el código de verificación enviado al correo
        console.log(sessionStorage.getItem('email'));
        VerificationCodeWindow(sessionStorage.getItem('email'));
    } else{
        // Se validan las contraseñas digitadas por el usuario
        verifyPasswords();
    }
});

// Función que 
document.addEventListener('DOMContentLoaded', async function() {
    if (sessionStorage.getItem('fullname').length !== '{}'){
        const fullname = sessionStorage.getItem('fullname');
        const email = sessionStorage.getItem('email');

        const fullname_array = fullname.split(' ', 2);
        const name = fullname_array[0];
        const surname = fullname_array[1];

        disable_all_inputs()

        let elements_to_show = [input_1psw_Re, input_2psw_Re];
        let elements_to_hide = [input_name_Re, input_lastname_Re, input_email_Re];
        ableInputs(elements_to_show);
        input_name_Re.value = name;
        input_lastname_Re.value = surname;
        input_email_Re.value = email;
        
        hideAndShow(elements_to_show, elements_to_hide);

        PasswordsWindow();
    }
})

// Función que oculta la animación de carga y muestra el texto del botón
function hideLoader(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    loader.style.display = "none";
    bttn_send_txt.style.display = "block";
}

// Función que permite ocultar y mostrar inputs
function hideAndShow(inputs_to_show, inputs_to_hide){
    inputs_to_show.forEach(input => {
        input.style.display = "inline-block";
    });
    inputs_to_hide.forEach(input => {
        input.style.display = "none";
    }); 
}

// Función que permite ocultar y mostrar elementos html
function hide_and_show_elements(elements_to_show, elements_to_hide){
    elements_to_show.forEach(element => {
        element.style.display = "block";
    });
    elements_to_hide.forEach(element => {
        element.style.display = "none";
    }); 
}

// Función que permite generar un username
function generateUsername(text) {
    // Se normaliza el texto y se almacena en una variable 'fullName'
    let fullName = normalizeText(text);
    // El nombre se parte entre espacios
    let parts = fullName.split(" ");
    
    // Se almacena en una variable el nombre del usuario
    let firstName = parts[0];
    // Del supuesto apellido se toma todo menos su último caracter
    let lastName = parts[parts.length - 1];

    // Se devuelve los dos strings
    return `${firstName}.${lastName}`;
}

// Función que permite eliminar caracteres extraños del nombre del usuario
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, "")
        .trim();
}

// Función que almacena datos dentro de localStorage y sessionStorage
function almacenate(data){
    // Almacenamiento de los datos importantes del usuario en el localStorage como JSON
    localStorage.setItem('user', JSON.stringify({
        names: data['sent_to'][0],
        lastnames: data['sent_to'][1],
        email: data['sent_at']
    }));
    // Se almacena en la sesión, temporalmente, el dato 'email' del usuario
    sessionStorage.setItem("email", data['sent_at']);
    sessionStorage.setItem("fullname", data['sent_to'][0] + ' ' + data['sent_to'][1]);
}

// Función que permite deshabilitar inputs
function disableInputs(inputs){
    // A cada input enviado dentro de la lista 'inputs' se cambia a TRUE la propiedad 'disabled' 
    // Esto impide la modificación de los valores imprimidos anteriormente en el input. 
    inputs.forEach(i => {
        i.disabled = true;
    })
}

// Función que permite habilitar inputs
function ableInputs(inputs){
    // A cada input enviado dentro de la lista 'inputs' se cambia a FALSE la propiedad 'disabled' 
    // Esto permite el ingreso de valores dentro de cada input 
    inputs.forEach(i => { 
        i.disabled = false;
    })
}

// Función que permite una espera, dada en milisegundos, dentro de la ejecución de código
// en una función ASYNC.
function delay(ms) {
    // Se crea una promesa
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función que se usa al verificar la cuenta con Google (data-callback="handleCredentialResponse")
function handleCredentialResponse(response) {
    // Se toman las credenciales devueltas por la API
    const jwt = response.credential;

    // Se mandan las credenciales a "Account-Verification.php" para verificar que éstas son verídicas
    fetch('Php/Account-Verification.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: jwt })
    })
    .then(response => response.text())
    .then(data => {
        // El mensaje devuelto se procesa en la función "transformData"
        transformData(JSON.parse(data));
    });
}

// Función que se usa al verificar la cuenta con Google (handleCredentialResponse -> transformData)
async function transformData(json){
    // El status de la respuesta a la verificación de las credenciales debe de ser 'ok'
    if(json["status"] === "ok"){
        // El nombre del usuario tomado de sus credenciales es dividida por sus espacios
        const user = json.name.split(' ');

        // Se ingresa el supuesto nombre y el apellido del usuario
        input_name_Re.value = user[0];
        input_lastname_Re.value = user[1];
        input_email_Re.value = json.email;
        img_Re.src = json.picture;

        // Se preparan los inputs a mostrar, ocultar y deshabilitar
        let elements_to_show = [input_1psw_Re, input_2psw_Re];
        let elements_to_hide = [input_lastname_Re, input_name_Re, input_email_Re, account_img, bttn_google];
        let inputs_to_disables = [input_lastname_Re, input_name_Re, input_email_Re];

        // Se mandan a deshabilitar los inputs
        disableInputs(inputs_to_disables);
        // Animación de carga en el botón
        animationLoad();
        // Se espera medio segundo
        await delay(500);
        // Se ocultan y muestran los inputs requeridos
        hideAndShow(elements_to_show, elements_to_hide);
        // Se muestran demás elementos de la ventana de contraseñas
        PasswordsWindow();
    }
}

// Función que se usa cuando se ingresan manualmente los campos de Información Personal
async function next(){
    // Se preparan los inputs que, en caso de fallar su validación, se vuelven a habilitar
    let inputs_to_able = [input_name_Re, input_lastname_Re, input_email_Re];

    // Los campos no deben estar vacíos
    if(input_name_Re.value.length === 0){
        input_name_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        // Se habilitan los inputs nuevamente
        ableInputs(inputs_to_able);

        alert_name_or_1psw.textContent = "Campo Obligatorio."
    } else if(input_lastname_Re.value.length === 0){
        input_lastname_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none"; 

        // Se habilitan los inputs nuevamente
        ableInputs(inputs_to_able);

        alert_name_or_1psw.textContent = "Campo Obligatorio."
    } else if(input_email_Re.value.length === 0){
        input_email_Re.focus();
        bttn_send_txt.style.display = "block";
        loader.style.display = "none";

        // Se habilitan los inputs nuevamente
        ableInputs(inputs_to_able);

        alert_email_or_2psw.textContent = "Campo Obligatorio.";
    } else{
        // Se activa una animación de carga en el botón
        animationLoad();
        // Se hace esperar a la función medio segundo para ejecutar lo que sigue de código
        await delay(500);
        // Se crea un json con la Información Personal del usuario
        let json_data = JSON.stringify({
            names: input_name_Re.value,
            lastnames: input_lastname_Re.value,
            email: input_email_Re.value,
            domain: 'google'
        });
        // Se envían a una función que envía un código de verificación
        sendCode(json_data);
    }
}

// Función que permite elegir la foto de perfil del usuario
function choosePicture(){
    const img_LogIn = document.getElementById("img_Re");
    const input_picture = document.getElementById("input_file_Re");

    img_LogIn.addEventListener("click", () => {
        input_picture.click();
    });
}

// Función que muestra la animación de carga en el botón
function animationLoad(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    bttn_send_txt.style.display = "none";
    loader.style.display = "block";
}

// Función que que quita valores a los text_alert
function retrieveChanges_Re(){
    alert_name_or_1psw.textContent = "";
    alert_email_or_2psw.textContent = "";
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Función que envía un código de verificación al correo electrónico del usuario
// Desde: next -> sendCode
function sendCode(user_data){
    // Se toma el json para enviarlo a "Emails.php"
    fetch('Php/Emails.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user_data
    })
    .then(response => response.text())
    .then(data => {
        // La respuesta desde "Emails.php" se procesa en otra función
        emailSent(JSON.parse(data))
    });
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Función que procesa la respuesta de la función que envió el correo electrónico del usuario
// Desde: sendCode -> emailSent
function emailSent(response){
    // Se trata de ejecutar el siguiente código
    try{
        // Listas de inputs a modificar
        let elements_to_show = [input_code_Re];
        let elements_to_hide = [input_lastname_Re, input_name_Re, input_email_Re, account_img, content_check_buttons_with];
        
        // No debe de haber error en la etiqueta 'error' de la respuesta
        if(response['error'] === null){
            // El status de la respueta debe ser 'ok'
            if(response["status"] === "ok"){
                // Habilitar la modificación de los valores en los inputs
                ableInputs(elements_to_show);

                // Llamada a función que oculta y muestra los campos requeridos
                hideAndShow(elements_to_show, elements_to_hide);

                // Se almacena en el localStorage y en el sessionStorage los datos enviados desde 'Emails.php'
                // Datos importantes: sent_at y sent_to
                almacenate(response);
            } else{
                // De otro modo, se imprime en la consola el status
                console.log('Hubo un error al enviar el correo. ' + 'Estado del envío: ' + response['status']);

                // Se habilita la modificación de los valores de los inputs
                ableInputs(elements_to_hide);
            }
        } else {
            // Si hubo un error, este se muestra en la consola
            console.log(response['error']);

            // Se habilita la modificación de los valores de los inputs
            ableInputs(elements_to_hide);

            // Se modifica el margin-top del botón
            bttn_send.style.marginTop = '10px';

            // Se le dice al usuario que hubo un error y que lo vuelva a intentar
            error_text_alert.style.display = 'block';
            error_text_alert.textContent = "Por favor. Inténtalo otra vez";
            
        }
    } catch(e){
        // Si hubo un error se muestra en la consola
        console.log({ name: e.name, 
            message: e.message});

        // Se le pide al usuario volver a intentar el Registro
        alert("Recargue la página y vuelva a intentarlo")
    }
    // Se oculta la animación de carga del botón
    hideLoader();
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Desde: después de enviar el correo 
async function VerificationCodeWindow(email){
    // Se mantiene el texto mostrado
    loader.style.display = "none";
    bttn_send.style.display = "block";

    // El código debe de haberse ingresado
    if(!input_code_Re.value){
        // Se le dice al usuario que se ingrese el código enviado
        alert_email_or_2psw.textContent = "Ingresa el código que te hemos enviado";
        // Se devuelve el foco al input
        input_code_Re.focus();
    } else {
        // El código tiene que ser de 6 dígitos
        if (input_code_Re.value.length !== 6){
            // Se le dice al usuario que el código requiere ser de 6 carácteres
            alert_email_or_2psw.textContent = "El código requiere ser de 6 carácteres";

            // Se habilita el input nuevamente
            ableInputs([input_code_Re]);

            // Se devuelve el foco al input
            input_code_Re.focus();
        } else {
            // Si el código no está vacío y cumple con 6 carácteres de longitud

            // Se prepara un json con el código ingresado por el usuario y su correo electrónico
            let json_data = JSON.stringify({
                code: input_code_Re.value,
                email: email
            });
            // Se envía a verificarlo
            codeVerification(json_data);
        };
    }
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Función que envía a verificar la legitimidad el código ingresado
// Desde VerificationCodeWindow -> codeVerification
function codeVerification(json_data){
    // Se envía el código y el correo electrónico "Code-Verification.php"
    fetch('Php/Code-Verification.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json_data
    })
    .then(response => response.text())
    .then(data => {
        // La respuesta enviada se procesa en codeVerificationResponse
        codeVerificationResponse(JSON.parse(data))
    });
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Función que procesa la respuesta de verificación de código
// Desde: codeVerification -> codeVerificationResponse
async function codeVerificationResponse(response){
    // Se preparan los inputs a ocultar y mostrar
    let elements_to_show = [input_1psw_Re, input_2psw_Re];
    let elements_to_hide = [input_code_Re];
    
    // El status de la respuesta debe de ser 'ok'
    if(response['status'] === 'ok'){
        // Se habilitan los inputs requeridos
        ableInputs(elements_to_show);

        // Se mandan a mostrar y ocultar los inputs requeridos
        hideAndShow(elements_to_show, elements_to_hide);

        // Se muestra la ventana para ingresar la contraseña deseada por le usuario
        PasswordsWindow();
    } else{
        // Si el status es diferente a 'ok'
        alert_email_or_2psw.textContent = "Código incorrecto. Digítalo otra vez.";
        // Se habilita
        ableInputs(elements_to_hide);
    }
    // Se oculta la animación de carga del botón
    hideLoader();
}

// Función que muestra la apartado de ingreso de contraseñas
function PasswordsWindow(){
    bttn_send_txt.textContent = "Registrate";
    bttn_send_txt.style.display = "block";
    loader.style.display = "none";
}

// Función que verifica las contraseñas ingresadas por le usuario
function verifyPasswords(){
    loader.style.display = "none";
    bttn_send.style.display = "block";

    // Se preparan los inputs a mostrar, ocultar, habilitar y deshabilitar
    let inputs_to_hide = [input_1psw_Re, input_2psw_Re];
    let inputs_to_show = [input_DUI_Re];

    // La contraseña no puede ser menor a 8 carácteres
    if(input_1psw_Re.value.length < 8 & input_2psw_Re.value.length < 8){
        alert_name_or_1psw.textContent = 'Contraseña demasiado corta';
        
        // Se habilitan los campos nuevamente
        ableInputs(inputs_to_hide);
        
    // Las dos contraseñas deben ser iguales
    } else if(input_1psw_Re.value !== input_2psw_Re.value){
        alert_email_or_2psw.textContent = 'La contraseña no coincide';

        // Se habilitan los campos nuevamente
        ableInputs(inputs_to_hide);

    } else{
        // Se prepara el nombre completo del usuario
        let fullName = input_name_Re.value + ' ' + input_lastname_Re.value;

        // Se habilitan los campos nuevamente
        ableInputs(inputs_to_show);
        // Se muestran y ocultan los inputs requeridos
        hideAndShow(inputs_to_hide, inputs_to_show)

        // Se crea el username del usuario
        let username = generateUsername(fullName);

        // Se muestra los campos para ingresar el DUI 
        show_field_DUI()
    };
    // Se oculta la animación de carga del botón
    hideLoader();
}

// Función que muestra el campo de ingreso del DUI del usuario
function show_field_DUI(){
    legal_information_section_text.style.display = 'block';
    legal_information_section_text.value = 'Ingresa una foto de tu DUI'
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

// Función que redirige al usuario a verificar su usuario con su cuenta de microsoft
function verifyMicrosoftAccount(){
    const client_id = "c3c3fd20-6fd8-4d78-9500-8ad1cb909b22";
    const redirect_uri = encodeURIComponent("https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Php/Microsoft-Account-Verification.php");

    const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=openid profile email`;
    
    window.location.href = url;
}