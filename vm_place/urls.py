"""vm_place URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from frontend import views, vm_history_place, customer_vm_search, input_base_data

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^vm_history/$', vm_history_place.index),
    url(r'^vm_history_search/$', vm_history_place.do_search),
    url(r'^customer_vms/$', customer_vm_search.index),
    url(r'^customer_vms_search/$', customer_vm_search.do_search),
    url(r'^input/site$', input_base_data.input_site),
    url(r'^input/vc$', input_base_data.input_vc),


]
