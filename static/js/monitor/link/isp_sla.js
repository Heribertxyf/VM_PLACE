    var interval_key;
    $('#filter1').click(function(){
        $('#box').empty();
        var start_node = $('#start_node').val();
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        if(start_node == ''){
            $('#start_node').data('selectpicker').$button.focus();
            return false;
        }
        if(start_time==''){
            $('#start_time').focus();
            return false;
        }
        if(end_time==''){
            $('#end_time').focus();
            return false;
        }
        draw('abc',start_node,start_time,end_time);
        clearInterval(interval_key);

    });
    $("#start_time").datetimepicker({
        format: 'yyyy-mm-dd',
        minView:'month',
        language: 'zh-CN',
        autoclose:true,
        endDate:new Date()
        }).on("click",function(){
            $("#start_time").datetimepicker("setEndDate",$("#end_time").val())
        });

    $("#end_time").datetimepicker({
        format: 'yyyy-mm-dd',
        minView:'month',
        language: 'zh-CN',
        autoclose:true,
        startDate:new Date(),
        endDate: new Date
        }).on("click",function(){
            $("#end_time").datetimepicker("setStartDate",$("#start_time").val())
        });

    $('#period_60min').click(function(){
        $('#start_time').val('');
        $('#end_time').val('');
    })
    function draw(url, start_node, start_time, end_time) {
        $('#box').empty();
        $.ajax({
            type: "POST",
            url: "/monitor/get_isp_sla_data",
            traditional:true,
            data:add_csrf_token({
                start_node: start_node,
                start_time:start_time,
                end_time:end_time,
            }),
            beforeSend: function() {},
            success: function(data) {
                for(var i=0;i<data.info.length;i++){
                    var wrap = $('#box');
                    var div_name = 'main'+i.toString();
                    var base_name1 = 'base'+i.toString() + 'a';
                    var base_name2 = 'base'+i.toString() + 'b';
                    var base_name3 = 'base'+i.toString() + 'c';
                    html = ''
                    html +=  "<div class='col-md-12' style='margin-bottom:70px;margin-left:auto;marigin-right:auto;'><div class='col-md-12' id='"
                    html += div_name
                    html += "' "+ "style='height:300px;'></div>"
                    html += "<div class='col-md-12' style='margin-top:10px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:green;font-weight:600;font-size:16px'>SLA统计</span>"
                    html += "<span style='margin-right:5px;color:green;font-weight:600;'>SLA值：</span>"
                    html += "<span style='display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name1
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'>故障时间：</span>"
                    html += "<span style='margin-left:5px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name2
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'> 总时间：</span>"
                    html += "<span style='margin-left:5px;display:inline-block;color:green;font-weight:600;' id='"
                    html += base_name3
                    html += "'></span>"
                    html += "</div>"
                    html += "</div>"
                    wrap.append(html);
                    var main = echarts.init(document.getElementById(div_name));
                    var base_name1 = '#'+ base_name1;
                    var base_name2 = '#'+ base_name2;
                    var base_name3 = '#'+ base_name3;
                    $(base_name1).html(data.info[i].sla_rate);
                    $(base_name2).html(data.info[i].sla_fault_sum);
                    $(base_name3).html(data.info[i].sla_all_time);
                    var colors = ['blue', 'green'];
                    main.setOption(
                        option = {
                            color: colors,
                            title: {text: data.info[i].title},
                            tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                            },
                            grid: {
                                    right: '20%'
                            },
                            toolbox: {
                                feature: {
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            legend: {
                                data:['延迟','丢包']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: data.info[i].time_points
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '丢包',
                                    min: 0,
                                    position: 'right',
                                    axisLine: {
                                        lineStyle: {
                                            color: colors[0]
                                        }
                                    },
                                    axisLabel: {
                                        formatter: '{value} %'
                                    }
                                },

                                {
                                    type: 'value',
                                    name: '延迟',
                                    min: 0,
                                    position: 'left',
                                    axisLine: {
                                        lineStyle: {
                                            color: colors[1]
                                        }
                                    },
                                    axisLabel: {
                                        formatter: '{value} ms'
                                    }
                                },
                            ],
                            dataZoom: [{
                                        startValue: 0
                                      }, {
                                        type: 'inside'
                                      }],
                            series: [
                                {
                                    name:'丢包',
                                    type:'line',
                                    yAxisIndex: 0,
                                    symbol:'none',
                                    data:data.info[i].loss,
                                    markLine: {
                                          label:{normal:{show:false}},
                                          symbol:'circle',
                                          silent: true,
                                          data: [ {
                                              yAxis: data.info[i].loss_base_line,
                                          }]
                                    }
                                },
                                {
                                    name:'延迟',
                                    type:'line',
                                    yAxisIndex: 1,
                                    symbol:'none',
                                    data:data.info[i].latency,
                                    markLine: {
                                          label:{normal:{show:false}},
                                          symbol:'circle',
                                          silent: true,
                                          data: [ {
                                              yAxis: data.info[i].latency_base_line,
                                          }]
                                    }
                                },
                            ]
                        }
                    )
                }
            }
        })
    }
