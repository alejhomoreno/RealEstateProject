/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaHome.js"
/*!****************************!*\
  !*** ./src/js/mapaHome.js ***!
  \****************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n(function () {\r\n    const lat = 4.1494877;\r\n    const lng = -73.6365348;\r\n    const mapa = L.map('map-home').setView([lat, lng], 15);\r\n\r\n    let markets = L.featureGroup().addTo(mapa);\r\n\r\n    let propertiesList = [];\r\n\r\n\r\n    const filter = {\r\n        tag: '',\r\n        price: ''\r\n    }\r\n\r\n    const tagsSelect = document.querySelector('#tag');\r\n    const pricesSelect = document.querySelector('#price');\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    // filters\r\n    if (tagsSelect) {\r\n        tagsSelect.addEventListener('change', e => {\r\n            filter.tag = +e.target.value;\r\n            filterProperties();\r\n        });\r\n    }\r\n\r\n    if (pricesSelect) {\r\n        pricesSelect.addEventListener('change', e => {\r\n            filter.price = +e.target.value;\r\n            filterProperties();\r\n        });\r\n    }\r\n\r\n    const getProperties = async () => {\r\n\r\n        try {\r\n            const url = '/api/properties';\r\n            const response = await fetch(url);\r\n            propertiesList = await response.json();\r\n            showProperties(propertiesList);\r\n\r\n        } catch (error) {\r\n            console.log(error);\r\n        }\r\n\r\n    }\r\n\r\n    const showProperties = properties => {\r\n\r\n        markets.clearLayers();\r\n\r\n        properties.forEach(property => {\r\n\r\n            console.log(\"Checking property data:\", property);\r\n            const marker = new L.marker([property.lat, property.lng], {\r\n                autoPan: true,\r\n            })\r\n                .addTo(mapa)\r\n                .bindPopup(`\r\n                <p class=\"text-indigo-600 font-bold\">${property.tag.name}</p>\r\n                <h1 class=\"text-xl font-extrabold uppercase my-5\">${property.title}</h1>\r\n                <img src=\"/uploads/${property.img}\" alt=\"Property Image ${property.title}\">\r\n                <p class=\"text-gray-600 font-bold mt-2\">${property.price.name}</p>\r\n                <a href=\"/properties/${property.id}\" class=\"bg-indigo-600 block p-2 text-center text-white font-bold uppercase\">View Property</a>\r\n            `);\r\n\r\n            markets.addLayer(marker);\r\n        });\r\n    }\r\n\r\n    const filterProperties = () => {\r\n        const result = propertiesList\r\n            .filter(filterTags)\r\n            .filter(filterPrices);\r\n        showProperties(result);\r\n    }\r\n\r\n    const filterTags = (property) => {\r\n        return filter.tag ? property.tagId === filter.tag : true;\r\n    };\r\n\r\n    const filterPrices = (property) => {\r\n        return filter.price ? property.priceId === filter.price : true;\r\n    };\r\n\r\n    getProperties();\r\n\r\n})();\n\n//# sourceURL=webpack://realestateproject/./src/js/mapaHome.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaHome.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;