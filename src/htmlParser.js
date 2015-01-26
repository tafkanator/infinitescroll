// http://code.tutsplus.com/tutorials/quick-tip-create-a-makeshift-javascript-templating-solution--net-23165

module.exports = {
	// Accepts a template and data. Searches through the
	// data, and replaces each key in the template, accordingly.
	parse: function(template, data) {
		var i = 0,
			len = data.length,
			fragment = '';

		// For each item in the object, make the necessary replacement
		function replace(obj) {
			var t = null, key, reg;

			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					reg = new RegExp('{{' + key + '}}', 'ig');

					if (t === null) {
						t = template.replace(reg, obj[key]);
					} else {
						t = t.replace(reg, obj[key]);
					}

				}

			}

			return t;
		}

		for (; i < len; i++) {
			fragment += replace(data[i]);
		}

		return fragment;
	}
};