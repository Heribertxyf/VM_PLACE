# -*- coding: utf-8 -*-
from views import *


def index(request):
    data = {}
    return render(request, "frontend/customer_vm_place.html", data)


@csrf_exempt
def do_search(request):
    url = "http://127.0.0.1:8080/client_vms_place?size=%s&page=%s&search=%s" % (request.GET.get('size'),request.GET.get('page'),request.GET.get('search'))
    body = {"client_name": request.GET.get('customer')}
    data = post_API(url, body)
    return render_json(data)
