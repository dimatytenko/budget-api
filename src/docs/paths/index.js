import usersPaths from './users.js';
import purchasesPaths from './purchases.js';

const paths = {
  paths: {
    ...usersPaths,
    ...purchasesPaths,
  },
};

export default paths;
