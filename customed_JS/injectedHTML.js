// var fnTextPopup = function (arr, options) {
//     // arr参数是必须的
//     if (!arr || !arr.length) {
//         return;    
//     }
//     // 主逻辑
//     var index = 0;
//     document.documentElement.addEventListener('click', function (event) {
//         var x = event.pageX, y = event.pageY;
//         var eleText = document.createElement('span');
//         eleText.className = 'text-popup';
//         this.appendChild(eleText);
//         if (arr[index]) {
//             eleText.innerHTML = arr[index];
//         } else {
//             index = 0;
//             eleText.innerHTML = arr[0];
//         }
//         // 动画结束后删除自己
//         eleText.addEventListener('animationend', function () {
//             eleText.parentNode.removeChild(eleText);
//         });
//         // 位置
//         eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
//         eleText.style.top = (y - eleText.clientHeight) + 'px';
//         // index递增
//         index++;
//     });    
// };
// fnTextPopup(
// ['NB!', '喜欢！', '一键三连', 'NingoJeo', 'QQ微信加一波！', '感谢喜欢！']);


// <!-- 1、live2D看板娘信息 -->
//   <div class="pio-container left">
//     <div class="pio-action"></div>
//     <canvas id="pio" width="200" height="250"></canvas>
//   </div>
//   <link rel="stylesheet" href="/customed_CSS/pio.css">
//   <script src="/customed_JS/pio.js"></script>
//   <script src="/customed_JS/l2d.js"></script>
//   <script>
//       var pio = new Paul_Pio({
//       "mode": "fixed",
//       "tips": true,
//       "hidden": true,
//       "content": {
//           "welcome": ["欢迎来到NingoJeo的网站！", "博主有点懒，欢迎前往他的小窝阅读~"],
//       },
//       "model": [
//       "banniang/live2d-widget-models/live2d-widget-model-miku/assets/miku.model.json", //初音
//       "banniang/live2d-widget-models/live2d-widget-model-shizuku/assets/shizuku.model.json",// 萌娘
//       "banniang/live2d-widget-models/live2d-widget-model-chitose/assets/chitose.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-koharu/assets/koharu.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-haru/01/assets/haru01.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-wanko/assets/wanko.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-vert/vert_classic/vert_classic.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-nepgear_extra/nepgear_extra/nepgear_extra.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-haruto/assets/haruto.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-haru/02/assets/haru02.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-histoire/histoire/histoire.model.json",
//       "banniang/live2d-widget-models/live2d-widget-model-blanc_normal/blanc_normal/blanc_normal.model.json",
//       ]
//   });
//   </script>
//   <!-- 2、点击产生指定文字效果 -->
//   <style>
//     .text-popup {
//         animation: textPopup 1s;
//         color: red;
//         user-select: none;
//         white-space: nowrap;
//         position: absolute;
//         z-index: 99;
//     }
//     @keyframes textPopup {
//         0%, 100% {
//             opacity: 0;
//         }
//         5% {
//             opacity: 1;
//         }
//         100% {
//             transform: translateY(-50px);    
//         }
//     }
//   </style>
//   <script>
//       var fnTextPopup = function (arr, options) {
//     // arr参数是必须的
//     if (!arr || !arr.length) {
//         return;    
//     }
//     // 主逻辑
//     var index = 0;
//     document.documentElement.addEventListener('click', function (event) {
//         var x = event.pageX, y = event.pageY;
//         var eleText = document.createElement('span');
//         eleText.className = 'text-popup';
//         this.appendChild(eleText);
//         if (arr[index]) {
//             eleText.innerHTML = arr[index];
//         } else {
//             index = 0;
//             eleText.innerHTML = arr[0];
//         }
//         // 动画结束后删除自己
//         eleText.addEventListener('animationend', function () {
//             eleText.parentNode.removeChild(eleText);
//         });
//         // 位置
//         eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
//         eleText.style.top = (y - eleText.clientHeight) + 'px';
//         // index递增
//         index++;
//     });    
// };

//     fnTextPopup(
//   ['NB!', '喜欢！', '一键三连', 'NingoJeo', 'QQ微信走一波！', '感谢喜欢！']);
//   </script>
//   <!-- 3、心动特效 -->
//   <script>
//     (function(window,document,undefined){
//         var hearts = [];

//         window.requestAnimationFrame = (function(){
//             return window.requestAnimationFrame || 
//             window.webkitRequestAnimationFrame ||
//             window.mozRequestAnimationFrame ||
//             window.oRequestAnimationFrame ||
//             window.msRequestAnimationFrame ||
//             function (callback){
//                 setTimeout(callback,1000/60);
//             }
//         })();
        
//         init();

//         function init(){
//             css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
//             attachEvent();
//             gameloop();
//         }

//         function gameloop(){
//             for(var i=0;i<hearts.length;i++){
//                 if(hearts[i].alpha <=0){
//                     document.body.removeChild(hearts[i].el);
//                     hearts.splice(i,1);
//                     continue;
//                 }

//                 hearts[i].y--;
//                 hearts[i].scale += 0.004;
//                 hearts[i].alpha -= 0.013;
//                 hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
//             }

//             requestAnimationFrame(gameloop);
//         }

//         function attachEvent(){
//             var old = typeof window.onclick==="function" && window.onclick;
//             window.onclick = function(event){
//                 old && old();
//                 createHeart(event);
//             }
//         }

//         function createHeart(event){
//             var d = document.createElement("div");
//             d.className = "heart";
//             hearts.push({
//                 el : d,
//                 x : event.clientX - 5,
//                 y : event.clientY - 5,
//                 scale : 1,
//                 alpha : 1,
//                 color : randomColor()
//             });

//             document.body.appendChild(d);
//         }

//         function css(css){
//             var style = document.createElement("style");
//             style.type="text/css";
//             try{
//                 style.appendChild(document.createTextNode(css));
//             }
//             catch(ex){
//                 style.styleSheet.cssText = css;
//             }

//             document.getElementsByTagName('head')[0].appendChild(style);
//         }

//         function randomColor(){
//             return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
//         } 
//     })(window,document);

//   </script>


// </body>
// </html>



// // 心动特效
// (function (window, document, undefined) {
//     var hearts = [];
//     window.requestAnimationFrame = (function () {
//         return window.requestAnimationFrame ||
//             window.webkitRequestAnimationFrame ||
//             window.mozRequestAnimationFrame ||
//             window.oRequestAnimationFrame ||
//             window.msRequestAnimationFrame ||
//             function (callback) {
//                 setTimeout(callback, 1000 / 60);
//             }
//     })();
//     init();

//     function init() {
//         css(
//             ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
//         );
//         attachEvent();
//         gameloop();
//     }

//     function gameloop() {
//         for (var i = 0; i < hearts.length; i++) {
//             if (hearts[i].alpha <= 0) {
//                 document.body.removeChild(hearts[i].el);
//                 hearts.splice(i, 1);
//                 continue;
//             }
//             hearts[i].y--;
//             hearts[i].scale += 0.004;
//             hearts[i].alpha -= 0.013;
//             hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i]
//                 .alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale +
//                 ") rotate(45deg);background:" + hearts[i].color;
//         }
//         requestAnimationFrame(gameloop);
//     }

//     function attachEvent() {
//         var old = typeof window.onclick === "function" && window.onclick;
//         window.onclick = function (event) {
//             old && old();
//             createHeart(event);
//         }
//     }

//     function createHeart(event) {
//         var d = document.createElement("div");
//         d.className = "heart";
//         hearts.push({
//             el: d,
//             x: event.clientX - 5,
//             y: event.clientY - 5,
//             scale: 1,
//             alpha: 1,
//             color: randomColor()
//         });
//         document.body.appendChild(d);
//     }

//     function css(css) {
//         var style = document.createElement("style");
//         style.type = "text/css";
//         try {
//             style.appendChild(document.createTextNode(css));
//         } catch (ex) {
//             style.styleSheet.cssText = css;
//         }
//         document.getElementsByTagName('head')[0].appendChild(style);
//     }

//     function randomColor() {
//         return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) +
//             ")";
//     }
// })(window, document);


