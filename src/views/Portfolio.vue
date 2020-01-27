<template>
	<!-- S:Content -->
	<v-content 
		class="px-0"
		style="">
		<v-container
			fluid
			class="full-height mb-12">
			<v-row
				v-for="item in items"
				:key="item.category"
				class="ma-0 fill-height" >
				<v-col cols="1" sm="2" md="3" class="d-flex"></v-col>
				<v-col class="d-flex">
					<v-container class="pa-0">
						<v-row class="ma-0 mb-6 mt-12">
							<v-col cols="12" align="center">
								<h1 class="display-1 black--text">
									<span class="teal--text text--darken-4">#</span>
									{{ item.category }}
								</h1>
							</v-col>
						</v-row>
						<v-row 
							v-for="sub in item.sub"
							:key="sub.name"
							align="center"
							class="ma-0 mt-6">
							<v-col cols="12">
								<sup class="teal--text text--darken-4 overline">{{ sub.created }}</sup>
								<h1 class="headline text-uppercase">
									<v-hover v-slot:default="{ hover }">
										<a 
											:href="sub.git"
											:class="hover ? 'black--text' : 'grey--text text--darken-3'"
											:style="hover ? '' : 'text-decoration: none;'"
											target="_blank">
											{{ sub.name }}
										</a>
									</v-hover>
								</h1>
								<p class="mt-3 body-1 font-weight-light"> {{ sub.desc }} </p>
								<v-chip
									small
									class="mr-3 text-capitalize"
									v-for="tag in sub.tag"
									:key="tag">
									{{ tag }}
								</v-chip>
							</v-col>
						</v-row>
					</v-container>
				</v-col>
				<v-col cols="1" sm="2" md="3" class="d-flex"></v-col>
			</v-row>
		</v-container>
		<Footer/>
	</v-content>
	<!-- E:Content -->
</template>
<script>
import { routeAssignUrl } from '../modules/common.js';
import Footer from './Com/footer';

export default {
	name: 'portfolio',
	components: {
		Footer,
	},
	methods: {
		routeAssignUrl,
	},
	data: function() {
		return {
			items: [
				{
					category: 'Web',
					sub: [
						{
							name: 'git story',
							git: 'https://github.com/mobbing/git-story',
							desc: '📚 [GITSTORY] 🚥 Easy management your git blog',
							created: new Date('2019-08-21T15:11:51Z').toLocaleDateString(),
							tag: ['javascript', 'vue', 'firebase'],
						},
						{
							name: 'git story template default',
							git: 'https://github.com/mobbing/git-story-template-default',
							desc: '[GITSTORY] Default template.',
							created: new Date('2019-08-31T10:18:25Z').toLocaleDateString(),
							tag: ['HTML', 'CSS', 'javascript'],
						},
						{
							name: 'git story template ist',
							git: 'https://github.com/mobbing/git-story-template-ist',
							desc: '[GITSTORY] Template using materializecss.',
							created: new Date('2019-11-08T01:05:15Z').toLocaleDateString(),
							tag: ['HTML', 'CSS', 'javascript', 'materializecss'],
						},
						{
							name: 'Web Server in C',
							git: 'https://github.com/mobbing/webserver-in-c',
							desc: 'Build webserver using Cesanta Mongoose.',
							created: new Date('2019-03-29T05:16:41Z').toLocaleDateString(),
							tag: ['C', 'Mongoose'],
						},
					]
				},
				{
					category: 'Util',
					sub: [
						{
							name: 'ngrep',
							git: 'https://github.com/mobbing/ngrep',
							desc: ' 🇰🇷  Use javascript regex pattern in grep.',
							created: new Date('2019-12-10T06:53:43Z').toLocaleDateString(),
							tag: ['node', 'typescript'],
						},
						{
							name: 'cful',
							git: 'https://github.com/mobbing/cful',
							desc: 'Colorful output in CUI',
							created: new Date('2020-01-18T15:42:05Z').toLocaleDateString(),
							tag: ['C'],
						},
						{
							name: 'game tool in c',
							git: 'https://github.com/mobbing/game_tool_in_c',
							desc: "Very EZ make game in C",
							created: new Date('2019-01-19T05:53:18Z').toLocaleDateString(),
							tag: ['C', 'Win32 API'],
						},
					]
				}
			]
		};
	},
}
</script>
