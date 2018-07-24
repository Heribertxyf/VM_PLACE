# -*- coding: utf-8 -*-
from views import *
from vm_place.conf import CONFIG

def input_site(request):
    data = {}
    return render(request, "frontend/input_site.html", data)


def input_vc(request):
    data = {}
    return render(request, "frontend/input_vc.html", data)


@csrf_exempt
def do_search(request):
    vm_name = request.POST.get('vm_name')
    body = {"vm_name": vm_name}
    url = "%s/history_place" % CONFIG.CMDB
    data = post_API(url, body)
    return render_json(data)