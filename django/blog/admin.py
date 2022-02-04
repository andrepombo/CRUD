from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('sobrenome', 'id', 'status', 'slug', 'author')
    prepopulated_fields = {'slug': ('sobrenome',), }


admin.site.register(models.Category)
