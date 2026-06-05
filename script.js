const nomes = ["João","José","Pedro","Paulo","Carlos","André","Lucas","Fernando","Roberto","Antonio","Francisco","Manuel",
        "Jorge","Luiz","Miguel","Salvador","Eduardo","Gustavo","Sergio","Rodrigo","Ricardo","Fabio","Marcos","Thiago","Daniel",
        "Cesar","Alexandre","Cristiano","Wagner","Clayton","Henrique","Alberto","Julio","Mauricio","Reinaldo","Valter","Gilberto",
        "Claudio","Nelson","Edson","Marcelo","Bruno","Rafael","Diego","Leonardo","Leandro","Raimundo","Sebastiao","Benedito",
        "Adriano","Elias","Evandro","Rogerio","Valmir","Mauro","Flávio","Renato","Mário","Caio","Victor","Vinicius","Matheus",
        "Guilherme","Erick","Alan","Felipe","Ivan","Ronaldo","Davi","Samuel","Wesley","Willian","Jonathan","Anderson","Valdemar",
        "Geraldo","Edmundo","Eugenio","Lindomar","Wanderley","Osvaldo","Cleber","Gerson","Afonso","Agostinho","Almir","Altair",
        "Amaro","Maria","Ana","Beatriz","Carla","Diana","Fernanda","Gabriela","Juliana","Larissa","Mariana","Natália","Patricia",
        "Sofia","Camila","Isabella","Joana","Raquel","Rita","Rosane","Rosana","Aline","Amanda","Bruna","Caroline","Claudia",
        "Cristina","Daniela","Elaine","Fabiana","Giovanna","Heloísa","Ingrid","Jéssica","Karen","Leticia","Luciana","Marcela",
        "Nathalia","Pamela","Priscila","Renata","Sandra","Tania","Vanessa","Viviane","Yasmin","Adriana","Andreia","Barbara",
        "Bianca","Débora","Edilene","Eliane","Erica","Fatima","Gisele","Iara","Iris","Ivone","Jaqueline","Josefa","Katia","Keila",
        "Lara","Leila","Lilian","Luana","Luzia","Marta","Michele","Monica","Nadia","Paula","Stefany","Roseli","Selma","Simone","Sonia",
        "Suele","Tatiane","Thalia", "Cailayne","Diogo","Celso","Vitoria","Luis"];


    const sobrenomes = ["Silva","Santos","Oliveira","Souza","Costa","Ferreira","Gomes","Martins","Pereira","Alves","Rocha","Carvalho",
        "Ribeiro","Teixeira","Mendes","Neves","Barbosa","Caldeira","Duarte","Monteiro","Pinto","Lourenço","Lopes","Leite","Lima",
        "Freitas","Vieira","Correia","Nascimento","Moreira","Moraes","Cruz","Araujo","Ramos","Almeida","Melo","Campos","Fonseca",
        "Cardoso","Rodrigues","Azevedo","Borges","Castro","Cunha","Dias","Esteves","Farias","Fernandes","Figueiredo","Franco","Freire",
        "Galvao","Guimaraes","Lacerda","Leal","Lemos","Macedo","Magalhaes","Maia","Marques","Medeiros","Mendonca","Miranda","Montenegro",
        "Moura","Nogueira","Nunes","Paiva","Peixoto","Pessoa","Porto","Queiroz","Rezende","Salgado","Sales","Sampaio","Santiago",
        "Saraiva","Serrano","Soares","Tavares","Toledo","Torres","Valente","Vargas","Vaz","Viana","Xavier","Abreu","Alencar","Amaral",
        "Andrade","Assis","Avelar","Barreto","Barros","Bastos","Batista","Bezerra","Bispo","Bittencourt","Bonfim","Borba","Braga",
        "Brandão","Brito","Caetano","Camargo","Carneiro","Cavalcante","Nogueira","Antunes","Pinto","Alves"];

    const elNome = document.getElementById('nome');
    const elNascimento = document.getElementById('nascimento');
    const elCpf = document.getElementById('cpf');
    const elZonaSecao = document.getElementById('zonaSecao');
    const gerarBtn = document.getElementById('gerarBtn');
    
    const themeBtn = document.querySelector('[data-theme-toggle]');
    function aleatorio(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function itemAleatorio(lista) { return lista[Math.floor(Math.random() * lista.length)]; }
    function gerarCPF() {
      const digitos = Array.from({ length: 9 }, () => aleatorio(0, 9));
      let soma1 = 0; for (let i = 0; i < 9; i++) soma1 += digitos[i] * (10 - i);
      const resto1 = soma1 % 11; digitos[9] = resto1 < 2 ? 0 : 11 - resto1;
      let soma2 = 0; for (let i = 0; i < 10; i++) soma2 += digitos[i] * (11 - i);
      const resto2 = soma2 % 11; digitos[10] = resto2 < 2 ? 0 : 11 - resto2;
      return `${digitos[0]}${digitos[1]}${digitos[2]}.${digitos[3]}${digitos[4]}${digitos[5]}.${digitos[6]}${digitos[7]}${digitos[8]}-${digitos[9]}${digitos[10]}`;
    }
    function gerarNomeCompleto() {
      const quantidadeNomes = aleatorio(1, 2); const quantidadeSobrenomes = aleatorio(1, 2); const partes = [];
      for (let i = 0; i < quantidadeNomes; i++) partes.push(itemAleatorio(nomes));
      for (let i = 0; i < quantidadeSobrenomes; i++) partes.push(itemAleatorio(sobrenomes));
      return partes.join(' ');
    }
    function gerarDataNascimento() {
      const ano = aleatorio(new Date().getFullYear() - 80, new Date().getFullYear() - 18);
      const mes = aleatorio(1, 12);
      const diasMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const dia = aleatorio(1, diasMes[mes - 1]);
      return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`;
    }
    function gerarZonaSecao() {
      const zona = String(aleatorio(1, 250)).padStart(3, '0');
      const secao = String(aleatorio(1, 4500)).padStart(4, '0');
      return `Zona ${zona} · Seção ${secao}`;
    }

    const municipios = [
      "Acrelândia - AC","Rio Branco - AC","Maceió - AL","Arapiraca - AL","Palmeira dos Índios - AL",
      "Macapá - AP","Santana - AP","Manaus - AM","Parintins - AM","Itacoatiara - AM","Tefé - AM",
      "Salvador - BA","Feira de Santana - BA","Vitória da Conquista - BA","Camaçari - BA","Juazeiro - BA",
      "Ilhéus - BA","Jequíe - BA","Barreiras - BA","Alagoinhas - BA","Paulo Afonso - BA",
      "Fortaleza - CE","Caucaia - CE","Juazeiro do Norte - CE","Maracanãu - CE","Sobral - CE",
      "Crato - CE","Itapipoca - CE","Maranguape - CE","Iguatu - CE","Quixadá - CE",
      "Brasília - DF","Ceilândia - DF","Taguatinga - DF","Samambaia - DF",
      "Vitória - ES","Serra - ES","Vila Velha - ES","Cariacica - ES","Cachoeiro de Itapemirim - ES",
      "Goiânia - GO","Aparecida de Goiânia - GO","Anápolis - GO","Rio Verde - GO","Luziânia - GO",
      "Catalão - GO","Trindade - GO","Formosa - GO",
      "São Luís - MA","Imperatriz - MA","São José de Ribamar - MA","Timon - MA","Caxias - MA",
      "Codó - MA","Paço do Lumiar - MA","Açailândia - MA",
      "Cuiabá - MT","Várzea Grande - MT","Rondônopolis - MT","Sinop - MT","Tangará da Serra - MT",
      "Campo Grande - MS","Dourados - MS","Três Lagoas - MS","Corumbá - MS","Ponta Porã - MS",
      "Belo Horizonte - MG","Uberlândia - MG","Contagem - MG","Juiz de Fora - MG","Betim - MG",
      "Montes Claros - MG","Ribeirão das Neves - MG","Uberaba - MG","Governador Valadares - MG",
      "Ipatinga - MG","Sete Lagoas - MG","Divinópolis - MG","Santa Luzia - MG","Ibirité - MG",
      "Belém - PA","Ananindeua - PA","Santarém - PA","Marabá - PA","Castanhal - PA",
      "Parauapebas - PA","Altamira - PA","Itaituba - PA",
      "João Pessoa - PB","Campina Grande - PB","Santa Rita - PB","Patos - PB","Bayeux - PB",
      "Curitiba - PR","Londrina - PR","Maringá - PR","Ponta Grossa - PR","Cascavel - PR",
      "São José dos Pinhais - PR","Foz do Iguaçu - PR","Colombo - PR","Guarapuava - PR",
      "Recife - PE","Caruaru - PE","Olinda - PE","Jabotaão dos Guararapes - PE","Petrolina - PE",
      "Paulista - PE","Camaragibe - PE","Garanhuns - PE","Vitória de Santo Antão - PE",
      "Teresina - PI","Parnaíba - PI","Picos - PI","Floriano - PI",
      "Rio de Janeiro - RJ","São Gonçalo - RJ","Duque de Caxias - RJ","Nova Iguaçu - RJ",
      "Niterói - RJ","Belford Roxo - RJ","Campos dos Goytacazes - RJ","São João de Meriti - RJ",
      "Petrópolis - RJ","Volta Redonda - RJ","Maricá - RJ","Macaé - RJ","Itaboraí - RJ",
      "Natal - RN","Mossoró - RN","Parnamirim - RN","São Gonçalo do Amarante - RN",
      "Porto Alegre - RS","Caxias do Sul - RS","Pelotas - RS","Canoas - RS","Santa Maria - RS",
      "Gravataí - RS","Viamão - RS","Novo Hamburgo - RS","São Leopoldo - RS","Rio Grande - RS",
      "Porto Velho - RO","Ji-Paraná - RO","Ariquemes - RO","Vilhena - RO",
      "Boa Vista - RR","Rorainopólis - RR",
      "Florianópolis - SC","Joinville - SC","Blumenau - SC","São José - SC","Chapecó - SC",
      "Criciúma - SC","Jaraguá do Sul - SC","Palhoça - SC","Lages - SC","Itajaí - SC",
      "São Paulo - SP","Guarulhos - SP","Campinas - SP","São Bernardo do Campo - SP","Santo André - SP",
      "Osasco - SP","São José dos Campos - SP","Ribeirão Preto - SP","Sorocaba - SP","Santos - SP",
      "Mauá - SP","São José do Rio Preto - SP","Mogi das Cruzes - SP","Diadema - SP","Jundíaí - SP",
      "Aracaju - SE","Nossa Senhora do Socorro - SE","Lagarto - SE","Itabaiana - SE",
      "Palmas - TO","Araguaína - TO","Gurupi - TO","Porto Nacional - TO"
    ];

    function gerarMunicipio() {
      return itemAleatorio(municipios);
    }

    function gerarVoluntario() {
      elNome.textContent = gerarNomeCompleto();
      elNascimento.textContent = gerarDataNascimento();
      elCpf.textContent = gerarCPF();
      elZonaSecao.textContent = gerarZonaSecao();
      document.getElementById('municipio').textContent = gerarMunicipio();
    }

    (function initTheme() {
      const root = document.documentElement;
      let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      themeBtn.textContent = dark ? '☀️' : '🌙';
      themeBtn.addEventListener('click', () => {
        dark = !dark;
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        themeBtn.textContent = dark ? '☀️' : '🌙';
      });
    })();
    gerarBtn.addEventListener('click', gerarVoluntario);
    
    gerarVoluntario();
 // Adicionar esse botão no HTML junto com os outros
// <button class="btn btn-success" id="salvarBtn" type="button">Salvar no banco</button>

document.getElementById('salvarBtn').addEventListener('click', async () => {
    const dados = {
        nome:       document.getElementById('nome').textContent,
        cpf:        document.getElementById('cpf').textContent,
        nascimento: document.getElementById('nascimento').textContent, // DD/MM/YYYY
        zona:       document.getElementById('zonaSecao').textContent,
        municipio:  document.getElementById('municipio').textContent
    };

    try {
        const resposta = await fetch('salvar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const json = await resposta.json();

        if (json.sucesso) {
            alert('Voluntário salvo com sucesso!');
        } else {
            alert('Erro: ' + json.mensagem);
        }
    } catch (e) {
        alert('Falha na requisição: ' + e.message);
    }
});