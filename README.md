# 迁移PropTypes脚本


由于react 16 以后将不带PropTypes，故在升级过程中需要迁移出来，单独用`prop-types`包来引用

###Input
```ecmascript 6
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
```
###output
```ecmascript 6
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
```
###Tip
    只针对jsx文件

###Usage
node app.js