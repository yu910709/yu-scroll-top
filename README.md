## Introduce
this script builds a DOM that can be clicked back to the top of the page

## Quick to start
Using npm:
```shell
$ npm install --save yu-scroll-top
$ import ScrollTop from 'yu-scroll-top'
```

## Example
You can use `npm run dev` to check the example file in node package
```js
ScrollTop({
            zIndex:999,
            icon:'rocket',
            shape:'rounded-rectangle',
            background:'lightsalmon',
            color:'lightgreen',
            text:'click </br> to </br> the top',
            hover:true,
            btnLike:true,
            animation:false,
            distance:0,
            correct:true,
            position:{
                right:'80px',
                bottom:'80px',
            },
            ready(){
                console.log('ready to scroll')
            },
            callback(){
                console.log('scroll over')
            }
        })
```

## JSDoc
```jsdoc
 * @param {object[]} option
 * @param {number} [option[].zIndex = 98'] - the index of dom
 * @param {string} [option[].icon = ''] - the icon of dom if you had use iconfont in you project
 * @param {string} [option[].shape = 'circle'] - the shape of dom , accept 'circle' 'square' & 'rounded-rectangle'
 * @param {string} [option[].background = 'rgba(0,0,0,.6)'] - background of the dom
 * @param {string} [option[].color = '#ffffff'] - color of the dom
 * @param {string} [option[].text = ''] - text of the dom
 * @param {boolean} [option[].hover = false] - if you set up icon and text you can switch on the hover effect
 * @param {boolean} [option[].btnLike = false] - if you want the dom to looks like a btn
 * @param {boolean} [option[].animation = false] - if you want the animation of scroll
 * @param {number} [option[].distance = 50] - when should show dom , the scroll distance of screen
 * @param {boolean} [option[].correct = false] - should we correct the Width to height ratio as 1:1
 * @param {object[]} [option[].position = {right:'15px',bottom:'15px'}] - the position of dom
 * @param {string} [option[].position[].top = ''] - position top of the dom
 * @param {string} [option[].position[].bottom = '15px'] - position bottom of the dom
 * @param {string} [option[].position[].left = ''] - position left of the dom
 * @param {string} [option[].position[].right = '15px'] - position right of the dom
 * @param {callback} [option[].ready] - before scroll
 * @param {callback} [option[].callback] - after scroll
```

## Links
[![github](http://p0kpwl4c8.bkt.clouddn.com/icon/github_c.png!icon_sm "https://github.com/watanabeyu0709/yu-scroll-top")](https://github.com/watanabeyu0709/yu-scroll-top)
[![npm](http://p0kpwl4c8.bkt.clouddn.com/icon/npm_c.png!icon_sm "https://www.npmjs.com/package/yu-scroll-top")](https://www.npmjs.com/package/yu-scroll-top)
