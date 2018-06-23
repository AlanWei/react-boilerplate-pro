import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl-context';
import { Link } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import get from 'lodash/get';
import map from 'lodash/map';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import { Avatar, Dropdown, Menu, Icon, Breadcrumb, Popover } from 'antd';
import Sider from 'react-sider';
import 'react-sider/lib/index.css';
import menuData from 'app/config/menu';
import { combineRoutes } from 'app/config/routes';
import appAction from 'app/action';
import getFirstChar from 'utils/getFirstChar';
import generateBreadcrumb from 'utils/generateBreadcrumb';
import LoginChecker from 'hoc/LoginChecker';
import Notification from 'components/notification';
import logo from 'assets/logo.svg';
import './BasicLayout.scss';

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  notices: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  deleteNotice: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  resetNotification: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
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
      notices,
      deleteNotice,
      intl,
    } = this.props;

    const noticeMenu = isEmpty(notices) ? (
      <div className={`${prefixCls}-noticeEmpty`}>
        {intl.formatMessage({ id: 'basicLayout_readall_notice' })}
      </div>
    )
      :
      map(notices, notice => (
        <div
          key={notice.id}
          className={`${prefixCls}-noticeItem`}
          onClick={() => deleteNotice(notice.id)}
          role="presentation"
        >
          <div className={`${prefixCls}-noticeTitle`}>{notice.title}</div>
          <div className={`${prefixCls}-noticeMessage`}>{notice.message}</div>
        </div>
      ));

    const userMenu = (
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
        <div className={`${prefixCls}-notice`}>
          <Popover
            placement="bottomRight"
            arrowPointAtCenter
            trigger="click"
            content={noticeMenu}
          >
            <Icon className={`${prefixCls}-noticeIcon`} type="bell" />
          </Popover>
        </div>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className={`${prefixCls}-avatarContainer`}>
            <Avatar className={`${prefixCls}-avatar`}>
              {getFirstChar(user.name)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    );
  }

  renderBreadcrumb = () => {
    const { route: { breadcrumb }, intl, prefixCls } = this.props;
    const breadcrumbData = generateBreadcrumb(breadcrumb);

    return (
      <Breadcrumb className={`${prefixCls}-breadcrumb`}>
        {map(breadcrumbData, (item, idx) => (
          idx === breadcrumbData.length - 1 ?
            <Breadcrumb.Item key={item.href}>
              {intl.formatMessage({ id: item.text })}
            </Breadcrumb.Item>
            :
            <Breadcrumb.Item key={item.href}>
              <Link href={item.href} to={item.href}>
                {intl.formatMessage({ id: item.text })}
              </Link>
            </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }

  renderPageHeader = () => {
    const { prefixCls, route: { pageTitle }, intl } = this.props;

    if (isEmpty(pageTitle)) {
      return null;
    }

    const pageTitleStr = intl.formatMessage({ id: pageTitle });
    return (
      <div className={`${prefixCls}-pageHeader`}>
        {this.renderBreadcrumb()}
        <div className={`${prefixCls}-pageTitle`}>{pageTitleStr}</div>
      </div>
    );
  }

  renderFooter = () => (
    <div className={`${this.props.prefixCls}-footer`}>
      Copyright © 2018
    </div>
  )

  renderNotification = () => {
    const { notification: { title, content }, resetNotification } = this.props;
    if (isEmpty(title) && isEmpty(content)) {
      return null;
    }
    return (
      <Notification title={title} content={content} onDismiss={resetNotification} />
    );
  }

  render() {
    const {
      prefixCls,
      className,
      intl,
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
            appName={intl.formatMessage({ id: 'appName' })}
            appLogo={logo}
            menuData={this.menuData}
            pathname={location.pathname}
          />
          <div className={`${prefixCls}-content`}>
            {this.renderHeader()}
            {this.renderPageHeader()}
            <div className={`${prefixCls}-mainContent`}>
              {children}
            </div>
            {this.renderFooter()}
          </div>
        </div>
        {this.renderNotification()}
      </LoginChecker>
    );
  }
}

const mapStateToProps = (state) => {
  const pathname = get(state, 'router.location.pathname', '');
  const { route } = head((matchRoutes(combineRoutes, pathname)));
  return {
    isLogin: state.app.isLogin,
    user: state.app.user,
    route,
    notices: state.app.notices,
    notification: state.app.notification,
  };
};

const mapDispatchToProps = {
  logout: appAction.logout,
  deleteNotice: appAction.deleteNotice,
  resetNotification: appAction.resetNotification,
};

BasicLayout.propTypes = propTypes;
BasicLayout.defaultProps = defaultProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(BasicLayout));
