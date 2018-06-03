import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl-context';
import { Avatar, Dropdown, Menu, Icon } from 'antd';
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
  logout: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const defaultProps = {
  prefixCls: 'basicLayout',
  className: '',
};

class BasicLayout extends Component {
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
      location,
      children,
    } = this.props;

    const classes = classnames({
      [prefixCls]: true,
      [className]: true,
    });

    return (
      <div className={classes}>
        <Sider
          appName={appName}
          appLogo={logo}
          menuData={menuData}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(BasicLayout));
