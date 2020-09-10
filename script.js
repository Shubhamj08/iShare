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
      success: function (data) {},
    });
    location.reload(true);
  });

  $("").click(function () {
    const user = {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    };
    $.ajax({
      type: "POST",
      data: JSON.stringify(user),
      contentType: "application/json",
      url: "http://localhost:3000/api/ideas",
      success: function (data) {
        console.log(JSON.stringify(user));
      },
    });
  });
});
