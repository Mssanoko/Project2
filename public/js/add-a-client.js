
console.log("add-a-client.js loaded");
// Getting references to our form and input
const addAClientForm = $("form.add-a-client");
const emailInput = $("input#emailinput");
const nameInput = $("input#name-input");
const businessInput = $("input#business-input");
const addressInput1 = $("input#addressinput1");
const addressInput2 = $("input#addressinput2");
const phoneInput = $("input#phone-input");


// When the signup button is clicked, we validate the email and password are not blank
addAClientForm.on("submit", event => {
    event.preventDefault();
    console.log("submit")
    const clientData = {
        email: emailInput.val().trim(),
        clientName: nameInput.val().trim(),
        address: addressInput1.val().trim(),
        address2: addressInput2.val().trim(),
        phone: phoneInput.val().trim(),
        businessName: businessInput.val().trim()
        
    

    };
    console.log(clientData)

    // if (!userData.email || !userData.password) {
    //     return;
    // }
    // If we have an email and password, run the signUpUser function
    addAClient(clientData);
    // emailInput.val("");
    // passwordInput.val("");
});


  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function addAClient(clientData) {
    $.post("/api/add-a-client",clientData)
      .then(() => {
        window.location.replace("/account");
      })
      .catch(handleClientErr);
  }

  function handleClientErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
// });
