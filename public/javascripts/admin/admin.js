;
(function(window, $) {
    $(function() {
        $('span[class*="left-menu"]').on('click', function() {
            var data = {
                hash: $(this).attr('class').split('-')[2],
                time: new Date().getTime()
            };
            $.ajax({
                type: "get",
                url: "query",
                data: data,
                success: function(res) {
                    console.log(res);
                    var tab_caption = 'users';
                    $('.main').html(function() {
                        var result, rows = '';
                        res.forEach(function(elm, index) {
                            rows += `
                                <tr>
                                    <td>${elm.user_id}</td>
                                    <td>${elm.user_name}</td>
                                    <td>${elm.user_pwd}</td>
                                    <td>${elm.user_phone}</td>
                                    <td>${elm.user_sex?'男':'女'}</td>
                                    <td>${elm.user_qq}</td>
                                    <td>${elm.user_email}</td>
                                    <td><a href="search?id=${elm.user_id}">more.</a></td>
                                </tr>
                            `;
                        });
                        result = `
                            <div class="container-fluid">
                                <table class="table table-bordered table-hover text-center">
                                    <caption class="text-center h2">${tab_caption}</caption>
                                    <tr>
                                        <td>id</td>
                                        <td>用户名</td>
                                        <td>密码</td>
                                        <td>手机号</td>
                                        <td>性别</td>
                                        <td>qq</td>
                                        <td>email</td>
                                        <td>更多</td>
                                    </tr>
                                    ${rows}
                                </table>
                            </div>
                        `;
                        return result;
                    });
                }
            });
        });
    })
})(window, jQuery);