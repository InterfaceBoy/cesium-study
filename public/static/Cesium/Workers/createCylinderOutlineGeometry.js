define(["./arrayFill-4513d7ad","./buildModuleUrl-9085faaa","./Cartesian2-db21342c","./Cartographic-3309dd0d","./Check-7b2a090c","./ComponentDatatype-c140a87d","./CylinderGeometryLibrary-aa453214","./when-b60132fc","./GeometryAttribute-c65394ac","./GeometryAttributes-252e9929","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-8a5eead4","./FeatureDetection-806b12f0","./Rectangle-dee65d21","./Math-119be1a3","./Event-16a2dfbf","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./Cartesian4-3ca25aab"],(function(e,t,a,i,r,n,o,u,s,f,d,l,b,c,m,p,y,_,h){"use strict";var v=new a.Cartesian2;function A(e){var t=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).length,a=e.topRadius,i=e.bottomRadius,r=u.defaultValue(e.slices,128),n=Math.max(u.defaultValue(e.numberOfVerticalLines,16),0);this._length=t,this._topRadius=a,this._bottomRadius=i,this._slices=r,this._numberOfVerticalLines=n,this._offsetAttribute=e.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}A.packedLength=6,A.pack=function(e,t,a){return a=u.defaultValue(a,0),t[a++]=e._length,t[a++]=e._topRadius,t[a++]=e._bottomRadius,t[a++]=e._slices,t[a++]=e._numberOfVerticalLines,t[a]=u.defaultValue(e._offsetAttribute,-1),t};var R={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return A.unpack=function(e,t,a){t=u.defaultValue(t,0);var i=e[t++],r=e[t++],n=e[t++],o=e[t++],s=e[t++],f=e[t];return u.defined(a)?(a._length=i,a._topRadius=r,a._bottomRadius=n,a._slices=o,a._numberOfVerticalLines=s,a._offsetAttribute=-1===f?void 0:f,a):(R.length=i,R.topRadius=r,R.bottomRadius=n,R.slices=o,R.numberOfVerticalLines=s,R.offsetAttribute=-1===f?void 0:f,new A(R))},A.createGeometry=function(r){var c=r._length,m=r._topRadius,p=r._bottomRadius,y=r._slices,_=r._numberOfVerticalLines;if(!(c<=0||m<0||p<0||0===m&&0===p)){var h,A=2*y,R=o.CylinderGeometryLibrary.computePositions(c,m,p,y,!1),C=2*y;if(_>0){var G=Math.min(_,y);h=Math.round(y/G),C+=G}var O,g=l.IndexDatatype.createTypedArray(A,2*C),V=0;for(O=0;O<y-1;O++)g[V++]=O,g[V++]=O+1,g[V++]=O+y,g[V++]=O+1+y;if(g[V++]=y-1,g[V++]=0,g[V++]=y+y-1,g[V++]=y,_>0)for(O=0;O<y;O+=h)g[V++]=O,g[V++]=O+y;var L=new f.GeometryAttributes;L.position=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:R}),v.x=.5*c,v.y=Math.max(p,m);var w=new t.BoundingSphere(i.Cartesian3.ZERO,a.Cartesian2.magnitude(v));if(u.defined(r._offsetAttribute)){c=R.length;var D=new Uint8Array(c/3),E=r._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(D,E),L.applyOffset=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:D})}return new s.Geometry({attributes:L,indices:g,primitiveType:b.PrimitiveType.LINES,boundingSphere:w,offsetAttribute:r._offsetAttribute})}},function(e,t){return u.defined(t)&&(e=A.unpack(e,t)),A.createGeometry(e)}}));