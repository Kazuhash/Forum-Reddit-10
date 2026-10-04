$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: $("#contactName").val().trim(),
      email: $("#contactEmail").val().trim(),
      category: $("#contactCategory").val(),
      subject: $("#contactSubject").val().trim(),
      message: $("#contactMessage").val().trim()
    };

    this.reset();

    if (typeof showToast === "function") {
      showToast("Pesan Anda telah berhasil dikirim!");
    } else {
      alert("Pesan Anda telah berhasil dikirim!");
    }
  });
});