const information_dui_container = document.getElementById('information_dui_container');

document.addEventListener('DOMContentLoaded', function(){
    information_dui_container.style.display = 'flex';

});

document.getElementById('input_frontdui_OCR').addEventListener('change', async function(){
    const file = this.files[0];
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
    console.log(data);
    text.textContent = data.currentAddress + '  -  ' + data.dateOfBirth + '  -  ' + data.documentNumber + '\n'
    + data.email + '  -  ' + data.firstName + '  -  ' + data.lastName + '\n' + data.phoneNumber + '  -  ' + data.status;
});

document.getElementById('bttn_frontdui').addEventListener('click', function() {
    const input_file = document.getElementById('input_frontdui_OCR');
    input_file.click();
});

document.getElementById('bttn_backdui').addEventListener('click', function() {
    const input_file = document.getElementById('input_backdui_OCR');
    input_file.click();
});