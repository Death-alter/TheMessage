# TheMessage

风声客户端

使用Cocos Creator v3.8.0

# 安装依赖包

`npm install`

# 生成portobuf

`npm run build:proto`

# windows和macOS

在Cocos Creator 编辑器按下列顺序执行

项目 -> 构建发布 -> 新建构建任务 -> web手机端

编辑器中构建完成后执行

`npm run build:electron`

# android等其他平台

根据[Cocos Creator官方文档](https://docs.cocos.com/creator/manual/zh/editor/publish/)操作

# 支持热更新的打包

## windows和macOS

正常打包即可

## android

在Cocos Creator 编辑器按下列顺序执行

项目 -> 构建发布 -> 新建构建任务 -> android

编辑器中构建完成后执行

`npm run build:manifest`

然后按上述方法在编辑器中再进行一次android构建

把assets文件夹中生成的version.manifest和project.manifest复制到/build/android/assets目录下，然后在Android Studio中构建apk文件

# 热更新的服务器包

服务器包的目录如下

```
files
├─android
│  ├─assets
│  ├─src
│  ├─project.manifest
│  └─version.manifest
└─pc
   ├─app.zip
   └─version.manifest
```

具体文件位置为
- assets和src文件夹位于/build/android/assets目录下
- version.manifest和project.manifest位于/assets目录下
- app.zip由/dist/win-unpacked/resources中的app.asar压缩生成

按目录结构把对应文件放入files文件夹然后压缩为zip格式即可生成服务器包
