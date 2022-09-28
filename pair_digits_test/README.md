# 数字对比较选择实验

本项目旨在探索BNUX使用jsPsych+线上实验平台（脑岛、cognition等）的探索，并尽量做出结构化努力，让后续实验创建者少造轮子
项目教程文章：https://zhuanlan.zhihu.com/p/567620641

# 1. 实验及部署
## a. 实验内容
### i. 刺激
    1-9的阿拉伯数字和繁体数字，共18种数字，两两组合构成的数字对
### ii. 实验步骤
    1. 先呈现固定图像“O”（图片fixation.jpg）600ms
    2. 黑屏600ms
    3. 呈现一对数字，被试判断数字大小，并按实验开头指示语内容操作
    4. 黑屏2600ms
    5. 重复步骤1-4直至准备的所有数字对全部施测完成

### iii. 实验结果
    1. rt：被试每对数字的反应时
    2. correct：被试每对数字的判断正确情况

## b. 部署平台
### i. [cognition](https://exvrlpestt.cognition.run)
    Task Code: ./plat_cognition/experiment.js
    stimuli: ./images/*
### ii. [脑岛](https://www.naodao.com/project/625310580265189376)
    （代码在plat_naodao中）
    上传的zip：
        |- index.html
        |- base_exp.css
        |- scripts
            |- data.js
            |- experiment.js
            |- functions.js
        |- images

# 2. jsPsych介绍
## a. jsPsych官方文档及教程
> - 官方文档：https://www.jspsych.org/
> - 中文教程：https://zhuanlan.zhihu.com/p/158022294
## b. css+html+js教程
> https://www.w3schools.com/


# 3. 脚本解析
## a. 实验数据及配置
### i. 实验数据
直接从csv文件粘贴到js中，使用**CSVtoArray**函数将其转为列表

plat_cognition/experiment.js：
```javascript
const trial_data = CSVtoArray(`1,1,1,3,9,14
1,1,2,2,3,1
1,1,3,8,9,2
1,1,4,9,8,8
1,1,5,2,8,13`)
```
    
plat_naodao/data.js：
```javascript
const trial_data = CSVtoArray(`1,1,1,3,9,14
1,1,2,2,3,1
1,1,3,8,9,2
1,1,4,9,8,8
1,1,5,2,8,13`)
```

### ii. 实验配置
plat_*/experiment.js：
```javascript
/* Global Variables */
const config = {
    "base_set": {                       // 通用配置
        // "fullscreen": true,
        "base_image_dir": "./images"    // 框架图片目录（如logo图片等）
    },
    "trial_set": {                      // 针对该实验的专用配置
        "fixation_show_time": 600,      // fixation图片显示时间
        "fixation_black_time": 600,     // fixation图片显示结束后黑屏时间
        "stimulus_show_time": 200,
        "stimulus_black_time": 1000,    // 数字对呈现结束后黑屏时间
        "interval_time": 1600,          // 两次施测间隔时间
        "trial_image_dir": "./images",  // 刺激图片目录（如logo图片等）
        "left_key": "q",                // 选择左侧图片的按键
        "right_key": "w"                // 选择右侧图片的按键
    },
    "other_set": {                      // 其它配置丢这里
    }
} 

```

## b. 通用函数
脚本：plat_naodao -> functions.js, plat_cognition -> experiment.js

```javascript
// trans csv string to array. 将csv字符串拆分为二维数组，用于读取从csv文件中复制而来的刺激队列
function CSVtoArray(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var lines = [];

    for (var i=0; i<allTextLines.length; i++) {
        lines.push(allTextLines[i].split(','));
    }
    return lines
}
```

## c. 通用jsPysch
本节包含：实验开始页面、实验结束页面的通用试次代码。借鉴该工程时可以直接复用这两个部分，只需定制实验内容部分试次代码
### i. 初始化jsPsych
```javascript
/* Launch jsPsych */

let jsPsych = initJsPsych({
    use_webaudio: false,                // 禁用浏览器音频
    extensions: [{ type: Naodao }],     // 专用于脑岛平台的代码，cognition不需要
    on_finish: function() {}            // 当全部试次执行完成后的操作
})

```

### ii. 通用jsPsych“试次”
| jsPsych试次名 | 位置 | 功能 |
|-- | -- | -- |
| set_html_style | 实验开始前 | HTML DOM 初始设置，禁用选中、右键、退出全屏 |
| open_fullscreen | 实验开始前 | 进入全屏 |
| welcome | 实验开始前 | BNU通用欢迎参与界面+全屏提醒 |
| close_fullscreen | 实验开始后 | 退出全屏 |
| finish | 实验结束后 | 结束语部分 |

### iii. 初始化jsPsych
```javascript
/* Launch jsPsych */

let jsPsych = initJsPsych({
    use_webaudio: false,                // 禁用浏览器音频
    extensions: [{ type: Naodao }],     // 专用于脑岛平台的代码，cognition不需要
    on_finish: function() {}            // 当全部试次执行完成后的操作
})

```

### iv. 运行试次队列
```javascript
/* Run: run jspsych */
let main_timeline = [            // 将所有要执行的试次按照顺序放在该列表中
    set_html_style,
    open_fullscreen,
    welcome,
    （实验内容的试次）,
    close_fullscreen,
    finish
]

jsPsych.run(main_timeline);     // jsPsych执行试次列表

```

## d. 数字对选择实验试次
| jsPsych试次名 | 功能 |
|-- | -- |
| instruction | 指导语 |
| trial_loop | 实验主体程序，使用jsPsych的 [timeline](https://www.jspsych.org/7.3/overview/timeline/) 来实现包含子试次的试次循环（Multiple trials） |