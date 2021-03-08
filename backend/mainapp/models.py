from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50, verbose_name="用户名")
    password = models.CharField(max_length=50, verbose_name="密码")


class Map(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="img")
