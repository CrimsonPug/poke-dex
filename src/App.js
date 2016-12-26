import React, { Component } from 'react';
import pokeBall from './../public/pokeball.svg';
// import imgFolder from './../public/pokeImage/';
import axios from 'axios';
import './App.css';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';




class App extends Component {
  constructor(){
    super();
    this.state = {
      data: []
    }
  }
  componentWillMount(){
    axios
    .get('http://localhost:8080/pokemon')
    .then(res=>{
      console.log(res.data);
      this.setState({
        data:res.data
      })
    })
  }
  render() {
    const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 1000,
      height: 450,
      overflowY: 'auto',
    },
  };
  let data = this.state.data;
    return (
      <div className="App">
        <div className="App-header">
          <img src={pokeBall} className="App-logo" alt="logo" />
          <h2>Your PokeDex</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            >
              {data.map(pokemon=>{
          return (
            <GridTile
                title={pokemon.name}
                subtitle={<span>by <b>{pokemon.url}</b></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={require('./../public/pokeImage/'+ pokemon.imageId+'.png')} />
              </GridTile>          
          )
        })}
          </GridList>
        </div>
      </div>
    );
  }
}

export default App;





