$(document).ready(() => {
  // Getting references to our form and inputs
  const addaclientForm = $("form.add-a-client");
  const emailInput = $("#emailinput");
  const addressInput1 = $("#addressInput1");
  const addressInput2 = $("#addressInput2");
  const phone = $("#phone-input");
  const clientName= $("#name-input");

  // When the form is submitted, we validate there's an email and password entered
  addaclientForm.on("submit", event => {
    event.preventDefault();
    const clientData = {
      email: emailInput.val().trim(),
      clientName: clientName.val().trim(),
    // address: addressInput1.val().trim()+" "+addressInput2.val().trim(),
    address: "okst 900",
    phone: phone.val().trim(),
      newClient: true
    };
console.log(clientData);
    $.post("/api/add-a-client", clientData)
      .then(() => {
        window.location.replace("/viewClients");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });

    // If we have an email and password we run the loginUser function and clear the form
    //   loginUser(userData.email, userData.password);
    //   emailInput.val("");
    //   passwordInput.val(""); use for clearing the inputs

    // loginUser does a post to our "api/login" route and if successful, redirects us the the account page
  });
});
