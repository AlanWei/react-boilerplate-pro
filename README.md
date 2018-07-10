# react-boilerplate-pro

Inspired by [Ant Design Pro](https://pro.ant.design/).

Non-opinionated React Admin System boilerplate integrated with decentralized composable features.

## Features
* :globe_with_meridians: **Internationalization**: [react-intl-context](https://github.com/AlanWei/react-intl-context)
* :lock: **Access control list**: [react-acl-router](https://github.com/AlanWei/react-acl-router)
* :memo: **Nested menu**: [react-sider](https://github.com/AlanWei/react-sider)

## Usage
```bash
$ git clone https://github.com/AlanWei/react-boilerplate-pro.git
$ cd react-boilerplate-pro
$ yarn install
$ yarn mock:server    # start mock data server at http://localhost:3000, npm run mock:server also works
$ yarn dev            # start webpack-dev-server in another terminal window at http://localhost:8080, npm run dev also works
```

## Login Credentials
* Admin: username `admin` & password `123`, authorities is `'admin'`
* User: username `user` & password `123`, authorities is `'user'`