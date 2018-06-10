import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const propTypes = {
  isLogin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

class LoginChecker extends Component {
  componentDidMount() {
    if (!this.props.isLogin) {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate() {
    if (!this.props.isLogin) {
      this.props.history.push('/login');
    }
  }

  render() {
    return this.props.children;
  }
}

LoginChecker.propTypes = propTypes;
export default withRouter(LoginChecker);
