/*
 * @Author: 何元鹏
 * @Date: 2024-04-01 11:23:30
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-04-01 14:54:24
 */
"use strict";

module.exports = {
  types: [
    {
      value: "feat",
      name: "feat:        新增一个功能"
    },
    {
      value: "fix",
      name: "fix:         修复一个Bug"
    },
    {
      value: "refactor",
      name: "refactor:    代码重构"
    },
    {
      value: "perf",
      name: "perf:        改善性能"
    },
    {
      value: "style",
      name: "style:       代码格式（不影响功能，例如空格、分号等格式修正）"
    },
    {
      value: "docs",
      name: "docs:        文档变更"
    },
    {
      value: "chore",
      name: "chore:       变更构建流程或辅助工具"
    },
    {
      value: "test",
      name: "test:        添加缺失的测试或更正现有的测试"
    },
    {
      value: "revert",
      name: "revert:      代码回退"
    },
    {
      value: "ci",
      name: "ci:          更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等"
    }
  ],
  scopes: [
    "公共模块",
    "版本更新",
    "代码冲突"
  ],
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "短说明:\n",
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: "非兼容性说明 (可选):\n",
    footer: "关联关闭的issue，例如：#31, #34(可选):\n",
    confirmCommit: "确定提交说明?"
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
