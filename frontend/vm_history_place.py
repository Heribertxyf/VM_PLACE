# -*- coding: utf-8 -*-
from views import *


def index(request):
    data = {}
    # return render(request, "frontend/vm_place_history.html", data)
    # return render(request, "frontend/customer_vm_place.html", data)
    return render(request, "frontend/table_page.html", data)
    # return render(request, "frontend/end.html", data)


@csrf_exempt
def vm_place_search(request):
    vm_place_info = {"asdf": {"1": "POD16-CLU01-H003", "2": "POD16-CLU01-H001"}, "aaaa": {"1": "POD09-CLU02-H006", "2": "POD09-CLU02-H005"}}
    vm_name = request.POST.get('vm_name')
    if vm_name in vm_place_info.keys():
        data = {'vm_place': vm_place_info[vm_name], "error_msg": ""}
    elif vm_name:
        data = {"error_msg": "没有找到VM", "vm_place": {}}
    else:
        data = {"error_msg": "输入为空，请重新输入", "vm_place": {}}
    return render_json(data)


@csrf_exempt
def do_search(request):
    vm_place_info = {"asdf": {"1": "POD16-CLU01-H003", "2": "POD16-CLU01-H001"}, "aaaa": {"1": "POD09-CLU02-H006", "2": "POD09-CLU02-H005"}}
    vm_name = request.GET['vm_name']
    if vm_name in vm_place_info.keys():
        data = {'status': True, 'vm_place': vm_place_info[vm_name], "error_msg": "", "vm_name": vm_name}
    elif vm_name:
        data = {'status': False, "error_msg": "没有找到VM", "vm_name": vm_name}
    else:
        data = {'status': False, "error_msg": "输入为空，请重新输入"}
    return render(request, "frontend/end.html", data)


