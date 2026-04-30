import toPublicUser from '../../helpers/toPublicUser.js';

const getCurrent = async (req, res) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: toPublicUser(req.user),
    },
  });
};

export default getCurrent;
