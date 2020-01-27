<template>
	<!-- S:Content -->
	<v-content 
		class="px-0"
		style="">
		<v-container
			fluid
			class="full-height">
			<v-row
				class="ma-0 fill-height"
				v-for="c in items"
				:key="c.category"
				>
				<v-col cols="2" class="d-flex"></v-col>
				<v-col class="d-flex">
					<v-container class="pa-0" style="display:inline-grid">
						<v-row class="ma-0">
							<v-col cols="12" align="center">
								<h1 class="display-1 black--text">
									<span class="teal--text text--darken-4">#</span>
									{{ c.category }}
								</h1>
							</v-col>
						</v-row>
						<v-row align="center" class="ma-0 fill-height">
							<v-col
								cols="12"
								md="6"
								lg="4"
								style="height:350px;"
								v-for="item in c.sub"
								:key="item.title">
								<v-card 
									tile
									flat
									height="100%"
									outlined>
									<v-row class="ma-0" align="center" style="height:100%">
										<v-col align="center">
											<v-img width="5rem" :src="item.img" class="my-6"></v-img>
											<h1 class="title teal--text text--darken-4">{{ item.title }}</h1>
											<p class="mb-6 px-12">{{ item.content }}</p>
										</v-col>
									</v-row>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-col>
				<v-col cols="2" class="d-flex"></v-col>
			</v-row>
		</v-container>
		<Footer/>
	</v-content>
	<!-- E:Content -->
</template>
<script>
import Footer from './Com/footer';

export default {
	name: 'album',
	components: {
		Footer,
	},
	methods: {
	},
	data: function() {
		return {
			items: [
				{
					category: 'Made',
					sub: [
						{
							title: 'Vue',
							content: 'The Progressive JavaScript Framework',
							img: 'https://vuejs.org/images/logo.png',
						},
						{
							title: 'Vuetify',
							content: 'Material Design Component Framework',
							img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png',
						},
						{
							title: 'Github',
							content: 'Automate from code to cloud.',
							img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Font_Awesome_5_brands_github.svg/512px-Font_Awesome_5_brands_github.svg.png',
						},
					],
				},
				{
					category: 'Languages',
					sub: [
						{
							title: 'C',
							content: 'C is a general-purpose, procedural computer programming language.',
							img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/The_C_Programming_Language_logo.svg/140px-The_C_Programming_Language_logo.svg.png'
						},
						{
							title: 'C#',
							content: 'C# is a general-purpose, multi-paradigm programming language.',
							img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/C_Sharp_logo.png/220px-C_Sharp_logo.png'
						},
						{
							title: 'Node JS',
							content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
							img: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg',
						},
						{
							title: 'HTML',
							content: 'HTML5 is a web page content by implementing a markup based pattern to it.',
							img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/220px-HTML5_logo_and_wordmark.svg.png',
						}
					]
				}
			]
		};
	},
}
</script>
