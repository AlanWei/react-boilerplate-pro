import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl-context';
import { Button } from 'antd';
import './index.scss';

const propTypes = {
  intl: PropTypes.object.isRequired,
};

class NotFound extends Component {
  render() {
    const { intl } = this.props;

    return (
      <div className="view-notFound">
        <div className="view-notFound-errorCode">
          404
        </div>
        <div className="view-notFound-errorDesc">
          {intl.formatMessage({ id: 'notFound_404' })}
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

NotFound.propTypes = propTypes;
export default injectIntl(NotFound);
