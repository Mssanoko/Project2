console.log("invoice is created");

$(document).ready(() => {
    // Getting references to our form and inputs
    const createInForm = $("form.creat-invoice");
    const cnameInput = $("#cname");
    const jaddressInput = $("#jaddress");
    const jDescriptionInput = $("#jdescription");
    const jStartInput = $("#jstartdate");
    const jFinishInput = $("#jfinishdate");
    const inAmountInput = $("#inamount");
    const indueInput = $("#indue");
    // When the form is submitted, we validate there's an email and password entered
    createInForm.on("submit", event => {
        event.preventDefault();
        const inData = {
            clientName: cnameInput.val().trim(),
            jobAddress: jaddressInput.val().trim(),
            jobDescription: jDescriptionInput.val().trim(),
            jobStartDate: jStartInput.val().trim(),
            jobFinishDate: jFinishInput.val().trim(),
            invoiceAmount: inAmountInput.val().trim(),
            invoiceDue: indueInput.val().trim(),
        };
        console.log(inData);

        createInvoice(inData);
    });

    function createInvoice(inData) {
        $.post("/api/create-invoice", inData)
            .then(() => {
                window.location.replace("/view-invoices");
                // If there's an error, catch the error
            })
            .catch(handleInvoiceErr);
    };
  
  function handleInvoiceErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }


const printBtn = document.getElementById(“print - button”);
printBtn.onclick = function () {
    window.print()
};