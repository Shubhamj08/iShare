$(document).ready(() => {
  $.get("http://localhost:3000/api/ideas", (data, status) => {
    $("#ideas-container").append(data);
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
        console.log(data);
      },
      error: function (e) {
        console.log(
          "login error, status: " + e.status + " message :" + e.responseText
        );
      },
    });
    location.reload(true);
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
        localStorage.setItem("ishare-auth-header", data);
      },
    });
  });
});
