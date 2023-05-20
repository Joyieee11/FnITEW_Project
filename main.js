$(document).ready(function() {
  // Show spinner on page load
  $(window).on("load", function() {
    $(".loader-container").fadeOut(500);
  });

  // Smooth scroll to div
  $('a[href^="#"]').on("click", function(event) {
    event.preventDefault();

    var hash = this.hash;

    $("html, body").animate({
      scrollTop: $(hash).offset().top
    }, 800, function() {
      window.location.hash = hash;
    });
  });

  // Store the previous scroll position
  var prevScrollPos = window.pageYOffset;

  // Select the navbar element
  var navbar = document.querySelector('.navbar');

  // Function to handle scroll event
  function handleScroll() {
    // Get the current scroll position
    var currentScrollPos = window.pageYOffset;

    // Check if scrolling down or up
    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      navbar.classList.remove('navbar-hidden');
      navbar.classList.add('navbar-visible');
    } else {
      // Scrolling down
      navbar.classList.remove('navbar-visible');
      navbar.classList.add('navbar-hidden');
    }

    // Update the previous scroll position
    prevScrollPos = currentScrollPos;
  }

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // AJAX form submission
  $("#contact-form").submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "send-message.php",
      data: formData,
      success: function(response) {
        $("#message").text(response).fadeIn(500);
        $("#contact-form")[0].reset();
      },
      error: function() {
        alert("An error occurred while submitting the form.");
      }
    });
  });
});
