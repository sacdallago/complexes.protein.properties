// From https://github.com/facebook/create-react-app/issues/1277#issuecomment-345516463

export default class WebWorker {
    constructor(worker) {
        // let code = worker.toString();
        // code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
        //
        // // When updating the code in the worker, uncomment the following to make sure the worker... works...
        // console.log(code);

        let code = '';

        switch (worker) {
            case 'DataGenerator':
                code = `
  var onmessage = function onmessage(e) {
    // eslint-disable-line no-unused-vars
    // Write your code here...
    var _e$data = e.data,
        type = _e$data.type,
        CORUM = _e$data.CORUM;

    switch (type) {
      case 'uniprot_accessions':
        postMessage({
          type: type,
          data: CORUM.map(e => e['subunits(UniProt IDs)'].split(';').map(accession => {
            return {
              search_item: accession.toLowerCase(),
              id: e['ComplexID']
            };
          })).reduce((current, previous) => previous.concat(current), [])
        });
        break;

      case 'gene_names':
        postMessage({
          type: type,
          data: CORUM.map(e => e['subunits(Gene name)'].split(';').map(gene => {
            return {
              search_item: gene.toLowerCase(),
              id: e['ComplexID']
            };
          })).reduce((current, previous) => previous.concat(current), [])
        });
        break;

      case 'protein_names':
        postMessage({
          type: type,
          data: CORUM.map(e => e['subunits(Protein name)'].split(';').map(protein_name => {
            return {
              search_item: protein_name.toLowerCase(),
              id: e['ComplexID']
            };
          })).reduce((current, previous) => previous.concat(current), [])
        });
        break;

      case 'funcat_descriptions':
        postMessage({
          type: type,
          data: CORUM.filter(e => e['FunCat description'] !== null).map(e => e['FunCat description'].split(';').map(funcat_description => {
            return {
              search_item: funcat_description.toLowerCase(),
              id: e['ComplexID']
            };
          })).reduce((current, previous) => previous.concat(current), [])
        });
        break;

      case 'complex_name':
        postMessage({
          type: type,
          data: CORUM.map(e => {
            return {
              search_item: e['ComplexName'].toLowerCase(),
              id: e['ComplexID']
            };
          })
        });
        break;

      case 'complex_comment':
        postMessage({
          type: type,
          data: CORUM.filter(e => e['Complex comment'] !== null).map(e => {
            return {
              search_item: e['Complex comment'].toLowerCase(),
              id: e['ComplexID']
            };
          })
        });
        break;
    }
  };
                `;
                break;
            case 'Finder':
                code = `
var onmessage = function onmessage(e) {
    const _e$data = e.data,
          data = _e$data.data,
          query = _e$data.query;

    const filterQuery = (query, search_array) => {
      query = query.toLowerCase();
      return search_array.map(element => {
        element['match'] = element.search_item.indexOf(query);
        return element;
      }).filter(element => element.match > -1);
    };

    postMessage({
      query: query,
      accession_matches: filterQuery(query, data.uniprot_accessions),
      protein_name_matches: filterQuery(query, data.protein_names),
      gene_matches: filterQuery(query, data.gene_names),
      complex_matches: [...filterQuery(query, data.complex_name), ...filterQuery(query, data.complex_comment)],
      funcat_matches: filterQuery(query, data.funcat_descriptions)
    });
  };
                `;
                break;
            default:
        }

        const blob = new Blob([code], { type: "application/javascript" });
        return new Worker(URL.createObjectURL(blob));
    }
}