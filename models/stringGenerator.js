module.exports.generateCode = function(first, last, callback) {
	const code = first.toLowerCase() + last.toLowerCase();
	return code;
}