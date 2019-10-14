import CORUM from 'data/allComplexes';

const uniprot_accessions = CORUM
    .map(e => e['subunits(UniProt IDs)'].split(';').map(accession => {return {accession: accession, id: e['ComplexID']}}))
    .reduce((current, previous) => previous.concat(current), []);

const gene_names = CORUM
    .map(e => e['subunits(Gene name)'].split(';').map(gene => {return {gene: gene, id: e['ComplexID']}}))
    .reduce((current, previous) => previous.concat(current), []);

const uniprotRegex = /^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/;

export const queryType = {
    'uniprot_accession' : 1,
    'corum_id': 2,
    'other': 3,
};

export const assessQuery = (query) => {
  let result = {
      query: query,
      type: queryType.other
  };

  // Check if uniprot_accession

  return result
};