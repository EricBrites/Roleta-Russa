// Lógica do jogo
let chancesRestantes = [6, 6, 6, 6]; // 6 chances para cada jogador
let jogadoresPerderam = [false, false, false, false]; // Status dos jogadores
const tambores = [1, 1, 1, 1]; // Determina o número do tambor que dispara

// Adiciona as imagens do tambor
const tamborBase = 'img/tambor_'; // Base da imagem do tambor
const tamborImagemExtensao = '.png'; // Extensão da imagem

function puxarGatilho(jogador) {
    if (jogadoresPerderam[jogador - 1]) {
        document.getElementById("resultado").textContent = `Jogador ${jogador} já perdeu!`;
        return;
    }

    if (chancesRestantes[jogador - 1] <= 0) {
        document.getElementById("resultado").textContent = `Jogador ${jogador} não tem mais chances!`;
        return;
    }

    // Verifica se é a última chance (6ª tentativa)
    if (chancesRestantes[jogador - 1] === 1) {
        document.getElementById("resultado").textContent = `Jogador ${jogador} perdeu na 6ª tentativa!`;
        document.getElementById("somPerda").play(); // Toca o som de perda
        jogadoresPerderam[jogador - 1] = true;

        // Muda a imagem do jogador para a imagem de perda
        document.getElementById(`jogador${jogador}-img`).src = `img/jogador${jogador}_perdeu.png`;
        document.getElementById(`jogador${jogador}`).disabled = true;
        chancesRestantes[jogador - 1] -= 1; // Reduz a chance

        atualizarBotoes();
        atualizarChances(jogador); // Atualiza a exibição das chances
        return;
    }

    const tiro = Math.floor(Math.random() * 6) + 1; // Gera um número aleatório de 1 a 6
    chancesRestantes[jogador - 1] -= 1; // Diminui a chance do jogador

    // Verifica se o tiro é um acerto ou erro
    if (tiro === tambores[jogador - 1]) {
        document.getElementById("resultado").textContent = `Jogador ${jogador} perdeu!`;
        document.getElementById("somPerda").play(); // Toca o som de perda
        jogadoresPerderam[jogador - 1] = true;

        // Muda a imagem do jogador para a imagem de perda
        document.getElementById(`jogador${jogador}-img`).src = `img/jogador${jogador}_perdeu.png`;
        document.getElementById(`jogador${jogador}`).disabled = true;
    } else {
        document.getElementById("resultado").textContent = `Jogador ${jogador} sobreviveu!`;
        document.getElementById("somVitoria").play(); // Toca o som de vitória
    }

    atualizarChances(jogador); // Atualiza a exibição das chances

    // Verifica se o jogador perdeu após usar todas as chances
    if (chancesRestantes[jogador - 1] === 0 && !jogadoresPerderam[jogador - 1]) {
        document.getElementById("resultado").textContent = `Jogador ${jogador} não sobreviveu após 6 tentativas!`;
        jogadoresPerderam[jogador - 1] = true;
        document.getElementById(`jogador${jogador}-img`).src = `img/jogador${jogador}_perdeu.png`;
        document.getElementById(`jogador${jogador}`).disabled = true;
    }

    atualizarBotoes();
}

function atualizarChances(jogador) {
    const divChances = document.getElementById(`jogador${jogador}-chances`);
    divChances.innerHTML = ''; // Limpa as chances atuais

    // Adiciona a imagem do tambor com o número de balas restantes
    const img = document.createElement('img');
    img.src = tamborBase + chancesRestantes[jogador - 1] + tamborImagemExtensao; // Define a imagem correspondente ao número de chances restantes
    //img.alt = `Chances restantes do Jogador ${jogador}`;
    img.style.width = '80px'; // Ajuste o tamanho da imagem do tambor
    img.style.margin = '10px';
    divChances.appendChild(img);
}

function atualizarBotoes() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`jogador${i}`).disabled = jogadoresPerderam[i - 1];
    }
}

function resetar() {
    chancesRestantes = [6, 6, 6, 6]; // Reinicia as chances
    jogadoresPerderam = [false, false, false, false]; // Reinicia os status dos jogadores
    document.getElementById("resultado").textContent = ''; // Limpa o resultado

    // Reseta as imagens dos jogadores e chances
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`jogador${i}-img`).src = `img/jogador${i}.png`;
        document.getElementById(`jogador${i}`).disabled = false; // Habilita os botões
        atualizarChances(i); // Atualiza a exibição das chances
    }
}
