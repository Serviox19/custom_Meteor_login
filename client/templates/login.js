Template.login.events({
  "submit .form-signin": function(event) {
    var email = trim(event.target.email.value);
    var password = trim(event.target.password.value);

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        //does not clear form if error
        event.target.email.value = email;
        event.target.password.value = password;
        FlashMessages.sendError(err.reason);
      } else {
        FlashMessages.sendSuccess("You Are Now logged In!");
        Router.go('/dashboard');
      }
    });

    //Prevent submit
    return false;
  }
});

var trim = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}
