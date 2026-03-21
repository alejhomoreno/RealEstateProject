import { Dropzone } from 'dropzone';

Dropzone.autoDiscover = false;

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


document.querySelector('#image').classList.add('dropzone');


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
    },
    init: function () {
        const dropzone = this
        const btnpublication = document.querySelector('#upload-button')
        btnpublication.addEventListener('click', function (e) {
            e.preventDefault()
            dropzone.processQueue()
        })
        dropzone.on('queuecomplete', function () {
            if (dropzone.getQueuedFiles().length == 0) {
                window.location.href = '/properties'
            }

        });
    }
})
