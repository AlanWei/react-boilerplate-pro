import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'antd/dist/antd.css';
import { createStore, createApp, initClient } from './app';

const { store, history } = createStore(createBrowserHistory(), {});
const application = createApp(store, history);

initClient(store.dispatch);

ReactDOM.render(application, window.document.getElementById('app'));
