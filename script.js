$(document).ready(() => {
  $.get("http://localhost:3000/api/ideas", (data, status) => {
    $("#ideas-container").append(data);
  });
});
