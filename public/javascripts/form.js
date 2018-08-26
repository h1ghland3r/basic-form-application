$(document).ready(function(){
   
    /* Phone Number */
    function validatePhoneNumber() {
        var phoneNumber = $("input[name='phone']").val();
        var regex = /[0-9]{3}\s[0-9]{3}\s[0-9]{3}/;
        var isValid = regex.test(phoneNumber);
        return isValid;
    }
    
    function addSpacesinPhoneNumber() {
        var phoneInput = $("input[name='phone']");
        var phoneInputValue = $("input[name='phone']").val();
        var phoneInputValueWithSpaces = phoneInputValue.toString().replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
        var replacedNumbers = phoneInput.val(phoneInputValueWithSpaces);
        return replacedNumbers;
    }

    function removeAnyCharOverlappingMaxLength() {
        var phoneInput = $("input[name='phone']");
        var phoneInputValue = $("input[name='phone']").val();
        var phoneInputValueFinal = '';
        if (phoneInputValue.length > 11) {
            phoneInputValueFinal = phoneInput.val(phoneInputValue.substr(0, 11));
            return phoneInputValueFinal;
        }
    }

    $("input[name='phone']").on("keyup", function() {
        addSpacesinPhoneNumber();
        removeAnyCharOverlappingMaxLength();
    });
    
    $("input[name='phone']").on("blur", function() {
        validatePhoneNumber();
    });

    /* Password */

    function validatePasswordStrength(){
        var passwordStrength = 0;
        var passwordInputValue = $("input[name='password']").val();
        var scoresOutput = $("#validationPassword");

        // scores length
        if (passwordInputValue.length >= 6) {
            passwordStrength += 20;
        }
        // scores for lowercase
        if (passwordInputValue.match(/[a-z]+/)) {
            passwordStrength += 20;
        }
        // scores for uppercase
        if (passwordInputValue.match(/[A-Z]+/)) {
            passwordStrength += 20;
        }
        // scores for numbers
        if (passwordInputValue.match(/\d+/)) {
            passwordStrength += 20;
        }
        // scores for alphanumeric
        if (passwordInputValue.match(/\W+/)) {
            passwordStrength += 20;
        }

        // shows score on output
        if (passwordInputValue.length >= 1) {
            if (passwordStrength <= 80) {
                var score = scoresOutput.html('Your password must have at least 8 characters and containing numbers, uppercase and lowercase letters, and at least a special character.');
                scoresOutput.addClass('error-message');
                if (scoresOutput.is('.success-message')) {
                    scoresOutput.removeClass('success-message');
                }
            } else {
                var score = scoresOutput.html('');
                scoresOutput.addClass('success-message');
                if (scoresOutput.is('.error-message')) {
                    scoresOutput.removeClass('error-message');
                }
            }
        }
        
        return score;
    }

    $("input[name='password']").on("keyup", function() {
        validatePasswordStrength();
    });

    /* Form Submit */
    $form = $("#formSubmit");

    $form.submit (function (e) {
        e.preventDefault();
        removeAnyCharOverlappingMaxLength();
        validateForm();
    });

    function validateForm() {
        var formData = {};
        formData.name = $form.find("input[name='name']").val();
        formData.email = $form.find("input[name='email']").val();
        formData.password = $form.find("input[name='password']").val();
        formData.phone = $form.find("input[name='phone']").val();
        $("#validationSuccess").html('');
        $("#validationError").html('');

        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(formData),
            url: "http://localhost:3000/add",
            success: function (data) {
                alert('All done! We received your data.');
                if (typeof data.redirect == 'string') {
                    // uses window.location.replace for not keeping the history navigation
                    window.location.replace(window.location.protocol + "//" + window.location.host + data.redirect);
                }
            },
            error: function (err) {
                $("#validationError").addClass('error-message').append('The e-mail ' + formData.email + ' is already registered.');
            }
        });
    }
});