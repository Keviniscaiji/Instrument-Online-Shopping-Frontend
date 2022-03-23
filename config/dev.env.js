'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
    BASE_API: '"http://8.130.13.122:8001"',
    OSS_PATH: ' "https://qintong-edu.oss-cn-beijing.aliyuncs.com"'
})