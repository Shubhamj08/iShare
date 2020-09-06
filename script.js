$(document).ready(() => {
  $.get("http://localhost:3000/api/ideas", (data, status) => {
    $("#ideas-container").append(data);
  });

  $("#submit-post").click(function () {
    const idea = {
      title: $("#title").val(),
      description: $("#description").val(),
    };
    console.log(JSON.stringify(idea));
    $.ajax({
      type: "POST",
      data: JSON.stringify(idea),
      contentType: "application/json",
      url: "http://localhost:3000/api/ideas",
      success: function (data) {
        console.log(JSON.stringify(data));
      },
    });
    location.reload(true);
  });
});
