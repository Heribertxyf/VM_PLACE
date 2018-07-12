# -*- coding: utf-8 -*-
from views import *


@csrf_exempt
def do_search(request):
    customer_name = request.GET.get('customer')
    page = request.GET.get('page')
    size = request.GET.get('size')
    search = request.GET.get('search')
    print "!!!!!!!!!!"
    if customer_name == "asdf":
        customer_vm_info = {"data": [[1, "asdf", "POD16-CLU04-H001"]], "total": 1, "size": "10", "page": "1", "error_msg": ""}
        data = customer_vm_info
    elif customer_name:
        data = {"error_msg": "没有找到客户", "data": [], "total": 0, "size": size, "page": page, "search": search}
    else:
        data = {"error_msg": "输入为空，请重新输入", "data": [], "total": 0, "size": size, "page": page, "search": search}
    print data
    return render_json(data)
