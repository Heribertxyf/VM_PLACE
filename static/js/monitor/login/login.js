    (function($){
        var Login = function(){}
        $.extend(Login.prototype, {
            login: function(){
                var username = $('#username').val();
                var password = $('#password').val();
                this.do_login(username, password); 
            },
            do_login: function(username, password){
                var $this = this;
                var url = "/do_login";
                $.ajax({
                    type: 'POST',
                    url :  url,
                    data: add_csrf_token({'username':username,'password':password}),
                    statusCode:{
                        200: function(data){
                            if (data['status']){
                                window.location.href=data['redirect_to'];
                            }else{
                            }
                        }
                    }
                })
            },
        });

        window.Login = new Login();
    })(jQuery);
