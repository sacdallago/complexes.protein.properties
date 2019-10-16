import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Typography, Grid, Paper} from "@material-ui/core";
import CORUM from './data/allComplexes';
import OpenInNew from '@material-ui/icons/OpenInNew';

const styles = theme => ({
    root: {
        padding: theme.spacing(1)
    },
    smallIcon: {
        fontSize: "1em"
    }
});

class Result extends React.Component {
    state = {
        currentComplex: CORUM.find(e => e['ComplexID'] === this.props.index)
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            currentComplex: CORUM.find(e => e['ComplexID'] === newProps.index)
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant={"body1"}>
                                {this.state.currentComplex['ComplexName']}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant={"caption"}>
                            {this.state.currentComplex['Complex comment']}
                        </Typography>
                    </Grid>
                </Grid>
                <hr />
                <Grid container>
                    <Grid item xs={2}>
                        <Typography variant={"caption"}>
                            ID: {this.state.currentComplex['ComplexID']}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant={"caption"}>
                            Subunits: {this.state.currentComplex['subunits(UniProt IDs)'].split(';').length}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant={"caption"}>
                            {this.state.currentComplex['Organism']}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant={"caption"}>
                            Query match:
                            <strong>
                                ...{this.props.hit.search_item.substr(this.props.hit.match, 5)}...
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={8} />
                    <Grid item xs={2}>
                        <a
                            href={this.state.currentComplex['subunits(UniProt IDs)'].split(';').reduce((previous, current) => previous + '&p=' + current,'https://cellmap.protein.properties/ppi?')}
                            target={"_blank"}
                        >
                            <Typography variant={"caption"}>
                                CellMap
                            </Typography>
                            <OpenInNew className={classes.smallIcon} />
                        </a>
                    </Grid>
                    <Grid item xs={2}>
                        <a
                            href={"https://protein.melting.degree/complex?id=" + this.state.currentComplex['ComplexID']}
                            target={"_blank"}
                        >
                            <Typography variant={"caption"}>
                                PMDB
                            </Typography>
                            <OpenInNew className={classes.smallIcon} />
                        </a>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

Result.propTypes = {
    classes: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    hit: PropTypes.object.isRequired
};

export default withStyles(styles)(Result);