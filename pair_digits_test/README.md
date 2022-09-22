# 数字对比较选择实验

# 1. 实验内容
## a. 刺激
    1-9的阿拉伯数字和繁体数字，共18种刺激
## b. 实验步骤
    1. 先呈现固定图像“O”（图片fixation.jpg）600ms
    2. 黑屏600ms
    3. 呈现一对数字，被试判断数字大小，并按实验开头指示语内容操作
    4. 黑屏2600ms
    5. 重复步骤1-4直至准备的所有数字对全部施测完成

## c. 实验结果
    1. rt：被试每对数字的反应时
    2. correct：被试每对数字的判断正确情况

# 2. 部署平台
## a. [cognition](https://exvrlpestt.cognition.run)
    Task Code: ./plat_cognition/experiment.js
    stimuli: ./images/*
## b. [脑岛](https://www.naodao.com/project/625310580265189376)
    （代码在plat_naodao中）
    上传的zip：
        |- index.html
        |- base_exp.css
        |- scripts
            |- data.js
            |- experiment.js
            |- functions.js
        |- images

## c. 实验参数设置
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

### ii. 脚本及实验配置
plat_*/experiment.js：
```javascript
/* Global Variables */
const config = {
    "base_set": {
        // "fullscreen": true,
        "base_image_dir": "./images"    // 框架图片目录（如logo图片等）
    },
    "trial_set": {
        "fixation_show_time": 600,      // fixation图片显示时间
        "fixation_black_time": 600,     // fixation图片显示结束后黑屏时间
        "stimulus_show_time": 200,
        "stimulus_black_time": 1000,    // 数字对呈现结束后黑屏时间
        "interval_time": 1600,          // 两次施测间隔时间
        "trial_image_dir": "./images",  // 刺激图片目录（如logo图片等）
        "left_key": "q",                // 选择左侧图片的按键
        "right_key": "w"                // 选择右侧图片的按键
    },
    "other_set": {
    }
} 

```

