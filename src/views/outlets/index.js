import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
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
    const { getOutlets } = this.props;
    getOutlets();
  }

  renderOutlets = () => {
    const { outlets } = this.props;
    return (
      <div className="view-outlets-outlets">
        {map(outlets, (outlet) => {
          const link = `/outlets/${outlet.id}`;
          return (
            <Link
              href={link}
              to={link}
              key={outlet.id}
              className="view-outlets-outlets-item"
            >
              <Card cover={<img alt="" src={outlet.imgSrc} />}>
                <Meta
                  title={outlet.name}
                  description={outlet.description}
                />
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }

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
