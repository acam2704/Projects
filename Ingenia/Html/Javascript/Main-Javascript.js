//-------------------------------------------------------// SIGN UP & SIGN IN // --------------------------------------------------------//

// Definición de las variables de todos los elementos de html que se usarán en cada rincón de este Javascript
//----- VENTANA: INFORMACIÓN PERSONAL -----//
const personal_information_container = document.getElementById("personal_information_container");
//----- VENTANA: VERIFICACIÓN DE CÓDIGO -----//
const verification_code_container = document.getElementById("verification_code_container");
//----- VENTANA: INFORMACIÓN DE SEGURIDAD -----//
const security_information_container = document.getElementById("security_information_container");
//----- VENTANA: INFORMACIÓN DE IDENTIDAD -----//
const identity_information_container = document.getElementById("identity_information_container");
//----- VENTANA: INFORMACIÓN PÚBLICA DEL PERFIL -----//
const public_profile_information_container = document.getElementById('public_profile_information_container');
//----- ELEMENTOS GUÍAS DE CADA VENTANA -----//
const content_check_buttons_with = document.getElementById("content_check_buttons_with");

// Mapeo de los departamentos, municipios y distritos para los select
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
function go_back(){
    // Se deshabilitan todos los inputs
    disable_all_inputs();
    hide_all_text_alerts();

    // Se oculta el texto de alerta, por si hubo un error anteriormente
    const error_text_alert = document.getElementById('error_text_alert');
    error_text_alert.style.display = 'none';

    // Se reestablece el marginTop de bttn_send
    const bttn_send = document.getElementById('bttn_send');
    bttn_send.style.marginTop = '20px';

    const inputs_container = document.getElementById('inputs_container');
    const containers = Array.from(inputs_container.querySelectorAll('.signup_section'));
    for(const container of containers){
        if (getComputedStyle(container).display !== 'none' && container.id !== 'personal_information_container'){
            let previous_container = container.previousElementSibling;
            if (previous_container.id === 'verification_code_container'){
                previous_container = previous_container.previousElementSibling;
            }
            const filtered_containers = containers.filter(container => container !== previous_container); // Array
            const containers_to_show = [previous_container];
            if (previous_container.id === 'personal_information_container')
                {containers_to_show.push(content_check_buttons_with);
                const main_title = document.getElementById('main_title');
                containers_to_show.push(main_title); 
                const back_bttn = document.getElementById('back_bttn'); 
                filtered_containers.push(back_bttn)}
            enable_inputs(containers_to_show);
            hide_and_show(containers_to_show, filtered_containers);
            return;
        }
    }
}
// Función que permite deshabilitar los inputs al cargar la página
function disable_all_inputs(){
    const containers = [personal_information_container, verification_code_container, security_information_container, 
        identity_information_container, public_profile_information_container];
    disable_inputs(containers);
}
// Función que permite ocultar todas las alertas de cada sección
function hide_all_text_alerts(){
    const inputs_container = document.getElementById('inputs_container');

    inputs_container.querySelectorAll(':scope > article').forEach(article => {
        article.querySelectorAll(':scope > span').forEach(span => {
            span.style.display = 'none';
        })
    })
}
// Función que permite mostrar las alertas
function show_text_alert(text){
    text[0].forEach(span => {
        span.style.display = 'block';
        span.textContent = text[1];
    })
}
// Función que normaliza textos (usado en los selects)
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
    const bttn_send_txt = document.getElementById('bttn_send_txt');
    const loader = document.getElementById('loader');
    loader.style.display = "none";
    bttn_send_txt.style.display = "block";
}
// Función que permite ocultar y mostrar elementos
function hide_and_show(containers_to_show, containers_to_hide){
    containers_to_hide.forEach(container => {
        container.style.display = "none";
    }); 
    containers_to_show.forEach(container => {
        container.style.display = "block";
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
function enable_inputs(containers){
    // A cada input enviado dentro de la lista 'inputs' se cambia a FALSE la propiedad 'disabled' 
    // Esto permite el ingreso de valores dentro de cada input 
    containers.forEach(container => 
        container.querySelectorAll(':scope > input').forEach(i => { 
            i.disabled = false;
        })
    );
}
// Función que almacena datos dentro de localStorage y sessionStorage
function almacenate(data){
    // Almacenamiento de los datos importantes del usuario en el localStorage como JSON
    localStorage.setItem('user', JSON.stringify({
        names: data['names'],
        lastnames: data['lastnames'],
        email: data['email']
    }));
    // Se almacena en la sesión, temporalmente, el dato 'email' y 'fullName' del usuario
    sessionStorage.setItem("email", data['email']);
    sessionStorage.setItem("fullname", data['names'] + ' ' + data['lastnames']);
}
// Función que permite una espera, dada en milisegundos, dentro de la ejecución de código en una función ASYNC.
function delay(ms) {
    // Se crea una promesa
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Función que que quita valores a los text_alert
function retrieve_alert_changes(){
    const inputs_container = document.getElementById('inputs_container');
    inputs_container.querySelectorAll(':scope > article').forEach(article => {
        article.querySelectorAll(':scope > span').forEach(span => {
            if(span && span.classList.contains('text_alert')){
                span.textContent = '';
            }
        })
    })
}
/* EVENTO DOMCONTENTLOADED --------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    let data_user = [localStorage.getItem('user'), 'localStorage'];
    let session_data = [sessionStorage.getItem('user'), 'sessionStorage'];
    const array_to_travel = [data_user, session_data];
    let elements_to_hide = Array.from(document.getElementById('inputs_container').querySelectorAll('.signup_section'));
    const loader = document.getElementById('loader');
    elements_to_hide.push(loader);
    disable_all_inputs();

    for (let data of array_to_travel){
        try{
            if (data[0] !== null){
                data[0] = JSON.parse(data[0]);
                const email = data[0].email;

                const name = data[0].names;
                const surname = data[0].lastnames;

                elements_to_hide = elements_to_hide.filter(article => article !== identity_information_container);
                elements_to_hide.push(content_check_buttons_with);
                const elements_to_show = [identity_information_container];

                const input_name_Re = document.getElementById('input_name_Re');
                const input_lastname_Re = document.getElementById('input_lastname_Re');
                const input_email_Re = document.getElementById('input_email_Re');

                input_name_Re.value = name;
                input_lastname_Re.value = surname;
                input_email_Re.value = email;

                show_identity_information_window(elements_to_hide);
                return;
            } else {throw null;}
        } catch(e){
            if (data[1] === array_to_travel[array_to_travel.length - 1][1]){
                const back_bttn = document.getElementById('back_bttn');
                elements_to_hide.push(back_bttn);
                const elements_to_show = [personal_information_container];
                for(const element of elements_to_show)
                    {elements_to_hide = elements_to_hide.filter(c => c !== element)}
                enable_inputs(elements_to_show);
                hide_and_show(elements_to_show, elements_to_hide);
                if (e){
                    if (data[1] === 'localStorage'){localStorage.removeItem('user');} 
                    else if(data[1] === 'sessionStorage'){sessionStorage.removeItem('user');}
                    console.log(e);
                }
            }
        }
    }
    hide_all_text_alerts();
})

document.getElementById('inputs_container').querySelectorAll(':scope > article').forEach(article => {
    article.querySelectorAll(':scope > input, :scope > select').forEach(element => {
        const span = element.previousElementSibling;
        element.addEventListener('change', () => {
            span.style.display = 'none';
        })
    })
});

// Función que se usa cuando se ingresan manualmente los campos de Información Personal
async function next(code_typed_before){
    // Se preparan los inputs a ocultar y que, en caso de fallar su validación, se vuelven a habilitar
    const elements_to_hide = [personal_information_container, content_check_buttons_with];

    /* Se valida si hay campos vacíos */
    for (const container of elements_to_hide){ // Se recorre cada elemento
        const inputs = container.querySelectorAll(':scope > input'); // Del elemento se toman los inputs
        for(const input of inputs){ // Por cada input
            if(input.value.trim() === ''){ // Se valida si no está vacío
                const alert = input.previousElementSibling; // Se toma el span de arriba

                input.focus(); // Se devuelve el foco
                hideLoader(); // Se esconde la animación de carga
                enable_inputs(elements_to_hide); // Se vuelven a habilitar loos inputs de los elementos validados
                if(alert && alert.classList.contains('text_alert')){ // Si el span es válido y con la clase requerida
                    show_text_alert([[alert], 'Campo obligatorio']) // Se muestra la alerta
                }
                return; // Se fuerza el final de la función
            }
        }
    }
    if (code_typed_before) {
        show_identity_information_window(elements_to_hide);
    } else{
        // Se crea un json con la Información Personal del usuario
        const input_name_Re = document.getElementById('input_name_Re');
        const input_lastname_Re = document.getElementById('input_lastname_Re');
        const input_email_Re = document.getElementById('input_email_Re');

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

// Función que valida si el código fue ingresado anteriormente al momento de registrarse
function code_already_typed(){
    let data = localStorage.getItem('user')
    data = JSON.parse(data);
    const input_email_Re = document.getElementById('input_email_Re');
    
    if(!data){next(false); return}
    if(data['email'] === input_email_Re.value.trim() && data){
        next(true);
    } else {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        next(false);
    }
}

// Función que se usa al verificar la cuenta con Google (handleCredentialResponse -> transformData)
async function transformData(json){
    const input_name_Re = document.getElementById('input_name_Re');
    const input_lastname_Re = document.getElementById('input_lastname_Re');
    const input_email_Re = document.getElementById('input_email_Re');
    const img_Re = document.getElementById('img_Re');
    // El status de la respuesta a la verificación de las credenciales debe de ser 'ok'
    if(json["status"] === "ok"){

        // Se ingresa el supuesto nombre y el apellido del usuario
        input_name_Re.value = json.names;
        input_lastname_Re.value = json.lastnames;
        input_email_Re.value = json.email;
        img_Re.src = json.picture;
        almacenate(json);

        // Se preparan los inputs a mostrar, ocultar y deshabilitar
        let elements_to_hide = [personal_information_container, content_check_buttons_with];

        disable_inputs(elements_to_hide); // Se mandan a deshabilitar los inputs

        show_identity_information_window(elements_to_hide); // Se muestran demás elementos de la ventana de contraseñas
    }
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

/* VENTAN DE VERIFICACIÓN DE CORREO CON CÓDIGO --------------------------------------------------------------------*/
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
        const elements_to_hide = [personal_information_container, content_check_buttons_with];
        const error_text_alert = document.getElementById('error_text_alert');
        // No debe de haber error en la etiqueta 'error' de la respuesta
        if(response['error'] === null){
            // El status de la respueta debe ser 'ok'
            if(response["status"] === "ok"){
                // Se almacena en el localStorage y en el sessionStorage los datos enviados desde 'Emails.php'
                almacenate(response); // Datos importantes: sent_at y sent_to

                show_verification_code_window(elements_to_hide);
            } else{
                // De otro modo, se imprime en la consola el status
                console.log('Hubo un error al enviar el correo. ' + 'Estado del envío: ' + response['status']);
                // Se le dice al usuario que hubo un error
                show_text_alert([[error_text_alert], 'Hubo un error. Inténtalo de nuevo']);
                // Se habilita la modificación de los valores de los inputs
                enable_inputs(elements_to_hide);
            }
        } else if(response['error'].includes('Invalid email')){
            enable_inputs(elements_to_hide); // Se habilita la modificación de los valores de los inputs
            const text_VC1 = document.getElementById('text_VC1');
            const input_email_Re = document.getElementById('input_email_Re');
            show_text_alert([[text_VC1], 'Correo inválido']); // Se le dice al usuario que el correo es inválido
            input_email_Re.focus(); // Se devuelve el foco a input_email_Re
        } else {
            enable_inputs(elements_to_hide); // Se habilita la modificación de los valores de los inputs
            const bttn_send = document.getElementById('bttn_send');
            bttn_send.style.marginTop = '10px'; // Se modifica el margin-top del botón
            // Se le dice al usuario que hubo un error y que lo vuelva a intentar
            show_text_alert([[error_text_alert], 'Hubo un error. Inténtalo otra vez']);
        }
    } catch(e){
        console.log({ name: e.name, 
            message: e.message}); // Si hubo un error se muestra en la consola
        alert("Recargue la página y vuelva a intentarlo"); // Se le pide al usuario volver a intentar el Registro
    }
    hideLoader(); // Se oculta la animación de carga del botón
}

function show_verification_code_window(containers_to_hide){
    const main_title = document.getElementById('main_title');
    containers_to_hide.push(main_title);
    const back_bttn = document.getElementById('back_bttn');
    const containers_to_show = [verification_code_container, back_bttn];

    enable_inputs(containers_to_show);
    disable_inputs(containers_to_hide);

    hide_and_show(containers_to_show, containers_to_hide);
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Desde: después de enviar el correo 
async function verification_code_window(email){
    const text = document.getElementById('text_VC1');
    const input_code_Re = document.getElementById('input_code_Re');
    // Se mantiene el texto mostrado
    hideLoader();
    
    if(input_code_Re.value.trim().length === 0){ // El código debe de haberse ingresado
        show_text_alert([[text], 'Campo obligatorio']); // Se modifica text_VC1
        input_code_Re.focus(); // Se devuelve el foco al input
    } else {
        if (input_code_Re.value.trim().length !== 6){ // El código tiene que ser de 6 dígitos
            // Se le dice al usuario que el código requiere ser de 6 carácteres
            show_text_alert([[text], 'El código requiere ser de 6 carácteres']);
            enable_inputs(verification_code_container); // Se habilita el input nuevamente
            input_code_Re.focus(); // Se devuelve el foco al input
        } else {
            // Se prepara un json con el código ingresado por el usuario y su correo electrónico
            const json_data = JSON.stringify({
                code: input_code_Re.value,
                email: email
            });
            codeVerification(json_data); // Se envía a verificarlo
        };
    }
    hideLoader(); // Se oculta la animación de carga del botón
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
    const elements_to_hide = [verification_code_container];
    
    // El status de la respuesta debe de ser 'ok'
    if(response['status'] === 'ok'){
        // Se muestra la ventana de ingreso de información más delicada del usuario
        show_identity_information_window(elements_to_hide);
    } else{ // Si el status es diferente a 'ok'
        show_text_alert([text, 'Ingresa el código enviado']); // Se muestra la alerta
        enable_inputs(elements_to_hide); // Se habilitan los inputs requeridos
    }
    hideLoader(); // Se oculta la animación de carga del botón
}

/* VENTANA DE INFORMACIÓN DE INFORMACIÓN PRIVADA DEL USUARIO --------------------------------------------------------------------*/
// Función que agrega los departamentos en el select requerido
function place_departaments(){
    const select = document.getElementById("select_departament"); // Se toma el select de departamentos

    Object.keys(map).forEach(key => { // Se recorre cada key -departamentos-
        const option = document.createElement('option'); // Se crea un elemento option
        option.classList = 'option_departament'; // Se le agrega la clase
        option.value = key; // Se pone su value
        option.textContent = map[key][0]; // Se pone su contenido

        select.appendChild(option) // Se agrega al select
    });
}

// Función que agrega los municipios en el select requerido
function place_municipality(departament, departament_key){
    const select = document.getElementById('select_municipality'); // Se toma el select de municipios
    const municipalities = map[departament_key][1]; // Se toman los municipios del departamento seleccionado
    
    Object.keys(municipalities).forEach(mun => { // Se recorren cada clave -municipio-
        const option = document.createElement("option"); // Se crea un elemento option
        option.classList = 'option_municipality'; // Se le agrega la clase
        option.value = mun; // En su valor se le imprime el departamento y el municipio
        // En su contenido se le imprimer el departamento y el municipio
        option.textContent = departament + ' ' + mun.charAt(0).toUpperCase() + mun.slice(1); 

        select.appendChild(option); // Se agrega el elemento dentro de el select
    });
}

// Función que agrega los distritos en el select requerido
function place_district(municipality_key, departament_key){
    const select = document.getElementById('select_district'); // Se toma el select de distritos
    const municipalities = map[departament_key][1]; // Se toma 
    const districts = municipalities[municipality_key];

    districts.forEach(dis => {
        const option = document.createElement('option');
        option.classList = 'option_district';
        option.value = dis;
        option.textContent = dis;

        select.appendChild(option);
    });
}

// Evento change que agrega los municipios al siguiente select dependiendo del departamento seleccionado
document.getElementById('select_departament').addEventListener('change', function() {
    const departament_key = document.getElementById('select_departament').value;
    const departament = map[departament_key][0];

    const span = this.previousElementSibling;
    span.style.display = 'none';

    document.querySelectorAll('.option_municipality').forEach(el => el.remove());
    document.querySelectorAll('.option_district').forEach(el => el.remove());

    if(departament_key.trim().length !== 0){
        place_municipality(departament, departament_key);
    }
});

// Evento change que agrega los distritos al siguiente select dependiendo del municipio seleccionado
document.getElementById('select_municipality').addEventListener('change', function() {
    const municipality = document.getElementById('select_municipality').value;
    const departament = document.getElementById('select_departament').value;

    const span = this.previousElementSibling;
    span.style.display = 'none';

    document.querySelectorAll('.option_district').forEach(el => el.remove());

    if(municipality.trim().length !== 0){
        place_district(municipality, departament);
    }
});

document.getElementById("select_district").addEventListener('change', function() {
    const span = this.previousElementSibling;
    span.style.display = 'none';
});

// Función que ejecuta un código repetitivo de la función verify_identity_information
function executor_from_VII(element, text){
    enable_inputs([identity_information_container]); // Se vuelven a habilitar los inputs
    element.focus(); // Se devuelve el enfoque 
    const alert = element.previousElementSibling; // Se toma al elemento de arriba (span)
    show_text_alert([[alert], text]); // Se muestra la alerta
}

// Función que verifica los datos del usuairo de los campos ingresados
function verify_identity_information(){
    const elements = identity_information_container.querySelectorAll(':scope > input, :scope > select'); // inputs y selects
    for (const element of elements){ // Se recorre cada input y select
        if (element.value.trim() === ''){ // Si el campo está vacío
            executor_from_VII(element, 'Campo obligatorio');
            hideLoader();
            return; // Se fuerza el final de la función
        }
        if( element.classList.contains('input') ){ // Si el elemento es uno clase .input
            if(element.id === 'input_DUI_Re'){
                const DUI = element.value.replace('-', '');
                if(!isNaN(DUI) && DUI.length !== 9){executor_from_VII(element, 'DUI Inválido'); hideLoader(); return}
            } else {
                if(element.value.length !== 8){executor_from_VII(element, 'Número inválido'); hideLoader(); return}
            }
        }
    }
    PasswordsWindow(); // Si no hubo ningún campo inválido, se muestra la sección de información de seguridad
}

// Función que muestra el campo de ingreso del DUI del usuario
function show_identity_information_window(containers_to_hide){
    const main_title = document.getElementById('main_title');
    containers_to_hide.push(main_title);
    const bttn_send_txt = document.getElementById('bttn_send_txt');
    const back_bttn = document.getElementById('back_bttn');
    const containers_to_show = [identity_information_container, bttn_send_txt, back_bttn]; // Sección a mostrar

    hideLoader();
    hide_and_show(containers_to_show, containers_to_hide); // Se ocultan y muestran las secciones requeridas
    enable_inputs(containers_to_show); // Se habilitan los inputs de la sección
    place_departaments(); // Se ingresan los departamentos en el select
}

/* CIERRE DE VENTANA DE INFORMACIÓN PRIVADA DEL USUARIO --------------------------------------------------------------------*/

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
async function verifyMicrosoftAccount(){
    try{
        const json_response = await fetch('Php/environment_variables.php');
        const data = await json_response.json();
        if(!data.client_id){
            throw new Error('');
        }
        const client_id = data.client_id;
        const redirect_uri = encodeURIComponent("https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/Php/Microsoft-Account-Verification.php");

        const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=openid profile email`;
        window.location.href = url;
    } catch(e){
        const error_text_alert = document.getElementById('error_text_alert');
        show_text_alert([[error_text_alert], 'Hubo un error. Intentelo nuevamente'])
    }
}

/* VENTANA DE INFORMACIÓN DE SEGURIDAD DEL USUARIO --------------------------------------------------------------------*/
// Función que muestra la apartado de ingreso de contraseñas
function PasswordsWindow(){
    const containers_to_show = [security_information_container];
    const loader = document.getElementById('loader');
    const containers_to_hide = [identity_information_container, loader];
    const bttn_send_txt = document.getElementById('bttn_send_txt');

    bttn_send_txt.style.display = "block";
    enable_inputs(containers_to_show);
    hide_and_show(containers_to_show, containers_to_hide);

    show_text_alert([[bttn_send_txt], 'Siguiente'])
}

// Función que verifica las contraseñas ingresadas por le usuario
function verifyPasswords(){
    hideLoader();

    // Se preparan los inputs a mostrar, ocultar, habilitar y deshabilitar
    const inputs_to_hide = [security_information_container];
    
    const text_SI1 = document.getElementById('text_SI1');
    const text_SI2 = document.getElementById('text_SI2');

    const input_1psw_Re = document.getElementById('input_1psw_Re');
    const input_2psw_Re = document.getElementById('input_2psw_Re');

    // La contraseña no puede ser menor a 8 carácteres
    if(input_1psw_Re.value.trim().length < 8){ // Si la contraseña es muy corta
        show_text_alert([[text_SI1], 'La contraseña no puede ser menor a 8 carácteres']); // Se muestra la alerta
        // Se habilitan los campos nuevamente
        enable_inputs(inputs_to_hide);
        return;
    }
    if(input_1psw_Re.value.trim() !== input_2psw_Re.value.trim()){ // Si las contraseñas no son euivalentes
        show_text_alert([[text_SI1, text_SI2], 'Las contraseñas no coinciden']); // Se muestra la alerta
        // Se habilitan los campos nuevamente
        enable_inputs(inputs_to_hide);
        return;
    }
    // Se muestra los campos para ingresar el DUI 
    show_public_information_window(inputs_to_hide)
    // Se oculta la animación de carga del botón
    hideLoader();
}
/* CIERRE DE VENTANA DE INFORMACIÓN DE SEGURIDAD DEL USUARIO --------------------------------------------------------------------*/

/* VENTANA DE INFORMACIÓN PÚBLICA DEL USUARIO --------------------------------------------------------------------*/
function show_public_information_window(containers_to_hide){
    const containers_to_show = [public_profile_information_container];
    const bttn_send_txt = document.getElementById('bttn_send_txt');
    const loader = document.getElementById('loader');
    containers_to_hide.push(loader);

    enable_inputs(containers_to_show);
    hide_and_show(containers_to_show, containers_to_hide);

    show_text_alert([[bttn_send_txt], 'Siguiente'])
}
// Función que permite elegir la imagen
function choose_picture(img){
    const input = img.previousElementSibling;

    img.addEventListener("click", () => {
        input.click();
    });
}

let current_img;

async function place_picture(input, boolean){
    const picture = input.files[0];
    let preview;
    if(boolean){
        preview = input.nextElementSibling;
    } else{
        const container = document.getElementById('img_cards_container');
        const array_img = Array.from(container.querySelectorAll('img'));
        preview = array_img[array_img.length - 1];
    }
    console.log(preview);

    if(picture){
        const formData = new FormData();
        formData.append('picture', picture);
        try{
            const json_response = await fetch('Php/upload_picture.php', {
                method: 'POST',
                body: formData
            })
            const data = await json_response.json();

            if(data.status !== 'ok'){
                throw new Error('La imagen no se logró subir');
            }
            preview.src = data.url;
        } catch(e){
            const PPIC_2 = document.getElementById('PPIC_2');
            show_text_alert([[PPIC_2], 'La imagen no se logró subir']);
            preview.remove();
            return;
        }
    }
}

function add_degree(){
    let container = document.getElementById('img_cards_container');
    let img = document.createElement('img');
    const input = document.getElementById('input_degrees_Re');
    img.className = 'card_img';
    img.src = '';
    img.alt = '';
    container.appendChild(img);

    img.addEventListener('click', function () {
        const img_viewer = document.getElementById('img_viewer');
        current_img = img;

        img_viewer.style.backgroundImage = `url(${img.src})`;
        img_viewer.style.display = 'flex';
    });

    input.click();
}

document.getElementById('close_img_viewer').addEventListener('click', () => {
    const img_viewer = document.getElementById('img_viewer');
    img_viewer.style.display = 'none';
});

document.getElementById('delete_degree').addEventListener('click', () => {
    if(current_img){
        const img_viewer = document.getElementById('img_viewer');
        current_img.remove();
        img_viewer.style.display = 'none';

        current_img = null;
    }
});

function validate_data(user_data){
    const keys = Object.keys(user_data);
    const error_text_alert = document.getElementById('error_text_alert');
    for(const key of keys){
        const value = user_data[key];
        if(!value){
            show_text_alert([[error_text_alert], 'Ningún campo debe de estar vacío']);
            return;
        }
    }
}

function collect_user_data(){
    const user_data = {};
    document.getElementById('inputs_container').querySelectorAll(':scope > article').forEach(article => {
        let splitted_id;
        let key_name;
        article.querySelectorAll(':scope > input').forEach(input => {
            splitted_id = input.id.split('_');
            key_name = splitted_id[1];
            user_data[key_name] = input.value;
        })

        if(article.id === 'identity_information_container'){
            article.querySelectorAll(':scope > select').forEach(select => {
                splitted_id = select.id.split('_');
                key_name = splitted_id[1];
                user_data[key_name] = select.value.toLowerCase();
            })
        }

        const profile_picture = document.getElementById('file_img_Re');
        const degree_images = document.getElementById('img_cards_container').querySelectorAll(':scope > img');
        let images = [];
        degree_images.forEach(img => {
            if(img){images.push(img.src)}
        });
        if(profile_picture.src){user_data['picture'] = profile_picture.src}
        if(images){user_data['degrees'] = images}
    })
    
    validate_data(user_data);
}

/* BOTÓN QUE CAMBIA SECCIONES -------------------------------------------------------------------------------------------*/
// Función que muestra la animación de carga en el botón
function animationLoad(){
    const loader = document.getElementById("loader");
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    bttn_send_txt.style.display = "none";
    loader.style.display = "block";
}
// Al presionar o dar click al botón, se valida en la sección actual activa para mover al usuario a la siguiente 
document.getElementById('bttn_send').addEventListener("click", async () => {
    disable_all_inputs(); // Se deshabilitan todos los inputs
    const error_text_alert = document.getElementById('error_text_alert');
    console.log(error_text_alert);
    error_text_alert.style.display = 'none'; // Se oculta el texto de alerta, por si h  ubo un error anteriormente
    document.getElementById('bttn_send').style.marginTop = "20px"; // Se reestablece el marginTop de bttn_send
    animationLoad(); // Al dar click, se muestra la animación de carga en el botón
    await delay(500); // Se espera medio segundo

    // Se valida el campo en el que se encuentra el usuario según los inputs mostrados
    if(getComputedStyle(personal_information_container).display !== 'none'){
        code_already_typed(); // Validación de la información
    } else if(getComputedStyle(verification_code_container).display !== 'none'){
        verification_code_window(sessionStorage.getItem('email')); // Validación de código
    } else if(getComputedStyle(identity_information_container).display !== 'none'){
        verify_identity_information(); // Validación de información
    } else if(getComputedStyle(security_information_container).display !== 'none'){
        verifyPasswords(); // Validación de contraseñas
    } else if(getComputedStyle(public_profile_information_container).display !== 'none'){
        collect_user_data();
    }
});