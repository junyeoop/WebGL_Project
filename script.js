var gl;

const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;  // Now we can use function without glMatrix.~~~

function testGLError(functionLastCalled) {
	/* gl.getError returns the last error that occurred using WebGL for debugging */
	var lastError = gl.getError();

	if (lastError != gl.NO_ERROR) {
		alert(functionLastCalled + " failed (" + lastError + ")");
		return false;
	}
	return true;
}

function initialiseGL(canvas) {
	try {
		// Try to grab the standard context. If it fails, fallback to experimental
		gl = canvas.getContext('webgl',
			{stencil:true, alpha:true, depth:true, antialias:true, preserveDrawingBuffer:false});
		gl.viewport(0, 0, canvas.width, canvas.height);
	}
	catch (e) {
	}

	if (!gl) {
		alert("Unable to initialise WebGL. Your browser may not support it");
		return false;
	}
	return true;
}

let opacity = 1.0;
function makeCube(sx,sy,sz)
{
	var vertexData = [

		// X,Y,Z,  					R,	G,	B,			A,    	U,		V,		NX,NY,NZ

		// Backface (RED) -> z = 0.5
		-sx, -sy, -sz,  	1.0, 0.0, 0.0, opacity,  	0.0,  0.0,	0, 0, -1,
		sx,  sy, -sz,  		1.0, 0.0, 0.0, opacity,  	1.0,  1.0,	0, 0, -1,
		sx, -sy, -sz,			1.0, 0.0, 0.0, opacity,  	1.0,  0.0, 	0, 0, -1,
		-sx, -sy, -sz,		1.0, 0.0, 0.0, opacity,  	0.0,  0.0, 	0, 0, -1,
		-sx,  sy, -sz,		1.0, 0.0, 0.0, opacity,  	0.0,  1.0, 	0, 0, -1,
		sx,  sy, -sz,			1.0, 0.0, 0.0, opacity,  	1.0,  1.0, 	0, 0, -1,
		// Front (BLUE) -> z = 0.5
		-sx, -sy,  sz,		0.0, 0.0, 1.0, opacity,  	0.0,  1.0, 	0, 0, 1,
		sx, -sy,  sz, 	 	0.0, 0.0, 1.0, opacity,  	1.0,  1.0, 	0, 0, 1,
		sx,  sy,  sz,  		0.0, 0.0, 1.0, opacity,  	1.0,  0.0, 	0, 0, 1,
		-sx, -sy,  sz,  	0.0, 0.0, 1.0, opacity,  	0.0,  1.0, 	0, 0, 1,
		sx,  sy,  sz,  		0.0, 0.0, 1.0, opacity,  	1.0,  0.0, 	0, 0, 1,
		-sx,  sy,  sz,  	0.0, 0.0, 1.0, opacity,  	0.0,  0.0, 	0, 0, 1,
		// LEFT (GREEN) -> z = 0.5
		-sx, -sy, -sz,  	0.0, 1.0, 0.0, opacity,  	0.0,  0.0, 	-1, 0, 0,
		-sx,  sy,  sz,  	0.0, 1.0, 0.0, opacity,  	1.0,  1.0, 	-1, 0, 0,
		-sx,  sy, -sz,  	0.0, 1.0, 0.0, opacity,  	1.0,  0.0, 	-1, 0, 0,
		-sx, -sy, -sz,  	0.0, 1.0, 0.0, opacity,  	0.0,  0.0, 	-1, 0, 0,
		-sx, -sy,  sz,  	0.0, 1.0, 0.0, opacity,  	0.0,  1.0, 	-1, 0, 0,
		-sx,  sy,  sz,  	0.0, 1.0, 0.0, opacity,  	1.0,  1.0, 	-1, 0, 0,
		// RIGHT (YELLOW) -> z = 0.5
		sx, -sy, -sz,  		1.0, 1.0, 0.0, opacity,  	0.0,  0.0, 	1, 0, 0,
		sx,  sy, -sz,  		1.0, 1.0, 0.0, opacity,  	1.0,  0.0, 	1, 0, 0,
		sx,  sy,  sz,  		1.0, 1.0, 0.0, opacity,  	1.0,  1.0, 	1, 0, 0,
		sx, -sy, -sz,  		1.0, 1.0, 0.0, opacity,  	0.0,  0.0, 	1, 0, 0,
		sx,  sy,  sz,  		1.0, 1.0, 0.0, opacity,  	1.0,  1.0, 	1, 0, 0,
		sx, -sy,  sz,  		1.0, 1.0, 0.0, opacity,  	0.0,  1.0, 	1, 0, 0,
		// BOTTOM (MAGENTA) -> z = 0.5
		-sx, -sy, -sz,  	1.0, 0.0, 1.0, opacity,  	0.0,  0.0, 	0, -1, 0,
		sx, -sy, -sz,  		1.0, 0.0, 1.0, opacity,  	1.0,  0.0, 	0, -1, 0,
		sx, -sy,  sz,  		1.0, 0.0, 1.0, opacity,  	1.0,  1.0, 	0, -1, 0,
		-sx, -sy, -sz,  	1.0, 0.0, 1.0, opacity,  	0.0,  0.0, 	0, -1, 0,
		sx, -sy,  sz,  		1.0, 0.0, 1.0, opacity,  	1.0,  1.0, 	0, -1, 0,
		-sx, -sy,  sz,  	1.0, 0.0, 1.0, opacity,  	0.0,  1.0, 	0, -1, 0,
		// TOP (CYAN) -> z = 0.5
		-sx,  sy, -sz,  	0.0, 1.0, 1.0, opacity,  	0.0,  0.0, 	0, 1, 0,
		sx,  sy,  sz,  		0.0, 1.0, 1.0, opacity,  	1.0,  1.0, 	0, 1, 0,
		sx,  sy, -sz,  		0.0, 1.0, 1.0, opacity,  	1.0,  0.0, 	0, 1, 0,
		-sx,  sy, -sz,  	0.0, 1.0, 1.0, opacity,  	0.0,  0.0, 	0, 1, 0,
		-sx,  sy,  sz,  	0.0, 1.0, 1.0, opacity,  	0.0,  1.0, 	0, 1, 0,
		sx,  sy,  sz,  		0.0, 1.0, 1.0, opacity,  	1.0,  1.0, 	0, 1, 0
	];
	return (new Float32Array(vertexData));
}

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

function initialiseBuffer() {
	gl.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
	makeCube(0.5,0.5,0.5);
	gl.bufferData(gl.ARRAY_BUFFER, makeCube(0.5,0.5,0.5) , gl.DYNAMIC_DRAW);

	gl.vertexBuffer2 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, makeAxis(), gl.DYNAMIC_DRAW);

	return testGLError("initialiseBuffers");
}

function initialiseShaders() {

	var fragmentShaderSource = `
			precision mediump float;
			uniform mediump vec3 lightPos; 
			varying highp vec4 col; 
			varying highp vec3 VMv;
			varying highp vec3 VMn; 
			void main(void) 
			{ 
				vec3 N = normalize(VMn);
				float  d = length(lightPos - VMv);
				float specular; 
				mediump vec3 lightVec = normalize(lightPos - VMv);
				float diffuse = max(dot(N, lightVec), 0.1);
				diffuse = diffuse * (1.0 / (1.0 + (0.25 * d * d)));
				if (diffuse > 0.0) {
					    vec3 R = reflect(-lightVec, N);      // Reflected light vector
						vec3 V = normalize(-VMv);	 // Vector to viewer
						// Compute the specular term
						float specAngle = max(dot(R, V), 0.0);
						specular = pow(specAngle, 80.0);
				}
				gl_FragColor = col*diffuse + vec4(1.0,1.0,1.0,1.0)*specular;
			}`;

	gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(gl.fragShader, fragmentShaderSource);
	gl.compileShader(gl.fragShader);
	// Check if compilation succeeded
	if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
		alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
		return false;
	}

	// Vertex shader code
	var vertexShaderSource = `
		attribute highp vec4 myVertex; 
		attribute highp vec4 myColor; 
		attribute highp vec2 myUV; 
		attribute highp vec3 myNormal; 
		uniform mediump mat4 mMat; 
		uniform mediump mat4 vMat; 
		uniform mediump mat4 pMat; 
		varying highp vec4 col;
		varying highp vec3 VMv;
		varying highp vec3 VMn; 
		void main(void)  
		{ 
			VMv = vec3 (vMat * mMat * myVertex);
			VMn = vec3 (vMat * mMat * vec4(myNormal, 0.0));
			col = myColor;
			gl_Position = pMat * vMat * mMat * myVertex;
		}`;

	gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(gl.vertexShader, vertexShaderSource);
	gl.compileShader(gl.vertexShader);
	// Check if compilation succeeded
	if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
		alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
		return false;
	}

	// Create the shader program
	gl.programObject = gl.createProgram();
	// Attach the fragment and vertex shaders to it
	gl.attachShader(gl.programObject, gl.fragShader);
	gl.attachShader(gl.programObject, gl.vertexShader);
	// Bind the custom vertex attribute "myVertex" to location 0
	gl.bindAttribLocation(gl.programObject, 0, "myVertex");
	gl.bindAttribLocation(gl.programObject, 1, "myColor");
	gl.bindAttribLocation(gl.programObject, 2, "myUV");
	gl.bindAttribLocation(gl.programObject, 3, "myNormal");
	// Link the program
	gl.linkProgram(gl.programObject);
	// Check if linking succeeded in a similar way we checked for compilation errors
	if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
		alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
		return false;
	}
	gl.useProgram(gl.programObject);
	return testGLError("initialiseShaders");
}

flag_animation = 0;
function toggleAnimation()
{
	flag_animation ^= 1;
	console.log("flag_animation=", flag_animation);
}

function speed_scale(a)
{
	speedRot *= a;
}

var draw_mode = 4; // 4 Triangles, 3 line_strip 0-Points

function fn_draw_mode(a)
{
	draw_mode = a;
}

var fov_degree = 90.0;
function fn_update_fov(val)
{
	document.getElementById('textFOV').value=val;
	fov_degree = val;
}

/*============================ Mouse events =================================*/
function initialEvent(canvas) {
	try {
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		gl.viewport(0, 0, canvas.width, canvas.height);
	}
	catch (event) {
	}

	var drag=false;
	var original_x, original_y;
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

	return true;
}
/*====================================================================*/



/*===========================rotation================================*/
let rotate_flag = 0;

function rotateToggle(){
	rotate_flag ^= 1;
	// if(rotate_flag == 1){
	// 	xRot_2 =0;
	// 	yRot_2 =0;
	// 	zRot_2 =0;
	// }
	console.log("rotate_flag=", rotate_flag);
}

let axis_flag = 0;
function rotateAxis(axis){
	if(axis == 1){
		axis_flag = 1;
	}
	else if(axis == 2){
		axis_flag = 2;
	}
	else if(axis == 3){
		axis_flag = 3;
	}
	else if(axis == 4){
		axis_flag = 4;
	}
	console.log("axis_flag=", axis_flag);
}
/*==================================================================*/

let xRot = 0.0;
let yRot = 0.0;
let zRot = 0.0;
let speedRot = 0.01;
let mMat, vMat, pMat;

let xRot_2 = 0.0;
let yRot_2 = 0.0;
let zRot_2 = 0.0;

let x_rad = 0;
let y_rad = 0;
let light_posx = 0.0;
let light_posy = 0.0;
let light_posz = 0.0;
function renderScene() {
	let canvas = document.getElementById("helloapicanvas")

	gl.clearColor(0.8, 0.8, 0.8, 1.0);
	gl.clearDepth(1.0);										// Added for depth Test
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	// Added for depth Test
	gl.enable(gl.DEPTH_TEST);								// Added for depth Test

	var mMatLocation = gl.getUniformLocation(gl.programObject, "mMat");
	var vMatLocation = gl.getUniformLocation(gl.programObject, "vMat");
	var pMatLocation = gl.getUniformLocation(gl.programObject, "pMat");

	pMat = mat4.create();
	vMat = mat4.create();
	mMat = mat4.create();

	mat4.perspective(pMat, fov_degree * 3.141592 / 180.0 , canvas.width/canvas.height , 0.5, 6);
	mat4.lookAt(vMat, [0,0,-2], [0.0,0.0,0.0], [0,1,0]);

	mat4.rotateX(mMat, mMat, xRot);
	mat4.rotateY(mMat, mMat, yRot);
	mat4.rotateZ(mMat, mMat, zRot);

	if (flag_animation == 1)
	{
		// xRot = xRot + speedRot;
		yRot = yRot + speedRot;
		zRot = zRot + 2 * speedRot;
		console.log("xRot =",xRot,"yRot =",yRot,"zRot=",zRot);

	}

	mat4.rotateX(mMat, mMat, xRot_2);
	mat4.rotateY(mMat, mMat, yRot_2);
	mat4.rotateZ(mMat, mMat, zRot_2);


// X Axis
	if (rotate_flag == 1 && axis_flag == 1){
		console.log("axis_flag =",axis_flag);
		xRot_2 += speedRot;
		yRot_2 = 0;
		zRot_2 = 0;
		console.log("xRot =",xRot_2,"yRot =",yRot_2,"zRot=",zRot_2);

	}
	// Y Axis
	else if (rotate_flag == 1 && axis_flag == 2){
		yRot_2 += speedRot;
		xRot_2 = 0;
		zRot_2 = 0;
		console.log("xRot =",xRot_2,"yRot =",yRot_2,"zRot=",zRot_2);

	}
	// Z Axis
	else if (rotate_flag == 1 && axis_flag == 3){
		zRot_2 += speedRot;
		xRot_2 = 0;
		yRot_2 = 0;
		console.log("xRot =",xRot_2,"yRot =",yRot_2,"zRot=",zRot_2);

	}
	// Restore
	else if (rotate_flag == 1 && axis_flag == 4){
		xRot= 0;
		yRot= 0;
		zRot = 0;
		xRot_2 = 0;
		yRot_2 = 0;
		zRot_2 = 0;
		x_rad =0;
		y_rad =0;

		console.log("xRot =",xRot,"yRot =",yRot,"zRot=",zRot);
	}

	/**********************Drag**************************/
	mat4.rotateX(mMat, mMat, -x_rad);
	mat4.rotateY(mMat, mMat, y_rad);
	/****************************************************/

	gl.uniformMatrix4fv(mMatLocation, gl.FALSE, mMat );
	gl.uniformMatrix4fv(vMatLocation, gl.FALSE, vMat );
	gl.uniformMatrix4fv(pMatLocation, gl.FALSE, pMat );

	// Set Light Position
	gl.uniform3f(gl.getUniformLocation(gl.programObject, "lightPos"), light_posx, light_posy, light_posz);

	if (!testGLError("gl.uniformMatrix4fv")) {
		return false;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 48, 0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 48, 12);
	gl.enableVertexAttribArray(2);
	gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 48, 28);
	gl.enableVertexAttribArray(3);
	gl.vertexAttribPointer(3, 3, gl.FLOAT, gl.FALSE, 48, 36);

	if (!testGLError("gl.vertexAttribPointer")) {
		return false;
	}

	gl.drawArrays(draw_mode, 0, 36);


	gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer2);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 28, 0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 28, 12);

	if (!testGLError("gl.vertexAttribPointer")) {
		return false;
	}

	gl.drawArrays(1, 0, 6);

	if (!testGLError("gl.drawArrays")) {
		return false;
	}
	return true;
}

function main() {
	var canvas = document.getElementById("helloapicanvas");

	if (!initialiseGL(canvas)) {
		return;
	}

	if (!initialiseBuffer()) {
		return;
	}

	if (!initialiseShaders()) {
		return;
	}

	if (!initialEvent(canvas)) {
	  return;
	}

	requestAnimFrame = (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000, 60);
			};
	})();

	(function renderLoop() {
		if (renderScene()) {
			// Everything was successful, request that we redraw our scene again in the future
			requestAnimFrame(renderLoop);
		}
	})();
}
