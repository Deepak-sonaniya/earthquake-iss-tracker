import { LeafletMap, TileLayer } from 'leaflet';

const map = new LeafletMap('map').setView([20, 0], 2);

new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);