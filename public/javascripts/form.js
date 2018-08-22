$(document).ready(function(){
    $form = $("#formSubmit");
    
    $form.submit (function (e) {
        e.preventDefault();
        validateBeforeSubmit();
    });

    function validateBeforeSubmit() {
        var formData = JSON.stringify($form.serializeArray());
    
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: formData,
            url: "/add",
            success: function () {
                alert(data);
            },
            error: function (err) {
                alert ('error');
            }
        });
    }
});