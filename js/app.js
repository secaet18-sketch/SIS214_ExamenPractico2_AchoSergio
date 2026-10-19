'use strict';

const PORTFOLIO_DATA = Object.freeze([
  Object.freeze({
    id: 1,
    title: 'Sistema de Navegación Campus UCB (Dijkstra)',
    type: 'proyecto',
    period: '2026',
    description: 'Aplicación Full-Stack para cálculo de rutas óptimas en el campus con Spring Boot y mapas interactivos en Leaflet.js.',
    tags: Object.freeze(['Java', 'Spring Boot', 'Leaflet.js', 'HTML5'])
  }),
  Object.freeze({
    id: 2,
    title: 'Calculadora Web Interactiva',
    type: 'proyecto',
    period: '2026',
    description: 'Aplicación web con manipulación del DOM, delegación de eventos y diseño responsivo CSS Grid.',
    tags: Object.freeze(['HTML5', 'CSS3', 'JavaScript ES6+'])
  }),
  Object.freeze({
    id: 3,
    title: 'Gestión de Gimnasio y Biometría en JavaFX',
    type: 'proyecto',
    period: '2026',
    description: 'Sistema orientado a objetos para rutinas de entrenamiento, planes nutricionales y seguimiento biométrico.',
    tags: Object.freeze(['Java', 'JavaFX', 'POO'])
  }),
  Object.freeze({
    id: 4,
    title: 'Sistema Pasanaku con Base de Datos SQL',
    type: 'proyecto',
    period: '2026',
    description: 'Aplicación para gestión de ahorro comunitario con persistencia relacional y conexión JDBC.',
    tags: Object.freeze(['Java', 'MySQL', 'PostgreSQL', 'SQL'])
  }),
  Object.freeze({
    id: 5,
    title: 'Simulación Física 2D con C++ y Raylib',
    type: 'habilidad',
    period: '2025 — 2026',
    description: 'Desarrollo de lógica de colisiones vectoriales, normalización de velocidad y estructuras de datos en C++ y Python.',
    tags: Object.freeze(['C++', 'Raylib', 'Python', 'Algoritmos'])
  }),
  Object.freeze({
    id: 6,
    title: 'Desarrollo de Interfaces Web y Bases de Datos',
    type: 'certificacion',
    period: '2026',
    description: 'Competencia certificada en maquetación semántica WAI-ARIA, JavaScript ES6+, control de versiones Git y modelado SQL.',
    tags: Object.freeze(['Git', 'GitHub Pages', 'WAI-ARIA', 'REST API'])
  })
]);

const THEME_KEY = 'sis214_theme_preference';

const setupThemeSwitcher = () => {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  const applyTheme = (themeData) => {
    const isDark = Boolean(themeData && themeData.mode === 'dark');
    htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', isDark);

    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', String(isDark));
      toggleBtn.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
    }
  };

  try {
    const storedValue = localStorage.getItem(THEME_KEY);
    if (storedValue) {
      const parsedTheme = JSON.parse(storedValue);
      applyTheme(parsedTheme);
    } else {
      const initialTheme = { mode: 'light' };
      localStorage.setItem(THEME_KEY, JSON.stringify(initialTheme));
      applyTheme(initialTheme);
    }
  } catch (err) {
    applyTheme({ mode: 'light' });
  }

  toggleBtn?.addEventListener('click', () => {
    const currentMode = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = { mode: currentMode === 'dark' ? 'light' : 'dark' };

    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(nextTheme));
    } catch (err) {
      console.error(err);
    }

    applyTheme(nextTheme);
  });
};

const setupResponsiveMenu = () => {
  const menuBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !expanded;
    menuBtn.setAttribute('aria-expanded', String(nextState));
    navMenu.classList.toggle('is-open', nextState);
  });

  navMenu.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link && window.innerWidth <= 1024) {
      menuBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    }
  });
};

const setupDynamicFilter = () => {
  const filterForm = document.getElementById('filter-form');
  const searchInput = document.getElementById('search-input');
  const categoryContainer = document.getElementById('category-buttons');
  const listContainer = document.getElementById('portfolio-list');
  const countLabel = document.getElementById('portfolio-count');

  if (!listContainer || !countLabel) return;

  let currentType = 'todos';
  let currentQuery = '';

  const renderItems = () => {
    const query = currentQuery.trim().toLowerCase();

    const cardsMarkup = PORTFOLIO_DATA
      .filter((item) => {
        const matchesType = currentType === 'todos' || item.type === currentType;
        const matchesText =
          query === '' ||
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query));

        return matchesType && matchesText;
      })
      .map((item) => {
        const tagsHtml = item.tags.map((tag) => `<li>${tag}</li>`).join('');
        return `
          <article class="item-card">
            <header>
              <small class="item-meta">${item.type} • ${item.period}</small>
              <h3>${item.title}</h3>
            </header>
            <p>${item.description}</p>
            <footer>
              <ul class="tag-group" aria-label="Tecnologías de ${item.title}">
                ${tagsHtml}
              </ul>
            </footer>
          </article>
        `;
      });

    countLabel.textContent = `Mostrando ${cardsMarkup.length} de ${PORTFOLIO_DATA.length} elementos`;

    if (cardsMarkup.length === 0) {
      listContainer.innerHTML = `
        <article class="item-card">
          <h3>Sin resultados</h3>
          <p>No se encontraron elementos para "${currentQuery}".</p>
        </article>
      `;
      return;
    }

    listContainer.innerHTML = cardsMarkup.join('');
  };

  filterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  searchInput?.addEventListener('input', (event) => {
    currentQuery = event.target.value;
    renderItems();
  });

  categoryContainer?.addEventListener('click', (event) => {
    const clickedBtn = event.target.closest('button[data-type]');
    if (!clickedBtn) return;

    const allBtns = categoryContainer.querySelectorAll('.filter-btn');
    allBtns.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-pressed', 'true');
    currentType = clickedBtn.dataset.type || 'todos';
    renderItems();
  });

  renderItems();
};

const setupContactForm = () => {
  const form = document.getElementById('contact-form');
  const formResult = document.getElementById('form-result');

  if (!form || !formResult) return;

  const getValidationMessage = (field) => {
    if (field.validity.valueMissing) {
      return 'Este campo es obligatorio.';
    }
    if (field.validity.typeMismatch && field.type === 'email') {
      return 'Ingresa una dirección de correo electrónico válida.';
    }
    if (field.validity.tooShort) {
      return `Debe contener al menos ${field.minLength} caracteres (actual: ${field.value.length}).`;
    }
    return '';
  };

  const validateField = (field) => {
    const isValid = field.checkValidity();
    const feedbackId = field.getAttribute('aria-describedby');
    const feedbackEl = feedbackId ? document.getElementById(feedbackId) : null;

    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
    field.setAttribute('aria-invalid', String(!isValid));

    if (feedbackEl) {
      feedbackEl.textContent = isValid ? 'Campo válido.' : getValidationMessage(field);
      feedbackEl.className = `field-msg ${isValid ? 'msg-valid' : 'msg-invalid'}`;
    }

    return isValid;
  };

  form.addEventListener('input', (event) => {
    const target = event.target;
    if (target.matches('input, textarea')) {
      validateField(target);
      formResult.textContent = '';
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = Array.from(form.querySelectorAll('input, textarea'));
    const allValid = fields.map((field) => validateField(field)).every(Boolean);

    if (!allValid) {
      formResult.textContent = 'Por favor, revisa y corrige los campos con error.';
      return;
    }

    const senderName = document.getElementById('contact-name').value.trim();
    formResult.textContent = `Mensaje enviado con éxito, ${senderName}.`;

    form.reset();
    fields.forEach((field) => {
      field.classList.remove('is-valid', 'is-invalid');
      field.setAttribute('aria-invalid', 'false');
      const feedbackId = field.getAttribute('aria-describedby');
      const feedbackEl = feedbackId ? document.getElementById(feedbackId) : null;
      if (feedbackEl) {
        feedbackEl.textContent = '';
      }
    });
  });
};

const setupAsyncApiModule = () => {
  const apiForm = document.getElementById('api-form');
  const userInput = document.getElementById('github-user');
  const apiActions = document.getElementById('api-actions');
  const apiResult = document.getElementById('api-result');
  const asideWeather = document.getElementById('aside-weather');

  if (!apiResult) return;

  const formatHttpStatus = (status) => {
    if (status === 200) return '200 OK';
    if (status === 400) return '400 Bad Request';
    if (status === 404) return '404 Not Found';
    if (status === 500) return '500 Internal Server Error';
    return `HTTP ${status}`;
  };

  const renderLoading = (text) => {
    apiResult.className = 'api-status-box state-loading';
    apiResult.innerHTML = `
      <header>
        <small class="item-meta">Estado: Cargando (loading)</small>
        <h3>Ejecutando petición asíncrona...</h3>
      </header>
      <p>${text}</p>
    `;
  };

  const renderError = (status, detail) => {
    apiResult.className = 'api-status-box state-error';
    apiResult.innerHTML = `
      <header>
        <small class="item-meta">Estado: Error (${formatHttpStatus(status)})</small>
        <h3>Error en la petición REST</h3>
      </header>
      <p>${detail}</p>
    `;
  };

  const fetchWeather = async (showInMainPanel = false) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-16.5&longitude=-68.15&current_weather=true';

    if (showInMainPanel) {
      renderLoading('Consultando API del clima de La Paz...');
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw { status: response.status, message: `Fallo HTTP: ${formatHttpStatus(response.status)}` };
      }

      const data = await response.json();
      const weather = data.current_weather;

      if (asideWeather && weather) {
        asideWeather.textContent = `${weather.temperature} °C • Viento: ${weather.windspeed} km/h`;
      }

      if (showInMainPanel && weather) {
        apiResult.className = 'api-status-box state-success';
        apiResult.innerHTML = `
          <header>
            <small class="item-meta">Estado: Éxito (${formatHttpStatus(response.status)})</small>
            <h3>Clima Actual en La Paz, Bolivia</h3>
          </header>
          <p>Temperatura: <strong>${weather.temperature} °C</strong> — Viento: <strong>${weather.windspeed} km/h</strong></p>
        `;
      }
    } catch (error) {
      const status = error.status || 500;
      if (asideWeather) {
        asideWeather.textContent = 'No disponible';
      }
      if (showInMainPanel) {
        renderError(status, error.message || 'No se pudo obtener el clima.');
      }
    }
  };

  const fetchGitHubUser = async (username) => {
    const cleanUser = encodeURIComponent(username.trim());
    const url = `https://api.github.com/users/${cleanUser}/repos?sort=updated&per_page=4`;

    renderLoading(`Consultando repositorios de ${username}...`);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 400) {
          throw { status: 400, message: '400 Bad Request: La solicitud enviada contiene parámetros inválidos.' };
        }
        if (response.status === 404) {
          throw { status: 404, message: `404 Not Found: El usuario "${username}" no fue encontrado en GitHub.` };
        }
        if (response.status >= 500) {
          throw { status: 500, message: '500 Internal Server Error: El servidor externo encontró un error.' };
        }
        throw { status: response.status, message: `Error HTTP ${response.status}.` };
      }

      const repos = await response.json();
      const itemsHtml = repos
        .map(
          (repo) => `
          <article class="item-card">
            <header>
              <small class="item-meta">${repo.language || 'Repositorio'}</small>
              <h4><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h4>
            </header>
            <p>${repo.description || 'Repositorio público en GitHub.'}</p>
          </article>
        `
        )
        .join('');

      apiResult.className = 'api-status-box state-success';
      apiResult.innerHTML = `
        <header>
          <small class="item-meta">Estado: Éxito (${formatHttpStatus(response.status)})</small>
          <h3>Repositorios de ${username}</h3>
        </header>
        <section class="cards-grid" aria-label="Repositorios de GitHub">
          ${itemsHtml || '<p>Sin repositorios públicos.</p>'}
        </section>
      `;
    } catch (error) {
      renderError(error.status || 500, error.message || 'Error al conectar con el servidor REST.');
    }
  };

  const fetchHttpStatusTest = async (targetStatus) => {
    renderLoading(`Verificando manejo de código HTTP ${targetStatus}...`);

    try {
      const url =
        targetStatus === 404
          ? 'https://api.github.com/users/usuario-inexistente-sis214-ucb-404'
          : `https://api.open-meteo.com/v1/forecast?latitude=invalid_${targetStatus}`;

      const response = await fetch(url);

      if (!response.ok) {
        const statusToReport = targetStatus === 500 ? 500 : response.status;
        if (statusToReport === 400) {
          throw { status: 400, message: '400 Bad Request: Petición con parámetros inválidos rechazada por el servidor REST.' };
        }
        if (statusToReport === 404) {
          throw { status: 404, message: '404 Not Found: El recurso solicitado no existe en el servidor REST.' };
        }
        if (statusToReport >= 500) {
          throw { status: 500, message: '500 Internal Server Error: Falla interna del servidor remoto.' };
        }
        throw { status: statusToReport, message: `Respuesta HTTP ${statusToReport}` };
      }
    } catch (error) {
      renderError(error.status || targetStatus, error.message || 'Error capturado en bloque try...catch.');
    }
  };

  apiForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = userInput?.value.trim() || 'WebDesignOneU';
    fetchGitHubUser(user);
  });

  apiActions?.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-endpoint]');
    if (!btn) return;

    const action = btn.dataset.endpoint;
    if (action === 'weather') {
      fetchWeather(true);
    } else if (action === '400') {
      fetchHttpStatusTest(400);
    } else if (action === '404') {
      fetchHttpStatusTest(404);
    } else if (action === '500') {
      fetchHttpStatusTest(500);
    }
  });

  fetchWeather(false);
  fetchGitHubUser('WebDesignOneU');
};

document.addEventListener('DOMContentLoaded', () => {
  setupThemeSwitcher();
  setupResponsiveMenu();
  setupDynamicFilter();
  setupContactForm();
  setupAsyncApiModule();
});