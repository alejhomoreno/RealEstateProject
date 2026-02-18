(function () {

    const lat = 4.1494877;
    const lng = -73.6365348;
    const mapa = L.map('mapa').setView([lat, lng], 15);
    let marker;
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // pin 
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    })
        .addTo(mapa)

    marker.on('moveend', function (e) {
        marker = e.target;
        const position = marker.getLatLng();
        mapa.panTo(new L.LatLng(position.lat, position.lng));
        geocodeService.reverse().latlng(position, 15).run(function (error, result) {
            marker.bindPopup(result.address.LongLabel)

            document.querySelector('.calle').textContent = result?.address?.Address ?? '';
            document.querySelector('#calle').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        })

    })

})()