
(() => {
'use strict'

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
 form.addEventListener('submit', event => {
   if (!form.checkValidity()) {
     event.preventDefault()
     event.stopPropagation()
   }

   form.classList.add('was-validated')
 }, false)
})
})()

//signup page


      
// $(document).ready(function () {
//   $('#signupForm').on('submit', function (event) {
//       event.preventDefault();
      
//       const password = $('#password').val();
//       const confirmPassword = $('#confirmPassword').val();
//       const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

//       if (!passwordPattern.test(password)) {
//           $('#message').html('<div class="alert alert-danger">Password must be at least 8 characters long, contain a number and a special character.</div>');
//           return;
//       }

//       if (password !== confirmPassword) {
//           $('#message').html('<div class="alert alert-danger">Passwords do not match.</div>');
//           return;
//       }

//       // If form is valid, you can submit it
//       this.submit();
//   });
// });