import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Sider from 'react-sider';
import 'react-sider/lib/index.css';
import logo from 'assets/logo.svg';
import './BasicLayout.scss';

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
  appName: PropTypes.string,
  menuData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.array,
  })),
};

const defaultProps = {
  prefixCls: 'basicLayout',
  className: '',
  appName: '',
  menuData: [],
};

class BasicLayout extends Component {
  render() {
    const classes = classnames({
      [this.props.prefixCls]: true,
      [this.props.className]: true,
    });
    return (
      <div className={classes}>
        <Sider
          appName={this.props.appName}
          appLogo={logo}
          menuData={this.props.menuData}
          pathname={this.props.location.pathname}
        />
        <div className="content">
          <div className="globalHeader">Header</div>
          <div className="mainContent">
            {this.props.children}
          </div>
          <div className="globalFooter">Footer</div>
        </div>
      </div>
    );
  }
}

BasicLayout.propTypes = propTypes;
BasicLayout.defaultProps = defaultProps;
export default BasicLayout;
