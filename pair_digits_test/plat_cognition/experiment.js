/**
 *file        : experiment.js
 *Author      : zyr
 *Mail        : skyeyeszyr@outlook.com
 *Create Date : 2022-09-21 11:39:20
 *Version     : 1.0.0
*/


/* Global Variables */

// trans csv string to array
function CSVtoArray(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var lines = [];

    for (var i=0; i<allTextLines.length; i++) {
        lines.push(allTextLines[i].split(','));
    }
    return lines
}

// experiment data
const trial_data = CSVtoArray(`1,1,1,3,9,14
1,1,2,2,3,1
1,1,3,8,9,2
1,1,4,9,8,8
1,1,5,2,8,13`)


/* Global Variables */
const config = {
    "base_set": {
        // "fullscreen": true,
        "base_image_dir": "./images"
    },
    "trial_set": {
        "fixation_show_time": 600,
        "fixation_black_time": 600,
        "stimulus_show_time": 200,
        "stimulus_black_time": 1000,
        "interval_time": 1600,
        "trial_image_dir": "./images",
        "left_key": "q",
        "right_key": "w"
    },
    "other_set": {
    }
} 

/* Launch jsPsych */

let jsPsych = initJsPsych({
    use_webaudio: false,  
})


/* Blocks: HTML DOM Settings */

let set_html_style = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // mouse cursor type
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键
            if (window.event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) { return false }
        }
    },
}

let set_html_style_EAST = {
    type: jsPsychCallFunction,
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

let open_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

let welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    北京师范大学心理学院<br/>2022年</p>
    <div style="text-align: center"><img alt="bnu logo" src="${config.base_set.base_image_dir}/bnu_logo.png" style="display:inline-block;"></div>`,
    choices: [' '],
    post_trial_gap: 100
}

let instruction = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    指导语</p>
    <p style="font: 20pt 微软雅黑; color: black; text-align: left; line-height: 1.6em">
    请根据屏幕上方呈现的数字刺激按键选择其中数值较大的：<br/>
    如果左边的数字大，请按<b style="color: #B22222">${config.trial_set.left_key}</b>键；<br/>
    如果右边的数字大，请按<b style="color: #B22222">${config.trial_set.right_key}</b>键<br/>
    </p>
    <br/>
    <br/>
    <div style="font: bold 24pt 微软雅黑; text-align: center">请按空格开始正式实验</div>`,
    choices: [' '],
    post_trial_gap: 100
}

// 将刺激队列转为jsPsych的timeline_variables需要的格式（字典列表）
function timeline_variables() {
    var stimulus_list = []
    for (var i = 0, len = trial_data.length; i < len; i++) {
        stimulus_list.push({
            'id': parseInt(trial_data[i][2]),
            'left': parseInt(trial_data[i][3]),
            'right': parseInt(trial_data[i][4]),
            'type': parseInt(trial_data[i][5])
            })
    };
    return stimulus_list
}

let trial_loop = {
    type: jsPsychHtmlKeyboardResponse,
    timeline: [
        {
            stimulus: function() {
                document.body.style.backgroundColor = 'rgb(0, 0, 0)';
                return `<div style="text-align: center"><img src="${config.trial_set.trial_image_dir}/fixation.jpg" style="display:inline-block;"></div>`
            },
            choices: 'NO_KEYS',
            trial_duration: config.trial_set.fixation_show_time,
            post_trial_gap: config.trial_set.fixation_black_time
        },
        {
            stimulus: function() {
                let type;
                if (jsPsych.timelineVariable('type') < 24) {
                    type = 'A'
                } else {
                    type = 'C'
                }
                page_body = `<div style="text-align: center;">
                    <div style="float: left";>
                        <p><img alt="left digit" src="${config.trial_set.trial_image_dir}/${type}${jsPsych.timelineVariable('left')}.jpg" style="display:inline-block;"></p>
                        <p><img id="left" alt="f" src="${config.base_set.base_image_dir}/left_up.png" style="display:inline-block; width: 150px;">
                    </div>
                    <div style="float: right";>
                        <p><img alt="right digit" src="${config.trial_set.trial_image_dir}/${type}${jsPsych.timelineVariable('right')}.jpg" style="display:inline-block;"></p>
                        <p><img id="right" alt="j" src="${config.base_set.base_image_dir}/right_up.png" style="display:inline-block; width: 150px;"></p>
                    </div>
                <div>`

                // if (keyCode == 71) {
                //     document.getElementById("left").src=`${config.base_set.base_image_dir}/left_down.png`
                // } else if (keyCode == 75) {
                //     document.getElementById("right").src=`${config.base_set.base_image_dir}/right_down.png`
                // }
                return page_body
            },
            on_finish: function(data) {
                // score the response by comparing the key that was pressed (data.response) against the 
                // correct response for this trial ('f'), and store reponse accuracy in the trial data
                data.result = {
                    'id': jsPsych.timelineVariable('id'),
                    'left': jsPsych.timelineVariable('left'),
                    'right': jsPsych.timelineVariable('right'),
                    'type': jsPsych.timelineVariable('type')
                }
                if((jsPsych.pluginAPI.compareKeys(data.response, config.trial_set.left_key)
                 && jsPsych.timelineVariable('left') > jsPsych.timelineVariable('right'))
                  || (jsPsych.pluginAPI.compareKeys(data.response, config.trial_set.right_key)
                   && jsPsych.timelineVariable('left') < jsPsych.timelineVariable('right'))){
                    data.result['correct'] = 1;
                } else {
                    data.result['correct'] = 0; 
                }
            },
            post_trial_gap: config.trial_set.stimulus_black_time + config.trial_set.interval_time
        }
    ],
    timeline_variables: timeline_variables()
};
   

let close_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
}

let finish = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)';
        return `<p style="font: bold 32pt 微软雅黑;>实验结束啦 ○(∩ ∩)○ 感谢您的参与！</p>
        <div style="font: bold 24pt 微软雅黑; text-align: center;>请按空格或 5 秒后自动退出</div>`
    },
    choices: [' '],
    trial_duration: 5000
}


/* Run: run jspsych */

let main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    instruction,
    trial_loop,
    close_fullscreen,
    finish
]

jsPsych.run(main_timeline);