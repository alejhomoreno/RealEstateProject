import { Dropzone } from 'dropzone';

Dropzone.autoDiscover = false; 

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// ---> NEW BUG FIX: Inject the CSS class using JavaScript! <---
document.querySelector('#image').classList.add('dropzone');

// 2. Manually initialize Dropzone
const dropzone = new Dropzone('#image', {
    dictDefaultMessage: 'Drop your image here or click to upload',
    acceptedFiles: '.png,.jpg,.jpeg', 
    maxFilesize: 5,                   
    maxFiles: 1,                      
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Delete Image',
    dictMaxFilesExceeded: 'You can only upload one image',
    withCredentials: true, 
    headers: {
        'csrf-token': token
    }
});

// 3. Connect the Upload Button
const uploadButton = document.querySelector('#upload-button');

uploadButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    dropzone.processQueue();
});

// 4. Redirect after successful upload
dropzone.on('queuecomplete', function() {
    if(dropzone.getActiveFiles().length === 0) {
        window.location.href = '/properties';
    }
});