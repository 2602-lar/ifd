
from django.contrib import admin
from django.urls import path, include
from .views import MyTokenObtainPairView
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'add-user', views.UserViewSet, basename='add-user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('ifd/', views.image_operation, name = 'ifd'),
    path('user/', include(router.urls)),
]
