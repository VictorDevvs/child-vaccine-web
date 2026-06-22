# Carteira Digital de Vacinação Infantil

Aplicação Ionic + Angular para acompanhamento da jornada de vacinação de crianças, permitindo que responsáveis monitorem o histórico vacinal, identifiquem pendências e acompanhem campanhas de vacinação ativas.

## Funcionalidades

- Autenticação de responsáveis (Firebase Auth - e-mail/senha)
- Cadastro e acompanhamento de múltiplas crianças por responsável
- Carteira de vacinação digital com histórico completo por criança
- Identificação automática de vacinas pendentes e atrasadas
- Catálogo de vacinas e registro de doses aplicadas/agendadas
- Visualização de campanhas de vacinação ativas, com destaque de elegibilidade por criança
- Indicador visual de progresso vacinal por criança
- Layout responsivo (mobile, tablet, desktop)

## Tecnologias

- Ionic Framework + Angular (standalone components)
- Firebase Authentication
- Firebase Firestore
- RxJS
- TypeScript (POO: modelos de domínio com comportamento encapsulado)

## Arquitetura
src/app/

├── core/

│   ├── models/      # Classes de domínio: Child, Vaccine, VaccineRecord, Campaign

│   ├── services/    # Acesso a dados (Firestore/Auth)

│   └── guards/       # Proteção de rotas autenticadas

├── features/

│   ├── auth/         # Login e cadastro

│   ├── children/     # Lista, cadastro, detalhe e registro de vacinas

│   ├── campaigns/     # Campanhas de vacinação

│   └── profile/       # Perfil do responsável

├── shared/

│   └── components/    # Componentes reutilizáveis (ex: card de criança)

└── tabs/               # Navegação principal

## Regras de negócio

- O status de uma dose é calculado dinamicamente: **aplicada** (possui data de aplicação), **atrasada** (data prevista já passou e não foi aplicada) ou **pendente** (data prevista futura).
- Cada responsável só visualiza e gerencia as crianças e registros vinculados à própria conta (reforçado por Firestore Security Rules).
- Campanhas são exibidas com indicação de elegibilidade, comparando a faixa etária da campanha com a idade atual de cada criança do responsável.

## Como executar localmente

\`\`\`bash
npm install
ionic serve
\`\`\`

Configure suas próprias credenciais do Firebase em `src/environments/environment.ts` e `environment.prod.ts`.

## Aplicação publicada

https://child-vaccine-29a13.web.app/login

## Autor

Victor
