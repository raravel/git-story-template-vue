import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		small: false,
		draw: false,
	},
	getters: {
		small: state => state.small,
		draw: state => state.draw,
	},
	mutations: {
		small: (state, val) => {
			state.small = val;
		},
		draw: (state, val) => {
			state.draw = val;
		},
	},
	actions: {
	},
	modules: {
	}
})
