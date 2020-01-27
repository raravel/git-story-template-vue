<template>
	<v-container>
		<v-row>
			<v-col cols="0" sm="1" md="1"></v-col>
			<v-col>
				<h2 class="subtitle-1 gery--text">2019. 12. 01</h2>
				<h1 class="display-1 teal--text text--darken-4">테스트 제목</h1>
				<v-divider class="my-6"></v-divider>
				<html v-html="html"> </html>
			</v-col>
			<v-col cols="0" sm="1" md="4"></v-col>
		</v-row>
	</v-container>
</template>
<script>
import { getPostsJson, getPostHTML, routeAssignUrl, searchObject } from '../../modules/common.js';

const displayPost = function(_this = this) {
	let path = _this.$route.params.path;

	if ( !path || path.length === 0 ) {
		routeAssignUrl('/blog', _this);
	}

	path = "/posts/" + path;

	let posts = _this.posts;

	let obj = searchObject(posts, "href", path);
	console.log(obj, path);
	//yyyy-mm-dd-hh-MM-ss 형식을 yyyy. mm. dd 로 변경
	let extractDate = new RegExp(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
	let created = extractDate.exec(obj.href);
	if ( created ) {
		created = created[0].replace(extractDate, "$1. $2. $3");
	}

	getPostHTML(obj.href+"index.html").then(res => {
		let html = document.createElement('html');
		html.innerHTML = res.responseText;

		let head = html.querySelector('head');
		// css append
		head.querySelectorAll('link').forEach(link => {
			let newLink = document.createElement('link');
			let attr = null;

			if ( (attr = link.getAttribute('rel')) ) {
				newLink.setAttribute('rel', attr);
			}

			if ( (attr = link.getAttribute('href')) ) {
				newLink.setAttribute('href', attr);
			}

			document.head.appendChild(newLink);
		});

		// js append
		head.querySelectorAll('script').forEach(script => {
			let newScript = document.createElement('script');
			let attr = null;

			if ( (attr = script.getAttribute('src')) ) {
				newScript.setAttribute('src', attr);
			}

			document.head.appendChild(newScript);
		});

		// body append
		_this.html = html.querySelector('body').innerHTML;
	});
}

export default {
	name: 'BlogCategory',
	components: {
	},
	created: function() {
		console.log('aaaa');
		getPostsJson().then(posts => {
			this.posts = posts;
			displayPost(this);
		});
	},
	mounted: function() {
	},
	computed: {
		small_() {
			return this.$store.getters.small;
		}
	},
	watch: {
		small_(val) {
			this.small = val;
		}
	},
	data: function() {
		return {
			html: '',
			small: false,
		}
	}
}
</script>
