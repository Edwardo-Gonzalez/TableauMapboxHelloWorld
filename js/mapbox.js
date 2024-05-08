/**
 * A reference to the Mapbox map instance.
 */
var map;

/**
 * Initializes a Mapbox map with the provided data.
 *
 * @param {Object} data - The data to be used for initializing the map.
 * @returns {Promise<string>} A promise that resolves to the string 'done' when the map is initialized.
 */
const initMapbox = async (data) => {

    /**
    * 1,
    * Initializes a Mapbox map with the provided configuration.
    */
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWRtZHgiLCJhIjoiY2pxd2h4ZXU0MTY3aDQ5b2N3emE5anFqcyJ9.GJttpB4tOo-X5lcQ9l2RiQ';
    map = new mapboxgl.Map({
        container: 'map',
        //  style: 'mapbox://styles/edmdx/clu1odozw004x01pcbohi1slq',
        projection: 'mercator',
        zoom: 0.5, // starting zoom
        center: [108, 4], // // starting center in [lng, lat]
    });

    /**
     * 2.
     * Listens for the 'load' event on the Mapbox map instance and calls the `mapLayers` 
     * function with the provided `data` parameter.
     *      * @param {Object} data - The data to be used for initializing the map layers.
     */
    map.on('load', () => {
        mapLayers(data);
    });

    return 'done';
};

/**
 * Adds a layer to the Mapbox map with data points displayed as circles.
 *
 * @param {GeoJSON} data - The GeoJSON data to be displayed on the map.
 * @returns {void}
 */
function mapLayers(data) {

    /**
     * 3.
     * Adds a GeoJSON data source to the Mapbox map.
     * @param {GeoJSON} data - The GeoJSON data to be used as the data source.
     * @returns {void}
     */
    map.addSource('pointsData', {
        type: 'geojson',
        data: data,
    });



    /**
     * 4.
     * Adds a layer to the Mapbox map that displays data points as circles.
     * @param {GeoJSON} data - The GeoJSON data to be displayed on the map.
     * @returns {void}
     */
    map.addLayer({
        id: 'points',
        type: 'circle',
        source: 'pointsData',
        paint: {
            'circle-radius': 4,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white',
        },
    });
}

