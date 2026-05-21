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

document.getElementById('file_dui_OCR').addEventListener('click', function() {
    
});