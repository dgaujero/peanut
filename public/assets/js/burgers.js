debugger
$(document).ready(function () {
    console.log("ready")
    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        var addedBurgers = $("#addedBurger");
        var eatenBurgers = $("#eatenBurger");

        var burgers = data.burgers;
        var len = burgers.length;

        for (let i = 0; i < len; i++) {
            var devour_elem =
                "<li>" + burgers[i].burger_name + "<button id='devour-burger' data-id='" + burgers[i].id +
                "' data-devour='" + !burgers[i].devoured + "'>Devour! </button> </div> </li>";
            var delete_elem =
                "<li>" + burgers[i].burger_name + "<button id='delete-burger' data-id='" + burgers[i].id + "'>Delete! </button> </div </li>";

            if (!burgers[i].devoured) {
                addedBurgers.append(devour_elem);
            } else if (burgers[i].devoured) {
                eatenBurgers.append(delete_elem);
            }
        }
    });

    $("#submitBTN").on("click", function (event) {
        event.preventDefault();

        var addBurg = {
            burger: $("#userInput").val().trim(),
            devoured: false
        }

        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(addBurg),
            dataType: "json",
            contentType: "application/json",
        }).then(function () { 
            debugger
            location.reload();
        });
    });

    $(document).on("click", "#devour-burger", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devourBurger = $(this).data("devour") === true;
        var newDevoured = {
            devoured: devourBurger
        };

        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(newDevoured),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            location.reload();
        });
    });

    $(document).on("click", "#delete-burger", function (event) {
        event.preventDefault();

        var id = $(this).data("id");

        $.ajax("/burgers/" + id, {
            type: "DELETE",

        }).then(function () {
            location.reload();
        });
    });

});