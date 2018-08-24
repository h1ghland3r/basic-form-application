$(document).ready(function(){
    $form = $("#formSubmit");

    $form.submit (function (e) {
        e.preventDefault();
        initValidate();
    });

    function initValidate() {
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