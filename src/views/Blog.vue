<template>
	<v-content>
		<v-row style="overflow: hidden; height:100%; width:100%; margin:0;">
			<v-col cols="0" md="3" xl="2" class="d-none d-md-flex pr-1 pl-0 py-0">
				<Navi />
			</v-col>
			<Navi class="d-md-none"/>
			<v-col style="overflow: auto;">
				<v-row align="center">
					<v-col style="display:block; height:500px">
						<transition name="scroll-y-reverse-transition">
							<router-view></router-view>
						</transition>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-content>
</template>
<script>
import Navi from './Com/navi';
//import { routeAssignUrl } from '../modules/common.js';

export default {
	name: 'blog',
	components: {
		Navi,
	},
	mounted: function() {
		console.log(this.$route);
	},
	data: function () {
		return {
		}
	}
}
</script>
