//let debugUrl = "http://api.github.com/repos/mobbing/mobbing.github.io/contents";
// let debugUrl = "https://raw.githubusercontent.com/mobbing/mobbing.github.io/master";
let debugUrl = "";


// Vue route 이동
export const routeAssignUrl = function(url, _this) {
    let router = (this && this.$router) || (_this && _this.$router);
    if ( typeof url === "string" && router ) { 
        if ( router.history.current.path !== url ) { 
            router.push({ path: url }); 
        }   
    }   
}

export const reqHttpGet = function(url) {
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest();
		req.addEventListener('load', (evt) => {
			resolve(evt.target);
		});
		req.addEventListener('error', (evt) => {
			reject(evt);
		});

		req.open("GET", url);
		req.send();
	});
};

export const getXMLJson = function(url) {
	return new Promise((resolve, reject) => {
		reqHttpGet(url).then(res => {
			let json = JSON.parse(res.responseText);
			resolve(json);
		}).catch(reject);
	});
};

// 테스트 코드, 직접 http get 하는 코드를 만들어야 함.
export const getPostsJson = function() {
	return new Promise((resolve, reject) => {
		reqHttpGet(debugUrl + "/posts.json").then(res => {
			let json = JSON.parse(res.responseText);
			resolve(json);
		}).catch(reject);
	});
};

export const getPostHTML = function(path) {

	if ( path[0] !== "/" ) {
		path = "/" + path;
	}

	return reqHttpGet(debugUrl + path);
};

// key:value 를 가진 오브젝트를 검색
export const searchObject = function(obj, key, value) {
    let keys = Object.keys(obj);
    let len = keys.length;

    if ( !value || value.trim() === "" ) return obj;

    for ( let i=0;i<len;i++ ) {
        let k = keys[i];
        if ( k === key ) {
            if ( obj[k] == value ) {
                return obj;
            }
        }
        if ( typeof obj[k] === "object" ) {
            let rtn = searchObject(obj[k], key, value);
            if ( typeof rtn === "object" ) {
                return rtn;
            }
        }
    }
};
