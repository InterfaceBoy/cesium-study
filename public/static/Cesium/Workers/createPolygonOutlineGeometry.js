define(["./when-b60132fc","./Rectangle-dee65d21","./ArcType-29cf2197","./arrayFill-4513d7ad","./buildModuleUrl-9085faaa","./Check-7b2a090c","./ComponentDatatype-c140a87d","./EllipsoidTangentPlane-1dfa0a87","./GeometryAttribute-c65394ac","./GeometryAttributes-252e9929","./GeometryInstance-6bd4503d","./GeometryOffsetAttribute-fbeb6f1a","./GeometryPipeline-7a733318","./IndexDatatype-8a5eead4","./Math-119be1a3","./PolygonGeometryLibrary-8b220fb0","./PolygonPipeline-d83979ed","./FeatureDetection-806b12f0","./Cartographic-3309dd0d","./Event-16a2dfbf","./RuntimeError-4a5c8994","./WebGLConstants-4ae0db90","./Cartesian2-db21342c","./Cartesian4-3ca25aab","./IntersectionTests-0d6905a3","./Plane-a3d8b3d2","./AttributeCompression-0a087f75","./EncodedCartesian3-f1396b05","./arrayRemoveDuplicates-d2f048c5","./EllipsoidRhumbLine-30b5229b","./earcut-2.2.1-20c8012f"],(function(e,t,i,r,o,n,a,l,s,y,u,d,p,c,f,g,h,m,b,P,v,E,A,_,G,L,H,T,C,O,D){"use strict";var x=[],I=[];function w(e,t,r,o,n){var d,p,f=l.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,x);h.PolygonPipeline.computeWindingOrder2D(f)===h.WindingOrder.CLOCKWISE&&(f.reverse(),t=t.slice().reverse());var b=t.length,P=0;if(o)for(d=new Float64Array(2*b*3),p=0;p<b;p++){var v=t[p],E=t[(p+1)%b];d[P++]=v.x,d[P++]=v.y,d[P++]=v.z,d[P++]=E.x,d[P++]=E.y,d[P++]=E.z}else{var A=0;if(n===i.ArcType.GEODESIC)for(p=0;p<b;p++)A+=g.PolygonGeometryLibrary.subdivideLineCount(t[p],t[(p+1)%b],r);else if(n===i.ArcType.RHUMB)for(p=0;p<b;p++)A+=g.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[p],t[(p+1)%b],r);for(d=new Float64Array(3*A),p=0;p<b;p++){var _;n===i.ArcType.GEODESIC?_=g.PolygonGeometryLibrary.subdivideLine(t[p],t[(p+1)%b],r,I):n===i.ArcType.RHUMB&&(_=g.PolygonGeometryLibrary.subdivideRhumbLine(e,t[p],t[(p+1)%b],r,I));for(var G=_.length,L=0;L<G;++L)d[P++]=_[L]}}var H=2*(b=d.length/3),T=c.IndexDatatype.createTypedArray(b,H);for(P=0,p=0;p<b-1;p++)T[P++]=p,T[P++]=p+1;return T[P++]=b-1,T[P++]=0,new u.GeometryInstance({geometry:new s.Geometry({attributes:new y.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})}),indices:T,primitiveType:m.PrimitiveType.LINES})})}function R(e,t,r,o,n){var d,p,f=l.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,x);h.PolygonPipeline.computeWindingOrder2D(f)===h.WindingOrder.CLOCKWISE&&(f.reverse(),t=t.slice().reverse());var b=t.length,P=new Array(b),v=0;if(o)for(d=new Float64Array(2*b*3*2),p=0;p<b;++p){P[p]=v/3;var E=t[p],A=t[(p+1)%b];d[v++]=E.x,d[v++]=E.y,d[v++]=E.z,d[v++]=A.x,d[v++]=A.y,d[v++]=A.z}else{var _=0;if(n===i.ArcType.GEODESIC)for(p=0;p<b;p++)_+=g.PolygonGeometryLibrary.subdivideLineCount(t[p],t[(p+1)%b],r);else if(n===i.ArcType.RHUMB)for(p=0;p<b;p++)_+=g.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[p],t[(p+1)%b],r);for(d=new Float64Array(3*_*2),p=0;p<b;++p){var G;P[p]=v/3,n===i.ArcType.GEODESIC?G=g.PolygonGeometryLibrary.subdivideLine(t[p],t[(p+1)%b],r,I):n===i.ArcType.RHUMB&&(G=g.PolygonGeometryLibrary.subdivideRhumbLine(e,t[p],t[(p+1)%b],r,I));for(var L=G.length,H=0;H<L;++H)d[v++]=G[H]}}b=d.length/6;var T=P.length,C=2*(2*b+T),O=c.IndexDatatype.createTypedArray(b,C);for(v=0,p=0;p<b;++p)O[v++]=p,O[v++]=(p+1)%b,O[v++]=p+b,O[v++]=(p+1)%b+b;for(p=0;p<T;p++){var D=P[p];O[v++]=D,O[v++]=D+b}return new u.GeometryInstance({geometry:new s.Geometry({attributes:new y.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})}),indices:O,primitiveType:m.PrimitiveType.LINES})})}function S(r){var o=r.polygonHierarchy,n=e.defaultValue(r.ellipsoid,t.Ellipsoid.WGS84),a=e.defaultValue(r.granularity,f.CesiumMath.RADIANS_PER_DEGREE),l=e.defaultValue(r.perPositionHeight,!1),s=l&&e.defined(r.extrudedHeight),y=e.defaultValue(r.arcType,i.ArcType.GEODESIC),u=e.defaultValue(r.height,0),d=e.defaultValue(r.extrudedHeight,u);if(!s){var p=Math.max(u,d);d=Math.min(u,d),u=p}this._ellipsoid=t.Ellipsoid.clone(n),this._granularity=a,this._height=u,this._extrudedHeight=d,this._arcType=y,this._polygonHierarchy=o,this._perPositionHeight=l,this._perPositionHeightExtrude=s,this._offsetAttribute=r.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=g.PolygonGeometryLibrary.computeHierarchyPackedLength(o)+t.Ellipsoid.packedLength+8}S.pack=function(i,r,o){return o=e.defaultValue(o,0),o=g.PolygonGeometryLibrary.packPolygonHierarchy(i._polygonHierarchy,r,o),t.Ellipsoid.pack(i._ellipsoid,r,o),o+=t.Ellipsoid.packedLength,r[o++]=i._height,r[o++]=i._extrudedHeight,r[o++]=i._granularity,r[o++]=i._perPositionHeightExtrude?1:0,r[o++]=i._perPositionHeight?1:0,r[o++]=i._arcType,r[o++]=e.defaultValue(i._offsetAttribute,-1),r[o]=i.packedLength,r};var k=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),N={polygonHierarchy:{}};return S.unpack=function(i,r,o){r=e.defaultValue(r,0);var n=g.PolygonGeometryLibrary.unpackPolygonHierarchy(i,r);r=n.startingIndex,delete n.startingIndex;var a=t.Ellipsoid.unpack(i,r,k);r+=t.Ellipsoid.packedLength;var l=i[r++],s=i[r++],y=i[r++],u=1===i[r++],d=1===i[r++],p=i[r++],c=i[r++],f=i[r];return e.defined(o)||(o=new S(N)),o._polygonHierarchy=n,o._ellipsoid=t.Ellipsoid.clone(a,o._ellipsoid),o._height=l,o._extrudedHeight=s,o._granularity=y,o._perPositionHeight=d,o._perPositionHeightExtrude=u,o._arcType=p,o._offsetAttribute=-1===c?void 0:c,o.packedLength=f,o},S.fromPositions=function(t){return new S({polygonHierarchy:{positions:(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions},height:t.height,extrudedHeight:t.extrudedHeight,ellipsoid:t.ellipsoid,granularity:t.granularity,perPositionHeight:t.perPositionHeight,arcType:t.arcType,offsetAttribute:t.offsetAttribute})},S.createGeometry=function(t){var i=t._ellipsoid,n=t._granularity,l=t._polygonHierarchy,y=t._perPositionHeight,u=t._arcType,c=g.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(l,!y,i);if(0!==c.length){var m,b,P,v=[],E=f.CesiumMath.chordLength(n,i.maximumRadius),A=t._height,_=t._extrudedHeight;if(t._perPositionHeightExtrude||!f.CesiumMath.equalsEpsilon(A,_,0,f.CesiumMath.EPSILON2))for(P=0;P<c.length;P++){if((m=R(i,c[P],E,y,u)).geometry=g.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(m.geometry,A,_,i,y),e.defined(t._offsetAttribute)){var G=m.geometry.attributes.position.values.length/3,L=new Uint8Array(G);t._offsetAttribute===d.GeometryOffsetAttribute.TOP?L=r.arrayFill(L,1,0,G/2):(b=t._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1,L=r.arrayFill(L,b)),m.geometry.attributes.applyOffset=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:L})}v.push(m)}else for(P=0;P<c.length;P++){if((m=w(i,c[P],E,y,u)).geometry.attributes.position.values=h.PolygonPipeline.scaleToGeodeticHeight(m.geometry.attributes.position.values,A,i,!y),e.defined(t._offsetAttribute)){var H=m.geometry.attributes.position.values.length,T=new Uint8Array(H/3);b=t._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1,r.arrayFill(T,b),m.geometry.attributes.applyOffset=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:T})}v.push(m)}var C=p.GeometryPipeline.combineInstances(v)[0],O=o.BoundingSphere.fromVertices(C.attributes.position.values);return new s.Geometry({attributes:C.attributes,indices:C.indices,primitiveType:C.primitiveType,boundingSphere:O,offsetAttribute:t._offsetAttribute})}},function(i,r){return e.defined(r)&&(i=S.unpack(i,r)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),S.createGeometry(i)}}));
