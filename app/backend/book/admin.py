from django.contrib import admin
from .models import Book, Comment, BookList

class CommentAdmin(admin.ModelAdmin):
    fields = ('text', 'book', 'author')

admin.site.register(Book)
admin.site.register(Comment, CommentAdmin)
admin.site.register(BookList)
