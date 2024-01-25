<!--
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-01-25 13:35:18
-->
<template>
 <div class="pick">
    <div id="cesiumContainer"></div>
    <!-- 地图弹框 -->
    <div class="dynamic-layer" id="one" ref="one">
      <div class="line"></div>
      <div class="main">
        <!-- <cesiumPopup :pointInfo="popData" ref="popUp" /> -->
        <div>1234</div>
      </div>
    </div>
  </div>
</template>
<script> 
import { onMounted,ref } from "vue"; 
const Cesium = window.Cesium; 
export default {
 name: "PopUps", 
 props: {},
 setup() {
  const one = ref(null);
  const popUp = ref(null)
   
  onMounted(() => {
     try {
       initMap(Cesium,one,popUp); 
     } catch (error) {
       console.log(error);
     }
   });
  return {
      one,
      popUp
    };
 },
};

/**
 * @description: 初始化球体
 * @param {*} Cesium
 * @return {*}
 */
const initMap = (Cesium,one,popUp)  => { 
  const viewer = new Cesium.Viewer("cesiumContainer", {   
    animation: false, // 是否显示动画控件
    shouldAnimate: true,
    homeButton: false, // 是否显示Home按钮
    fullscreenButton: false, // 是否显示全屏按钮
    baseLayerPicker: false, // 是否显示图层选择控件
    geocoder: false, // 是否显示地名查找控件
    timeline: false , // 是否显示时间线控件
    sceneModePicker: false, // 是否显示投影方式控件
    navigationHelpButton: false, // 是否显示帮助信息控件
    infoBox: true, // 是否显示点击要素之后显示的信息
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

  // 隐藏版权
  viewer._cesiumWidget._creditContainer.style.display = "none";

  /* 飞行器 */
  /* 
  viewer.scene.globe.enableLighting = true;
  viewer.dataSources.add(
      Cesium.CzmlDataSource.load("/static//SampleData/czml/simple.czml")
    );

  viewer.camera.flyHome(0); */
 // 加载点位
      viewer.entities.add({
        name: "home",
        // 将经纬度转化成笛卡尔坐标
        position: new Cesium.Cartesian3.fromDegrees(104.09939, 30.58687, 130),
         description: '<iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" src="http://usercontent.example.net/getusercontent.cgi?id=12193"></iframe>',
        // 文字标签
        label: {
          text: "家",
          font: "16px monospace", // 字体大小和字样
          style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 字体展示效果
          fillColor: Cesium.Color.LIME, // 指定填充颜色的属性
          outlineWidth: 2, // 字体轮廓宽度
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
          pixelOffset: new Cesium.Cartesian2(0, -15) // 偏移量
        },
        // 图标
        billboard: {
          image:("static/SampleData/distlogo/坐标.png"),
          width: 100,
          height: 100
        }
      });
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (click) {
      console.log("左键单击事件：", click.position);
        // 屏幕坐标转世界坐标——关键点
        const cartesian = viewer.camera.pickEllipsoid(click.position,viewer.scene.globe.ellipsoid);
        // 将笛卡尔坐标转换为地理坐标
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        // 将弧度转为度的十进制度表示，保留5位小数
        const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
        const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
        console.log(lon, lat);

        // 获取地图上的点位实体(entity)坐标
        const pick = viewer.scene.pick(click.position);
        // 如果pick不是undefined，那么就是点到点位了
        if (pick && pick.id) {
          // 定位到地图中心
          // this.locationToCenter(lon, lat);
          console.log(pick.id);
          const data = {
            layerId: "layer1", // 英文，且唯一,内部entity会用得到
            lon: lon,
            lat: lat,
            element: "#one", // 弹框的唯一id
            boxHeightMax: 0, // 中间立方体的最大高度
          };
          console.log(one.value);
          one.value.style.zIndex = 9999
         // this.$("#one").css("z-index", 9990);
           showDynamicLayer(viewer, data,one, () => { // 回调函数 改变弹窗的内容;
             
          }); 
        } else {
          // 移除弹框
          if (document.querySelector("#one")) {
            removeDynamicLayer(viewer, { element: "#one" });
            one.value.style.zIndex = -1
          }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      
}
 
 // 创建一个动态实体弹窗
 const    showDynamicLayer = (viewer, data,one, callback)=> {
      one.value.style.opacity = 0  
      callback();

      // 添加div弹窗
      const lon = data.lon * 1, lat = data.lat * 1; 
      var divPosition = Cesium.Cartesian3.fromDegrees(lon, lat, data.boxHeightMax);
       one.value.style.opacity = 1
       one.value.lastChild.style.display = 'block'
      one.value.lastChild.animate({
        width: 50 // 线的宽度
      }, 500, () => {
         one.value.lastChild.fadeIn(500);
      }) 
      // 当为true的时候，表示当element在地球背面会自动隐藏。默认为false，置为false，不会这样。但至少减轻判断计算压力
      creatHtmlElement(viewer, data.element, divPosition, [10, -0], true);
    }

    // 创建一个 htmlElement元素 并且，其在earth背后会自动隐藏
  const  creatHtmlElement = (viewer, element, position, arr, flog)=> {
 
      var ele = document.querySelector(element);
      var scratch = new Cesium.Cartesian2(); // cesium二维笛卡尔 笛卡尔二维坐标系就是我们熟知的而二维坐标系；三维也如此
      var scene = viewer.scene, camera = viewer.camera;
      scene.preRender.addEventListener(() => {
        var canvasPosition = scene.cartesianToCanvasCoordinates(position, scratch); // cartesianToCanvasCoordinates 笛卡尔坐标（3维度）到画布坐标
        if (Cesium.defined(canvasPosition)) {
          ele.style.left = canvasPosition.x + arr[0] + "px";
          ele.style.top = canvasPosition.y + arr[1] + "px";
          /* 此处进行判断**/// var px_position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, cartesian)
          if (flog && flog == true) {
            var e = position, i = camera.position, n = scene.globe.ellipsoid.cartesianToCartographic(i).height
            if (!(n += 1 * scene.globe.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(i, e) > n)) {
              // $(element).show()
              ele.style.display = "block";
            } else {
              ele.style.display = "none";
              // $(element).hide()
            }
          }
        }
      });
    }

    // 移除动态弹窗 为了方便 这里的移除 是真的移除，因此 到时是需要重建弹窗的doom的
   const removeDynamicLayer = (viewer, data)=> {
      document.querySelector(data.element).style.opacity = 0;
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
// ---------------------------------------------------------- 弹框样式 ------------------------------------------------------
.dynamic-layer {
  display: none;
  user-select: none;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 534px;
  // width: 100%; // 这里设置成100%，打算在组件内根据内容设置具体的宽度实践 发现无效
  z-index: 99990;
}
.dynamic-layer .line {
  position: absolute;
  left: 0;
  width: 0;
  /* height: 100px; */
  bottom: 0;
  /* background: url(./img/line.png); */
}
.dynamic-layer .main {
  display: none;
  position: absolute;
  top: 0;
  left: 30px;
  right: 0;
  /* bottom: 100px; */
  transform: translateY(-100%);
  background: url(~@/assets/map/layer_border.png) no-repeat;
  background-size: 100% 100%;
  color: white;
  padding: 20px 20px 20px 20px;
  font-size: 14px;
  user-select: text;
  pointer-events: auto;
  background-color: rgba(3,22,37,.85);
}
// ---------------------------------------------------------- 弹框样式 ------------------------------------------------------


</style> 