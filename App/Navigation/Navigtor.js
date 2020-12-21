import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigator from './AppNavigation';

class Nav extends Component {
  render() {
    return <Navigator uriPrefix={'hectar://'} {...this.props} />;
  }
}

export default connect(null)(Nav);
