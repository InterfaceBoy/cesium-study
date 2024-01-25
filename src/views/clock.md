<!--
 * @Author: 何元鹏
 * @Date: 2024-01-11 15:44:14
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-01-11 15:44:36
-->
Cesium.Clock 类用于控制Cesium场景中的时间流逝和动画。通过设置时钟，您可以控制场景的时间流速率、当前时间和其他与时间有关的属性。以下是一些Cesium.Clock类的常见属性：

startTime（开始时间）: 表示时钟的开始时间。默认为当前时间。

currentTime（当前时间）: 表示时钟的当前时间。默认为开始时间。

stopTime（停止时间）: 表示时钟的停止时间。当时钟到达停止时间时，动画将停止。默认情况下，没有停止时间。

multiplier（时间流速率）: 控制时间流逝的速率。例如，设置为2.0时，时间将以正常速度的两倍流逝；设置为0.5时，时间将以正常速度的一半流逝。

clockStep（时钟步进）: 定义时间流逝的步进方式。可以设置为Cesium.ClockStep.SYSTEM_CLOCK（与系统时间同步）、Cesium.ClockStep.TICK_DEPENDENT（每帧递增）或Cesium.ClockStep.TICK_DEPENDENT（禁用时钟）。