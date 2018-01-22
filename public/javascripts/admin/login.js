;
(function(window, $) {
    $(function() {
        $('.signin').on('click', 'button[class*="label"]', function(ev) {
            $('#' + $(ev.target).text()).focus();
        });

        $('.signin').on('click', '.btn-signin', function() {
            var uname = $('#username'),
                pwd = $('#password'),
                result = { 'username': uname.val(), 'password': pwd.val() },
                show = $('.alert'), //登陆状态提示框
                time = 3, //倒计时跳转
                interval; //倒计时计时器

            $.ajax({
                type: "post",
                url: "admin/signin",
                data: result,
                success: function(data) {
                    if (data.session) {
                        show.addClass('alert-success').removeClass('alert-danger');
                        show.text('登陆成功.');
                        interval = setInterval(function() {
                            if (time === 0) {
                                clearInterval(interval);
                                window.location.href = window.location.href;
                            }
                            show.text('登陆成功,' + time-- + '秒后自动跳转...');
                        }, 1000);
                    } else {
                        show.addClass('alert-danger');
                        show.text('登陆失败，请检查用户名或密码.');
                    }
                },
                error: function(err) {
                    console.log(err);
                }

            });
        });
    });
})(window, jQuery);