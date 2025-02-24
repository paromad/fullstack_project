from django.urls import path
from .views import index, BookViewSet, CommentViewSet, BookListViewSet

urlpatterns = [
    path('', index)
]