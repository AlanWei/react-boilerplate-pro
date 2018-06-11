import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'antd';
import map from 'lodash/map';
import action from './action';
import './index.scss';

const { Meta } = Card;

const propTypes = {
  outlets: PropTypes.array.isRequired,
  getOutlets: PropTypes.func.isRequired,
};

class Outlets extends Component {
  componentDidMount() {
    this.props.getOutlets();
  }

  renderOutlets = () => (
    <div className="view-outlets-outlets">
      {map(this.props.outlets, (outlet) => {
        const link = `/outlets/${outlet.id}`;
        const actions = [
          <Link href={link} to={link}><Icon type="setting" /></Link>,
          <Link href={link} to={link}><Icon type="edit" /></Link>,
          <Link href={link} to={link}><Icon type="ellipsis" /></Link>,
        ];
        return (
          <Card
            cover={<img alt="" src={outlet.imgSrc} />}
            actions={actions}
            key={outlet.id}
            className="view-outlets-outlets-item"
          >
            <Meta
              title={outlet.name}
              description={outlet.description}
            />
          </Card>
        );
      })}
    </div>
  )

  render() {
    return (
      <div className="view-outlets">
        {this.renderOutlets()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  outlets: state.outlets.outlets,
});

const mapDispatchToProps = ({
  getOutlets: action.getOutlets,
});

Outlets.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Outlets);
