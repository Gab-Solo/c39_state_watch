const router = require('express').Router(),
  {
    createUser,
    loginUser,
    requestPasswordReset,
    passwordRedirect
  } = require('../../controllers/users');

router.post('/api/login', loginUser);
router.post('/api/signup', createUser);
router.get('/password', requestPasswordReset);
router.get('/password/:token', passwordRedirect);

module.exports = router;
