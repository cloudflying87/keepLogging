$(window).on('load', function () {
  // Getting references to our form and input
  var signUpForm = $('form.signup')
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  currentButton = "signUp"

  $('.slickCarousel').slick({
    dots: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    mobileFirst: true,
    cssEase: 'linear'
  });

  $(".switch").on('click', function (event) {
    event.preventDefault();
    currentButton = ($(this).attr('id'))
    switchButtonNames()
  })
  function switchButtonNames (){
    if (currentButton == 'signUp') {
      $('.signText').text('Sign Up')
      $('#signUp').addClass('activeButton')
      $('#login').removeClass('activeButton')
      $('#actionButton').text('Sign Up')
      $("#alert").fadeOut(500)
    } else {
      $('.signText').text('Login')
      $('#actionButton').text('Login')
      $('#signUp').removeClass('activeButton')
      $('#login').addClass('activeButton')
    }
  }
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {

    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    if (currentButton == 'signUp') {
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    } else {
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    }
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function (data) {
        window.location.replace("/main");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.statusText + ": Account already exists for this email address. Please Login.");
    $("#alert").fadeIn(500);
    setTimeout(function () {
      currentButton = "login"
      $("#alert").fadeOut(200)
      switchButtonNames()
     }, 2000)
  }

  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/main");
        // If there's an error, log the error
      })
      .catch(function(err) {
        $("#alert .msg").text(err.statusText + ": Incorrect Email or password.");
        $("#alert").fadeIn(500);
      });
  }
});


