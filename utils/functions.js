module.exports = {
	formatTime: function(ms) {
		const time = {
			d: 0,
			h: 0,
			m: 0,
			s: 0
		};
		time.s = Math.floor(ms / 1000);
		time.m = Math.floor(time.s / 60);
		time.s = time.s % 60;
		time.h = Math.floor(time.m / 60);
		time.m = time.m % 60;
		time.d = Math.floor(time.h / 24);
		time.h = time.h % 24;

		const res = [];
		for (const [ k, v ] of Object.entries(time)) {
			let first = false;
			if (v < 1 && !first) continue;

			res.push(v < 10 ? `0${v}` : `${v}`);
			first = true;
		}
		return res.join(':');
	}
};
