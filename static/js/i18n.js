(function($){
    var translations = {};
    translations['zh-cn'] = {
        // Data Tables Translates
        "sLengthMenu": "每页显示 _MENU_ 条记录",
        "sZeroRecords": "未找到任何数据",
        "sInfo": "显示第 _START_ 条记录到 _END_ 条记录, 总共 _TOTAL_ 条记录",
        "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
        "sSearch": "搜索",
        "sPrevious": "上一页",
        "sNext": "下一页",
        "sFirst": "第一页",
        "sLast": "最后一页",
        "Preload tasks committed": "预加载任务提交成功",        
    };
    translations['en'] = {
         // Data Tables Translates
        "sLengthMenu": "Show _MENU_ records per page",
        "sZeroRecords": "No records found",
        "sInfo": "Display from _START_ to _END_, Total _TOTAL_ records",
        "sInfoFiltered": "(From _MAX_ records filtered)",
        "sSearch": "Search:",
        "sPrevious": "Prev",
        "sNext": "Next",
        "sFirst": "First",
        "sLast": "Last",
       
    };

    var I18N = function() {}

    $.extend(I18N.prototype, {
        init_current_language: function() {
            //this.current_language = $.cookie()['gateway_language'];
            // by tyson
            this.current_language = 'gateway_language';
            if(this.current_language != 'en' && this.current_language != 'zh-cn')
                this.current_language = 'zh-cn';
        },

        set_language: function(language) {
            this.current_language = language;
            $.cookie('gateway_language', language, {'path': '/'});
            location.reload(true);
        },

        get_language: function() {
            return this.current_language;
        },

        translate: function(message) {
            var translated = translations[this.current_language][message];
            if(translated == undefined)
                return message;
            return translated;
        },

        t: function(message) {
            return this.translate(message);
        }
    });

    window.I18N = new I18N();
    window.I18N.init_current_language();
})(jQuery);

