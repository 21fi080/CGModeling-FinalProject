/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/FilmPass */ "./node_modules/three/examples/jsm/postprocessing/FilmPass.js");
/* harmony import */ var three_examples_jsm_math_SimplexNoise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/math/SimplexNoise */ "./node_modules/three/examples/jsm/math/SimplexNoise.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");










class ThreeJSContainer {
    scene;
    light;
    tv;
    floor1;
    floor2;
    spheres = [];
    currentWorld;
    camera;
    renderer;
    raycaster;
    mouse;
    orbitControls;
    cameraPosOriginal;
    isCameraAtTV;
    bgm;
    textureLoader;
    composer;
    filmPass;
    textMesh;
    floor2InitialPositionZ;
    constructor() {
        this.currentWorld = 1;
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_8__.Raycaster();
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_8__.Vector2();
        this.isCameraAtTV = false;
        this.floor2InitialPositionZ = 0;
        // BGM
        this.bgm = new Audio("assets/Neon Dreamscape.mp3");
        this.bgm.loop = true;
        // テクスチャローダー
        this.textureLoader = new three__WEBPACK_IMPORTED_MODULE_8__.TextureLoader();
    }
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (width, height, cameraPos) => {
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_8__.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_8__.Color(0x495ed));
        // カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_8__.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_8__.Vector3(0, 0, 0));
        this.cameraPosOriginal = cameraPos.clone();
        this.orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableZoom = false;
        this.orbitControls.dampingFactor = 0.1;
        this.orbitControls.enableDamping = true;
        this.createScene();
        this.setupPostProcessing();
        // 毎フレームのupdateを呼んで、render
        // requestAnimationFrame により次フレームを呼ぶ
        let render = (time) => {
            this.orbitControls.update();
            this.animateSpheres();
            this.animateFloor2();
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__.update(time);
            this.composer.render();
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        this.renderer.domElement.style.cssFloat = "left";
        this.renderer.domElement.style.margin = "10px";
        this.renderer.domElement.addEventListener("click", this.onDocumentMouseDown, false);
        return this.renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_8__.Scene();
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_8__.DirectionalLight(0xffffff);
        let lvec = new three__WEBPACK_IMPORTED_MODULE_8__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.light.castShadow = true;
        this.scene.add(this.light);
        // TVモデルのロード
        this.loadTVModel('assets/TV_Chayka206.obj', 'assets/TV_Chayka206.mtl');
        //テキスト
        const loader = new three__WEBPACK_IMPORTED_MODULE_8__.FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new three__WEBPACK_IMPORTED_MODULE_8__.TextGeometry("Tap the TV to change the world", {
                font: font,
                size: 0.1,
                height: 0.005
            });
            const textMaterial = new three__WEBPACK_IMPORTED_MODULE_8__.MeshBasicMaterial({ color: 0xffffff });
            this.textMesh = new three__WEBPACK_IMPORTED_MODULE_8__.Mesh(textGeometry, textMaterial);
            this.textMesh.position.set(-1, 0.62, 0);
            this.scene.add(this.textMesh);
            this.animateText();
        });
        // 床1
        const size = 1000;
        const divisions = 400;
        const floorGeometry = new three__WEBPACK_IMPORTED_MODULE_8__.PlaneGeometry(size, size);
        const floorMaterial = this.createCheckerboardTexture(size, divisions);
        this.floor1 = new three__WEBPACK_IMPORTED_MODULE_8__.Mesh(floorGeometry, floorMaterial);
        this.floor1.rotation.x = -Math.PI / 2;
        this.floor1.position.y = -5;
        // 床2
        const floorMaterial2 = this.createStripedTexture(size, 200);
        const floorGeometry2 = new three__WEBPACK_IMPORTED_MODULE_8__.PlaneGeometry(size, size, 200, 200);
        this.floor2 = new three__WEBPACK_IMPORTED_MODULE_8__.Mesh(floorGeometry2, floorMaterial2);
        this.floor2.rotation.x = -Math.PI / 2;
        this.floor2.position.y = -5;
        this.floor2.receiveShadow = true;
        this.floor2InitialPositionZ = this.floor2.position.z;
        if (this.currentWorld === 1) {
            this.scene.add(this.floor1);
            this.addSpheres();
            this.bgm.play();
        }
    };
    // 床1のチェック柄を作る
    createCheckerboardTexture(size, divisions) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 10;
        canvas.height = size * 10;
        const context = canvas.getContext('2d');
        const colors = ['#ff69b4', '#ffcce5'];
        const squareSize = canvas.width / divisions;
        for (let i = 0; i < divisions; i++) {
            for (let j = 0; j < divisions; j++) {
                context.fillStyle = colors[(i + j) % 2];
                context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
            }
        }
        const texture = new three__WEBPACK_IMPORTED_MODULE_8__.CanvasTexture(canvas);
        texture.minFilter = three__WEBPACK_IMPORTED_MODULE_8__.LinearFilter;
        texture.magFilter = three__WEBPACK_IMPORTED_MODULE_8__.LinearFilter;
        const material = new three__WEBPACK_IMPORTED_MODULE_8__.MeshBasicMaterial({ map: texture });
        return material;
    }
    // 床2のストライプ柄を作る
    createStripedTexture(size, divisions) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 5;
        canvas.height = size * 5;
        const context = canvas.getContext('2d');
        context.fillStyle = '#090033';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#FF00A6';
        context.lineWidth = 2;
        const step = canvas.width / divisions;
        for (let i = 0; i <= divisions; i++) {
            context.beginPath();
            context.moveTo(i * step, 0);
            context.lineTo(i * step, canvas.height);
            context.stroke();
            context.beginPath();
            context.moveTo(0, i * step);
            context.lineTo(canvas.width, i * step);
            context.stroke();
        }
        const texture = new three__WEBPACK_IMPORTED_MODULE_8__.CanvasTexture(canvas);
        texture.minFilter = three__WEBPACK_IMPORTED_MODULE_8__.LinearFilter;
        texture.magFilter = three__WEBPACK_IMPORTED_MODULE_8__.LinearFilter;
        const material = new three__WEBPACK_IMPORTED_MODULE_8__.MeshBasicMaterial({ map: texture });
        return material;
    }
    //床2のアニメーション
    animateFloor2 = () => {
        if (this.currentWorld === 2) {
            const speed = 0.05;
            this.floor2.position.z += speed;
            if (this.floor2.position.z > this.floor2InitialPositionZ + 100) { //床ループ
                this.floor2.position.z = this.floor2InitialPositionZ;
            }
        }
    };
    // TVモデルの読み込み
    loadTVModel = (objFilePath, mtlFilePath) => {
        const mtlLoader = new three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_2__.MTLLoader();
        mtlLoader.load(mtlFilePath, (materials) => {
            materials.preload();
            const objLoader = new three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_1__.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(objFilePath, (object) => {
                this.tv = object;
                this.tv.position.set(0, 0, 0);
                this.scene.add(this.tv);
            });
        });
    };
    // 球の追加
    addSpheres = () => {
        const sphereNum = 80;
        const sphereGeometry = new three__WEBPACK_IMPORTED_MODULE_8__.SphereGeometry(1, 32, 32);
        const texture = this.textureLoader.load('assets/Tiles107_1K-PNG_NormalDX.png');
        for (let i = 0; i < sphereNum; i++) {
            let material;
            if (i % 3 === 0) {
                material = new three__WEBPACK_IMPORTED_MODULE_8__.MeshBasicMaterial({ map: texture });
            }
            else if (i % 3 === 1) {
                material = new three__WEBPACK_IMPORTED_MODULE_8__.MeshPhysicalMaterial({
                    color: 0xffffff,
                    transmission: 1.3,
                    opacity: 1,
                    metalness: 0,
                    roughness: 0,
                    ior: 1.6,
                });
            }
            else {
                material = new three__WEBPACK_IMPORTED_MODULE_8__.MeshNormalMaterial();
            }
            const sphere = new three__WEBPACK_IMPORTED_MODULE_8__.Mesh(sphereGeometry, material);
            sphere.position.set(Math.random() * 240 - 120, Math.random() * 5 + 1, Math.random() * 240 - 120);
            sphere.scale.setScalar(Math.random() * 2 + 0.5);
            this.scene.add(sphere);
            this.spheres.push(sphere);
        }
    };
    // 球のアニメーション
    animateSpheres = () => {
        const time = Date.now() * 0.001;
        this.spheres.forEach((sphere, index) => {
            switch (index % 4) {
                case 0:
                    sphere.position.y += Math.sin(time + index) * 0.05;
                    break;
                case 1:
                    sphere.rotation.x += 0.02;
                    sphere.rotation.y += 0.02;
                    break;
                case 2:
                    sphere.position.x += Math.sin(time + index) * Math.random() * 0.05;
                    sphere.position.z += Math.cos(time + index) * Math.random() * 0.05;
                    sphere.rotation.y += 0.02;
                    break;
                case 3:
                    sphere.position.y += Math.sin(time + index) * Math.random() * 0.05;
                    break;
            }
        });
    };
    // テキストのアニメーション
    animateText = () => {
        const start = { y: 0.62 };
        const end = { y: 0.7 };
        const duration = 1000;
        const tweenUp = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__.Tween(start)
            .to(end, duration)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__.Easing.Elastic.Out)
            .onUpdate(() => {
            this.textMesh.position.y = start.y;
        })
            .onComplete(() => {
            tweenDown.start();
        });
        const tweenDown = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__.Tween(end)
            .to(start, duration)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_7__.Easing.Elastic.Out)
            .onUpdate(() => {
            this.textMesh.position.y = end.y;
        })
            .onComplete(() => {
            tweenUp.start();
        });
        tweenUp.start();
    };
    // 星の追加
    createStars = () => {
        const starGeometry = new three__WEBPACK_IMPORTED_MODULE_8__.BufferGeometry();
        const starMaterial = new three__WEBPACK_IMPORTED_MODULE_8__.PointsMaterial({ color: 0xffffff });
        const starVertices = [];
        for (let i = 0; i < 8000; i++) {
            const x = (Math.random() - 0.5) * 3000;
            const y = (Math.random() - 0.5) * 3000;
            const z = (Math.random() - 0.5) * 3000;
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_8__.Float32BufferAttribute(starVertices, 3));
        const stars = new three__WEBPACK_IMPORTED_MODULE_8__.Points(starGeometry, starMaterial);
        stars.name = 'stars';
        this.scene.add(stars);
    };
    // 山の追加
    addMountain = () => {
        const width = 10000;
        const height = 800;
        const divisions = 256;
        const heightFactor = 30;
        const noiseScale = 50;
        const mountainGeometry = new three__WEBPACK_IMPORTED_MODULE_8__.PlaneGeometry(width, height, divisions, divisions);
        const simplex = new three_examples_jsm_math_SimplexNoise__WEBPACK_IMPORTED_MODULE_6__.SimplexNoise();
        const position = mountainGeometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            const noise = simplex.noise(x / noiseScale, y / noiseScale);
            const z = noise * heightFactor;
            position.setZ(i, z);
        }
        mountainGeometry.computeVertexNormals();
        const mountainMaterial = new three__WEBPACK_IMPORTED_MODULE_8__.MeshBasicMaterial({ color: 0x0d004d, wireframe: true });
        const mountain = new three__WEBPACK_IMPORTED_MODULE_8__.Mesh(mountainGeometry, mountainMaterial);
        mountain.rotation.x = -Math.PI / 2;
        mountain.position.set(0, 0, -500);
        mountain.name = 'mountain';
        this.scene.add(mountain);
    };
    // 月の追加
    addMoon = () => {
        const moonTexture = this.textureLoader.load('assets/moon.png');
        const moonMaterial = new three__WEBPACK_IMPORTED_MODULE_8__.SpriteMaterial({ map: moonTexture });
        const moon = new three__WEBPACK_IMPORTED_MODULE_8__.Sprite(moonMaterial);
        moon.position.set(0, 250, -800);
        moon.scale.set(300, 300, 1);
        moon.name = 'moon';
        this.scene.add(moon);
    };
    // フィルター
    setupPostProcessing = () => {
        this.composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_3__.EffectComposer(this.renderer);
        const renderPass = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        // FilmPass
        this.filmPass = new three_examples_jsm_postprocessing_FilmPass__WEBPACK_IMPORTED_MODULE_5__.FilmPass(0.35, 0.025, 648, 0);
        this.composer.addPass(this.filmPass);
    };
    // ワールド切り替え
    switchWorld = () => {
        this.currentWorld = this.currentWorld === 1 ? 2 : 1;
        if (this.currentWorld === 1) {
            this.scene.background = new three__WEBPACK_IMPORTED_MODULE_8__.Color(0x495ed);
            this.scene.add(this.floor1);
            this.scene.remove(this.floor2);
            this.addSpheres();
            this.bgm.src = "assets/Neon Dreamscape.mp3";
            this.bgm.play();
            const stars = this.scene.getObjectByName('stars');
            const mountain = this.scene.getObjectByName('mountain');
            const moon = this.scene.getObjectByName('moon');
            if (stars)
                this.scene.remove(stars);
            if (mountain)
                this.scene.remove(mountain);
            if (moon)
                this.scene.remove(moon);
        }
        else {
            this.scene.background = new three__WEBPACK_IMPORTED_MODULE_8__.Color(0x4b0082);
            this.scene.add(this.floor2);
            this.scene.remove(this.floor1);
            this.spheres.forEach(sphere => this.scene.remove(sphere));
            this.bgm.src = "assets/In The Moonlight Glow.mp3";
            this.bgm.play();
            this.createStars();
            this.addMountain();
            this.addMoon();
        }
    };
    // クリックでTVをズーム
    onDocumentMouseDown = (event) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects([this.tv], true);
        if (intersects.length > 0) {
            if (!this.isCameraAtTV) {
                // テレビの正面に移動
                gsap__WEBPACK_IMPORTED_MODULE_9__["default"].to(this.camera.position, {
                    duration: 2,
                    x: this.tv.position.x,
                    y: this.tv.position.y + 0.7,
                    z: this.tv.position.z + 0.6,
                    onUpdate: () => {
                        this.camera.lookAt(this.tv.position);
                    },
                    onComplete: () => {
                        this.isCameraAtTV = true;
                    }
                });
            }
            else {
                // テレビの正面にカメラがある場合にのみワールドを切り替える
                if (this.isCameraAtTV) {
                    this.switchWorld();
                    // カメラを元の位置に戻す
                    gsap__WEBPACK_IMPORTED_MODULE_9__["default"].to(this.camera.position, {
                        duration: 2,
                        x: this.cameraPosOriginal.x,
                        y: this.cameraPosOriginal.y,
                        z: this.cameraPosOriginal.z,
                        onUpdate: () => {
                            this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_8__.Vector3(0, 0, 0));
                        },
                        onComplete: () => {
                            this.isCameraAtTV = false;
                        }
                    });
                }
            }
        }
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_8__.Vector3(-1, 1, 1));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_gsap_index_js-node_modul-7f5955"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCB7IE9CSkxvYWRlciB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9PQkpMb2FkZXJcIjtcbmltcG9ydCB7IE1UTExvYWRlciB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9NVExMb2FkZXJcIjtcbmltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlclwiO1xuaW1wb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvUmVuZGVyUGFzc1wiO1xuaW1wb3J0IHsgRmlsbVBhc3MgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0ZpbG1QYXNzXCI7IFxuaW1wb3J0IHtTaW1wbGV4Tm9pc2V9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vbWF0aC9TaW1wbGV4Tm9pc2VcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuaW1wb3J0IGdzYXAgZnJvbSBcImdzYXBcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSB0djogVEhSRUUuR3JvdXA7XG4gICAgcHJpdmF0ZSBmbG9vcjE6IFRIUkVFLk1lc2g7XG4gICAgcHJpdmF0ZSBmbG9vcjI6IFRIUkVFLk1lc2g7XG4gICAgcHJpdmF0ZSBzcGhlcmVzOiBUSFJFRS5NZXNoW10gPSBbXTtcbiAgICBwcml2YXRlIGN1cnJlbnRXb3JsZDogbnVtYmVyO1xuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuICAgIHByaXZhdGUgcmF5Y2FzdGVyOiBUSFJFRS5SYXljYXN0ZXI7XG4gICAgcHJpdmF0ZSBtb3VzZTogVEhSRUUuVmVjdG9yMjtcbiAgICBwcml2YXRlIG9yYml0Q29udHJvbHM6IE9yYml0Q29udHJvbHM7XG4gICAgcHJpdmF0ZSBjYW1lcmFQb3NPcmlnaW5hbDogVEhSRUUuVmVjdG9yMztcbiAgICBwcml2YXRlIGlzQ2FtZXJhQXRUVjogYm9vbGVhbjtcbiAgICBwcml2YXRlIGJnbTogSFRNTEF1ZGlvRWxlbWVudDtcbiAgICBwcml2YXRlIHRleHR1cmVMb2FkZXI6IFRIUkVFLlRleHR1cmVMb2FkZXI7XG4gICAgcHJpdmF0ZSBjb21wb3NlcjogRWZmZWN0Q29tcG9zZXI7XG4gICAgcHJpdmF0ZSBmaWxtUGFzczogRmlsbVBhc3M7XG4gICAgcHJpdmF0ZSB0ZXh0TWVzaDogVEhSRUUuTWVzaDtcbiAgICBwcml2YXRlIGZsb29yMkluaXRpYWxQb3NpdGlvblo6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRXb3JsZCA9IDE7XG4gICAgICAgIHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuICAgICAgICB0aGlzLm1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICAgICAgdGhpcy5pc0NhbWVyYUF0VFYgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mbG9vcjJJbml0aWFsUG9zaXRpb25aID0gMDtcblxuICAgICAgICAvLyBCR01cbiAgICAgICAgdGhpcy5iZ20gPSBuZXcgQXVkaW8oXCJhc3NldHMvTmVvbiBEcmVhbXNjYXBlLm1wM1wiKTtcbiAgICAgICAgdGhpcy5iZ20ubG9vcCA9IHRydWU7XG5cbiAgICAgICAgLy8g44OG44Kv44K544OB44Oj44Ot44O844OA44O8XG4gICAgICAgIHRoaXMudGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgfVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqylcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWQpKTtcblxuICAgICAgICAvLyDjgqvjg6Hjg6njga7oqK3lrppcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XG5cbiAgICAgICAgdGhpcy5jYW1lcmFQb3NPcmlnaW5hbCA9IGNhbWVyYVBvcy5jbG9uZSgpO1xuXG4gICAgICAgIHRoaXMub3JiaXRDb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgICB0aGlzLm9yYml0Q29udHJvbHMuZW5hYmxlWm9vbSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9yYml0Q29udHJvbHMuZGFtcGluZ0ZhY3RvciA9IDAuMTsgXG4gICAgICAgIHRoaXMub3JiaXRDb250cm9scy5lbmFibGVEYW1waW5nID0gdHJ1ZTsgXG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgdGhpcy5zZXR1cFBvc3RQcm9jZXNzaW5nKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp+OAgXJlbmRlclxuICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JiaXRDb250cm9scy51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVNwaGVyZXMoKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUZsb29yMigpO1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKHRpbWUpO1xuICAgICAgICAgICAgdGhpcy5jb21wb3Nlci5yZW5kZXIoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uRG9jdW1lbnRNb3VzZURvd24sIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyDjgrfjg7zjg7Pjga7kvZzmiJAo5YWo5L2T44GnMeWbnilcbiAgICBwcml2YXRlIGNyZWF0ZVNjZW5lID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAgICAgLy8g44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGxldCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KGx2ZWMueCwgbHZlYy55LCBsdmVjLnopO1xuICAgICAgICB0aGlzLmxpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuXG4gICAgICAgIC8vIFRW44Oi44OH44Or44Gu44Ot44O844OJXG4gICAgICAgIHRoaXMubG9hZFRWTW9kZWwoJ2Fzc2V0cy9UVl9DaGF5a2EyMDYub2JqJywgJ2Fzc2V0cy9UVl9DaGF5a2EyMDYubXRsJyk7XG5cbiAgICAgICAgLy/jg4bjgq3jgrnjg4hcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLkZvbnRMb2FkZXIoKTtcbiAgICAgICAgbG9hZGVyLmxvYWQoJ2h0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvZm9udHMvaGVsdmV0aWtlcl9yZWd1bGFyLnR5cGVmYWNlLmpzb24nLCAoZm9udCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dEdlb21ldHJ5ID0gbmV3IFRIUkVFLlRleHRHZW9tZXRyeShcIlRhcCB0aGUgVFYgdG8gY2hhbmdlIHRoZSB3b3JsZFwiLCB7XG4gICAgICAgICAgICAgICAgZm9udDogZm9udCxcbiAgICAgICAgICAgICAgICBzaXplOiAwLjEsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjAwNVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSk7XG4gICAgICAgICAgICB0aGlzLnRleHRNZXNoID0gbmV3IFRIUkVFLk1lc2godGV4dEdlb21ldHJ5LCB0ZXh0TWF0ZXJpYWwpO1xuICAgICAgICAgICAgdGhpcy50ZXh0TWVzaC5wb3NpdGlvbi5zZXQoLTEsIDAuNjIsIDApO1xuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy50ZXh0TWVzaCk7XG5cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRleHQoKTtcbiAgICAgICAgfSk7ICAgICAgICBcblxuICAgICAgICAvLyDluooxXG4gICAgICAgIGNvbnN0IHNpemUgPSAxMDAwO1xuICAgICAgICBjb25zdCBkaXZpc2lvbnMgPSA0MDA7XG4gICAgICAgIGNvbnN0IGZsb29yR2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShzaXplLCBzaXplKTtcbiAgICAgICAgY29uc3QgZmxvb3JNYXRlcmlhbCA9IHRoaXMuY3JlYXRlQ2hlY2tlcmJvYXJkVGV4dHVyZShzaXplLCBkaXZpc2lvbnMpO1xuICAgICAgICB0aGlzLmZsb29yMSA9IG5ldyBUSFJFRS5NZXNoKGZsb29yR2VvbWV0cnksIGZsb29yTWF0ZXJpYWwpO1xuICAgICAgICB0aGlzLmZsb29yMS5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLmZsb29yMS5wb3NpdGlvbi55ID0gLTU7XG5cbiAgICAgICAgLy8g5bqKMlxuICAgICAgICBjb25zdCBmbG9vck1hdGVyaWFsMiA9IHRoaXMuY3JlYXRlU3RyaXBlZFRleHR1cmUoc2l6ZSwgMjAwKTtcbiAgICAgICAgY29uc3QgZmxvb3JHZW9tZXRyeTIgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShzaXplLCBzaXplLCAyMDAsIDIwMCk7XG4gICAgICAgIHRoaXMuZmxvb3IyID0gbmV3IFRIUkVFLk1lc2goZmxvb3JHZW9tZXRyeTIsIGZsb29yTWF0ZXJpYWwyKTtcbiAgICAgICAgdGhpcy5mbG9vcjIucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICAgICAgdGhpcy5mbG9vcjIucG9zaXRpb24ueSA9IC01O1xuICAgICAgICB0aGlzLmZsb29yMi5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mbG9vcjJJbml0aWFsUG9zaXRpb25aID0gdGhpcy5mbG9vcjIucG9zaXRpb24uejtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdvcmxkID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmZsb29yMSk7XG4gICAgICAgICAgICB0aGlzLmFkZFNwaGVyZXMoKTtcbiAgICAgICAgICAgIHRoaXMuYmdtLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOW6ijHjga7jg4Hjgqfjg4Pjgq/mn4TjgpLkvZzjgotcbiAgICBwcml2YXRlIGNyZWF0ZUNoZWNrZXJib2FyZFRleHR1cmUoc2l6ZTogbnVtYmVyLCBkaXZpc2lvbnM6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gc2l6ZSAqIDEwO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZSAqIDEwO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gWycjZmY2OWI0JywgJyNmZmNjZTUnXTtcbiAgICAgICAgY29uc3Qgc3F1YXJlU2l6ZSA9IGNhbnZhcy53aWR0aCAvIGRpdmlzaW9ucztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpdmlzaW9uczsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRpdmlzaW9uczsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcnNbKGkgKyBqKSAlIDJdO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSAqIHNxdWFyZVNpemUsIGogKiBzcXVhcmVTaXplLCBzcXVhcmVTaXplLCBzcXVhcmVTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgICAgICB0ZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgdGV4dHVyZS5tYWdGaWx0ZXIgPSBUSFJFRS5MaW5lYXJGaWx0ZXI7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlIH0pO1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfVxuXG4gICAgLy8g5bqKMuOBruOCueODiOODqeOCpOODl+afhOOCkuS9nOOCi1xuICAgIHByaXZhdGUgY3JlYXRlU3RyaXBlZFRleHR1cmUoc2l6ZTogbnVtYmVyLCBkaXZpc2lvbnM6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gc2l6ZSAqIDU7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBzaXplICogNTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIFxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDkwMDMzJztcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIFxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyNGRjAwQTYnO1xuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDI7XG4gICAgXG4gICAgICAgIGNvbnN0IHN0ZXAgPSBjYW52YXMud2lkdGggLyBkaXZpc2lvbnM7XG4gICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGRpdmlzaW9uczsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8oaSAqIHN0ZXAsIDApO1xuICAgICAgICAgICAgY29udGV4dC5saW5lVG8oaSAqIHN0ZXAsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbygwLCBpICogc3RlcCk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhjYW52YXMud2lkdGgsIGkgKiBzdGVwKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5DYW52YXNUZXh0dXJlKGNhbnZhcyk7XG4gICAgICAgIHRleHR1cmUubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xuICAgICAgICB0ZXh0dXJlLm1hZ0ZpbHRlciA9IFRIUkVFLkxpbmVhckZpbHRlcjtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUgfSk7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG5cbiAgICAvL+W6ijLjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICBwcml2YXRlIGFuaW1hdGVGbG9vcjIgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRXb3JsZCA9PT0gMikge1xuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjA1O1xuICAgICAgICAgICAgdGhpcy5mbG9vcjIucG9zaXRpb24ueiArPSBzcGVlZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuZmxvb3IyLnBvc2l0aW9uLnogPiB0aGlzLmZsb29yMkluaXRpYWxQb3NpdGlvblogKyAxMDApIHsgLy/luorjg6vjg7zjg5dcbiAgICAgICAgICAgICAgICB0aGlzLmZsb29yMi5wb3NpdGlvbi56ID0gdGhpcy5mbG9vcjJJbml0aWFsUG9zaXRpb25aO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVFbjg6Ljg4fjg6vjga7oqq3jgb/ovrzjgb9cbiAgICBwcml2YXRlIGxvYWRUVk1vZGVsID0gKG9iakZpbGVQYXRoOiBzdHJpbmcsIG10bEZpbGVQYXRoOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgbXRsTG9hZGVyID0gbmV3IE1UTExvYWRlcigpO1xuICAgICAgICBtdGxMb2FkZXIubG9hZChtdGxGaWxlUGF0aCwgKG1hdGVyaWFscykgPT4ge1xuICAgICAgICAgICAgbWF0ZXJpYWxzLnByZWxvYWQoKTtcbiAgICAgICAgICAgIGNvbnN0IG9iakxvYWRlciA9IG5ldyBPQkpMb2FkZXIoKTtcbiAgICAgICAgICAgIG9iakxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWxzKTtcbiAgICAgICAgICAgIG9iakxvYWRlci5sb2FkKG9iakZpbGVQYXRoLCAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50diA9IG9iamVjdDtcbiAgICAgICAgICAgICAgICB0aGlzLnR2LnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnR2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyDnkIPjga7ov73liqBcbiAgICBwcml2YXRlIGFkZFNwaGVyZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNwaGVyZU51bSA9IDgwO1xuICAgICAgICBjb25zdCBzcGhlcmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgxLCAzMiwgMzIpO1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlTG9hZGVyLmxvYWQoJ2Fzc2V0cy9UaWxlczEwN18xSy1QTkdfTm9ybWFsRFgucG5nJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGhlcmVOdW07IGkrKykge1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsO1xuICAgICAgICAgICAgaWYgKGkgJSAzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBtYXA6IHRleHR1cmUgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgJSAzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbWlzc2lvbjogMS4zLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJvdWdobmVzczogMCxcbiAgICAgICAgICAgICAgICAgICAgaW9yOiAxLjYsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzcGhlcmUgPSBuZXcgVEhSRUUuTWVzaChzcGhlcmVHZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgc3BoZXJlLnBvc2l0aW9uLnNldChcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMjQwIC0gMTIwLFxuICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKiA1ICsgMSxcbiAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogMjQwIC0gMTIwXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3BoZXJlLnNjYWxlLnNldFNjYWxhcihNYXRoLnJhbmRvbSgpICogMiArIDAuNSk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZChzcGhlcmUpO1xuICAgICAgICAgICAgdGhpcy5zcGhlcmVzLnB1c2goc3BoZXJlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOeQg+OBruOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgIHByaXZhdGUgYW5pbWF0ZVNwaGVyZXMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpICogMC4wMDE7XG5cbiAgICAgICAgdGhpcy5zcGhlcmVzLmZvckVhY2goKHNwaGVyZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaW5kZXggJSA0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUucG9zaXRpb24ueSArPSBNYXRoLnNpbih0aW1lICsgaW5kZXgpICogMC4wNTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBzcGhlcmUucm90YXRpb24ueCArPSAwLjAyO1xuICAgICAgICAgICAgICAgICAgICBzcGhlcmUucm90YXRpb24ueSArPSAwLjAyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHNwaGVyZS5wb3NpdGlvbi54ICs9IE1hdGguc2luKHRpbWUgKyBpbmRleCkgKiBNYXRoLnJhbmRvbSgpICogMC4wNTtcbiAgICAgICAgICAgICAgICAgICAgc3BoZXJlLnBvc2l0aW9uLnogKz0gTWF0aC5jb3ModGltZSArIGluZGV4KSAqIE1hdGgucmFuZG9tKCkgKiAwLjA1O1xuICAgICAgICAgICAgICAgICAgICBzcGhlcmUucm90YXRpb24ueSArPSAwLjAyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHNwaGVyZS5wb3NpdGlvbi55ICs9IE1hdGguc2luKHRpbWUgKyBpbmRleCkgKiBNYXRoLnJhbmRvbSgpICogMC4wNTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8g44OG44Kt44K544OI44Gu44Ki44OL44Oh44O844K344On44OzXG4gICAgcHJpdmF0ZSBhbmltYXRlVGV4dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSB7IHk6IDAuNjIgfTtcbiAgICAgICAgY29uc3QgZW5kID0geyB5OiAwLjcgfTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSAxMDAwO1xuICAgIFxuICAgICAgICBjb25zdCB0d2VlblVwID0gbmV3IFRXRUVOLlR3ZWVuKHN0YXJ0KVxuICAgICAgICAgICAgLnRvKGVuZCwgZHVyYXRpb24pXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0TWVzaC5wb3NpdGlvbi55ID0gc3RhcnQueTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHdlZW5Eb3duLnN0YXJ0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgY29uc3QgdHdlZW5Eb3duID0gbmV3IFRXRUVOLlR3ZWVuKGVuZClcbiAgICAgICAgICAgIC50byhzdGFydCwgZHVyYXRpb24pXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0TWVzaC5wb3NpdGlvbi55ID0gZW5kLnk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHR3ZWVuVXAuc3RhcnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICB0d2VlblVwLnN0YXJ0KCk7XG4gICAgfVxuICAgIFxuXG4gICAgLy8g5pif44Gu6L+95YqgXG4gICAgcHJpdmF0ZSBjcmVhdGVTdGFycyA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3Rhckdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgICAgIGNvbnN0IHN0YXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgICAgY29uc3Qgc3RhclZlcnRpY2VzID0gW107XG4gICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODAwMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMzAwMDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAzMDAwO1xuICAgICAgICAgICAgY29uc3QgeiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDMwMDA7XG4gICAgXG4gICAgICAgICAgICBzdGFyVmVydGljZXMucHVzaCh4LCB5LCB6KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBzdGFyR2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKHN0YXJWZXJ0aWNlcywgMykpO1xuICAgIFxuICAgICAgICBjb25zdCBzdGFycyA9IG5ldyBUSFJFRS5Qb2ludHMoc3Rhckdlb21ldHJ5LCBzdGFyTWF0ZXJpYWwpO1xuICAgICAgICBzdGFycy5uYW1lID0gJ3N0YXJzJztcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoc3RhcnMpO1xuICAgIH1cbiAgICBcbiAgICAvLyDlsbHjga7ov73liqBcbiAgICBwcml2YXRlIGFkZE1vdW50YWluID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDEwMDAwO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSA4MDA7XG4gICAgICAgIGNvbnN0IGRpdmlzaW9ucyA9IDI1NjtcbiAgICAgICAgY29uc3QgaGVpZ2h0RmFjdG9yID0gMzA7XG4gICAgICAgIGNvbnN0IG5vaXNlU2NhbGUgPSA1MDtcbiAgICBcbiAgICAgICAgY29uc3QgbW91bnRhaW5HZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KHdpZHRoLCBoZWlnaHQsIGRpdmlzaW9ucywgZGl2aXNpb25zKTtcbiAgICAgICAgY29uc3Qgc2ltcGxleCA9IG5ldyBTaW1wbGV4Tm9pc2UoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbW91bnRhaW5HZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9uLmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBwb3NpdGlvbi5nZXRYKGkpO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBvc2l0aW9uLmdldFkoaSk7XG4gICAgICAgICAgICBjb25zdCBub2lzZSA9IHNpbXBsZXgubm9pc2UoeCAvIG5vaXNlU2NhbGUsIHkgLyBub2lzZVNjYWxlKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSBub2lzZSAqIGhlaWdodEZhY3RvcjtcbiAgICAgICAgICAgIHBvc2l0aW9uLnNldFooaSwgeik7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbW91bnRhaW5HZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuICAgIFxuICAgICAgICBjb25zdCBtb3VudGFpbk1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MGQwMDRkLCB3aXJlZnJhbWU6IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IG1vdW50YWluID0gbmV3IFRIUkVFLk1lc2gobW91bnRhaW5HZW9tZXRyeSwgbW91bnRhaW5NYXRlcmlhbCk7XG4gICAgICAgIG1vdW50YWluLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgICAgIG1vdW50YWluLnBvc2l0aW9uLnNldCgwLCAwLCAtNTAwKTtcbiAgICAgICAgbW91bnRhaW4ubmFtZSA9ICdtb3VudGFpbic7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1vdW50YWluKTtcbiAgICB9XG5cbiAgICAvLyDmnIjjga7ov73liqBcbiAgICBwcml2YXRlIGFkZE1vb24gPSAoKSA9PntcbiAgICAgICAgY29uc3QgbW9vblRleHR1cmUgPSB0aGlzLnRleHR1cmVMb2FkZXIubG9hZCgnYXNzZXRzL21vb24ucG5nJyk7XG4gICAgICAgIGNvbnN0IG1vb25NYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7IG1hcDogbW9vblRleHR1cmUgfSk7XG4gICAgICAgIGNvbnN0IG1vb24gPSBuZXcgVEhSRUUuU3ByaXRlKG1vb25NYXRlcmlhbCk7XG4gICAgICAgIG1vb24ucG9zaXRpb24uc2V0KDAsIDI1MCwgLTgwMCk7IFxuICAgICAgICBtb29uLnNjYWxlLnNldCgzMDAsIDMwMCwgMSk7IFxuICAgICAgICBtb29uLm5hbWUgPSAnbW9vbic7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1vb24pOyAgXG4gICAgfVxuICAgICBcbiAgICAvLyDjg5XjgqPjg6vjgr/jg7xcbiAgICBwcml2YXRlIHNldHVwUG9zdFByb2Nlc3NpbmcgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIodGhpcy5yZW5kZXJlcik7XG4gICAgICAgIGNvbnN0IHJlbmRlclBhc3MgPSBuZXcgUmVuZGVyUGFzcyh0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgIHRoaXMuY29tcG9zZXIuYWRkUGFzcyhyZW5kZXJQYXNzKTtcblxuICAgICAgICAvLyBGaWxtUGFzc1xuICAgICAgICB0aGlzLmZpbG1QYXNzID0gbmV3IEZpbG1QYXNzKDAuMzUsIDAuMDI1LCA2NDgsIDApO1xuICAgICAgICB0aGlzLmNvbXBvc2VyLmFkZFBhc3ModGhpcy5maWxtUGFzcyk7XG4gICAgfVxuXG4gICAgLy8g44Ov44O844Or44OJ5YiH44KK5pu/44GIXG4gICAgcHJpdmF0ZSBzd2l0Y2hXb3JsZCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50V29ybGQgPSB0aGlzLmN1cnJlbnRXb3JsZCA9PT0gMSA/IDIgOiAxO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50V29ybGQgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDQ5NWVkKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZmxvb3IxKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMuZmxvb3IyKTtcbiAgICAgICAgICAgIHRoaXMuYWRkU3BoZXJlcygpO1xuICAgICAgICAgICAgdGhpcy5iZ20uc3JjID0gXCJhc3NldHMvTmVvbiBEcmVhbXNjYXBlLm1wM1wiO1xuICAgICAgICAgICAgdGhpcy5iZ20ucGxheSgpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnMgPSB0aGlzLnNjZW5lLmdldE9iamVjdEJ5TmFtZSgnc3RhcnMnKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdW50YWluID0gdGhpcy5zY2VuZS5nZXRPYmplY3RCeU5hbWUoJ21vdW50YWluJyk7XG4gICAgICAgICAgICBjb25zdCBtb29uID0gdGhpcy5zY2VuZS5nZXRPYmplY3RCeU5hbWUoJ21vb24nKTtcbiAgICAgICAgICAgIGlmIChzdGFycykgdGhpcy5zY2VuZS5yZW1vdmUoc3RhcnMpO1xuICAgICAgICAgICAgaWYgKG1vdW50YWluKSB0aGlzLnNjZW5lLnJlbW92ZShtb3VudGFpbik7XG4gICAgICAgICAgICBpZiAobW9vbikgdGhpcy5zY2VuZS5yZW1vdmUobW9vbik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDRiMDA4Mik7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmZsb29yMik7XG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZSh0aGlzLmZsb29yMSk7XG4gICAgICAgICAgICB0aGlzLnNwaGVyZXMuZm9yRWFjaChzcGhlcmUgPT4gdGhpcy5zY2VuZS5yZW1vdmUoc3BoZXJlKSk7XG4gICAgICAgICAgICB0aGlzLmJnbS5zcmMgPSBcImFzc2V0cy9JbiBUaGUgTW9vbmxpZ2h0IEdsb3cubXAzXCI7XG4gICAgICAgICAgICB0aGlzLmJnbS5wbGF5KCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0YXJzKCk7XG4gICAgICAgICAgICB0aGlzLmFkZE1vdW50YWluKCk7XG4gICAgICAgICAgICB0aGlzLmFkZE1vb24oKTsgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOOCr+ODquODg+OCr+OBp1RW44KS44K644O844OgXG4gICAgcHJpdmF0ZSBvbkRvY3VtZW50TW91c2VEb3duID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5tb3VzZS54ID0gKGV2ZW50LmNsaWVudFggLyB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQuY2xpZW50V2lkdGgpICogMiAtIDE7XG4gICAgICAgIHRoaXMubW91c2UueSA9IC0oZXZlbnQuY2xpZW50WSAvIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQpICogMiArIDE7XG5cbiAgICAgICAgdGhpcy5yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSh0aGlzLm1vdXNlLCB0aGlzLmNhbWVyYSk7XG5cbiAgICAgICAgY29uc3QgaW50ZXJzZWN0cyA9IHRoaXMucmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoW3RoaXMudHZdLCB0cnVlKTtcblxuICAgICAgICBpZiAoaW50ZXJzZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDYW1lcmFBdFRWKSB7XG4gICAgICAgICAgICAgICAgLy8g44OG44Os44OT44Gu5q2j6Z2i44Gr56e75YuVXG4gICAgICAgICAgICAgICAgZ3NhcC50byh0aGlzLmNhbWVyYS5wb3NpdGlvbiwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy50di5wb3NpdGlvbi54LFxuICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnR2LnBvc2l0aW9uLnkgKyAwLjcsXG4gICAgICAgICAgICAgICAgICAgIHo6IHRoaXMudHYucG9zaXRpb24ueiArIDAuNixcbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdCh0aGlzLnR2LnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYUF0VFYgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOODhuODrOODk+OBruato+mdouOBq+OCq+ODoeODqeOBjOOBguOCi+WgtOWQiOOBq+OBruOBv+ODr+ODvOODq+ODieOCkuWIh+OCiuabv+OBiOOCi1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2FtZXJhQXRUVikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaFdvcmxkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOOCq+ODoeODqeOCkuWFg+OBruS9jee9ruOBq+aIu+OBmVxuICAgICAgICAgICAgICAgICAgICBnc2FwLnRvKHRoaXMuY2FtZXJhLnBvc2l0aW9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuY2FtZXJhUG9zT3JpZ2luYWwueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuY2FtZXJhUG9zT3JpZ2luYWwueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHo6IHRoaXMuY2FtZXJhUG9zT3JpZ2luYWwueixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NhbWVyYUF0VFYgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG5cbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAxLCAxKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc19nc2FwX2luZGV4X2pzLW5vZGVfbW9kdWwtN2Y1OTU1XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9