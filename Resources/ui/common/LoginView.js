var TopLevelView = require('ui/common/components/TopLevelView');
var ButtonView = require('ui/common/components/ButtonView');
var SeparatorView = require('ui/common/components/SeparatorView');
var Palette = require('ui/common/components/Palette');
var loginHelper = require('helpers/LoginHelper');

function LoginView() {

  var topLevelView = new TopLevelView('Login');

  var self = Ti.UI.createView({
    layout : 'vertical',
    top : '120dip'
  })
  topLevelView.add(self);

  var emailField = Ti.UI.createTextField({
    width : '80%',
    hintText : 'Email',
    top : 20
  });

  var passwordField = Ti.UI.createTextField({
    width : '80%',
    hintText : 'Password',
    passwordMask : true
  });

  var loginButton = new ButtonView('Login', { width : '60%'});

  var activityIndicator = Ti.UI.createActivityIndicator({
    message : 'Logging in...',
    height : 'auto',
    width : 'auto'
  });
  Ti.App.addEventListener('network.server.unreachable', function(){
    activityIndicator.hide();
  });
  Ti.App.addEventListener('network.offline', function(){
    activityIndicator.hide();
  });
  Ti.App.addEventListener('login.done', function(){
    activityIndicator.hide();
  });

  self.add(activityIndicator);
  self.add(emailField);
  self.add(passwordField);
  self.add(new SeparatorView(Palette.SECONDARY_COLOR_LIGHT, '5dip'));
  self.add(loginButton);

  loginButton.addEventListener('click', function() {
    activityIndicator.show();
    var email = emailField.getValue().trim();
    var password = passwordField.getValue();
    loginHelper.login(email, password, topLevelView);
  });

  return topLevelView;
}

module.exports = LoginView;
