window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-401",
    dominio: 4,
    tema: "Modelos de compra EC2",
    tipo: "single",
    enunciado: "Una empresa ejecuta una flota base de instancias EC2 que corre 24/7 durante todo el año, pero planea migrar de la familia M5 a la familia M7g (Graviton) en los próximos 18 meses y posiblemente cambiar el sistema operativo. Quiere maximizar el ahorro sobre la demanda manteniendo flexibilidad para cambiar de familia de instancia. ¿Qué modelo de compra es el más adecuado?",
    opciones: [
      "Compute Savings Plan a 3 años con pago total por adelantado",
      "EC2 Instance Savings Plan a 1 año sobre la familia M5",
      "Reserved Instances Standard a 3 años para M5",
      "Instancias Spot con Spot Fleet capacity-optimized"
    ],
    correctas: [0],
    explicacion: "El Compute Savings Plan aplica automáticamente a cualquier familia, tamaño, región, SO y tenancy, e incluso a Fargate y Lambda, así que sigue ahorrando tras migrar a Graviton. El EC2 Instance SP y las RI Standard quedan atados a M5 y se desperdiciarían. Spot no sirve para una flota base 24/7 que necesita estabilidad."
  },
  {
    id: "saa-402",
    dominio: 4,
    tema: "Spot Fleet",
    tipo: "single",
    enunciado: "Un equipo de datos procesa lotes nocturnos tolerantes a fallos usando un Spot Fleet. Sufren interrupciones frecuentes que reinician los trabajos desde cero y aumentan el tiempo total. Quieren reducir las interrupciones sin renunciar al ahorro de Spot. ¿Qué cambio aporta la mayor mejora?",
    opciones: [
      "Configurar la estrategia de asignación 'capacity-optimized' con múltiples tipos de instancia y AZs",
      "Cambiar la estrategia de asignación a 'lowestPrice' con un solo tipo de instancia",
      "Aumentar el precio máximo de Spot al precio On-Demand",
      "Reservar capacidad con un Capacity Reservation On-Demand"
    ],
    correctas: [0],
    explicacion: "La estrategia 'capacity-optimized' lanza instancias desde los pools con más capacidad disponible, lo que minimiza la probabilidad de interrupción. Diversificar tipos y AZs amplía los pools. 'lowestPrice' con un solo tipo concentra el riesgo. Subir el precio máximo no evita interrupciones por falta de capacidad, y un Capacity Reservation On-Demand elimina el ahorro de Spot."
  },
  {
    id: "saa-403",
    dominio: 4,
    tema: "S3 Intelligent-Tiering",
    tipo: "single",
    enunciado: "Una plataforma almacena objetos cuyo patrón de acceso es impredecible: algunos se leen a diario durante semanas y luego no se tocan por meses, y a veces vuelven a usarse. El equipo no quiere gestionar reglas de transición manualmente ni arriesgarse a recuperaciones lentas. ¿Qué opción optimiza el costo sin penalizar el acceso?",
    opciones: [
      "S3 Intelligent-Tiering",
      "S3 Standard con una regla de Lifecycle que transiciona a Glacier Flexible Retrieval a los 30 días",
      "S3 One Zone-IA para todos los objetos",
      "S3 Glacier Deep Archive con restauraciones bajo demanda"
    ],
    correctas: [0],
    explicacion: "Intelligent-Tiering mueve automáticamente los objetos entre niveles según el acceso, sin cargos por recuperación y sin penalización en los niveles frecuente e infrecuente. Para patrones impredecibles evita errores de Lifecycle. Glacier introduce latencia de restauración y One Zone-IA reduce durabilidad ante fallo de AZ."
  },
  {
    id: "saa-404",
    dominio: 4,
    tema: "NAT Gateway vs VPC endpoints",
    tipo: "single",
    enunciado: "Instancias en subredes privadas descargan grandes volúmenes desde S3 y DynamoDB cada noche. La factura muestra un costo elevado de procesamiento y transferencia del NAT Gateway. ¿Qué cambio reduce ese costo de la forma más directa?",
    opciones: [
      "Crear Gateway VPC Endpoints para S3 y DynamoDB",
      "Reemplazar el NAT Gateway por una instancia NAT más grande",
      "Mover las instancias a subredes públicas con IPs públicas",
      "Habilitar un Interface VPC Endpoint (PrivateLink) para S3 y DynamoDB"
    ],
    correctas: [0],
    explicacion: "Los Gateway VPC Endpoints para S3 y DynamoDB no tienen costo por hora ni por GB y enrutan el tráfico fuera del NAT Gateway, eliminando los cargos de procesamiento de datos. Una instancia NAT no elimina el cargo de transferencia, exponer las instancias rompe la seguridad, y los Interface Endpoints sí cobran por hora y por GB."
  },
  {
    id: "saa-405",
    dominio: 4,
    tema: "Graviton right-sizing",
    tipo: "single",
    enunciado: "Una API en contenedores sobre EC2 está sobreaprovisionada según Compute Optimizer y corre sobre instancias x86. La aplicación es Java estándar y compatible con ARM. El objetivo es bajar costo conservando rendimiento. ¿Qué combinación de acciones es la más efectiva?",
    opciones: [
      "Hacer right-sizing al tamaño recomendado y migrar a instancias Graviton (ARM)",
      "Comprar RI Standard de 3 años sobre el tamaño sobreaprovisionado actual",
      "Mantener el tamaño y habilitar Auto Scaling con políticas agresivas",
      "Cambiar a instancias con almacenamiento de instancia local más grande"
    ],
    correctas: [0],
    explicacion: "Combinar right-sizing (eliminar capacidad ociosa) con Graviton, que ofrece mejor relación precio-rendimiento que x86, ataca el costo desde dos frentes. Comprar RI sobre un tamaño inflado consolida el desperdicio por 3 años. Auto Scaling no corrige el sobreaprovisionamiento de la base, y más almacenamiento local no aborda el problema."
  },
  {
    id: "saa-406",
    dominio: 4,
    tema: "Aurora Serverless v2",
    tipo: "single",
    enunciado: "Una base de datos de pruebas internas recibe ráfagas de carga durante el horario laboral y permanece prácticamente inactiva por las noches y fines de semana. El equipo paga por instancias Aurora provisionadas que están encendidas todo el tiempo. ¿Qué opción reduce el costo adaptándose a la carga variable con mínima gestión?",
    opciones: [
      "Migrar a Aurora Serverless v2 con escalado automático de capacidad",
      "Comprar Reserved Instances de Aurora para la instancia provisionada",
      "Crear réplicas de lectura adicionales para distribuir la carga",
      "Aumentar el tamaño de la instancia provisionada para absorber las ráfagas"
    ],
    correctas: [0],
    explicacion: "Aurora Serverless v2 ajusta la capacidad (ACUs) de forma granular y casi instantánea según la demanda, ideal para cargas intermitentes con ráfagas, evitando pagar capacidad ociosa. Las RI requieren compromiso sobre capacidad fija, y las réplicas o instancias más grandes aumentan el costo en vez de reducirlo."
  },
  {
    id: "saa-407",
    dominio: 4,
    tema: "AWS Budgets acciones",
    tipo: "single",
    enunciado: "El responsable financiero quiere que, cuando el gasto mensual real supere el 90% del presupuesto, se apliquen automáticamente políticas restrictivas que impidan lanzar nuevos recursos costosos, además de recibir una alerta. ¿Qué servicio y función cumple esto sin scripts personalizados?",
    opciones: [
      "AWS Budgets con Budget Actions que aplican una política IAM o SCP al cruzar el umbral",
      "AWS Cost Explorer con una alarma de CloudWatch",
      "AWS Cost Anomaly Detection con notificaciones por SNS",
      "AWS Trusted Advisor con comprobaciones de límites de servicio"
    ],
    correctas: [0],
    explicacion: "AWS Budgets permite definir Budget Actions que, al superar un umbral, aplican automáticamente una política IAM/SCP restrictiva o detienen instancias, además de alertar. Cost Explorer y Anomaly Detection informan pero no aplican acciones de control automáticas, y Trusted Advisor no actúa sobre presupuestos."
  },
  {
    id: "saa-408",
    dominio: 4,
    tema: "EBS gp3 vs gp2",
    tipo: "single",
    enunciado: "Un administrador revisa volúmenes EBS gp2 de 1 TB que rara vez superan los 4.000 IOPS pero por su tamaño tienen 3.000 IOPS base. Quiere reducir costo sin perder rendimiento y poder ajustar IOPS de forma independiente del tamaño. ¿Qué acción recomienda?",
    opciones: [
      "Migrar los volúmenes a gp3 y configurar IOPS y throughput según la necesidad real",
      "Migrar los volúmenes a io2 Block Express para mayor rendimiento",
      "Reducir el tamaño de los volúmenes gp2 para bajar el costo",
      "Convertir los volúmenes a st1 (HDD optimizado por throughput)"
    ],
    correctas: [0],
    explicacion: "gp3 cuesta menos por GB que gp2 e incluye 3.000 IOPS y 125 MB/s de base, con la posibilidad de aumentar IOPS y throughput de forma independiente del tamaño. io2 Block Express es más caro, reducir el tamaño puede no ser viable, y st1 no sirve para cargas que requieren IOPS aleatorios."
  },
  {
    id: "saa-409",
    dominio: 4,
    tema: "Cost Explorer rightsizing",
    tipo: "single",
    enunciado: "Una organización sospecha que muchas instancias EC2 están infrautilizadas y quiere recomendaciones concretas de cambio de tamaño basadas en métricas históricas de uso, sin instalar agentes adicionales en cada instancia. ¿Qué herramienta provee estas recomendaciones de forma nativa?",
    opciones: [
      "Las recomendaciones de rightsizing de AWS Cost Explorer (y AWS Compute Optimizer)",
      "AWS Config con reglas administradas de cumplimiento",
      "Amazon CloudWatch Logs Insights",
      "AWS Systems Manager Inventory"
    ],
    correctas: [0],
    explicacion: "Cost Explorer ofrece recomendaciones de rightsizing analizando el uso histórico de CPU y memoria (apoyándose en Compute Optimizer) y sugiere reducir o cambiar familias para ahorrar, sin agentes obligatorios. Config, Logs Insights y SSM Inventory no generan recomendaciones de costo basadas en utilización."
  },
  {
    id: "saa-410",
    dominio: 4,
    tema: "S3 Lifecycle y expiración",
    tipo: "single",
    enunciado: "Una aplicación genera logs en S3 que deben conservarse 30 días en acceso frecuente, luego 60 días más en almacenamiento de archivo de bajo costo, y finalmente eliminarse a los 90 días. ¿Qué configuración cumple esto al menor costo y sin intervención manual?",
    opciones: [
      "Una regla de Lifecycle que transiciona a Glacier Flexible Retrieval a los 30 días y expira los objetos a los 90 días",
      "Mover manualmente los objetos a Glacier cada mes mediante un script en Lambda",
      "Activar versionado y eliminar versiones antiguas con un cron en EC2",
      "Una regla de Lifecycle que transiciona a S3 Standard-IA a los 30 días sin expiración"
    ],
    correctas: [0],
    explicacion: "Una única regla de Lifecycle puede combinar transición (a Glacier Flexible Retrieval, más barato para archivo) y expiración a los 90 días, todo automatizado y sin operación manual. El script en Lambda o el cron en EC2 añaden costo y mantenimiento, y la opción sin expiración no elimina los objetos al final."
  },
  {
    id: "saa-411",
    dominio: 4,
    tema: "Instance Scheduler",
    tipo: "single",
    enunciado: "Un entorno de desarrollo con docenas de instancias EC2 y bases RDS solo se usa de lunes a viernes de 8 a 20 h, pero corre 24/7. El equipo quiere apagarlas fuera de horario de forma centralizada y con tags por proyecto, sin construir su propia solución. ¿Qué recomienda?",
    opciones: [
      "Implementar AWS Instance Scheduler para iniciar y detener EC2 y RDS según un calendario basado en tags",
      "Comprar Reserved Instances para EC2 y RDS de desarrollo",
      "Migrar todo el entorno a instancias Spot",
      "Configurar Auto Scaling con capacidad mínima cero durante la noche"
    ],
    correctas: [0],
    explicacion: "AWS Instance Scheduler arranca y detiene EC2 y RDS según calendarios definidos por tags, lo que reduce el costo al pagar solo durante el horario laboral. Las RI siguen pagando 24/7, Spot no encaja para entornos interactivos de desarrollo y Auto Scaling no gestiona el ciclo de RDS por horario de forma nativa."
  },
  {
    id: "saa-412",
    dominio: 4,
    tema: "CloudFront egress",
    tipo: "single",
    enunciado: "Un sitio sirve grandes volúmenes de imágenes y vídeo directamente desde S3 a usuarios globales. El costo de transferencia de salida (egress) desde S3 es muy alto y la latencia es alta para usuarios lejanos. ¿Qué cambio reduce el costo de transferencia y mejora el rendimiento?",
    opciones: [
      "Servir el contenido a través de Amazon CloudFront con S3 como origen",
      "Mover el bucket S3 a la región más cercana a la mayoría de usuarios",
      "Habilitar S3 Transfer Acceleration en el bucket",
      "Activar Requester Pays en el bucket de S3"
    ],
    correctas: [0],
    explicacion: "CloudFront cachea el contenido en edge locations: el egress desde S3 hacia CloudFront es gratuito y la salida desde CloudFront suele ser más económica, además de reducir latencia globalmente. Cambiar de región no ayuda a usuarios dispersos, Transfer Acceleration optimiza subidas, y Requester Pays traslada el costo pero no lo reduce."
  },
  {
    id: "saa-413",
    dominio: 4,
    tema: "DynamoDB on-demand",
    tipo: "single",
    enunciado: "Una startup lanza una nueva funcionalidad con tráfico totalmente impredecible y picos esporádicos. No quiere correr el riesgo de aprovisionar de menos (throttling) ni de más (desperdicio), y prefiere no gestionar Auto Scaling de capacidad. ¿Qué modo de capacidad de DynamoDB es el más adecuado al inicio?",
    opciones: [
      "Modo de capacidad On-Demand (bajo demanda)",
      "Capacidad aprovisionada con un número alto fijo de RCU/WCU",
      "Capacidad aprovisionada con Auto Scaling al 70% de utilización",
      "Tabla global con réplicas en varias regiones"
    ],
    correctas: [0],
    explicacion: "El modo On-Demand cobra por solicitud y escala instantáneamente sin planificación de capacidad, ideal para tráfico nuevo e impredecible, evitando throttling y desperdicio. Aprovisionar alto fijo desperdicia dinero, el Auto Scaling reacciona más lento a picos súbitos, y una tabla global multiplica costos sin justificarse aquí."
  },
  {
    id: "saa-414",
    dominio: 4,
    tema: "Recursos huérfanos",
    tipo: "multiple",
    enunciado: "Una auditoría de costos revela que la cuenta acumula cargos por recursos sin uso. ¿Qué dos elementos suelen generar costo aunque no estén asociados a una carga activa y deberían eliminarse? (Elegí 2)",
    opciones: [
      "Elastic IPs asignadas pero no asociadas a una instancia en ejecución",
      "Snapshots de EBS antiguos que ya no respaldan ningún volumen necesario",
      "Security Groups sin reglas de entrada",
      "Roles de IAM que no se usan",
      "Tablas de rutas vacías en una VPC"
    ],
    correctas: [0, 1],
    explicacion: "Las Elastic IPs no asociadas generan un cargo por hora, y los snapshots de EBS almacenados cobran por GB-mes aunque no se usen; ambos son fuentes típicas de desperdicio. Los Security Groups, roles de IAM y tablas de rutas no tienen costo directo por existir."
  },
  {
    id: "saa-415",
    dominio: 4,
    tema: "Fargate Spot",
    tipo: "single",
    enunciado: "Un pipeline de procesamiento por lotes corre en Amazon ECS sobre Fargate. Las tareas son idempotentes y tolerantes a interrupciones. El equipo quiere reducir el costo de cómputo hasta donde sea posible. ¿Qué opción es la más económica para estas tareas?",
    opciones: [
      "Ejecutar las tareas en Fargate Spot",
      "Ejecutar las tareas en Fargate estándar con Savings Plan",
      "Migrar las tareas a EC2 On-Demand con Auto Scaling",
      "Ejecutar las tareas en Lambda con memoria máxima"
    ],
    correctas: [0],
    explicacion: "Fargate Spot ofrece un descuento significativo frente a Fargate estándar para cargas tolerantes a interrupciones como lotes idempotentes. Fargate con Savings Plan ahorra menos que Spot, EC2 On-Demand es más caro, y Lambda tiene límites de duración que no encajan necesariamente con procesamiento por lotes largo."
  },
  {
    id: "saa-416",
    dominio: 4,
    tema: "Organizations consolidated billing",
    tipo: "single",
    enunciado: "Una empresa con 12 cuentas en AWS Organizations compró varias Reserved Instances y Savings Plans en una cuenta. Quiere que los descuentos se apliquen automáticamente a instancias coincidentes en cualquier cuenta de la organización para maximizar el aprovechamiento. ¿Qué debe configurar?",
    opciones: [
      "Activar el uso compartido (sharing) de RI y Savings Plans en la facturación consolidada de la cuenta de gestión",
      "Comprar RI y SP independientes en cada cuenta miembro",
      "Mover todas las cargas a la cuenta que posee las RI",
      "Crear una SCP que fuerce el uso de instancias reservadas"
    ],
    correctas: [0],
    explicacion: "La facturación consolidada de AWS Organizations permite compartir RI y Savings Plans entre cuentas, de modo que los descuentos se aplican a uso coincidente en toda la organización si el sharing está habilitado. Comprar por cuenta o consolidar cargas es ineficiente, y una SCP no asigna descuentos."
  },
  {
    id: "saa-417",
    dominio: 4,
    tema: "S3 Storage Class Analysis",
    tipo: "single",
    enunciado: "Antes de crear reglas de Lifecycle, un equipo quiere datos objetivos sobre cuándo los objetos de un bucket dejan de accederse, para decidir el día óptimo de transición a una clase infrecuente. ¿Qué herramienta nativa de S3 entrega ese análisis?",
    opciones: [
      "S3 Storage Class Analysis",
      "S3 Inventory",
      "S3 Storage Lens dashboard básico",
      "S3 Access Points"
    ],
    correctas: [0],
    explicacion: "S3 Storage Class Analysis observa los patrones de acceso por filtro y recomienda cuándo conviene transicionar objetos a Standard-IA, ayudando a fijar el umbral de Lifecycle. S3 Inventory lista objetos y metadatos pero no analiza acceso, Storage Lens da métricas agregadas, y Access Points gestionan acceso, no análisis de uso."
  },
  {
    id: "saa-418",
    dominio: 4,
    tema: "Cost Anomaly Detection",
    tipo: "single",
    enunciado: "Tras varios meses con facturas estables, el equipo de FinOps quiere detectar de forma proactiva subidas inesperadas de gasto causadas por errores de configuración o recursos olvidados, con alertas automáticas y análisis de la causa raíz por servicio. ¿Qué servicio cumple este objetivo?",
    opciones: [
      "AWS Cost Anomaly Detection",
      "AWS Budgets con un presupuesto fijo mensual",
      "AWS Trusted Advisor",
      "AWS Compute Optimizer"
    ],
    correctas: [0],
    explicacion: "Cost Anomaly Detection usa machine learning para aprender patrones de gasto y alertar sobre desviaciones anómalas, indicando el servicio y la causa probable. Budgets alerta sobre umbrales fijos pero no detecta anomalías dinámicas, Trusted Advisor evalúa buenas prácticas y Compute Optimizer recomienda tamaños, no anomalías de costo."
  },
  {
    id: "saa-419",
    dominio: 4,
    tema: "Cost allocation tags",
    tipo: "single",
    enunciado: "Una empresa necesita desglosar el gasto de AWS por departamento y por proyecto en Cost Explorer y en los informes de facturación. Ya etiqueta sus recursos con claves como 'Departamento' y 'Proyecto'. ¿Qué paso adicional es imprescindible para poder filtrar el costo por esas etiquetas?",
    opciones: [
      "Activar esas claves como cost allocation tags en la consola de facturación",
      "Crear una SCP que obligue a usar esas etiquetas",
      "Habilitar AWS Config para registrar las etiquetas",
      "Mover cada proyecto a una cuenta separada"
    ],
    correctas: [0],
    explicacion: "Las etiquetas solo aparecen como dimensiones de costo después de activarlas como cost allocation tags en la consola de facturación; recién entonces Cost Explorer y los informes permiten filtrar por ellas. La SCP fuerza el etiquetado pero no las activa, Config las inventaría sin habilitar el desglose, y separar cuentas es innecesario."
  },
  {
    id: "saa-420",
    dominio: 4,
    tema: "RI Convertible vs Standard",
    tipo: "single",
    enunciado: "Una empresa prevé una carga estable durante 3 años pero anticipa que cambiará de familia de instancia y de sistema operativo varias veces a medida que evoluciona la aplicación. Quiere un descuento por compromiso pero conservando la capacidad de intercambiar atributos. ¿Qué opción equilibra ahorro y flexibilidad?",
    opciones: [
      "Reserved Instances Convertible a 3 años",
      "Reserved Instances Standard a 3 años",
      "Spot Instances con Spot Fleet",
      "On-Demand sin compromiso"
    ],
    correctas: [0],
    explicacion: "Las RI Convertible permiten intercambiar familia, SO, tenancy y tamaño durante el plazo, ofreciendo flexibilidad a cambio de un descuento algo menor que las Standard. Las RI Standard dan más descuento pero no permiten cambiar de familia, Spot no encaja para carga estable, y On-Demand no aporta descuento por compromiso."
  },
  {
    id: "saa-421",
    dominio: 4,
    tema: "S3 Glacier Deep Archive",
    tipo: "single",
    enunciado: "Una entidad debe conservar registros de auditoría durante 10 años para cumplimiento normativo. El acceso a estos datos es extremadamente raro y se acepta una recuperación de hasta 12 horas. ¿Qué clase de almacenamiento minimiza el costo?",
    opciones: [
      "S3 Glacier Deep Archive",
      "S3 Glacier Instant Retrieval",
      "S3 Standard-IA",
      "S3 One Zone-IA"
    ],
    correctas: [0],
    explicacion: "Glacier Deep Archive es la clase más económica de S3, pensada para retención a largo plazo con acceso muy raro y tiempos de recuperación de horas, ideal para cumplimiento de 10 años. Glacier Instant Retrieval, Standard-IA y One Zone-IA cuestan más por GB y no se justifican para datos que casi nunca se leen."
  },
  {
    id: "saa-422",
    dominio: 4,
    tema: "Cross-AZ data transfer",
    tipo: "multiple",
    enunciado: "Una factura muestra altos cargos de transferencia de datos entre AZs por tráfico constante entre la aplicación y su base de datos. ¿Qué dos afirmaciones sobre la optimización de costos de transferencia de datos en una VPC son correctas? (Elegí 2)",
    opciones: [
      "El tráfico entre instancias en la misma AZ usando direcciones IP privadas no genera cargos de transferencia entre AZs",
      "El tráfico hacia S3 y DynamoDB vía Gateway VPC Endpoint no genera cargos de transferencia de datos por GB",
      "El tráfico entre AZs siempre es gratuito si se usa la dirección IP pública",
      "Enrutar el tráfico interno mediante un NAT Gateway elimina los cargos de transferencia entre AZs",
      "Un Transit Gateway hace gratuita la transferencia de datos entre AZs"
    ],
    correctas: [0, 1],
    explicacion: "El tráfico dentro de la misma AZ por IP privada no incurre cargos cross-AZ, y los Gateway VPC Endpoints para S3 y DynamoDB no cobran por GB transferido. Usar IPs públicas encarece el tráfico, y el NAT Gateway o el Transit Gateway añaden cargos en lugar de eliminarlos."
  },
  {
    id: "saa-423",
    dominio: 4,
    tema: "Compute Optimizer",
    tipo: "single",
    enunciado: "Un arquitecto quiere recomendaciones de optimización que abarquen no solo EC2, sino también volúmenes EBS, funciones Lambda y servicios de ECS sobre Fargate, basadas en métricas de utilización y con estimación de ahorro. ¿Qué servicio cubre este alcance amplio?",
    opciones: [
      "AWS Compute Optimizer",
      "AWS Cost Explorer únicamente",
      "AWS Trusted Advisor nivel básico",
      "Amazon CloudWatch alarmas"
    ],
    correctas: [0],
    explicacion: "Compute Optimizer analiza métricas de EC2, Auto Scaling groups, volúmenes EBS, funciones Lambda y tareas ECS sobre Fargate, y entrega recomendaciones de tamaño con ahorro estimado. Cost Explorer cubre principalmente rightsizing de EC2, Trusted Advisor básico es limitado, y CloudWatch no genera recomendaciones de optimización."
  },
  {
    id: "saa-424",
    dominio: 4,
    tema: "Lambda escalado a cero",
    tipo: "single",
    enunciado: "Un endpoint interno se invoca esporádicamente, quizá unas pocas veces al día. Actualmente corre en una instancia EC2 t3.small encendida 24/7. Se busca pagar solo por el cómputo realmente consumido y eliminar el costo en reposo. ¿Qué arquitectura cumple mejor el objetivo de costo?",
    opciones: [
      "Reescribir el endpoint como una función AWS Lambda detrás de API Gateway",
      "Mantener la EC2 pero comprar una Reserved Instance",
      "Migrar a una instancia más pequeña t4g.nano",
      "Ejecutar el endpoint en un contenedor Fargate siempre activo"
    ],
    correctas: [0],
    explicacion: "Lambda escala a cero y solo cobra por invocación y duración, eliminando el costo en reposo de un endpoint con tráfico escaso. La RI o un t4g.nano siguen pagando 24/7, y un Fargate siempre activo también incurre costo continuo aunque no haya tráfico."
  },
  {
    id: "saa-425",
    dominio: 4,
    tema: "S3 Storage Lens",
    tipo: "single",
    enunciado: "Una organización con cientos de buckets en varias cuentas quiere una vista centralizada del uso de almacenamiento, identificar buckets con crecimiento anómalo y oportunidades de ahorro como objetos sin reglas de Lifecycle. ¿Qué herramienta proporciona esta visibilidad a nivel de organización?",
    opciones: [
      "Amazon S3 Storage Lens",
      "S3 Storage Class Analysis por bucket",
      "AWS Cost Explorer filtrado por S3",
      "S3 Inventory en cada bucket"
    ],
    correctas: [0],
    explicacion: "S3 Storage Lens ofrece un panel de visibilidad de almacenamiento agregado a nivel de cuenta y organización, con métricas de uso, actividad y recomendaciones de ahorro como detectar buckets sin Lifecycle. Storage Class Analysis e Inventory operan por bucket, y Cost Explorer muestra costo pero no métricas detalladas de almacenamiento."
  },
  {
    id: "saa-426",
    dominio: 4,
    tema: "VPC endpoints PrivateLink",
    tipo: "single",
    enunciado: "Servicios en una VPC consumen Amazon SQS y Amazon Kinesis con alto volumen a través de un NAT Gateway, generando cargos de procesamiento de datos. Se requiere acceso privado sin pasar por Internet y reducir esos cargos. ¿Qué solución es la más adecuada?",
    opciones: [
      "Crear Interface VPC Endpoints (PrivateLink) para SQS y Kinesis",
      "Crear Gateway VPC Endpoints para SQS y Kinesis",
      "Aumentar el ancho de banda del NAT Gateway",
      "Configurar un proxy en EC2 para reducir el tráfico"
    ],
    correctas: [0],
    explicacion: "SQS y Kinesis se acceden mediante Interface VPC Endpoints (PrivateLink), lo que mantiene el tráfico privado y evita los cargos de procesamiento del NAT Gateway. Los Gateway Endpoints solo existen para S3 y DynamoDB, ampliar el NAT no elimina sus cargos, y un proxy añade complejidad y costo."
  },
  {
    id: "saa-427",
    dominio: 4,
    tema: "Direct Connect data transfer",
    tipo: "single",
    enunciado: "Una empresa transfiere grandes volúmenes de datos entre su centro de datos y AWS a diario sobre una VPN por Internet, y los cargos de transferencia de datos saliente más la latencia variable son un problema de costo y consistencia. ¿Qué opción reduce el costo de transferencia a escala y mejora la previsibilidad?",
    opciones: [
      "Establecer una conexión AWS Direct Connect, que ofrece tarifas de transferencia de datos más bajas",
      "Aumentar el tamaño de la VPN Site-to-Site",
      "Habilitar S3 Transfer Acceleration para todas las cargas",
      "Usar CloudFront para el tráfico hacia el centro de datos"
    ],
    correctas: [0],
    explicacion: "Direct Connect ofrece tarifas de transferencia de datos saliente significativamente más bajas que por Internet y un ancho de banda dedicado con latencia consistente, ideal para grandes volúmenes diarios. Ampliar la VPN no baja las tarifas, Transfer Acceleration es para subidas a S3, y CloudFront sirve contenido a usuarios, no tráfico hacia un datacenter."
  },
  {
    id: "saa-428",
    dominio: 4,
    tema: "S3 Intelligent-Tiering Archive",
    tipo: "single",
    enunciado: "Un bucket usa S3 Intelligent-Tiering. El equipo quiere que los objetos que llevan mucho tiempo sin accederse pasen automáticamente a niveles de archivo aún más baratos, aceptando latencia de recuperación para esos objetos antiguos, sin gestionar reglas manuales. ¿Qué deben habilitar?",
    opciones: [
      "Los niveles de archivo opcionales de Intelligent-Tiering (Archive Access y Deep Archive Access)",
      "Una regla de Lifecycle separada que transicione a Glacier",
      "Cambiar la clase a S3 Standard-IA",
      "Activar Requester Pays para reducir costos de acceso"
    ],
    correctas: [0],
    explicacion: "Intelligent-Tiering permite activar niveles de archivo opcionales (Archive Access y Deep Archive Access) que mueven automáticamente objetos no accedidos durante largos periodos a almacenamiento de archivo más barato, con latencia de recuperación. Una regla de Lifecycle a Glacier sería redundante, Standard-IA es más caro y Requester Pays no reduce el costo de archivo."
  },
  {
    id: "saa-429",
    dominio: 4,
    tema: "Snapshots incrementales",
    tipo: "multiple",
    enunciado: "Un equipo crea snapshots diarios de varios volúmenes EBS y el almacenamiento crece sin control. ¿Qué dos medidas controlan el costo del respaldo sin perder la capacidad de restaurar puntos recientes? (Elegí 2)",
    opciones: [
      "Usar Amazon Data Lifecycle Manager para aplicar una política de retención que elimine automáticamente snapshots antiguos",
      "Archivar snapshots poco accedidos en el tier de archivo de EBS Snapshots (Snapshot Archive)",
      "Tomar una copia completa cada día en lugar de snapshots incrementales",
      "Convertir todos los snapshots en AMIs para que dejen de tener costo de almacenamiento",
      "Deshabilitar el cifrado de los snapshots para reducir su tamaño"
    ],
    correctas: [0, 1],
    explicacion: "Data Lifecycle Manager automatiza la retención y elimina snapshots viejos, y el Snapshot Archive baja el costo de snapshots rara vez accedidos que se deben conservar. Los snapshots ya son incrementales (no copias completas), las AMIs siguen respaldándose en snapshots con costo, y el cifrado no aumenta el tamaño facturado."
  },
  {
    id: "saa-430",
    dominio: 4,
    tema: "Spot mixed instances",
    tipo: "multiple",
    enunciado: "Un Auto Scaling Group con política de instancias mixtas debe minimizar costo combinando Spot y On-Demand, manteniendo una base mínima garantizada para evitar caídas totales ante interrupciones masivas de Spot. ¿Qué dos configuraciones logran este equilibrio? (Elegí 2)",
    opciones: [
      "Definir una capacidad base On-Demand (On-Demand base capacity) para la porción crítica",
      "Usar la estrategia de asignación de Spot 'capacity-optimized' con varios tipos de instancia",
      "Configurar todo el grupo como 100% Spot con un solo tipo de instancia",
      "Eliminar las comprobaciones de salud para evitar reemplazos",
      "Fijar el precio máximo de Spot por debajo del costo para no pagar nunca"
    ],
    correctas: [0, 1],
    explicacion: "Una base On-Demand garantiza capacidad mínima estable, y 'capacity-optimized' con múltiples tipos diversifica los pools y reduce interrupciones de Spot, manteniendo el ahorro. Ir 100% Spot con un solo tipo concentra el riesgo, quitar health checks degrada disponibilidad, y un precio máximo demasiado bajo impide lanzar instancias."
  },
  {
    id: "saa-431",
    dominio: 4,
    tema: "Requester Pays",
    tipo: "single",
    enunciado: "Una empresa comparte grandes datasets en S3 con socios externos. Quiere seguir siendo dueña de los datos pero que los costos de solicitud y de transferencia de descarga los asuma quien consume los datos, no ella. ¿Qué característica de S3 logra esto?",
    opciones: [
      "Habilitar Requester Pays en el bucket",
      "Activar S3 Transfer Acceleration",
      "Usar S3 Intelligent-Tiering",
      "Configurar una política de bucket que limite el ancho de banda"
    ],
    correctas: [0],
    explicacion: "Con Requester Pays activado, el solicitante autenticado paga los cargos de solicitud y de transferencia de datos de descarga, mientras el dueño sigue pagando solo el almacenamiento; ideal para compartir datasets grandes. Transfer Acceleration e Intelligent-Tiering no cambian quién paga el egress, y las políticas de bucket no transfieren costos."
  },
  {
    id: "saa-432",
    dominio: 4,
    tema: "Compute Savings Plan vs RI",
    tipo: "single",
    enunciado: "Una empresa ejecuta cargas mixtas: EC2 de larga duración, contenedores en Fargate y funciones Lambda con un nivel base constante de uso a lo largo del año. Busca un único compromiso que descuente automáticamente todos estos servicios sin gestionar reservas por servicio. ¿Qué opción es la mejor?",
    opciones: [
      "Compute Savings Plan",
      "Reserved Instances Standard de EC2",
      "EC2 Instance Savings Plan",
      "Comprar capacidad reservada de Fargate y RI de EC2 por separado"
    ],
    correctas: [0],
    explicacion: "El Compute Savings Plan aplica el descuento por compromiso de gasto por hora a EC2, Fargate y Lambda de forma automática y flexible, cubriendo cargas mixtas con un solo compromiso. Las RI de EC2 y el EC2 Instance SP no cubren Fargate ni Lambda, y comprar por servicio es más complejo y rígido."
  },
  {
    id: "saa-433",
    dominio: 4,
    tema: "Trusted Advisor",
    tipo: "single",
    enunciado: "Un cliente con plan de soporte Business quiere una revisión automatizada de mejores prácticas que identifique instancias EC2 infrautilizadas, IPs elásticas sin asociar, balanceadores sin uso y RI poco aprovechadas, todo en un panel de optimización de costos. ¿Qué herramienta entrega esto directamente?",
    opciones: [
      "AWS Trusted Advisor, categoría de optimización de costos",
      "AWS Cost Anomaly Detection",
      "AWS Config con reglas personalizadas",
      "Amazon CloudWatch dashboards"
    ],
    correctas: [0],
    explicacion: "Trusted Advisor incluye una categoría de optimización de costos que detecta EC2 con baja utilización, EIPs sin asociar, balanceadores ociosos y RI mal aprovechadas. Con soporte Business se desbloquean todas las comprobaciones. Anomaly Detection alerta anomalías, Config evalúa cumplimiento, y CloudWatch no realiza estas comprobaciones de costo predefinidas."
  },
  {
    id: "saa-434",
    dominio: 4,
    tema: "Logs baratos",
    tipo: "multiple",
    enunciado: "Una aplicación retiene grandes volúmenes de logs para siempre en CloudWatch Logs y la factura se dispara. Solo se consultan con frecuencia los últimos 14 días; el resto se necesita rara vez para auditoría. ¿Qué dos acciones reducen el costo conservando el acceso esporádico al histórico? (Elegí 2)",
    opciones: [
      "Definir una política de retención corta en los grupos de CloudWatch Logs para el acceso reciente",
      "Entregar el histórico de logs a Amazon S3 y aplicar Lifecycle hacia S3 Glacier para auditoría a bajo costo",
      "Almacenar todos los logs en una base de datos Amazon RDS Multi-AZ",
      "Aumentar la retención de CloudWatch Logs a 'Never expire' para todos los grupos",
      "Replicar todos los logs a una segunda región para reducir el costo"
    ],
    correctas: [0, 1],
    explicacion: "Una retención corta en CloudWatch Logs limita el costo del almacenamiento caliente, y archivar el histórico en S3 con Lifecycle hacia Glacier conserva el acceso para auditoría a bajo costo. RDS es caro para logs, retener todo indefinidamente es lo que encarece la factura, y replicar a otra región suma costo en vez de reducirlo."
  },
  {
    id: "saa-435",
    dominio: 4,
    tema: "Spot interrupciones",
    tipo: "single",
    enunciado: "Una carga de inferencia por lotes corre en Spot y necesita guardar resultados parciales antes de perder una instancia para no rehacer trabajo. El equipo quiere reaccionar a tiempo cuando AWS va a reclamar la capacidad. ¿Qué mecanismo deben usar?",
    opciones: [
      "Escuchar la notificación de interrupción de Spot (Spot Instance interruption notice) de 2 minutos y guardar el progreso",
      "Aumentar el precio máximo de Spot para no ser interrumpidos nunca",
      "Configurar comprobaciones de salud del ELB cada 5 minutos",
      "Usar instancias On-Demand para evitar cualquier interrupción"
    ],
    correctas: [0],
    explicacion: "Spot emite una notificación de interrupción con 2 minutos de aviso (vía metadata/EventBridge) que la aplicación puede capturar para guardar checkpoints y evitar rehacer trabajo. Subir el precio máximo no evita interrupciones por capacidad, los health checks del ELB no avisan de reclamaciones de Spot, y pasar a On-Demand elimina el ahorro."
  },
  {
    id: "saa-436",
    dominio: 4,
    tema: "S3 One Zone-IA",
    tipo: "single",
    enunciado: "Un equipo genera miniaturas y datos derivados que pueden regenerarse fácilmente desde la fuente original si se pierden. Se accede a ellos con poca frecuencia. El objetivo es minimizar el costo de almacenamiento aceptando menor resiliencia ante la pérdida de una AZ. ¿Qué clase es la más adecuada?",
    opciones: [
      "S3 One Zone-IA",
      "S3 Standard-IA",
      "S3 Standard",
      "S3 Glacier Flexible Retrieval"
    ],
    correctas: [0],
    explicacion: "One Zone-IA cuesta menos que Standard-IA porque almacena los datos en una sola AZ; es ideal para datos recreables y de acceso infrecuente donde se acepta el riesgo de pérdida de una AZ. Standard y Standard-IA cuestan más por la redundancia multi-AZ, y Glacier añade latencia de recuperación innecesaria para datos que se acceden ocasionalmente."
  },
  {
    id: "saa-437",
    dominio: 4,
    tema: "Apagar ambientes dev/test",
    tipo: "multiple",
    enunciado: "Una empresa quiere recortar el costo de sus entornos de desarrollo y pruebas que solo se usan en horario de oficina. ¿Qué dos acciones reducen el gasto de forma efectiva sin afectar a producción? (Elegí 2)",
    opciones: [
      "Programar el apagado automático de instancias EC2 y RDS fuera del horario laboral con Instance Scheduler",
      "Eliminar snapshots y volúmenes EBS huérfanos de entornos de pruebas ya desmantelados",
      "Comprar Reserved Instances a 3 años para los entornos de desarrollo",
      "Migrar producción a instancias Spot para compensar el gasto",
      "Aumentar el tamaño de las instancias de desarrollo para terminar antes"
    ],
    correctas: [0, 1],
    explicacion: "Apagar EC2 y RDS de dev/test fuera de horario con Instance Scheduler y eliminar snapshots y volúmenes huérfanos recorta gasto directamente sin tocar producción. Comprar RI a 3 años para entornos efímeros es desperdicio, mover producción a Spot arriesga disponibilidad, y agrandar instancias de dev no reduce el costo."
  },
  {
    id: "saa-438",
    dominio: 4,
    tema: "Elegir lo más barato que cumpla",
    tipo: "single",
    enunciado: "Una cola de trabajos asíncronos procesa mensajes que pueden esperar minutos sin problema, son tolerantes a reintentos y su volumen es muy variable. El requisito es el menor costo posible de cómputo que cumpla con el procesamiento eventual. ¿Qué opción cumple el requisito al menor costo?",
    opciones: [
      "Procesar la cola con Lambda o Fargate Spot, escalando con la profundidad de la cola",
      "Mantener una flota EC2 On-Demand encendida 24/7 dimensionada para el pico",
      "Usar instancias EC2 con Reserved Instances dimensionadas para el pico",
      "Ejecutar un clúster ECS sobre Fargate estándar siempre activo al máximo de tareas"
    ],
    correctas: [0],
    explicacion: "Para trabajos asíncronos tolerantes a reintentos y de volumen variable, escalar con Lambda o Fargate Spot según la profundidad de la cola paga solo por el trabajo real y aprovecha precios Spot, cumpliendo el requisito al menor costo. Mantener flotas dimensionadas para el pico, sean On-Demand, RI o Fargate estándar, desperdicia capacidad."
  },
  {
    id: "saa-439",
    dominio: 4,
    tema: "RI/SP recommendations",
    tipo: "single",
    enunciado: "Antes de comprometerse con Savings Plans, el equipo de finanzas quiere una recomendación basada en su uso histórico que indique el monto de compromiso por hora óptimo y el ahorro estimado, comparando diferentes plazos y opciones de pago. ¿Dónde obtienen esta recomendación?",
    opciones: [
      "En las recomendaciones de Savings Plans de AWS Cost Explorer",
      "En AWS Budgets creando un presupuesto de utilización",
      "En AWS Pricing Calculator estimando manualmente",
      "En AWS Trusted Advisor categoría de tolerancia a fallos"
    ],
    correctas: [0],
    explicacion: "Cost Explorer genera recomendaciones de Savings Plans (y de RI) a partir del uso histórico, sugiriendo el compromiso horario óptimo, el plazo, la opción de pago y el ahorro estimado. Budgets controla umbrales, Pricing Calculator estima escenarios manuales sin analizar tu uso, y Trusted Advisor no recomienda SP por uso."
  },
  {
    id: "saa-440",
    dominio: 4,
    tema: "Consolidación serverless",
    tipo: "single",
    enunciado: "Una microaplicación con tráfico muy bajo e intermitente corre hoy sobre un clúster pequeño de EC2 con una base de datos siempre encendida, y el costo en reposo es desproporcionado. Se busca rediseñarla para pagar prácticamente cero cuando no hay tráfico. ¿Qué combinación serverless cumple mejor el objetivo de costo?",
    opciones: [
      "API Gateway con Lambda y Amazon DynamoDB en modo On-Demand",
      "EC2 con Reserved Instances y Amazon RDS Multi-AZ",
      "ECS sobre Fargate estándar siempre activo con Aurora provisionada",
      "EC2 con Auto Scaling mínimo 2 y RDS en una sola AZ"
    ],
    correctas: [0],
    explicacion: "API Gateway con Lambda escala a cero y solo cobra por solicitud, y DynamoDB On-Demand cobra por operación, de modo que en reposo el costo es prácticamente nulo, ideal para tráfico bajo e intermitente. Las opciones con EC2/RDS/Aurora provisionadas o Fargate siempre activo mantienen costo continuo en reposo."
  }
]);
