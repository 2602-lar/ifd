
from django.contrib import admin
from django.urls import path
from .views import MyTokenObtainPairView
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('ifd/', views.image_operation, name = 'ifd')
]
