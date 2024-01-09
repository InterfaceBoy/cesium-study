define(["exports","./buildModuleUrl-9085faaa","./Cartographic-3309dd0d","./Check-7b2a090c","./when-b60132fc","./Rectangle-dee65d21","./AttributeCompression-0a087f75","./Cartesian2-db21342c","./ComponentDatatype-c140a87d","./Math-119be1a3","./FeatureDetection-806b12f0"],(function(t,e,i,r,a,n,o,s,m,c,u){"use strict";function d(t,e){this._ellipsoid=t,this._cameraPosition=new i.Cartesian3,this._cameraPositionInScaledSpace=new i.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,a.defined(e)&&(this.cameraPosition=e)}Object.defineProperties(d.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(t){var e=this._ellipsoid.transformPositionToScaledSpace(t,this._cameraPositionInScaledSpace),r=i.Cartesian3.magnitudeSquared(e)-1;i.Cartesian3.clone(t,this._cameraPosition),this._cameraPositionInScaledSpace=e,this._distanceToLimbInScaledSpaceSquared=r}}});var l=new i.Cartesian3;d.prototype.isPointVisible=function(t){return g(this._ellipsoid.transformPositionToScaledSpace(t,l),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},d.prototype.isScaledSpacePointVisible=function(t){return g(t,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var p=new i.Cartesian3;d.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(t,e){var i,r,n=this._ellipsoid;return a.defined(e)&&e<0&&n.minimumRadius>-e?((r=p).x=this._cameraPosition.x/(n.radii.x+e),r.y=this._cameraPosition.y/(n.radii.y+e),r.z=this._cameraPosition.z/(n.radii.z+e),i=r.x*r.x+r.y*r.y+r.z*r.z-1):(r=this._cameraPositionInScaledSpace,i=this._distanceToLimbInScaledSpaceSquared),g(t,r,i)},d.prototype.computeHorizonCullingPoint=function(t,e,i){return S(this._ellipsoid,t,e,i)};var h=n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE);d.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(t,e,i,r){return S(C(this._ellipsoid,i,h),t,e,r)},d.prototype.computeHorizonCullingPointFromVertices=function(t,e,i,r,a){return b(this._ellipsoid,t,e,i,r,a)},d.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(t,e,i,r,a,n){return b(C(this._ellipsoid,a,h),t,e,i,r,n)};var f=[];d.prototype.computeHorizonCullingPointFromRectangle=function(t,r,a){var o=n.Rectangle.subsample(t,r,0,f),s=e.BoundingSphere.fromPoints(o);if(!(i.Cartesian3.magnitude(s.center)<.1*r.minimumRadius))return this.computeHorizonCullingPoint(s.center,o,a)};var x=new i.Cartesian3;function C(t,e,r){if(a.defined(e)&&e<0&&t.minimumRadius>-e){var o=i.Cartesian3.fromElements(t.radii.x+e,t.radii.y+e,t.radii.z+e,x);t=n.Ellipsoid.fromCartesian3(o,r)}return t}function S(t,e,r,n){a.defined(n)||(n=new i.Cartesian3);for(var o=z(t,e),s=0,m=0,c=r.length;m<c;++m){var u=T(t,r[m],o);if(u<0)return;s=Math.max(s,u)}return P(o,s,n)}var y=new i.Cartesian3;function b(t,e,r,n,o,s){a.defined(s)||(s=new i.Cartesian3),n=a.defaultValue(n,3),o=a.defaultValue(o,i.Cartesian3.ZERO);for(var m=z(t,e),c=0,u=0,d=r.length;u<d;u+=n){y.x=r[u]+o.x,y.y=r[u+1]+o.y,y.z=r[u+2]+o.z;var l=T(t,y,m);if(l<0)return;c=Math.max(c,l)}return P(m,c,s)}function g(t,e,r){var a=e,n=r,o=i.Cartesian3.subtract(t,a,l),s=-i.Cartesian3.dot(o,a);return!(n<0?s>0:s>n&&s*s/i.Cartesian3.magnitudeSquared(o)>n)}var v=new i.Cartesian3,M=new i.Cartesian3;function T(t,e,r){var a=t.transformPositionToScaledSpace(e,v),n=i.Cartesian3.magnitudeSquared(a),o=Math.sqrt(n),s=i.Cartesian3.divideByScalar(a,o,M);n=Math.max(1,n);var m=1/(o=Math.max(1,o));return 1/(i.Cartesian3.dot(s,r)*m-i.Cartesian3.magnitude(i.Cartesian3.cross(s,r,s))*(Math.sqrt(n-1)*m))}function P(t,e,r){if(!(e<=0||e===1/0||e!=e))return i.Cartesian3.multiplyByScalar(t,e,r)}var E=new i.Cartesian3;function z(t,e){return i.Cartesian3.equals(e,i.Cartesian3.ZERO)?e:(t.transformPositionToScaledSpace(e,E),i.Cartesian3.normalize(E,E))}var N=Object.freeze({NONE:0,BITS12:1}),I=new i.Cartesian3,B=new i.Cartesian3,_=new s.Cartesian2,w=new u.Matrix4,A=new u.Matrix4,q=Math.pow(2,12);function H(t,e,r,n,o,s){var m,c,d,l=N.NONE;if(a.defined(t)&&a.defined(e)&&a.defined(r)&&a.defined(n)){var p=t.minimum,h=t.maximum,f=i.Cartesian3.subtract(h,p,B),x=r-e;l=Math.max(i.Cartesian3.maximumComponent(f),x)<q-1?N.BITS12:N.NONE,l=N.NONE,m=t.center,c=u.Matrix4.inverseTransformation(n,new u.Matrix4);var C=i.Cartesian3.negate(p,I);u.Matrix4.multiply(u.Matrix4.fromTranslation(C,w),c,c);var S=I;S.x=1/f.x,S.y=1/f.y,S.z=1/f.z,u.Matrix4.multiply(u.Matrix4.fromScale(S,w),c,c),d=u.Matrix4.clone(n),u.Matrix4.setTranslation(d,i.Cartesian3.ZERO,d),n=u.Matrix4.clone(n,new u.Matrix4);var y=u.Matrix4.fromTranslation(p,w),b=u.Matrix4.fromScale(f,A),g=u.Matrix4.multiply(y,b,w);u.Matrix4.multiply(n,g,n),u.Matrix4.multiply(d,g,d)}this.quantization=l,this.minimumHeight=e,this.maximumHeight=r,this.center=m,this.toScaledENU=c,this.fromScaledENU=n,this.matrix=d,this.hasVertexNormals=o,this.hasWebMercatorT=a.defaultValue(s,!1)}H.prototype.encode=function(t,e,r,a,n,m,d){var l=a.x,p=a.y;if(this.quantization===N.BITS12){(r=u.Matrix4.multiplyByPoint(this.toScaledENU,r,I)).x=c.CesiumMath.clamp(r.x,0,1),r.y=c.CesiumMath.clamp(r.y,0,1),r.z=c.CesiumMath.clamp(r.z,0,1);var h=this.maximumHeight-this.minimumHeight,f=c.CesiumMath.clamp((n-this.minimumHeight)/h,0,1);s.Cartesian2.fromElements(r.x,r.y,_);var x=o.AttributeCompression.compressTextureCoordinates(_);s.Cartesian2.fromElements(r.z,f,_);var C=o.AttributeCompression.compressTextureCoordinates(_);s.Cartesian2.fromElements(l,p,_);var S=o.AttributeCompression.compressTextureCoordinates(_);if(t[e++]=x,t[e++]=C,t[e++]=S,this.hasWebMercatorT){s.Cartesian2.fromElements(d,0,_);var y=o.AttributeCompression.compressTextureCoordinates(_);t[e++]=y}}else i.Cartesian3.subtract(r,this.center,I),t[e++]=I.x,t[e++]=I.y,t[e++]=I.z,t[e++]=n,t[e++]=l,t[e++]=p,this.hasWebMercatorT&&(t[e++]=d);return this.hasVertexNormals&&(t[e++]=o.AttributeCompression.octPackFloat(m)),e},H.prototype.decodePosition=function(t,e,r){if(a.defined(r)||(r=new i.Cartesian3),e*=this.getStride(),this.quantization===N.BITS12){var n=o.AttributeCompression.decompressTextureCoordinates(t[e],_);r.x=n.x,r.y=n.y;var s=o.AttributeCompression.decompressTextureCoordinates(t[e+1],_);return r.z=s.x,u.Matrix4.multiplyByPoint(this.fromScaledENU,r,r)}return r.x=t[e],r.y=t[e+1],r.z=t[e+2],i.Cartesian3.add(r,this.center,r)},H.prototype.decodeTextureCoordinates=function(t,e,i){return a.defined(i)||(i=new s.Cartesian2),e*=this.getStride(),this.quantization===N.BITS12?o.AttributeCompression.decompressTextureCoordinates(t[e+2],i):s.Cartesian2.fromElements(t[e+4],t[e+5],i)},H.prototype.decodeHeight=function(t,e){return e*=this.getStride(),this.quantization===N.BITS12?o.AttributeCompression.decompressTextureCoordinates(t[e+1],_).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:t[e+3]},H.prototype.decodeWebMercatorT=function(t,e){return e*=this.getStride(),this.quantization===N.BITS12?o.AttributeCompression.decompressTextureCoordinates(t[e+3],_).x:t[e+6]},H.prototype.getOctEncodedNormal=function(t,e,i){var r=t[e=(e+1)*this.getStride()-1]/256,a=Math.floor(r),n=256*(r-a);return s.Cartesian2.fromElements(a,n,i)},H.prototype.getStride=function(){var t;if(this.quantization===N.BITS12)t=3;else t=6;return this.hasWebMercatorT&&++t,this.hasVertexNormals&&++t,t};var V={position3DAndHeight:0,textureCoordAndEncodedNormals:1},O={compressed0:0,compressed1:1};H.prototype.getAttributes=function(t){var e,i=m.ComponentDatatype.FLOAT,r=m.ComponentDatatype.getSizeInBytes(i);if(this.quantization===N.NONE){var a=2;this.hasWebMercatorT&&++a,this.hasVertexNormals&&++a;var n=[{index:V.position3DAndHeight,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:4,offsetInBytes:0,strideInBytes:e=(4+a)*r},{index:V.textureCoordAndEncodedNormals,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:a,offsetInBytes:4*r,strideInBytes:e}];return n}var o=3,s=0;return(this.hasWebMercatorT||this.hasVertexNormals)&&++o,this.hasWebMercatorT&&this.hasVertexNormals?(e=(o+ ++s)*r,[{index:n.compressed0,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:o,offsetInBytes:0,strideInBytes:e},{index:n.compressed1,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:s,offsetInBytes:o*r,strideInBytes:e}]):[{index:n.compressed0,vertexBuffer:t,componentDatatype:i,componentsPerAttribute:o}]},H.prototype.getAttributeLocations=function(){return this.quantization===N.NONE?V:O},H.clone=function(t,e){return a.defined(e)||(e=new H),e.quantization=t.quantization,e.minimumHeight=t.minimumHeight,e.maximumHeight=t.maximumHeight,e.center=i.Cartesian3.clone(t.center),e.toScaledENU=u.Matrix4.clone(t.toScaledENU),e.fromScaledENU=u.Matrix4.clone(t.fromScaledENU),e.matrix=u.Matrix4.clone(t.matrix),e.hasVertexNormals=t.hasVertexNormals,e.hasWebMercatorT=t.hasWebMercatorT,e},t.EllipsoidalOccluder=d,t.TerrainEncoding=H}));
