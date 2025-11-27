# 📚 Resumen Completo de Cambios - Proyecto Trivial Vue 3

## 🎯 Objetivo General

Mejorar la visualización de contenido HTML de la API y personalizar la identidad visual de la aplicación.

---

## 1️⃣ IMPLEMENTACIÓN DE LA DIRECTIVA `v-html`

### 🔍 Problema Identificado

La API de Open Trivia Database devuelve texto con entidades HTML codificadas:

- `&quot;` en lugar de `"`
- `&#039;` en lugar de `'`
- `&amp;` en lugar de `&`

Esto hacía que las preguntas y respuestas se mostraran con estos códigos en lugar de los caracteres correctos.

### ✅ Solución Implementada

#### **Archivo: `src/views/GamePage.vue`**

**Cambio 1: Categoría y Dificultad**

```vue
<!-- ANTES -->
<p class="meta">
  <span>{{ currentQuestion.category }}</span>
  <span>{{ currentQuestion.difficulty }}</span>
</p>

<!-- DESPUÉS -->
<p class="meta">
  <span v-html="currentQuestion.category"></span>
  <span v-html="currentQuestion.difficulty"></span>
</p>
```

**¿Por qué?**

- La interpolación normal `{{ }}` muestra el texto tal cual (escapado)
- `v-html` interpreta y renderiza el HTML correctamente
- Ahora categorías como `Entertainment: Video Games &quot;Mario&quot;` se muestran como `Entertainment: Video Games "Mario"`

---

#### **Archivo: `src/components/AnswerCard.vue`**

**Cambio 2: Texto de las Respuestas**

```vue
<!-- ANTES -->
<button v-for="answer in answers" :key="answer.id" type="button" @click="selectAnswer(answer)">
  {{ answer.text }}
</button>

<!-- DESPUÉS -->
<button
  v-for="answer in answers"
  :key="answer.id"
  type="button"
  @click="selectAnswer(answer)"
  v-html="answer.text"
></button>
```

**¿Por qué?**

- Las respuestas también contienen entidades HTML
- Al usar `v-html` directamente en el botón, el contenido se renderiza correctamente
- Respuestas como `It&quot;s a trap!` ahora se muestran como `It's a trap!`

**⚠️ Nota de Seguridad:**

- `v-html` puede ser peligroso con contenido no confiable (riesgo XSS)
- En este caso es seguro porque la API de Open Trivia DB es una fuente confiable
- Nunca uses `v-html` con contenido generado por usuarios sin sanitizar

---

## 2️⃣ PERSONALIZACIÓN DEL TÍTULO DE LA PÁGINA

### **Archivo: `index.html`**

**Cambio 3: Título del Navegador**

```html
<!-- ANTES -->
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
</head>

<!-- DESPUÉS -->
<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trivial</title>
</head>
```

**¿Qué hace?**

- Cambia el título que aparece en la pestaña del navegador
- Mejora la identidad de la aplicación
- Más profesional y acorde al proyecto

---

## 3️⃣ PERSONALIZACIÓN DEL FAVICON (ICONO)

### **Cambio 4: Nuevo Icono Personalizado**

**Proceso:**

1. Se generó un icono temático con IA (signo de interrogación estilizado con los colores del proyecto)
2. Se guardó como `public/favicon.png`
3. Se actualizó la referencia en `index.html` de `.ico` a `.png`

**Resultado:**

- Icono personalizado visible en la pestaña del navegador
- Coherente con la paleta de colores (frambuesa y melocotón)
- Mejora la identidad visual del proyecto

**📝 Cómo cambiar el icono manualmente:**

```bash
# 1. Coloca tu imagen en la carpeta public
public/mi-icono.png

# 2. Actualiza index.html
<link rel="icon" href="/mi-icono.png">
```

---

## 4️⃣ ACTUALIZACIÓN DEL README.md

### **Cambio 5: Documentación Actualizada**

**Secciones modificadas:**

#### A) Características

```markdown
<!-- AÑADIDO -->

- **Sistema de Vistas:** Navegación entre páginas (HomePage, GamePage, FinishPage)
- **Renderizado correcto de entidades HTML (`v-html`)** en preguntas, categorías...
- **Identidad Visual:** Título personalizado "Trivial" y favicon temático
```

#### B) Estructura del Proyecto

```markdown
<!-- ACTUALIZADO -->

src/
├── components/
│ ├── AnswerCard.vue # ✅ Ahora usa v-html
│ ├── BaseLoader.vue
│ ├── ButtonComponent.vue
│ └── QuestionCard.vue
├── views/ # ✅ Añadido
│ ├── HomePage.vue
│ ├── GamePage.vue # ✅ Ahora usa v-html
│ └── FinishPage.vue
├── router/ # ✅ Añadido
│ └── index.js
public/
└── favicon.png # ✅ Nuevo icono
```

#### C) Roadmap

```markdown
<!-- MARCADO COMO COMPLETADO -->

- [x] Renderizado correcto de entidades HTML con `v-html`
- [x] Sistema de navegación entre páginas
- [x] Personalización de título e icono
```

---

## 📊 RESUMEN DE ARCHIVOS MODIFICADOS

| Archivo                         | Cambios                                   | Propósito                     |
| ------------------------------- | ----------------------------------------- | ----------------------------- |
| `src/views/GamePage.vue`        | Añadido `v-html` en category y difficulty | Renderizar HTML correctamente |
| `src/components/AnswerCard.vue` | Añadido `v-html` en answer.text           | Renderizar HTML en respuestas |
| `index.html`                    | Cambiado título y referencia del favicon  | Personalización visual        |
| `public/favicon.png`            | Nuevo archivo generado                    | Icono personalizado           |
| `README.md`                     | Actualizada documentación completa        | Reflejar estado actual        |

---

## 🎓 CONCEPTOS CLAVE APRENDIDOS

### 1. **Directiva `v-html` en Vue 3**

```vue
<!-- Interpolación normal (escapa HTML) -->
<div>{{ texto }}</div>
<!-- Resultado: &quot;Hola&quot; -->

<!-- v-html (renderiza HTML) -->
<div v-html="texto"></div>
<!-- Resultado: "Hola" -->
```

### 2. **Diferencia entre `{{ }}` y `v-html`**

- `{{ }}`: Muestra texto plano, escapa HTML (seguro)
- `v-html`: Interpreta y renderiza HTML (usar con cuidado)

### 3. **Personalización de aplicaciones Vite**

- `index.html` es el punto de entrada
- La carpeta `public/` sirve archivos estáticos directamente
- Los cambios en `index.html` requieren recargar el navegador

### 4. **Buenas prácticas de documentación**

- Mantener el README actualizado con cada cambio importante
- Marcar tareas completadas en el roadmap
- Documentar la estructura real del proyecto

---

## 🔄 FLUJO DE DATOS ACTUALIZADO

```
API (Open Trivia DB)
    ↓
    Devuelve: "What&#039;s the answer?"
    ↓
obtenerPreguntas() en api.js
    ↓
GamePage.vue (computed: currentQuestion)
    ↓
Template con v-html
    ↓
Navegador renderiza: "What's the answer?" ✅
```

---

## ✨ RESULTADO FINAL

**Antes:**

- Título: "Vite App"
- Icono: Favicon genérico de Vite
- Texto: `Entertainment &quot;Movies&quot;`

**Después:**

- Título: "Trivial" ✅
- Icono: Signo de interrogación personalizado ✅
- Texto: `Entertainment "Movies"` ✅

---

# 🔧 GUÍA COMPLETA DE DIRECTIVAS EN VUE 3

## ¿Qué son las Directivas?

Las **directivas** son atributos especiales con el prefijo `v-` que Vue proporciona para aplicar comportamiento reactivo al DOM. Son instrucciones que le dicen a Vue cómo debe manipular el elemento HTML.

---

## 📋 DIRECTIVAS PRINCIPALES

### 1. `v-bind` - Enlace de Atributos

**Propósito:** Enlazar dinámicamente atributos HTML o props de componentes.

**Sintaxis Completa:**

```vue
<img v-bind:src="imagenUrl" v-bind:alt="descripcion" />
```

**Sintaxis Abreviada (más común):**

```vue
<img :src="imagenUrl" :alt="descripcion" />
```

**Ejemplos Prácticos:**

```vue
<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const colorDinamico = ref('red')
const enlace = ref('https://vuejs.org')
const estilos = ref({
  color: 'blue',
  fontSize: '20px',
})
</script>

<template>
  <!-- Clases dinámicas -->
  <div :class="{ active: isActive }">Clase condicional</div>

  <!-- Estilos dinámicos -->
  <div :style="{ color: colorDinamico }">Texto rojo</div>
  <div :style="estilos">Texto con múltiples estilos</div>

  <!-- Atributos dinámicos -->
  <a :href="enlace">Ir a Vue</a>

  <!-- Atributos booleanos -->
  <button :disabled="!isActive">Botón</button>
</template>
```

**Casos de Uso:**

- Cambiar clases CSS dinámicamente
- Modificar estilos en tiempo real
- Enlazar URLs, imágenes, etc.
- Props de componentes

---

### 2. `v-model` - Enlace Bidireccional

**Propósito:** Crear un enlace de datos bidireccional entre el input y el estado.

**Sintaxis:**

```vue
<input v-model="mensaje" />
```

**Es equivalente a:**

```vue
<input :value="mensaje" @input="mensaje = $event.target.value" />
```

**Ejemplos Prácticos:**

```vue
<script setup>
import { ref } from 'vue'

const nombre = ref('')
const edad = ref(0)
const aceptaTerminos = ref(false)
const genero = ref('')
const hobbies = ref([])
</script>

<template>
  <!-- Input de texto -->
  <input v-model="nombre" placeholder="Tu nombre" />
  <p>Hola, {{ nombre }}</p>

  <!-- Input numérico -->
  <input v-model.number="edad" type="number" />

  <!-- Checkbox -->
  <input v-model="aceptaTerminos" type="checkbox" />
  <label>Acepto términos: {{ aceptaTerminos }}</label>

  <!-- Radio buttons -->
  <input v-model="genero" type="radio" value="masculino" /> Masculino
  <input v-model="genero" type="radio" value="femenino" /> Femenino

  <!-- Checkboxes múltiples -->
  <input v-model="hobbies" type="checkbox" value="deportes" /> Deportes
  <input v-model="hobbies" type="checkbox" value="lectura" /> Lectura
  <p>Hobbies: {{ hobbies }}</p>

  <!-- Select -->
  <select v-model="genero">
    <option value="masculino">Masculino</option>
    <option value="femenino">Femenino</option>
  </select>
</template>
```

**Modificadores:**

```vue
<!-- .lazy: actualiza después de 'change' en vez de 'input' -->
<input v-model.lazy="mensaje" />
```

---

### 3. `v-if`, `v-else-if`, `v-else` - Renderizado Condicional

**Propósito:** Renderizar elementos condicionalmente (añade/elimina del DOM).

**Sintaxis:**

```vue
<script setup>
import { ref } from 'vue'

const mostrar = ref(true)
const tipo = ref('A')
const usuario = ref({ logueado: false, rol: 'admin' })
</script>

<template>
  <!-- Condicional simple -->
  <p v-if="mostrar">Este texto se muestra</p>

  <!-- if-else -->
  <div v-if="usuario.logueado">Bienvenido de vuelta</div>
  <div v-else>Por favor, inicia sesión</div>

  <!-- if-else-if-else -->
  <div v-if="tipo === 'A'">Tipo A</div>
  <div v-else-if="tipo === 'B'">Tipo B</div>
  <div v-else-if="tipo === 'C'">Tipo C</div>
  <div v-else>No es A, B ni C</div>

  <!-- Múltiples condiciones -->
  <div v-if="usuario.logueado && usuario.rol === 'admin'">Panel de administración</div>
</template>
```

**⚠️ Importante:**

- `v-if` **elimina** el elemento del DOM cuando es `false`
- Tiene un costo de rendimiento al alternar frecuentemente
- Usa `v-show` si necesitas alternar muchas veces

---

### 4. `v-show` - Visibilidad Condicional

**Propósito:** Mostrar/ocultar elementos con CSS (display: none).

**Diferencia con v-if:**

```vue
<script setup>
import { ref } from 'vue'
const visible = ref(true)
</script>

<template>
  <!-- v-if: elimina del DOM -->
  <div v-if="visible">Con v-if</div>

  <!-- v-show: solo oculta con CSS -->
  <div v-show="visible">Con v-show</div>
</template>
```

**Cuándo usar cada uno:**

| Característica       | v-if                         | v-show                  |
| -------------------- | ---------------------------- | ----------------------- |
| Renderizado inicial  | Más rápido si es false       | Siempre renderiza       |
| Costo de alternancia | Alto (crea/destruye)         | Bajo (solo CSS)         |
| Uso recomendado      | Condiciones que cambian poco | Alternancias frecuentes |
| Lazy rendering       | ✅ Sí                        | ❌ No                   |

**Ejemplo Práctico:**

```vue
<script setup>
import { ref } from 'vue'
const mostrarModal = ref(false)
const cargando = ref(false)
</script>

<template>
  <!-- Modal que se alterna frecuentemente: v-show -->
  <div v-show="mostrarModal" class="modal">Contenido del modal</div>

  <!-- Spinner de carga: v-if (raramente se muestra) -->
  <div v-if="cargando" class="spinner">Cargando...</div>
</template>
```

---

### 5. `v-for` - Renderizado de Listas

**Propósito:** Renderizar una lista de elementos basándose en un array.

**Sintaxis Básica:**

```vue
<script setup>
import { ref } from 'vue'

const items = ref(['Manzana', 'Banana', 'Naranja'])
const usuarios = ref([
  { id: 1, nombre: 'Ana', edad: 25 },
  { id: 2, nombre: 'Luis', edad: 30 },
  { id: 3, nombre: 'María', edad: 28 },
])
</script>

<template>
  <!-- Array simple -->
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>

  <!-- Array de objetos -->
  <div v-for="usuario in usuarios" :key="usuario.id">
    {{ usuario.nombre }} - {{ usuario.edad }} años
  </div>

  <!-- Con índice -->
  <div v-for="(usuario, index) in usuarios" :key="usuario.id">
    {{ index + 1 }}. {{ usuario.nombre }}
  </div>
</template>
```

**Iterando sobre Objetos:**

```vue
<script setup>
import { ref } from 'vue'

const persona = ref({
  nombre: 'Juan',
  edad: 30,
  ciudad: 'Madrid',
})
</script>

<template>
  <!-- Solo valor -->
  <div v-for="valor in persona" :key="valor">{{ valor }}</div>

  <!-- Valor y clave -->
  <div v-for="(valor, clave) in persona" :key="clave">{{ clave }}: {{ valor }}</div>

  <!-- Valor, clave e índice -->
  <div v-for="(valor, clave, index) in persona" :key="clave">
    {{ index }}. {{ clave }}: {{ valor }}
  </div>
</template>
```

**⚠️ Importante: La prop `:key`**

```vue
<!-- ❌ MAL: sin key -->
<div v-for="item in items">{{ item }}</div>

<!-- ❌ MAL: usando índice como key -->
<div v-for="(item, index) in items" :key="index">{{ item }}</div>

<!-- ✅ BIEN: usando ID único -->
<div v-for="item in items" :key="item.id">{{ item.nombre }}</div>
```

**¿Por qué es importante `:key`?**

- Ayuda a Vue a identificar qué elementos cambiaron
- Mejora el rendimiento en actualizaciones
- Evita bugs en componentes con estado

---

### 6. `v-on` - Manejo de Eventos

**Propósito:** Escuchar eventos del DOM y ejecutar código JavaScript.

**Sintaxis Completa:**

```vue
<button v-on:click="handleClick">Clic aquí</button>
```

**Sintaxis Abreviada (más común):**

```vue
<button @click="handleClick">Clic aquí</button>
```

**Ejemplos Prácticos:**

```vue
<script setup>
import { ref } from 'vue'

const contador = ref(0)
const mensaje = ref('')

const incrementar = () => {
  contador.value++
}

const saludar = (nombre) => {
  alert(`Hola, ${nombre}!`)
}

const manejarSubmit = (event) => {
  event.preventDefault()
  console.log('Formulario enviado')
}
</script>

<template>
  <!-- Click simple -->
  <button @click="contador++">Contador: {{ contador }}</button>

  <!-- Llamar función -->
  <button @click="incrementar">Incrementar</button>

  <!-- Pasar argumentos -->
  <button @click="saludar('Ana')">Saludar a Ana</button>

  <!-- Acceder al evento -->
  <button @click="(event) => console.log(event)">Ver evento</button>

  <!-- Múltiples eventos -->
  <input
    @focus="mensaje = 'Enfocado'"
    @blur="mensaje = 'Desenfocado'"
    @input="mensaje = $event.target.value"
  />

  <!-- Submit de formulario -->
  <form @submit="manejarSubmit">
    <button type="submit">Enviar</button>
  </form>
</template>
```

**Modificadores de Eventos:**

```vue
<!-- .prevent: preventDefault() -->
<form @submit.prevent="onSubmit"></form>
```

**Modificadores de Teclado:**

```vue
<!-- Enter -->
<input @keyup.enter="submit" />
```

**Modificadores de Mouse:**

```vue
<!-- Click derecho -->
<div @click.right="onRightClick"></div>
```

---

### 7. `v-html` - Renderizado de HTML

**Propósito:** Insertar HTML dinámico en el DOM.

**⚠️ ADVERTENCIA DE SEGURIDAD:**

- **Nunca** uses `v-html` con contenido de usuarios
- Riesgo de ataques XSS (Cross-Site Scripting)
- Solo usa con contenido confiable

**Sintaxis:**

```vue
<script setup>
import { ref } from 'vue'

const htmlSeguro = ref('<strong>Texto en negrita</strong>')
const htmlPeligroso = ref('<img src=x onerror="alert(\'XSS\')">')
</script>

<template>
  <!-- ✅ Seguro: contenido controlado -->
  <div v-html="htmlSeguro"></div>

  <!-- ❌ Peligroso: contenido de usuario -->
  <div v-html="htmlPeligroso"></div>
</template>
```

**Comparación con Interpolación:**

```vue
<script setup>
import { ref } from 'vue'
const contenido = ref('<strong>Hola</strong>')
</script>

<template>
  <!-- Interpolación: muestra el HTML como texto -->
  <div>{{ contenido }}</div>
  <!-- Resultado: <strong>Hola</strong> -->

  <!-- v-html: renderiza el HTML -->
  <div v-html="contenido"></div>
  <!-- Resultado: Hola (en negrita) -->
</template>
```

**Caso de Uso Real (nuestro proyecto):**

```vue
<!-- API devuelve: "What&#039;s your name?" -->
<script setup>
const pregunta = ref('What&#039;s your name?')
</script>

<template>
  <!-- Sin v-html: What&#039;s your name? -->
  <div>{{ pregunta }}</div>

  <!-- Con v-html: What's your name? ✅ -->
  <div v-html="pregunta"></div>
</template>
```

---

### 8. `v-text` - Renderizado de Texto

**Propósito:** Establecer el contenido de texto de un elemento.

**Sintaxis:**

```vue
<script setup>
import { ref } from 'vue'
const mensaje = ref('Hola Vue')
</script>

<template>
  <!-- Equivalentes -->
  <span v-text="mensaje"></span>
  <span>{{ mensaje }}</span>
</template>
```

**Diferencia con `{{ }}`:**

- `v-text` sobrescribe todo el contenido del elemento
- `{{ }}` permite mezclar con otro contenido

```vue
<script setup>
const nombre = ref('Ana')
</script>

<template>
  <!-- v-text: solo muestra "Ana" -->
  <div v-text="nombre">Esto se sobrescribe</div>

  <!-- Interpolación: muestra "Hola, Ana" -->
  <div>Hola, {{ nombre }}</div>
</template>
```

---

### 9. `v-once` - Renderizado Único

**Propósito:** Renderizar el elemento solo una vez, sin reactividad.

**Sintaxis:**

```vue
<script setup>
import { ref } from 'vue'
const contador = ref(0)
</script>

<template>
  <!-- Se actualiza cada vez -->
  <div>{{ contador }}</div>

  <!-- Solo se renderiza una vez, no se actualiza -->
  <div v-once>{{ contador }}</div>

  <button @click="contador++">Incrementar</button>
</template>
```

**Casos de Uso:**

- Contenido estático que no cambia
- Optimización de rendimiento
- Valores iniciales que no deben actualizarse

---

### 10. `v-pre` - Saltar Compilación

**Propósito:** Saltar la compilación de Vue para este elemento y sus hijos.

**Sintaxis:**

```vue
<template>
  <!-- Vue compila esto -->
  <div>{{ mensaje }}</div>

  <!-- Vue NO compila esto, muestra literalmente -->
  <div v-pre>{{ mensaje }}</div>
  <!-- Resultado: {{ mensaje }} -->
</template>
```

**Casos de Uso:**

- Mostrar sintaxis de Vue como ejemplo
- Optimizar elementos sin directivas
- Documentación de código

---

### 11. `v-cloak` - Ocultar Contenido No Compilado

**Propósito:** Ocultar elementos hasta que Vue termine de compilar.

**Sintaxis:**

```vue
<style>
[v-cloak] {
  display: none;
}
</style>

<template>
  <!-- Se oculta hasta que Vue esté listo -->
  <div v-cloak>
    {{ mensaje }}
  </div>
</template>
```

**Problema que resuelve:**

```html
<!-- Sin v-cloak: el usuario ve esto por un momento -->
<div>{{ mensaje }}</div>

<!-- Con v-cloak: se oculta hasta que Vue compile -->
<div v-cloak>{{ mensaje }}</div>
```

---

### 12. `v-memo` - Memorización (Vue 3.2+)

**Propósito:** Memorizar un sub-árbol del template para optimizar rendimiento.

**Sintaxis:**

```vue
<script setup>
import { ref } from 'vue'
const items = ref([...])
const selectedId = ref(1)
</script>

<template>
  <div v-for="item in items" :key="item.id" v-memo="[item.id === selectedId]">
    <!-- Solo se re-renderiza si item.id === selectedId cambia -->
    <p>{{ item.nombre }}</p>
    <p>{{ item.descripcion }}</p>
  </div>
</template>
```

**Casos de Uso:**

- Listas grandes con renderizado costoso
- Optimización de rendimiento
- Componentes que raramente cambian

---

## 🎯 DIRECTIVAS PERSONALIZADAS

Puedes crear tus propias directivas para reutilizar lógica del DOM.

**Ejemplo: Directiva v-focus**

```vue
<script setup>
const vFocus = {
  mounted: (el) => el.focus(),
}
</script>

<template>
  <input v-focus placeholder="Auto-enfocado" />
</template>
```

**Ejemplo: Directiva v-click-outside**

```vue
<script setup>
import { ref } from 'vue'

const mostrarMenu = ref(false)

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>

<template>
  <div v-click-outside="() => (mostrarMenu = false)">
    <button @click="mostrarMenu = !mostrarMenu">Toggle Menu</button>
    <div v-show="mostrarMenu">Menú desplegable</div>
  </div>
</template>
```

---

## 📊 TABLA RESUMEN DE DIRECTIVAS

| Directiva | Propósito               | Sintaxis Corta | Uso Común                  |
| --------- | ----------------------- | -------------- | -------------------------- |
| `v-bind`  | Enlazar atributos       | `:`            | `:class`, `:style`, `:src` |
| `v-model` | Enlace bidireccional    | -              | Formularios                |
| `v-if`    | Renderizado condicional | -              | Mostrar/ocultar            |
| `v-show`  | Visibilidad CSS         | -              | Toggle frecuente           |
| `v-for`   | Renderizar listas       | -              | Arrays, objetos            |
| `v-on`    | Escuchar eventos        | `@`            | `@click`, `@submit`        |
| `v-html`  | Renderizar HTML         | -              | Contenido HTML seguro      |
| `v-text`  | Renderizar texto        | -              | Alternativa a `{{ }}`      |
| `v-once`  | Renderizar una vez      | -              | Contenido estático         |
| `v-pre`   | Saltar compilación      | -              | Mostrar sintaxis Vue       |
| `v-cloak` | Ocultar pre-compilación | -              | Evitar flash               |
| `v-memo`  | Memorización            | -              | Optimización               |

---

## 🚀 MEJORES PRÁCTICAS

### 1. **Usa la sintaxis abreviada**

```vue
<!-- ❌ Verboso -->
<button v-on:click="handleClick" v-bind:disabled="isDisabled"></button>
```

### 2. **Siempre usa `:key` con `v-for`**

```vue
<!-- ❌ Sin key -->
<div v-for="item in items">{{ item }}</div>

<!-- ✅ Con key única -->
<div v-for="item in items" :key="item.id">{{ item }}</div>
```

### 3. **Evita `v-if` con `v-for` en el mismo elemento**

```vue
<!-- ❌ Mal rendimiento -->
<div v-for="item in items" v-if="item.activo" :key="item.id"></div>
```

### 4. **Usa `v-show` para alternancias frecuentes**

```vue
<!-- ❌ v-if para modal que se abre/cierra mucho -->
<div v-if="mostrarModal">Modal</div>

<!-- ✅ v-show es más eficiente -->
<div v-show="mostrarModal">Modal</div>
```

### 5. **Cuidado con `v-html`**

```vue
<!-- ❌ Peligroso con input de usuario -->
<div v-html="comentarioUsuario"></div>

<!-- ✅ Solo con contenido confiable -->
<div v-html="contenidoAPI"></div>
```

---

## 🎓 EJERCICIOS PRÁCTICOS

### Ejercicio 1: Lista de Tareas

```vue
<script setup>
import { ref } from 'vue'

const tareas = ref([
  { id: 1, texto: 'Aprender Vue', completada: false },
  { id: 2, texto: 'Hacer ejercicio', completada: true },
])

const nuevaTarea = ref('')

const agregarTarea = () => {
  if (nuevaTarea.value.trim()) {
    tareas.value.push({
      id: Date.now(),
      texto: nuevaTarea.value,
      completada: false,
    })
    nuevaTarea.value = ''
  }
}

const toggleTarea = (id) => {
  const tarea = tareas.value.find((t) => t.id === id)
  if (tarea) tarea.completada = !tarea.completada
}
</script>

<template>
  <div>
    <input v-model="nuevaTarea" @keyup.enter="agregarTarea" />
    <button @click="agregarTarea">Agregar</button>

    <ul>
      <li
        v-for="tarea in tareas"
        :key="tarea.id"
        @click="toggleTarea(tarea.id)"
        :class="{ completada: tarea.completada }"
      >
        {{ tarea.texto }}
      </li>
    </ul>
  </div>
</template>

<style>
.completada {
  text-decoration: line-through;
  color: gray;
}
</style>
```

### Ejercicio 2: Formulario Dinámico

```vue
<script setup>
import { ref, computed } from 'vue'

const formulario = ref({
  nombre: '',
  email: '',
  edad: 0,
  genero: '',
  aceptaTerminos: false,
})

const esValido = computed(() => {
  return (
    formulario.value.nombre.length > 0 &&
    formulario.value.email.includes('@') &&
    formulario.value.edad >= 18 &&
    formulario.value.aceptaTerminos
  )
})

const enviar = () => {
  if (esValido.value) {
    console.log('Formulario enviado:', formulario.value)
  }
}
</script>

<template>
  <form @submit.prevent="enviar">
    <input v-model="formulario.nombre" placeholder="Nombre" />
    <input v-model="formulario.email" type="email" placeholder="Email" />
    <input v-model.number="formulario.edad" type="number" placeholder="Edad" />

    <select v-model="formulario.genero">
      <option value="">Selecciona género</option>
      <option value="masculino">Masculino</option>
      <option value="femenino">Femenino</option>
    </select>

    <label>
      <input v-model="formulario.aceptaTerminos" type="checkbox" />
      Acepto términos
    </label>

    <button :disabled="!esValido" type="submit">Enviar</button>

    <div v-if="!esValido" class="error">Por favor completa todos los campos correctamente</div>
  </form>
</template>
```

---

## 🔗 RECURSOS ADICIONALES

- [Documentación Oficial de Vue 3](https://vuejs.org/guide/essentials/template-syntax.html)
- [Vue School - Directivas](https://vueschool.io/)
- [Vue Mastery - Cursos](https://www.vuemastery.com/)

---

**Fecha de creación:** 2025-11-26  
**Proyecto:** Trivial Vue 3  
**Autor:** Documentación del proyecto
