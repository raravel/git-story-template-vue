<template>
	<v-navigation-drawer
		v-model="drawer"
		:width="small ?  '350px' : '100%'"
		color="white"
		style="padding-left:4rem; padding-top: 1rem;"
		class="custom"
		:permanent="!small"
		:temporary="small"
		:fixed="small"
		>
		<v-list>
			<v-list-item two-line @click="routeAssignUrl('/blog')">
				<v-list-item-avatar style="text-align:center">
					<v-img src="https://avatars2.githubusercontent.com/u/28672888?v=4"></v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title> Mobbing </v-list-item-title>
					<v-list-item-subtitle> ifthe1201@naver.com </v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list dense>
				<v-list-group
					v-for="cGroup in cGroupList"
					:key="cGroup.name"
					class="custom"
					:value="small"
					active-class="teal--text text--darken-4">
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title class="body-2" @click="cGroup.click">{{ cGroup.name }}</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-group 
						v-for="sGroup in cGroup.sub"
						:key="sGroup.name"
						sub-group
						:value="small"
						active-class="teal--text text--darken-4">
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title class="body-2" @click="sGroup.click">{{ sGroup.name }}</v-list-item-title>
							</v-list-item-content>
						</template>

						<v-list-item
							v-for="ssItem in sGroup.sub"
							:key="ssItem.name"
							@click="ssItem.click"
							>
							<v-list-item-content>
								<v-list-item-title class="body-2">{{ ssItem.name }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>

					<v-list-item
						v-for="ssingle in cGroup.singleSub"
						:key="ssingle.name"
						@click="ssingle.click"
						>
						<v-list-item-content>
							<v-list-item-title class="body-2">{{ ssingle.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>

				<v-list-item
					v-for="cObj in cList"
					:key="cObj.name"
					@click="cObj.click"
					>
					<v-list-item-content>
						<v-list-item-title class="body-2">{{ cObj.name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-list>
	</v-navigation-drawer>
</template>
<style scoped>
div.v-list-group.custom
	>div.v-list-group__items
	>div
	>div.v-list-item
	>div.v-list-item__content,
div.v-list-group.custom
	>div.v-list-group__items
	>div
	>div.v-list-group
	>div.v-list-group__items
	>div
	>div.v-list-item
	>div.v-list-item__content {
	/* first, second deps single item left padding */
	padding-left: 49px;
}
</style>
<style>
aside.v-navigation-drawer.custom div.v-navigation-drawer__border {
	background: none !important;
}
</style>
<script>
import { routeAssignUrl, getPostsJson } from '../../modules/common.js';
import EventBus from '../../modules/event-bus.js';

const buildCategoryObject = (posts, _this) => {
	let keys = Object.keys(posts);
	let groupList = [];
	let List = [];
	let reUrl = "/blog/category";

	// first deps
	keys.forEach(k => {
		let c = posts[k];
		let sub = c.sub;
		let subKeys = Object.keys(sub);

		if ( subKeys.length === 0 ) {
			// single item
			List.push( {
				name: k,
				click: () => {
					//console.log(c.href);
					routeAssignUrl(reUrl + c.href, _this);
				}
			} );
		} else {
			let subList = [];
			let singleSub = [];
			// sub category group

			// second deps
			subKeys.forEach(sk => {
				let sc = sub[sk];
				let ssub = sc.sub;
				let ssubKeys = Object.keys(ssub);

				if ( ssubKeys.length === 0 ) {
					// single item
					singleSub.push( {
						name: sk,
						click: () => {
							//console.log(sc.href);
							routeAssignUrl(reUrl + sc.href, _this);
						}
					} );
				} else {
					let thirdDep = [];
					// sub category group

					// third deps
					ssubKeys.forEach(ssk => {
						// only single item
						thirdDep.push( {
							name: ssk,
							click: () => {
								//console.log(ssub[ssk].href);
								routeAssignUrl(reUrl + ssub[ssk].href, _this);
							}
						} );
					});

					subList.push({
						name: sk,
						click: () => {
							routeAssignUrl(reUrl + sub[sk].href, _this);
						},
						sub: thirdDep
					});
				}
			});

			groupList.push({
				name: k,
				click: () => {
					routeAssignUrl(reUrl + c.href, _this);
				},
				sub: subList,
				singleSub: singleSub
			});
		}
	});

	return { cList: List, cGroupList: groupList };
};

export default {
	name: 'navigation',
	methods: {
		routeAssignUrl,
	},
	components: {
	},
	created: function (){
		getPostsJson().then(posts => {
			// next line is debug code
			let category = buildCategoryObject(posts, this);
			this.cGroupList = category.cGroupList;
			this.cList = category.cList;
		});
		EventBus.$on('navi-draw', (val) => {
			this.drawer = val;
		});
	},
	computed: {
		small_() {
			return this.$store.getters.small;
		},
	},
	watch: {
		small_(val) {
			this.small = val;
		},
	},
	data: function () {
		return {
			drawer: false,
			cGroupList: [
				{
					name: "test", 
					sub: [
						{
							name: "sub-test",
							sub: [
								{ name: "sub-item", click: () => {} },
								{ name: "sub-item-2", click: () => {} },
							],
							click: () => {},
						},
					],
					singleSub: [
						{
							name: "single-sub",
							click: () => {},
						}
					],
					click: () => {},
				}
			],
			cList: [
				{ name: 'single-1', click: () => {} },
				{ name: 'single-2', click: () => {} },
			],
			small: this.$store.getters.small,
		}
	},
}
</script>
