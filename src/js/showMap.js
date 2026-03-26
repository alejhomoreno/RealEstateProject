    (function(){
        const mapContainer = document.getElementById('map');
        const lat = parseFloat(mapContainer.dataset.lat);
        const lng = parseFloat(mapContainer.dataset.lng);
        const map = L.map('map').setView([lat, lng], 16);   
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add marker to map
        L.marker([lat, lng]).addTo(map)

    })()      