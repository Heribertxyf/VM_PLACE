# -*- coding: utf-8 -*-
from views import *
from vm_place.conf import CONFIG

def index(request):
    data = {}
    return render(request, "frontend/vm_place_history.html", data)


@csrf_exempt
def do_search(request):
    vm_name = request.POST.get('vm_name')
    body = {"vm_name": vm_name}
    url = "%s/history_place" % CONFIG.CMDB
    data = post_API(url, body)
    return render_json(data)


def post_test_host():
    a = ['POD09-CLU01-H001', 'POD09-CLU01-H002']
    error = json.dumps(a)
    data = {"error": error}
    url = "%s/update_host_status" % CONFIG.CMDB
    result = post_API(url, data)
    print result

def post_test_vm():
    a = ["test"]
    data = {"host": "POD09-CLU01-H002", "vms": json.dumps(a)}
    url = "%s/update_vm_place" % CONFIG.CMDB
    result = post_API(url, data)
    print result

