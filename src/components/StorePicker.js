import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    // go from '/' to '/store/:storeId'
    this.context.router.transitionTo(`/store/${this.storeInput.value}`);

  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

// Importamo router iz index.js da mozemo radit routing
// go from '/' to '/store/:storeId'
// this.context.router.transitionTo(`/store/${this.storeInput.value}`);
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
