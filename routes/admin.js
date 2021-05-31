const adminRouter = require('express').Router();
const Database = require('../services/database');
const ADMIN_PREFIX = '/admin/';
const {
  createSession,
  checkUserSession,
  clearSession,
  sendBackIfLoggedIn,
  getUserSessionInfo
} = require('../middlewares/auth');

const db = new Database();

function baseRenderOptions(req) {
  return {
    layout: 'admin/layout',
    user: getUserSessionInfo(req)
  };
}

adminRouter.get('/login', sendBackIfLoggedIn, (req, res) => {
  res.render('admin/login', {
    baseUrl: req.baseUrl,
    title: 'Login'
  });
});

adminRouter.post('/login', async (req, res) => {
  const user = req.body;
  const isExists = await db.checkUserExists(user);
  if (!isExists) {
    return res.redirect(req.baseUrl + '/login');
  }
  createSession(req);
  res.redirect(req.baseUrl);
});

adminRouter.get('/', checkUserSession, (req, res) => {
  res.render('admin/index', {
    baseUrl: req.baseUrl,
    title: 'Dashboard',
    ...baseRenderOptions(req)
  });
});

adminRouter.get('/logout', (req, res) => {
  clearSession(req);
  res.redirect(req.baseUrl);
});

module.exports = adminRouter;
