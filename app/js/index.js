;(function() {
 document.querySelectorAll('.js-form').forEach(function(item) {
  item.addEventListener('formIsValid', function() {
    document.querySelector('.js-success-message').classList.add('visible');
    setTimeout(function(){
      document.querySelector('.js-success-message').classList.remove('visible');
    }, 3000);
    });
  });
}());