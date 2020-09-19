console.log("createinvoice.js")


var createAddress = function(){
    $("#jobaddress").val($("#clientname :checked").attr("data-address1") + ", " + $("#clientname :checked").attr("data-address2"));
}
createAddress();

$("#clientname").on("change", createAddress);


const addAnInvoice = $("form.addAnInvoice");
const clientname = $("select#clientname");
const nameInput = $("input#name-input");
const businessInput = $("input#business-input");
const addressInput1 = $("input#addressinput1");
const addressInput2 = $("input#addressinput2");
const phoneInput = $("input#phone-input");


// When the signup button is clicked, we validate the email and password are not blank
addAnInvoice.on("submit", event => {
    event.preventDefault();
    console.log("submit")
    const clientData = {
        clientName: emailInput.val().trim(),
        jobAddress: nameInput.val().trim(),
        jobDescription: addressInput1.val().trim(),
        jobStartDate: addressInput2.val().trim(),
        jobFinishDate: phoneInput.val().trim(),
        invoiceAmount: businessInput.val().trim()
        invoiceDue:businessInput.val().trim()
        paid:addAnInvoice.val().trim()

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