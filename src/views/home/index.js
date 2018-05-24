import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl-context';
import action from './action';
import './index.scss';

const propTypes = {
  message: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.getMessage();
  }

  render() {
    return (
      <div className="view-home">
        <p>{this.props.message}</p>
        <p>{this.props.intl.formatMessage({ id: 'test' })}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.home.message,
});

const mapDispatchToProps = {
  getMessage: action.getMessage,
};

Home.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Home));
