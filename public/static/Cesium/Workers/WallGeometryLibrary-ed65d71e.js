define(["exports","./arrayRemoveDuplicates-d2f048c5","./Cartographic-3309dd0d","./when-b60132fc","./Math-119be1a3","./PolylinePipeline-a5200218","./GeometryAttribute-c65394ac","./FeatureDetection-806b12f0"],(function(e,i,t,r,n,a,o,l){"use strict";var s={};function h(e,i){return n.CesiumMath.equalsEpsilon(e.latitude,i.latitude,n.CesiumMath.EPSILON10)&&n.CesiumMath.equalsEpsilon(e.longitude,i.longitude,n.CesiumMath.EPSILON10)}var g=new t.Cartographic,p=new t.Cartographic;var d=new Array(2),u=new Array(2),c={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};function y(e,i){for(var r=new Array(e.length),n=0;n<e.length;n+=3){var a=new t.Cartesian3(e[n],e[n+1],e[n+2]);l.Matrix4.multiplyByPoint(i,a,a),r[n]=a.x,r[n+1]=a.y,r[n+2]=a.z}return r}s.computePositions=function(e,s,f,P,v,m,A){var w=function(e,n,a,o){var l=(n=i.arrayRemoveDuplicates(n,t.Cartesian3.equalsEpsilon)).length;if(!(l<2)){var s=r.defined(o),d=r.defined(a),u=!0,c=new Array(l),y=new Array(l),f=new Array(l),P=n[0];c[0]=P;var v=e.cartesianToCartographic(P,g);d&&(v.height=a[0]),u=u&&0==v.height,y[0]=v.height,f[0]=s?o[0]:0;for(var m=1,A=1;A<l;++A){var w=n[A],C=e.cartesianToCartographic(w,p);d&&(C.height=a[A]),u=u&&0==C.height,h(v,C)?v.height<C.height&&(y[m-1]=C.height):(c[m]=w,y[m]=C.height,f[m]=s?o[A]:0,t.Cartographic.clone(C,v),++m)}if(!(u||m<2))return c.length=m,y.length=m,f.length=m,{positions:c,topHeights:y,bottomHeights:f}}}(e,s,f,P);if(r.defined(w)){var C=o.Transforms.eastNorthUpToFixedFrame(w.positions[0],e,new l.Matrix4),F=l.Matrix4.inverse(C,new l.Matrix4);s=w.positions,f=w.topHeights,P=w.bottomHeights;var b,M,x,E,D=s.length,H=D-2,L=n.CesiumMath.chordLength(v,e.maximumRadius),T=c;if(T.minDistance=L,T.ellipsoid=e,m){var q,N=0;for(q=0;q<D-1;q++)N+=a.PolylinePipeline.numberOfPoints(s[q],s[q+1],L)+1;b=new Float64Array(3*N),M=new Float64Array(3*N),r.defined(A)&&(x=new Float64Array(3*N),E=new Float64Array(3*N));var O=d,R=u;T.positions=O,T.height=R;var G=0;for(q=0;q<D-1;q++){O[0]=s[q],O[1]=s[q+1],R[0]=f[q],R[1]=f[q+1];var I=a.PolylinePipeline.generateArc(T);b.set(I,G),r.defined(A)&&x.set(y(I,F),G),R[0]=P[q],R[1]=P[q+1],M.set(a.PolylinePipeline.generateArc(T),G),r.defined(A)&&E.set(y(a.PolylinePipeline.generateArc(T),F),G),G+=I.length}}else T.positions=s,T.height=f,b=new Float64Array(a.PolylinePipeline.generateArc(T)),r.defined(A)&&(x=new Float64Array(y(a.PolylinePipeline.generateArc(T)))),T.height=P,M=new Float64Array(a.PolylinePipeline.generateArc(T)),r.defined(A)&&(E=new Float64Array(y(a.PolylinePipeline.generateArc(T))));var S={pos:{bottomPositions:M,topPositions:b,numCorners:H}};return r.defined(A)&&(S.localPos={bottomPositions:E,topPositions:x,numCorners:H}),S}},e.WallGeometryLibrary=s}));
