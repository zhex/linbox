const path = require('path');

const templatesDir = path.join(__dirname, '../tpl');
const emailTemplates = require('email-templates');

exports.build = function (tplName, data) {
	return new Promise(function (resolve, reject) {
		emailTemplates(templatesDir, function (err, template) {
			if (err) {
				reject(err);
				return;
			}

			template(tplName, data, function (err, html, text) {
				if (err) {
					reject(err);
					return;
				}
				resolve(html);
			});
		});
	});
};
