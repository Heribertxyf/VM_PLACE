function add_csrf_token(data) {
    data["csrfmiddlewaretoken"] = get_csrf_token();
    return data;
}
function get_csrf_token(){
    return $("input[name='csrfmiddlewaretoken']").val();
}
function get_prada_addr(){
    return 'http://10.128.100.183:8009';
}
