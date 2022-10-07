这是一个在线工具，主要是以学习为目的。线上地址参见<https://util.laeni.cn>.

## 本地开发启动

安装依赖：

```bash
npm install
# or
yarn
```

启动开发服务器：

```bash
npm run dev
# or
yarn dev
```

在浏览器打开 [http://localhost:3000](http://localhost:3000) 即可看到首页.

开发完整后需要进行构建，并生成静态HTML：

```bash
npm run build && npm run export
# or
yarn build && yarn export
```

> 将生成的纯静态文件放 Nginx 或者 OSS（需要配置自定义域名才能使用这种方式）即可。

## 设计原型

[即时设计](https://js.design/f/obhPDe?p=6Xygm6roQp)

## 部署方式

Webhooks 触发[阿里云流水线](https://flow.aliyun.com/)构建后自动上传[OSS](https://oss.console.aliyun.com/)。
