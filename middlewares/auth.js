function checkUserSession(req, res, next) {
  if (req.session.auth) {
    const authInfo = JSON.parse(req.session.auth);
    if (!authInfo.login) {
      return res.redirect(req.baseUrl + '/login');
    }
    return next();
  }
  return res.redirect(req.baseUrl + '/login');
}

function sendBackIfLoggedIn(req, res, next) {
  if (req.session.auth) {
    const authInfo = JSON.parse(req.session.auth);
    if (authInfo.login) {
      return res.redirect(req.baseUrl);
    }
    return next();
  }
  return next();
}

function createSession(req) {
  const data = { ...req.body, login: true };
  req.session.auth = JSON.stringify(data);
}

function clearSession(req) {
  req.session.auth = JSON.stringify({});
}

function getUserSessionInfo(req) {
  if (req.session.auth) {
    return JSON.parse(req.session.auth);
  }
  return {};
}

module.exports = {
  checkUserSession,
  createSession,
  clearSession,
  getUserSessionInfo,
  sendBackIfLoggedIn
};
