module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  // transform: {
  //   "^.+\\.vue$": "vue-jest",
  //   ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  // },
  // testPathIgnorePatterns: [     
  //     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$",
  //     "<rootDir>/node_modules/"
  // ],
  // moduleFileExtensions: ['js', 'vue'],
  // moduleDirectories: ['node_modules']
  // 不需要统计测试覆盖率的目录
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', '/example/', '/tests/']
};

