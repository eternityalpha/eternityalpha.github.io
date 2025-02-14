/* ----
# Pio Plugin
# By: Dreamer-Paul
# Last Update: 2021.3.3

# 一个支持更换 Live2D 模型的 Typecho 插件。
---- */

// 主函数，接受配置对象 prop
var Paul_Pio = function (prop) {
    var that = this; // 保存当前上下文

    // 当前状态和 DOM 元素
    var current = {
        idol: 0, // 当前模型索引
        menu: document.querySelector(".pio-container .pio-action"), // 操作按钮容器
        canvas: document.getElementById("pio"), // Live2D 模型容器
        body: document.querySelector(".pio-container"), // 插件根容器
        root: document.location.protocol + '//' + document.location.hostname + '/' // 网站根 URL
    };

    /* - 方法模块 */
    var modules = {
        // 切换模型
        idol: function () {
            current.idol < (prop.model.length - 1) ? current.idol++ : current.idol = 0; // 循环切换模型
            return current.idol;
        },

        // 创建 DOM 元素
        create: function (tag, prop) {
            var e = document.createElement(tag); // 创建元素
            if (prop.class) e.className = prop.class; // 添加类名
            return e;
        },

        // 从数组中随机选择一个元素
        rand: function (arr) {
            return arr[Math.floor(Math.random() * (arr.length - 1))];
        },

        // 创建并显示对话框
        render: function (text) {
            if (text.constructor === Array) {
                dialog.innerText = modules.rand(text); // 如果是数组，随机选择一个元素
            } else if (text.constructor === String) {
                dialog.innerText = text; // 如果是字符串，直接显示
            }
            dialog.classList.add("active"); // 显示对话框
            clearTimeout(this.t); // 清除之前的定时器
            this.t = setTimeout(function () {
                dialog.classList.remove("active"); // 3 秒后隐藏对话框
            }, 3000);
        },

        // 销毁插件
        destroy: function () {
            that.initHidden(); // 初始化隐藏状态
            localStorage.setItem("posterGirl", 0); // 保存状态到 localStorage
        },

        // 检测是否为移动设备
        isMobile: function () {
            var ua = window.navigator.userAgent.toLowerCase(); // 获取用户代理
            ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios"); // 检测是否为移动设备
            return window.innerWidth < 500 || ua !== -1; // 返回检测结果
        }
    };
    this.destroy = modules.destroy; // 暴露销毁方法

    // 创建操作按钮
    var elements = {
        home: modules.create("span", { class: "pio-home" }), // 首页按钮
        skin: modules.create("span", { class: "pio-skin" }), // 切换模型按钮
        info: modules.create("span", { class: "pio-info" }), // 信息按钮
        sentence: modules.create("span", { class: "pio-sentence" }), // 句子按钮
        close: modules.create("span", { class: "pio-close" }), // 关闭按钮
        show: modules.create("div", { class: "pio-show" }) // 显示按钮
    };

    // 创建对话框
    var dialog = modules.create("div", { class: "pio-dialog" });
    current.body.appendChild(dialog); // 添加到插件容器
    current.body.appendChild(elements.show); // 添加显示按钮

    /* - 提示操作模块 */
    var action = {
        // 显示欢迎信息
        welcome: function () {
            if (document.referrer !== "" && document.referrer.indexOf(current.root) === -1) {
                // 如果来自其他网站
                var referrer = document.createElement('a');
                referrer.href = document.referrer;
                prop.content.referer ? modules.render(prop.content.referer.replace(/%t/, "“" + referrer.hostname + "”")) : modules.render("欢迎来自 “" + referrer.hostname + "” 的朋友！");
            } else if (prop.tips) {
                // 根据时间显示问候语
                var text, hour = new Date().getHours();
                if (hour > 22 || hour <= 5) {
                    text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
                } else if (hour > 5 && hour <= 8) {
                    text = '早上好！';
                } else if (hour > 8 && hour <= 11) {
                    text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
                } else if (hour > 11 && hour <= 14) {
                    text = '中午了，工作了一个上午，现在是午餐时间！';
                } else if (hour > 14 && hour <= 17) {
                    text = '午后很容易犯困呢，今天的运动目标完成了吗？';
                } else if (hour > 17 && hour <= 19) {
                    text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
                } else if (hour > 19 && hour <= 21) {
                    text = '晚上好，今天过得怎么样？';
                } else if (hour > 21 && hour <= 23) {
                    text = '已经这么晚了呀，早点休息吧，晚安~';
                } else {
                    text = "奇趣保罗说：这个是无法被触发的吧，哈哈";
                }
                modules.render(text); // 显示问候语
            } else {
                modules.render(prop.content.welcome || "欢迎来到本站！"); // 显示默认欢迎信息
            }
        },

        // 处理模型点击事件
        touch: function () {
            current.canvas.onclick = function () {
                modules.render(prop.content.touch || ["你在干什么？", "干嘛动我呀！小心我咬你！", "非礼呀！救命！", "再摸的话我可要报警了⌇●﹏●⌇", "是···是不小心碰到了吧~~~", "110 吗，这里有个变态一直在摸我(ó﹏ò)", "HENTAI!", "不可以这样欺负我啦！", "萝莉控是什么呀？", "你看到我的小熊了吗？"]);
            };
        },

        // 绑定操作按钮事件
        buttons: function () {
            // 首页按钮
            elements.home.onclick = function () {
                location.href = current.root; // 跳转到首页
            };
            elements.home.onmouseover = function () {
                modules.render(prop.content.home || "点击这里回到首页！"); // 显示提示信息
            };
            current.menu.appendChild(elements.home); // 添加到菜单

            // 切换模型按钮
            elements.skin.onclick = function () {
                loadlive2d("pio", prop.model[modules.idol()]); // 加载新模型
                prop.content.skin && prop.content.skin[1] ? modules.render(prop.content.skin[1]) : modules.render("新衣服真漂亮~"); // 显示提示信息
            };
            elements.skin.onmouseover = function () {
                prop.content.skin && prop.content.skin[0] ? modules.render(prop.content.skin[0]) : modules.render("想看看我的新衣服吗？"); // 显示提示信息
            };
            if (prop.model.length > 1) current.menu.appendChild(elements.skin); // 如果有多个模型，添加按钮

            // 信息按钮
            elements.info.onclick = function () {
                window.open("https://space.bilibili.com/95900646"); // 打开 B 站页面
            };
            elements.info.onmouseover = function () {
                modules.render("想了解更多关于我的信息吗？"); // 显示提示信息
            };
            current.menu.appendChild(elements.info); // 添加到菜单

            // 句子按钮
            elements.sentence.onclick = function () {
                // 从 API 获取“一言”
                fetch('https://v1.hitokoto.cn')
                    .then(response => response.json())
                    .then(data => {
                        const hitokoto = document.querySelector('.pio-dialog');
                        hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid;
                        hitokoto.innerText = data.hitokoto;
                    })
                    .catch(console.error);
            };
            elements.sentence.onmouseover = function () {
                modules.render("我从青蛙王子那里听到了不少人生经验。"); // 显示提示信息
            };
            current.menu.appendChild(elements.sentence); // 添加到菜单

            // 关闭按钮
            elements.close.onclick = function () {
                modules.destroy(); // 销毁插件
            };
            elements.close.onmouseover = function () {
                modules.render(prop.content.close || "QWQ 下次再见吧~"); // 显示提示信息
            };
            current.menu.appendChild(elements.close); // 添加到菜单
        },

        // 处理自定义内容
        custom: function () {
            prop.content.custom.forEach(function (t) {
                if (!t.type) t.type = "default"; // 默认类型
                var e = document.querySelectorAll(t.selector); // 获取目标元素

                if (e.length) {
                    for (var j = 0; j < e.length; j++) {
                        if (t.type === "read") {
                            // 阅读类型
                            e[j].onmouseover = function () {
                                modules.render("想阅读 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            };
                        } else if (t.type === "link") {
                            // 链接类型
                            e[j].onmouseover = function () {
                                modules.render("想了解一下 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            };
                        } else if (t.text) {
                            // 自定义文本
                            e[j].onmouseover = function () {
                                modules.render(t.text);
                            };
                        }
                    }
                }
            });
        }
    };

    /* - 运行模块 */
    var begin = {
        // 静态模式
        static: function () {
            current.body.classList.add("static"); // 添加静态类
        },

        // 固定模式
        fixed: function () {
            action.touch(); // 绑定触摸事件
            action.buttons(); // 绑定按钮事件
        },

        // 可拖动模式
        draggable: function () {
            action.touch(); // 绑定触摸事件
            action.buttons(); // 绑定按钮事件

            var body = current.body;
            body.onmousedown = function (downEvent) {
                var location = {
                    x: downEvent.clientX - this.offsetLeft, // 计算初始 X 坐标
                    y: downEvent.clientY - this.offsetTop // 计算初始 Y 坐标
                };

                function move(moveEvent) {
                    body.classList.add("active"); // 添加活动类
                    body.classList.remove("right"); // 移除右侧类
                    body.style.left = (moveEvent.clientX - location.x) + 'px'; // 更新 X 坐标
                    body.style.top = (moveEvent.clientY - location.y) + 'px'; // 更新 Y 坐标
                    body.style.bottom = "auto"; // 取消底部定位
                }

                document.addEventListener("mousemove", move); // 绑定移动事件
                document.addEventListener("mouseup", function () {
                    body.classList.remove("active"); // 移除活动类
                    document.removeEventListener("mousemove", move); // 解绑移动事件
                });
            };
        }
    };

    // 初始化插件
    this.init = function (onlyText) {
        if (!(prop.hidden && modules.isMobile())) { // 如果不是移动设备或未隐藏
            if (!onlyText) {
                action.welcome(); // 显示欢迎信息
                loadlive2d("pio", prop.model[Math.floor(Math.random() * (prop.model.length))]); // 随机加载模型
            }

            // 根据模式初始化
            switch (prop.mode) {
                case "static": begin.static(); break;
                case "fixed": begin.fixed(); break;
                case "draggable": begin.draggable(); break;
            }

            if (prop.content.custom) action.custom(); // 处理自定义内容
        }
    };

    // 初始化隐藏状态
    this.initHidden = function () {
        current.body.classList.add("hidden"); // 添加隐藏类
        dialog.classList.remove("active"); // 隐藏对话框

        // 点击显示按钮时重新初始化
        elements.show.onclick = function () {
            current.body.classList.remove("hidden"); // 移除隐藏类
            localStorage.setItem("posterGirl", 1); // 保存状态到 localStorage
            that.init(); // 重新初始化
        };
    };

    // 根据 localStorage 状态初始化
    localStorage.getItem("posterGirl") == 0 ? this.initHidden() : this.init();
};

