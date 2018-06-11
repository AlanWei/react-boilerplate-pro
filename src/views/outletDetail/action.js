import api from 'utils/api';
import createAsyncAction from 'utils/createAsyncAction';

const getOutlet = id => (
  createAsyncAction('OUTLETDETAIL_GET', () => (
    api.get(`/outlets/${id}`)
  ))
);

export default {
  getOutlet,
};
