/**
 * Initializes the Tableau API and retrieves data from the 'data' worksheet in the current dashboard.
 * @returns {Promise<Object[]>} An array of data objects, where each object represents a row of data 
 * from the 'data' worksheet.
 */
const initTableauAPI = async () => {

     /**
      * 1.
      * Initializes the Tableau API 
      */
     const workSheetDataAll = tableau.extensions.initializeAsync()
          .then(async function () {
               console.log('1. Tableau API initialized');
               /**
                * 2.
                * Gets the current dashboard object from the Tableau Extensions API.
                * @returns {Object} The current dashboard object.
                */
               const dashboard = tableau.extensions.dashboardContent.dashboard;
               console.log('2. dashboard: ', dashboard.name);

               /**
                * 3.
                * Gets the worksheets from the current dashboard object.
                * @returns {Object[]} An array of worksheet objects.
                */
               const worksheets = dashboard.worksheets;
               console.log('3. worksheets: ', worksheets.length);

               /**  
                * 4.   
                * Finds the worksheet named 'data' from the worksheets object.
                * @returns {Object} The worksheet object for the 'data' worksheet.
                */
               var worksheet = worksheets.find(function (sheet) {
                    return sheet.name === 'data';
               });
               console.log('4. worksheet: ', worksheet.name);

               /**
                * 5.
                * Gets a data reader for the 'data' worksheet in the current dashboard.
                * @returns {Promise<Object>} A data reader object that can be used to 
                * retrieve data from the 'data' worksheet.
                */
               const dataTableReader = await worksheet.getSummaryDataReaderAsync();
               console.table('5. getSummaryDataReaderAsync() Pages: ', dataTableReader.pageCount);

               // 6. Loop through pages returned by getSummaryDataReaderAsync and reformat.
               let rowData = [];
               try {
                    for (
                         let currentPage = 0;
                         currentPage < dataTableReader.pageCount;
                         currentPage++
                    ) {
                         console.log('6. Current page: ' + currentPage);
                         /**
                          * 6a.
                          * Gets gets the current page of data (based on loop number) 
                          * from the 'data' worksheet.
                          * @returns {Promise<Object>} A data page object containing the data 
                          * for the current page.
                          */
                         const dataTablePage = await dataTableReader.getPageAsync(currentPage);
                         console.log('6a currentPage rowcount: ', dataTablePage.data.length);

                         /**
                          * 6b.
                          * Maps the data from the current page of the 'data' worksheet 
                          * to an array of objects.
                          * Each object in the array represents a row of data from the worksheet, 
                          * with the column names as the object keys and the corresponding 
                          * cell values as the values.
                          * This function is called for each page of data returned by 
                          * the getSummaryDataReaderAsync
                          * method, and the resulting row data is accumulated in the rowData array.
                          */
                         dataTablePage.data.map((data) => {
                              let dataTableRow = {};
                              for (
                                   let i = 0;
                                   i < dataTablePage.columns.length;
                                   i++
                              ) {
                                   dataTableRow[
                                        dataTablePage.columns[i].fieldName
                                   ] = data[i].value;
                              }
                              rowData.push(dataTableRow);
                         });


                    }
               } catch (e) {
                    console.error(e);
               } finally {
                    // free up resources
                    await dataTableReader.releaseAsync();
                    return rowData;
               }
          });

     return workSheetDataAll;
};
