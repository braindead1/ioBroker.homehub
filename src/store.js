import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeCategory: 0,
    categories: {},
    objects: {},
    states: {}
  },
  mutations: {
    updateActiveCategory (state, payload) {
      state.activeCategory = payload
    },
    updateCategories (state, payload) {
      state.categories = payload

      let _states = {}

      payload.forEach(function (element, index) {
        if (element['subcategories'] !== undefined) {
          element['subcategories'].forEach(function (element, index) {
            if (element['items'] !== undefined) {
              element['items'].forEach(function (element, index) {
                if (element['states'] !== undefined) {
                  element['states'].forEach(function (element, index) {
                    if (element['id'] !== undefined) {
                      _states[element['id']] = {}
                    }
                  })
                }
              })
            }
          })
        }

        if (element['items'] !== undefined) {
          element['items'].forEach(function (element, index) {
            if (element['states'] !== undefined) {
              element['states'].forEach(function (element, index) {
                if (element['id'] !== undefined) {
                  _states[element['id']] = {}
                }
              })
            }
          })
        }
      })

      state.states = Object.assign({}, this.state.states, _states)
    },
    updateObjects (state, payload) {
      let _objects = {}

      Object.keys(payload).forEach(function (element) {
        if (state.states[element] !== undefined) {
          _objects[element] = payload[element]
        }
      })

      state.objects = Object.assign({}, this.state.objects, _objects)
    },
    updateStates (state, payload) {
      let _states = {}

      Object.keys(payload).forEach(function (element) {
        _states[element] = payload[element]
      })

      state.states = Object.assign({}, this.state.states, _states)
    },
    SOCKET_stateChange (state, payload) {
      if (state.objects[payload[0]] !== undefined) {
        state.objects[payload[0]].state = payload[1]
      }

      if (state.states[payload[0]] !== undefined) {
        state.states[payload[0]] = payload[1]
      }
    }
  },
  actions: {
    initialize (context) {
      const _this = this
      const _context = context

      this._vm.$socket.emit('getObject', 'system.adapter.homehub.0', function (a, object) {
        new Promise(function (resolve, reject) {
          _context.commit('updateCategories', object.native.categories)
          resolve()
        }).then(function (result) {
          _this._vm.$socket.emit('getObjects', function (a, objects) {
            _context.commit('updateObjects', objects)
          })
        }).then(function (result) {
          _this._vm.$socket.emit('getStates', Object.keys(_context.state.states), function (a, states) {
            _context.commit('updateStates', states)
          })
        }).then(function (result) {
          _this._vm.$socket.emit('subscribe', Object.keys(_context.state.states))
        })
      })
    },
    updateActiveCategory (context, activeCategory) {
      context.commit('updateActiveCategory', activeCategory)
    }
  }
})
