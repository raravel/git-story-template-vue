<template>
	<!-- S:Content -->
	<v-content>
		<v-img dark src="../assets/banner.jpg" class="custom" height="500px">
			<v-content class="pa-0">
				<v-row align="center" style="height:500px">
					<v-col align="center">
						<h1 class="display-2 font-weight-black">
							<span style="color:#00BFA5">Vue</span> <span style="color:white;">Blog </span> 
							<v-btn @click="routeAssignUrl('/blog')" color="teal accent-4" icon x-large>
								<v-icon>mdi-arrow-right-bold-circle</v-icon>
							</v-btn>
						</h1>
					</v-col>
				</v-row>
			</v-content>
		</v-img>
		<v-lazy v-model="lazy.row1" transition="fade-transition" class="mt-12">
			<v-row align="center">
				<v-col col="12" md="6" align="center">
					<v-img src="../assets/home-1.jpg" class="grey lighten-2" max-width="80%"></v-img>
				</v-col>
				<v-col col="12" md="6" align="center" class="px-12">
					<h1 class="display-1 mb-2">Hello World!</h1>
					<p>Aliquam ultricies lorem erat, vel convallis tortor tincidunt quis. Aliquam quis mollis nulla. Nunc id eleifend tortor. Pellentesque eget elit fermentum, cursus lectus a, dapibus libero. Donec semper euismod elit a aliquam. Sed eu justo est. Ut eu consequat eros. Sed molestie suscipit gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ac egestas magna. Mauris volutpat eget mauris at blandit. Nunc magna est, vestibulum eget fringilla nec, viverra in sapien. Nulla urna lacus, bibendum interdum nulla non, pellentesque posuere neque.</p>
				</v-col>
			</v-row>
		</v-lazy>
		<v-lazy v-model="lazy.row2" transition="fade-transition" class="mt-12">
			<v-img src="../assets/mail.jpg" class="custom" max-height="700px">
				<v-content>
					<v-row align="center">
						<v-col cols="12" md="6" align="center">
							<h1 class="display-1 white--text">Contact Me!</h1>
							<h2 class="title font-weight-light grey--text">email@vue-blog.com</h2>
						</v-col>
						<v-col cols="12" md="6">
							<v-card color="transparent" dark tile flat>
								<v-card-text>
									<v-form ref="form" v-model="valid" lazy-validation>
										<v-text-field
											v-model="email"
											:rules="emailRules"
											label="E-mail"
											required
											></v-text-field>
										<v-text-field
											v-model="title"
											:rules="titleRules"
											label="Title"
											required
											></v-text-field>
										<v-textarea
											label="Content"
											no-resize
											:rules="contentRules"
											v-model="content"
											></v-textarea>
										<br>
										<v-btn class="mr-4" color="green darken-4" @click="submit">submit</v-btn>
										<v-btn @click="clear">clear</v-btn>
									</v-form>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-content>
			</v-img>
		</v-lazy>
		<Footer/>
	</v-content>
	<!-- E:Content -->
</template>
<style>
div.v-parallax div.v-parallax__content {
	background: rgba(0, 0, 0, 0.5);
}
div.v-image.custom div.v-responsive__content {
	background: rgba(0, 0, 0, 0.7);
}
div.row {
	width: 100%;
}
</style>
<script>
import Footer from './Com/footer';
import { routeAssignUrl } from '../modules/common.js';

export default {
	name: 'home',
	components: {
		Footer
	},
	methods: {
		routeAssignUrl,
		submit () {
		},
		clear () {
			this.title = '';
			this.email = '';
			this.content = '';
		}
	},
	data: function() {
		return {
			lazy: {
				row1: false,
				row2: false,
			},
			valid: true,
			title: '',
			titleRules: [
				v => !!v || 'Title is required',
			],
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required',
				v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			],
			content: '',
			contentRules: [
				v => !!v || 'Content is required',
			]
		};
	},
}
</script>
