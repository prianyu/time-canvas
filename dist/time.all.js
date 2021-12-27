(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TimeCanvas = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    Object.defineProperty(subClass, "prototype", {
      value: Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      }),
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var digit = [[[0, 0, 1, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, 0, 0]], //0
  [[0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1]], //1
  [[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1]], //2
  [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //3
  [[0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1]], //4
  [[1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //5
  [[0, 0, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //6
  [[1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0]], //7
  [[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //8
  [[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0, 0]], //9
  [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]] //:
  ];

  var FORMATS = ['h:i:s', 'h:i', 'i:s', 's'];
  var pad = function pad(n) {
    return n < 10 ? "0".concat(n) : n;
  };
  var Base = /*#__PURE__*/function () {
    function Base() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Base);

      this.options = Object.assign({
        colors: ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"],
        color: '#0081FF',
        width: 320,
        height: 200,
        center: true,
        middle: true,
        padding: 20,
        size: 0,
        ballCount: 300,
        format: FORMATS[0]
      }, options);
      this.id = id || 'canvas';
      this._balls = [];
      var canvas = document.getElementById(this.id);
      canvas.width = this.options.width;
      canvas.height = this.options.height;
      this.context = canvas.getContext("2d");

      if (!FORMATS.includes(this.options.format)) {
        this.options.format = FORMATS[0];
      }
    }

    _createClass(Base, [{
      key: "_play",
      value: function _play() {
        var _this = this;

        this._clearTimer();

        this._timer = setInterval(function () {
          _this._render();

          _this._update();
        }, 50);
      }
    }, {
      key: "_pause",
      value: function _pause(reserve) {
        var _this2 = this;

        if (!this._timer) return;

        this._clearTimer();

        if (reserve !== true) {
          this._timer = setInterval(function () {
            _this2._render();

            _this2._updateBalls();
          }, 50);
        }
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        var _this$options = this.options,
            width = _this$options.width,
            height = _this$options.height;

        this._clearTimer();

        this.context.clearRect(0, 0, width, height);
        this._balls = [];
      }
    }, {
      key: "_render",
      value: function _render() {
        var _this$options2 = this.options,
            width = _this$options2.width,
            height = _this$options2.height;

        var renderDigit = this._renderDigit.bind(this);

        var ctx = this.context;

        var renderData = this._getRenderData(this._currentTime);

        this._rect = this._getRect(renderData);
        var top = this._rect.top;
        ctx.clearRect(0, 0, width, height);

        for (var i = 0; i < renderData.length; i++) {
          renderDigit(this._getOffset(renderData, i), top, renderData[i]);
        }

        this._renderBalls();
      }
    }, {
      key: "_update",
      value: function _update() {
        var nextTime = this.getCurrentTime();

        var nextRenderData = this._getRenderData(nextTime);

        var lastRenderData = this._getRenderData(this._currentTime);

        var top = this._rect.top;

        this._emit('change', nextTime);

        if (nextRenderData.join("") != lastRenderData.join("")) {
          for (var i = 0; i < lastRenderData.length; i++) {
            if (nextRenderData[i] != lastRenderData[i]) {
              this._addBall(this._getOffset(lastRenderData, i), top, lastRenderData[i]);
            }
          }

          this._currentTime = nextTime;
        }

        this._updateBalls();
      } // abstract

    }, {
      key: "_getRenderData",
      value: function _getRenderData() {}
    }, {
      key: "_renderBalls",
      value: function _renderBalls() {
        var balls = this._balls;
        var radius = this._rect.radius;
        var ctx = this.context;

        for (var i = 0; i < balls.length; i++) {
          ctx.fillStyle = balls[i].color;
          ctx.beginPath();
          ctx.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
          ctx.closePath();
          ctx.fill();
        }
      }
    }, {
      key: "_renderDigit",
      value: function _renderDigit(x, y, num) {
        var ctx = this.context;
        var radius = this._rect.radius;
        var size = radius + 1;
        num = num === ":" ? 10 : parseInt(num);
        ctx.fillStyle = this.options.color;

        for (var i = 0; i < digit[num].length; i++) {
          for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
              ctx.beginPath();
              ctx.arc(x + size + j * 2 * size, y + size + i * 2 * size, radius, 0, 2 * Math.PI);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      }
    }, {
      key: "_addBall",
      value: function _addBall(x, y, num) {
        var radius = this._rect.radius;
        var size = radius + 1;
        var colors = this.options.colors;

        for (var i = 0; i < digit[num].length; i++) {
          for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
              var ball = {
                x: x + j * 2 * size + size,
                y: y + i * 2 * size + size,
                g: 1.5 + Math.random(),
                vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 5,
                vy: -5,
                color: colors[Math.floor(Math.random() * colors.length)]
              };

              this._balls.push(ball);
            }
          }
        }
      } // abstract

    }, {
      key: "_updateBalls",
      value: function _updateBalls() {}
    }, {
      key: "_getRenderBalls",
      value: function _getRenderBalls() {
        var _this$options3 = this.options,
            width = _this$options3.width,
            height = _this$options3.height;
        var balls = this._balls;
        var radius = this._rect.radius;

        for (var i = 0; i < balls.length; i++) {
          balls[i].x += balls[i].vx;
          balls[i].y += balls[i].vy;
          balls[i].vy += balls[i].g; //bound

          if (balls[i].y >= height - radius) {
            balls[i].y = height - radius;
            balls[i].vy = -balls[i].vy * 0.75;
          } else if (balls[i].x >= width - radius) {
            balls[i].x = width - radius;
            balls[i].vx = -balls[i].vx * 3;
          }
        }

        var cnt = 0;

        for (var _i = 0; _i < balls.length; _i++) {
          if (balls[_i].x + radius > 0 && balls[_i].x - radius < width) {
            balls[cnt++] = balls[_i];
          }
        }

        while (balls.length > Math.min(this.options.ballCount, cnt)) {
          balls.pop();
        }

        return cnt;
      }
    }, {
      key: "_getOffset",
      value: function _getOffset(arr, index) {
        var offset = this._rect.left;
        var size = this._rect.radius + 1;

        for (var i = 0; i <= index; i++) {
          var last = arr[i - 1];

          if (last) {
            offset += (last === ':' ? 9 : 15) * size;
          }
        }

        return offset;
      }
    }, {
      key: "_getRect",
      value: function _getRect(arr) {
        var _this$options4 = this.options,
            width = _this$options4.width,
            height = _this$options4.height,
            padding = _this$options4.padding,
            size = _this$options4.size,
            center = _this$options4.center,
            middle = _this$options4.middle;
        var validWidth = width - padding * 2;
        var validHeight = height - padding * 2;
        var left,
            top,
            radius,
            count = 0;

        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== ':') {
            count += 14;

            if (arr[i + 1] && arr[i + 1] !== ':') {
              count += 2;
            }
          } else {
            count += 9;
          }
        } // 粒子半径


        if (size) {
          radius = size / 14 - 1;
        } else {
          radius = validWidth / count - 1;
        }

        radius = Math.max(1, radius); // 坐标原点

        if (center) {
          left = padding + validWidth / 2 - count / 2 * (radius + 1);
        } else {
          left = padding;
        }

        if (middle) {
          top = padding + validHeight / 2 - 10 * (radius + 1);
        } else {
          top = padding;
        }

        return {
          left: left,
          top: top,
          radius: radius
        };
      }
    }, {
      key: "_clearTimer",
      value: function _clearTimer() {
        clearInterval(this._timer);
        this._timer = null;
      }
    }, {
      key: "_emit",
      value: function _emit(type) {
        var callback = this.options[type];

        if (typeof callback === 'function') {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          return callback.apply(void 0, params);
        }
      }
    }]);

    return Base;
  }();

  var TYPES = ['time', 'count', 'countdown'];
  var DEFAULT_OPTIONS = {
    type: TYPES[0],
    autoConvert: true
  };

  var Time = /*#__PURE__*/function (_Base) {
    _inherits(Time, _Base);

    var _super = _createSuper(Time);

    function Time() {
      var _this;

      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas';
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_OPTIONS;

      _classCallCheck(this, Time);

      _this = _super.call(this, id, options);

      if (!TYPES.includes(_this.options.type)) {
        _this.options.type = TYPES[0];
      }

      if (_this.options.type !== 'time') {
        if (!(Number(_this.options.endTime) >= 0)) {
          _this.options.endTime = _this.options.type === 'count' ? Infinity : 60;
        }

        _this._endTime = _this.options.endTime * 1000; // trans to milliseconds

        _this._createState();
      }

      _this._init();

      return _possibleConstructorReturn(_this, _this._getInstance());
    }

    _createClass(Time, [{
      key: "_getInstance",
      value: function _getInstance() {
        var _this2 = this;

        var obj = {};
        var keys = ['pause', 'play', 'getCurrentTime', 'reset', 'destroy'];
        keys.map(function (item) {
          obj[item] = _this2[item].bind(_this2);
        });
        return obj;
      }
    }, {
      key: "_init",
      value: function _init() {
        var type = this.options.type;

        if (type === 'time') {
          this._play();
        } else {
          this._currentTime = this.getCurrentTime();

          this._render();
        }

        this._emit("init", this._currentTime);
      }
    }, {
      key: "_createState",
      value: function _createState() {
        this._state = {
          ended: false,
          stopped: true,
          diff: 0,
          waiting: false
        };
      }
    }, {
      key: "getCurrentTime",
      value: function getCurrentTime(time) {
        var _this$_startTime;

        var now = time || new Date();
        var type = this.options.type;

        if (type === 'time') {
          return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            milliseconds: now.getMilliseconds(),
            now: now
          };
        }

        var startTime = ((_this$_startTime = this._startTime) === null || _this$_startTime === void 0 ? void 0 : _this$_startTime.time) || now;
        var diff = now - startTime;

        if (type === 'countdown') {
          diff = Math.max(0, this._endTime - diff);
        }

        if (type === 'count') {
          diff = Math.min(diff, this._endTime);
        }

        var seconds = parseInt(diff / 1000);
        var milliseconds = diff % 1000;

        if (type === 'countdown' && diff <= 0 || type === 'count' && diff >= this._endTime) {
          this._state.ended = true;
        }

        return {
          hours: parseInt(seconds / 3600),
          minutes: parseInt(seconds % 3600 / 60),
          seconds: seconds % 60,
          milliseconds: milliseconds,
          time: now
        };
      }
    }, {
      key: "_resetStartTime",
      value: function _resetStartTime() {
        var current = new Date();
        var diff = this._state.diff;
        var copyCurrent = new Date(current);
        this._startTime = null;
        current.setMilliseconds(current.getMilliseconds() - diff);
        this._startTime = this.getCurrentTime(current);
        this._currentTime = this.getCurrentTime(copyCurrent);
      }
    }, {
      key: "play",
      value: function play(state) {
        if (this._state.ended || !this._state.stopped) return;

        if (!this._startTime) {
          this._startTime = this._currentTime = this.getCurrentTime();

          this._emit('start', this._currentTime);
        } else {
          if (state === 0) {
            this._startTime = this._currentTime = this.getCurrentTime();

            this._createState();
          } else if (state === 1) {
            this._resetStartTime();
          }
        }

        this._state.stopped = false;
        return this._play();
      }
    }, {
      key: "pause",
      value: function pause(reserve) {
        console.log(this);
        if (this._state.stopped) return;
        this._state.stopped = true;
        this._state.diff = new Date() - this._startTime.time;
        return this._pause(reserve);
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.type === 'time') return;

        this._clearTimer();

        this._balls = [];

        this._createState();

        this._startTime = null;
        this._currentTime = this.getCurrentTime();

        this._render();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._createState();

        this._startTime = null;
        return this._destroy();
      }
    }, {
      key: "_getRenderData",
      value: function _getRenderData(time) {
        var hours = time.hours,
            minutes = time.minutes,
            seconds = time.seconds;
        var type = this.options.type;
        var str = this.options.format;

        if (type === 'time' || str === 'h:i:s' || str === 'h:i' || str === 'i:s' && this.options.autoConvert && hours) {
          str = str.replace('h', pad(hours)).replace('i', pad(minutes)).replace('s', pad(seconds));
        } else if (str === 'i:s') {
          str = "".concat(pad(minutes + hours * 60), ":").concat(pad(seconds));
        } else {
          str = "".concat(hours * 3600 + minutes * 60 + seconds);
        }

        return str.split('');
      }
    }, {
      key: "_updateBalls",
      value: function _updateBalls() {
        var ballCount = this._getRenderBalls();

        if (!ballCount && this._state.ended) {
          this._clearTimer();

          this._state.waiting = false;

          this._emit("finish", this.currentTime);
        }

        if (this._state.ended && !this._state.waiting) {
          this.emit("end", nextTime);
          this._state.waiting = true;
        }
      }
    }]);

    return Time;
  }(Base);

  return Time;

}));
