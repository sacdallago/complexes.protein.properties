import CORUM from './data/allComplexes';
import WebWorker from './WebWorker';
import DataGenerator from './DataGenerator';
import Finder from "./Finder";

const dataGenerator = new WebWorker(DataGenerator);

let data = {
    'uniprot_accessions':[],
    'gene_names':[],
    'complex_name':[],
    'complex_comment':[],
    'protein_names':[],
    'funcat_descriptions':[]
};

const _handleDataGenerator = (event) => {
    const message = event.data;
    const type = message.type;

    data[type] = message.data;
};

dataGenerator.addEventListener("message", _handleDataGenerator, false);

Object.keys(data).forEach(e => dataGenerator.postMessage({
    type: e,
    CORUM: CORUM
}));

const finder = new WebWorker(Finder);

export const subscribeToFinerWoker = (callback) => {
    finder.addEventListener("message", callback, false);
};

export const assessQuery = (query) => {
    finder.postMessage({
        data: data,
        query: query
    });

    return {
        query: query,
        accession_matches: [],
        protein_name_matches: [],
        gene_matches: [],
        complex_matches: [],
        funcat_matches: []
    }
};