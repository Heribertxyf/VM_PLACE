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



