// Velocidade de rolagem em segundo plano
let move_speed = 3;
	
// Valor constante da gravidade
let gravity = 0.5;
	
// Obtendo referência ao elemento pássaro
let bird = document.querySelector('.bird');
	
// Obtendo propriedades do elemento pássaro
let bird_props = bird.getBoundingClientRect();
let background =
	document.querySelector('.background')
			.getBoundingClientRect();
	
// Obtendo referência ao elemento score
let score_val =
	document.querySelector('.score_val');
let message =
	document.querySelector('.message');
let score_title =
	document.querySelector('.score_title');
	
// Configurando o estado inicial do jogo para começar
let game_state = 'Start';
	
// Adicione um eventlistener para pressionamentos de teclas
document.addEventListener('keydown', (e) => {
	
// Inicie o jogo se a tecla Enter for pressionada
if (e.key == 'Enter' &&
	game_state != 'Play') {
	document.querySelectorAll('.pipe_sprite')
			.forEach((e) => {
	e.remove();
	});
	bird.style.top = '40vh';
	game_state = 'Play';
	message.innerHTML = '';
	score_title.innerHTML = 'Score : ';
	score_val.innerHTML = '0';
	play();
}
});
function play() {
function move() {
	
	// Detect if game has ended
	if (game_state != 'Play') return;
	
	// obtendo referência a todos os elementos do tubo
	let pipe_sprite = document.querySelectorAll('.pipe_sprite');
	pipe_sprite.forEach((element) => {
		
	let pipe_sprite_props = element.getBoundingClientRect();
	bird_props = bird.getBoundingClientRect();
		
	// Exclua os tubos se eles tiverem saído
//da tela, economizando memória
	if (pipe_sprite_props.right <= 0) {
		element.remove();
	} else {
		// Detecção de colisão com pássaros e canos
		if (
		bird_props.left < pipe_sprite_props.left +
		pipe_sprite_props.width &&
		bird_props.left +
		bird_props.width > pipe_sprite_props.left &&
		bird_props.top < pipe_sprite_props.top +
		pipe_sprite_props.height &&
		bird_props.top +
		bird_props.height > pipe_sprite_props.top
		) {
			
		//Mude o estado do jogo e termine o jogo
		// se ocorrer colisão
		game_state = 'End';
		message.innerHTML = 'Press Enter To Restart';
		message.style.left = '28vw';
		return;
		} else {
		// Aumenta a pontuação se o jogador
		// evitou com sucesso o
		if (
			pipe_sprite_props.right < bird_props.left &&
			pipe_sprite_props.right +
			move_speed >= bird_props.left &&
			element.increase_score == '1'
		) {
			score_val.innerHTML = +score_val.innerHTML + 1;
		}
		element.style.left =
			pipe_sprite_props.left - move_speed + 'px';
		}
	}
	});

	requestAnimationFrame(move);
}
requestAnimationFrame(move);

let bird_dy = 0;
function apply_gravity() {
	if (game_state != 'Play') return;
	bird_dy = bird_dy + gravity;
	document.addEventListener('keydown', (e) => {
	if (e.key == 'ArrowUp' || e.key == ' ') {
		bird_dy = -7.6;
	}
	});

	// Collision detection with bird and
	// window top and bottom

	if (bird_props.top <= 0 ||
		bird_props.bottom >= background.bottom) {
	game_state = 'End';
	message.innerHTML = 'Press Enter To Restart';
	message.style.left = '28vw';
	return;
	}
	bird.style.top = bird_props.top + bird_dy + 'px';
	bird_props = bird.getBoundingClientRect();
	requestAnimationFrame(apply_gravity);
}
requestAnimationFrame(apply_gravity);

let pipe_seperation = 0;
	
// Constant value for the gap between two pipes
let pipe_gap = 35;
function create_pipe() {
	if (game_state != 'Play') return;
	
	// Crie outro conjunto de tubos
// se a distância entre dois tubos for excedida
// um valor predefinido
	if (pipe_seperation > 115) {
	pipe_seperation = 0
		
	// Calcule a posição aleatória dos tubos no eixo y
	let pipe_posi = Math.floor(Math.random() * 43) + 8;
	let pipe_sprite_inv = document.createElement('div');
	pipe_sprite_inv.className = 'pipe_sprite';
	pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
	pipe_sprite_inv.style.left = '100vw';
		
	// Anexe o elemento pipe criado no DOM
	document.body.appendChild(pipe_sprite_inv);
	let pipe_sprite = document.createElement('div');
	pipe_sprite.className = 'pipe_sprite';
	pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
	pipe_sprite.style.left = '100vw';
	pipe_sprite.increase_score = '1';
		
	// Anexe o elemento pipe criado no DOM
	document.body.appendChild(pipe_sprite);
	}
	pipe_seperation++;
	requestAnimationFrame(create_pipe);
}
requestAnimationFrame(create_pipe);
}
