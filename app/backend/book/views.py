from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Book, Comment, BookList
from rest_framework import viewsets, permissions, views, response, mixins
from .serializer import UserSerializer
from .serializer import BookSerializer, BookInfoSerializer
from .serializer import CommentSerializer, CommentUpdateSerializer
from .serializer import BookListSerializer, BookListCreateSerializer

# Create your views here.

def index(request):
  books = Book.objects.all()
  return render(request, 'index.html', { 'books': books })

class UserCurrent(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return response.Response(serializer.data)

class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        return user

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().prefetch_related('comment_set')
    serializer_class = BookInfoSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return BookSerializer
        return super().get_serializer_class()

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().select_related('author')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'update':
            return CommentUpdateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

class BookListViewSet(viewsets.ModelViewSet, mixins.UpdateModelMixin):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return BookListCreateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
    
    def perform_update(self, serializer):
        instance = self.get_object()
        self.request.data.get("book_id", None)
        return serializer.save(author=self.request.user)
