# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
# Create your views here.

def render_json(data, status=200):
    return HttpResponse(json.dumps(data), content_type="text/json", status=status)





