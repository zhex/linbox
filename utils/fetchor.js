const request = require('request-promise');
const cheerio = require('cheerio');

function getDescUrl(url) {
	return request(url).then((result) => {
		const url = /'(\/\/dsc.taobaocdn.com[^']*)/.exec(result);
		return url ? 'http:' + url[1]: null;
	});
}

function getDescContent(url) {
	return request(url).then((result) => {
		const content = /var desc='([^']*)/.exec(result);
		return content ? content[1] : null;
	});
}

function getImages(content) {
	let $ = cheerio.load(content);
	let imgs = [];

	$('img').each((i, el) => imgs.push(el.attribs.src) );
	return imgs;
}

exports.getImagesFromPage = function (url) {
	return getDescUrl(url).then(getDescContent).then(getImages);
};



