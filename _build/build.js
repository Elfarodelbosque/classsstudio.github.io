/* =========================================================
   Generador de páginas — Classs®
   Uso:  node _build/build.js
   Reescribe index.html, work/, contact/, labbb/ y article/*.
   Edita los DATOS de abajo (textos, imágenes, orden) y vuelve a ejecutarlo.
   ⚠ Si editas el HTML generado a mano, esos cambios se pierden al regenerar.
   ========================================================= */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------------------------------------------------------
   DATOS GENERALES
   --------------------------------------------------------- */
const SITE = {
  title: 'Classs® - Portafolio Creativo',
  description: 'Claudia López-Asiaín, Art Director en Madrid. Prefiero el ruido que rompe el molde a la perfección que nadie recuerda.',
  ogImage: 'assets/img/4qWC4fIKUA6T33nmytAD3ECmTJA.jpg',
  email: 'claudialopezasiain@gmail.com',
  linkedin: 'https://www.linkedin.com/in/claudial%C3%B3pezasia%C3%ADnseco/',
  cv: 'cv/claudia-lopez-asiain-cv-2026.pdf',
  cvAts: 'cv/claudia-lopez-asiain-cv-ats-2026.pdf',
  instagram: 'https://www.instagram.com/classs.studio',
  behance: 'https://www.behance.net/claudialopezasiain',
  bio: 'Desarrollo conceptos visuales que se traducen en imágenes claras, inesperadas y con personalidad. Me interesa explorar la metáfora visual, el humor y la construcción de pequeños universos narrativos dentro de cada proyecto.',
  /* Una sola lista de skills para toda la web (cinta del hero, barra blanca y sección Skills) */
  skills: [
    ['Art Direction', 'Desarrollo conceptos que se convierten en imágenes claras y memorables, capaces de sostener campañas con identidad propia.', 'UclO2g8HzMRZ5To6PyLtKb5mW08.jpg'],
    ['Brand Identity', 'Construyo universos visuales coherentes que permiten a las marcas expresarse con carácter y una personalidad reconocible.', 'upxEAQRVGPb97tPwPkPW6WWrOY.jpg'],
    ['3D & Visual Experimentation', 'Exploro el potencial del 3D para ampliar el lenguaje visual y generar imágenes inesperadas con un enfoque experimental.', '0rygrdzoEgWVM0tmsbT09wmc5E.gif'],
    ['Editorial Design', 'Diseño narrativas visuales donde imagen, tipografía y ritmo editorial trabajan juntos para construir significado.', 'B0XjSEzlwpcsuNHPs3fk1LFlxZg.jpeg'],
  ],
};
const SKILL_NAMES = SITE.skills.map(([n]) => n);

/* ---------------------------------------------------------
   PROYECTOS
   home:  imagen grande + miniatura en la Home
   work:  imagen grande + miniatura en Work / More Projects
   gallery: medidas de Framer [archivo, x, y, ancho, alto]  (se agrupan solas en filas/columnas)
   blocks:  alternativa manual: lista de filas, cada fila = columnas, cada columna = imágenes
   texts:   [título, texto, y]  — "y" coloca el texto entre las imágenes
   --------------------------------------------------------- */
const PROJECTS = {
  alhaja: {
    name: 'Alhaja', category: 'Branding',
    homeSub: 'Como diría mi abuela...', sub: 'Como diría mi abuela',
    desc: 'Creamos joyas artesanales que no solo se llevan, se sienten. Objetos que se convierten en símbolos de lo que somos y sentimos. Cada pieza es un recuerdo heredado y reinventado.',
    home: ['kdCMZQWbeNchLGPlptGq21xY8.jpg', 'b5AADyThNWDvsTY9JeAAcOJE18.jpg'],
    work: ['kdCMZQWbeNchLGPlptGq21xY8.jpg', 'b5AADyThNWDvsTY9JeAAcOJE18.jpg'],
    meta: {
      Category: 'Branding', Role: 'Art Direction, Copywriting, Visual Design',
      Deliverables: 'Brand manifesto, Photography direction, Street application',
      Tools: 'Photoshop, Illustrator', Date: '7 sept 2026', Type: 'Personal/Conceptual project',
    },
    gallery: [
      ['kdCMZQWbeNchLGPlptGq21xY8.jpg', 24, 494, 684, 1052], ['b5AADyThNWDvsTY9JeAAcOJE18.jpg', 718, 494, 684, 515],
      ['HJxFgTRDc07nFdMiv3UFrZoMo.jpg', 718, 1019, 684, 435], ['GHMA6votMFNFMxtMyScQo6lzdXw.jpg', 718, 1464, 684, 545],
      ['kukFRVA00MmqgP5zQCdZRJD4lM.jpg', 24, 2954, 1377, 1100], ['g7pkNEYgIGxJ591rek5mN0n0M.jpg', 24, 4386, 1377, 1036],
      ['jzeThWfBLXsvPRIfLGmWGfPG1FQ.jpg', 24, 5431, 1377, 734], ['VO9pfNiTbRjERBTK2UvG3Z1hoig.jpg', 24, 6175, 1377, 859],
    ],
    texts: [
      ['Concepto', `Como diría mi abuela:

"Tú brilla. Y si molesta, que miren para otro lado."
La flor, la sardina, el corazón, la lágrima.
Que te miren. Que pregunten. Que no entiendan.
Nosotras no vinimos a pasar desapercibidas.

Como diría mi abuela:
"Si te hace sentir, ya vale."
Aquí no hay género, ni reglas, ni formas correctas de vivir.
Solo símbolos con alma.
Solo historias con cuerpo.

Como diría mi abuela:
"Lo frágil también muerde."
Y lo llevamos como una declaración:
joyas que no adornan, sino que gritan.
Corazones que laten fuera del pecho.
No hacemos moda. Hacemos memoria.

Somos Alhaja.
Una marca que fabrica amuletos con acento.
Devociones pequeñas para mentes salvajes.
Somos las nietas que heredaron los anillos
para cambiar las reglas.

Como diría mi abuela:
"Hazlo bonito. Hazlo tuyo. Hazlo ahora."
Y aquí estamos.

Llevando lo nuestro encima.
Y lo de todas las que vinieron antes también.`, 2123],
      ['Dirección visual', `Cada fotografía retrata una pieza sobre el cuerpo, como una segunda piel.
La espalda, el brazo, el pecho, la mano y el cuello: cinco puntos donde la joya se convierte en símbolo.
Una dirección de foto íntima y cercana, que traduce el manifiesto en imagen.`, 4159],
      ['Sistema de campaña', `El sistema reúne las cinco piezas junto al logotipo en una retícula que funciona como catálogo visual de la colección.
La campaña se cierra en la calle, llevando el manifiesto de Alhaja al espacio público.`, 7139],
    ],
  },

  comodecorarunacrisis: {
    name: 'Cómo decorar una crisis', category: 'Exhibition',
    homeSub: 'Cómo decorar una crisis', sub: 'Exponer el malestar. Habitar el conflicto.',
    desc: 'Exposición colectiva sobre el derrumbe contemporáneo. Un proyecto que traduce estados emocionales inestables en habitaciones generadas en 3D, catalogadas como si fueran piezas de decoración.',
    home: ['zZUgTRwbGuGeTw0C7qM1aoowbq0.jpg', '2PpB5TS3B4OaDHBeRzSRdzytqnk.jpg'],
    work: ['A8kN51gGymfF7oNsYxC66jZ9M.jpg', 'agIhD9pgp9xmyFUML6WvOASmd4.jpg'],
    meta: {
      Category: 'Exhibition', Role: 'Art Direction, Concept Development, 3D Visualization',
      Deliverables: 'Exhibition posters, Campaign visuals, 3D room renders, Editorial book, Event signage',
      Tools: 'Photoshop, Illustrator, Nano Banana, Midjourney', Date: '12 jun 2026', Type: 'Personal/Conceptual project',
    },
    gallery: [
      ['A8kN51gGymfF7oNsYxC66jZ9M.jpg', 24, 494, 684, 911], ['agIhD9pgp9xmyFUML6WvOASmd4.jpg', 718, 494, 684, 957],
      ['zZUgTRwbGuGeTw0C7qM1aoowbq0.jpg', 24, 1824, 1377, 1721],
      ['zQ1E8dMIAa8u1CI0Mgeo2xM0.jpg', 24, 3898, 684, 957], ['QwN6s5sWxdkmXYYzgv9pZMDR9E.jpg', 24, 4865, 684, 300],
      ['uLjdHgbupfG1bzzKvNAdaONZdc.jpg', 24, 5175, 684, 387], ['FDSo0FE03cgiyXmUvLzJItxYCc.jpg', 718, 3898, 684, 779],
    ],
    texts: [
      ['Concepto', `"Cómo decorar una crisis" plantea el derrumbe emocional como un espacio doméstico que se puede diseccionar, catalogar y visitar.
La muestra reúne tres habitaciones generadas en 3D —una disección de un derrumbe emocional, un catálogo de estados inestables y un mapa de calor de una crisis sentimental— que traducen el malestar al lenguaje de la decoración de interiores.

Exponer el malestar. Habitar el conflicto.`, 1565],
      ['Dirección visual', `Cada habitación funciona como una ficha de producto: título, especificaciones y una escena en 3D que ilustra el estado emocional al que responde.
La serie de comunicación despliega ese mismo lenguaje —tipografía corporativa, fondos de color plano y el sello "Cómo decorar una crisis"— en distintos formatos de anuncio.`, 3650],
      ['Sistema de campaña', `El sistema se despliega en distintos soportes: un libro editorial, una web de entradas, contenido para redes y la señalética del evento, manteniendo la misma paleta e iconografía en todos los formatos.

La campaña se cierra en la calle, con banderolas de farola y carteles en valla que devuelven la crisis decorada al espacio público.`, 5666],
    ],
  },

  etniabarcelona: {
    name: 'Etnia Barcelona', category: 'Campaign',
    homeSub: 'Y tú, ¿qué sabor eres?', sub: 'WHAT FLAVOR ARE YOU TODAY? Eat your summer.',
    desc: 'Una campaña para Etnia Barcelona que transforma la personalidad en sabor, utilizando color, humor y metáforas visuales para representar distintos moods del verano.',
    home: ['rdzhkpFiV4CJ8BFuG32XnRnbj0.gif', '5AzHMcqkLABcEIGRd8CJTYsMKYU.jpg'],
    work: ['Dy28K1xZxWrGWKrARJvVwL4AZRw.gif', 'X7btTx17hMtNzUgG81xbNorc0OI.jpg'],
    meta: {
      Category: 'Campaign', Role: 'Art Direction, Concept Development, Visual Design',
      Deliverables: 'Campaign visuals, Social media content, Digital posters',
      Tools: 'Photoshop, Illustrator, Blender', Date: '10 sept 2025', Type: 'Conceptual project',
    },
    gallery: [
      ['Dy28K1xZxWrGWKrARJvVwL4AZRw.gif', 24, 470, 684, 1215], ['X7btTx17hMtNzUgG81xbNorc0OI.jpg', 718, 470, 684, 1217],
      ['dU5JoomG66SFs15298cwILi9YE.jpg', 718, 1697, 684, 1217], ['seyMbA0PHFAPcgMOGdF4OLI8hRg.jpg', 718, 2925, 684, 1217],
      ['vAX7kQ2dmrYUjZRSKVfJIAmhRM.jpg', 24, 4494, 1377, 817],
    ],
    texts: [
      ['Concepto', `What flavor are you today? parte de una idea simple: cada persona tiene un mood distinto en verano.
La campaña convierte esa idea en metáfora visual, asociando cada personalidad a un sabor y a un entorno diferente.

El verano se entiende como un estado de ánimo cambiante, donde cada día puede tener un sabor distinto.`, 4256],
      ['Dirección visual', `La paleta visual se apoya en color saturado, composiciones limpias y un punto de humor que evita que la campaña se sienta solemne.

Cada imagen cruza tres elementos: persona, sabor y entorno, para construir una escena reconocible al instante, casi como un fotograma de anuncio de helado de los 90 pasado por un filtro contemporáneo.

El resultado es una estética fresca, desenfadada y con un punto naíf deliberado.`, 5415],
      ['Sistema de campaña', `La campaña se construye a partir de un sistema modular donde cada sabor representa un mood distinto.

Ciudad, playa y montaña funcionan como escenarios que refuerzan la personalidad de cada sabor, permitiendo desarrollar múltiples piezas dentro de una misma lógica visual.

Este sistema permite extender la campaña a diferentes formatos digitales y gráficos manteniendo coherencia y reconocimiento.`, 5831],
    ],
  },

  sientatanbien: {
    name: 'Cuidar Madrid', category: 'Public Campaign',
    homeSub: 'Cuidar Madrid Sienta Tan Bien', sub: 'Cuidar Madrid sienta tan bien',
    desc: 'Una campaña que propone una mirada positiva sobre el civismo urbano, entendiendo el cuidado de la ciudad como bienestar colectivo.',
    home: ['Rmxcf4kJon0sYxEidLAYdkYM0.jpg', 'tej7HehySELkNlRVdTa4UQFtZw.jpg'],
    work: ['Rmxcf4kJon0sYxEidLAYdkYM0.jpg', 'tej7HehySELkNlRVdTa4UQFtZw.jpg'],
    alt: 'Banderolas urbanas con el mensaje «Las terrazas llenas, las papeleras también».',
    meta: {
      Category: 'Public Campaign', Role: 'Art Direction, Concept Development, Visual Design',
      Deliverables: 'Outdoor posters, Social media visuals, Digital assets',
      Tools: 'Photoshop, Illustrator', Date: '28 oct 2025', Type: 'Student project',
    },
    gallery: [
      ['Rmxcf4kJon0sYxEidLAYdkYM0.jpg', 24, 470, 684, 456], ['tej7HehySELkNlRVdTa4UQFtZw.jpg', 718, 470, 684, 456],
      ['HCrgEMRMm3qAziwY3F44d1V8.jpg', 718, 936, 684, 456], ['VCs9JO08XPDPqMAp2XOfuuTHgA.jpg', 718, 1401, 684, 456],
      ['Ubt6OJEMzlSQ22nTRPxkRqcJ5M.jpg', 24, 2251, 1377, 1033],
      ['AEJGxUlCS6dK76uWVSYOpdGJDhU.png', 24, 3679, 684, 911], ['Zpp7pHa8khjAd97Q8CX9uDGjI.png', 24, 4600, 684, 911],
      ['OO7Qa3B7A147rB4jomnILOttA.png', 24, 5521, 684, 911], ['k4kwvZeEBVQHh7HbOn5br8E1I.gif', 718, 3679, 684, 620],
    ],
    texts: [
      ['Concepto', `Cuidar Madrid sienta tan bien propone una campaña de civismo que cambia el tono habitual de las campañas institucionales.

En lugar de centrarse en la prohibición o el castigo, la campaña plantea el cuidado de la ciudad como una experiencia positiva y compartida.

El mensaje parte de una idea simple: cuando cuidamos el espacio público, también nos cuidamos a nosotros mismos.`, 1971],
      ['Dirección visual', `La dirección de arte utiliza un lenguaje visual cercano y optimista para conectar con la vida cotidiana de la ciudad.

Colores luminosos, composiciones claras y escenas reconocibles transforman gestos cotidianos en momentos positivos asociados al cuidado del entorno.

El objetivo es generar una imagen amable y contemporánea que invite a participar en lugar de imponer normas.`, 3388],
      ['Sistema de campaña', `La campaña se construye como un sistema adaptable a diferentes situaciones de civismo urbano.

Cada pieza presenta una acción concreta —cuidar el espacio público, respetar el entorno o convivir en la ciudad— manteniendo siempre el mismo tono visual y el mismo mensaje central.

Este sistema permite extender la campaña a distintos soportes urbanos y digitales manteniendo coherencia y reconocimiento.`, 6536],
    ],
  },

  ecoalf: {
    name: 'ecoalf', category: 'Sustainability Campaign',
    homeSub: 'INSEPARABLES', sub: 'INSEPARABLES',
    desc: 'Una campaña conceptual para Ecoalf que plantea una reflexión simple: el destino del ser humano y el de la naturaleza están inevitablemente conectados.',
    home: ['zdHcQZOhww0QHBRIMkYgobSw.jpg', '843MHecNllZucxwT7ip5nKsJKTs.jpg'],
    work: ['HxFBcOAnZw9Tplyvogj4fpr45iI.jpg', '843MHecNllZucxwT7ip5nKsJKTs.jpg'],
    alt: 'Serie de campaña ECOALF con modelos fusionados con un bosque y el mensaje «We are inseparable».',
    meta: {
      Category: 'Sustainability Campaign', Role: 'Art Direction, Concept Development, Visual Design',
      Deliverables: 'Campaign visuals, Video concept, Social media content',
      Tools: 'Photoshop, Illustrator, Midjourney', Date: '10 feb 2026', Type: 'Student project',
    },
    gallery: [
      ['HxFBcOAnZw9Tplyvogj4fpr45iI.jpg', 24, 470, 684, 257], ['843MHecNllZucxwT7ip5nKsJKTs.jpg', 718, 470, 684, 257],
      ['KY8A63BTOVJG1U0UBMkuEe6lG8.jpg', 718, 737, 684, 257], ['QKb5IGEGjsJres3DpPCFiYhSZn4.jpg', 718, 1003, 684, 257],
      ['3P9Tvls7DQFL14gfJ4ZzZ1Efn80.jpg', 24, 1718, 1377, 2066],
      ['V6SdVC4uxjdckIByWymUReVT1XY.jpg', 24, 4220, 684, 1025], ['L7qGTFLjk2RYRuL5pChhyZkpu5I.jpg', 24, 5254, 684, 1025],
      ['tVasAwdnjU17E6WEH6tAFPnHMJQ.jpg', 24, 6289, 684, 1027], ['KxHdE8dYTvYG4f0urKaj2SWYMZE.jpg', 718, 4220, 684, 1025],
    ],
    texts: [
      ['Concepto', `Inseparables parte de una premisa incómoda y a la vez evidente: no existe una frontera real entre el cuerpo humano y el entorno que lo rodea.

El aire que respiramos ha pasado por los mismos bosques que desaparecen. El agua que bebemos es la misma que llega cargada de plástico a los océanos. La campaña convierte esa continuidad invisible en imagen: piel, agua, aire y materia natural se funden en una misma superficie visual, como si el cuerpo fuera, literalmente, paisaje.

La sostenibilidad deja de plantearse como una elección de consumo y se presenta como lo que es: una cuestión de continuidad entre nosotros y lo que nos rodea.`, 1374],
      ['Dirección visual', `Las imágenes trabajan con primeros planos de piel, agua y materia orgánica tratados con la misma luz y textura, de modo que resulta difícil distinguir dónde termina el cuerpo y dónde empieza el entorno.

La paleta se mantiene reducida, tonos de piel, azules de agua, verdes apagados, para reforzar la sensación de un único sistema visual, más que de varias escenas independientes.

Como parte del proceso de exploración visual, se utilizó Midjourney para generar referencias iniciales de texturas y composiciones híbridas piel-naturaleza, que después guiaron la dirección de arte y la selección final de imágenes.`, 3887],
      ['Sistema de campaña', `El proyecto se plantea como un manifiesto modular: cada pieza puede leerse de forma independiente, pero todas comparten la misma gramática visual (cuerpo + elemento natural + misma paleta + mismo tratamiento de luz).

Esta estructura permite extender la campaña a distintos formatos, desde estática para redes hasta una pieza audiovisual más larga, sin perder la identidad central del proyecto.`, 7420],
    ],
  },

  harste: {
    name: 'harste', category: 'Web Design',
    homeSub: 'The New Care of Nature', sub: 'The New Care of Nature',
    desc: 'Una marca que explora una nueva relación entre naturaleza y tecnología a través de un universo visual digital.',
    home: ['9gpLwdabreq5UQF0XGXlJ5E5MIE.gif', '2ENSK9Y9zIRejhitPfO9FKrwEQ.gif'],
    work: ['pL4UU5K0Y77a427w6DOrTAJjc.gif', '2ENSK9Y9zIRejhitPfO9FKrwEQ.gif'],
    alt: 'Animación de una pieza de Harste flotando entre formas orgánicas y texturas translúcidas.',
    meta: {
      Category: 'Web Design', Role: 'Brand Concept, Web Design, 3D Visual Direction',
      Deliverables: 'Digital campaign, Website design, 3D visuals',
      Tools: 'Blender, Photoshop, Illustrator, Figma', Date: '19 sept 2024', Type: 'Personal project',
    },
    gallery: [
      ['pL4UU5K0Y77a427w6DOrTAJjc.gif', 24, 470, 684, 1069], ['2ENSK9Y9zIRejhitPfO9FKrwEQ.gif', 718, 470, 684, 1069],
      ['oD5DNG3T10i4porEgYxoaexQek.gif', 718, 1549, 684, 1069],
      ['g0GUSMZkjojbPCoeJxyD4WuMTxg.mp4', 137, 3012, 1152, 700],
      ['bK2hCqMJAFNdd9ZINczReN6i0.gif', 24, 4085, 684, 1068], ['JywkOF5ViD462bSv6Is4iSivuo.gif', 24, 5163, 684, 1065],
      ['13JQx4llC8wltB3fuBlcZtHWWH8.webp', 24, 6239, 684, 1065], ['IzQUzsDxuQMlOVLlLRhXddsQ.webp', 718, 4085, 684, 1065],
    ],
    texts: [
      ['Concepto', `HARSTE imagina un futuro donde la naturaleza y la tecnología ya no son opuestas, sino sistemas híbridos.

El proyecto propone una estética donde elementos orgánicos, texturas sintéticas y formas digitales conviven para construir un nuevo paisaje visual.

La colección The New Care of Nature plantea una reflexión sobre cómo cuidaremos el entorno en un futuro dominado por lo artificial.`, 2732],
      ['Dirección visual', `El universo visual combina texturas plásticas, materiales translúcidos y formas florales reinterpretadas desde una estética digital.

Las flores dejan de ser únicamente naturales para transformarse en estructuras híbridas entre organismo y objeto artificial.

Este contraste entre lo orgánico y lo sintético define la identidad visual de la marca.`, 3816],
      ['Experiencia digital', `El proyecto se desarrolla también como una experiencia web, donde el usuario navega a través de paisajes digitales construidos en 3D.

Las piezas flotan en entornos naturales reinterpretados, generando una sensación de ecosistema artificial.

La web funciona como una extensión del universo de la marca, mezclando editorial, lookbook y tienda dentro de un mismo espacio visual.`, 7408],
    ],
  },

  dieselxklein: {
    name: 'DieselxKlein', category: 'Campaign',
    homeSub: 'FULL TANK', sub: 'FULL TANK. Fueled by bad decisions.',
    desc: 'Una reinterpretación del lenguaje visual provocador de Diesel que explora el impulso, la actitud y la estética de las malas decisiones.',
    home: ['SAlpxG7ybPzf7l3V2aYHeGgfSs.jpg', 'dxFjXKSauux0rjWCKCqaGB3o.jpg'],
    work: ['LYKphccRYRNEZkTS09TrzSjU8yk.jpg', '3tcWvYw1ftN162N5wiyQtEESY8.jpg'],
    meta: {
      Category: 'Campaign', Role: 'Art Direction, Concept Development',
      Deliverables: 'Campaign visuals, Digital content',
      Tools: 'Photoshop, Illustrator, Lightroom', Date: '21 nov 2025', Type: 'Personal project',
    },
    gallery: [
      ['LYKphccRYRNEZkTS09TrzSjU8yk.jpg', 24, 470, 684, 713], ['3tcWvYw1ftN162N5wiyQtEESY8.jpg', 718, 470, 684, 1026],
      ['oKskLWn7ghL1820lD6JQzSh2DY.jpg', 718, 1506, 684, 854], ['5ZPeD7mA3IKPr6xeqbSJgAp0ebU.jpg', 718, 2370, 684, 1026],
      ['e2xIk1hBSr2U0NqTeNPNkcHpY4.jpg', 24, 3811, 1377, 721],
      ['QyJsUIzDQdIrRy5ONASGyrmOugs.jpg', 24, 4926, 684, 796], ['Km3pjmQLFpmvuFdfjHjFnMAg4s.jpg', 24, 5733, 684, 854],
      ['f2ncV3ySNXMMuaerKoFVRDrVyBA.jpg', 24, 6597, 684, 1026], ['sDQ1jaepXNY6JxUdDBhSpqL2A.jpg', 718, 4926, 684, 1026],
    ],
    texts: [
      ['Concepto', `Full Tank explora la estética provocadora asociada históricamente a Diesel, donde el impulso y la actitud tienen más peso que la corrección.

La campaña gira en torno a la idea de las bad decisions: acciones impulsivas, noches largas y comportamientos que ignoran cualquier señal de advertencia.

La gasolina funciona como metáfora visual de esa energía desbordada que impulsa a actuar sin pensar demasiado.`, 3509],
      ['Dirección visual', `La referencia es el lenguaje fotográfico asociado a William Klein: blanco y negro, flash directo, encuadres que incomodan a propósito.

El cuerpo se trata como un elemento performativo más que como un sujeto posado, hay tensión, hay gesto, hay algo que está a punto de pasar.

Es una dirección de arte deliberadamente cruda, pensada para destacar en un feed sin pedir permiso.`, 4636],
      ['Sistema de campaña', `La secuencia de imágenes alterna escalas: un plano general que sitúa la escena, seguido de primeros planos sobre cuerpo, gesto y detalle, como si la cámara persiguiera la acción en tiempo real.

Los copys actúan como comentarios irónicos en segunda persona, manteniendo el tono provocador sin caer en el insulto gratuito. Esta estructura (plano general → detalle → copy) es replicable para nuevas piezas sin perder la lógica de la campaña.`, 7726],
    ],
  },

  /* Proyecto añadido (no estaba en Framer) — imágenes en assets/img/aquiestamos/ */
  aquiestamos: {
    name: 'Aquí Estamos', category: 'Fashion Campaign',
    homeSub: 'El Faro del Bosque — OI26', sub: 'El Faro del Bosque — Otoño/Invierno 26',
    desc: 'Campaña OI26 para El Faro del Bosque. Las fareras —las que cuidan la luz, las que vuelven cada temporada— vistiendo la colección en los interiores cálidos y las alfombras de color que definen la marca.',
    home: ['aquiestamos/portada.jpg', 'aquiestamos/lb15.jpg'],
    work: ['aquiestamos/portada.jpg', 'aquiestamos/lb01.jpg'],
    alt: 'Aquí Estamos — El Faro del Bosque presenta OT/IN, cartel de campaña',
    meta: {
      Category: 'Fashion Campaign', Role: 'Art Direction, Campaign Concept, Visual Direction',
      Deliverables: 'Hero video, Lookbook, Catalog video, Social & WhatsApp content',
      Tools: 'Photoshop, Premiere', Date: 'Octubre 2026', Type: 'Client project',
    },
    // filas manuales: [ [columna1], [columna2], ... ]  con [archivo, ancho, alto]
    blocks: [
      [[['aquiestamos/portada.jpg', 918, 634]]],
      'Concepto',
      [[['aquiestamos/lb01.jpg', 770, 958]], [['aquiestamos/lb15.jpg', 762, 950]]],
      'Dirección visual',
      [[['aquiestamos/lb08.jpg', 770, 806]], [['aquiestamos/lb22.jpg', 766, 642]], [['aquiestamos/lb30.jpg', 782, 806]]],
      'Sistema de campaña',
      [[['aquiestamos/hero-poster.jpg', 1280, 720]], [['aquiestamos/catalogo-poster.jpg', 1280, 720]]],
    ],
    texts: [
      ['Concepto', `Aquí Estamos habla de volver. De las fareras que cada temporada regresan a encender la luz y, este año, la traen puesta.
La colección OI26 se despliega como un reencuentro: maderas nobles, alfombras de color y las prendas de siempre contadas de otra manera.

No es una campaña sobre ropa nueva. Es una campaña sobre lo que permanece.`],
      ['Dirección visual', `Cada escena ocurre dentro del faro: maderas cálidas, alfombras saturadas —azul, verde, burdeos— y una luz que entra siempre de lado, como de atardecer.
Sobre ese fondo, la campaña se detiene en el detalle: un puño, un zapato, una textura. La prenda se lee de cerca antes que de cuerpo entero.

La tipografía de campaña —"El Faro del Bosque presenta OT/IN"— se superpone a la escena como un cartel de cine, firmando cada pieza.`],
      ['Sistema de campaña', `El lanzamiento se despliega en vídeo hero para la home, un lookbook fotográfico con las fichas de producto, un vídeo de catálogo para la tienda y contenido recortado para redes sociales y WhatsApp.
Todo comparte la misma gramática visual: madera, alfombra de color y el sello tipográfico de "El Faro del Bosque presenta".`],
    ],
  },
};

/* Orden de aparición (el mismo en Home y Work) */
const HOME_ORDER = ['alhaja', 'comodecorarunacrisis', 'etniabarcelona', 'sientatanbien', 'ecoalf', 'harste', 'dieselxklein', 'aquiestamos'];
const WORK_ORDER = HOME_ORDER;
/* "More Projects" en cada proyecto: los 2 primeros de esta lista que no sean el actual */
const MORE_ORDER = ['alhaja', 'etniabarcelona', 'sientatanbien', 'comodecorarunacrisis'];

/* ---------------------------------------------------------
   HELPERS
   --------------------------------------------------------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const isVideo = (f) => /\.mp4$/i.test(f);
const src = (P, f) => (isVideo(f) ? `${P}assets/video/${f}` : `${P}assets/img/${f}`);
const media = (P, f, alt = '', eager = false) =>
  isVideo(f)
    ? `<video src="${src(P, f)}" autoplay muted loop playsinline preload="metadata"></video>`
    : `<img src="${src(P, f)}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
const roll = (t) => `<span class="roll"><span>${esc(t)}</span><span aria-hidden="true">${esc(t)}</span></span>`;
const chars = (t) =>
  `<span class="chars" aria-label="${esc(t)}">${[...t].map((c, i) => {
    const ch = c === ' ' ? ' ' : esc(c);
    return `<span aria-hidden="true" style="--i:${i}" data-c="${ch}">${ch}</span>`;
  }).join('')}</span>`;
const br = (inner) => `<span class="br">[</span> ${inner} <span class="br">]</span>`;

function head({ P, title, description = SITE.description, extraCss = '', intro = false }) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#000000">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${P}${SITE.ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${P}favicon.svg" type="image/svg+xml">
  <link rel="icon" href="${P}favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${P}apple-touch-icon.png">
  <link rel="preload" href="${P}assets/fonts/InterDisplay-500.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${P}assets/fonts/InterDisplay-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${P}css/style.css">${extraCss}${intro ? `
  <script>try { if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('classs-intro')) document.documentElement.classList.add('is-intro'); } catch (e) {}</script>` : ''}
</head>`;
}

function header(P, current) {
  const links = [['Home', `${P}`, 'home'], ['Work', `${P}work/`, 'work'], ['Labbb', `${P}labbb/`, 'labbb'], ['Contact', `${P}contact/`, 'contact']];
  return `
  <header class="site-header">
    <nav class="site-nav" aria-label="Principal">
${links.map(([t, h, k]) => `      <a href="${h}"${k === current ? ' aria-current="page"' : ''}>${br(roll(t))}</a>`).join('\n')}
    </nav>
    <a class="brand" href="${P}">${roll('Classs®')}</a>
    <div class="site-meta"><p>Based in Madrid</p><p>Art Director</p></div>
  </header>`;
}

/* Título de sección con contador rojo:  Projects [8].  size: 'xl' (solo Projects) o 'md' (secundarias) */
const bigTitle = (t, count, { size = 'md', tag = 'h2', id = '' } = {}) => `
    <div class="big-title big-title--${size} reveal"><${tag}${id ? ` id="${id}"` : ''}>${esc(t)}</${tag}><span class="count" aria-label="${esc(String(count))}"><span class="br" aria-hidden="true">[</span>${esc(count)}<span class="br" aria-hidden="true">]</span></span></div>`;

const staticBar = () => `
    <div class="skills-bar skills-bar--static" aria-hidden="true">${SKILL_NAMES.map((s) => `<p>${esc(s)}</p>`).join('')}</div>`;

function marqueeBar(items) {
  const row = items.map((s) => `<p>${esc(s)}</p>`).join('');
  return `
    <div class="skills-bar skills-bar--marquee" aria-hidden="true"><div class="track">${row}${row}</div></div>`;
}

function projectRow(P, key, { useWork = false } = {}) {
  const p = PROJECTS[key];
  const [big, small] = useWork ? p.work : p.home;
  return `
      <a class="project" href="${P}article/${key}/">
        <div class="project-media">${media(P, big, p.alt || `${p.name}, portada del proyecto`)}</div>
        <div class="project-info">
          <div class="project-thumb">${media(P, small, '')}</div>
          <h3 class="project-title">${esc(p.name)}</h3>
          <div class="project-text">
            <p class="project-meta"><span class="project-name">${esc(p.name)}</span><span class="project-cat">${esc(p.category)}</span></p>
            <p class="t-p">${esc(p.homeSub)}</p>
            <p class="t-body">${esc(p.desc)}</p>
          </div>
        </div>
      </a>`;
}

/* Cierre de todas las páginas: contacto primero, feedback como opción secundaria */
function infoSection(P, { back = { label: '[ BACK TO TOP ]', href: '#top', top: true }, contact = true } = {}) {
  const links = `
    <ul class="contact-links">
      <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">${br(roll('LinkedIn'))}</a></li>
      <li><a href="${P}${SITE.cv}" target="_blank" rel="noopener">${br(roll('Currículum'))}<small>PDF</small></a></li>
      <li><a href="${SITE.instagram}" target="_blank" rel="noopener">${br(roll('Instagram'))}</a></li>
      <li><a href="${SITE.behance}" target="_blank" rel="noopener">${br(roll('Behance'))}</a></li>
    </ul>`;
  return `
  <section class="info-sec" id="info" aria-labelledby="info-title">${contact ? `
    <div class="hire reveal">
      <h2 id="info-title" class="hire-title">¿Hablamos?</h2>
      <p class="hire-lead t-p">Busco proyectos de dirección de arte, branding y campaña. Cuéntame qué tienes entre manos.</p>
      <a class="hire-mail" href="mailto:${SITE.email}">${roll(SITE.email)}<span class="arrow" aria-hidden="true">↗</span></a>${links}
    </div>` : `
    <h2 id="info-title" class="sr-only">Más enlaces y feedback</h2>
    <div class="hire hire--compact reveal">${links}
    </div>`}
    <details class="feedback reveal">
      <summary>${br('¿Tienes feedback sobre el portfolio?')}</summary>
      <form data-mail="${SITE.email}" novalidate>
        <label>Tu comentario
          <textarea name="feedback" rows="5" placeholder="Escribe aquí tu opinión, idea o sugerencia…"></textarea>
        </label>
        <button type="submit">Abrir mi correo para enviarlo</button>
        <p class="note" aria-live="polite"></p>
      </form>
    </details>${staticBar()}
    <p class="footer-text t-body reveal">${esc(SITE.bio)}</p>
    <div class="center"><a class="pill" href="${back.href}"${back.top ? ' data-top' : ''} aria-label="${esc(back.label.replace(/[\[\]]/g, '').trim())}">${chars(back.label)}</a></div>
  </section>
  <footer class="site-footer">
    <span class="fit" aria-hidden="true">Classs</span>
  </footer>`;
}

const scripts = (P, extra = '') => `
  <script src="${P}js/main.js" defer></script>${extra}
</body>
</html>
`;

function write(rel, html) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('✔', rel);
}

/* ---------------------------------------------------------
   HOME
   --------------------------------------------------------- */
function buildHome() {
  const P = '';
  const gallery = [
    ['RYhKZ53RgX0r12BAuO7CjD9olWc.mp4', 501 / 337], ['YzVafttpBMhtf8hM07vBiJtsg4.mp4', 203 / 331],
    ['vZOli9AdjrBid9PKHCo7owklg8.mp4', 118 / 270], ['YlPEc4VGelljC587vhHzRozjN8k.mp4', 218 / 213],
    ['iQWiRMygtaSXR8mlo1y7egqQFM.mp4', 235 / 158],
  ];
  const quote = 'Prefiero el ruido que rompe el molde a la perfección que nadie recuerda.';

  const html = `${head({ P, title: SITE.title, intro: true })}
<body id="top">
  <div class="intro" aria-hidden="true"><span class="intro-line"></span></div>${header(P, 'home')}

<main>
  <section class="hero" aria-labelledby="hero-name">
    <div class="hero-top">
      <p class="hero-quote"><span class="sr-only">${quote}</span>
        <span class="t-h3" aria-hidden="true">Prefiero el ruido que</span>
        <span class="t-h3" aria-hidden="true">rompe el molde a la</span>
        <span class="t-h3" aria-hidden="true">perfección que nadie recuerda.</span>
      </p>
      <div class="hero-card">${media(P, 'ckQ648nzLiEeoYNRrILsfWEjQJ4.mp4')}</div>
    </div>${marqueeBar(SKILL_NAMES)}
    <h1 class="hero-name" id="hero-name"><span class="mask"><span class="fit">Claudia</span></span><span class="mask"><span class="fit">López-Asiaín</span></span><span class="sr-only">, Art Director en Madrid</span></h1>
  </section>

  <section class="projects-sec" id="projects" aria-labelledby="projects-title">${bigTitle('Projects', HOME_ORDER.length, { size: 'xl', id: 'projects-title' })}
    <div class="projects">${HOME_ORDER.map((k) => projectRow(P, k)).join('')}
    </div>
  </section>

  <section class="gallery-sec" id="gallery" aria-labelledby="gallery-title">${bigTitle('Gallery', gallery.length, { id: 'gallery-title' })}
    <p class="sec-lead t-p reveal">Pósters en movimiento. Más experimentos en el <a href="${P}labbb/">${br('Labbb')}</a>.</p>
    <div class="gallery3d">
      <div class="gallery3d-stage">
        <div class="gallery3d-world">
${gallery.map(([f, r]) => `          <div class="g3d-card" data-ratio="${r.toFixed(3)}">${media(P, f)}</div>`).join('\n')}
        </div>
      </div>
    </div>
  </section>

  <section class="skills-sec" id="skills" aria-labelledby="skills-title">${bigTitle('Skills', SITE.skills.length, { id: 'skills-title' })}
    <ul class="skills-list">
${SITE.skills.map(([t, d, img]) => `      <li class="skill reveal">
        <h3>${esc(t)}</h3>
        <p class="t-body">${esc(d)}</p>
        <div class="skill-img">${media(P, img, '')}</div>
      </li>`).join('\n')}
    </ul>
  </section>

  <section class="labbb-sec" id="labbb" aria-labelledby="labbb-title">${bigTitle('Labbb', '<3', { id: 'labbb-title' })}
    <p class="labbb-copy">
      <span class="t-h3 l1 reveal">Descubre mi</span>
      <span class="t-h3 l2 reveal" style="--d:.1s">propio labb<span class="red">b</span>oratorio</span>
      <span class="t-h3 l3 reveal" style="--d:.2s">de ideas</span>
    </p>
    <a class="labbb-laptop reveal" href="${P}labbb/" aria-label="Explorar Labbb">
      <img src="${P}assets/img/IH4uTxhWS1ptWbyj1IQiQsxW25k.png" alt="Experimentos personales con 3D, imagen generativa, motion y narrativas digitales." loading="lazy">
    </a>
    <div class="center"><a class="pill" href="${P}labbb/">${chars('Explorar Labbb')}</a></div>
  </section>
</main>
${infoSection(P)}
${scripts(P)}`;
  write('index.html', html);
}

/* ---------------------------------------------------------
   WORK
   --------------------------------------------------------- */
function buildWork() {
  const P = '../';
  const html = `${head({ P, title: 'Work — Classs®' })}
<body id="top">${header(P, 'work')}

<main class="work">
  <div class="work-title"><h1>All<br>Works<span class="count">[${WORK_ORDER.length}]</span></h1></div>
  <div class="work-list">
${WORK_ORDER.map((k) => {
    const p = PROJECTS[k];
    return `    <a class="work-card reveal" href="${P}article/${k}/">
      <div class="media">${media(P, p.work[0], p.alt || p.name)}<div class="thumb">${media(P, p.work[1])}</div></div>
      <div class="cap">${roll(p.name)}<span>${esc(p.category)}</span></div>
    </a>`;
  }).join('\n')}
  </div>
</main>
${infoSection(P)}
${scripts(P)}`;
  write('work/index.html', html);
}

/* ---------------------------------------------------------
   CONTACT
   --------------------------------------------------------- */
function buildContact() {
  const P = '../';
  const html = `${head({ P, title: 'Contact — Classs®' })}
<body id="top" class="contact-page">${header(P, 'contact')}

<main>
  <section class="contact-top">
    <div class="contact-photo">${media(P, 'mKlZMm6gwNGm1eqPKER45Ocpu4.jpg', 'Claudia López-Asiaín', true)}</div>
    <a class="contact-mail" href="mailto:${SITE.email}">${roll(SITE.email)}<span class="arrow" aria-hidden="true">↗</span></a>${staticBar()}
  </section>
  <h1 class="contact-now"><a href="mailto:${SITE.email}"><span class="fit"><span class="br">[</span> Contact Now <span class="br">]</span></span></a></h1>
</main>
${infoSection(P, { contact: false })}
${scripts(P)}`;
  write('contact/index.html', html);
}

/* ---------------------------------------------------------
   LABBB
   --------------------------------------------------------- */
function buildLabbb() {
  const P = '../';
  const icons = [
    // [id, título, archivo, x, y, ancho, alto]  (posición en un escritorio de 1440×900)
    ['libro', 'Libro en portadas', '7wglq8m5Zm92UzRG5gcQnj8PTQ.png', 464, 416, 80, 44],
    ['oasis', 'oAsIs', 'KmKquT9Hdha4kruSK6f0RoJYaw.jpg', 1213, 100, 80, 55],
    ['suenos', 'Sueños', 'AlMRG7hdVX3yPxybW50KsZqYm0.mp4', 666, 487, 80, 80],
    ['vda', 'VDA', 'eYE49OyOMk2SOZjoiRXCRJ8i4.gif', 512, 195, 80, 53],
    ['pantoneeee', 'Pantoneeee', '3dDWEFGJKWyvOhS3Ca0ns1aMWNM.png', 176, 465, 80, 106],
    ['font', 'la mejor font del mundo', 'u3XnssA66Fnm4pGpZtOfVn9Ux9Y.jpg', 1112, 595, 80, 46],
    ['flores', 'A cuerpo de flores', 'g5I8I0kqjJyMqIsVtdS3uPlUFc.png', 795, 363, 80, 112],
    ['placas', 'Placas tectónicas', 'fRn2PG7bZNy3CqhhzalyzJSw4.jpg', 124, 145, 80, 45],
    ['expo', 'Expo ed.03', '42gZVYJqGak1mynGQMYDiZpwcM.gif', 1098, 359, 80, 50],
  ];
  const pct = (v, t) => ((v / t) * 100).toFixed(2) + '%';
  const html = `${head({ P, title: 'Labbb — Classs®', extraCss: `\n  <link rel="stylesheet" href="${P}css/labbb.css">` })}
<body class="labbb-page">
<main class="desktop">
  <h1 class="sr-only">Labbb, escritorio de proyectos personales de Claudia López-Asiaín</h1>
  <img class="wallpaper" src="${P}assets/img/wsx33AqCaXV7H25mC3WEOCVyMNs.jpg" alt="">
  <a class="back-btn" href="${P}" aria-label="Volver a la Home">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3 5 8l5 5"/></svg>
  </a>

${icons.map(([id, t, f, x, y, w, h]) => `  <div class="d-icon" data-open="${id}" tabindex="0" role="button" aria-label="Abrir ${esc(t)}" style="left:${pct(x, 1440)};top:${pct(y, 900)}">
    <div class="thumb" style="aspect-ratio:${w}/${h}">${media(P, f, '')}</div><span>${esc(t)}</span>
  </div>`).join('\n')}

  <nav class="dock" aria-label="Dock">
    <button class="dock-item" type="button" data-open="about"><img src="${P}assets/img/nw8sIMxm5caAZtuovUZPCLLg9U.png" alt=""><span class="tip">About Me</span></button>
    <button class="dock-item" type="button" data-open="notes"><img src="${P}assets/img/4ar8CL6aUtjymV8jTsXrcPzXCM.svg" alt=""><span class="tip">Notes</span></button>
    <a class="dock-item" href="https://www.instagram.com/classs.studio" target="_blank" rel="noopener"><img src="${P}assets/img/Q0Z0p8LOZhN2hJ2arLjEtkqQD0.png" alt=""><span class="tip">Instagram</span></a>
    <a class="dock-item" href="https://www.behance.net/claudialopezasiain" target="_blank" rel="noopener"><img src="${P}assets/img/edJkRGfjqjPajyxmEgsUCKVgjE.png" alt=""><span class="tip">Behance</span></a>
    <!-- Para añadir X: copia la línea de Behance y usa la imagen assets/img/vjmmhizcqEgw5ZT5SNFQMpxD00.png con tu enlace -->
  </nav>
</main>

<!-- Contenido de la ventana "About me" -->
<template id="tpl-about" data-title="">
  <h2>About me</h2>
  <div class="photo"><img src="${P}assets/img/hRqSDYyLHYkQzfb7CtJROAMWpno.png" alt="Mi historia"></div>
  <div class="row"><b>NAME</b><span>Claudia López-Asiaín</span></div>
  <div class="row"><b>MAIL</b><a href="mailto:${SITE.email}">${SITE.email}</a></div>
  <div class="bio">
    <p>Hola, soy Claudia.</p>
    <p>Empecé en Periodismo porque se me daba bien escribir y porque nadie me había dicho que existía otra opción. Tres años después, una clase de maquetación cambió el plan por completo. Descubrí Adobe InDesign, me obsesioné, y ahí se acabó lo de publicar noticias. Lo siento, cuarto poder.</p>
    <p>Lo que vino después fue bastante autodidacta: miles de horas en YouTube, Domestika a horas intempestivas, un ASUS VIVO-BOOK que aguantó más de lo que debería, y la certeza de que esto era lo mío aunque todavía no supiera hacerlo bien del todo.</p>
    <p>He construido desde cero la identidad visual de una marca de moda, diseñado para el departamento de comunicación de una empresa, y hecho webs, carteles y logos para proyectos que merecían verse bien. En paralelo, el Máster en Dirección de Arte en LABASAD — que fue básicamente aprender a justificar con palabras lo que el ojo ya sabía.</p>
    <p>Soy bastante autocrítica, bastante perfeccionista, y convencida de que estoy al 10% de mi potencial. Eso no me asusta. Me parece el mejor sitio desde el que empezar.</p>
  </div>
  <div class="cta"><a href="mailto:${SITE.email}">Contact me</a></div>
</template>

<!-- Contenido de la ventana "Notes" -->
<template id="tpl-notes" data-title="Notes">
  <div class="notes-list">
    <button class="note-btn" type="button" data-note="experience"><b>Experience</b><small>09/07/2026 <i>Creative director</i></small></button>
    <button class="note-btn is-active" type="button" data-note="about"><b>About</b><small>09/07/2026 <i>Hola, soy Claudia.</i></small></button>
  </div>
  <div class="note-view">
    <div class="note-panel" data-note="experience" hidden>
      <p class="date">January 26, 2026 at 11:48AM</p>
      <h3>Experience</h3>
      <p><strong>El Faro del Bosque — Art Director &amp; Content Creator</strong>Construí la identidad visual de esta tienda de moda femenina desde cero. Identidad, tono, contenido, redes. Todo.</p>
      <p><strong>qdq — Diseñadora Gráfica</strong>Creatividades para redes, newsletters, emails, infografías. Dentro del departamento de comunicación de la empresa.</p>
      <p><strong>Freelance — 2023 hasta ahora</strong>Webs, carteles, logos. Para marcas pequeñas y proyectos con personalidad.</p>
      <p><strong>LABASAD — Máster en Dirección de Arte en Comunicación, 2026.</strong>Y antes, Periodismo en la Complutense. Que también cuenta.</p>
    </div>
    <div class="note-panel" data-note="about">
      <p class="date">Julio 09, 2026 12:16 AM</p>
      <h3>About</h3>
      <p>Hola, soy Claudia.</p>
      <p>Empecé estudiando Periodismo porque quería contar historias. Resulta que las mejores se cuentan sin palabras.</p>
      <p>Llevo unos años haciendo que las marcas se vean como lo que son (o como lo que deberían ser). He construido identidades desde cero, dirigido campañas para moda y cultura, y aprendido que la diferencia entre un buen diseño y uno memorable suele ser una sola decisión valiente.</p>
      <p>Trabajo con Photoshop, Illustrator, Blender, Midjourney y todo lo que haga falta. Pero lo que más uso sigue siendo el criterio.</p>
    </div>
  </div>
</template>
${scripts(P, `\n  <script src="${P}js/labbb.js" defer></script>`)}`;
  write('labbb/index.html', html);
}

/* ---------------------------------------------------------
   ARTÍCULOS
   --------------------------------------------------------- */
/* Agrupa las medidas de Framer en filas → columnas → imágenes */
function groupGallery(items) {
  const sorted = items.map(([f, x, y, w, h]) => ({ f, x, y, w, h })).sort((a, b) => a.y - b.y || a.x - b.x);
  const rows = [];
  for (const it of sorted) {
    const last = rows[rows.length - 1];
    if (last && it.y < last.bottom - 2) { last.items.push(it); last.bottom = Math.max(last.bottom, it.y + it.h); }
    else rows.push({ top: it.y, bottom: it.y + it.h, items: [it] });
  }
  return rows.map((r) => {
    if (r.items.length === 1) {
      const it = r.items[0];
      return { top: r.top, cols: [[[it.f, it.w, it.h]]], single: it.w };
    }
    const left = r.items.filter((i) => i.x < 700).sort((a, b) => a.y - b.y);
    const right = r.items.filter((i) => i.x >= 700).sort((a, b) => a.y - b.y);
    return { top: r.top, cols: [left, right].filter((c) => c.length).map((c) => c.map((i) => [i.f, i.w, i.h])) };
  });
}

/* Texto alternativo propio para cada imagen: "Alhaja, imagen 3 de 8" */
let imgCounter = { n: 0, total: 0 };
function renderBlock(P, b, alt) {
  const fig = ([f, w, h]) => {
    imgCounter.n += 1;
    const a = isVideo(f) ? '' : `${alt}, imagen ${imgCounter.n} de ${imgCounter.total}`;
    return `<figure class="reveal" style="aspect-ratio:${w}/${h}${b.single && b.single < 1300 ? `;width:${((b.single / 1377) * 100).toFixed(2)}%` : ''}">${media(P, f, a)}</figure>`;
  };
  if (b.cols.length === 1 && b.cols[0].length === 1) {
    return `\n    <div class="art-block single">${fig(b.cols[0][0], 0)}</div>`;
  }
  return `\n    <div class="art-block">${b.cols.map((c) => `<div class="col">${c.map(fig).join('')}</div>`).join('')}</div>`;
}

const renderText = ([t, body]) => `
    <div class="art-text reveal"><h2>${esc(t)}</h2><p>${esc(body)}</p></div>`;

function buildArticle(key) {
  const P = '../../';
  const p = PROJECTS[key];
  let body = '';
  const allImgs = p.blocks
    ? p.blocks.filter((b) => typeof b !== 'string').flat(2)
    : p.gallery;
  imgCounter = { n: 0, total: allImgs.filter((m) => !isVideo(m[0])).length };
  if (p.blocks) {
    let ti = 0;
    for (const b of p.blocks) {
      if (typeof b === 'string') body += renderText(p.texts[ti++]);
      else body += renderBlock(P, { cols: b }, p.name);
    }
  } else {
    const parts = [
      ...groupGallery(p.gallery).map((b) => ({ y: b.top, html: renderBlock(P, b, p.name) })),
      ...p.texts.map((t) => ({ y: t[2], html: renderText(t) })),
    ].sort((a, b) => a.y - b.y);
    body = parts.map((x) => x.html).join('');
  }
  const more = MORE_ORDER.filter((k) => k !== key).slice(0, 2);

  const html = `${head({ P, title: `${p.name} — Classs®`, description: p.desc })}
<body id="top">${header(P, 'work')}

<main>
  <section class="art-head">
    <div class="reveal">
      <h1>${esc(p.name)}</h1>
      <p class="t-body sub">${esc(p.sub)}</p>
      <p class="t-body desc">${esc(p.desc)}</p>
    </div>
    <dl class="art-meta reveal" style="--d:.1s">
${Object.entries(p.meta).map(([k, v]) => `      <div><dt>${esc(k)}:</dt><dd>${esc(v)}</dd></div>`).join('\n')}
    </dl>
  </section>

  <section class="art-body">${body}
  </section>

  <section class="more-sec" aria-labelledby="more-title">
    <h2 id="more-title" class="sr-only">Más proyectos</h2>
    <div class="more-marquee" aria-hidden="true"><div class="track">${'<p>More Projects</p>'.repeat(4)}</div></div>
    <div class="projects">${more.map((k) => projectRow(P, k, { useWork: true })).join('')}
    </div>
  </section>
</main>
${infoSection(P, { back: { label: 'BACK TO WORKS', href: `${P}work/` } })}
${scripts(P)}`;
  write(`article/${key}/index.html`, html);
}

/* ---------------------------------------------------------
   404 (GitHub Pages)
   --------------------------------------------------------- */
function build404() {
  // Rutas absolutas no sirven en un repo de proyecto, así que el 404 redirige a la home relativa al dominio.
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — Classs®</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#000;color:#fff;font:600 18px/1.4 system-ui,sans-serif;text-align:center}a{color:#fff}b{color:red}</style>
</head><body><div><p style="font-size:80px;margin:0">4<b>0</b>4</p><p>Esta página no existe. <a href="javascript:history.back()">Volver</a></p></div></body></html>
`;
  write('404.html', html);
}

buildHome();
buildWork();
buildContact();
buildLabbb();
Object.keys(PROJECTS).forEach(buildArticle);
build404();
console.log('\nListo.');
