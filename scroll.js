$('#text-scroll').text(
    'Scroll till bottom to get alert!');
  
  $(window).on('scroll', function() {
      if ($(window).scrollTop() >= $(
        '.div').offset().top + $('.div').
          outerHeight() - window.innerHeight) {
          
          alert('You reached the end of the DIV');
      }
  });