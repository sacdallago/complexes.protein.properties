import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import Result from "./Result";

const styles = theme => ({

});

class LocationTable extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={2} className={classes.root}>
                {this.props.data.splice(0,3).map(e =>
                    <Grid key={e.match + e.search_item + e.id} item xs={12}>
                        <Result index={e.id} hit={e}/>
                    </Grid>
                )}
            </Grid>
        );
    }
}

LocationTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default withStyles(styles)(LocationTable);