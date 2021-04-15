
(function ($) {
    "use strict";
  
    /*==================================================================
    [ Validate ]*/
    var email = $('.validate-input input[name="email"]');
    var title = $('.validate-input input[name="title"]');
    var description = $('.validate-input textarea[name="description"]');

    $('#send').on('click',function(){
        var check = true;
        if($(title).val().trim() == ''){
            showValidate(title);
            check=false;
        }

        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }
        
        if($(description).val().trim() == ''){
            showValidate(description);
            check=false;
        }

        if(!check){
            /* 
                Paramos el envío del formulario.
                Se puede hacer devolviendo false o con el e.preventDefault();
            */
            return check;
        }
         $.ajax({
            url: 'https://2l8b62pm1l.execute-api.eu-west-3.amazonaws.com/dev/v1/messages',
            type: "POST",
            data: { 'email': email, 'title': title, 'description': description},
            success: function(data) {
                console.log(data);
                $('#response').html(data);
            },
            error: function(data) {
                console.log(data);
                $('#response').html(data);
            }
        });
    });

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);