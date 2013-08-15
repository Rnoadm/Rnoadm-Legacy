(function() {
const GRAPHICS_REVISION = 6;
const tileSize = 32;
var ws,
clientHash,
username = sessionStorage['rnoadm_username'] || '',
password = sessionStorage['rnoadm_password'] || '',
loggedIn = false,
connected = false,
inRepaint = true,
w = 32, h = 16,
floor = function(n) {
	return Math.floor(n);
},
time = function() {
	return +new Date() / 50;
},
lerpPosition = function(a, b, t) {
	t -= time();
	if (t < -16 || a == b)
		return b;
	repaint();
	return (a * (16 + t) + b * -t) / 16;
},
mouseX = -Infinity,
mouseY = -Infinity,
gameState = {
	objects: new Array(256 * 256),
	player:  {x: 127, y: 127, prevX: 127, prevY: 127, lastMove: time()},
	hud:     {name: '', data: {}}
},
canvas = document.createElement('canvas').getContext('2d'),
send = function(packet) {
	if (!connected)
		return;

	ws.send(JSON.stringify(packet));
},
wsopen = function() {
	connected = true;
	if (loggedIn) {
		send({'Auth': {'U': username, 'P': password}});
	}
	gameState.objects = new Array(256 * 256);
},
wsclose = function() {
	connected = false;
	setTimeout(connect, 100);
},
wsmessage = function(e) {
	var msg = JSON.parse(e.data), p;
	console.log(msg);
	if (p = msg['Kick']) {
		ws.onclose = wsopen = wsclose = wsmessage = function() {};
		ws.close();
		inRepaint = true;
		canvas.canvas.parentNode.removeChild(canvas.canvas);
		delete sessionStorage['rnoadm_username'];
		delete sessionStorage['rnoadm_password'];
		alert(p);
	}
	if (p = msg['ClientHash']) {
		if (clientHash) {
			if (p != clientHash) {
				location.reload(true);
			}
		} else {
			clientHash = p;
		}
	}
	if (p = msg['Update']) {
		var playerX = msg['PlayerX'], playerY = msg['PlayerY'];
		if (playerX != gameState.player.x || playerY != gameState.player.y) {
			gameState.player.lastMove = time();
			gameState.player.prevX = gameState.player.x;
			gameState.player.prevY = gameState.player.y;
			gameState.player.x = playerX;
			gameState.player.y = playerY;
		}
		p.forEach(function(update) {
			var i = update['X'] | (update['Y'] << 8);
			if (!gameState.objects[i]) {
				gameState.objects[i] = {};
			}
			if (!gameState.objects[i][update['I']]) {
				gameState.objects[i][update['I']] = {
					prevX: update['X'],
					prevY: update['Y'],
					lastMove: time()
				};
			}
			if (update['R']) {
				delete gameState.objects[i][update['I']];
			} else if (update['O']) {
				gameState.objects[i][update['I']].sprite = update['O']['S'];
			} else {
				var from = update['Fx'] | (update['Fy'] << 8);
				gameState.objects[i][update['I']] = gameState.objects[from][update['I']];
				gameState.objects[i][update['I']].prevX = update['Fx'];
				gameState.objects[i][update['I']].prevY = update['Fy'];
				gameState.objects[i][update['I']].lastMove = time();
				delete gameState.objects[from][update['I']];
			}
		});
		repaint();
	}
	if (p = msg['HUD']) {
		gameState.hud.name = p['N'];
		gameState.hud.data = p['D'] || {};
		repaint();
	}
},
connect = function() {
	ws = new WebSocket('ws://' + location.host + '/ws');
	ws.onopen = wsopen;
	ws.onclose = wsclose;
	ws.onmessage = wsmessage;
},
repaint = function() {
	if (inRepaint) {
		return;
	}

	inRepaint = true;
	requestAnimationFrame(paint);
},
nextRepaint = Infinity,
drawText = function(x, y, text, color, extra, ctx) {
	extra = extra || {};
	color = color || '#fff';
	ctx = ctx || canvas;
	var xoff = ctx == canvas ? w/2*tileSize : 0;
	var yoff = ctx == canvas ? h/2*tileSize : 0;
	if (extra['T']) {
		ctx.font = '32px "Jolly Lodger"';
	} else {
		ctx.font = '16px "Open Sans Condensed"';
	}
	ctx.fillStyle = '#000';
	ctx.fillText(text, xoff + x*tileSize, yoff + y*tileSize + 1);
	ctx.fillStyle = color;
	ctx.fillText(text, xoff + x*tileSize, yoff + y*tileSize);
},
images = {},
images_resize = {},
images_recolor = {},
drawSprite = function(x, y, sprite, color, extra, ctx) {
	extra = extra || {};
	ctx = ctx || canvas;
	var xoff = ctx == canvas ? w/2*tileSize : 0;
	var yoff = ctx == canvas ? h/2*tileSize : 0;
	var scale = extra['s'] || 1;
	var height = extra['h'] || tileSize;
	var width = extra['w'] || tileSize;
	var col = extra['x'] || 0;
	var row = extra['y'] || 0;
	({
		'': function() {
			// no animation
		},
		'ccr': function() {
			// character creation rotation
			col += [0, 6, 3, 9][floor(time() / 30) % 4];
			nextRepaint = Math.min(nextRepaint, floor(time() / 30 + 1) * 30);
		},
		'wa': function() {
			// walk (alternating)
			col += [0, 1, 0, 2][floor(time() / 4) % 4];
			nextRepaint = Math.min(nextRepaint, floor(time() / 4 + 1) * 2);
		}
	})[extra['a'] || '']();
	if (!images[sprite]) {
		images[sprite] = true;
		var img = new Image();
		img.onload = function() {
			images[sprite] = img;
			images_resize[sprite] = {};
			images_recolor[sprite] = {};
			repaint();
		};
		img.src = sprite + '.png?' + GRAPHICS_REVISION;
	}
	if (images[sprite] === true)
		return;
	if (!images_resize[sprite][scale]) {
		var buffer = document.createElement('canvas');
		buffer.width = images[sprite].width;
		buffer.height = images[sprite].height;
		images_resize[sprite][scale] = buffer;
		images_recolor[sprite][scale] = {};
		buffer = buffer.getContext('2d');
		buffer.drawImage(images[sprite], 0, 0);
		var base = buffer.getImageData(0, 0, images[sprite].width, images[sprite].height);
		buffer = buffer.canvas;
		buffer.width = images[sprite].width * scale;
		buffer.height = images[sprite].height * scale;
		buffer = buffer.getContext('2d');
		var scaled = buffer.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
		var rowIndex = 0;
		var baseIndex = 0;
		var scaledIndex = 0;
		for (var sy = 0; sy < buffer.canvas.height; sy++) {
			for (var sx = 0; sx < buffer.canvas.width; sx++) {
				scaled.data[scaledIndex+0] = base.data[baseIndex+0];
				scaled.data[scaledIndex+1] = base.data[baseIndex+1];
				scaled.data[scaledIndex+2] = base.data[baseIndex+2];
				scaled.data[scaledIndex+3] = base.data[baseIndex+3];
				if (sx % scale == scale - 1) {
					baseIndex += 4;
				}
				scaledIndex += 4;
			}
			if (sy % scale == scale - 1) {
				rowIndex = baseIndex;
			} else {
				baseIndex = rowIndex;
			}
		}
		buffer.putImageData(scaled, 0, 0);
	}
	if (!images_recolor[sprite][scale][color]) {
		var buffer = document.createElement('canvas');
		buffer.width = images_resize[sprite][scale].width || 1;
		buffer.height = images_resize[sprite][scale].height || 1;
		images_recolor[sprite][scale][color] = buffer;
		buffer = buffer.getContext('2d');

		buffer.fillStyle = color;
		buffer.fillRect(0, 0, 1, 1);
		var data = buffer.getImageData(0, 0, 1, 1);
		var r = data.data[0],
		    g = data.data[1],
		    b = data.data[2],
		    a = data.data[3];
		buffer.clearRect(0, 0, 1, 1);

		buffer.drawImage(images_resize[sprite][scale], 0, 0);
		data = buffer.getImageData(0, 0, buffer.canvas.width, buffer.canvas.height);
		var fade = function(x, y) {
			if (x >= 128)
				return 255 - (255-x)*(255-y)/127;
			return x*y/127;
		};
		for (var l = 0; l < data.data.length; l += 4) {
			data.data[l+0] = fade(data.data[l+0], r);
			data.data[l+1] = fade(data.data[l+1], g);
			data.data[l+2] = fade(data.data[l+2], b);
			data.data[l+3] = data.data[l+3]*a/255;
		}
		buffer.putImageData(data, 0, 0);
	}
	ctx.drawImage(images_recolor[sprite][scale][color],
		floor(col * width * scale),
		floor(row * height * scale),
		floor(width * scale),
		floor(height * scale),
		floor(xoff + x*tileSize),
		floor(yoff + y*tileSize + (tileSize - height) * scale),
		floor(width * scale),
		floor(height * scale));
},
html = document.body.parentNode,
paint = function() {
	inRepaint = false;
	canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);

	var w2 = w/2 + 1;
	var h2 = h/2 + 1;
	var playerX = lerpPosition(gameState.player.prevX, gameState.player.x, gameState.player.lastMove);
	var playerY = lerpPosition(gameState.player.prevY, gameState.player.y, gameState.player.lastMove);
	var startX = Math.max(floor(playerX - w2), 0);
	var endX = Math.min(floor(playerX + w2), 256);
	var startY = Math.max(floor(playerY - h2), 0);
	var endY = Math.min(floor(playerY + h2), 256);

	playerX += 0.5;
	playerY += 0.5;

	for (var x = 0; x < 256; x += 512/tileSize) {
		for (var y = 0; y < 256; y += 512/tileSize) {
			drawSprite(x - playerX, y - playerY, 'grass', html.style.background = '#4dbd33', {'h': 512, 'w': 512});
		}
	}

	for (var x = startX; x < endX; x++) {
		for (var y = startY; y < endY; y++) {
			var objects = gameState.objects[x | (y << 8)] || {};

			for (var i in objects) {
				var x_ = lerpPosition(objects[i].prevX, x, objects[i].lastMove) - playerX;
				var y_ = lerpPosition(objects[i].prevY, y, objects[i].lastMove) - playerY;
				(objects[i].sprite || []).forEach(function(sprite) {
					drawSprite(x_, y_, sprite['S'], sprite['C'], sprite['E']);
				});
			}
		}
	}

	switch (gameState.hud.name) {
	case '':
		break;

	case 'cc':
		canvas.fillStyle = '#000';
		canvas.beginPath();
		canvas.moveTo((w/2-3.5)*tileSize, (h/2-5)*tileSize);
		canvas.lineTo((w/2+4)*tileSize, (h/2-5)*tileSize);
		canvas.lineTo((w/2+4.5)*tileSize, (h/2-4)*tileSize);
		canvas.lineTo((w/2-4)*tileSize, (h/2-4)*tileSize);
		canvas.closePath();
		canvas.fill();
		canvas.beginPath();
		canvas.moveTo((w/2-3.5)*tileSize, (h/2+2.6)*tileSize);
		canvas.lineTo((w/2+4)*tileSize, (h/2+2.6)*tileSize);
		canvas.lineTo((w/2+4.5)*tileSize, (h/2+2)*tileSize);
		canvas.lineTo((w/2-4)*tileSize, (h/2+2)*tileSize);
		canvas.closePath();
		canvas.fill();
		canvas.fillStyle = 'rgba(0,0,0,.7)';
		canvas.fillRect((w/2-4)*tileSize, (h/2-4)*tileSize, 8.5*tileSize, 6*tileSize);
		canvas.fillStyle = '#fff';
		canvas.fillRect((w/2-3.5)*tileSize, (h/2-4)*tileSize, 3*tileSize, 4*tileSize);
		gameState.hud.data['S'].forEach(function(sprite) {
			drawSprite(-4, -4, sprite['S'], sprite['C'], sprite['E']);
		});
		drawText(-1.25, -4.125, 'Character', '#ccc', {'T': true});
		drawText(0, -3.5, 'change gender (' + gameState.hud.data['G'] + ')', mouseX >= -2 && mouseX <= 2.5 && mouseY >= -3.5 && mouseY <= -3 ? '#fff' : '#ccc');
		drawText(0, -2.5, 'change skin color', mouseX >= 0 && mouseX <= 4.5 && mouseY >= -2.5 && mouseY <= -2 ? '#fff' : '#ccc');
		drawText(0, -1.5, 'change shirt color', mouseX >= 0 && mouseX <= 4.5 && mouseY >= -1.5 && mouseY <= -1 ? '#fff' : '#ccc');
		drawText(0, -0.5, 'change pants color', mouseX >= 0 && mouseX <= 4.5 && mouseY >= -0.5 && mouseY <= 0 ? '#fff' : '#ccc');
		drawText(-3, 1, gameState.hud.data['N'], mouseX >= -3.5 && mouseX <= 5 && mouseY >= 0.5 && mouseY <= 2 ? '#fff' : '#ccc', {'T': true});
		drawText(-1.5, 1.5, 'change name', mouseX >= -3.5 && mouseX <= 5 && mouseY >= 0.5 && mouseY <= 2 ? '#fff' : '#ccc');
		drawText(-2.25, 2.5, 'look out, world! here I come!', mouseX >= -3.5 && mouseX <= 5 && mouseY >= 2.5 && mouseY <= 3 ? '#fff' : '#ccc');
		break;
	}
},
loginForm = document.querySelector('form'),
loginField = loginForm.querySelector('#username'),
passField = loginForm.querySelector('#password'),
pass2Field = loginForm.querySelector('#password2');

onresize = function() {
	w = floor(innerWidth / tileSize);
	h = floor(innerHeight / tileSize);
	canvas.canvas.width  = tileSize*w;
	canvas.canvas.height = tileSize*h;
	repaint();
};
onresize();

setInterval(function() {
	if (time() >= nextRepaint) {
		nextRepaint = Infinity;
		repaint();
	}
}, 50);

canvas.canvas.onclick = function(e) {
	var x = e.offsetX / tileSize - w/2 + 0.5;
	var y = e.offsetY / tileSize - h/2 + 0.5;
	var tx = floor(x + gameState.player.x);
	var ty = floor(y + gameState.player.y);
	switch (gameState.hud.name) {
	case '':
		break;

	case 'cc':
		if (x >= 0 && x <= 4.5 && y >= -3.5 && y <= -3) {
			send({'HUD': {'N': gameState.hud.name, 'D': 'gender'}});
		}
		if (x >= 0 && x <= 4.5 && y >= -2.5 && y <= -2) {
			send({'HUD': {'N': gameState.hud.name, 'D': 'skin'}});
		}
		if (x >= 0 && x <= 4.5 && y >= -1.5 && y <= -1) {
			send({'HUD': {'N': gameState.hud.name, 'D': 'shirt'}});
		}
		if (x >= 0 && x <= 4.5 && y >= -0.5 && y <= 0) {
			send({'HUD': {'N': gameState.hud.name, 'D': 'pants'}});
		}
		if (x >= -3.5 && x <= 5 && y >= 0.5 && y <= 2) {
			send({'HUD': {'N': gameState.hud.name, 'D': 'name'}});
		}
		if (x >= -3.5 && x <= 5 && y >= 2.5 && y <= 3) {
			send({'HUD': {'N': gameState.hud.name, 'D': 'accept'}});
		}
		return;
	}

	if (tx >= 0 && tx < 256 && ty >= 0 && ty < 256) {
		send({'Walk': {'X': tx, 'Y': ty}});
	}
};

canvas.canvas.onmousemove = function(e) {
	mouseX = e.offsetX / tileSize - w/2 + 0.5;
	mouseY = e.offsetY / tileSize - h/2 + 0.5;
	repaint();
}

this['admin'] = function() {
	send({'Admin': [].slice.call(arguments)});
};

var onlogin = function() {
	loggedIn = true;
	var parent = loginForm.parentNode;
	parent.removeChild(loginForm);
	parent.appendChild(canvas.canvas);
	parent.style.overflow = 'hidden';
	inRepaint = false;
	repaint();
};

passField.onchange = function() {
	pass2Field.value = passField.value;
};
loginForm.onsubmit = function() {
	if (loggedIn) {
		return;
	}
	username = loginField.value;
	password = passField.value;
	if (!username) {
		loginField.focus();
		return;
	}
	if (password.length <= 2) {
		passField.focus();
		return;
	}
	sessionStorage['rnoadm_username'] = username;
	sessionStorage['rnoadm_password'] = password;
	send({'Auth': {'U': username, 'P': password}});
	onlogin();
};

if (username && password) {
	onlogin();
}

connect();
})()
