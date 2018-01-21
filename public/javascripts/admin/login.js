;
(function(window, $) {
    $(function() {
        // $('.signin').on('click', 'button[class*="label"]', function(ev) {
        //     // $(ev.target).text();
        // });

        $('.signin').on('click', '.btn-signin', function() {
            var uname = $('#username'),
                pwd = $('#password'),
                result = { 'username': uname.val(), 'password': pwd.val() };

            $.ajax({
                type: "post",
                url: "admin/signin",
                data: result,
                success: function(response) {
                    if (response.sisson) {
                        console.log('登录成功');
                    } else {
                        console.error('用户名或密码错误');
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        });
    });
})(window, jQuery);