$(function () {
  $("#link_reg").on("click", function () {
    $(".reg_box").hide();
    $(".login_box").show();
  });
  $("#link_login").on("click", function () {
    $(".reg_box").show();
    $(".login_box").hide();
  });
  //   表单输入内容的预验证
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var val = $(".reg_box [name=password]").val();
      if (val !== value) {
        return "两次密码不一致！";
      }
    },
  });
  //   监听注册提交事件通过接口提交给服务器
  var layer = layui.layer;
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "http://www.liulongbin.top:3007/api/reguser",
      {
        username: $(".reg_box [name=username]").val(),
        password: $(".reg_box [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功！");
      }
    );
    $("#link_reg").click();
    // $("#form_login [name=username]").val()=09
    // $("#form_login [name=username]").val()=$(".reg_box [name=username]").val()
  });
  //   监听登录页提交事件
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "http://www.liulongbin.top:3007/api/login",
      $(this).serialize(),
      function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败！");
        }
        layer.msg("登录成功！");

        localStorage.setItem("token", res.token);
        setTimeout(function () {
          location.href = "./index.html";
        }, 2000);
      }
    );
  });
});
