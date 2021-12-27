import {
  Base,
  pad
} from './core'

export default class Time extends Base {
	constructor(id = 'canvas', options = {}) {
    super(id, options)
		this._init()
    return this._getInstance()
	}

  _getInstance() {
    let obj = {}
    let keys = ['pause', 'play', 'getCurrentTime', 'destroy']
    keys.map(item => {
      obj[item] = this[item].bind(this)
    })
    return obj
  }

	_init() {
    this.play()
		this._emit("init", this._currentTime)
	}

	getCurrentTime(){
		const now = new Date()
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds(),
      now
    }
	}


	play() {
    if(!this._currentTime) {
      this._currentTime = this.getCurrentTime()
    }
    return this._play()
	}

	pause(reserve) {
    return this._pause(reserve)
	}

  destroy() {
    return this._destroy()
  }

	_getRenderData(time) {
		const { hours, minutes, seconds } = time
		let str = this.options.format
		str = str.replace('h', pad(hours)).replace('i', pad(minutes)).replace('s', pad(seconds))

		return str.split('')
	}

  _updateBalls() {
    this._getRenderBalls()
  }
}
