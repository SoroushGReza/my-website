//     Send Email

function sendEmail(contactForm) {
  emailjs.send("outlook", "soroush", {
      "from_name": contactForm.name.value,
      "from_email": contactForm.emailaddress.value,
      "project_request": contactForm.projectsummary.value,
      "reply_to": contactForm.emailaddress.value,
    })
    .then(
      function (response) {
        console.log("SUCCESS", response);
      },
      function (error) {
        console.log("FAILED", error);
      }
    );
    return false;
}
