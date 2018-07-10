import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl-context';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Input, Icon, Button } from 'antd';
import appAction from 'app/action';
import logo from 'assets/logo.svg';
import './index.scss';

const propTypes = {
  prefixCls: PropTypes.string,
  intl: PropTypes.object.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isLogin: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const defaultProps = {
  prefixCls: 'view-login',
};
class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.push('/');
    }
  }

  componentDidUpdate() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.push('/');
    }
  }

  onInputChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  }

  handleLogin = () => {
    const { loginUser } = this.props;
    const { username, password } = this.state;
    loginUser(username, password);
  }

  updateLocale = (locale) => {
    const { intl } = this.props;
    intl.updateLocale(locale);
  }

  renderErrorMsg = () => {
    const { errorMsg, prefixCls } = this.props;
    const show = !isEmpty(errorMsg);
    if (show) {
      return (
        <div className={`${prefixCls}-errorMsg`}>
          {errorMsg}
        </div>
      );
    }
    return null;
  };

  renderLoginPanel = () => {
    const { prefixCls, intl } = this.props;
    const { username, password } = this.state;
    return (
      <div className={`${prefixCls}-loginPanel`}>
        <div className={`${prefixCls}-appInfo`}>
          <img className={`${prefixCls}-appLogo`} src={logo} alt="logo" />
          <span className={`${prefixCls}-appName`}>
            {intl.formatMessage({ id: 'appName' })}
          </span>
        </div>
        <div className={`${prefixCls}-appDesc`}>
          {intl.formatMessage({ id: 'login_appDesc' })}
        </div>
        <Input
          className={`${prefixCls}-loginInput`}
          style={{ height: 40, marginBottom: 24 }}
          placeholder={intl.formatMessage({ id: 'login_usernameInput_placeholder' })}
          type="text"
          prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
          value={username}
          onChange={e => this.onInputChange(e, 'username')}
          onPressEnter={this.handleLogin}
        />
        <Input
          className={`${prefixCls}-loginInput`}
          placeholder={intl.formatMessage({ id: 'login_passwordInput_placeholder' })}
          type="password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
          value={password}
          onChange={e => this.onInputChange(e, 'password')}
          onPressEnter={this.handleLogin}
        />
        <Button
          className={`${prefixCls}-loginBtn`}
          type="primary"
          onClick={this.handleLogin}
        >
          {intl.formatMessage({ id: 'login_login_btn' })}
        </Button>
        <div>
          {this.renderErrorMsg()}
        </div>
      </div>
    );
  }

  renderIntlSwitch = () => {
    const { prefixCls, intl } = this.props;

    return (
      <div className={`${prefixCls}-intlSwitch`}>
        <span
          className={classnames({
            [`${prefixCls}-intlItem`]: true,
            [`${prefixCls}-intlItem-active`]: intl.locale === 'en-us',
          })}
          onClick={() => this.updateLocale('en-us')}
          role="presentation"
        >
          English
        </span>
        <span className={`${prefixCls}-intlSwitchSeparator`}>
          |
        </span>
        <span
          className={classnames({
            [`${prefixCls}-intlItem`]: true,
            [`${prefixCls}-intlItem-active`]: intl.locale === 'zh-cn',
          })}
          onClick={() => this.updateLocale('zh-cn')}
          role="presentation"
        >
          中文
        </span>
      </div>
    );
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={prefixCls}>
        {this.renderLoginPanel()}
        {this.renderIntlSwitch()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.app.isLogin,
  errorMsg: state.app.loginErrorMsg,
});

const mapDispatchToProps = {
  loginUser: appAction.loginUser,
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Login)));
