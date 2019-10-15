import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    root: {
        overflowX: 'auto',
        textAlign: "center",
        paddingBottom: theme.spacing(1)
    },
    underline: {
        textDecoration: "underline",
        cursor: "pointer"
    },
    title: {
        paddingTop: theme.spacing(1)
    },
    topSpace: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1)

    }
});

class LocationTable extends React.Component {

    state = {
        result: [],
        loading: false
    };

    componentWillReceiveProps(newProps){
        this.props = newProps;

        let {ready, query} = newProps.data;

        if(ready){
            this.onQueryChange(query)
        }
    }

    onQueryChange = (query) => {
        this.setState({
            loading: true
        }, () => {
            fetch("https://protein-locations.herokuapp.com/?q=" + query)
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        result: json,
                        loading: false
                    })
                })
                .catch(e => {
                    console.error(e);
                    this.setState({
                        loading: false
                    })
                })
            ;
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">UniProt Accession</TableCell>
                            <TableCell align="center">Evidence</TableCell>
                            <TableCell align="center">Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.result.map(row => (
                            <TableRow key={row.accession + row.location + row.evidence}>
                                <TableCell component="th" scope="row">
                                    <a href={"https://www.uniprot.org/uniprot/"+row.accession} target={"_blank"} rel="noopener noreferrer">{row.accession}</a>
                                </TableCell>
                                <TableCell align="center"><a href={"https://www.ebi.ac.uk/QuickGO/term/"+row.evidence} target={"_blank"} rel="noopener noreferrer">{row.evidence}</a></TableCell>
                                <TableCell align="center"><a href={"https://www.uniprot.org/locations/?limit=4&sort=score&query="+row.location} target={"_blank"} rel="noopener noreferrer">{row.location}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

LocationTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationTable);