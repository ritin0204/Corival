"""myProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path ,include, re_path
from django.conf.urls.static import static
from django.conf import settings
from corival import views
from django.views.generic import TemplateView

urlpatterns = [
    path('',include('corival.urls')),
    path('csrf/', views.csrf, name='csrf'),
    path('admin/', admin.site.urls),
    re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html')),
]


urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
