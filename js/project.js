
// ('use strict');


/**
 * Initializes the project by fetching Tableau data, converting it to GeoJSON format, and initializing the Mapbox map.
 */
async function initProject() {
  const tableauData = await initTableauAPI();
  const geoJsonFormatedData = await createPointJSON(tableauData);
  initMapbox(geoJsonFormatedData);
}

/**
 * Creates a GeoJSON feature collection from the provided Tableau data.
 *
 * @param {Object[]} tData - An array of Tableau data objects, where each object represents a row in the Tableau data.
 * @param {string} tData[].Longitude - The longitude value for the current data row.
 * @param {string} tData[].Latitude - The latitude value for the current data row.
 * @param {string} tData[].['Store Number'] - The store number value for the current data row.
 * @param {string} tData[].['City'] - The city value for the current data row.
 * @returns {FeatureCollection} A GeoJSON feature collection containing the points from the Tableau data.
 */
const createPointJSON = async (tData) => {
     var points = [];

     tData.forEach(function (row) {
          points.push(
               turf.point(
                    [parseFloat(row['Longitude']), parseFloat(row['Latitude'])],
                    {
                         id: row['Store Number'],
                         htmltip: row['City'],
                         color: 'red',
                    }
               )
          );
     });

     collection = turf.featureCollection(points);
     return collection;
}




initProject();
