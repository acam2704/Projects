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

//-------------------------------------------------------// OCR //-------------------------------------------------------//

//----- VENTANA DE INFORMACIÓN DE DUI -----//
const dui_information_container = document.getElementById('dui_information_container');
//----- VENTANA DE INFORMACIÓN DE CONTACTO -----//
const contact_information_container = document.getElementById('contact_information_container');

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
const usData_ocr = {};

const window_pathname = window.location.pathname.toLowerCase();
if(window_pathname.includes('session-log.html')){
    /* EVENTO DOMCONTENTLOADED --------------------------------------------------------------------------------------------*/
    document.addEventListener('DOMContentLoaded', function() {
        animationLoad(0);
        let local = localStorage.getItem('user');
        let session = sessionStorage.getItem('vth_email');
        const elements_to_show = [personal_information_container];

        disable_all_inputs();
        hideLoader();

        hide_and_show([personal_information_container], []);

        try{
            if(session){ 
                session = JSON.parse(session);
                const params =  ['names', 'lastnames', 'email', 'birthdate', 'phonenumber', 'dui', 'code', 'rol'];
                let user_data = {};
                for(const param of params){
                    const value = session[param] ?? null;
                    if(param === 'rol'){ user_data[param] = value; continue;}
                    if(!value){ user_data = {}; throw new Error('vth_email'); break; }
                    user_data[param] = value;
                }
                if(Object.keys(user_data).length === 8){
                    for(const param of params){
                        if(param === 'rol'){ continue; }
                        const id = 'input_' + param + '_Re';
                        const input = document.getElementById(id);

                        input.value = user_data[param];
                    }
                    const json_data = JSON.stringify({
                        code: user_data.code,
                        email: user_data.email
                    });
                    codeVerification(json_data, false); // Se envía a verificarlo
                    return;
                }
            }

            if(local === null){ throw new Error('user'); return;}

            local = JSON.parse(local);
            const mandatories = ['names', 'lastnames', 'email', 'birthdate'];

            for(const mandatory of mandatories){
                const value = local[mandatory] ?? null;
                if(!value){ throw null; return;}

                const id = 'input_' + mandatory +  '_Re';
                const input = document.getElementById(id);
                input.value = value;
            }

            hide_and_show(elements_to_show, []);
            enable_inputs(elements_to_show);
            return;
        } catch(e){
            enable_inputs(elements_to_show);
            hide_and_show(elements_to_show, []);
            if (e.message === 'vth_email'){
                sessionStorage.removeItem('vth_email');
            } else if(e.message === 'user'){
                localStorage.removeItem('user');
            }
        }
        hide_all_text_alerts();
    })
    document.getElementById('inputs_container').querySelectorAll(':scope > article').forEach(article => {
        article.querySelectorAll('input, select').forEach(element => {
            if(element.classList.contains('input') || element instanceof HTMLSelectElement){
                let span = element.previousElementSibling;
                while( element instanceof HTMLSelectElement && !(span instanceof HTMLSpanElement) ){
                    span = span.previousElementSibling;
                    if(!span){span = element.previousElementSibling; span = span.parentElement.previousElementSibling;}
                    if(!span){return;}
                }
                element.addEventListener('change', function() {
                    span.style.display = 'none';
                })
            }
        })
    });
    document.getElementById('back_bttn').addEventListener('click', go_back);
    // Evento change que agrega los municipios al siguiente select dependiendo del departamento seleccionado
    document.getElementById('select_departament').addEventListener('change', function() {
        const departament_key = document.getElementById('select_departament').value;
        document.querySelectorAll('.option_municipality').forEach(el => el.remove());
        document.querySelectorAll('.option_district').forEach(el => el.remove());
        if(!departament_key){return;}
        const departament = map[departament_key][0];

        if(departament_key.trim().length !== 0){
            place_municipality(departament, departament_key);
        }
    });
    // Evento change que agrega los distritos al siguiente select dependiendo del municipio seleccionado
    document.getElementById('select_municipality').addEventListener('change', function() {
        const municipality = document.getElementById('select_municipality').value;
        document.querySelectorAll('.option_district').forEach(el => el.remove());
        if(!municipality){return;}
        const departament = document.getElementById('select_departament').value;

        if(municipality.trim().length !== 0){
            place_district(municipality, departament);
        }
    });
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
    document.getElementById('message_description_Re').addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
        let words_amount = this.value.length;
        if(words_amount >= 250){this.disabled = true; words_amount = words_amount.slice(0, 250);}
        this.disabled = false;
        let words_counter = document.getElementById('words_counter');
        words_counter.textContent = words_amount.value.length + '/250';
    });
    // Al presionar o dar click al botón, se valida en la sección actual activa para mover al usuario a la siguiente 
    document.getElementById('bttn_send').addEventListener("click", async () => {
        disable_all_inputs(); // Se deshabilitan todos los inputs
        animationLoad(0); // Al dar click, se muestra la animación de carga en el botón
        await delay(500); // Se espera medio segundo

        // Se valida el campo en el que se encuentra el usuario según los inputs mostrados
        if(getComputedStyle(personal_information_container).display !== 'none'){
            next(); // Validación de la información
        } else if(getComputedStyle(verification_code_container).display !== 'none'){
            verification_code_window(sessionStorage.getItem('email')); // Validación de código
        } else if(getComputedStyle(identity_information_container).display !== 'none'){
            verify_identity_information(); // Validación de información
        } else if(getComputedStyle(security_information_container).display !== 'none'){
            verifyPasswords(); // Validación de contraseñas
        } else if(getComputedStyle(public_profile_information_container).display !== 'none'){
            const email = document.getElementById('input_email_Re').value;
            const dui = document.getElementById('input_dui_Re').value;
            const phonenumber = document.getElementById('input_phonenumber_Re').value;
            validate_info({email: email.trim(), dui: dui.trim(), phonenumber: phonenumber.trim()}, [], false);
        }
    });

    const content_window = document.getElementsByClassName('content_window')[0];
    const aside = document.getElementById('aside_background');
    const inputs_container = document.getElementById('inputs_container');
    if(window.matchMedia('(min-width: 768px)')){
        inputs_container.style.padding = '0 40px';

        const inputs = Array.from(document.getElementsByClassName('input'));
        inputs.forEach(input =>{
            input.padding = '5px 10px 5px 10px';
        });
    } else if(window.matchMedia('(max-width: 767px)')){
        content_window.style.width = '100%';
    }
    inputs_container.style.padding = '40px';

} else if(window_pathname.includes('session-log-ocr.html')){
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', manejarCambio);
    manejarCambio(mediaQuery);

    document.addEventListener('DOMContentLoaded', function(){
        dui_information_container.style.display = 'flex';
    });
    document.getElementById('input_frontdui_OCR').addEventListener('change', async function(){
        const main_alert = document.getElementById('main_alert');
        hide_and_show([], [main_alert]);
        const loader = document.getElementById('loadfront_dui');
        const containers = Array.from(document.getElementsByClassName('frontdui_container'));
        loading_photo(containers, loader);
        const file = this.files[0] ?? null;
        if (file) {
            const reader = new FileReader(); // Crea el lector de archivos
            const img = document.getElementById('file_frontdui_OCR');
            reader.onload = function(e) {
                img.src = e.target.result; // Asigna la ruta de la imagen
            }
            reader.readAsDataURL(file); // Lee el archivo como URL de datos
        }
        const text = document.getElementById('main_alert');
        const form = new FormData();
        form.append('file', file);
        const response = await fetch('Php/scan_img.php', {
            method: 'POST',
            body: form
        });
        const data = await response.json();
        validate_dui_info(data, 1, 'Ingenia -Mejore la foto', containers, loader);
    });
    document.getElementById('input_backdui_OCR').addEventListener('change', async function(){
        const main_alert = document.getElementById('main_alert');
        hide_and_show([], [main_alert]);
        const loader = document.getElementById('loadback_dui');
        const containers = Array.from(document.getElementsByClassName('backdui_container'));
        loading_photo(containers, loader);
        const file = this.files[0];
        if (file) {
            const reader = new FileReader(); // Crea el lector de archivos
            const img = document.getElementById('file_backdui_OCR');
            reader.onload = function(e) {
                img.src = e.target.result; // Asigna la ruta de la imagen
            }
            reader.readAsDataURL(file); // Lee el archivo como URL de datos
        }

        const text = document.getElementById('main_alert');
        const form = new FormData();
        form.append('file', file);

        const response = await fetch('Php/scan_img.php', {
            method: 'POST',
            body: form
        });
        const data = await response.json();
        validate_dui_info(data, 2, 'Ingenia -Mejore la foto', containers, loader);
    });
    document.querySelectorAll('.photobttn, .uploadbttn').forEach(bttn => {
        let input_file;
        if(bttn.id.includes('front')){ input_file = document.getElementById('input_frontdui_OCR'); }
        else if(bttn.id.includes('back')){ input_file = document.getElementById('input_backdui_OCR'); }

        bttn.addEventListener('click', function(){
            if(this.classList.contains('photobttn')){ input_file.setAttribute('capture', 'environment'); }
            else{ input_file.removeAttribute('capture'); }
            input_file.value = '';
            input_file.click(); 
        });
    });
    document.getElementById('slocr_sendbttn').addEventListener('click', async function(){
        disable_all_inputs(); // Se deshabilitan todos los inputs
        animationLoad(1); // Al dar click, se muestra la animación de carga en el botón
        await delay(500); // Se espera medio segundo

        // Se validan los datos escaneados/digitados por el usuario
        if(getComputedStyle(dui_information_container).display !== 'none'){
            validate_dui_info(usData_ocr, 3, 'Ingenia -Escaneo necesario', [dui_information_container], '');
        }
    });
    const viewer = document.getElementById('img_viewer');
    document.getElementById('imgview_closer').addEventListener('click', () => {
        viewer.style.display = 'none';
    });
    const img_contr = document.getElementById('img_container');
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    Array.from(document.getElementsByClassName('preview_container')).forEach(preview => {
        let input;
        if(preview.id.includes('front')){ input = document.getElementById('input_frontdui_OCR'); }
        else if(preview.id.includes('back')){ input = document.getElementById('input_backdui_OCR'); }
        preview.addEventListener('click', function() {
            try{
                const img = input.files[0];
                viewer.style.display = 'flex';
                if(!allowed.includes(img.type)){ throw new Error('Ingenia -Formato no permitido'); }
                if(img){ img_contr.style.backgroundImage = `url(${URL.createObjectURL(img)})`; }
                else{ img_contr.style.background = 'red'; }
            } catch(e){
                const alert = document.getElementById('main_alert');
                if(e.message.includes('Ingenia -')){
                    show_text_alert([[alert], e.message.split('-')[1]])
                }
            }
        });
    });
    const email_container = document.getElementById('ocrEmail_container');
    const bttns_container = document.getElementById('emailBttns_container');
    document.getElementById('typebttn_ocr').addEventListener('click', function(){
        bttns_container.style.display = 'none';
        email_container.classList.add('show');
    });
    document.getElementById('emailbttn_back').addEventListener('click', function(){
        bttns_container.style.display = 'flex';
        email_container.classList.remove('show');
    });
    const input_phonenumber_OCR = document.getElementById('input_phonenumber_OCR');
    const bttns_array = Array.from(document.getElementById('ocrBttns_container').querySelectorAll(':scope > button'))
    for (let n = 0; n < bttns_array.length; n++) {
        bttns_array[n].addEventListener('click', function(){
            if(input_phonenumber_OCR.value.length < 8){
                if(n === 9){ input_phonenumber_OCR.value = input_phonenumber_OCR.value.slice(0, -1); }
                else if(n < 10){ input_phonenumber_OCR.value = input_phonenumber_OCR.value + `${n+1}`; }
            }
            if(n === 10){ input_phonenumber_OCR.value = input_phonenumber_OCR.value + '0'; }
        });
    }
    const container1 = document.getElementById('primary_bttns_container');
    container1.style.maxWidth = '500px';
}

// Función que permite simular volver a los campos de ingreso anteriores
function go_back(){
    // Se deshabilitan todos los inputs
    disable_all_inputs();
    hide_all_text_alerts();

    // Se oculta el texto de alerta, por si hubo un error anteriormente
    const error_text_alert = document.getElementById('error_text_alert');
    error_text_alert.style.display = 'none';

    const inputs_container = document.getElementById('inputs_container');
    const containers = Array.from(inputs_container.querySelectorAll('.signup_section'));
    for(const container of containers){
        if(container.id === 'personal_information_container' && getComputedStyle(container).display !== 'none'){
            window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/user.html';
            return;
        }

        if (getComputedStyle(container).display !== 'none' && container.id !== 'personal_information_container'){
            let previous_container = container.previousElementSibling;
            if (previous_container.id === 'verification_code_container'){
                previous_container = previous_container.previousElementSibling;
            }
            const filtered_containers = containers.filter(container => container !== previous_container); // Array
            const containers_to_show = [previous_container];
            if (previous_container.id === 'personal_information_container'){
                const back_bttn = document.getElementById('back_bttn'); 
                const main_title = document.getElementById('main_title');
                containers_to_show.push(content_check_buttons_with);
                containers_to_show.push(main_title);
            }
            enable_inputs(containers_to_show);
            hide_and_show(containers_to_show, filtered_containers);
            return;
        }
    }
}
// Función que permite deshabilitar los inputs al cargar la página
function disable_all_inputs(){
    const inputs_container = document.getElementById('inputs_container');
    const containers = Array.from(inputs_container.querySelectorAll(':scope > article')).filter(container => container.classList.contains('signup_section'));
    disable_inputs(containers);
}
// Función que permite ocultar todas las alertas de cada sección
function hide_all_text_alerts(){
    const inputs_container = document.getElementById('inputs_container');

    inputs_container.querySelectorAll(':scope > article').forEach(article => {
        article.querySelectorAll('span').forEach(span => {
            if(span && span.classList.contains('text_alert')){span.style.display = 'none';}
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
    let bttns_ids = ['bttn_send', 'slocr_sendbttn'];
    for(const id of bttns_ids){
        try{ const bttn_send = document.getElementById(id); bttn_send.classList.remove('blocked');} 
        catch(e){ continue; }
    }
    bttn_send_txt.style.display = "block";
    loader.style.display = "none";
}
// Función que permite ocultar y mostrar elementos
function hide_and_show(containers_to_show, containers_to_hide){
    containers_to_hide.forEach(container => {
        container.style.display = "none";
    }); 
    containers_to_show.forEach(container => {
        if(container.id === 'content_check_buttons_with'){
            container.style.display = 'flex'; 
            container.style.flexDirection = 'column'; 
            container.style.alignItems = 'center';
        }
        else{container.style.display = "flex";}
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
        container.querySelectorAll('input').forEach(i => {
            if(i.classList.contains('input')){ i.disabled = true; }
        })
    );
}
// Función que permite habilitar inputs
function enable_inputs(containers){
    // A cada input enviado dentro de la lista 'inputs' se cambia a FALSE la propiedad 'disabled' 
    // Esto permite el ingreso de valores dentro de cada input 
    containers.forEach(container => 
        container.querySelectorAll('input').forEach(i => {
            if(i.classList.contains('input')){ i.disabled = false; }
        })
    );
}
// Función que almacena datos dentro de localStorage y sessionStorage
function almacenate(data){
    let user_data = JSON.parse(localStorage.getItem('user') ?? '{}');
    user_data.email = data.email;
    user_data.names = data.names;
    user_data.lastnames = data.lastnames;
    // Almacenamiento de los datos importantes del usuario en el localStorage como JSON
    localStorage.setItem('user', JSON.stringify(user_data));
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
        article.querySelectorAll('span').forEach(span => {
            if(span && span.classList.contains('text_alert')){ span.textContent = ''; }
        })
    })
}

// Función que valida si el código fue ingresado anteriormente al momento de registrarse
function code_already_typed(elements_to_hide){
    let data = JSON.parse(localStorage.getItem('user'));
    let email = data?.email ?? null;
    const rol = data?.rol ?? null;
    const input_email_Re = document.getElementById('input_email_Re');
    const alert = document.getElementById('error_text_alert');

    try{
        if ( email && ( email === input_email_Re.value.trim() ) ) {
            show_identity_information_window(elements_to_hide);
        } else{
            const input_code = document.getElementById('input_code_Re');
            input_code.value = '';

            // Se crea un json con la Información Personal del usuario
            const names = document.getElementById('input_names_Re').value;
            const lastnames = document.getElementById('input_lastnames_Re').value;
            const email = document.getElementById('input_email_Re').value;
            const birthdate = document.getElementById('input_birthdate_Re').value;
            const phonenumber = document.getElementById('input_phonenumber_Re').value;
            const dui = document.getElementById('input_dui_Re').value;

            if(!rol){ show_text_alert([[alert], 'Tipo de usuario no identificado']); hideLoader(); enable_inputs(elements_to_hide); return; }

            const json_data = {
                names: names,
                lastnames: lastnames,
                email: email,
                birthdate: birthdate,
                phonenumber: phonenumber,
                dui: dui,
                rol: rol,
                domain: 'google'
            };

            for(const key of Object.keys(json_data)){
                const value = json_data[key];
                if(!value){
                    throw new Error(`${value} requerido`);
                }
            }
            // Se envían a una función que envía un código de verificación
            sendCode(JSON.stringify(json_data));
        }
    } catch(e){
        show_text_alert([[alert], 'Hubo un error. Inténtelo nuevamente'])
        hideLoader();
        enable_inputs(elements_to_hide);
    }
}

// Función que se usa cuando se ingresan manualmente los campos de Información Personal
async function next(){
    // Se preparan los inputs a ocultar y que, en caso de fallar su validación, se vuelven a habilitar
    const elements_to_hide = [personal_information_container, content_check_buttons_with];

    /* Se valida si hay campos vacíos */
    for (const container of elements_to_hide){ // Se recorre cada elemento
        const inputs = container.querySelectorAll(':scope > input'); // Del elemento se toman los inputs
        const inputs_num = {input_phonenumber_Re: 8, input_dui_Re: 9};
        for(const input of inputs){ // Por cada input
            const alert = input.previousElementSibling; // Se toma el span de arriba
            if(input.value.trim() === ''){ // Se valida si no está vacío
                input.focus(); // Se devuelve el foco
                hideLoader(); // Se esconde la animación de carga
                enable_inputs(elements_to_hide); // Se vuelven a habilitar loos inputs de los elementos validados
                if(alert && alert.classList.contains('text_alert')){ // Si el span es válido y con la clase requerida
                    show_text_alert([[alert], 'Campo obligatorio']) // Se muestra la alerta
                }
                return; // Se fuerza el final de la función
            } 
            const input_num = inputs_num[input.id] ?? null;
            if( input_num && ( input.value.trim().length !== input_num ) ){
                input.focus(); // Se devuelve el foco
                hideLoader(); // Se esconde la animación de carga
                enable_inputs(elements_to_hide); // Se vuelven a habilitar loos inputs de los elementos validados
                if(alert && alert.classList.contains('text_alert')){ // Si el span es válido y con la clase requerida
                    show_text_alert([[alert], 'Número inválido']) // Se muestra la alerta
                }
                return; // Se fuerza el final de la función
            }
        }
    }

    const birthdate = document.getElementById('input_birthdate_Re');
    const [year, month, day] = birthdate.value.split('-').map(Number);
    const input_date = new Date(year, month - 1, day);
    const today = new Date();
    const minDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    if(input_date >= minDate){
        const alert = birthdate.previousElementSibling;
        birthdate.focus(); // Se devuelve el foco
        hideLoader(); // Se esconde la animación de carga
        enable_inputs(elements_to_hide); // Se vuelven a habilitar loos inputs de los elementos validados
        if(alert && alert.classList.contains('text_alert')){ // Si el span es válido y con la clase requerida
            show_text_alert([[alert], 'No cumples con la edad mínima']); // Se muestra la alerta
        }
        return; // Se fuerza el final de la función
    }

    const email = document.getElementById('input_email_Re').value.trim();
    const phonenumber = document.getElementById('input_phonenumber_Re').value.trim();
    const dui = document.getElementById('input_dui_Re').value.trim();
    validate_info({email: email, phonenumber: phonenumber, dui: dui}, elements_to_hide, true);
}

function email_registered(response, elements_to_hide, param){
    const error_text_alert = document.getElementById('error_text_alert');
    try{
        response[0] = JSON.parse(response[0]);
        if(response[0].status === 'ok'){
            if(param){ code_already_typed(elements_to_hide); return; }
            else{ collect_user_data(); return; }
        }
        if(response[0].error){ throw new Error(response[0].error)} 
        else { throw new Error('Ingenia -Hubo un error. Inténtelo de nuevo'); }

        enable_inputs(elements_to_hide);
        hideLoader();
    } catch(e){
        let text = 'Hubo un error. Inténtelo de nuevo';
        const msg = e.message ?? null;
        if(msg && msg.includes('Ingenia -')) { text = msg.split('-')[1]; }
        show_text_alert([[error_text_alert], text]);
        enable_inputs(elements_to_hide);
        hideLoader();
    }
}

function validate_info(user_data, elements_to_hide, param){
    fetch('Php/user_already_registered.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: user_data.email, dui: user_data.dui, phonenumber: user_data.phonenumber})
    })
    .then(response => response.text())
    .then(data => {
        email_registered([data, user_data], elements_to_hide, param);
    });
}

// Función que se usa al verificar la cuenta con Google (handleCredentialResponse -> transformData)
async function transformData(json){
    const input_names_Re = document.getElementById('input_names_Re');
    const input_lastnames_Re = document.getElementById('input_lastnames_Re');
    const input_email_Re = document.getElementById('input_email_Re');
    const file_img_Re = document.getElementById('file_img_Re');
    // El status de la respuesta a la verificación de las credenciales debe de ser 'ok'
    if(json["status"] === "ok"){
        // Se ingresa el supuesto nombre y el apellido del usuario
        input_names_Re.value = json.names;
        input_lastnames_Re.value = json.lastnames;
        input_email_Re.value = json.email;
        file_img_Re.src = json.picture;

        almacenate(json);
        sessionStorage.removeItem('vth_email');
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
        if(response.error === null){
            // El status de la respueta debe ser 'ok'
            if(response.status === "ok"){
                // Se almacena en el localStorage y en el sessionStorage los datos enviados desde 'Emails.php'
                show_verification_code_window(elements_to_hide);
            } else {
                // Se le dice al usuario que hubo un error
                show_text_alert([[error_text_alert], 'Hubo un error. Inténtalo de nuevo']);
                // Se habilita la modificación de los valores de los inputs
                enable_inputs(elements_to_hide);
            }
        } else if(response.error.includes('Invalid email')){
            enable_inputs(elements_to_hide); // Se habilita la modificación de los valores de los inputs
            const input_email_Re = document.getElementById('input_email_Re');
            const alert = input_email_Re.previousElementSibling;
            show_text_alert([[alert], 'Correo inválido']); // Se le dice al usuario que el correo es inválido
            input_email_Re.focus(); // Se devuelve el foco a input_email_Re
        } else {
            enable_inputs(elements_to_hide); // Se habilita la modificación de los valores de los inputs
            // Se le dice al usuario que hubo un error y que lo vuelva a intentar
            show_text_alert([[error_text_alert], 'Hubo un error. Inténtalo otra vez']);
        }
    } catch(e){
        alert("Recargue la página y vuelva a intentarlo"); // Se le pide al usuario volver a intentar el Registro
    }
    hideLoader(); // Se oculta la animación de carga del botón
}

function show_verification_code_window(containers_to_hide){
    const main_title = document.getElementById('main_title');
    const back_bttn = document.getElementById('back_bttn');
    const containers_to_show = [verification_code_container];

    containers_to_hide.push(main_title);
    containers_to_hide.push(back_bttn);

    enable_inputs(containers_to_show);
    disable_inputs(containers_to_hide);
    hideLoader();

    hide_and_show(containers_to_show, containers_to_hide);
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Desde: después de enviar el correo 
async function verification_code_window(email){
    const text = document.getElementById('text_VC1');
    const input_code_Re = document.getElementById('input_code_Re');
    // Se mantiene el texto mostrado
    
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
            codeVerification(json_data, true); // Se envía a verificarlo
        };
    }
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Función que envía a verificar la legitimidad el código ingresado
// Desde VerificationCodeWindow -> codeVerification
function codeVerification(json_data, bool){
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
        codeVerificationResponse(JSON.parse(data), bool)
    });
}

// Función que se usa al ingresar manualmente la Información Personal del usuario
// Función que procesa la respuesta de verificación de código
// Desde: codeVerification -> codeVerificationResponse
async function codeVerificationResponse(response, bool){
    const text = document.getElementById('error_text_alert');
    // Se preparan los inputs a ocultar y mostrar
    let elements_to_hide = [];
    if(bool){elements_to_hide = [verification_code_container];}
    else{elements_to_hide = [personal_information_container, content_check_buttons_with];}
    
    // El status de la respuesta debe de ser 'ok'
    if(response['status'] === 'ok'){
        const names = document.getElementById('input_names_Re').value;
        const lastnames = document.getElementById('input_lastnames_Re').value;
        const email = document.getElementById('input_email_Re').value; 
        const json_data = {
            'names': names,
            'lastnames': lastnames,
            'email': email
        }
        almacenate(json_data);
        // Se muestra la ventana de ingreso de información más delicada del usuario
        show_identity_information_window(elements_to_hide);
    } else{ // Si el status es diferente a 'ok'
        show_text_alert([[text], 'Código inválido']); // Se muestra la alerta
        sessionStorage.removeItem('vth_email');
        enable_inputs(elements_to_hide); // Se habilitan los inputs requeridos
        hide_and_show(elements_to_hide, [])
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
        option.value = dis.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(' ', '_');
        option.textContent = dis;

        select.appendChild(option);
    });
}

// Función que ejecuta un código repetitivo de la función verify_identity_information
function executor_from_VII(element, text){
    enable_inputs([identity_information_container]); // Se vuelven a habilitar los inputs
    element.focus(); // Se devuelve el enfoque 
    let alert = element.previousElementSibling; // Se toma al elemento de arriba (span)
    while(!(alert instanceof HTMLSpanElement)){
        alert = alert.previousElementSibling;
        if(!alert){alert = element.previousElementSibling;alert = alert.parentElement.previousElementSibling;}
    }
    
    show_text_alert([[alert], text]); // Se muestra la alerta
}

// Función que verifica los datos del usuairo de los campos ingresados
function verify_identity_information(){
    const selects = identity_information_container.querySelectorAll('select'); // inputs y selects
    for (const select of selects){ // Se recorre cada input y select
        if (select.value.trim() === ''){ // Si el campo está vacío
            executor_from_VII(select, 'Campo obligatorio');
            hideLoader();
            return; // Se fuerza el final de la función
        }
    }
    const inputs = identity_information_container.querySelectorAll('input');
    for (const input of inputs){
        if( input.classList.contains('input') ){ // Si el elemento es uno clase .input
            if(input.id === 'input_DUI_Re'){
                const DUI = input.value.replace('-', '');
                if(!isNaN(DUI) && DUI.length !== 9){
                    executor_from_VII(input, 'DUI Inválido'); hideLoader(); return
                }
            } else {
                if(input.value.length !== 8){executor_from_VII(input, 'Número inválido'); hideLoader(); return}
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

function register_user(user_data){
    fetch('Php/Register_new_user_in_DB.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_data)
    })
    .then(response => response.text())
    .then(data => {
        hideLoader();
        window.location.href = 'https://ingenia-a6dkhcarh6e3b0ak.mexicocentral-01.azurewebsites.net/Ingenia/Html/web.html'
    });
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
    hideLoader();
    show_text_alert([[bttn_send_txt], 'Siguiente'])
}

// Función que verifica las contraseñas ingresadas por le usuario
function verifyPasswords(){
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
        hideLoader();
        return;
    }
    if(input_1psw_Re.value.trim() !== input_2psw_Re.value.trim()){ // Si las contraseñas no son euivalentes
        show_text_alert([[text_SI1, text_SI2], 'Las contraseñas no coinciden']); // Se muestra la alerta
        // Se habilitan los campos nuevamente
        enable_inputs(inputs_to_hide);
        hideLoader();
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
    hideLoader();

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
            const error = document.getElementById('error_text_alert');
            show_text_alert([[error], 'La imagen no se logró subir']);
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

function validate_data(user_data){
    const keys = Object.keys(user_data);
    const error_text_alert = document.getElementById('error_text_alert');
    const non_mandatory_fields = ['picture', 'degrees', 'description', 'code'];
    for(const key of keys){
        if(!non_mandatory_fields.includes(key)){
            const value = user_data[key];
            if(!value || value === undefined){
                enable_inputs([public_profile_information_container]);
                show_text_alert([[error_text_alert], 'Ningún campo debe de estar vacío']);
                hideLoader();
                return;
            }
        }
    }
    almacenate(user_data);  
    register_user(user_data);
}

function collect_user_data(){
    let user_data = {};
    user_data['rol'] = JSON.parse(localStorage.getItem('user')).rol ?? null;
    document.getElementById('inputs_container').querySelectorAll(':scope > article').forEach(article => {
        let splitted_id;
        let key_name;

        article.querySelectorAll(':scope > input, select, textarea').forEach(element => {
            splitted_id = element.id.split('_');
            key_name = splitted_id[1];
            if(element instanceof HTMLTextAreaElement){ user_data[key_name] = element.value; }
            else{ user_data[key_name] = element.value; }
        });

        const profile_picture = document.getElementById('file_img_Re');
        const degree_images = document.getElementById('img_cards_container').querySelectorAll(':scope > img');
        let images = [];
        degree_images.forEach(img => {
            if(img){images.push(img.src);}
        });
        if(profile_picture.src){user_data['picture'] = profile_picture.src;}
        if(images){user_data['degrees'] = images;}
    });
    
    validate_data(user_data);
}

/* BOTÓN QUE CAMBIA SECCIONES -------------------------------------------------------------------------------------------*/
// Función que muestra la animación de carga en el botón
function animationLoad(n){
    const loader = document.getElementById("loader");
    const ids_bttnsend = ['bttn_send', 'slocr_sendbttn'];
    const bttn_send = document.getElementById(ids_bttnsend[n]);
    const bttn_send_txt = document.getElementById("bttn_send_txt");

    bttn_send.classList.add('blocked');
    bttn_send_txt.style.display = "none";
    loader.style.display = "block";
}

/* SESSION LOG OCR */
async function validate_dui_info(data, n, msg, containers, loader){
    try{
        if(!(data.status === 'ok') && n !== 3){ throw new Error(data.error) }
        const required_fields = [
            ['firstname', 'birthdate', 'dui', 'lastname'], 
            ['city', 'state', 'countryregion'], 
            ['firstname', 'birthdate', 'dui', 'lastname', 'city', 'state', 'countryregion']
        ];
        const fields = required_fields[n-1];
        for(const field of fields){
            if(!data[field]){ throw new Error(`Ingenia -${msg}`); }
            usData_ocr[field] = data[field];
        }
        if(n === 3){
            const container_to_hide = [dui_information_container];
            show_contactInformationWindow_ocr(container_to_hide);
        } else{
            let preview;
            if(loader.id.includes('front')){ preview = document.getElementById('frontdui_preview'); } 
            else if(loader.id.includes('back')){ preview = document.getElementById('backdui_preview'); }
            show_preview(preview, loader);
        }
    } catch(e){
        const alert = document.getElementById('main_alert');
       
        if(e.message.includes('Ingenia -')){ show_text_alert([[alert], e.message.split('-')[1]]); }
        if(n !== 3){ dui_card(containers, loader); for(const key in usData_ocr){ delete usData_ocr[key]; } }
        else{ hideLoader(); enable_inputs([dui_information_container]); }
    }
}

function show_contactInformationWindow_ocr(container_to_hide){
    const container_to_show = [contact_information_container];
    
    hide_and_show(container_to_show, container_to_hide);
    enable_inputs(container_to_show);
    hideLoader();
    hide_all_text_alerts();
}

function loading_photo(containers, loader){
    loader.classList.add('show');
    containers.forEach(con => con.style.display = 'none');
}
function dui_card(containers, loader){
    loader.classList.remove('show');
    containers.forEach(con => con.style.display = 'flex');

    const con = loader.parentElement;
    const img = con.querySelector('.dui_img');
    const img_cntr = img.parentElement;
    const title = con.querySelector('.main_duiimg_txt');
    const sub = con.querySelector('.sub_duiimg_txt');

    img_cntr.style.boxShadow = '0px 5px 10px 0px rgb(167 63 63 / 54%)';
    if(window.matchMedia('(min-width: 768px)').matches){
        img_cntr.style.width = '60px';
        img_cntr.style.height = '60px';
    } else{
        img_cntr.style.width = '150px';
        img_cntr.style.height = '150px';
    }
    img_cntr.style.overflow = 'hidden'; 
    img_cntr.style.margin = '20px';
    img.src = 'Imágenes/eliminar.png';
    img.style.width = '60px';
    title.textContent = 'Error al escanear.';
    sub.textContent = 'Inténtelo nuevamente';
}
function show_preview(preview, loader){
    loader.classList.remove('show');
    preview.classList.add('show');

    const con = preview.querySelector('.preview_container');
    const img = preview.querySelector('.check');
    const img_cntr = img.parentElement;
    const title = preview.querySelector('.scan_title');
    const sub = preview.querySelector('.scan_sub');

    con.classList.add('show');
    img.src = 'Imágenes/comprobar.png';
    img_cntr.style.boxShadow = '0px 5px 10px 0px rgb(63 167 85 / 54%)';
    img_cntr.style.margin = '0';
    title.textContent = 'Escaneado exitósamente';

    let side;
    if(preview.id.includes('front')){ side = 'frontal'; }
    else if(preview.id.includes('back')){ side = 'trasera'; }
    sub.textContent = `Cara ${side} verificada`;
}

function manejarCambio(evento) {
    const aside = document.getElementById('aside_background');
    const main = document.getElementsByClassName('content_window')[0];
    const viewer_rbbn = document.getElementById('img_viewer_ribbon');
    const inputs_container = document.getElementById('inputs_container');
    const duititle_containers = Array.from(document.getElementsByClassName('duititle_container'));

    if(evento.matches){
        aside.style.width = '40vw';
        main.style.width = '60vw';
        main.style.minWidth = '600px';
        duititle_containers.forEach(con => {
            con.querySelectorAll('.main_duiimg_txt, .sub_duiimg_txt').forEach(p => {
                p.classList.add('show');
            });
        });
    } else{
        main.style.width = '80%';
        main.style.minWidth = '375px';
        main.style.margin = '20px 0 20px 0';
        main.style.padding = '30px 0 30px 0';
        duititle_containers.forEach(con => {
            con.querySelectorAll('.main_duiimg_txt, .sub_duiimg_txt').forEach(p => {
                p.classList.remove('show');
            });
        });
    }

    viewer_rbbn.style.height = '60px';
    viewer_rbbn.style.width = '60px';
    viewer_rbbn.style.gap = '0';
    viewer_rbbn.style.position = 'absolute';
    viewer_rbbn.style.borderRadius = '30px';
    viewer_rbbn.style.backgroundColor = 'rgba(0,0,0,0.3)';
    viewer_rbbn.style.alignItems = 'center';
}