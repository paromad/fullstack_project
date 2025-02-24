from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Book(models.Model):
    title = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    annotation = models.CharField(max_length=1000)
    image = models.ImageField(upload_to='book_images', blank=True)

    def __str__(self) -> str:
        return self.title

class Comment(models.Model):
    text = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    create_date = models.DateTimeField(default=datetime.now)

    def __str__(self) -> str:
        return self.text

class BookList(models.Model):
    name = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="book_list_author")
    books = models.ManyToManyField(Book)

    def __str__(self) -> str:
        return self.name
