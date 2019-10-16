// From https://github.com/facebook/create-react-app/issues/1277#issuecomment-345516463

// @args: You can pass your worker parameters on initialisation
export default function DataGenerator(args) {
    var onmessage = function onmessage(e) {
        // eslint-disable-line no-unused-vars
        // Write your code here...
        var _e$data = e.data,
            type = _e$data.type,
            CORUM = _e$data.CORUM;
        switch(type){
            case 'uniprot_accessions':
                postMessage({
                    type: type,
                    data: CORUM
                        .map(e => e['subunits(UniProt IDs)'].split(';').map(accession => {return {search_item: accession.toLowerCase(), id: e['ComplexID']}}))
                        .reduce((current, previous) => previous.concat(current), [])
                });
                break;
            case 'gene_names':
                postMessage({
                    type: type,
                    data: CORUM
                        .map(e => e['subunits(Gene name)'].split(';').map(gene => {return {search_item: gene.toLowerCase(), id: e['ComplexID']}}))
                        .reduce((current, previous) => previous.concat(current), [])
                });
                break;
            case 'protein_names':
                postMessage({
                    type: type,
                    data: CORUM
                        .map(e => e['subunits(Protein name)'].split(';').map(protein_name => {return {search_item: protein_name.toLowerCase(), id: e['ComplexID']}}))
                        .reduce((current, previous) => previous.concat(current), [])
                });
                break;
            case 'funcat_descriptions':
                postMessage({
                    type: type,
                    data: CORUM
                        .filter(e => e['FunCat description'] !== null)
                        .map(e => e['FunCat description'].split(';').map(funcat_description => {return {search_item: funcat_description.toLowerCase(), id: e['ComplexID']}}))
                        .reduce((current, previous) => previous.concat(current), [])
                });
                break;
            case 'complex_name':
                postMessage({
                    type: type,
                    data: CORUM
                        .map(e => {return {search_item: e['ComplexName'].toLowerCase(), id: e['ComplexID']}})
                });
                break;
            case 'complex_comment':
                postMessage({
                    type: type,
                    data: CORUM
                        .filter(e => e['Complex comment'] !== null)
                        .map(e => {return {search_item: e['Complex comment'].toLowerCase(), id: e['ComplexID']}})
                });
                break;
        }
    };
}