/*
 * Copyright (c) 2023 Alexis LEBEL @ Poclain Hydraulics Industrie
 * Minify Export
 * This file contains utility functions to minify the export, so it is ingestible by the API
 * parsing the graph to pseudo-ASM
 */

function minify(exportedData, listNodes) {
    exportedData = exportedData.drawflow.Home.data;
    for (let key in exportedData) {
        // adding block_type information to the nodes 
        for (let key2 in listNodes) {
            if (exportedData[key].name == listNodes[key2].item) {
                exportedData[key].block_type = listNodes[key2].block_type;
            }
        }

        if('name' in exportedData[key].data) {
            exportedData[key].data = exportedData[key].data.data;
        }

        // removing useless information
        delete exportedData[key].id;
        delete exportedData[key].class;
        delete exportedData[key].html;
        delete exportedData[key].inputs;
        delete exportedData[key].name;
        delete exportedData[key].pos_x;
        delete exportedData[key].pos_y;
        delete exportedData[key].typenode;

        // renaming the output key
        let outputs = exportedData[key].outputs;
        exportedData[key].outputs = [];
        for (let key2 in outputs) {
            for (let key3 in outputs[key2].connections)
                exportedData[key].outputs.push(outputs[key2].connections[key3]);
        }
    }

    return exportedData;

}

export default { minify };