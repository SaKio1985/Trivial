# 🧠 Trivial Game - Vue 3

Un juego interactivo de preguntas y respuestas (Trivial) desarrollado con **Vue 3** y **Vite**, utilizando la Composition API. El proyecto consume preguntas dinámicas desde una API externa y gestiona el estado del juego en tiempo real.

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Características

- **Arquitectura de Componentes:** Separación lógica entre componentes reutilizables (`AnswerCard`, `BaseLoader`, `ButtonComponent`, `QuestionCard`).
- **Sistema de Vistas:** Navegación entre páginas (`HomePage`, `GamePage`, `FinishPage`) con Vue Router.
- **Gestión de Estado Reactivo:** Uso de `ref` y `computed` para manejar la puntuación y el flujo de preguntas.
- **API Externa:** Integración con [Open Trivia Database](https://opentdb.com/) para obtener preguntas infinitas.
- **Lógica de Juego:**
  - Mezcla aleatoria de respuestas (correcta e incorrectas).
  - Sistema de puntuación acumulativa.
  - Renderizado correcto de entidades HTML (`v-html`) en preguntas, categorías, dificultad y respuestas.
- **Diseño Responsivo:** Interfaz adaptable a móviles y escritorio con gradientes y animaciones.
- **Estilos Personalizados:** Uso de variables CSS nativas con paleta de colores frambuesa y melocotón.
- **Identidad Visual:** Título personalizado "Trivial" y favicon temático.

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/SaKio1985/Trivial.git
   cd Trivial
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 📂 Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad:

```text
src/
├── assets/            # Archivos estáticos (CSS global, fuentes)
├── components/
│   ├── AnswerCard.vue      # Componente para mostrar opciones de respuesta
│   ├── BaseLoader.vue      # Componente de carga animado
│   ├── ButtonComponent.vue # Botón reutilizable
│   └── QuestionCard.vue    # Componente visual para la pregunta
├── services/
│   ├── api.js         # Lógica de conexión con Open Trivia DB
│   └── answers.js     # Algoritmo para mezclar (shuffle) respuestas
├── views/
│   ├── HomePage.vue   # Página de inicio del juego
│   ├── GamePage.vue   # Página principal del juego
│   └── FinishPage.vue # Página de resultados finales
├── router/
│   └── index.js       # Configuración de rutas
├── App.vue            # Componente raíz
└── main.js            # Punto de entrada
public/
└── favicon.png        # Icono personalizado de la aplicación
```

## 🎨 Paleta de Colores

El diseño utiliza una paleta de colores personalizada definida en variables CSS, enfocada en tonos frambuesa y melocotón para una interfaz amigable:

| Variable CSS      | Color |    Hex    | Uso                                      |
| :---------------- | :---: | :-------: | :--------------------------------------- |
| `--primary-color` |  🔴   | `#bd1852` | Botones, Encabezados (Raspberry Red)     |
| `--primary-dark`  |  🍷   | `#7b1041` | Hover, Bordes (Burgundy)                 |
| `--accent-color`  |  🍑   | `#ffd5a4` | Textos destacados, Fondos (Peach Pastel) |

## 🛠️ Tecnologías Utilizadas

- **Framework:** Vue.js 3 (Script Setup Syntax).
- **Build Tool:** Vite.
- **Estilos:** CSS3 con Scoped CSS y CSS Variables.
- **API:** Open Trivia DB API.

## 🔮 Mejoras Futuras (Roadmap)

- [x] Renderizado correcto de entidades HTML con `v-html`.
- [x] Sistema de navegación entre páginas (Home, Game, Finish).
- [x] Personalización de título e icono.
- [ ] Implementar traducción automática al español (Google Translate API / MyMemory).
- [ ] Añadir selector de categorías (Cine, Historia, Deportes).
- [ ] Temporizador cuenta atrás por pregunta.
- [ ] Modo multijugador local.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un _issue_ primero para discutir qué te gustaría cambiar o envía directamente un _Pull Request_.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

---

Desarrollado por [SaKio1985](https://github.com/SaKio1985)
