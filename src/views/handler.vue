<!--
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-03-12 15:48:37
-->
<template>
 <div class="pick">
    <div id="cesiumContainer"></div>
    <section class="mapList">
      <header class="mapList-header">绘制点线面</header>
      <article class="mapList-center">
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelSuperMapShow('point')">绘制点</el-button>
          <el-button type="primary" @click="handelSuperMapShow('line')">绘制线</el-button> 
        </div> 
         <div class="mapList-center-list">
          <el-button type="primary" @click="handelSuperMapShow('polygon')">绘制面</el-button>
          <el-button type="primary" @click="handelSuperMapShow('marker')">绘制marker</el-button> 
        </div>
          <div class="mapList-center-list">
          <el-button type="primary" @click="handelSuperMapShow('box')">绘制box</el-button> 
        </div>
        <div class="mapList-center-list">  
          <el-button type="primary" @click="handelSuperMapHide()">清除</el-button>
        </div> 
      </article>
    </section>
  </div>
</template>
<script> 
import { onMounted,ref } from "vue"; 
const Cesium = window.Cesium; 
export default {
 name: "CesiumProperty", 
 props: {},
 setup() {
   const drawer = ref()
   onMounted(() => {
     try {
       initMap(Cesium);
     } catch (error) {
       console.log(error);
     }
   });
     /**
     * @description: 加载Box
     * @return {*}
     */
    const handelSuperMapShow = (type)=>{ 
      const modeData = {
        point: Cesium.DrawMode.Point,
        line: Cesium.DrawMode.Line,
        polygon: Cesium.DrawMode.Polygon,
        marker: Cesium.DrawMode.Marker,
        box: Cesium.DrawMode.Box
      }
      const ClampModeData = {
        ground: Cesium.ClampMode.Ground,    // "贴地模式"
        raster: Cesium.ClampMode.Raster,    // "栅格化模式"
        model: Cesium.ClampMode.S3mModel,   // "贴对象模式"
        space: Cesium.ClampMode.Space,      // "空间模式"
      }
      const drawerHandler = new Cesium.DrawHandler(window.viewer, modeData[type], ClampModeData.space)
      drawer.value = drawerHandler
      /* 监听handler是否激活事件 */
      drawerHandler.activeEvt.addEventListener((isActive) => {
        console.log('是否激活事件:',isActive);
      });
      /* 监听handler移动事件,返回鼠标在屏幕的位置 */
      drawerHandler.movingEvt.addEventListener((position) => {
         console.log('屏幕的位置:',position);
      })
      /* 监听绘制是否完成,获取绘制结果 */
      drawerHandler.drawEvt.addEventListener((result) => {
        console.log('绘制结果:',result);
      })
      /* 激活 */
      drawerHandler.activate()
    }
    const handelSuperMapHide=()=>{
      drawer.value.clear()
    }
    return {
      handelSuperMapShow,handelSuperMapHide
    }
 },
};
/**
 * @description: 初始化球体
 * @param {*} Cesium
 * @return {*}
 */
const initMap = (Cesium)  => { 
  const viewer = new Cesium.Viewer("cesiumContainer", {   
    animation: false, // 是否显示动画控件
    shouldAnimate: true,
    homeButton: false, // 是否显示Home按钮
    fullscreenButton: false, // 是否显示全屏按钮
    baseLayerPicker: false, // 是否显示图层选择控件
    geocoder: false, // 是否显示地名查找控件
    timeline: true , // 是否显示时间线控件
    sceneModePicker: false, // 是否显示投影方式控件
    navigationHelpButton: false, // 是否显示帮助信息控件
    infoBox: false, // 是否显示点击要素之后显示的信息
    scene3DOnly: false, // 每个几何实例将只能以3D渲染以节省GPU内存
    sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处
    skyAtmosphere: false,// 关闭地球光环
    requestRenderMode: true, // 启用请求渲染模式
    orderIndependentTranslucency: false, // 去掉大气层黑圈
    contextOptions: {
      webgl: {
        alpha: true
      }
    },
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url:
        "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
    })
  });
  window.viewer = viewer 
  // 隐藏版权
  viewer._cesiumWidget._creditContainer.style.display = "none";
  const boundingSphere =new Cesium.BoundingSphere(
       new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 700),
       1000
     );
  // 定位到初始位置
  // 将相机移到当前视图包含所提供的包围球的位置。
  viewer.camera.flyToBoundingSphere(boundingSphere, {
    // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
    duration: 0
  });
  viewer.scene.globe.enableLighting = true;
  // 隐藏版权
  viewer._cesiumWidget._creditContainer.style.display = "none"; 
}
</script>
<style scoped lang="scss">
#cesiumContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  font-family: sans-serif;
}
.mapList{
   position: absolute;
   z-index: 2;
   width: 15rem;
   height: 100%;
   background-color: #fff;
   top: 0;
   left: 0;
   padding: 0.5rem;
   &-header{
      height: 3rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  &-center-list{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
    }
}
</style> 