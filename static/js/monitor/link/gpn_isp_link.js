    function Push() {
        $.ajax({
            type: "POST",
            url: "/monitor/get_gpn_isp_link_data",
            data: add_csrf_token({}),
            beforeSend: function() {},
            success: function(data) {
                $('#isp_box').empty();
                $('#alarm_table').empty();
                var alarm_table = $('#alarm_table');
                alarm_table.append(data.alarm_table);
                $('#warning_table').empty();
                var warning_table = $('#warning_table');
                warning_table.append(data.warning_table);
                var isp_box = $('#isp_box');
                isp_box.append(data.isp_html);
                var myDate = new Date();
                var timer_value = myDate.toLocaleString();
                $('#timer').text(timer_value);
                main = echarts.init(document.getElementById('box'));
                main.clear();
                var graph = data
                var categories = [];
                for (var i=0; i<9; i++) {
                    categories[i] = { name: '类目' + i };
                }
                data.nodes.forEach(function (node) {
                    node.itemStyle = null;
                    node.value = '';
                    node.symbolSize = 10;
                    node.label = {
                        normal: {
                            show: true ,
                            fontSize:15,
                        }
                    };
                    node.category =  2;
                });
                main.setOption(
                    option = {
                        title: {
                            text: data.title,
                            subtext: '',
                            top: 'top',
                            left: 'middle'
                        },
                        tooltip: {    
                        },
                        legend: [{
                        }],
                        animation:true,
                        animationDurationUpdate: 8000,
                        animationEasingUpdate: 'quinticInOut',
                        addDataAnimation:true,
                        animationDuration:3000,
                        series: [
                                  { name: data.title,
                                    type: 'graph',
                                    layout: 'circular',
                                    circular: {
                                              rotateLabel: true,
                                    },
                                    lineStyle: {
                                        normal: {
                                            curveness: 0.2
                                            }
                                        },
                                    data: data.nodes,
                                    links: data.links,
                                    categories: ['E','F','G'],
                                    roam: true,
                                    label: {
                                        normal: {
                                            position: 'right',
                                            formatter: '{b}'
                                        }
                                    },
                                  }
                                ]
                        })
            }
        });
    };
    Push();
    setInterval(function() {Push();}, 60000);
