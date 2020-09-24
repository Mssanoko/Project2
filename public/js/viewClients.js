console.log("viewClients loaded")

$(document).ready(function(){


console.log("docuent ready")

$.get("/api/client")
.then(function(clientdata){
    //console.log(clientdata)


    clientdata.forEach(function(client){
        console.log(client)
        

        let newTr = $("<tr>");

        newTr.append("<td>" + client.id +" </td>");
        newTr.append("<td>" + client.clientName +" </td>");
        newTr.append("<td>" + client.address +" "+ client.address2 +" </td>");
        newTr.append("<td>" + client.email +" </td>");
        newTr.append("<td>" + client.phone +" </td>")

        $("#client-table").append(newTr)

    })
})
})