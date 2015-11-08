$(document).read(function(){

    //what else needs to be in the doc ready?


   $('personMessage').submit(addPersonMessage);

    getData();
});


function getData() {
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data) {
            updateDOM(data);
        }
    })
}

function addPersonMessage() {
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function(i, field) {
        values[field.name] =field.value;
    });

    //is value in field.value supposted to match values..?
    $.ajax({
        type: "POST",
        url:"/data",
        data: values,
        success:function(data) {
            getData();
        }
    });

function updateDOM(data){
    $('#messageContainer').empty();

    for(var i = 0; i < data.length; i++) {
        var el = "<div class='col-md-3'>" +
                "<p> + data[i].name + "</p>" +
                "<p> + data[i].message + "</p>" +
                    "</div>";

        $('#messageContainer').append(el);
    }
}




}