$(function () {
    $('#loginFrom').validate({
        rules: {
            username: {
                required: true,
                minlength: 5
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm: {
                equalTo: "#password"
            }

        },

        showErrors: function (errorMap, errorList) {
            if (errorList.length != 0) {
                $(".err").empty().text(errorList[0].message);
            }
        },
        messages: {
            username: {
                required: "请输入用户名",
                minlength: "用户名必需由五个字母组成"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            },
            confirm: {
                required: "请确认密码",
                equalTo: "两次密码输入不一致"
            }

        },
        onfocusout: false,
        errorPlacement: function (error, element) {
            error.appendTo($('.err'))
        },
        submitHandler:function(form){
        //    $.post('/login',$(form).serialize(),res=>{
        //        console.log(res)
        //    })
        $.ajax({
            url:'/register',
            type:'post',
            data:$(form).serialize(),
            success:function(res){
                if(res=="1"){
                    window.location="http://localhost:8080/pages/login.html"
                }
            },
            error:function(res){
                console.log(res)
            }
        })
        }
        

    })

})