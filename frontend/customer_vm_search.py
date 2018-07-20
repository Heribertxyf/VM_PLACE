# -*- coding: utf-8 -*-
from views import *
from vm_place.conf import CONFIG


def index(request):
    data = {}
    return render(request, "frontend/customer_vm_place.html", data)


@csrf_exempt
def do_search(request):
    url = "%s/client_vms_place?size=%s&page=%s&search=%s" % (CONFIG.CMDB, request.GET.get('size'),request.GET.get('page'),request.GET.get('search'))
    body = {"client_name": request.GET.get('customer')}
    data = post_API(url, body)
    return render_json(data)
