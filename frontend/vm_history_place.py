# -*- coding: utf-8 -*-
from views import *


def index(request):
    data = {}
    return render(request, "frontend/vm_place_history.html", data)


@csrf_exempt
def do_search(request):
    vm_name = request.POST.get('vm_name')
    body = {"vm_name": vm_name}
    url = "http://127.0.0.1:8080/history_place"
    data = post_API(url, body)
    return render_json(data)
