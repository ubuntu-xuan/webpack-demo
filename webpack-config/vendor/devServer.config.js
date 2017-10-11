module.exports = {
  contentBase: './build/', //映射到build目录
  host: 'localhost',
  port: 8080, // 默认8080
  inline: true, // 可以监控js变化
  hot: true, // 热启动
  compress: true,
  watchContentBase: false,
};
