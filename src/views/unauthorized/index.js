import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl-context';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './index.scss';

const propTypes = {
  intl: PropTypes.object.isRequired,
};

class Unauthorized extends Component {
  render() {
    const { intl } = this.props;

    return (
      <div className="view-unauthorized">
        <div className="view-unauthorized-errorCode">
          403
        </div>
        <div className="view-unauthorized-errorDesc">
          {intl.formatMessage({ id: 'unauthorized_403' })}
        </div>
        <Link to="/" href="/">
          <Button type="primary">
            {intl.formatMessage({ id: 'exception_backToHome' })}
          </Button>
        </Link>
      </div>
    );
  }
}

Unauthorized.propTypes = propTypes;
export default injectIntl(Unauthorized);
