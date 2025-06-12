# Ecologiapp

Este aplicativo é um questionário interativo que avalia o impacto ecológico do usuário através de questões sobre transporte, consumo de energia, alimentação e uso de água.

## Funcionalidades

- Questionário completo sobre sustentabilidade
- Cálculo automático do impacto ecológico
- Número de planetas necessários para sustentar o estilo de vida
- Dicas personalizadas para redução do impacto ambiental
- Persistência dos últimos resultados
- Interface responsiva para dispositivos móveis
- Suporte a tema claro e escuro

## Requisitos

- Node.js 14 ou superior
- npm ou yarn
- React Native
- Expo

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd ecologiapp
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Instale o AsyncStorage:
```bash
npm install @react-native-async-storage/async-storage
# ou
yarn add @react-native-async-storage/async-storage
```

4. Inicie o aplicativo:
```bash
npm start
# ou
yarn start
```

## Estrutura do Projeto

- `app/` - Diretório principal do aplicativo
  - `(tabs)/` - Telas principais
    - `index.tsx` - Tela inicial
  - `questionario.tsx` - Tela do questionário
- `components/` - Componentes reutilizáveis
  - `Question.tsx` - Componente de questão
- `constants/` - Constantes e configurações
  - `Colors.ts` - Cores do tema

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- AsyncStorage para persistência local

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
