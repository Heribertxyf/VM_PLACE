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
from frontend import vm_history_place, customer_vm_search

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', vm_history_place.index),
    url(r'^search/$', vm_history_place.vm_place_search),
    url(r'^do_search/$', vm_history_place.do_search),
    url(r'^customer_vm_search/$', customer_vm_search.do_search),


]