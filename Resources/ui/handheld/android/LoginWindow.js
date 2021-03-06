function LoginWindow() {
	try {
	var LoginView = require('ui/common/LoginView');

	var self = Ti.UI.createWindow({
		navBarHidden : true,
		backgroundColor : "#fff"
	});

	var loginView = new LoginView();
	self.add(loginView);

  var closeWindow = function() {
    Ti.App.removeEventListener('login:completed', closeWindow);
    self.close();
  };
  Ti.App.addEventListener('login:completed', closeWindow);

	return self;
  }
  catch(e) {
    var auditor = require('helpers/Auditor');
    auditor.writeIntoAuditFile(arguments.callee.name + " - " + e.toString());
  }
}

module.exports = LoginWindow;
