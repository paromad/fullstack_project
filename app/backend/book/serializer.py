from rest_framework import serializers
from .models import Book, Comment, BookList
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class BookSerializer(serializers.ModelSerializer):
    last_comment = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    def get_last_comment(self, obj):
        last_comment = Comment.objects.filter(book_id=obj.id).last()
        if not last_comment:
            return ''
        return last_comment.text
    
    def get_comments_count(self, obj):
        return Comment.objects.filter(book_id=obj.id).count()

    class Meta:
        model = Book
        fields = ['id', 'title', 'year', 'author', 'annotation', 'image', 'last_comment', 'comments_count']

class CommentSerializer(serializers.ModelSerializer):
    book_title = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)

    def get_book_title(self, obj):
        return Book.objects.get(id=obj.book.id).title

    class Meta:
        model = Comment
        fields = ['id', 'text', 'book_title', 'book', 'author', 'create_date']
        read_only_fields = ('create_date',)

class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text']

class BookInfoSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Book
        fields = ['id', 'title', 'year', 'author', 'annotation', 'image', 'comment_set']

class BookListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    books = BookSerializer(many=True)

    class Meta:
        model = BookList
        fields = ['id', 'name', 'author', 'books']

class BookListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookList
        fields = ['id', 'name', 'author', 'books']
        read_only_fields = ('author',)
