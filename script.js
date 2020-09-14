$(document).ready(function () {
  isUserLoggedIn();

  $.get("http://localhost:3000/api/ideas", (data, status) => {
    $("#ideas-container").append(data);
  });

  $.ajax({
    type: "POST",
    data: JSON.stringify({ loc: location.href }),
    contentType: "application/json",
    url: "http://localhost:3000/api/users/location",
    success: function (data) {
      console.log(data);
    },
    error: function (e) {
      console.log(e);
    },
  });

  $("#submit-post").click(function () {
    const idea = {
      title: $("#title").val(),
      description: $("#description").val(),
    };
    $.ajax({
      type: "POST",
      data: JSON.stringify(idea),
      contentType: "application/json",
      url: "http://localhost:3000/api/ideas",
      beforeSend: function (jqXHR, settings) {
        jqXHR.setRequestHeader(
          "x-auth-token",
          localStorage.getItem("ishare-auth-header")
        );
      },
      success: function (data) {
        location.reload(true);
      },
      error: function (e) {
        if (e.responseText == "Invalid Token") {
          $("#myModal-l").modal("show");
        }
      },
    });
  });

  $("#register").click(function () {
    if ($("#password-r").val() != $("#re-password-r").val()) {
      $("#warnings").html("passwords do not match!");
      console.log($("#password-r").val(), $("#re-password-r").val());
      return;
    }

    const user = {
      username: $("#username-r").val(),
      email: $("#email-r").val(),
      password: $("#password-r").val(),
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(user),
      contentType: "application/json",
      url: "http://localhost:3000/api/users",
      success: function (data) {
        $("#myModal").modal("hide");
        alert(data);
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  });

  $("#login-btn").click(function () {
    if ($("#password-l").val().length < 8) {
      $("#warnings-l").html("incorrect username or password!");
      console.log($("#password-l").val().length);
      return;
    }

    const user = {
      email: $("#email-l").val(),
      password: $("#password-l").val(),
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(user),
      contentType: "application/json",
      url: "http://localhost:3000/api/auth",
      success: function (data) {
        localStorage.setItem("ishare-auth-header", data);
        isUserLoggedIn();
      },
      error: function (e) {
        alert(e.responseText);
      },
    });
  });

  $("#logout").click(function () {
    localStorage.removeItem("ishare-auth-header");
    $("#signup").css("display", "block");
    $("#login").css("display", "block");
    $("#logout").css("display", "none");
  });

  $("#signup-fl").click(function () {
    $("#myModal").modal("show");
    $("#myModal-l").modal("hide");
  });
});

function isUserLoggedIn() {
  const authToken = localStorage.getItem("ishare-auth-header");
  if (authToken != null) {
    $("#signup").css("display", "none");
    $("#login").css("display", "none");
    $("#logout").css("display", "block");
    $("#myModal").modal("hide");
    $("#myModal-l").modal("hide");
  }
}
