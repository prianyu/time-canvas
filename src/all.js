import { 
  Base,
  pad
} from './core'

const TYPES = ['time', 'count', 'countdown']
const DEFAULT_OPTIONS = {
  type: TYPES[0],
    autoConvert: true
}

export default class Time extends Base {
	constructor(id = 'canvas', options = DEFAULT_OPTIONS) {
    super(id, options)

		if(!TYPES.includes(this.options.type)) {
			this.options.type = TYPES[0]
		}
    if(this.options.type !== 'time') {
      if(!(Number(this.options.endTime) >= 0)) {
        this.options.endTime = this.options.type === 'count' ? Infinity : 60
      }
      this._endTime = this.options.endTime  * 1000 // trans to milliseconds
      this._createState()
    }
		this._init()
    return this._getInstance()
	}

  _getInstance() {
    let obj = {}
    let keys = ['pause', 'play', 'getCurrentTime', 'reset', 'destroy']
    keys.map(item => {
      obj[item] = this[item].bind(this)
    })
    return obj
  }

	_init() {
		const type = this.options.type
		if(type === 'time') {
			this._play()
		} else {
			this._currentTime = this.getCurrentTime()
			this._render()
		}
		this._emit("init", this._currentTime)
	}

	_createState() {
		this._state = {
			ended: false,
			stopped: true,
			diff: 0,
			waiting: false
		}
	}

	getCurrentTime(time){
		const now = time || new Date()
		const type = this.options.type

		if(type === 'time') {
			return {
				hours: now.getHours(),
				minutes: now.getMinutes(),
				seconds: now.getSeconds(),
				milliseconds: now.getMilliseconds(),
				now
			}
		} 

		const startTime = this._startTime ?.time || now
		let diff = now - startTime
		if(type === 'countdown') {
			diff = Math.max(0, this._endTime - diff)
		}

		if(type === 'count') {
			diff = Math.min(diff, this._endTime)
		}

		const seconds = parseInt(diff / 1000)
		const milliseconds = diff % 1000
		if(type === 'countdown' && diff <= 0 || type === 'count' && diff >= this._endTime) {
			this._state.ended = true
		}

		return {
			hours: parseInt(seconds / 3600),
			minutes: parseInt(seconds % 3600 / 60),
			seconds: seconds % 60,
			milliseconds,
			time: now
		}
	}

	_resetStartTime() {
		const current = new Date()
		const diff = this._state.diff
		const copyCurrent = new Date(current)

		this._startTime = null
		current.setMilliseconds(current.getMilliseconds() - diff)
		this._startTime = this.getCurrentTime(current)
		this._currentTime = this.getCurrentTime(copyCurrent)
	}

	play(state) {
		if(this._state.ended || !this._state.stopped) return
		if(!this._startTime) {
			this._startTime = this._currentTime = this.getCurrentTime()
			this._emit('start', this._currentTime)
		} else {
			if(state === 0) {
				this._startTime = this._currentTime = this.getCurrentTime()
				this._createState()
			} else if(state === 1) { 
				this._resetStartTime()
			}
		}
    this._state.stopped = false
    return this._play()
	}

	pause(reserve) {
    if(this._state.stopped) return
		this._state.stopped = true
		this._state.diff = new Date() - this._startTime.time
    return this._pause(reserve)
	}

	reset() {
		if(this.type === 'time') return
		this._clearTimer()
		this._balls = []
		this._createState()
		this._startTime = null
		this._currentTime = this.getCurrentTime()
		this._render()
	}

	destroy() {
		this._createState()
		this._startTime = null
    return this._destroy()
	}

	_getRenderData(time) {
		const { hours, minutes, seconds } = time
		const type = this.options.type
		let str = this.options.format
		if(type === 'time' || str === 'h:i:s' || str === 'h:i' || str === 'i:s' && this.options.autoConvert && hours) {
			str = str.replace('h', pad(hours)).replace('i', pad(minutes)).replace('s', pad(seconds))
		} else if(str === 'i:s') {
			str = `${pad(minutes + hours * 60)}:${pad(seconds)}`
		} else {
			str = `${hours * 3600 + minutes * 60 + seconds}`
		}

		return str.split('')
	}

	_updateBalls(time){
    const ballCount = this._getRenderBalls()
		if(!ballCount && this._state.ended) {
			this._clearTimer()
			this._state.waiting = false
      this._emit("finish", this.currentTime)
		}

    if(this._state.ended && !this._state.waiting) {
			this._emit("end", time)
			this._state.waiting = true
		}	
	}
}
