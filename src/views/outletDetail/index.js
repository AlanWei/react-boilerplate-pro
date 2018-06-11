import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl-context';
import { Card, Tag } from 'antd';
import map from 'lodash/map';
import action from './action';
import './index.scss';

const propTypes = {
  match: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  outlet: PropTypes.object.isRequired,
  getOutlet: PropTypes.func.isRequired,
};

class OutletDetail extends Component {
  componentDidMount() {
    this.props.getOutlet(this.props.match.params.id);
  }

  render() {
    const { outlet, intl } = this.props;

    return (
      <div className="view-outletDetail">
        <Card>
          <div className="view-outletDetail-title">{outlet.name}</div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">{intl.formatMessage({ id: 'outletDetail_description' })}</span>{outlet.description}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">{intl.formatMessage({ id: 'outletDetail_hours' })}</span>{outlet.hours}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">{intl.formatMessage({ id: 'outletDetail_phone' })}</span>{outlet.phone}
          </div>
          <div className="view-outletDetail-info">
            <span className="view-outletDetail-label">{intl.formatMessage({ id: 'outletDetail_categories' })}</span>
            {map(outlet.categories, (item, idx) => (
              <Tag key={idx}>{item}</Tag>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  outlet: state.outletDetail.outlet,
});

const mapDispatchToProps = ({
  getOutlet: action.getOutlet,
});

OutletDetail.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OutletDetail));
