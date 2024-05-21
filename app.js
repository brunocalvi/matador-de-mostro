new Vue({
  el: '#app',
  data: { 
    novoJogo: true,
    HPJogador: 100,
    HPMostro: 100,
    logAtaque: [],
    jogadorGanho: false,
    monstroGanho: false,
    HPPerigoJ: false,
    HPPerigoM: false,
    ocultar: true,
    isDisabled: false,
    text: 'CURAR',
  },
  watch: {
    HPJogador() {
      if(this.HPJogador <= 35) {
        this.HPPerigoJ = true;
      } else {
        this.HPPerigoJ = false;
      };

      if(this.HPJogador <= 0) {
        this.jogadorGanho = false;
        this.monstroGanho = true;
        this.ocultar = false;
        this.HPJogador = 0;
      };
    },
    HPMostro() {
      if(this.HPMostro <= 35) {
        this.HPPerigoM = true;
      } else {
        this.HPPerigoM = false;
      };

      if(this.HPMostro <= 0) {
        this.monstroGanho = false;
        this.jogadorGanho = true;
        this.ocultar = false;
        this.HPMostro = 0;
      }
    },
  },
  methods: {
    salvaLog(l, p, f) {
      this.logAtaque.push({'log': l, 'play': p, 'value': f});
    },
    radominco(n1, n2) {
      return Math.floor(Math.random() * (n1 - n2) + n2);
    },
    curar() {
      let curarJ = this.radominco(10, 4);
      let ataqueM = this.radominco(8, 4);
      let j = this.HPJogador + curarJ;
      let resultado = j - ataqueM;

      this.HPJogador = resultado;

      if(this.HPJogador > 100) {
        this.HPJogador = 100;
      }

      this.isDisabled = true;

      this.iniciarContadorCura();

      this.salvaLog('curar', 'jogador', curarJ);
      this.salvaLog('monstro', 'monstro', ataqueM);
    },
    iniciarContadorCura() { 
      let valor = 30;

      const temporizador = setInterval(() => {
        valor -= 1
        this.text = `${valor}s`;

        if(valor == 0) { 
          this.isDisabled = false;
          this.text = 'CURAR'; 
          clearInterval(temporizador); 
        };
        
      }, 30);
    },
    atacaJogador() {
      let ataqueJ = this.radominco(7, 12);

      this.HPJogador = this.HPJogador - ataqueJ;
      this.salvaLog('monstro', 'monstro', ataqueJ);
    },
    atacaMonstro() {
      let ataqueM = this.radominco(5, 10);
  
      this.salvaLog('jogador', 'jogador', ataqueM);
      this.HPMostro = this.HPMostro - ataqueM;

      this.atacaJogador();
    },
    especial() {
      let ataqueM = this.radominco(15, 10);
  
      this.salvaLog('especial', 'jogador', ataqueM);
      this.HPMostro = this.HPMostro - ataqueM;

      this.atacaJogador();
    },
    zeraJogo() {
      this.novoJogo = true;
      this.HPJogador = 100;
      this.HPMostro = 100;
      this.logAtaque = [];
      this.jogadorGanho = false; 
      this.monstroGanho = false;
      this.HPPerigoJ = false;
      this.HPPerigoM = false;
      this.ocultar = true;
    },
  },
});