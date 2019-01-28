window.onload = function() {
  document.querySelectorAll('.js-credit-card-number').forEach(function(item) {
    item.oninput = function() {
      this.value = cc_format(this.value);
    };
    item.addEventListener('keydown', isOnlyDigits);
  });

  document.querySelectorAll('.js-expiry').forEach(function(item) {
    item.oninput = function() {
      this.value = expiry_format(this.value);
    };
    item.addEventListener('keydown', isOnlyDigits);
  });

  function isOnlyDigits(event) {
   var code = (event.which) ? event.which : event.keyCode;
   if ((code < 48 || code > 57) && (code > 31)) {
     event.preventDefault();
   }
  }

  var forms = document.querySelectorAll('.js-form');
    forms.forEach(function(item) {
    item.addEventListener('submit', function(event) {
      event.preventDefault();
      //loaderFunc();  
      setTimeout(function(){
        console.log('resultOfForm ' + validateForm(item));
      },2000);
   });
  });

  function loaderFunc() {
    var loader = document.querySelector(".loader");
    var loaderWrapper = document.querySelector(".loader-wrapper");
    loader.classList.add('visible');
    loaderWrapper.classList.add('visible');
    setTimeout(function(){
      loader.classList.remove('visible');
      loaderWrapper.classList.remove('visible');
    },2000);
  }  

  function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || '';
    var parts = [];
    for (var i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  }

  function expiry_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{2,4}/g);
    var match = matches && matches[0] || '';
    var parts = [];
    for (var i = 0; i < match.length; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      return parts.join('/');
    } else {
      return value;
    }
  }   

  function showError(container, errorMessage) {
    container.classList.add('error');
    var msgElem = document.createElement('p');
    msgElem.classList.add('error-message');
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
  }

  function resetError(container) {
    container.classList.remove('error');
    if (container.lastChild.className === 'error-message') {
      container.lastChild.classList.remove('error-message');
      container.removeChild(container.lastChild);
    }
  }

  function checkRequired(input) {
    if (input.value === '' || input.value === ' ') {
      resetError(input.parentElement);
      showError(input.parentElement, 'This field is required. Please, fill in this field');
      return false;
    }
    return true;
  }

  function checkEmail(emailIn) {
    var emailRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailIn.value.length) {
      if (!emailIn.value.match(emailRe)) {
        resetError(emailIn.parentElement);
        showError(emailIn.parentElement, 'Please, enter valid email');
        return false;
      }
    } 
    return true;
  }

  function checkMinLength(input) {
    var minLengthRe = input.getAttribute('minlength');
    if (input.value.length) {
      if (input.value.length < minLengthRe) {
        resetError(input.parentElement);
        showError(input.parentElement, 'Please, enter valid data. Minimum ' + minLengthRe + ' symbols');
        return false;
      }
    } 
    return true;
  }

  function checkMaxLength(input) {
    var maxLengthRe = input.getAttribute('maxlength');
    if (input.value.length) {
      if (input.value.length > maxLengthRe) {
        resetError(input.parentElement);
        showError(input.parentElement, 'Please, enter valid data. Maximum ' + maxLengthRe + ' symbols');
        return false;
      }
    } 
    return true;
  }

  function checkHomeAddress(addressIn) {
    var homeAddressRe = /^\d+,\s*[\w\s.-]+|\s*[\w\s.-]+\d+$/i;
      if (addressIn.value.length) {
        if (!addressIn.value.match(homeAddressRe)) {
          resetError(addressIn.parentElement);
          showError(addressIn.parentElement, 'Please, enter valid home address. It should be like 01, Sunday St.');
          return false;
        }
      } 
    return true;
  }

  function checkPhone(phoneIn) {
    var phoneRe = /^[\+]?\d+?[(]?\d{3}[)]?[-\s\.]?\d{3}[-\s\.]?\d{2}[-\s\.]?\d{2}$/im;
    if (phoneIn.value.length) {
      if (!phoneIn.value.match(phoneRe)) {
        resetError(phoneIn.parentElement);
        showError(phoneIn.parentElement, 'Please, enter valid phone number');
        return false;
      } else {
        return true;
      }
    } 
    return true;
  }

  function checkCreditCardNumber(numberIn) {
    if (numberIn.value.lehgth) {
      if (numberIn.value.length !== 19) {
        resetError(numberIn.parentElement);
        showError(numberIn.parentElement, 'Please, enter valid number, 16 digits');
        return false;
      }
    }
    return true; 
  }

  function checkWord(input) {
    var wordRe = /^[a-zA-Z\s-]*$/;
    if (input.value.length) {
      if (!input.value.match(wordRe)) {
        resetError(input.parentElement);
        showError(input.parentElement, 'Please, enter valid data. Only char symbols or/and -');
          return false;
      }
    } 
    return true;
  }

  function checkDigits(input) {
    var digitsRe = /^\d+$/;
    if (input.value.length) {
      if (!input.value.match(digitsRe)) {
        resetError(input.parentElement);
        showError(input.parentElement, 'Please, enter valid data. Only digits');
        return false;
      }
    } 
    return true;
  }

  function checkPassword(passwordIn) {
    var passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordIn.value.length) {
      if (!passwordIn.value.match(passwordRe)) {
        resetError(passwordIn.parentElement);
        showError(passwordIn.parentElement, 'Please, enter valid password. At least one digit and one lowercase character and one uppercase character and special character');
        return false;
      }
    } 
    return true;
  }

  function checkConfirmFields(firstFieldIn, currentForm) {
    var getidOfSecondField = '#'+ firstFieldIn.getAttribute('data-confirm-field-id');
    var secondField = currentForm.querySelector(getidOfSecondField);
    if (firstFieldIn.value.length) {
      if (firstFieldIn.value !== secondField.value) {
        resetError(firstFieldIn.parentElement);
        showError(firstFieldIn.parentElement, 'Your fields do not match. Please, enter valid data.');
        return false;
      }
    } 
    return true;
  }

  function checkExpiry(expiryIn) {
    var expirationArray = expiryIn.value.split('/');
    var monthIn = +expirationArray[0];
    var yearIn = +expirationArray[1];
    var nowDate = new Date();
    var month = nowDate.getMonth() + 1;
    var year = nowDate.getFullYear() % 2000;

    if (expiryIn.value.length) {
      if (expiryIn.value.length !== 5) {
        resetError(expiryIn.parentElement);
        showError(expiryIn.parentElement, 'Please, enter valid data, 4 digits');
        return false;
      } else if (monthIn < month && yearIn <= year) {
        showError(expiryIn.parentElement, 'Your expiration date is before today. Please, enter valid expiration date');
        return false;
      }
    }
    return true;
  }

  function validateForm(currentForm) {
    var isFormValid = true;
    var inputs = currentForm.querySelectorAll('.js-input');
    inputs.forEach(function(item) {
      var rules = item.getAttribute('data-validation-rules');
      if (rules.indexOf('required') != -1) {
        if (!checkRequired(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('minlength') != -1) {
        if (!checkMinLength(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('maxlength') != -1) {
        if (!checkMaxLength(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('letter') != -1) {
        if (!checkWord(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('digits') != -1) {
        if (!checkDigits(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('homeAddress') != -1) {
        if (!checkHomeAddress(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('email') != -1) {
        if (!checkEmail(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('password') != -1) {
        if (!checkPassword(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('phone') != -1) {
        if (!checkPhone(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('creditCardNumber') != -1) {
        if (!checkCreditCardNumber(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('expiry') != -1) {
        if (!checkExpiry(item)) {
          isFormValid = false;
        }
      }

      if (rules.indexOf('confirm') != -1) {
        if (!checkConfirmFields(item, currentForm)) {
          isFormValid = false;
        }
      }

    });
    return isFormValid;
  }
};