import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResultsTable from './ResultsTable';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  attribution: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  },
  root: {
    maxWidth: 1100,
    margin: "auto",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
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
    valid: true,
    ready: false
  };

  timeout = null;

  onQueryChange = (query) => {
    if(uniprotRegex.test(query)){
      this.setState({
        valid: true,
        ready: true
      });
    } else {
      this.setState({
        valid: false,
      })
    }
  };

  onInputChange = (event) => {
    let value = event.target.value;

    if(uniprotRegex.test(value)){
      this.setState({
        query: value,
        ready: false
      });
      window.clearTimeout(this.timeout);
      this.onQueryChange(value)
    } else {
      this.setState({
        query: value,
        ready: false
      });

      window.clearTimeout(this.timeout);
      this.timeout = setTimeout(()=>{
        this.onQueryChange(value)
      }, 1000);
    }
  };

  render() {
    const { classes } = this.props;

    return (
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={3} />
          <Grid item className={classes.search} xs={6}>
            <TextField
                id="query"
                label="UniProt Accession"
                className={classes.textField}
                value={this.state.query}
                onChange={this.onInputChange}
                margin="normal"
                variant="outlined"
                error={!this.state.valid}
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={false} md={2} xl={2} />
          <Grid item className={classes.search} xs={12} md={8} xl={8}>
            <ResultsTable data={this.state} />
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