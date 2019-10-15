import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CORUM from './data/allComplexes';
import {Typography, Grid, Paper} from "@material-ui/core";

const styles = theme => ({
    root: {
        overflowX: 'auto',
        padding: theme.spacing(1)
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
    render() {
        const { classes } = this.props;

        let hit = CORUM[0];

        return (
            <Paper className={classes.root}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant={"body1"}>
                            <strong>
                                {hit['ComplexName']}
                            </strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant={"caption"}>
                            {hit['Complex comment']}
                        </Typography>
                    </Grid>
                </Grid>
                <hr />
                <Grid container>
                    <Grid item xs={2}>
                        <Typography variant={"caption"}>
                            Corum ID: {hit['ComplexID']}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant={"caption"}>
                            Subunits: {hit['subunits(UniProt IDs)'].split(';').length}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant={"caption"}>
                            Query match:
                            <strong>
                                ...{"some string"}...
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

LocationTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default withStyles(styles)(LocationTable);