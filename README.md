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

실습을 하며 느낀 불편함을 바탕으로 이번 프로젝트를 진행하게 되었습니다.
큐브를 toggleAnimation으로 특정 방향으로만 Rotate하는 것은 랜더링된 결과를 확인하는데 충분하지 못했습니다. 특히 Shading의 경우 결과 확인이 가장 아쉬웠습니다. 따라서 마우스 드래그를 이용하여 큐브 Model을 rotate할 수 있도록 프로젝트를 만들었습니다. 또한, X, Y, Z축을 추가하여 큐브를 볼 때 큐브가 어떤 축을 기준으로 움직이는지 확인할 수 있도록 만들었습니다.


### Goal
* 마우스 드래그를 이용하여 Model의 위치를 변화시킬 수 있다.
* Projection/ View / Model Transform을 이해할 수 있다.
* x, y, z축을 기준으로 모델의 변화를 이해할 수 있다.
* Shading을 이해할 수 있다.


### 1. Axis
큐브의 기준 축을 알 수 있도록 x, y, z축을 추가로 랜더링 했습니다.
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
그 후 renderScene에서 vertexBuffer2를 bind하여 랜더링 했습니다.


* 랜더링 결과


<img src = "https://user-images.githubusercontent.com/55452516/123620712-7c055780-d845-11eb-91bf-e52c440f0270.PNG" width="400px" height="350px"> <img src = "https://user-images.githubusercontent.com/55452516/123620778-8a537380-d845-11eb-96d9-4268e2999880.PNG" width="400px" height="350px">

* Rotate 랜더링 결과


<img src = "https://user-images.githubusercontent.com/55452516/123620816-950e0880-d845-11eb-92f6-0466353ce294.gif" width="315px" height="315px"> <img src = "https://user-images.githubusercontent.com/55452516/123620845-9d664380-d845-11eb-8013-93c27b92bf45.gif" width="315px" height="315px"> <img src = "https://user-images.githubusercontent.com/55452516/123621040-c8e92e00-d845-11eb-87a1-d615fd91358a.gif" width="315px" height="315px">


### 2. Interactive Cube
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
Move evnetListener는 원래의 좌표에서 마우스로 이동한 좌표의 차이를 gap 변수에 저장합니다. 저장된 gap만큼 x, y축에 맞추어 renderScene에서 rotate 시켜줍니다.





* Interactive Cube 결과
<img src = "https://user-images.githubusercontent.com/55452516/123621345-11085080-d846-11eb-91e0-d3e0e8f3a052.gif" width="350px" height="350px">


### 3. Shading
----------

Shading에는 FragmentShader에서 일어나는 PhonShading과, VertexShader에서 일어나는 GouraudShading이 존재합니다.
PhongShading은 모든 픽셀에 대해 계산해야 합니다. 따라서 GouraudShading에 비해 랜더링 성능이 높지만 계산량이 많아 속도가 느립니다. 

GouraudShading의 경우, 삼각형을 잘게 쪼갠다면 랜더링 성능을 높일 수 있지만, 큐브를 만들 때 2개의 삼각형으로 한 면을 구성하기 때문에 랜더링 성능을 높일 수 없었습니다. Shading 효과를 눈으로 확인하기 위해서는 세밀한 랜더링이 필요하다고 생각하여 GouraudShading 대신 PhonShading을 선택하여 프로젝트를 진행했습니다.



* Shading 결과


<img src = "https://user-images.githubusercontent.com/55452516/123621391-1c5b7c00-d846-11eb-8d29-4a8aa253f6f9.PNG" width="400px" height="350px"> <img src = "https://user-images.githubusercontent.com/55452516/123621429-25e4e400-d846-11eb-963d-b1155b6efda6.gif" width="350px" height="350px">




## References
본인의 Lab09를 기반으로 작성했고, 아래와 같이 참고하였습니다.

* 2020 프로젝트, 201721097 : https://git.ajou.ac.kr/hwan/webgl-tutorial/-/tree/master/student2020/better_project/201721097
* https://www.tutorialspoint.com/webgl/webgl_interactive_cube.htm
* T12_Shading , Prof. Hwanyong Lee : https://github.com/hwan-ajou/webgl-1.0/tree/main/T12_Shading

## Author

👤 **나준엽**

* Github: [@junyeoop](https://github.com/junyeoop)
* git.ajou.ac.kr: [@Na Jun Yeop](https://git.ajou.ac.kr/N)
