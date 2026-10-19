# SIS214_ExamenPractico2_AchoSergio

Desarrollo de Aplicacion Web CV y Portafolio Interactivo para el Segundo Examen Practico (Unidad II) de la asignatura Tecnologias Web I (SIS-214) en la Universidad Catolica Boliviana "San Pablo".

## Enlaces del Proyecto

Repositorio Publico en GitHub:
https://github.com/secaet18-sketch/SIS214_ExamenPractico2_AchoSergio

URL de Produccion en GitHub Pages:
https://secaet18-sketch.github.io/SIS214_ExamenPractico2_AchoSergio/

## Arquitectura de la Solucion

El proyecto esta estructurado en las siguientes carpetas y archivos:

- index.html: Estructura semantica HTML5 (header, nav, main, section, article, aside, footer) e integracion de atributos de accesibilidad WAI-ARIA.
- css/styles.css: Variables CSS en :root, regla de reset universal, maquetacion con Flexbox y CSS Grid bajo enfoque Mobile-First (< 768px) y Media Queries para Tablet (768px a 1024px) y Escritorio (> 1024px).
- js/app.js: Logica en JavaScript ES6+ para el cambio de tema con localStorage (JSON.stringify y JSON.parse), menu hamburguesa responsivo con aria-expanded, filtro en tiempo real inmutable con .filter() y .map(), validacion de formulario con event.preventDefault() e input, y consumo de APIs REST mediante fetch y async/await con try...catch, response.ok y estados loading, success y error.
- README.md: Documentacion tecnica del proyecto.

## Tecnologias Utilizadas

- HTML5 Semantico y WAI-ARIA
- CSS3 (Variables CSS, Flexbox, CSS Grid, Media Queries)
- JavaScript ES6+ (DOM, LocalStorage, Fetch API, Async/Await)
- Git y GitHub Pages

## Instrucciones de Ejecucion Local

1. Clonar el repositorio:
   git clone https://github.com/secaet18-sketch/SIS214_ExamenPractico2_AchoSergio.git

2. Entrar a la carpeta del proyecto:
   cd SIS214_ExamenPractico2_AchoSergio

3. Abrir el archivo index.html en el navegador o con la extension Live Server en Visual Studio Code.

## Autor

Sergio Carlos Eithan Acho Sullcata
Ingenieria de Sistemas - Universidad Catolica Boliviana "San Pablo" (La Paz, Bolivia)