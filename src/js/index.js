    //轮播图

    var swiper = new Swiper('.swiper-container1', {

        effect: 'fade',
        //5秒轮播一次
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        loop: true, // 循环模式选项
        pagination: {
            el: '.swiper-pagination1',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    //鼠标覆盖停止自动切换
    swiper.el.onmouseover = function () {
        swiper.autoplay.stop();
    }

    //鼠标离开开始自动切换
    swiper.el.onmouseout = function () {
        swiper.autoplay.start();
    }


    //上面那个选项卡
    $('.dao-conu li').mouseenter(function () {
        $('.texiao').stop().slideDown(500, 'linear')
    })
    $('.dao-conu li').mouseleave(function () {
        $('.texiao').stop().slideUp(500, 'linear')
    })

    // //    下面那个选项卡
    var xxk = document.querySelectorAll('.xxk')
    $('.kk li:eq(0)').mouseenter(function () {
        $('.xxk').show()

    })
    $('.kk li:eq(0)').mouseleave(function () {
        $('.xxk').hide()
    })
    var xxk = document.querySelectorAll('.xxk')
    $('.kk li:eq(1)').mouseenter(function () {
        $('.xxk').show()
    })
    $('.kk li:eq(1)').mouseleave(function () {
        $('.xxk').hide()
    })



    //二级菜单
    // getList()

    function getList() {
        $.ajax({
            url: "../lib/nav_top.json",
            dataType: 'json',
            success: function (res) {
                // console.log(res)

                let str = ''
                res.forEach(item => {
                    str += `<li>${item.name}</li>`
                })
                // .dao-con

                $('.dao-con > ul')
                    .html(str)
                    .on({
                        mouseenter: () => $('.nav_box').stop().slideDown(),
                        mouseleave: () => $('.nav_box').stop().slideUp()
                    })
                    .children('li')
                    .on('mouseover', function () {
                        const index = $(this).index()
                        const list = res[index].list

                        let str = '';

                        list.forEach(item => {
                            str += `
                            <li>
                <div>
                    <img src="${ item.list_url }" alt=""> </div>
                    <p > ${ item.list_name }</p>  
                    <span >${ item.list_price}</span>
             
            </li>  `
                        })
                        $('.nav_box > ul').html(str)
                    })



                $('.nav_box')
                    .on({
                        mouseover: function () {
                            $(this).finish().show()
                        },
                        mouseout: function () {
                            $(this).finish().slideUp()

                        }
                    })
            }
        })
    }


     //轮播图左边选项卡
    //  getXxk()
     function getXxk(){
        $.ajax({
            url: '../lib/two.json',
            dataType: 'json',
            success: function (res) {
                let str = ''
                res.forEach((value) => {
                    str +=
                        ` <li>${value.name}<em class="iconfont icon-arrow-right-copy-copy-copy"></em></li>`
                })
                $('.ban-con > ul').html(str)
                $('.ban-con > ul').children('li').on({
                    mouseenter: function () {
                        const index1 = $(this).index()
                        const list1 = res[index1].list
                        let str1 = ""
                        list1.forEach((item) => {
                            str1 += `<li>
                                <h2>
                    <img src="${item.src}" alt=""></h2>
                    <h3>${item.title}</h3>
                </li>`
                        })
                        $('.xxk').show()
                        $('.xxk>ul').html(str1)
                    },
                    mouseleave: function () {
    
                        $('.xxk').hide()
                       
                    }
                })
    
            }
        })
     }
    


    
        //倒计时抢购
        // function a(n) { //当为0时在前面补一个0
        //     return n < 10 ? "0" + n : n;
        // }
        // let future_time = new Date('2020-3-3 20:42:30');

        // function print_time() {
        //     let now_time = new Date(); //现在时间
        //     let remaining_time = Math.ceil((future_time - now_time) / 1000); //时间差
        //     let nums = $(".time>span"); //获取三个显示位置
        //     if (remaining_time >= 0) { //时间大于0
        //         var hour = Math.floor(remaining_time / 3600); //获得时
        //         var min = Math.floor(remaining_time % 3600 / 60); //获得分
        //         var sec = remaining_time % 60; //获得秒
        //     } else { //时间小于0
        //         for (let i = 0; i < nums.length; i++) {
        //             nums[i].innerText = "00";
        //         }
        //         clearInterval(timer); //清除定时器
        //     }
        //     console.log($(".time>span").eq(0));
        //     $(".time>span").eq(0).text(`${a(hour)}`);
        //     $(".time>span").eq(1).text(`${a(min)}`)
        //     $(".time>span").eq(2).text(`${a(sec)}`)
        // }
        // let timer = setInterval(print_time, 1000);