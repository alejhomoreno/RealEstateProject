document.addEventListener('DOMContentLoaded', function () {

    const changeStatusButtons = document.querySelectorAll('.change-status');

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    changeStatusButtons.forEach(boton => {
        boton.addEventListener('click', changeStatusProperty);
    });

    async function changeStatusProperty(e) {
        const { propertyId: id } = e.target.dataset;
        try {
            const url = `/properties/${id}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'CSRF-Token': token
                }
            })
            // ... top part of your code stays the same ...
            const {result} = await response.json();

            if(result) {
                // If it is CURRENTLY green (Published)...
                if(e.target.classList.contains('bg-green-100')) {
                    // ...change it to yellow (Not Published)
                    e.target.classList.remove('bg-green-100', 'text-green-800');
                    e.target.classList.add('bg-yellow-100', 'text-yellow-800');
                    e.target.textContent = 'Not Published';
                } else {
                    // If it is CURRENTLY yellow (Not Published)...
                    // ...change it to green (Published)
                    e.target.classList.remove('bg-yellow-100', 'text-yellow-800');
                    e.target.classList.add('bg-green-100', 'text-green-800');
                    e.target.textContent = 'Published';
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }
});