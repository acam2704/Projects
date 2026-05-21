/*document.getElementById('input_dui_OCR').addEventListener('change', function() {
    const dui_picture = this.files[0];
    let preview = document.getElementById('file_dui_OCR');
    const formData = new formData();
    formData.append('dui', dui_picture);

    try{
        const json_response = await fetch('Php/upload_picture.php', {
            method: 'POST',
            body: formData
        });
        const data = await json_response.json();

        if(data.status !== 'ok'){
            throw new Error('La imagen no se logró subir');
        }
        preview.src = data.url;
    } catch(e){
        const error = document.getElementById('main_alert');
        show_text_alert([[error], 'La imagen no se logró subir']);
        preview.remove();
        return;
    }
});*/

document.getElementById('input_dui_OCR').addEventListener('change', function(){
    const file = this.files[0];
    if (file) {
        const reader = new FileReader(); // Crea el lector de archivos
        const img = document.getElementById('file_dui_OCR');
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