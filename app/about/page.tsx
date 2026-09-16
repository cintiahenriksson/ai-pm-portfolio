import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 font-sans space-y-16 text-zinc-200">
      {/* Navegación */}
      <Link
        href="/"
        className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
      >
        ← Volver al Portfolio
      </Link>

      {/* Header & Bio Principal */}
      <section className="flex flex-col sm:flex-row items-start gap-8 border-b border-zinc-800 pb-12">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Cintia Henriksson"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
            Senior Product Manager • 8+ Años de Experiencia en Producto
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            Cintia Henriksson
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Product Manager afincada en Estocolmo con más de una década de experiencia construyendo y escalando productos digitales {/**[cite: 3] */}. Mi trayectoria profesional comenzó en soporte técnico resolviendo más de 100 incidencias diarias y consultando directamente bases de datos con SQL {/**[cite: 3] */}, una experiencia fundacional que moldeó mi enfoque: entender cómo se rompe el software en la realidad y priorizar siempre la confianza del usuario final {/**[cite: 3] */}.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/cv.pdf"
              download
              className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors flex items-center gap-2"
            >
              <span>Descargar CV (PDF)</span>
              <span>↓</span>
            </a>
            <a
              href="https://linkedin.com/in/cintiamars/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:cintia.henriksson@gmail.com"
              className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
            >
              Email ✉
            </a>
          </div>
        </div>
      </section>

      {/* Visión Estratégica & Proyecto Destacado */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Visión Holística & Ejecución Rápida
        </h2>
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
          <p>
            Tras 12 años en Rebtel {/**[cite: 3] */}, he tenido la oportunidad de construir y reconstruir múltiples veces la infraestructura de telecomunicaciones que representa la principal fuente de ingresos de la compañía {/**[cite: 3] */}. Creo en los proyectos a largo plazo que transforman de forma integral la web, la aplicación y la marca, apoyados en una estrategia sólida y no en parches superficiales sin rumbo {/**[cite: 3] */}.
          </p>

          {/* Destacado: MVP US Global Operator */}
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Caso de Éxito • De 0 a Producción en &lt; 3 Meses
              </span>
              <span className="text-[11px] font-mono text-zinc-500">Miami → Estocolmo</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100">
              MVP de Operador Global basado en EE. UU.
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ideé y ejecuté el producto arrancando con investigación de usuarios presencial en Miami, realizando entrevistas en profundidad tanto en inglés como en español para capturar la fricción real de comunicación y pagos. Posteriormente, lideré el desarrollo en Estocolmo para lanzar en menos de tres meses un MVP completamente integrado en producción dentro de la app y el ecosistema operativo de Rebtel.
            </p>
          </div>
        </div>
      </section>

      {/* Trayectoria Completa de Producto */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          Historial Profesional Completo
        </h2>
        
        <div className="space-y-6">
          {/* Senior PM - Core & Brand */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">Senior Product Manager — Core & Brand</span>
              <span className="text-zinc-500">Rebtel • Oct 2024 – Mar 2026 {/**[cite: 3] */}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Dirección de la estrategia de producto multiplataforma (iOS, Android, Web) garantizando coherencia global de marca {/**[cite: 3] */}. Lideré la modernización del frontend y el rediseño del embudo de compra de Mobile Top-Ups mediante Design Thinking, alcanzando un incremento del 21% en New Paying Users (NPUs) {/**[cite: 3] */}. Mentoría de Product Owners y diseño de marcos de priorización para ProductOps, herramientas internas y riesgo {/**[cite: 3] */}.
            </p>
          </div>

          {/* PM - Core */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">Product Manager — Core & Pagos</span>
              <span className="text-zinc-500">Rebtel • Mar 2023 – Oct 2024 {/**[cite: 3] */}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Diseño de la infraestructura de pagos multi-PSP independiente, permitiendo a los usuarios tokenizar y reutilizar tarjetas entre diferentes proveedores {/**[cite: 3] */}. Integración técnica de Apple Pay y Google Pay {/**[cite: 3] */}. Definición de la hoja de ruta de mitigación de fraude y riesgo, configurando reglas automatizadas para salvaguardar las transacciones sin penalizar la conversión {/**[cite: 3] */}.
            </p>
          </div>

          {/* Lead PM */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">Lead Product Manager</span>
              <span className="text-zinc-500">Rebtel • Ene 2021 – Mar 2023 {/**[cite: 3] */}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Definición y ejecución de la visión y roadmaps estratégicos junto al equipo ejecutivo {/**[cite: 3] */}. Escalado del producto de recargas móviles internacionales a usuarios de más de 50 países receptores {/**[cite: 3] */}. Lanzamiento de transferencias internacionales de dinero entre EE. UU. e India gestionando compliance, tipo de cambio (FX) y proveedores bancarios {/**[cite: 3] */}. PO de frontend web (5 idiomas) y apps móviles (11+ idiomas) {/**[cite: 3] */}, actuando como administradora de Jira y líder ágil {/**[cite: 3] */}.
            </p>
          </div>

          {/* PM Website & CX - MAJORITY */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">Product Manager — Website & Customer Experience</span>
              <span className="text-zinc-500">MAJORITY • Sep 2019 – Dic 2020 {/**[cite: 3] */}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Relaunch móvil de la web institucional con micro-animaciones, arquitectura CMS multi-idioma y herramientas de contratación integradas {/**[cite: 3] */}. Diseño y despliegue desde cero del portal web interno para unificar los flujos de trabajo de Soporte, Operaciones y Prevención de Fraude {/**[cite: 3] */}. Implementación de una suite omnicanal integrando soporte telefónico, live chat y correo {/**[cite: 3] */}.
            </p>
          </div>

          {/* Junior PM / Calling Independence */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">Junior Product Manager — Calling Independence Lead</span>
              <span className="text-zinc-500">Rebtel • Ene 2019 – Dic 2019 {/**[cite: 3] */}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Liderazgo del despliegue del motor de enrutamiento SIP en la nube {/**[cite: 3] */}, coordinando desarrolladores y especialistas de voz para migrar más de 105 millones de minutos de llamadas mensuales a la red interna {/**[cite: 3] */}, generando aproximadamente 85.000 USD mensuales en ahorros de costes recurrentes {/**[cite: 3] */}.
            </p>
          </div>

          {/* Experiencia Operativa Previa */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-3">
            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
              Fundamentos Operativos & Gestión de Soporte (Rebtel, 2014 – 2018) {/**[cite: 3] */}
            </span>
            <ul className="space-y-3 text-xs text-zinc-400 font-sans">
              <li>
                <strong className="text-zinc-200 font-mono">Customer Support Manager (2017 – 2018):</strong> Lideré un equipo local de 4 personas y un hub offshore de más de 25 agentes en Filipinas {/**[cite: 3] */}. Implementé modelos de reporting analítico mediante consultas directas en T-SQL y MAQL sobre Zendesk {/**[cite: 3] */}, <strong>elevando la Customer Satisfaction (CSAT) del 70% al 80%</strong>.
              </li>
              <li>
                <strong className="text-zinc-200 font-mono">Operations Technical Agent (2016 – 2017):</strong> Monitorización técnica de sistemas, resolución de escalados de nivel 2 y 3, configuración de bases de datos e investigación de patrones de fraude {/**[cite: 3] */}.
              </li>
              <li>
                <strong className="text-zinc-200 font-mono">Support Trainer & Agent (2014 – 2017):</strong> Formación presencial de centros de soporte distribuidos en Bolivia y Filipinas {/**[cite: 3] */}, gestionando más de 100 casos técnicos complejos diarios en primera línea {/**[cite: 3] */}.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Punto de Inflexión Personal & Filosofía */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          Punto de Inflexión, Bienestar y Propósito
        </h2>
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
          <p>
            Los últimos dos años plantearon un desafío profesional y vital significativo. Llegué a un punto de bloqueo que me obligó a detenerme y evaluar prioridades con honestidad. Decidí invertir conscientemente en mí misma y completé un programa de seis meses de formación como profesora de meditación en el <em>Buddhist Studies Institute</em>.
          </p>
          <p>
            Ese proceso me enseñó a pausar, a encontrar mi lugar sin prisas y a entender que el bienestar no es un accesorio, sino una necesidad fundamental para liderar con claridad. Hoy soy profesora de meditación certificada por uno de los linajes más respetados del budismo tibetano. Tras pasar el verano en España junto a mi hija reconectando con lo esencial, estoy de vuelta con energía renovada para aportar mis más de 8 años como Product Manager a proyectos con visión de largo plazo e impacto humano tangible.
          </p>
        </div>
      </section>

      {/* Enfoque Pragmático de Inteligencia Artificial */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          Cómo Abordo los Productos de IA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">Gobernanza & Spec</span>
            <p className="text-zinc-400 font-sans">
              Los hechos regulatorios y las políticas no se confían a la memoria estocástica del LLM; se inyectan como datos estructurados deterministas {/**[cite: 2] */}.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">Release Gates Duros</span>
            <p className="text-zinc-400 font-sans">
              Tolerancia cero con promesas de entrega alucinadas y fugas de privacidad {/**[cite: 2] */}. Un modelo con 95% de precisión pero una sola promesa falsa está bloqueado {/**[cite: 2] */}.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">Finanzas Reales</span>
            <p className="text-zinc-400 font-sans">
              Modelos de contención y sizing con matemática abierta y descuento de realismo {/**[cite: 1, 2] */}, descartando métricas infladas de proveedores {/**[cite: 2] */}.
            </p>
          </div>
        </div>
      </section>

      {/* Educación & Idiomas */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          Criterio Visual, Educación & Idiomas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
            <span className="font-mono text-emerald-400 font-bold block">
              Formación Visual & Fotografía
            </span>
            <p className="text-zinc-400 leading-relaxed">
              Técnico Superior en Iluminación, Captura y Tratamiento de Imagen (IES Imaxe e Son) y Técnico Superior en Artes Plásticas y Diseño en Fotografía (EASD Pablo Picasso, graduada con Distinción, calificación final 9,25/10) {/**[cite: 3] */}. Esta formación aporta un criterio riguroso en dirección creativa y estética de interfaz {/**[cite: 3] */}.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
            <span className="font-mono text-emerald-400 font-bold block">
              Idiomas
            </span>
            <ul className="text-zinc-400 space-y-1 font-mono text-[11px]">
              <li>• Español y Gallego: Nativos {/**[cite: 3] */}</li>
              <li>• Inglés: Fluido profesional {/**[cite: 3] */}</li>
              <li>• Portugués: Fluido profesional {/**[cite: 3] */}</li>
              <li>• Sueco: Conversacional {/**[cite: 3] */}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}