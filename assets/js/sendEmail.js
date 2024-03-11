// ------------------------------ Send Email

function sendEmail(contactForm) {
  emailjs
    .send("outlook", "soroush", {
      from_name: contactForm.name.value,
      from_email: contactForm.emailaddress.value,
      project_request: contactForm.projectsummary.value,
      reply_to: contactForm.emailaddress.value,
    })
    .then(
      function (response) {
        console.log("SUCCESS", response);
        //    Show alert message
        var alertBox = document.querySelector(".alert");
        alertBox.style.display = "block";
        //    Reset form
        contactForm.reset();
        //    Close Alert after 8 seconds per auto
        setTimeout(function () {
          alertBox.style.display = "none";
        }, 8000);
      },
      function (error) {
        console.log("FAILED", error);
      }
    );

  return false;
}

//    Close alert message manually
function closeAlert() {
  document.querySelector(".alert").style.display = "none";
}
