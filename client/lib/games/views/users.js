// Template.userSignup.events({
//   'submit #userSignup': function(event) {
//     var data, validationErrors;
//     event.preventDefault();
//     data = userInputParse($(event.target)); //this function parses form into user object that can be inserted
//     validationErrors = userObjectValidate(data); //this function takes and does client side validation on the user object.
//     data.profile.status = 0;
//     if (validationErrors) {
//       //Show the user the validation errors
//     } else {
//       return Meteor.call('createUserWithRole', data, 'standard', function(err, userId) {
//         if (!err) {
//           //User created!!
//         } else {
//           //Insertion Error
//         }
//       });
//     }
//   }
// });
