;
(function(window, $) {
    $(function() {
        $('span[class*="left-menu"]').on('click', function() {
            // router
            var data = {
                hash: $(this).attr('class').split('-')[2],
                time: new Date()
            };
            $.ajax({
                type: "get",
                url: "admin",
                data: data,
                success: function(res) {
                    window.location.href = "admin?hash=" + data.hash;
                }
            });
        });
    })
})(window, jQuery);