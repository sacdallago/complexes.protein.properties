// From https://github.com/facebook/create-react-app/issues/1277#issuecomment-345516463

// @args: You can pass your worker parameters on initialisation
export default function Finder(args) {
    var onmessage = function onmessage(e) {
        const {data, query} = e.data;

        const filterQuery = (query, search_array) => {
            query = query.toLowerCase();

            return search_array
                .map(element => {
                    element['match'] = element.search_item.indexOf(query);
                    return element
                })
                .filter(element => element.match > -1);
        };

        postMessage({
            query: query,
            accession_matches: filterQuery(query, data.uniprot_accessions),
            protein_name_matches: filterQuery(query, data.protein_names),
            gene_matches: filterQuery(query, data.gene_names),
            complex_matches: [...filterQuery(query, data.complex_name), ...filterQuery(query, data.complex_comment)],
            funcat_matches: filterQuery(query, data.funcat_descriptions)
        })
    }
}