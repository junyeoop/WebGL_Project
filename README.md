# WebGL Tutorial

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href=" " target="_blank"></a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue" />
</p>

## Draw an Interactive Cube
```sh
2021-1, Computer Graphics (F018-1, Prof. Hwanyong Lee)
Final Project
```
## Introduction

실습을 하며 느낀 불편함을 바탕으로 이번 프로젝트를 진행하게되었습니다.
제가 실습을 하면서 느낀점은 "내가 만든 큐브를 내 마음대로 움직일 수 있으면 좋겠다." 라는 것이있습니다. 큐브를 toggleAnimation으로 특정 방향으로만 Rotate하는 것은 결과를 확인하는데 충분하지 못했습니다. 특히 Shading의 경우 결과 확인이 가장 아쉬웠습니다. 따라서 마우스 드래그를 이용하여 큐브 Model을 rotate할 수 있도록 프로젝트를 만들었습니다. 또한, X, Y, Z축을 추가하여 큐브를 볼 때 큐브가 어떤 축을 기준으로 움직이는지 확인할 수 있도록 만들었습니다.


### Goal
* 마우스 드래그를 이용하여 Model의 위치를 변화시킬 수 있다.
* Projection/ View / Model Transform을 이해할 수 있다.
* x, y, z축을 기준으로 모델의 변화를 이해할 수 있다.
* Shading을 이해할 수 있다.


### 0. Axis
먼저 큐브의 기준 축을 알 수 있도록 x, y, z축을 추가로 랜더링했습니다.
```sh
function makeAxis(){
	let vertexData2 = [
		//x
		-1.0,0.0,0.0, 1.0, 0.0, 0.0, 1.0,
		1.0,0.0,0.0, 1.0, 0.0, 0.0, 1.0,
		//y
		0.0,-1.0,0.0, 0.0, 1.0, 0.0, 1.0,
		0.0,1.0,0.0, 0.0, 1.0, 0.0, 1.0,
		//z
		0.0,0.0,-1.0, 0.0, 0.0, 1.0, 1.0,
		0.0,0.0,1.0, 0.0, 0.0, 1.0, 1.0,
	]
	return (new Float32Array(vertexData2));
}
```
위와 같이 x축은 Red, y축은 Green, z축은 Blue로 설정했습니다. 
```sh
gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer2);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 28, 0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 28, 12);
	
	if (!testGLError("gl.vertexAttribPointer")) {
		return false;
	}

	gl.drawArrays(1, 0, 6);
```
그 후 renderScene에서 vertexBuffer2를 bind하여 랜더링했습니다.


* 랜더링 결과
<img src = "/uploads/2e555ab72d894cf4c58fb9ba5d850d67/축_랜더링.PNG" width="350px" height="350px"> 
<img src = "/uploads/6bd9bf3ccc70846d11d97fb9c3ddccef/큐브_랜더링.PNG" width="450px" height="350px">

* Rotate 랜더링 결과
<img src = "/uploads/2efff9c2b396b732b6a11cff95d195b2/RotateX.gif" width="350px" height="350px">
<img src = "/uploads/7220bdced3e2f420531bb95e0fef0a75/RotateY.gif" width="350px" height="350px">
<img src = "/uploads/2142f32cedbca1429e682ac3bfe34aa4/RotateZ.gif" width="350px" height="350px">


### 1. Interactive Cube
-----------
* evnetListener 생성

Interactive Cube란 사용자의 mouse event에 따라 model transform 하는 큐브를 의미합니다.
script.js에 initialEvent라는 function을 정의해주고, function 안에 다음과 같은 eventListener를 정의합니다.
```sh
	var Down = function(event) {
		console.log("Down");
		drag=true;
		original_x = event.pageX;
		original_y = event.pageY;
		event.preventDefault();
	};
	var Up = function(event){
		console.log("Up");
		drag=false;
	};
	var Out = function(event){
		console.log("Out");
		drag=false;
	};
	var Move = function(event) {
		if (!drag) return false;
		var gap_x = event.pageX - original_x;
		var gap_y = event.pageY - original_y;
		y_rad = y_rad + gap_x* 2 / canvas.width;
		x_rad = x_rad + gap_y* 2 / canvas.height;
		original_x = event.pageX;
		original_y = event.pageY;
		event.preventDefault();
	};

	canvas.addEventListener("mousedown", Down, false);
	canvas.addEventListener("mouseup", Up, false);
	canvas.addEventListener("mouseout", Out, false);
	canvas.addEventListener("mousemove", Move, false);
```
마우스의 Up, Down, Out, 이동 event의 eventListerner를 추가하였습니다. 

* 마우스 드래그 결과
<img src = "/uploads/c3ef997becc679b4c3f499cfc6713ad4/Drag.gif" width="350px" height="350px">


### 2. Shading
----------
```sh
Shading이란 ...
```

* Shading 결과

<img src = "/uploads/64b17ad779a72af53f35e83452076e0a/Shading_랜더링.PNG" width="450px" height="350px">
<img src = "/uploads/91c063e6c5d384527ff3340ab143868a/Shading.gif" width="350px" height="350px">




## References
본인의 Lab09를 기반으로 작성했고, 아래와 같이 참고하였습니다.

* 2020 프로젝트, 201721097 : https://git.ajou.ac.kr/hwan/webgl-tutorial/-/tree/master/student2020/better_project/201721097
* https://www.tutorialspoint.com/webgl/webgl_interactive_cube.htm
* T12_Shading , Prof. Hwanyong Lee : https://github.com/hwan-ajou/webgl-1.0/tree/main/T12_Shading

## Author

👤 **나준엽**

* Github: [@junyeoop](https://github.com/junyeoop)
* git.ajou.ac.kr: [@Na Jun Yeop](https://git.ajou.ac.kr/N)