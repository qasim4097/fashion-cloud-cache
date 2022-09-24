module.exports = {
	isExpired: (date, ttl) => {
			return Date.now() - date.getTime() > ttl
	}
}