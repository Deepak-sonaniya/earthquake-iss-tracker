const globe = Globe()(document.getElementById('globeViz'))
    .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
    .pointLat('lat')
    .pointLng('lng')
    .pointColor('color')
    .pointRadius('size')
    .pointAltitude('altitude')
    .pointLabel('label');

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

async function getdata(){
    try {
        let res = await fetch(url);
        let data = await res.json();
     
        let points = []; //array

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

            let color;
            if (mag>=5){
                color = 'red';
            }else if(mag>=3){
                color="orange";
            }else{
                color = "green";
            }

            points.push({
                lat: lat,
                lng :lng,
                size:Math.max(mag/10,0.1),
                altitude:Math.max(mag/100,0.01),
                color:color,
                label:`${place}-Magnitude ${mag}`
                
            });
    



            
        });
        
globe.pointsData(points); 

    }
    catch(e){
        console.log("error-",e);
    }
    
}
 // this function for countary name and board
async function loadCountries() {
    try {
        let res = await fetch('https://cdn.jsdelivr.net/gh/vasturiano/globe.gl/example/datasets/ne_110m_admin_0_countries.geojson');
        let countries = await res.json();

        globe
            .polygonsData(countries.features)
            .polygonCapColor(() => 'rgba(255, 255, 255, 0.05)')
            .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
            .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.5)')
            .polygonLabel(d => d.properties.ADMIN);
    }
    catch (e) {
        console.log("error-", e);
    }
}

loadCountries();

getdata();