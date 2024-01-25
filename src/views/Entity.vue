<!--
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-01-25 10:09:24
-->
<template>
 <div class="hello">
    <div id="cesiumContainer"></div>
    <section class="mapList">
      <header class="mapList-header">Entity实体</header>
      <article class="mapList-center">
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelParentShow">加载Box</el-button>
          <el-button type="primary" @click="handelParentHide">隐藏Box</el-button>
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelTrajectoryShow">加载Model</el-button>
          <el-button type="primary" @click="handelTrajectoryHide">关闭Model</el-button>
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelPolygonShow">加载Polygon</el-button>
          <el-button type="primary" @click="handelPolygonHide">关闭Polygon</el-button>
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelWallShow">加载Wall</el-button>
          <el-button type="primary" @click="handelWallHide">关闭Wall</el-button>
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelLabelShow">加载标签</el-button>
          <el-button type="primary" @click="handelLabelHide">关闭标签</el-button>
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handel3DTilesShow">加载3DTiles</el-button>
          <el-button type="primary" @click="handel3DTilesHide">关闭3DTiles</el-button>
        </div>
      </article>
    </section>
  </div>
</template>
<script> 
import { onMounted } from "vue"; 
const Cesium = window.Cesium; 
export default {
 name: "CesiumEntity", 
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
    }
    /**
     * @description: 隐藏Box
     * @return {*}
     */   
    const handelParentHide = () =>{
      window.viewer.entities.removeAll()
    } 
    /* const handelParentHide = ()=>{ 
      window.viewer.entities.removeById(1)  
    } */
   /**
    * @description: 加载轨迹动画
    * @return {*}
    */    
   const handelTrajectoryShow = () =>{ 
    const positions = new Cesium.SampledPositionProperty();
    const startTime = window.viewer.clock.currentTime;
    positions.addSample(startTime, Cesium.Cartesian3.fromDegrees(104.1, 30.6, 800));
    const stopTime = Cesium.JulianDate.addSeconds(startTime,30, new Cesium.JulianDate());
    positions.addSample(stopTime, Cesium.Cartesian3.fromDegrees(104.11, 30.6, 800))
    const position = Cesium.Cartesian3.fromDegrees(104.1, 30.6, 800) 
    // 设置飞翔角度
    const headingPitchRoll = new Cesium.HeadingPitchRoll(0, Cesium.Math.toRadians(5), 0);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll);
    window.viewer.entities.add({
            id: "tk",
            availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                    start: startTime,
                    stop: stopTime
            })]),
            position: positions,
            orientation:orientation,
            model:new Cesium.ModelGraphics({
              uri: '/static/SampleData/gltf/坦克/gltf2.gltf', 
              silhouetteColor: Cesium.Color.RED,
              silhouetteSize:2.0,
              color:Cesium.Color.RED,
            }), 
            path: {
              resolution: 0.2,
              material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.RED
              }),
              width: 5
            }
        });
    window.viewer.trackedEntity = window.viewer.entities.getById("tk");
   }
   /**
    * @description: 关闭轨迹动画
    * @return {*}
    */   
   const handelTrajectoryHide = () =>{
     window.viewer.entities.removeById('tk') 
   }
   /**
    * @description: 加载Polygon
    * @return {*}
    */  
   const handelPolygonShow = () =>{ 
   /*  let range = [121.1911,31.53762,121.1921,30.87844,121.9246,30.83999,121.8824,31.34811];
    let positions = Cesium.Cartesian3.fromDegreesArray(range); 
    let holeRange1 = [121.2671,31.4566,121.2382,31.3481,121.3659,31.3934]; 
    let hole1 = { 
        positions: Cesium.Cartesian3.fromDegreesArray(holeRange1) 
    };  */
    window.viewer.entities.add({
         id:'Polygon',
         parent : new Cesium.Entity(),
         position : Cesium.Cartesian3.fromDegrees(112, 40, 300),
         /* polygon: {
          hierarchy: { 
              positions,
              holes: [hole1]  
          },
          height:500,
          extrudedHeight:500,
          material: new Cesium.ImageMaterialProperty ({
                          image:"static/SampleData/pbr/MaterialJson/M_Brick_Clay_Old_BaseTexMap.png"
                      }),
          outline:true, 
          outlineColor:Cesium.Color.WHITE,
          outlineWidth:2.0
        } */
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(
            [104.1, 30.6,104.2, 30.6,104.2, 30.7,104.1, 30.7]
          )),
          height:300,
          extrudedHeight:100,
          material: new Cesium.ImageMaterialProperty ({
                          image:"static/SampleData/pbr/MaterialJson/MI_Pebble01_BaseTexMap.png"
                      }),
          outline:true, 
          outlineColor:Cesium.Color.WHITE,
          outlineWidth:2.0
        }
     }) 
    window.viewer.flyTo(window.viewer.entities.getById("Polygon"));
   }
   /**
    * @description: 关闭Polygon
    * @return {*}
    */   
   const handelPolygonHide = () =>{
     window.viewer.entities.removeById('Polygon') 
   }
   /**
    * @description: 加载wall
    * @return {*}
    */   
   const handelWallShow = ()=>{
    window.viewer.entities.add({
        id: "Wall",
        position : Cesium.Cartesian3.fromDegrees(112, 40, 300),
        wall:{
            positions:Cesium.Cartesian3.fromDegreesArray([112, 40, 112.001, 40]),
            maximumHeights:[200,200],
            material: new Cesium.ImageMaterialProperty ({
                          image:"static/SampleData/pbr/MaterialJson/M_Brick_Clay_Old_BaseTexMap.png"
                      }),
        },
        shadows:true 
    })
    window.viewer.flyTo(window.viewer.entities.getById("Wall"));
   }
   /**
    * @description: 关闭Wall
    * @return {*}
    */   
   const handelWallHide = () =>{
     window.viewer.entities.removeById('Wall') 
   }
   /**
    * @description: 加载标签
    * @return {*}
    */   
   const handelLabelShow =()=>{
    window.viewer.entities.add({
        id: "label",
        position : Cesium.Cartesian3.fromDegrees(104.1, 30.6, 500),
        label : {
          text : "DIST",
          font:"48px sans-serif",
          style:Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor:Cesium.Color.RED,
          outlineColor:Cesium.Color.YELLOW,
          outlineWidth:2.0,
          showBackground:true,
          backgroundColor:new Cesium.Color(255, 255, 0, 0.8),
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
          translucencyByDistance:new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
          pixelOffset : new Cesium.Cartesian2(0.0, -20),
          pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e6, 0.0),
          disableDepthTestDistance:Number.POSITIVE_INFINITY 
        }, 
    })
   }
   /**
    * @description: 关闭标签
    * @return {*}
    */   
   const handelLabelHide = () =>{
     window.viewer.entities.removeById('label') 
   }
   /**
    * @description: 
    * @return {*}
    */   
   const handel3DTilesShow=()=>{
      const tilesModel = window.viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: "static/SampleData/Scene/testm3DTiles.json"
        })
      );
      tilesModel.readyPromise
        .then(currentModel => {
          // 定位到模型
          window.viewer.zoomTo(
            currentModel,
            new Cesium.HeadingPitchRange(
              0.5,
              -0.2,
              currentModel.boundingSphere.radius * 1.0
            )
          );
        })
        .otherwise(error => {
          console.log(error);
        });
   }
   /**
    * @description: 关闭kml
    * @return {*}
    */   
   const handel3DTilesHide=()=>{
    window.viewer.dataSources.removeAll()
   }
   return {
    handelParentShow,handelParentHide,
    handelTrajectoryShow,handelTrajectoryHide,
    handelPolygonShow,handelPolygonHide,
    handelWallShow,handelWallHide,
    handelLabelShow,handelLabelHide,
    handel3DTilesShow,handel3DTilesHide
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