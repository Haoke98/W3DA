import json

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from .models import User


@csrf_exempt
def login(request):
    result = {'err_msg': "ok"}
    print(request.GET, request.POST, request.body)
    data_json = json.loads(request.body)
    _username = data_json['username']
    _password = data_json['password']
    curr_user = User.objects.filter(username=_username)
    if curr_user:
        if curr_user.password == _password:
            print("该用户登陆成功！")
            request.session.setdefault("curr_user", curr_user)
        else:
            result['err_msg'] = "用户名与密码不匹配！"
    else:
        result['err_msg'] = "该用户还没注册过！"
    return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")  # 返回json


@csrf_exempt
def register(request):
    result = {'err_msg': "ok"}
    print(request.GET, request.POST, request.body)
    data_json = request.POST
    _username = data_json['username']
    _password = data_json['password']
    curr_user = User.objects.filter(username=_username)
    if curr_user:
        result['err_msg'] = "该用户已注册！"
    else:
        print("该用户注册成功！", _username)
        user = User(username=_username, password=_password)
        request.session.setdefault("curr_user", user)
        return redirect(to="/main/main.html")
    return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")  # 返回json
