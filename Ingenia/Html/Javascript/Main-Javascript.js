//-------------------------------------------------------// SIGN UP & SIGN IN // --------------------------------------------------------//

// Definición de las variables de todos los elementos de html que se usarán en cada rincón de este Javascript

//----- ELEMENTOS DE VENTANA: INFORMACIÓN PERSONAL -----//
const input_name_Re = document.getElementById("input_name_Re");
const input_lastname_Re = document.getElementById("input_lastname_Re");
const input_email_Re = document.getElementById("input_email_Re");
const personal_information_container = document.getElementById("personal_information_container");

//----- ELEMENTOS DE VENTANA: VERIFICACIÓN DE CÓDIGO -----//
const input_code_Re = document.getElementById("input_code_Re");
const verification_code_container = document.getElementById("verification_code_container");

//----- ELEMENTOS DE VENTANA: INFORMACIÓN DE SEGURIDAD -----//
const input_1psw_Re = document.getElementById("input_1psw_Re");
const input_2psw_Re = document.getElementById("input_2psw_Re");
const security_information_container = document.getElementById("security_information_container");

//----- ELEMENTOS DE VENTANA: INFORMACIÓN DE IDENTIDAD -----//
const input_DUI_Re = document.getElementById("input_DUI_Re");
const input_phonenumber_Re = document.getElementById("input_phonenumber_Re");
const select_departament = document.getElementById("select_departament");
const select_municipality = document.getElementById("select_municipality");
const select_district = document.getElementById("select_district");
const identity_information_container = document.getElementById("identity_information_container");
const legal_information_section_text = document.getElementById("legal_information_section_text");

//----- ELEMENTOS DE VENTANA: INFORMACIÓN PÚBLICA DEL PERFIL -----//
const input_file_Re = document.getElementById("input_file_Re");
const img_Re = document.getElementById("img_Re");
const public_profile_information_container = document.getElementById('public_profile_information_container');

//----- ELEMENTOS GUÍAS DE CADA VENTANA -----//
// Elementos de verificación 
const bttn_microsoft = document.getElementById("Microsoft");
const bttn_google =  document.getElementById("Google");
const content_check_buttons_with = document.getElementById("content_check_buttons_with");
// Otros elementos
const error_text_alert = document.getElementById("error_text_alert");
const bttn_send_txt = document.getElementById("bttn_send_txt");
const bttn_send = document.getElementById("bttn_send");
const loader = document.getElementById("loader");


// Se ingresa la función retrieveChanges_Re, que quita los text_alert, cuando el valor cambia
input_name_Re.addEventListener("change", retrieveChanges_Re);
input_email_Re.addEventListener("change", retrieveChanges_Re);
input_1psw_Re.addEventListener("change", retrieveChanges_Re);
input_2psw_Re.addEventListener("change", retrieveChanges_Re);
input_code_Re.addEventListener("change", retrieveChanges_Re);

// 
const map = {
    ahuachapan: ['Ahuachapán', {
        norte: ['Atiquizaya', 'El Refugio', 'San Lorenzo', 'Turín'],
        centro: ['Ahuachapán', 'Apaneca', 'Concepción de Ataco', 'Tacuba'],
        sur: ['Guaymango', 'Jujutla', 'San Francisco Menendez', 'San Pedro Puxtla'],
    }],
    san_salvador: ['San Salvador', {
        norte: ['Aguilares', 'El Paisnal', 'Guazapa'],
        oeste: ['Apopa', 'Nejapa'],
        este: ['llopango', 'San Martín', 'Soyapango', 'Tonacatepeque'],
        centro: ['Ayutuxtepeque', 'Mejicanos', 'San Salvador', 'Cuscatancingo', 'Ciudad Delgado'],
        sur: ['Panchimalco', 'Rosario de Mora', 'San Marcos', 'Santo Tomás', 'Santiago Texacuangos']
    }],
    la_libertad: ['La Libertad', {
        norte: ['Quezaltepeque', 'San Matías', 'San Pablo Tacachico'],
        centro: ['San Juan Opico', 'Ciudad Arce'],
        oeste: ['Colón', 'Jayaque', 'Sacacoyo', 'Tepecoyo', 'Talnique'],
        este: ['Antiguo Cuscatlán', 'Huizucar', 'Nuevo Cuscatlán', 'San José Villanueva', 'Zaragoza'],
        costa: ['Chiltuipán', 'Jicalapa', 'La Libertad', 'Tamanique', 'Teotepeque'],
        sur: ['Comasagua', 'Santa Tecla']
    }],
    chalatenango: ['Chalatenango', {
        norte: ['La Palma', 'Citalá', 'San Ignacio'],
        centro: ['Nueva Concepción', 'Tejutla', 'La Reina', 'Agua Caliente', 'Dulce Nombre de María', 'El Paraíso', 
            'San Francisco Morazán', 'San Rafael', 'Santa Rita', 'San Fernando'
        ],
        sur: ['Chalatenango', 'Arcatao', 'Azacualpa', 'Comalapa', 'Concepción Quezaltepeque', 'El Carrizal', 'La Laguna',
            'Las Vueltas', 'Nombre de Jesús', 'Nueva Trinidad', 'Ojos de Agua', 'Potonico', 'San Antonio de La Cruz', 
            'San Antonio Los Ranchos', 'San Francisco Lempa', 'San Isidro Labrador', 'San José Cancasque', 'San Miguel de Mercedes',
            'San José Las Flores', 'San Luis del Carmen'
        ]
    }],
    cuscatlan: ['Cuscatlán', {
        norte: ['Suchitoto', 'San José Guayabal', 'Oratorio de Concepción', 'San Bartolomé Perulapán', 'San Pedro Perulapán'],
        sur: ['Cojutepeque', 'San Rafael Cedros', 'Candelaria', 'Monte San Juan', 'El Carmen', 'San Cristóbal', 'Santa Cruz Michapa',
            'San Ramón', 'El Rosario', 'Santa Cruz Analquito', 'Tenancingo'
        ]
    }],
    cabanas: ['Cabañas', {
        este: ['Sensuntepeque', 'Victoria', 'Dolores', 'Guacotecti', 'San Isidro'],
        oeste: ['llobasco', 'Tejutepeque', 'Jutiapa', 'Cinquera']
    }],
    la_paz: ['La Paz', {
        oeste: ['Cuyultitán', 'Olocuilta', 'San Juan Talpa', 'San Luis Talpa', 'San Pedro Masahuat', 'Tapalhuaca',
            'San Francisco Chinameca'
        ],
        centro: ['El Rosario', 'Jerusalén', 'Mercedes La Ceiba', 'Paraíso de Osorio', 'San Antonio Masahuat', 'San Emigdio',
            'San Juan Tepezontes', 'San Luis La Herradura', 'San Miguel Tepezontes', 'San Pedro Nonualco', 'Santa María Ostuma',
            'Santiago Nonualco'
        ],
        este: ['San Juan Nonualco', 'San Rafael Obrajuelo', 'Zacatecoluca']
    }],
    la_union: ['La Unión', {
        norte: ['Anamorós', 'Bolivar', 'Concepción de Oriente', 'El Sauce', 'Lislique', 'Nueva Esparta', 'Pasaquina', 
            'Polorós', 'San José La Fuente', 'Santa Rosa de Lima'
        ],
        sur: ['Conchagua', 'El Carmen', 'lntipucá', 'La Unión', 'Meanguera del Golfo', 'San Alejo', 'Yayantique', 
            'Yucuaiquín'
        ]
    }],
    usulutan: ['Usulután', {
        norte: ['Santiago de María', 'Alegría', 'Berlín', 'Mercedes Umana', 'Jucuapa', 'El Triunfo', 'Estanzuelas', 
            'San Buenaventura', 'Nueva Granada'
        ],
        este: ['Usulután', 'Jucuarán', 'San Dionisio', 'Concepción Batres', 'Santa María', 'Ozatlán', 'Tecapán',
            'Santa Elena', 'California', 'Ereguayquín'
        ],
        oeste: ['Jiquilisco', 'Puerto El Triunfo', 'San Agustín', 'San Francisco Javier']
    }],
    sonsonate: ['Sonsonate', {
        norte: ['Juayúa', 'Nahuizalco', 'Salcoatitán', 'Santa Catarina Masahuat'],
        centro: ['Sonsonate', 'Sonzacate', 'Nahulingo', 'San Antonio del Monte', 'Santo Domingo de Guzmán'],
        este: ['lzalco', 'Armenia', 'Caluco', 'San Julián', 'Cuisnahuat', 'Santa Isabel lshuatán'],
        oeste: ['Acajutla']
    }],
    santa_ana: ['Santa Ana', {
        norte: ['Masahuat', 'Metapán', 'Santa Rosa Guachipilín', 'Texistepeque'],
        centro: ['Santa Ana'],
        este: ['Coatepeque', 'El Congo'],
        oeste: ['Candelaria de la Frontera', 'Chalchuapa', 'El Porvenir', 'San Antonio Pajonal', 'San Sebastián Salitrillo',
            'Santiago de La Frontera'
        ]
    }],
    san_vicente: ['San Vicente', {
        norte: ['Apastepeque', 'Santa Clara', 'San Ildefonso', 'San Esteban Catarina', 'San Sebastián', 'San Lorenzo',
            'Santo Domingo'
        ],
        sur: ['San Vicente', 'Guadalupe', 'Verapaz', 'Tepetitán', 'Tecoluca', 'San Cayetano lstepeque']
    }],
    san_miguel: ['San Miguel', {
        norte: ['Ciudad Barrios', 'Sesori', 'Nuevo Edén de San Juan', 'San Gerardo', 'San Luis de La Reina', 
            'Carolina', 'San Antonio del Mosco', 'Chapeltique'],
        centro: ['San Miguel', 'Comacarán', 'Uluazapa', 'Moncagua', 'Quelepa', 'Chirilagua'],
        oeste: ['Chinameca', 'Nueva Guadalupe', 'Lolotique', 'San Jorge', 'San Rafael Oriente', 'El Tránsito']
    }],
    morazan: ['Morazán', {
        norte: ['Arambala', 'Cacaopera', 'Corinto', 'El Rosario', 'Joateca', 'Jocoaitique', 'Meanguera', 'Perquín', 
            'San Fernando', 'San Isidro', 'Torola'
        ],
        sur: ['Chilanga', 'Delicias de Concepción', 'El Divisadero', 'Gualococti', 'Guatajiagua', 'Jocoro', 'Lolotiquillo',
            'Osicala', 'San Carlos', 'San Francisco Gotera', 'San Simón', 'Sensembra', 'Sociedad', 'Yamabal', 'Yoloaiquín'
        ]
    }]
}

// Función que permite simular volver a los campos de ingreso anteriores
function Go_back(){
    // Se deshabilitan todos los inputs
    disable_all_inputs();
    hide_all_text_alerts();

    // Se oculta el texto de alerta, por si hubo un error anteriormente
    error_text_alert.style.display = 'none';
    // Se reestablece el marginTop de bttn_send
    bttn_send.style.marginTop = "20px";
    
    if(getComputedStyle(input_name_Re).display !== "none"){

    } else if(getComputedStyle(input_code_Re).display !== "none"){
        // No se hace nada
    } else{
        able_inputs(personal_information);
        hide_and_show(personal_information_container, security_information);
    }
}

// Función que permite deshabilitar los inputs al cargar la página
function disable_all_inputs(){
    const containers = [personal_information_container, verification_code_container, security_information_container, 
        identity_information_container, public_profile_information_container];
    disable_inputs(containers);
}

function hide_all_text_alerts(){
    const containers = [personal_information_container, verification_code_container, security_information_container, 
        identity_information_container, public_profile_information_container];

    containers.forEach(container => {
        container.querySelectorAll(':scope > span').forEach(span => {
            span.style.display = 'none';
        })
    })
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
    if(getComputedStyle(input_name_Re).display !== 'none'){
        // Se validan los campos de ingreso de Información Personal
        code_already_typed();
    } else if(getComputedStyle(input_code_Re).display !== 'none'){
        // Se valida el código de verificación enviado al correo
        verification_code_window(sessionStorage.getItem('email'));
    } else if(getComputedStyle(input_DUI_Re).display !== 'none'){
        // Se validan las contraseñas digitadas por el usuario
        verify_identity_information()
    } else if(getComputedStyle(input_1psw_Re).display !== 'none'){
        verifyPasswords();
    }
});

select_departament.addEventListener('change', () => {
    const departament = select_departament.value;

    document.querySelectorAll('.option_municipality').forEach(el => el.remove());
    document.querySelectorAll('.option_district').forEach(el => el.remove());

    if(departament.trim().length !== 0){
        const normalized_departament = normalizeSelect(departament);
        place_municipality(normalized_departament, departament);
    }
});

select_municipality.addEventListener('change', () => {
    const municipality_array = select_municipality.value.split(' ');
    const municipality = municipality_array[municipality_array.length - 1];
    const departament = select_departament.value;

    document.querySelectorAll('.option_district').forEach(el => el.remove());

    if(municipality.trim().length !== 0){
        const normalized_municipality = normalizeSelect(municipality);
        const normalized_departament = normalizeSelect(departament);
        place_district(normalized_municipality, municipality, normalized_departament);
    }
});

// Función que 
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('fullname').length !== '{}'){
        const fullname = sessionStorage.getItem('fullname');
        const email = sessionStorage.getItem('email');

        const fullname_array = fullname.split(' ', 2);
        const name = fullname_array[0];
        const surname = fullname_array[1];

        disable_all_inputs();
        hide_all_text_alerts();

        const elements_to_show = [security_information_container];
        const elements_to_hide = [personal_information_container, content_check_buttons_with, verification_code_container, identity_information_container, public_profile_information_container];
        able_inputs(elements_to_show);
        input_name_Re.value = name;
        input_lastname_Re.value = surname;
        input_email_Re.value = email;
        
        hide_and_show(elements_to_show, elements_to_hide);

        PasswordsWindow();
    } else{
        const elements_to_show = [personal_information_container];
        const elements_to_hide = [security_information_container, content_check_buttons_with, verification_code_container, identity_information_container, public_profile_information_container];
        able_inputs(elements_to_show);
        disable_inputs(elements_to_hide);
        
        hide_and_show(elements_to_show, elements_to_hide);
    }
})

function code_already_typed(){
    let data = JSON.parse(localStorage.getItem('user'))
    const condition = data['email'] === input_email_Re.value.trim();
    if(condition){
        next(condition);
    } else {
        next(condition);
    }
}

function show_text_alert(text){
    text[0].forEach(ta => {
        const span = document.getElementById(ta);
        span.style.display = 'block';
        span.textContent = text[1];
    })
}

function normalizeSelect(select){
    return select
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ñ/g, 'n')
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
}

// Función que oculta la animación de carga y muestra el texto del botón
function hideLoader(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    loader.style.display = "none";
    bttn_send_txt.style.display = "block";
}

// Función que permite ocultar y mostrar elementos
function hide_and_show(elements_to_show, elements_to_hide){
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
function disable_inputs(containers){
    // A cada input enviado dentro de la lista 'inputs' se cambia a TRUE la propiedad 'disabled' 
    // Esto impide la modificación de los valores imprimidos anteriormente en el input.
    containers.forEach(container => 
        container.querySelectorAll(':scope > input').forEach(i => {
            i.disabled = true;
        })
    );
}

// Función que permite habilitar inputs
function able_inputs(containers){
    // A cada input enviado dentro de la lista 'inputs' se cambia a FALSE la propiedad 'disabled' 
    // Esto permite el ingreso de valores dentro de cada input 
    containers.forEach(container => 
        container.querySelectorAll(':scope > input').forEach(i => { 
            i.disabled = false;
        })
    );
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
        let elements_to_hide = [input_lastname_Re, input_name_Re, input_email_Re, bttn_google, content_check_buttons_with];

        // Se mandan a deshabilitar los inputs
        disableInputs(elements_to_hide);
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
async function next(code_typed_before){
    // Se preparan los inputs que, en caso de fallar su validación, se vuelven a habilitar
    const inputs_to_able = [personal_information_container];
    const elements_to_show = [security_information_container];
    const elements_to_hide = [personal_information_container];

    // Los campos no deben estar vacíos
    if(input_name_Re.value.length === 0){
        input_name_Re.focus();
        hideLoader();

        // Se habilitan los inputs nuevamente
        able_inputs(inputs_to_able);

        show_text_alert([['text_PI1'], 'Campo obligatorio']);
    } else if(input_lastname_Re.value.length === 0){
        input_lastname_Re.focus();
        hideLoader(); 

        // Se habilitan los inputs nuevamente
        able_inputs(inputs_to_able);

        show_text_alert([['text_PI2'], 'Campo obligatorio']);
    } else if(input_email_Re.value.length === 0){
        input_email_Re.focus();
        hideLoader();

        // Se habilitan los inputs nuevamente
        able_inputs(inputs_to_able);

        show_text_alert([['text_PI3'], 'Campo obligatorio']);
    } else{
        if (code_typed_before) {
            able_inputs(elements_to_show);

            hide_and_show(elements_to_show, elements_to_hide);

            legal_information_Window();
        } else{
            // Se activa una animación de carga en el botón
            animationLoad();
            // Se hace esperar a la función medio segundo para ejecutar lo que sigue de código
            await delay(500);
            // Se crea un json con la Información Personal del usuario
            const json_data = JSON.stringify({
                names: input_name_Re.value,
                lastnames: input_lastname_Re.value,
                email: input_email_Re.value,
                domain: 'google'
            });
            // Se envían a una función que envía un código de verificación
            sendCode(json_data);
        }
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
        const elements_to_show = [verification_code_container];
        const elements_to_hide = [personal_information_container, content_check_buttons_with];
        
        // No debe de haber error en la etiqueta 'error' de la respuesta
        if(response['error'] === null){
            // El status de la respueta debe ser 'ok'
            if(response["status"] === "ok"){
                // Habilitar la modificación de los valores en los inputs
                able_inputs(elements_to_show);

                // Llamada a función que oculta y muestra los campos requeridos
                hide_and_show(elements_to_show, elements_to_hide);

                // Se almacena en el localStorage y en el sessionStorage los datos enviados desde 'Emails.php'
                // Datos importantes: sent_at y sent_to
                almacenate(response);
            } else{
                // De otro modo, se imprime en la consola el status
                console.log('Hubo un error al enviar el correo. ' + 'Estado del envío: ' + response['status']);
                // Se le dice al usuario que hubo un error
                show_text_alert([['error_text_alert'], 'Hubo un error. Inténtalo de nuevo']);
                // Se habilita la modificación de los valores de los inputs
                able_inputs(elements_to_hide);
            }
        } else if(response['error'].includes('Invalid email')){
            // Se habilita la modificación de los valores de los inputs
            able_inputs(elements_to_hide);

            // Se le dice al usuario que el correo es inválido
            show_text_alert([['text_VC1'], 'Correo inválido']);

            // Se devuelve el foco a input_email_Re
            input_email_Re.focus();
        } else {
            // Se habilita la modificación de los valores de los inputs
            able_inputs(elements_to_hide);

            // Se modifica el margin-top del botón
            bttn_send.style.marginTop = '10px';

            // Se le dice al usuario que hubo un error y que lo vuelva a intentar
            show_text_alert([['error_text_alert'], 'Hubo un error. Inténtalo otra vez']);
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
async function verification_code_window(email){
    const text = document.getElementById('text_VC1');
    // Se mantiene el texto mostrado
    loader.style.display = "none";
    bttn_send.style.display = "block";

    // El código debe de haberse ingresado
    if(input_code_Re.value.trim().length === 0){
        // Se modifica text_VC1
        show_text_alert([text, 'Campo obligatorio']);
        // Se devuelve el foco al input
        input_code_Re.focus();
    } else {
        // El código tiene que ser de 6 dígitos
        if (input_code_Re.value.trim().length !== 6){
            // Se le dice al usuario que el código requiere ser de 6 carácteres
            show_text_alert([text, 'El código requiere ser de 6 carácteres']);

            // Se habilita el input nuevamente
            able_inputs(verification_code_container);

            // Se devuelve el foco al input
            input_code_Re.focus();
        } else {
            // Si el código no está vacío y cumple con 6 carácteres de longitud

            // Se prepara un json con el código ingresado por el usuario y su correo electrónico
            const json_data = JSON.stringify({
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
    const text = document.getElementById('text_VC1');
    // Se preparan los inputs a ocultar y mostrar
    const elements_to_show = [security_information_container];
    const elements_to_hide = [verification_code_container];
    
    // El status de la respuesta debe de ser 'ok'
    if(response['status'] === 'ok'){
        // Se habilitan los inputs requeridos
        able_inputs(elements_to_show);

        // Se mandan a mostrar y ocultar los inputs requeridos
        hide_and_show(elements_to_show, elements_to_hide);

        // Se muestra la ventana para ingresar la contraseña deseada por le usuario
        show_identity_information_window();
    } else{
        // Si el status es diferente a 'ok'
        show_text_alert([text, 'Ingresa el código enviado']);
        // Se habilitan los inputs requeridos
        able_inputs(elements_to_hide);
    }
    // Se oculta la animación de carga del botón
    hideLoader();
}

//
function place_departaments(){
    const select = document.getElementById("select_departament");

    Object.values(map).forEach(value => {
        const option = document.createElement('option');
        option.classList = 'option_departament';
        option.value = value[0];
        option.textContent = value[0];

        select.appendChild(option)
    });
}

function place_municipality(normalized_departament, departament){
    const select = document.getElementById('select_municipality');
    const municipalities = map[normalized_departament][1];
    
    console.log(Object.keys(municipalities));
    Object.keys(municipalities).forEach(mun => {
        const option = document.createElement("option");
        option.classList = 'option_municipality';
        option.value = departament + ' ' + mun;
        option.textContent = departament + ' ' + mun;

        select.appendChild(option);
    });
}

function place_district(normalized_municipality, municipality, normalized_departament){
    const select = document.getElementById('select_district');
    const municipalities = map[normalized_departament][1];
    const districts = municipalities[normalized_municipality];

    districts.forEach(dis => {
        const option = document.createElement('option');
        option.classList = 'option_district';
        option.value = dis;
        option.textContent = dis;

        select.appendChild(option);
    });
}

// Función que muestra la apartado de ingreso de contraseñas
function PasswordsWindow(){
    bttn_send_txt.textContent = "Registrate";
    bttn_send_txt.style.display = "block";
    loader.style.display = "none";
}

// Función que verifica las contraseñas ingresadas por le usuario
function verifyPasswords(){
    hideLoader();

    // Se preparan los inputs a mostrar, ocultar, habilitar y deshabilitar
    const inputs_to_hide = [security_information_container];
    const inputs_to_show = [identity_information_container];

    // La contraseña no puede ser menor a 8 carácteres
    if(input_1psw_Re.value.trim().length < 8){
        show_text_alert([['text_SI1'], 'La contraseña no puede ser menor a 8 carácteres']);
        
        // Se habilitan los campos nuevamente
        able_inputs(inputs_to_hide);
        
    // Las dos contraseñas deben ser iguales
    } else if(input_1psw_Re.value.trim() !== input_2psw_Re.value.trim()){
        show_text_alert([['text_SI1', 'text_SI2'], 'Las contraseñas no coinciden']);
        // Se habilitan los campos nuevamente
        able_inputs(inputs_to_hide);
    } else{
        // Se prepara el nombre completo del usuario
        const fullName = input_name_Re.value.trim() + ' ' + input_lastname_Re.value.trim();

        // Se habilitan los campos nuevamente
        able_inputs(inputs_to_show);
        // Se muestran y ocultan los inputs requeridos
        hide_and_show(inputs_to_hide, inputs_to_show)

        // Se crea el username del usuario
        const username = generateUsername(fullName);

        // Se muestra los campos para ingresar el DUI 
        show_public_information_window()
    };
    // Se oculta la animación de carga del botón
    hideLoader();
}

// Función que muestra el campo de ingreso del DUI del usuario
function show_identity_information_window(){
    show_text_alert([['legal_information_section_text'], 'Información del usuario']);
}

function verify_identity_information(){
    if(input_DUI_Re.files.length === 0){
        show_text_alert([['text_II1'], 'Campo obligatorio']);
    } else if(input_phonenumber_Re.value.trim().length === 0){
        show_text_alert([['text_II2'], 'Campo obligatorio']);
    } else if(select_departament.value.trim().length === 0){
        show_text_alert([['text_II3'], 'Campo obligatorio'])
    } else if(select_municipality.value.trim().length === 0){
        show_text_alert([['text_II4'], 'Campo obligatorio'])
    } else if(select_district.value.trim().length === 0){
        show_text_alert([['text_II5'], 'Campo obligatorio'])
    } else{
        const containers_to_show = [verification_code_container];
        const containers_to_hide = [identity_information_container];
        show_identity_information_window();
    }
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