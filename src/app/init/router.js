import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { IntlProvider } from 'react-intl-context';
import { connect } from 'react-redux';
import AclRouter from 'react-acl-router';
import BasicLayout from 'layouts/BasicLayout';
import NormalLayout from 'layouts/NormalLayout';
import { messages, buildConfig } from '../config/buildConfig';
import menuData from '../config/menu';
import { authorizedRoutes, unAuthorizedRoutes } from '../config/routes';

const { locale, appName } = buildConfig;

const BasicLayoutWrapper = props => (
  <BasicLayout
    {...props}
    appName={appName}
    menuData={menuData}
  >
    {props.children}
  </BasicLayout>
);

const propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const Router = props => (
  <ConnectedRouter history={props.history}>
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      <AclRouter
        authorities={props.user.authorities}
        authorizedRoutes={authorizedRoutes}
        authorizedLayout={BasicLayoutWrapper}
        normalRoutes={unAuthorizedRoutes}
        normalLayout={NormalLayout}
      />
    </IntlProvider>
  </ConnectedRouter>
);

const mapStateToProps = state => ({
  user: state.app.user,
});

Router.propTypes = propTypes;
export default connect(mapStateToProps)(Router);
