import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResultsTable from './ResultsTable';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import {assessQuery} from './utils';

const styles = theme => ({
    attribution: {
        textAlign: "center",
        marginTop: theme.spacing(2)
    },
    root: {
        maxWidth: 1100,
        margin: "auto",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

    },
    search: {
        width: "100%"
    },
    textField: {
        width: "100%",
        textAlign: "center"
    }
});

class App extends React.Component {
    state = {
        query: '',
        accession_matches: null,
        protein_name_matches: null,
        gene_matches: null,
        complex_matches: null,
        funcat_matches: null
    };

    filterResults = () => {
        let {
            accession_matches,
            protein_name_matches,
            gene_matches,
            complex_matches,
            funcat_matches
        } = assessQuery(this.state.query);

        console.log(accession_matches);

        this.setState({
            accession_matches,
            protein_name_matches,
            gene_matches,
            complex_matches,
            funcat_matches
        });
    };

    onInputChange = (query) => {
        this.setState({query: query.target.value}, this.filterResults);
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={3} />
                <Grid item className={classes.search} xs={6}>
                    <TextField
                        id="query"
                        className={classes.textField}
                        value={this.state.query}
                        onChange={this.onInputChange}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={false} md={2} xl={2} />
                <Grid item className={classes.search} xs={12} md={8} xl={8}>
                    {this.state.accession_matches && <ResultsTable data={this.state.accession_matches} />}
                </Grid>
                <Grid item xs={false} md={2} xl={2} />
                <Grid item className={classes.search} xs={12}>
                    <Typography variant={"caption"} className={classes.attribution}>
                        Made by <a rel="noopener noreferrer" href="https://christian.dallago.us" target="_blank">Christian Dallago</a>.
                    </Typography>
                </Grid>
                <Grid item className={classes.search} xs={12}>
                    <Typography variant={"caption"} className={classes.attribution}>
                        This webpage is an interface to <a rel="noopener noreferrer" href="https://mips.helmholtz-muenchen.de/corum/" target="_blank">CORUM</a>. Please, cite CORUM when using any of this data for your work.
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);