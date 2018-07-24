# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from vm_place.conf import CONFIG
from views import post_API
from django.test import TestCase

# Create your tests here.

def post_test_host():
    a = {"POD09-CLU01-H001": True, "POD09-CLU01-H002": False}
    b = json.dumps(a)
    data = {"data": b}
    url = "%s/update_host_status" % CONFIG.CMDB
    result = post_API(url, data)
    print result

def post_test_vm():
    a = ["test"]
    data = {"host": "POD09-CLU01-H002", "vms": json.dumps(a)}
    url = "%s/update_vm_place" % CONFIG.CMDB
    result = post_API(url, data)
    print result