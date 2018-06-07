import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl-context';
import map from 'lodash/map';
import { Avatar, Dropdown, Menu, Icon } from 'antd';
import Sider from 'react-sider';
import 'react-sider/lib/index.css';
import menuData from 'app/config/menu';
import { buildConfig } from 'app/config/buildConfig';
import appAction from 'app/action';
import getFirstChar from 'utils/getFirstChar';
import LoginChecker from 'hoc/LoginChecker';
import logo from 'assets/logo.svg';
import './BasicLayout.scss';

const { appName } = buildConfig;

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const defaultProps = {
  prefixCls: 'basicLayout',
  className: '',
};

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.menuData = this.formatMenuData(menuData);
  }

  formatMenuData = menu => (
    map(menu, (item) => {
      const result = {
        ...item,
        name: this.props.intl.formatMessage({ id: item.name }),
      };

      if (item.children) {
        result.children = this.formatMenuData(item.children);
      }

      return result;
    })
  );

  renderHeader = () => {
    const {
      logout,
      prefixCls,
      user,
      intl,
    } = this.props;

    const menu = (
      <Menu>
        <Menu.Item disabled className={`${prefixCls}-userMenuItem`}>
          <Icon type="user" className={`${prefixCls}-userMenuIcon`} />
          <span>{intl.formatMessage({ id: 'basicLayout_profile' })}</span>
        </Menu.Item>
        <Menu.Item disabled className={`${prefixCls}-userMenuItem`}>
          <Icon type="setting" className={`${prefixCls}-userMenuIcon`} />
          <span>{intl.formatMessage({ id: 'basicLayout_setting' })}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className={`${prefixCls}-userMenuItem`}>
          <div
            onClick={logout}
            role="presentation"
          >
            <Icon type="logout" className={`${prefixCls}-userMenuIcon`} />
            <span>{intl.formatMessage({ id: 'basicLayout_logout' })}</span>
          </div>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={`${prefixCls}-header`}>
        <Dropdown overlay={menu} placement="bottomRight">
          <div className={`${prefixCls}-avatar`}>
            <Avatar>
              {getFirstChar(user.name)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    );
  }

  renderFooter = () => (
    <div className={`${this.props.prefixCls}-footer`}>
      Copyright © 2018
    </div>
  )

  render() {
    const {
      prefixCls,
      className,
      isLogin,
      location,
      children,
    } = this.props;

    const classes = classnames({
      [prefixCls]: true,
      [className]: true,
    });

    return (
      <LoginChecker isLogin={isLogin}>
        <div className={classes}>
          <Sider
            appName={appName}
            appLogo={logo}
            menuData={this.menuData}
            pathname={location.pathname}
          />
          <div className={`${prefixCls}-content`}>
            {this.renderHeader()}
            <div className={`${prefixCls}-mainContent`}>
              {children}
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </LoginChecker>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.app.isLogin,
  user: state.app.user,
});

const mapDispatchToProps = {
  logout: appAction.logout,
};

BasicLayout.propTypes = propTypes;
BasicLayout.defaultProps = defaultProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(BasicLayout));
