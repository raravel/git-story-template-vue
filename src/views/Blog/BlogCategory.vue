<template>
	<v-container>
		<v-row class="ma-0">
			<v-col cols="0" sm="1" md="2"></v-col>
			<v-col>
				<transition 
						v-for="p in postList"
						:key="p.src"
						name="fade-transition">
					<v-row
						class="ma-0 mb-12 mt-3"
						>
						<v-col>
							<h2 class="subtitle-2 grey--text text--darken-3 font-weight-thin">{{ p.created }}</h2>
							<h1 class="display-1 teal--text text--darken-3 font-weight-light mb-3">{{ p.title }}</h1>
							<p class="grey--text text--darken-3 mb-5" style="word-break: break-all;">{{ p.content }}</p>
							<router-link :to="p.src" class="teal--text text--darken-4 overline font-weight-light" style="font-size:1rem !important;">Read more 📚 </router-link>
						</v-col>
					</v-row>
				</transition>
				<v-row class="ma-0 pt-6">
					<v-col align="center">
						<v-btn
							text
							tile
							large
							:disabled="!newest"
							color="teal darken-4"
							@click="pageMove(-1)"
							outlined>Newest</v-btn>
						<v-btn
							text
							tile
							large
							:disabled="!older"
							@click="pageMove(+1)"
							color="teal darken-4"
							outlined>Older</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="0" sm="1" md="2"></v-col>
		</v-row>
		<v-footer
			padless
			color="transparent"
			>
			<v-row align="center" justify="center">
				<v-col align="center">
						Posted by 
						<a class="grey--text" href="https://github.com/mobbing" target="_blank">
							<strong class="grey--text text--darken-3">Mobbing</strong>
						</a>
				</v-col>
			</v-row>
		</v-footer>
	</v-container>
</template>

<script>
import { getPostsJson, getPostHTML, searchObject, routeAssignUrl } from '../../modules/common.js';

const getSubposts = (obj) => {
    let rtn = [];

    let target = obj;
    if ( typeof obj.sub === "object" ) {
        target = obj.sub;
    }

    let keys = Object.keys(target);
    keys.forEach(k => {
        if ( typeof target[k] === "object" ) {
            rtn = rtn.concat(getSubposts(target[k]));
        }
    });

    if ( Array.isArray(obj.posts) ) {
        rtn = rtn.concat(obj.posts);
    }
    return rtn;
};

const displayPosts = function(_this = this) {
	let category = _this.$route.params.category;

	if ( !category || category.length === 0 ) {
		category = "";
	} else if ( category[0] !== "/" ) {
		category = "/" + category;
	}

	_this.postList = [];

	let posts = _this.posts;
	let obj = searchObject(posts, "href", category);
	let sub = getSubposts(obj);

	let MAX_POST_VIEW = 10;
	let subLength = sub.length;
	let page = _this.$route.query.p;
	let maxPage = parseInt(subLength / MAX_POST_VIEW);

	if ( subLength % MAX_POST_VIEW > 0 ) {
		maxPage += 1;
	}

	if ( page === undefined || (page < 1 || page > maxPage ) ) {
		page = 1;
	}

	_this.page = page;
	
	if ( page > 1 ) {
		_this.newest = true;
	} else {
		_this.newest = false;
	}

	if ( page < maxPage ) {
		_this.older = true;
	} else {
		_this.older = false;
	}


	for ( let i = 0; i < MAX_POST_VIEW; i++ ) {
		let idx = parseInt((page-1) * MAX_POST_VIEW, 10) + i;

		if ( idx >= subLength ) {
			break;
		}

		let s = sub[idx];

		//yyyy-mm-dd-hh-MM-ss 형식을 yyyy. mm. dd 로 변경
		let extractDate = new RegExp(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
		let created = extractDate.exec(s.href);
		if ( created ) {
			created = created[0].replace(extractDate, "$1. $2. $3");
		}

		_this.postList.push({ src: "/blog" + s.href, title: s.title, created, content: '' });
		getPostHTML(s.href + "index.html").then(res => {
			let html = document.createElement('div');
			html.innerHTML = res.responseText;
			let text = html.innerText.trim();
			let maxContentLength = 200;
			if ( text.length > maxContentLength ) {
				text = text.substring(0, maxContentLength) + "...";
			}
			_this.postList[i].content = text;
		});
	}
}

export default {
	name: 'BlogCategory',
	components: {
	},
	methods: {
		pageMove(m) {
			let page = parseInt(this.page, 10);
			let targetPage = page + m;
			let url = this.$route.path + "?p=" + targetPage;
			routeAssignUrl(url, this);
		}
	},
	created: function() {
		this.postList = [];
		getPostsJson().then(posts => {
			this.posts = posts;
			displayPosts(this);
		});
	},
	mounted: function() {
	},
	watch: {
		$route () {
			displayPosts(this);
		}
	},
	data: function() {
		return {
			postList: [],
			newest: false,
			older: false,
			page: 1,
		}
	}
}
</script>
