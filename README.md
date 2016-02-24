# bootstrap4 customize— 为你的项目定制bootstrap4

这个项目能够让你快速为你的应用定制bootstrap4。

本项目用到了bower、npm打包工具，gulp自动化管理工具，sass预编译和postcss（如果你想用的话），font-awsome字体图标。

这个项目并没包含太多东西，仅仅是为你快速搭建可定制的bootstrap4。

## 快速开始

要想快速开始，你只需要克隆本项目的仓库并且下载依赖包：

### 预先下载的工具

你需要git来克隆本仓库，你可以下载git：[http://git-scm.com/](http://git-scm.com/).

我们同样需要nodejs以及包管理工具npm(npm install npm -g)和bower(npm install bower -g)。你可以下载nodejs：[http://nodejs.org/](http://nodejs.org/)。

### Clone bootstrap4-customize

Clone bootstrap4-customize 仓库:

```
git clone https://github.com/GaoQ1/bootstrap4-customize.git
cd bootstrap4-customize
```

### 下载依赖包

```
npm install
```

```
bower install
```

### 使用 Gulp

```
npm install -g gulp
全局安装gulp
```

```
gulp watch:styles
gulp编译style样式
```

## 目录结构

```
app/                    --> 应用的根目录
  bower_components            --> bower安装目录
  node_modules                --> npm安装目录
  styles/           --> 所有的样式的目录
    dest/              --> scss编译后的样式目录
      app.js                 --> 编译后的样式
      app.css.map            --> 编译后的样式map
    fontawsome-scss/              --> font-awsome字体的scss文件
    font/              --> 字体文件夹
    _base.scss               --> app.scss依赖的scss文件
    _variables.scss          --> 自定义变量样式的scss文件
    app.scss                 --> 最主要scss文件
  gulpfile.js                --> gulp的配置文件
```

## 结束语

水平有限，互相交流，有什么问题建议敬请留言，或邮件到729006199@qq.com