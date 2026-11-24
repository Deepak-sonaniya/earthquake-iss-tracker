import { LeafletMap, TileLayer , CircleMarker} from 'leaflet';

const map = new LeafletMap('map').setView([20, 0], 2);

new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
async function getdata(){
    try {
        let res = await fetch(url);
        let data = await res.json();

        data.features.forEach(Element => {
            let mag = Element.properties.mag;
            let coord = Element.geometry.coordinates;
            
            console.log(mag ,coord);
        });

        console.log(data)
        console.log(data.features.length);
        console.log(data.features[0].geometry.coordinates);
         console.log(data.features[0].properties.mag); 


    }
    catch(e){
        console.log("error-",e);
    }
    
}
getdata();