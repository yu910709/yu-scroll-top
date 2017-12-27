/**
 * @param {object[]} option
 * @param {number} [option[].zIndex = 98] - the index of dom
 * @param {string} [option[].icon = ''] - the icon of dom if you had use iconfont in you project
 * @param {string} [option[].shape = 'circle'] - the shape of dom , accept 'circle' 'square' & 'rounded-rectangle'
 * @param {string} [option[].background = 'rgba(0,0,0,.6)'] - background of the dom
 * @param {string} [option[].color = '#ffffff'] - color of the dom
 * @param {string} [option[].text = '返回 </br> 顶部'] - text of the dom
 * @param {boolean} [option[].hover = false] - if you set up icon and text you can switch on the hover effect
 * @param {boolean} [option[].btnLike = false] - if you want the dom to looks like a btn
 * @param {boolean} [option[].animation = true] - if you want the animation of scroll
 * @param {number} [option[].distance = 50] - when should show dom , the scroll distance of screen
 * @param {boolean} [option[].correct = false] - should we correct the Width to height ratio as 1:1
 * @param {object[]} [option[].position = {right:'15px',bottom:'15px'}] - the position of dom
 * @param {string} [option[].position[].top = ''] - position top of the dom
 * @param {string} [option[].position[].bottom = '15px'] - position bottom of the dom
 * @param {string} [option[].position[].left = ''] - position left of the dom
 * @param {string} [option[].position[].right = '15px'] - position right of the dom
 * @param {callback} [option[].ready] - before scroll
 * @param {callback} [option[].callback] - after scroll
 */
import '../css/plugin.scss';
import color from 'color';
class Plugin {
    constructor(props){
        this.option = props;
        this.init()
    }

    /**
     * @description 初始化
     */
    init(){
        /**
         * @description 参数合理性判断
         * @type {Set<string>}
         */
        let allowParams = new Set(['zIndex','icon','shape','background','color','text','hover','btnLike','correct','position','animation','distance','ready','callback']);
        let userParams = new Set();
        for (let i in this.option) {
            userParams.add(i)
        }
        let difference = new Set([...userParams].filter(x => !allowParams.has(x)));//计算用户的参数和允许参数的差集
        if (difference.size > 0) {//有未定的参数键值对
            console.warn(`'${Array.from(difference)}' are not allowed , param 'option' can only accept these configuration : '${Array.from(allowParams)}' -- yu-scroll-top`)
        }

        /**
         * @description 无参数初始化参数
         */
        if(!this.option || JSON.stringify(this.option) === "{}"){
            this.option = {
                zIndex:'',
                icon:'',
                shape:'',
                background:'',
                color:'',
                text:'返回 </br> 顶部',
                hover:false,
                btnLike:false,
                animation:true,
                distance:50,
                correct:false,
                position:{},
                ready(){},
                callback(){}
            }
        }

        /**
         * @description 构建DOM
         * @type {string}
         */
        //icon
        let icon = (this.option.icon)?`<i class="iconfont icon-${this.option.icon}"></i>`:'';
        //text
        let text = (this.option.text)?`<i class="text">${this.option.text}</i>`:'';
        //构建基本DOM
        const domScroll = document.createElement('section');
        domScroll.id = 'scrollTop';
        domScroll.innerHTML = `
           ${icon}
           ${text}
       `;
        //有icon也有文字的情况
        if(this.option.icon && this.option.text){
            if(this.option.hover){
                domScroll.classList.add('hover');
            }else{
                domScroll.innerHTML = `
                    <div class="inner">
                        ${icon}
                        ${text}
                    </div>
                `;
                domScroll.classList.add('withText');
            }
        }
        //hover效果警告
        if(this.option.hover && (!this.option.icon || !this.option.text)){
            console.warn(`if you want the hover effect, you should both set icon & text`)
        }
        //是否看上去像是个btn
        if(this.option.btnLike){
            domScroll.classList.add('btnLike');
            if(this.option.shape !== 'rounded-rectangle'){
                console.warn(`BtnLike has the best effect only if option.shape was rounded-rectangle`)
            }
            if(this.option.background){
                domScroll.style.boxShadow = `${color(this.option.background).lighten(0.2)} 3px 3px 0`
            }
        }
        //变化zindex
        domScroll.style.zIndex = (this.option.zIndex)?this.option.zIndex:'';
        //变化背景色
        domScroll.style.background = (this.option.background)?this.option.background:'';
        //变化字体颜色
        domScroll.style.color = (this.option.color)?this.option.color:'';
        //hover 形状
        if(this.option.shape){
            switch (this.option.shape){
                case 'circle':
                    domScroll.style.borderRadius = '50%';
                    break;
                case 'square':
                    domScroll.style.borderRadius = '0px';
                    break;
                case 'rounded-rectangle':
                    domScroll.style.borderRadius = '10px';
                    break;
                default:
                    domScroll.style.borderRadius = '50%';
                    break;

            }
        }
        //位置
        if(this.option.position){
            for(let index in this.option.position){
                if((index === 'top')||(index === 'bottom')||(index === 'left')||(index === 'right')){
                    domScroll.style[index] = this.option.position[index];
                }else{
                    console.warn(`您输入的参数${index}:${this.option.position[index]}不被支持，目前只支持top,bottom,left,right四个方向 -- yu-scroll-top`)
                }
            }
        }
        //加入DOM
        document.querySelector('body').appendChild(domScroll);
        //重新设置宽高
        if(this.option.correct){
            setTimeout(function () {
                if(domScroll.clientWidth>domScroll.clientHeight){
                    domScroll.style.height = `${domScroll.clientWidth}px`
                }else if (domScroll.clientWidth<domScroll.clientHeight){
                    domScroll.style.width = `${domScroll.clientHeight}px`
                }
            },1000)
        }
        //scroll动画效果
        if(this.option.animation || this.option.animation===undefined){
            let _this = this;
            domScroll.addEventListener( "click", function () {
                if(_this.option.ready){
                    _this.option.ready();
                }
                let scrollToptimer = setInterval(function () {
                    let top = document.body.scrollTop || document.documentElement.scrollTop;
                    let speed = top / 4;
                    if (document.body.scrollTop!==0) {
                        document.body.scrollTop -= speed;
                    }else {
                        document.documentElement.scrollTop -= speed;
                    }
                    if (top === 0) {
                        if(_this.option.callback){
                            _this.option.callback();
                        }
                        clearInterval(scrollToptimer);
                    }
                }, 30);
            });
        }else{
            domScroll.addEventListener( "click", function () {
                if(_this.option.ready){
                    _this.option.ready();
                }
                scrollTo(0,0)
                setTimeout(function () {
                    if(_this.option.callback){
                        _this.option.callback();
                    }
                },100)
            });
        }
        //何时显示DOM
        let _this = this;
        if((_this.option.distance !== 0) && (_this.option.distance !== undefined)){
            domScroll.classList.add('hidden');
        }
        window.addEventListener('scroll',function(){
            if(window.scrollY > _this.option.distance){
                domScroll.classList.remove('hidden')
            }else{
                if((_this.option.distance !== 0) && (_this.option.distance !== undefined)){
                    domScroll.classList.add('hidden')
                }
            }
        })
    };
}

export default Plugin;
