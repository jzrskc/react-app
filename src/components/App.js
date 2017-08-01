import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish'
import sampleFishes from '../sample-fishes';
import base from '../base'

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // initial Stare
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // Firebase
  // fishes state ce viti snimljen u Firebase, a order u localStorage
  // this.props.params.storeId = url params iz react-router = ugliest-magnificent-potatoes
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      // update order state
      this.setState({order: JSON.parse(localStorageRef)});
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // localStorage
  componentWillUpdate(nextProps, nextState) {
    // console.log('Something Changed');
    // console.log({nextProps, nextState});
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));

  }

  addFish(fish) {
    // update our state, get just fishes from state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({fishes: fishes});
  }

  loadSamples() {
    this.setState({fishes: sampleFishes});
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] +1 || 1;
    // update our state
    this.setState({order: order});
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes: fishes});
  }

  // Delete Fish and from Order
  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null; // delete fishes[key] - ovo ne radi zbog Firebase
    this.setState({fishes: fishes})
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order: order})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />

        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;
