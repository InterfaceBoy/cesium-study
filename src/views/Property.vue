<!--
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-01-09 17:01:30
-->
<template>
 <div class="pick">
    <div id="cesiumContainer"></div>
    <section class="mapList">
      <header class="mapList-header">Property机制</header>
      <article class="mapList-center">
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelParentShow">SampledProperty</el-button>
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelParentPrimitivesShow">TimeIntervalCollection</el-button> 
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelCompositePropertyShow">CompositeProperty</el-button> 
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelFlightRouteMap">飞行线路图</el-button> 
        </div>
        <div class="mapList-center-list">
          <el-button type="primary" @click="handelRotate">平面旋转</el-button> 
        </div>
         <div class="mapList-center-list">
          <el-button type="primary" @click="handelThreeRotate">立体旋转</el-button> 
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
 name: "CesiumProperty", 
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
     * @description: SampledProperty
     * @return {*}
     */
    const handelParentShow = ()=>{   
      window.viewer.entities.add({
          id:"hyp",
          position : Cesium.Cartesian3.fromDegrees(104.1, 30.6, 200),
          box : { 
            dimensions : new Cesium.Cartesian3(200.0, 200.0, 200.0),
            material : Cesium.Color.fromRandom({alpha : 1.0})
          }
      }) 
      window.viewer.flyTo(window.viewer.entities.getById("hyp"))  
      const clock = window.viewer.cesiumWidget.clock;
      clock.currentTime = Cesium.JulianDate.fromDate(new Date()); 
      let handler = new Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas);
      handler.setInputAction(function (event) {      
          let pick = window.viewer.scene.pick(event.position); 
          if (Cesium.defined(pick)) {     
            const property = new Cesium.SampledProperty(Cesium.Cartesian3);
            const startTime = new Cesium.JulianDate.fromDate(new Date());  
            property.addSample(startTime,new Cesium.Cartesian3(200.0, 200.0, 200.0))
            const stopTime = Cesium.JulianDate.addSeconds(startTime,60, new Cesium.JulianDate());
            property.addSample(stopTime,new Cesium.Cartesian3(400.0, 400.0, 600.0)); 
            pick.id.box.dimensions = property
          }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    /**
     * @description: 隐藏Box
     * @return {*}
     */   
    const handelParentHide = () =>{
      window.viewer.entities.removeAll()
    }  
   /**
    * @description: 加载TimeIntervalCollection
    * @return {*}
    */   
   const handelParentPrimitivesShow = () =>{ 
    window.viewer.entities.add({
            id: "tk",
            position : Cesium.Cartesian3.fromDegrees(104.1, 30.6, 200),
            box : { 
              dimensions : new Cesium.Cartesian3(200.0, 200.0, 200.0),
              material : Cesium.Color.fromRandom({alpha : 1.0})
            }, 
        });
    const trackedEntity = window.viewer.entities.getById("tk"); 
    const CollectionProperty = new Cesium.TimeIntervalCollectionProperty(); 
    const clock = window.viewer.cesiumWidget.clock;
    clock.currentTime = Cesium.JulianDate.fromDate(new Date()); 
    const startTime = new Cesium.JulianDate.fromDate(new Date());
    CollectionProperty.intervals.addInterval(
     new Cesium.TimeInterval({
          start: Cesium.JulianDate.addSeconds(startTime,1, new Cesium.JulianDate()),
          stop:  Cesium.JulianDate.addSeconds(startTime,10, new Cesium.JulianDate()), 
          data : new Cesium.Cartesian3(500.0, 500.0, 500.0),
      })
     )  
    trackedEntity._box._dimensions = CollectionProperty
    window.viewer.flyTo(trackedEntity) 
   } 
   /**
    * @description: 加载CompositeProperty
    * @return {*}
    */   
   const handelCompositePropertyShow = () => {
      window.viewer.entities.add({
          id:"1",
          position : Cesium.Cartesian3.fromDegrees(104.1, 30.6, 200),
          box : { 
            dimensions : new Cesium.Cartesian3(200.0, 200.0, 200.0),
            material : Cesium.Color.fromRandom({alpha : 1.0})
          }
      })
      const property = new Cesium.SampledProperty(Cesium.Cartesian3);
      const startTime = new Cesium.JulianDate.fromDate(new Date());  
      property.addSample(startTime,new Cesium.Cartesian3(200.0, 200.0, 200.0))
      const stopTime = Cesium.JulianDate.addSeconds(startTime,60, new Cesium.JulianDate());
      property.addSample(stopTime,new Cesium.Cartesian3(400.0, 400.0, 600.0));
      var compositeProperty = new Cesium.CompositeProperty()
      compositeProperty.intervals.addInterval(
        new Cesium.TimeInterval({
          start: Cesium.JulianDate.addSeconds(startTime,1, new Cesium.JulianDate()),
          stop:  Cesium.JulianDate.addSeconds(startTime,10, new Cesium.JulianDate()), 
          data : property
        })
      ) 
      const trackedEntity = window.viewer.entities.getById("1");
      trackedEntity._box._dimensions = compositeProperty
      window.viewer.flyTo(trackedEntity) 
   }
   /**
    * @description: 飞行线路图
    * @return {*}
    */   
   const handelFlightRouteMap = () =>{
    const start = Cesium.JulianDate.fromDate(new Date());
    const stop = Cesium.JulianDate.addSeconds(
      start,
      360,
      new Cesium.JulianDate()
    );
    window.viewer.clock.startTime = start.clone();
    window.viewer.clock.stopTime = stop.clone();
    window.viewer.clock.currentTime = start.clone();
    window.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; 
    window.viewer.clock.multiplier = 10;
    const computeCirclularFlight =(lon, lat, radius)=> {
      const property = new Cesium.SampledPositionProperty();
      for (let i = 0; i <= 360; i += 60) {
        const radians = Cesium.Math.toRadians(i);
        const time = Cesium.JulianDate.addSeconds(
          start,
          i,
          new Cesium.JulianDate()
        );
        const position = Cesium.Cartesian3.fromDegrees(
          lon + radius * 1.5 * Math.cos(radians),
          lat + radius * Math.sin(radians),
          0
         // Cesium.Math.nextRandomNumber() * 500 + 1750
        );
        property.addSample(time, position); 
        window.viewer.entities.add({
          position: position,
          point: {
            pixelSize: 8,
            color: Cesium.Color.TRANSPARENT,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 3,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          },
        });
      }
      return property;
    }
   
    const position = computeCirclularFlight(104.1, 30.6, 0.02); 
    window.viewer.entities.add({
        id: "tk1",
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
          start: start,
          stop: stop
        })]),
        position: position,  
        orientation:new Cesium.VelocityOrientationProperty(position),
        model:{
          uri: '/static/SampleData/gltf/坦克/gltf2.gltf', 
          scale:10,
          minimumPixelSize: 100, 
          maximumScale: 200,
          shadows:true,   
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },  
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.RED, 
            clampToGround: true
          }), 
          width: 10
        } 
    });
    
   // window.viewer.flyTo(window.viewer.entities.getById("tk1")) 
   }
   /**
    * @description: 旋转
    * @return {*}
    */   
   const handelRotate =()=>{ 
    const position = Cesium.Cartesian3.fromDegrees(104.1, 30.6,1000); 
    const addModeEntity = window.viewer.entities.add({
        name: '测试',
        id:"cs",
        position: position, 
        ellipse:{
          semiMinorAxis: 300.0,
          semiMajorAxis: 300.0,
          material: new Cesium.ImageMaterialProperty ({
                      image:"static/SampleData/distlogo/images.png"
                  }),
        } 
      });
    window.viewer.flyTo(window.viewer.entities.getById("cs")) 
    const rotateMaterial = (instance, _stRotation, _amount)=> {
      instance.stRotation = new Cesium.CallbackProperty(function() {
          _stRotation += _amount;
          if (_stRotation >= 360 || _stRotation <= -360) {
              _stRotation = 0;
          }
          return Cesium.Math.toRadians(_stRotation);
      }, false)
    }
    rotateMaterial(addModeEntity.ellipse,0,1) 
   }
   /**
    * @description: 立体旋转
    * @return {*}
    */  
   const handelThreeRotate = ()=>{ 
    const position = Cesium.Cartesian3.fromDegrees(104.1, 30.6,500); 
    const heading = 0;
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );
    const addModeEntity = window.viewer.entities.add({
        name: '测试1',
        id:"cs1",
        position: position,
        orientation: orientation,
        model: {
          uri: '/static/SampleData/gltf/客机模型/客机模型.gltf',
          scale:0.1,
          minimumPixelSize:0.1,
          maximumScale: 20,
          shadows:true,
          color:Cesium.Color.RED,
          colorBlendMode:Cesium.ColorBlendMode.MIX// Cesium.ColorBlendMode.REPLACE//
        },
      });
    window.viewer.trackedEntity = addModeEntity;
    window.viewer.flyTo(window.viewer.entities.getById("cs1")) 
    const rotateMaterial = (instance, _stRotation, _amount)=> { 
        instance.orientation = new Cesium.CallbackProperty(function() {
          _stRotation += _amount;
          if (_stRotation >= 360 || _stRotation <= -360) {
              _stRotation = 0;
          }
          let heading = Cesium.Math.toRadians(_stRotation); 
          const pitch =  Cesium.Math.toRadians(_stRotation);
          const roll =  Cesium.Math.toRadians(_stRotation);
          let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
          let orientation = Cesium.Transforms.headingPitchRollQuaternion(
            position,
            hpr
          );
          return orientation
      }, false)
    }
    rotateMaterial(addModeEntity,0,1)
    
   }
   return {
    handelParentHide,
    handelParentShow,
    handelParentPrimitivesShow,
    handelCompositePropertyShow,
    handelFlightRouteMap,
    handelRotate,
    handelThreeRotate
  };
 },
};
/**
 * @description: 初始化球体
 * @param {*} Cesium
 * @return {*}
 */
const initMap = (Cesium) => { 
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
       new Cesium.Cartesian3.fromDegrees(104.1, 30.6, 800),
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