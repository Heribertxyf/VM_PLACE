# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
import requests
# Create your views here.

def render_json(data, status=200):
    return HttpResponse(json.dumps(data), content_type="text/json", status=status)

def index(request):
    data = {}
    return render(request, "frontend/common.html", data)

def post_API(url,body):
    try:
        # info = requests.post(url,data=d, auth=('prada001', 'lovecapitalonline20180301prada'))
        info = requests.post(url,data=body)
        result = json.loads(info.text)
        return result
    except Exception, e:
        return ''





