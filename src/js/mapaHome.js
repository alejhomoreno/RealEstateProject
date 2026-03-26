(function () {
    const lat = 4.1494877;
    const lng = -73.6365348;
    const mapa = L.map('map-home').setView([lat, lng], 15);

    let markets = L.featureGroup().addTo(mapa);

    let propertiesList = [];


    const filter = {
        tag: '',
        price: ''
    }

    const tagsSelect = document.querySelector('#tag');
    const pricesSelect = document.querySelector('#price');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // filters
    if (tagsSelect) {
        tagsSelect.addEventListener('change', e => {
            filter.tag = +e.target.value;
            filterProperties();
        });
    }

    if (pricesSelect) {
        pricesSelect.addEventListener('change', e => {
            filter.price = +e.target.value;
            filterProperties();
        });
    }

    const getProperties = async () => {

        try {
            const url = '/api/properties';
            const response = await fetch(url);
            propertiesList = await response.json();
            showProperties(propertiesList);

        } catch (error) {
            console.log(error);
        }

    }

    const showProperties = properties => {

        markets.clearLayers();

        properties.forEach(property => {

            console.log("Checking property data:", property);
            const marker = new L.marker([property.lat, property.lng], {
                autoPan: true,
            })
                .addTo(mapa)
                .bindPopup(`
                <p class="text-indigo-600 font-bold">${property.tag.name}</p>
                <h1 class="text-xl font-extrabold uppercase my-5">${property.title}</h1>
                <img src="/uploads/${property.img}" alt="Property Image ${property.title}">
                <p class="text-gray-600 font-bold mt-2">${property.price.name}</p>
                <a href="/properties/${property.id}" class="bg-indigo-600 block p-2 text-center text-white font-bold uppercase">View Property</a>
            `);

            markets.addLayer(marker);
        });
    }

    const filterProperties = () => {
        const result = propertiesList
            .filter(filterTags)
            .filter(filterPrices);
        showProperties(result);
    }

    const filterTags = (property) => {
        return filter.tag ? property.tagId === filter.tag : true;
    };

    const filterPrices = (property) => {
        return filter.price ? property.priceId === filter.price : true;
    };

    getProperties();

})();