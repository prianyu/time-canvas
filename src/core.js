import digit from './meta'
const FORMATS = ['h:i:s', 'h:i', 'i:s', 's']
export const DEFAULT_OPTIONS = {
  colors: ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"],
  color: '#0081FF',
  width: 320,
  height: 200,
  center: true,
  middle: true,
  padding: 20,
  size: 0,
  ballCount: 300,
  format: FORMATS[0]
}

export const pad = n => n < 10 ? `0${n}` : n

export class Base {
	constructor(id = 'canvas', options = {}) {
		this.options = Object.assign({
			colors: ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"],
			color: '#0081FF',
			width: 320,
			height: 200,
			center: true,
			middle: true,
			padding: 20,
		  size: 0,
			ballCount: 300,
			format: FORMATS[0]
		}, options)

		this.id = id || 'canvas'
		this._balls = []
    //#if _MINIPROGRAM
    this.context = wx.createCanvasContext(this.id)
    //#else
    const canvas = document.getElementById(this.id)
    canvas.width = this.options.width
    canvas.height = this.options.height
    this.context = canvas.getContext("2d")
    //#endif
    
		if(!FORMATS.includes(this.options.format)) {
			this.options.format = FORMATS[0]
		}
	}

	_play() {
		this._clearTimer()
		this._timer = setInterval(() => {
			this._render()
			this._update()
		}, 50)
	}

	_pause(reserve) {
		if(!this._timer) return
		this._clearTimer()
		if(reserve !== true) {
			this._timer = setInterval(() => {
				this._render()
				this._updateBalls()
			}, 50)
		}
	}

	_destroy() {
		const { width, height } = this.options
		this._clearTimer()
		this.context.clearRect(0, 0, width, height)
		this._balls = []
	}

	_render(){
		const { width, height } = this.options
		const renderDigit = this._renderDigit.bind(this)
		const ctx = this.context
		const renderData = this._getRenderData(this._currentTime)
		this._rect = this._getRect(renderData)
		const { top } = this._rect

		ctx.clearRect(0, 0, width, height)

		for(let i = 0; i < renderData.length; i++) {
			renderDigit(this._getOffset(renderData, i), top, renderData[i])
		}

		this._renderBalls()

    //#if _MINIPROGRAM
    ctx.draw()
    //#endif
	}

	_update(){
		const nextTime = this.getCurrentTime()
		const nextRenderData = this._getRenderData(nextTime)
		const lastRenderData = this._getRenderData(this._currentTime)
		const { top } = this._rect
		
		this._emit('change', nextTime)

		if(nextRenderData.join("") != lastRenderData.join("")){
			for(let i = 0; i < lastRenderData.length; i++) {
				if(nextRenderData[i] != lastRenderData[i]) {
					this._addBall(this._getOffset(lastRenderData, i), top, lastRenderData[i])
				}
			}
			this._currentTime = nextTime
		}
		this._updateBalls(nextTime)
	}

  // abstract
  _getRenderData() {}

	_renderBalls() {
		const balls = this._balls
		const radius = this._rect.radius
		const ctx = this.context
		for( let i = 0; i < balls.length; i ++ ){
			ctx.fillStyle = balls[i].color
			ctx.beginPath()
			ctx.arc( balls[i].x , balls[i].y , radius , 0 , 2 * Math.PI , true )
			ctx.closePath()
			ctx.fill()
		}
	}

	_renderDigit(x, y, num){
		const ctx = this.context
		const radius = this._rect.radius
		const size = radius + 1

		num = num === ":" ? 10 : parseInt(num)
		ctx.fillStyle = this.options.color

		for(let i = 0; i < digit[num].length; i++){
			for(let j = 0; j < digit[num][i].length; j++){
				if(digit[num][i][j] == 1){
					ctx.beginPath()
					ctx.arc(x + size + j * 2 * size, y + size + i * 2 * size, radius, 0, 2 * Math.PI)
					ctx.closePath()
					ctx.fill()
				}
			}
		}
	}

	_addBall( x , y , num ){
		const { radius } = this._rect
		const size = radius + 1
		const colors = this.options.colors
		
		for(let i = 0; i < digit[num].length; i ++)
			for(let j = 0; j < digit[num][i].length; j++)
				if( digit[num][i][j] == 1){
					let ball = {
						x: x + j * 2 * size + size,
						y: y + i * 2 * size+ size,
						g: 1.5 + Math.random(),
						vx: Math.pow(-1 , Math.ceil(Math.random() * 1000 )) * 5,
						vy: -5,
						color: colors[Math.floor(Math.random() * colors.length)]
					}
					this._balls.push( ball )
			}
	}

  // abstract
  _updateBalls() {}

	_getRenderBalls(){
		const { width, height } = this.options
		const balls = this._balls
		const radius = this._rect.radius

		for(let i = 0; i < balls.length; i++ ){
			balls[i].x += balls[i].vx
			balls[i].y += balls[i].vy
			balls[i].vy += balls[i].g

			//bound
			if( balls[i].y >= height - radius){
				balls[i].y = height - radius
				balls[i].vy = -balls[i].vy * 0.75
			} else if(balls[i].x >= width -radius){
				balls[i].x = width -radius
				balls[i].vx = - balls[i].vx * 3
			}
		}

		let cnt = 0
		for(let i = 0; i < balls.length; i++){
			if(balls[i].x + radius > 0 && balls[i].x - radius < width) {
				balls[cnt++] = balls[i]
			}
		}
		while(balls.length > Math.min(this.options.ballCount, cnt)){
			balls.pop()
		}

    return cnt
	}

	_getOffset(arr, index) {
		let offset = this._rect.left
		const size = this._rect.radius + 1
		for(let i = 0; i <= index; i++) {
			const last = arr[i - 1]
			if(last) {
				offset += (last === ':' ? 9 : 15) * size
			}
		}
		return offset
	}

	_getRect(arr) {
		const { width, height, padding, size, center, middle } = this.options
		const validWidth = width - padding * 2
		const validHeight = height - padding * 2
		let left, top, radius, count = 0

		for(let i = 0; i < arr.length; i++) {
			if(arr[i] !== ':') {
				count += 14
				if(arr[i + 1] && arr[i + 1] !== ':') {
					count += 2
				}
			} else {
				count += 9
			}	
		}

		// 粒子半径
		if(size) {
      radius = size / 14 - 1
		} else {
			radius = validWidth / count - 1
		}
    radius = Math.max(1, radius)

		// 坐标原点
		if(center) {
			left = padding + validWidth / 2 - count / 2 * (radius + 1)
		} else {
			left = padding
		}

		if(middle) {
			top = padding + validHeight / 2 - 10 * (radius + 1)
		} else {
			top = padding
		}

		return {
			left, 
			top,
			radius
		}

	}

	_clearTimer() {
		clearInterval(this._timer)
		this._timer = null
	}

	_emit(type, ...params) {
		const callback = this.options[type]
		if(typeof callback === 'function') {
			return callback(...params)
		}
	}
}