//função que inicializa sozinha
(function() {
	//array responsável por armazenar o jogo
	var pecas = [];
	var resposta = [];

	var telaInicio = document.querySelector("#tela-inicio");
		telaInicio.addEventListener("click", comecaJogo, false);

	var telaFinal = document.querySelector("#tela-final");

	//responsável por varrer o documento html, pegar as peças e colocar as referências no array (inicializar os elementos)
	function init() {
		for(var i = 1; i < 9; i++) {
			var peca = document.querySelector("#peca" + i);
			//peca.style.background = "url('img/peca" + i + ".png')" //mexe com o css do elemento

			peca.addEventListener("click", movePeca, false);
			pecas.push(peca);
		}

		//espaço em branco no tabuleiro
		pecas.push(null);
		resposta = pecas;

		render();
	}

	//desenha o tabuleiro com as peças organizadas de acordo som suas posições do array
	function render() {
		//dentro do array
		for(var i in pecas) {
			var peca = pecas[i];

			if(peca) {
				peca.style.left = (i%3) * 230 + 5 + "px"; //% retorna a sobra da divisão por 3
				if(i < 3) {
					peca.style.top = "15px";
				} else if(i < 6) {
					peca.style.top = "245px";
				} else {
					peca.style.top = "475px"
				}
			}
		}
	}

	function movePeca() {
		var index = pecas.indexOf(this);

		//se o elemento não estiver na coluna da esquerda
		if(index % 3 !== 0) {
			//verificar se tem espaço em branco à esquerda
			if(!pecas[index - 1]) {
				pecas[index - 1] = this;
				pecas[index] = null;
			}
		}

		if(index % 3 !== 2) {
			//verificar se tem espaço em branco à esquerda
			if(!pecas[index + 1]) {
				pecas[index + 1] = this;
				pecas[index] = null;
			}
		}

		if(index > 2) {
			//verificar se tem espaço em branco à esquerda
			if(!pecas[index - 3]) {
				pecas[index - 3] = this;
				pecas[index] = null;
			}
		}

		if(index < 6) {
			//verificar se tem espaço em branco à esquerda
			if(!pecas[index + 3]) {
				pecas[index + 3] = this;
				pecas[index] = null;
			}
		}
		render();
		if(verificaVitoria()) {
			fimDeJogo();
		}
	}

	function verificaVitoria() {
		for(var i in pecas) {
			var a = pecas[i];
			var b = resposta[i];
			if(a !== b) {
				return false;
			}
		}

		return true;
	}

	function fimDeJogo() {
		telaFinal.style.opacity = "0.5";
		telaFinal.style.zIndex = "1";
		setTimeout(function() {
			telaFinal.addEventListener("click", comecaJogo, false);
		}, 500); 
	}

	function randomSort(oldArray) {
		var newArray;
		var contar = 0;

		do {
			newArray = [];

			while(newArray.length < oldArray.length) {
				var i = Math.floor(Math.random() * oldArray.length); //gera um número aleatório arredondado entre 0 e 8
				if(newArray.indexOf(oldArray[i]) < 0) {
					newArray.push(oldArray[i]);
				}
			}

			contar++;
			console.log(contar);//verifica quantos jogos foram criados até ter uma ordem válida

		} while(!validaJogo(newArray)); //! inverte os valores v ou f retornados pela função validaJogo

		return newArray;
	}

	function validaJogo(array) {
		var inversoes = 0;
		var elementos = array.length;

		for(var i = 0; i < elementos - 1; i++) {
			for(var j = i + 1; j < elementos; j++) {
				if(array[i] && array[j] && array[i].dataset.value < array[j].dataset.value) {
					inversoes++;
				}
			}
		}

		return inversoes%2 === 0; //inversoes dividido por 2 gera raiz do zero(se é par)
	}

	function comecaJogo() {
		pecas = randomSort(pecas);

		this.style.opacity = "0";
		this.style.zIndex = "-1";
		this.removeEventListener("click", comecaJogo, false);

		render();
	}

	init();
} ());