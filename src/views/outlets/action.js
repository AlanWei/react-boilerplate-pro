import api from 'utils/api';
import createAsyncAction from 'utils/createAsyncAction';

const getOutlets = () => (
  createAsyncAction('OUTLETS_GET', () => (
    api.get('/outlets')
  ))
);

export default {
  getOutlets,
};
