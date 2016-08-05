Template.register.events({
  "submit .form-signup": function(event){
    var email = trim(event.target.email.value);
    var password = trim(event.target.password.value);
    var password2 = trim(event.target.password2.value);
    var first_name = trim(event.target.first_name.value);
    var last_name = trim(event.target.last_name.value);

    if (isNotEmpty(email) &&
          isNotEmpty(password) &&
          isNotEmpty(first_name) &&
          isNotEmpty(last_name) &&
          isMatchingPassword(password, password2)) {

      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          first_name: first_name,
          last_name: last_name
        }
      }, function(err){
        if (err) {
          FlashMessages.sendError('There was an Error Registrating');
        } else {
          FlashMessages.sendSuccess('Account Created! You are logged in');
          Router.go('/dashboard');
        }
      });
    }
    return false;
  }
});

//Validation

//Trim
var trim = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

//Checks for empty fields
isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  FlashMessages.sendError("Please fill in all fields");
  return false;
};

//Checks password length
isValidPassword = function(password) {
  if (password.length < 6) {
    FlashMessages.sendError("Must be at least 6 Characters");
    return false;
  }
  return true;
};

isMatchingPassword = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    FlashMessages.sendError("Passwords Dont Match");
    return false;
  }
  return true;
}
