<!--
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-03-11 15:23:45
-->
<!--
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-01-08 17:09:57
-->
<template>
 <div class="pick">
    <div id="cesiumContainer"></div>
    <section class="mapList">
      <header class="mapList-header">图元拾取和捕捉</header>
      <article class="mapList-center">
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelParentShow">加载Box</el-button> 
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelParentPrimitivesShow">primitives</el-button> 
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelCartesian">坐标系2-3</el-button> 
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelCartographic">坐标系Cartographic</el-button> 
        </div>
         <div class="mapList-center-list"> 
          <el-button type="primary" @click="handelParentHide">隐藏</el-button>
        </div>
      </article>
    </section>
  </div>
</template>
<script> 
import { onMounted } from "vue"; 
const Cesium = window.Cesium; 
export default {
 name: "CesiumPick", 
 props: {},
 setup() {
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
  const handelParentShow = ()=>{ 
      for (let i=0;i<3;i++){
      const height = 100.0 + (200.0 * i);
      window.viewer.entities.add({
              id:i,
              parent : new Cesium.Entity(),
              position : Cesium.Cartesian3.fromDegrees(104.1, 30.6, height),
              box : {
                  dimensions : new Cesium.Cartesian3(90.0, 90.0, 90.0),
                  material : Cesium.Color.fromRandom({alpha : 1.0})
              }
          })
      }
      let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
        handler.setInputAction(function (event) {      
          let pick = window.viewer.scene.pick(event.position); 
          if (Cesium.defined(pick)) {                 
            console.log(pick.id);    
            pick.id.box.material =new Cesium.ImageMaterialProperty ({
                          image:"static/SampleData/pbr/MaterialJson/MI_Pebble01_BaseTexMap.png"
                      }) 
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  }
    
   /**
    * @description: 加载
    * @return {*}
    */   
   const handelParentPrimitivesShow = () =>{
    var modelMatrix = new Cesium.Transforms.eastNorthUpToFixedFrame(
         Cesium.Cartesian3.fromDegrees(104.1, 30.6,500)
     );
     window.viewer.scene.primitives.add(new Cesium.Model.fromGltf({
         url: '/static/SampleData/gltf/坦克/gltf2.gltf', 
         modelMatrix: modelMatrix,
         minimumPixelSize : 512,
         maximumScale : 1000,
         scale : 1,
     })
     );
   } 
   /**
     * @description: 隐藏
     * @return {*}
     */   
    const handelParentHide = () =>{
      window.viewer.entities.removeAll()
    }
   /**
    * @description: 坐标系2-3
    * @return {*}
    */    
   const handelCartesian = ()=>{
    let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
    handler.setInputAction(function (event) {      
        const cartesian= event.position
        console.log('世界坐标',window.viewer.scene.camera.pickEllipsoid(event.position, window.viewer.scene.globe.ellipsoid));
        console.log('屏幕坐标（平面坐标系cartesian2）', event.position);
        const cartesian3 = window.viewer.scene.globe.pick(window.viewer.camera.getPickRay(cartesian),window.viewer.scene);  
        console.log('空间坐标系（笛卡尔坐标系cartesian3）',cartesian3);
        const cartesian2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(window.viewer.scene, cartesian3);
        //const cartesian2 = new Cesium.Cartesian2.fromCartesian3(cartesian3)
        console.log('转换后：屏幕坐标（平面坐标系cartesian2）', cartesian2);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
   }   
  /**
   * @description: 
   * @return {*}
   */   
  // /* 方法一 */
  //   const c = new Cesium.Cartesian3.fromRadians(b.longitude,b.latitude,b.height)
  //   console.log("方法一WGS84弧度坐标系转世界坐标",c);
  //   /* 方法二 */
  //   const ellipsoid = window.viewer.scene.globe.ellipsoid; 
  //   const cartesian3 = ellipsoid.cartographicToCartesian(b);
  //   console.log("方法二WGS84弧度坐标系转世界坐标",cartesian3);

  //   const cartographic = ellipsoid.cartesianToCartographic(a);
  //   console.log(cartographic);
  //   const lat = Cesium.Math.toDegrees(cartographic.latitude);
  //   const lng = Cesium.Math.toDegrees(cartographic.longitude);
  //   const alt = cartographic.height;
  //   console.log('世界坐标转换为经纬度',lat,lng,alt);
 const handelCartographic = ()=>{
    const a = new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 200);
    console.log("世界坐标",a);
    const b = new Cesium.Cartographic.fromDegrees(104.1, 30.6, 200);
    console.log("WGS84弧度坐标系",b); 
    /* 方法一 */
    const c = new Cesium.Cartesian3.fromRadians(b.longitude,b.latitude,b.height)
    console.log("方法一WGS84弧度坐标系转世界坐标",c);
    /* 方法二 */
    const ellipsoid = window.viewer.scene.globe.ellipsoid; 
    const cartesian3 = ellipsoid.cartographicToCartesian(b);
    console.log("方法二WGS84弧度坐标系转世界坐标",cartesian3);

    // 方法三
    const d = new  Cesium.Cartographic.toCartesian(b)
    console.log('方法三WGS84弧度坐标系转换为世界坐标',d);
  }
return {
    handelParentShow,handelParentHide, 
    handelParentPrimitivesShow,
    handelCartesian,handelCartographic
  };
 },
};
/**
 * @description: 初始化球体
 * @param {*} Cesium
 * @return {*}
 */
const initMap = (Cesium) => {
  // alpha 默认值为 false，与标准 WebGL 默认值 true 相比
  const viewer = new Cesium.Viewer("cesiumContainer", {  
    animation: false, // 是否显示动画控件
    shouldAnimate: true,
    homeButton: false, // 是否显示Home按钮
    fullscreenButton: false, // 是否显示全屏按钮
    baseLayerPicker: false, // 是否显示图层选择控件
    geocoder: false, // 是否显示地名查找控件
    timeline: false, // 是否显示时间线控件
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
  /* // 获取图层集合
  const imageryLayers = viewer.imageryLayers;
  // 将图像转成图层
  const UrlTemplate = new Cesium.UrlTemplateImageryProvider({
    url:
      "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
  });
  // 添加图层
  imageryLayers.add(new Cesium.ImageryLayer(UrlTemplate)); */
  // 隐藏版权
  viewer._cesiumWidget._creditContainer.style.display = "none";
  const boundingSphere =new Cesium.BoundingSphere(
       new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 800),
       1000
     );
  // 定位到初始位置
  // 将相机移到当前视图包含所提供的包围球的位置。
  viewer.camera.flyToBoundingSphere(boundingSphere, {
    // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
    duration: 0
  });
  // 隐藏版权
  viewer._cesiumWidget._creditContainer.style.display = "none";
  // 数据源集合
  viewer.dataSources.add(new Cesium.KmlDataSource.load('static/SampleData/kml/登顶四姑娘山三峰.kml'),
     {
         camera: viewer.scene.camera,
         canvas: viewer.scene.canvas
     });
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