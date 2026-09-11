/* ============================================================
   Portal de Inclusão Digital - Mondaí
   Scripts principais (exige jQuery)
   ============================================================ */

// Função para mostrar tela específica
function mostrarTela(telaId) {
    // Esconde todas as seções
    $('.secao-oculta, .secao').hide();

    // Ao voltar para as categorias, limpa a busca
    if (telaId === 'tela-categorias') {
        resetarBusca();
    }

    // Mostra a tela solicitada
    $('#' + telaId).show();

    // Scroll para o topo
    $('html, body').animate({scrollTop: 0}, 500);
}

// Remove acentos e deixa tudo minúsculo para facilitar a busca
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Busca por palavra-chave: filtra os cards de categoria
function buscarRecurso() {
    var termo = normalizar($('#busca-input').val());
    var cards = $('#grid-categorias .card--categoria');
    var encontrados = 0;

    // Campo vazio: mostra todas as categorias
    if (termo.length === 0) {
        cards.show();
        $('#sem-resultados').addClass('sem-resultados-oculto');
        return;
    }

    // Filtra os cards pelo texto visível (título + descrição) e pelas palavras-chave
    cards.each(function () {
        var texto = normalizar($(this).text() + ' ' + ($(this).data('termos') || ''));
        if (texto.indexOf(termo) !== -1) {
            $(this).show();
            encontrados++;
        } else {
            $(this).hide();
        }
    });

    // Mostra ou esconde a mensagem de "nenhum resultado"
    if (encontrados === 0) {
        $('#sem-resultados').removeClass('sem-resultados-oculto');
    } else {
        $('#sem-resultados').addClass('sem-resultados-oculto');
    }
}

// Restaura a busca ao estado inicial (todas as categorias visíveis)
function resetarBusca() {
    var campo = $('#busca-input');
    if (campo.length) {
        campo.val('');
    }
    $('#grid-categorias .card--categoria').show();
    $('#sem-resultados').addClass('sem-resultados-oculto');
}

// Mostrar tela inicial ao carregar
$(document).ready(function () {
    mostrarTela('tela-inicio');

    // Permite buscar pressionando a tecla ENTER
    $('#busca-input').on('keypress', function (event) {
        if (event.which === 13) {
            buscarRecurso();
        }
    });

    // Busca em tempo real enquanto o usuário digita
    $('#busca-input').on('input', buscarRecurso);
});