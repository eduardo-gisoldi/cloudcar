# 🚀 Como Usar o CloudCar - Guia Rápido

## ⚡ Início Rápido (3 passos)

### 1️⃣ Abra o terminal na pasta do projeto
```bash
cd d:\FaculUSCS\Semestre05\DevNuvem\CloudCar\cloudcar
```

### 2️⃣ As dependências já foram instaladas! ✅
Se precisar reinstalar:
```bash
npm install
```

### 3️⃣ Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### 4️⃣ Abra seu navegador em:
```
http://localhost:5173
```

---

## 🎯 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Visualiza build de produção |
| `npm run lint` | Verifica erros de código |

---

## 📱 Testando a Responsividade

### No navegador (Chrome/Edge):
1. Pressione `F12` para abrir DevTools
2. Clique no ícone de dispositivo móvel (ou `Ctrl+Shift+M`)
3. Teste diferentes resoluções:
   - **iPhone SE**: 375px
   - **iPad**: 768px
   - **iPad Pro**: 1024px
   - **Desktop**: 1920px

---

## 🛠️ Estrutura de Arquivos Principais

```
cloudcar/
├── src/
│   ├── componentes/layout/    👈 Todos os componentes aqui
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── BenefitsSection.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── CatalogSection.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── App.jsx               👈 Componente principal
│   ├── index.css             👈 Tailwind CSS
│   └── main.jsx              👈 Entry point
├── index.html                👈 HTML base
└── package.json              👈 Dependências
```

---

## 🎨 Personalizando o Projeto

### Trocar Cores
Edite: `tailwind.config.js`
```javascript
colors: {
  primary: '#3B82F6',    // Mude para sua cor
  secondary: '#1F2937',  // Mude para sua cor
}
```

### Trocar Fonte
Edite: `index.html` (linha 9)
```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

E depois: `tailwind.config.js`
```javascript
fontFamily: {
  'sans': ['SuaFonte', 'system-ui', 'sans-serif'],
}
```

### Adicionar Mais Veículos
Edite: `src/componentes/layout/CatalogSection.jsx`

Adicione mais objetos no array `vehicles`:
```javascript
{
  id: 5,
  badge: '2024',
  image: 'URL_DA_IMAGEM',
  brand: 'Marca',
  model: 'Modelo',
  power: '200',
  fuel: 'Flex',
  km: '10.000 km',
  price: 'R$ 150.000',
}
```

### Trocar Imagens
Procure imagens em:
- [Unsplash](https://unsplash.com/s/photos/luxury-car)
- [Pexels](https://www.pexels.com/search/car/)

Copie a URL e cole nos componentes.

---

## 🐛 Problemas Comuns

### Erro: "npm: command not found"
**Solução**: Instale o Node.js em [nodejs.org](https://nodejs.org/)

### Erro: "Port 5173 is already in use"
**Solução**: Mate o processo na porta 5173 ou use outra porta:
```bash
npm run dev -- --port 3000
```

### Tailwind não está funcionando
**Solução**: Reinicie o servidor:
```bash
Ctrl+C (para parar)
npm run dev (para iniciar novamente)
```

### Menu mobile não abre
**Solução**: Verifique se o React Icons foi instalado:
```bash
npm install react-icons
```

---

## 📸 Recursos Visuais

### Imagens Unsplash Usadas:
1. Hero: `photo-1492144534655-ae79c964c9d7`
2. Sportiva GT: `photo-1544636331-e26879cd4d9b`
3. Urban SUV: `photo-1519641471654-76ce0107ad1b`
4. EcoSedan: `photo-1560958089-b8a1929cea89`
5. City Compact: `photo-1503376780353-7e6692767b70`

### Ícones (React Icons - Feather):
- Menu: `FiMenu`
- Fechar: `FiX`
- Escudo: `FiShield`
- Medalha: `FiAward`
- Lupa: `FiSearch`
- Telefone: `FiPhone`
- Email: `FiMail`
- Velocímetro: `FiGauge`
- Gota: `FiDroplet`
- Atividade: `FiActivity`

---

## ✅ Checklist de Teste

Antes de apresentar o projeto, teste:

- [ ] Site abre sem erros
- [ ] Menu mobile abre e fecha
- [ ] Scroll suave funciona
- [ ] Botões "Ver Catálogo" e "Fale Conosco" funcionam
- [ ] Links de telefone e email funcionam
- [ ] Todas as imagens carregam
- [ ] Hover effects nos cards funcionam
- [ ] Site funciona em mobile (320px)
- [ ] Site funciona em tablet (768px)
- [ ] Site funciona em desktop (1920px)

---

## 🎓 Dicas para Apresentação

1. **Mostre a responsividade ao vivo** (F12 → Device Mode)
2. **Explique o mobile-first approach**
3. **Demonstre o menu hamburger**
4. **Mostre os hover effects**
5. **Explique a estrutura de componentes**

---

## 📚 Documentação Extra

- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## ✨ Pronto para Impressionar!

Seu site CloudCar está 100% funcional e responsivo.
Boa sorte com seu projeto! 🚀
