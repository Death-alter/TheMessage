# TheMessage
风声客户端
使用Cocos Creator v3.7.3

## 安装依赖包
`npm install`

## 生成portobuf
`npm run build:proto`

## 配置electron
安装依赖包，然后执行
`npx electron-forge import`

## windows平台
在Cocos Creator 编辑器按下列顺序执行
项目 -> 构建发布 -> 新建构建任务 -> web手机端

### 运行
`npm run dev:electron`

### 打包
`npm run build:electron`