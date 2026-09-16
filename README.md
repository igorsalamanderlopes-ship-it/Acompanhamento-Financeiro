# Acompanhante Financeiro

PWA de controle de gastos para duas pessoas, com a planilha `Base` do Google Drive
como banco de dados. Funciona offline e sincroniza quando a rede volta.

## Ciclo de pagamento

O controle não usa mês civil. Cada ciclo vai de um crédito ao outro:

- Crédito 1: 5º dia útil do mês
- Crédito 2: dia 20, antecipado para o dia útil anterior quando cai em fim de semana ou feriado

Feriados nacionais, do Ceará e de Fortaleza de 2026 e 2027 já vêm cadastrados.

## Regra da margem

```
margem do ciclo = renda do ciclo
                , gastos fixos que vencem no ciclo
                , parcelas de cartão que vencem no ciclo
                , reserva (percentual da renda)
                , aportes de metas sem prioridade

margem diária   = (margem , gastos já lançados) ÷ dias restantes até o próximo crédito
```

A reserva sai antes, não sobra no fim. Gastar acima da média hoje derruba a diária de amanhã.

## Metas

Até três metas com prioridade por pessoa: ouro, prata e bronze. Cada uma recebe uma
fatia da economia mensal, por padrão 50%, 35% e 15%, ajustável. O app mostra o
percentual concluído, quanto falta, o aporte mensal e o mês previsto de conclusão.

Meta conjunta: ao criar, escolha a outra pessoa e o aporte dela. Ela recebe o convite
na aba Metas e o aporte só entra na conta depois que aceitar.

## Carteiras

Gastos pagos com benefício não consomem a margem de dinheiro. CESTA e ALIMENTAÇÃO
já vêm cadastradas para as duas pessoas, com valor mensal, dia de crédito e um campo
para corrigir o valor que entrou em um mês específico. Cada subgrupo aponta a carteira
que costuma pagá-lo, então o lançamento já vem preenchido.

## Parcelamento

No próprio lançamento há o campo "Parcelar em". Informe o valor total, escolha o número
de parcelas e o app grava um parcelamento em vez de um gasto avulso, com data de quitação
calculada. A tela Contas mostra quanto falta de cada um e a projeção de 12 meses com a
margem subindo conforme as parcelas terminam.

## Simulador

Botão "Simular um gasto" na tela Hoje. Informe valor e parcelas para ver o efeito na
diária dos próximos ciclos e o atraso que causaria em cada meta se você optasse por
pagar com a economia.

## Dicas

Na aba Histórico, geradas dos seus próprios dados: grupos acima da sua média, compras
pequenas repetidas, benefício sobrando enquanto você paga em dinheiro, parcelas ou
fixos pesando demais na renda.

## Instalação

### 1. Backend na planilha

1. Abra a planilha `Base` na pasta Acompanhante Financeiro.
2. Extensões > Apps Script. Apague o conteúdo e cole o `Codigo.gs`.
3. Troque a constante `CHAVE` por um texto longo só seu.
4. Rode a função `instalar` uma vez e autorize. Ela cria as 11 abas, formata tudo como
   texto e preenche usuários, categorias, carteiras e feriados.
5. Implantar > Nova implantação > Aplicativo da Web.
   - Executar como: Eu
   - Quem tem acesso: Qualquer pessoa
6. Copie a URL terminada em `/exec`.

### 2. Hospedagem no GitHub Pages

1. Suba `index.html`, `manifest.json`, `sw.js`, `icone-192.png` e `icone-512.png`.
2. Settings > Pages > branch `main`, pasta `/ (root)`.
3. Abra no celular e use "Adicionar à tela de início".

### 3. Primeira configuração

Aba Ajustes: cole a URL e a chave, toque em "Conectar e sincronizar". Depois troque os
nomes das duas pessoas, preencha os dois créditos de salário de cada uma, o percentual
de reserva, os valores de CESTA e ALIMENTAÇÃO, os gastos fixos e os parcelamentos abertos.

Escolha as cores em Ajustes > Cores do app: sete opções, claras e escuras.

Para começar, lance o dinheiro que você já tem como entrada avulsa com a data de hoje.
Quando o salário cair, lance com a data real do crédito e o tipo correspondente. Esse
valor substitui o padrão só naquele ciclo.

## Segurança

A URL do `/exec` fica acessível a quem tiver o link, por isso a chave. Não publique a URL
em repositório público. Se vazar, crie uma nova implantação e troque a `CHAVE`.

## Abas da planilha

| Aba | Para quê |
|---|---|
| `Config` | créditos de salário e percentual de reserva, por pessoa |
| `Usuarios` | as duas pessoas |
| `Categorias` | grupo, subgrupo, natureza e carteira padrão |
| `Carteiras` | CESTA, ALIMENTAÇÃO e outras, com valor mensal por pessoa |
| `CreditosCarteira` | correção do valor creditado em um mês específico |
| `Rendas` | salários com valor diferente do padrão e entradas avulsas |
| `Fixos` | contas recorrentes com dia de vencimento |
| `Parcelas` | compras parceladas, com mês da 1ª parcela e total |
| `Metas` | alvo, prioridade, fatia da economia, parceria e saldo |
| `Lancamentos` | gastos do dia a dia |
| `Feriados` | datas que não contam como dia útil |

O arquivo `Base.xlsx` é só um espelho da estrutura, para o caso de você preferir importar
em vez de rodar o `instalar`.
