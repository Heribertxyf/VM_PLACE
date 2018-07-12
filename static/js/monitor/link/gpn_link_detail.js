    var interval_key;
    function link_here(){
        clearInterval(interval_key);
        $('#box').empty();
        var start_node = $('#start_node_from_link').val();
        var end_node = $('#end_node_from_link').val();
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        $('#start_time').val('');
        $('#end_time').val('');
        if(start_node == ''){
            $('#start_node').data('selectpicker').$button.focus();
            return false;
        }
        if(end_node == ''){
            $('#end_node').data('selectpicker').$button.focus();
            return false;
        }
        var radio = 60;
        var div_list = [];
        var myDate = new Date();
        $('#draw_title').text(myDate.toLocaleString());
        $.ajax({
            type:"POST",
            url: "/monitor/get_gpn_link_detail_data",
            traditional:true,
            data:add_csrf_token({
                start_node: start_node,
                end_node: end_node,
                start_time:start_time,
                end_time:end_time,
                period:60,
            }),
            beforeSend: function() {},
            success: function(data) {
                for(var i=0;i<data.info.length;i++){
                    var wrap = $('#box');
                    var div_name = 'main'+i.toString();
                    div_list.push(div_name);
                    var base_name1 = div_name + 'a';
                    var base_name2 = div_name + 'b';
                    var base_name3 = div_name + 'c';
                    var base_name4 = div_name + 'd';
                    var base_name5 = div_name + 'e';
                    var base_name6 = div_name + 'f';
                    html = ''
                    html +=  "<div class='col-md-12' style='margin-bottom:70px;margin-left:auto;marigin-right:auto;'><div class='col-md-12' id='"
                    html += div_name
                    html += "' "+ "style='height:300px;'></div>"
                    html += "<div class='col-md-12' style='margin-top:10px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:green;font-weight:600;font-size:16px'>延迟统计</span>"
                    html += "<span style='margin-right:5px;color:green;font-weight:600;'>最大值:</span>"
                    html += "<span style='width:60px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name1
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'>最小值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name2
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'> 当前值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:green;font-weight:600;' id='"
                    html += base_name3
                    html += "'></span>"
                    html += "</div>"
                    html += "<div class='col-md-12' style='margin-top:5px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:blue;font-weight:600;font-size:16px'>丢包统计</span>"
                    html += "<span style='margin-right:5px;color:blue;font-weight:600;'>最大值:</span>"
                     html += "<span style='width:60px;display:inline-block;color:blue;font-weight:600;'  id='"
                    html += base_name4
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:blue;font-weight:600;'>最小值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:blue;font-weight:600;' id='"
                    html += base_name5
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:blue;font-weight:600;'> 当前值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:blue;font-weight:600;' id='"
                    html += base_name6
                    html += "'></span>"
                    html += "</div>"
                    html += "</div>"
                    wrap.append(html);
                    var main = echarts.init(document.getElementById(div_name));
                    main.clear();
                    var base_name1 = '#'+ base_name1;
                    var base_name2 = '#'+ base_name2;
                    var base_name3 = '#'+ base_name3;
                    var base_name4 = '#'+ base_name4;
                    var base_name5 = '#'+ base_name5;
                    var base_name6 = '#'+ base_name6;
                    $(base_name1).html(data.info[i].latency_max);
                    $(base_name2).html(data.info[i].latency_min);
                    $(base_name3).html(data.info[i].latency_current);
                    $(base_name4).html(data.info[i].loss_max);
                    $(base_name5).html(data.info[i].loss_min);
                    $(base_name6).html(data.info[i].loss_current);
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
                                    //max: 25,
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
                                    //max: 250,
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
         $('#div_list').val(JSON.stringify(div_list));
            }
        })
        var radio = 60;
        interval_key = setInterval(function(){hi('abc',start_node,end_node,start_time,end_time,radio);},60000);
    }
    if ($('#start_node_from_link').val() != '' && $('#end_node_from_link').val() != ''){
         link_here();
    }
    $('#filter1').click(function(){
        clearInterval(interval_key);
        $('#box').empty();
        $('#filter3').removeClass('disabled');
        var myDate = new Date();
        $('#draw_title').text(myDate.toLocaleString());
        var start_node = $('#start_node').val();
        var end_node = $('#end_node').val();
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        var radio=$('input:radio[name="period"]:checked').val();
        var draw_title = $('#draw_title');
        if(start_node == ''){
            $('#start_node').data('selectpicker').$button.focus();
            return false;
        }
        if(end_node == ''){
            $('#end_node').data('selectpicker').$button.focus();
            return false;
        }
        if(start_time=='' && end_time==''){
            radio = 60;
            draw('abc',start_node,end_node,start_time,end_time,radio); 
            clearInterval(interval_key);
            $('#filter').removeClass('disabled');
        }else{
            if(start_time==''){
                $('#start_time').focus();
                return false;
            }
            if(end_time==''){
                $('#end_time').focus();
                return false;
            }
       
            draw('abc',start_node,end_node,start_time,end_time,radio);
            clearInterval(interval_key);
            $('#filter3').removeClass('disabled');
        }
    });

    $('#clean_time').click(function(){
        $('#start_time').val('');
        $('#end_time').val('');
    })
    $('#filter2').click(function(){
        clearInterval(interval_key);
        var myDate = new Date();
        $('#draw_title').text(myDate.toLocaleString());
        var start_node = $('#start_node').val();
        var end_node = $('#end_node').val();
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        $('#start_time').val('');
        $('#end_time').val('');
        if(start_node == ''){
            $('#start_node').data('selectpicker').$button.focus();
            return false;
        }
        if(end_node == ''){
            $('#end_node').data('selectpicker').$button.focus();
            return false;
        }
        var radio = 60;
        draw('abc',start_node,end_node,start_time,end_time,radio);
    });
    $('#filter3').click(function(){
        clearInterval(interval_key);
        $('#box').empty();
        var start_node = $('#start_node').val();
        var end_node = $('#end_node').val();
        var start_time = $('#start_time').val();
        var end_time = $('#end_time').val();
        $('#start_time').val('');
        $('#end_time').val('');
        if(start_node == ''){
            $('#start_node').data('selectpicker').$button.focus();
            return false;
        }
        if(end_node == ''){
            $('#end_node').data('selectpicker').$button.focus();
            return false;
        }
        var radio = 60;
        var div_list = [];
        var myDate = new Date();
        $('#draw_title').text(myDate.toLocaleString());
        $.ajax({
            type:"POST",
            url: "/monitor/get_gpn_link_detail_data",
            traditional:true,
            data:add_csrf_token({
                start_node: start_node,
                end_node: end_node,
                start_time:start_time,
                end_time:end_time,
                period:60,
            }),
            beforeSend: function() {},
            success: function(data) {
                for(var i=0;i<data.info.length;i++){
                    var wrap = $('#box');
                    var div_name = 'main'+i.toString();
                    div_list.push(div_name);
                    var base_name1 = div_name + 'a';
                    var base_name2 = div_name + 'b';
                    var base_name3 = div_name + 'c';
                    var base_name4 = div_name + 'd';
                    var base_name5 = div_name + 'e';
                    var base_name6 = div_name + 'f';
                    html = ''
                    html +=  "<div class='col-md-12' style='margin-bottom:70px;margin-left:auto;marigin-right:auto;'><div class='col-md-12' id='"
                    html += div_name
                    html += "' "+ "style='height:300px;'></div>"
                    html += "<div class='col-md-12' style='margin-top:10px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:green;font-weight:600;font-size:16px'>延迟统计</span>"
                    html += "<span style='margin-right:5px;color:green;font-weight:600;'>最大值:</span>"
                    html += "<span style='width:60px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name1
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'>最小值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name2
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'> 当前值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:green;font-weight:600;' id='"
                    html += base_name3
                    html += "'></span>"
                    html += "</div>"
                    html += "<div class='col-md-12' style='margin-top:5px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:blue;font-weight:600;font-size:16px'>丢包统计</span>"
                    html += "<span style='margin-right:5px;color:blue;font-weight:600;'>最大值:</span>"
                     html += "<span style='width:60px;display:inline-block;color:blue;font-weight:600;'  id='"
                    html += base_name4
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:blue;font-weight:600;'>最小值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:blue;font-weight:600;' id='"
                    html += base_name5
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:blue;font-weight:600;'> 当前值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:blue;font-weight:600;' id='"
                    html += base_name6
                    html += "'></span>"
                    html += "</div>"
                    html += "</div>"
                    wrap.append(html);
                    var main = echarts.init(document.getElementById(div_name));
                    main.clear();
                    var base_name1 = '#'+ base_name1;
                    var base_name2 = '#'+ base_name2;
                    var base_name3 = '#'+ base_name3;
                    var base_name4 = '#'+ base_name4;
                    var base_name5 = '#'+ base_name5;
                    var base_name6 = '#'+ base_name6;
                    $(base_name1).html(data.info[i].latency_max);
                    $(base_name2).html(data.info[i].latency_min);
                    $(base_name3).html(data.info[i].latency_current);
                    $(base_name4).html(data.info[i].loss_max);
                    $(base_name5).html(data.info[i].loss_min);
                    $(base_name6).html(data.info[i].loss_current);

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
         $('#div_list').val(JSON.stringify(div_list));
            }
        })
        var radio = 60;
        interval_key = setInterval(function(){hi('abc',start_node,end_node,start_time,end_time,radio);},60000);
        $('#filter3').addClass('disabled');
    });

    function hi(url,start_node,end_node,start_time,end_time,period){
        var myDate = new Date();
        $('#draw_title').text(myDate.toLocaleString());
        var value = $('#div_list').val();
        value = JSON.parse(value);
        $.ajax({
            type: "POST",
            url: "/monitor/get_gpn_link_detail_data",
            traditional:true,
            data:add_csrf_token({
                start_node: start_node,
                end_node: end_node,
                start_time:start_time,
                end_time:end_time,
                period:period,
            }),
            beforeSend: function() {},
            success: function(data) {
                for (var i=0;i<value.length;i++){
                    var main = echarts.init(document.getElementById(value[i]));
                    main.clear();        
                    var div_name = value[i];
                            var base_name1 = div_name + 'a';
                            var base_name2 = div_name + 'b';
                            var base_name3 = div_name + 'c';
                            var base_name4 = div_name + 'd';
                            var base_name5 = div_name + 'e';
                            var base_name6 = div_name + 'f';
                            var base_name1 = '#'+ base_name1;
                            var base_name2 = '#'+ base_name2;
                            var base_name3 = '#'+ base_name3;
                            var base_name4 = '#'+ base_name4;
                            var base_name5 = '#'+ base_name5;
                            var base_name6 = '#'+ base_name6;
                            $(base_name1).html(data.info[i].latency_max);
                            $(base_name2).html(data.info[i].latency_min);
                            $(base_name3).html(data.info[i].latency_current);
                            $(base_name4).html(data.info[i].loss_max);
                            $(base_name5).html(data.info[i].loss_min);
                            $(base_name6).html(data.info[i].loss_current);

                             var colors = ['blue', 'green'];
                                    main.setOption(
                                        option = {
                                            animation:false,
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
            };
        }})
    }

    $("#start_time").datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        minView: 'hour',
        language: 'zh-CN',
        autoclose: true,
        }).on("click", function(){
            $("#start_time").datetimepicker("setEndDate",$("#end_time").val())
        }).on("changeDate",function(ev){
            var start = $('#start_time').val();
            if (start != ''){
                $('#period_60min').prop('checked',false);
            }
        });

    $("#end_time").datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        minView:'hour',
        language: 'zh-CN',
        autoclose:true,
        startDate:new Date()
        }).on("click",function(){
            $("#end_time").datetimepicker("setStartDate",$("#start_time").val())
        }).on("changeDate",function(ev){
            var end = $('#end_time').val();
            if (end != ''){
                $('#period_60min').prop('checked',false);
                }
        });
    function draw(url, start_node, end_node, start_time, end_time, period) {
        if (typeof(period) == "undefined")
        {
            period = '';
        }
        var myDate = new Date();
        $('#draw_title').text(myDate.toLocaleString());  
        $.ajax({
            type: "POST",
            url: "/monitor/get_gpn_link_detail_data",
            traditional:true,
            data:add_csrf_token({
                start_node: start_node,
                end_node: end_node,
                start_time:start_time,
                end_time:end_time,
                period:period,
            }),
            beforeSend: function() {},
            success: function(data) {
                for(var i=0;i<data.info.length;i++){
                    var wrap = $('#box');
                    var div_name = 'main'+i.toString()
                    var base_name1 = div_name + 'a';
                    var base_name2 = div_name + 'b';
                    var base_name3 = div_name + 'c';
                    var base_name4 = div_name + 'd';
                    var base_name5 = div_name + 'e';
                    var base_name6 = div_name + 'f';
                    html = ''
                    html +=  "<div class='col-md-12' style='margin-bottom:70px;margin-left:auto;marigin-right:auto;'><div class='col-md-12' id='" 
                    html += div_name
                    html += "' "+ "style='height:300px;'></div>"
                    html += "<div class='col-md-12' style='margin-top:10px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:green;font-weight:600;font-size:16px'>延迟统计</span>"
                    html += "<span style='margin-right:5px;color:green;font-weight:600;'>最大值:</span>"
                    html += "<span style='width:60px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name1
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'>最小值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:green;font-weight:600;'  id='"
                    html += base_name2
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:green;font-weight:600;'> 当前值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:green;font-weight:600;' id='"
                    html += base_name3
                    html += "'></span>"
                    html += "</div>"
                    html += "<div class='col-md-12' style='margin-top:5px;text-align:left;margin-left:80px' >"
                    html += "<span style='margin-right:20px;color:blue;font-weight:600;font-size:16px'>丢包统计</span>"
                    html += "<span style='margin-right:5px;color:blue;font-weight:600;'>最大值:</span>"
                     html += "<span style='width:60px;display:inline-block;color:blue;font-weight:600;'  id='"
                    html += base_name4
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:blue;font-weight:600;'>最小值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:blue;font-weight:600;' id='"
                    html += base_name5
                    html += "'></span>"
                    html += "<span style='margin-left:20px;color:blue;font-weight:600;'> 当前值:</span>"
                    html += "<span style='margin-left:5px;width:60px;display:inline-block;color:blue;font-weight:600;' id='"
                    html += base_name6
                    html += "'></span>"
                    html += "</div>"
                    html += "</div>"
             
                    wrap.append(html);
                    var main = echarts.init(document.getElementById(div_name));
                    main.clear();
                    var base_name1 = '#'+ base_name1;
                    var base_name2 = '#'+ base_name2;
                    var base_name3 = '#'+ base_name3;
                    var base_name4 = '#'+ base_name4;
                    var base_name5 = '#'+ base_name5;
                    var base_name6 = '#'+ base_name6;
                    $(base_name1).html(data.info[i].latency_max);
                    $(base_name2).html(data.info[i].latency_min);
                    $(base_name3).html(data.info[i].latency_current);
                    $(base_name4).html(data.info[i].loss_max);
                    $(base_name5).html(data.info[i].loss_min);
                    $(base_name6).html(data.info[i].loss_current);

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
                                    //max: 25,
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
                                    //max: 250,
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
