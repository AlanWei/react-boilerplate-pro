import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Avatar, Dropdown, Menu } from 'antd';
import Sider from 'react-sider';
import 'react-sider/lib/index.css';
import menuData from 'app/config/menu';
import { buildConfig } from 'app/config/buildConfig';
import appAction from 'app/action';
import getFirstChar from 'utils/getFirstChar';
import logo from 'assets/logo.svg';
import './BasicLayout.scss';

const { appName } = buildConfig;

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const defaultProps = {
  prefixCls: 'basicLayout',
  className: '',
};

class BasicLayout extends Component {
  renderHeader = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <div
            onClick={this.props.logout}
            role="presentation"
          >
            Logout
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="globalHeader">
        <Dropdown overlay={menu} placement="bottomRight">
          <div className="globalHeader-avatar">
            <Avatar>
              {getFirstChar(this.props.user.name)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    );
  }

  renderFooter = () => (
    <div className="globalFooter">
      Copyright © 2018
    </div>
  )

  render() {
    const classes = classnames({
      [this.props.prefixCls]: true,
      [this.props.className]: true,
    });
    return (
      <div className={classes}>
        <Sider
          appName={appName}
          appLogo={logo}
          menuData={menuData}
          pathname={this.props.location.pathname}
        />
        <div className="content">
          {this.renderHeader()}
          <div className="mainContent">
            {this.props.children}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
});

const mapDispatchToProps = {
  logout: appAction.logout,
};

BasicLayout.propTypes = propTypes;
BasicLayout.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
