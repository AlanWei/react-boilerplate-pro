import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl-context';
import { Card, Tag, Button } from 'antd';
import map from 'lodash/map';
import appAction from 'app/action';
import action from './action';
import './index.scss';

const propTypes = {
  match: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  outlet: PropTypes.object.isRequired,
  getOutlet: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired,
};

class OutletDetail extends Component {
  componentDidMount() {
    const { getOutlet, match } = this.props;
    getOutlet(match.params.id);
  }

  render() {
    const { outlet, updateNotification, intl } = this.props;

    return (
      <div className="view-outletDetail">
        <Card>
          <div className="view-outletDetail-title">
            {outlet.name}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">
              {intl.formatMessage({ id: 'outletDetail_description' })}
            </span>
            {outlet.description}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">
              {intl.formatMessage({ id: 'outletDetail_hours' })}
            </span>
            {outlet.hours}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">
              {intl.formatMessage({ id: 'outletDetail_phone' })}
            </span>
            {outlet.phone}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">
              {intl.formatMessage({ id: 'outletDetail_categories' })}
            </span>
            {map(outlet.categories, (item, idx) => (
              <Tag key={idx}>
                {item}
              </Tag>
            ))}
          </div>
        </Card>
        <Button
          className="view-outletDetail-notificationBtn"
          type="primary"
          onClick={() => updateNotification({
            title: intl.formatMessage({ id: 'outletDetail_notificationTitle' }),
            content: intl.formatMessage({ id: 'outletDetail_notificationContent' }, { seconds: '4.5' }),
          })}
        >
          {intl.formatMessage({ id: 'outletDetail_showNotification' })}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  outlet: state.outletDetail.outlet,
});

const mapDispatchToProps = ({
  getOutlet: action.getOutlet,
  updateNotification: appAction.updateNotification,
});

OutletDetail.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OutletDetail));
