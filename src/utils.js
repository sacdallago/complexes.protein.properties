import CORUM from './data/allComplexes';

const uniprot_accessions = CORUM
    .map(e => e['subunits(UniProt IDs)'].split(';').map(accession => {return {search_item: accession.toLowerCase(), id: e['ComplexID']}}))
    .reduce((current, previous) => previous.concat(current), []);

const gene_names = CORUM
    .map(e => e['subunits(Gene name)'].split(';').map(gene => {return {search_item: gene.toLowerCase(), id: e['ComplexID']}}))
    .reduce((current, previous) => previous.concat(current), []);

const complex_name = CORUM
    .map(e => {return {search_item: e['ComplexName'].toLowerCase(), id: e['ComplexID']}});

const complex_comment = CORUM
    .filter(e => e['Complex comment'] !== null)
    .map(e => {return {search_item: e['Complex comment'].toLowerCase(), id: e['ComplexID']}});

const protein_names = CORUM
    .map(e => e['subunits(Protein name)'].split(';').map(protein_name => {return {search_item: protein_name.toLowerCase(), id: e['ComplexID']}}))
    .reduce((current, previous) => previous.concat(current), []);

const funcat_descriptions = CORUM
    .filter(e => e['FunCat description'] !== null)
    .map(e => e['FunCat description'].split(';').map(funcat_description => {return {search_item: funcat_description.toLowerCase(), id: e['ComplexID']}}))
    .reduce((current, previous) => previous.concat(current), []);

const filterQuery = (query, search_array) => {
    query = query.toLowerCase();

    return search_array
        .map(element => {return {...element, match: element.search_item.indexOf(query)}})
        .filter(element => element.match > -1);
};

export const assessQuery = (query) => {
    return {
        query: query,
        accession_matches: filterQuery(query, uniprot_accessions),
        protein_name_matches: filterQuery(query, protein_names),
        gene_matches: filterQuery(query, gene_names),
        complex_matches: [...filterQuery(query, complex_name), ...filterQuery(query, complex_comment)],
        funcat_matches: filterQuery(query, funcat_descriptions)
    };
};