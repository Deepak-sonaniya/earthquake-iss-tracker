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
            let place = Element.properties.place;
            console.log(place)
            let mag = Element.properties.mag;
            if(mag == null){
                return;
            }
            let coord = Element.geometry.coordinates;
            let lng =coord[0];
            let lat = coord[1];

            let radius =Math.max(mag*3,1);

           function getColor(mag) {
              if (mag >= 5) return "red";
               if (mag >= 3) return "orange";
                 return "green";
                    }
    



            new CircleMarker([lat,lng],{radius:radius,color:getColor(mag)}).addTo(map)
               .bindPopup(`${place} - Magnitude ${mag}`)
               .addTo(map)
        });
        

        console.log(data)
        
        // console.log(data.features.length);
        // console.log(data.features[0].geometry.coordinates);
        //  console.log(data.features[0].properties.mag); 


    }
    catch(e){
        console.log("error-",e);
    }
    
}

getdata();