import '../css/app.scss';
import Plugin from './plugin';

document.getElementById('example').innerHTML = (`
    <h1>示例</h1>
    <div class="ex-1">
      
    </div>
`);

document.querySelector('.ex-1').innerHTML = (`
    <p>默认加载</p>
    <code>
    new Plugin({}); <br><br>
    </code>
    <p>丰富的配置</p>
    <code>
    new Plugin({ <br>
    &nbsp;&nbsp;zIndex:999, <br>
    &nbsp;&nbsp;icon:'rocket', <br>
    &nbsp;&nbsp;shape:'rounded-rectangle', <br>
    &nbsp;&nbsp;background:'lightsalmon', <br>
    &nbsp;&nbsp;color:'lightgreen', <br>
    &nbsp;&nbsp;text:'click &lt;/br&gt; to &lt;/br&gt; the top', <br>
    &nbsp;&nbsp;hover:true, <br>
    &nbsp;&nbsp;btnLike:true, <br>
    &nbsp;&nbsp;animation:false, <br>
    &nbsp;&nbsp;distance:0, <br>
    &nbsp;&nbsp;correct:true, <br>
    &nbsp;&nbsp;position:{ <br>
    &nbsp;&nbsp;&nbsp;&nbsp;right:'80px', <br>
    &nbsp;&nbsp;&nbsp;&nbsp;bottom:'80px', <br>
    &nbsp;&nbsp;}, <br>
    &nbsp;&nbsp;ready(){ <br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log('ready to scroll') <br>
    &nbsp;&nbsp;}, <br>
    &nbsp;&nbsp;callback(){ <br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log('scroll over') <br>
    &nbsp;&nbsp;} <br>
    });
    </code>`)

window.onload=function () {
    new Plugin({});
    new Plugin({
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
    });
}

