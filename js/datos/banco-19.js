window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-721",
    dominio: 4,
    tema: "Modelos de compra de cómputo",
    tipo: "single",
    enunciado: "Una empresa ejecuta una flota estable de instancias EC2 y contenedores en Fargate cuyo consumo no bajará en los próximos 3 años, pero el equipo planea migrar gradualmente de la familia m5 a m7g (Graviton) y cambiar tamaños de instancia con frecuencia. Quieren el mayor descuento posible manteniendo flexibilidad para cambiar de familia, tamaño, región y entre EC2 y Fargate sin perder el descuento. ¿Qué opción de compra deberían elegir?",
    opciones: [
      "Compute Savings Plan a 3 años con pago parcial por adelantado (partial upfront).",
      "EC2 Instance Savings Plan a 3 años atado a la familia m5 en una región.",
      "Reserved Instances Standard a 3 años por la familia m5.",
      "Spot Instances con una estrategia capacity-optimized."
    ],
    correctas: [0],
    explicacion: "El Compute Savings Plan ofrece el máximo descuento por compromiso de 3 años y aplica automáticamente a cualquier familia, tamaño, región, sistema operativo y también a Fargate y Lambda, así que el cambio a Graviton y los re-sizing no rompen el descuento. El EC2 Instance SP y las RI Standard quedan atados a la familia m5 y no cubren Fargate. Spot no garantiza la capacidad estable que necesita la flota."
  },
  {
    id: "saa-722",
    dominio: 4,
    tema: "EC2 Instance Savings Plan vs RI",
    tipo: "single",
    enunciado: "Un equipo correrá una base de datos sobre EC2 r6i en us-east-1 de forma continua durante 3 años. No cambiará de familia ni de región, solo ocasionalmente de tamaño dentro de la familia r6i. Buscan el descuento más alto posible. ¿Qué deberían comprar?",
    opciones: [
      "EC2 Instance Savings Plan a 3 años con todo por adelantado (all upfront).",
      "Compute Savings Plan a 1 año sin pago por adelantado.",
      "Reserved Instances Convertibles a 1 año.",
      "On-Demand Capacity Reservations sin Savings Plan."
    ],
    correctas: [0],
    explicacion: "El EC2 Instance Savings Plan atado a r6i en us-east-1 entrega un descuento equivalente al de las RI Standard (el mayor disponible) y permite cambiar de tamaño dentro de la familia y de SO sin perder el beneficio. El plazo de 3 años con all upfront maximiza el ahorro. El Compute SP a 1 año descuenta menos; las RI Convertibles a 1 año también; las Capacity Reservations no dan descuento por sí solas."
  },
  {
    id: "saa-723",
    dominio: 4,
    tema: "Spot capacity-optimized",
    tipo: "single",
    enunciado: "Una carga de procesamiento de imágenes por lotes es tolerante a interrupciones y debe minimizar tanto el costo como la frecuencia de interrupciones. El arquitecto configura un Auto Scaling Group con varios tipos de instancia y desea reducir las interrupciones eligiendo los pools de Spot con más capacidad disponible. ¿Qué estrategia de asignación de Spot debería usar?",
    opciones: [
      "capacity-optimized.",
      "lowest-price.",
      "On-Demand con prioridad.",
      "diversified estático sobre un único tipo de instancia."
    ],
    correctas: [0],
    explicacion: "La estrategia capacity-optimized lanza instancias Spot desde los pools con mayor capacidad disponible, lo que reduce la probabilidad de interrupción, ideal para batch tolerante a fallos. lowest-price minimiza el precio pero puede elegir pools poco profundos con más interrupciones. On-Demand no es Spot y un único tipo de instancia limita la diversificación de pools."
  },
  {
    id: "saa-724",
    dominio: 4,
    tema: "Gateway endpoint para S3",
    tipo: "single",
    enunciado: "Instancias EC2 en subredes privadas descargan terabytes diarios desde Amazon S3 dentro de la misma región. Hoy el tráfico sale por un NAT Gateway y la factura de procesamiento de datos del NAT es muy alta. ¿Cuál es la forma MÁS económica de mantener el acceso a S3 reduciendo ese costo?",
    opciones: [
      "Crear un Gateway VPC endpoint para S3 y enrutar el tráfico de S3 por él.",
      "Crear un Interface VPC endpoint (PrivateLink) para S3.",
      "Agregar más NAT Gateways en cada zona de disponibilidad.",
      "Mover las instancias a subredes públicas con IP elásticas."
    ],
    correctas: [0],
    explicacion: "El Gateway VPC endpoint para S3 no tiene cargo por hora ni por procesamiento de datos y permite que el tráfico a S3 evite por completo el NAT Gateway, eliminando sus costos de procesamiento. El Interface endpoint sí cobra por hora y por GB. Más NAT Gateways aumentan el costo y subredes públicas exponen las instancias innecesariamente."
  },
  {
    id: "saa-725",
    dominio: 4,
    tema: "S3 Intelligent-Tiering",
    tipo: "single",
    enunciado: "Un data lake recibe objetos cuyos patrones de acceso son impredecibles: algunos se consultan a diario durante meses y otros quedan inactivos por más de un año. El equipo no quiere administrar reglas de ciclo de vida ni arriesgarse a recuperaciones costosas, pero sí minimizar el costo de almacenamiento. ¿Qué clase de almacenamiento de S3 es la más adecuada?",
    opciones: [
      "S3 Intelligent-Tiering con los niveles de archivo (Archive Access y Deep Archive Access) habilitados.",
      "S3 Standard para todos los objetos.",
      "S3 Glacier Deep Archive para todos los objetos desde el inicio.",
      "S3 One Zone-IA para todos los objetos."
    ],
    correctas: [0],
    explicacion: "Intelligent-Tiering mueve objetos automáticamente entre niveles (frecuente, infrecuente, Archive Instant, Archive y Deep Archive) según el acceso real, sin cargos de recuperación entre los niveles de acceso y sin necesidad de reglas de ciclo de vida, ideal para patrones impredecibles. Standard no optimiza; Deep Archive penaliza el acceso frecuente; One Zone-IA reduce durabilidad y no se adapta solo."
  },
  {
    id: "saa-726",
    dominio: 4,
    tema: "Multipart incompletos y versiones",
    tipo: "multiple",
    enunciado: "Una cuenta tiene un bucket S3 con versionado activado cuya factura crece sin explicación clara. Tras analizar con S3 Storage Lens, se detecta gran volumen de cargas multipart incompletas y muchas versiones antiguas no actuales. ¿Qué acciones de ciclo de vida reducen el costo? (Elegí dos.)",
    opciones: [
      "Agregar una regla de ciclo de vida que aborte las cargas multipart incompletas después de 7 días.",
      "Agregar una regla que expire (elimine) las versiones no actuales después de un período definido.",
      "Deshabilitar el versionado para borrar de inmediato todas las versiones existentes.",
      "Habilitar Requester Pays para que los clientes paguen el almacenamiento.",
      "Activar S3 Transfer Acceleration en el bucket."
    ],
    correctas: [0, 1],
    explicacion: "Abortar las cargas multipart incompletas libera fragmentos que se siguen facturando, y expirar las versiones no actuales elimina copias antiguas que ocupan espacio. Deshabilitar el versionado no borra las versiones ya existentes. Requester Pays solo traslada el costo de transferencia/solicitudes, no el de almacenamiento. Transfer Acceleration es una función de velocidad de subida, no de ahorro."
  },
  {
    id: "saa-727",
    dominio: 4,
    tema: "Recursos huérfanos EIP",
    tipo: "single",
    enunciado: "Durante una auditoría de costos se descubren varias Elastic IP que aparecen en la factura. ¿Cuál es la causa más probable del cargo y la corrección más económica?",
    opciones: [
      "Las EIP están asignadas pero no asociadas a una instancia en ejecución; liberar las EIP no usadas elimina el cargo.",
      "Las EIP están asociadas a instancias activas; AWS siempre cobra por EIP en uso.",
      "El cargo proviene de transferencia de datos entrante; hay que crear un NAT Gateway.",
      "Es imposible eliminar el cargo sin migrar a IPv6 en todas las subredes."
    ],
    correctas: [0],
    explicacion: "AWS cobra por las Elastic IP que están asignadas a la cuenta pero no asociadas a una instancia en ejecución (o asociadas a recursos detenidos). Liberar las EIP huérfanas detiene el cargo. Las EIP correctamente asociadas a una instancia en ejecución tradicionalmente eran gratuitas. El cargo no viene de transferencia entrante y no requiere migrar a IPv6."
  },
  {
    id: "saa-728",
    dominio: 4,
    tema: "EBS gp3 vs gp2",
    tipo: "single",
    enunciado: "Una empresa tiene cientos de volúmenes EBS gp2 que rara vez superan 3.000 IOPS, pero paga por más capacidad de la que necesita porque el rendimiento de gp2 está atado al tamaño del volumen. Quiere reducir costos sin perder rendimiento. ¿Qué recomendación aplica?",
    opciones: [
      "Migrar los volúmenes a gp3, que ofrece 3.000 IOPS y 125 MB/s de base independientes del tamaño y cuesta menos por GB.",
      "Migrar todos los volúmenes a io2 Block Express para garantizar latencia.",
      "Migrar a volúmenes magnéticos estándar (st1) para reducir el costo por GB.",
      "Aumentar el tamaño de cada volumen gp2 para conseguir más IOPS."
    ],
    correctas: [0],
    explicacion: "gp3 cuesta aproximadamente 20% menos por GB que gp2 e incluye 3.000 IOPS y 125 MB/s de base sin importar el tamaño, desacoplando rendimiento y capacidad, justo lo que necesitan. io2 Block Express es más caro y orientado a IOPS muy altas. st1 es para throughput secuencial, no para esta carga. Agrandar gp2 incrementa el costo innecesariamente."
  },
  {
    id: "saa-729",
    dominio: 4,
    tema: "Aurora Serverless v2",
    tipo: "single",
    enunciado: "Una aplicación interna tiene tráfico de base de datos muy variable: picos durante el horario laboral y casi nada de noche y fines de semana. El equipo no quiere aprovisionar para el pico ni administrar el escalado manualmente, y desea pagar en función de la capacidad realmente usada. ¿Qué opción de base de datos es la más rentable?",
    opciones: [
      "Amazon Aurora Serverless v2, que escala la capacidad de cómputo de forma fina según la demanda.",
      "Aurora aprovisionado dimensionado para el pico máximo todo el tiempo.",
      "Una instancia RDS Multi-AZ db.r6g.4xlarge encendida 24/7.",
      "DynamoDB con capacidad provisionada fija."
    ],
    correctas: [0],
    explicacion: "Aurora Serverless v2 ajusta la capacidad (ACUs) de forma granular y casi instantánea según la carga, por lo que se paga por lo usado y se evita aprovisionar para el pico durante las horas valle. Aurora aprovisionado para el pico desperdicia recursos de noche. La instancia RDS fija cuesta lo mismo aunque esté ociosa. DynamoDB cambia el modelo de datos y no es la comparación directa aquí."
  },
  {
    id: "saa-730",
    dominio: 4,
    tema: "Instance Scheduler dev/test",
    tipo: "single",
    enunciado: "El entorno de desarrollo y pruebas usa decenas de instancias EC2 y bases RDS que solo se necesitan de lunes a viernes de 8 a 20 horas, pero hoy corren 24/7. ¿Cuál es la manera más simple y económica de reducir su costo sin reescribir aplicaciones?",
    opciones: [
      "Implementar AWS Instance Scheduler para detener e iniciar automáticamente EC2 y RDS según un horario.",
      "Comprar Reserved Instances a 3 años para todas las instancias de dev/test.",
      "Migrar todo dev/test a Spot sin reintentos.",
      "Reducir el tamaño de cada instancia a la mitad."
    ],
    correctas: [0],
    explicacion: "AWS Instance Scheduler arranca y detiene recursos EC2 y RDS según un calendario, eliminando el costo de cómputo durante las horas y días en que el entorno no se usa, sin cambios de aplicación. Comprar RI a 3 años para recursos que pueden apagarse desperdicia el compromiso. Spot no es ideal para dev/test interactivo y reducir tamaño no aprovecha que el entorno está totalmente ocioso de noche."
  },
  {
    id: "saa-731",
    dominio: 4,
    tema: "Cost Anomaly Detection",
    tipo: "single",
    enunciado: "El equipo de finanzas quiere recibir alertas automáticas cuando el gasto de un servicio se dispare de forma inusual, usando aprendizaje automático y sin tener que definir umbrales fijos manualmente. ¿Qué servicio cubre este requerimiento?",
    opciones: [
      "AWS Cost Anomaly Detection.",
      "AWS Budgets con un presupuesto de costo fijo.",
      "Amazon CloudWatch billing alarm con un umbral estático.",
      "AWS Trusted Advisor."
    ],
    correctas: [0],
    explicacion: "AWS Cost Anomaly Detection usa machine learning para aprender los patrones de gasto y avisar sobre desviaciones anómalas sin requerir umbrales manuales. AWS Budgets y las alarmas de facturación de CloudWatch requieren definir umbrales fijos. Trusted Advisor ofrece recomendaciones de optimización pero no detección de anomalías por ML."
  },
  {
    id: "saa-732",
    dominio: 4,
    tema: "AWS Budgets con acciones",
    tipo: "single",
    enunciado: "Una organización quiere no solo recibir una alerta cuando un presupuesto se exceda, sino aplicar automáticamente una política IAM restrictiva o detener instancias EC2 cuando se supere el umbral. ¿Qué función cumple esto?",
    opciones: [
      "AWS Budgets Actions.",
      "AWS Cost Explorer.",
      "AWS Cost and Usage Report (CUR).",
      "AWS Compute Optimizer."
    ],
    correctas: [0],
    explicacion: "AWS Budgets Actions permite ejecutar acciones automáticas (aplicar una SCP/política IAM, detener instancias EC2 o RDS) cuando un presupuesto cruza un umbral definido, lo que ayuda a frenar el gasto. Cost Explorer y el CUR son herramientas de análisis y reporte; Compute Optimizer recomienda right-sizing pero no toma acciones de presupuesto."
  },
  {
    id: "saa-733",
    dominio: 4,
    tema: "Graviton y Compute Optimizer",
    tipo: "single",
    enunciado: "Un servicio web stateless corre sobre instancias EC2 m5 con CPU subutilizada. El arquitecto quiere reducir el costo mejorando la relación precio-rendimiento y recibir recomendaciones automáticas de qué tipo de instancia conviene. ¿Qué combinación es la más adecuada?",
    opciones: [
      "Usar AWS Compute Optimizer para right-sizing y migrar a instancias Graviton (m7g) compatibles con la carga.",
      "Aumentar el tamaño de las instancias m5 para tener margen.",
      "Migrar a instancias de la familia de cómputo más grande disponible.",
      "Dejar la flota igual y comprar RI a 3 años sobre m5."
    ],
    correctas: [0],
    explicacion: "Compute Optimizer analiza métricas de uso y recomienda el right-sizing óptimo, incluyendo migrar a Graviton (m7g), que ofrece mejor precio-rendimiento que las equivalentes x86. Para una carga stateless con CPU ociosa, achicar/migrar a Graviton reduce el costo. Aumentar el tamaño o ir a la familia más grande agrava el desperdicio, y comprar RI sobre instancias sobredimensionadas fija el sobrecosto."
  },
  {
    id: "saa-734",
    dominio: 4,
    tema: "Spot Fleet attribute-based",
    tipo: "single",
    enunciado: "Un pipeline de CI/CD lanza miles de jobs cortos y tolerantes a interrupción. El equipo quiere maximizar el acceso a capacidad Spot barata sin tener que enumerar manualmente decenas de tipos de instancia, especificando en cambio requisitos como número mínimo de vCPU y memoria. ¿Qué función debe usar?",
    opciones: [
      "Selección de instancias basada en atributos (attribute-based instance selection) en el Auto Scaling Group o Spot Fleet.",
      "Especificar un único tipo de instancia con la estrategia lowest-price.",
      "On-Demand Capacity Reservations para los jobs.",
      "Reserved Instances Convertibles para CI/CD."
    ],
    correctas: [0],
    explicacion: "La selección basada en atributos permite definir requisitos (vCPU, memoria, arquitectura, etc.) y deja que AWS elija automáticamente entre todos los tipos de instancia que cumplen, ampliando los pools de Spot disponibles y reduciendo interrupciones y costo. Un único tipo limita los pools; las Capacity Reservations y las RI no aplican a cargas Spot efímeras."
  },
  {
    id: "saa-735",
    dominio: 4,
    tema: "DynamoDB on-demand vs provisioned",
    tipo: "single",
    enunciado: "Una nueva aplicación tiene tráfico totalmente impredecible y puede pasar largos períodos sin solicitudes y luego picos repentinos. El equipo no quiere aprovisionar capacidad ni gestionar auto scaling, y prefiere pagar solo por solicitud. ¿Qué modo de capacidad de DynamoDB es el más rentable inicialmente?",
    opciones: [
      "On-demand (pago por solicitud).",
      "Provisioned con capacidad fija alta para cubrir picos.",
      "Provisioned con auto scaling y un mínimo elevado.",
      "Reserved Capacity a 3 años."
    ],
    correctas: [0],
    explicacion: "El modo on-demand cobra por solicitud y escala instantáneamente desde cero, ideal para tráfico impredecible o intermitente sin tener que estimar capacidad. Provisioned con capacidad fija alta paga aunque no haya tráfico; auto scaling con mínimo elevado también sostiene un piso de costo; Reserved Capacity solo conviene con tráfico estable y predecible muy alto."
  },
  {
    id: "saa-736",
    dominio: 4,
    tema: "Organizations consolidated billing",
    tipo: "multiple",
    enunciado: "Una empresa con muchas cuentas AWS en AWS Organizations quiere reducir su factura agregada aprovechando descuentos por volumen y compartiendo el beneficio de sus compromisos. ¿Qué beneficios de la facturación consolidada y el sharing de SP/RI aplican? (Elegí dos.)",
    opciones: [
      "El uso agregado de todas las cuentas se combina para alcanzar niveles de precios por volumen más bajos.",
      "Los Savings Plans y las Reserved Instances no usados en una cuenta pueden aplicarse al uso de otras cuentas de la organización.",
      "Cada cuenta debe comprar sus propios SP/RI sin posibilidad de compartirlos.",
      "La facturación consolidada elimina por completo los cargos de transferencia de datos entre cuentas.",
      "Habilitar Organizations otorga automáticamente Reserved Instances gratuitas a cada cuenta."
    ],
    correctas: [0, 1],
    explicacion: "Con la facturación consolidada, el uso de todas las cuentas se suma para alcanzar tramos de precios por volumen y los Savings Plans y RI con sharing activado se aplican al uso de cualquier cuenta de la organización, mejorando la utilización del compromiso. No es obligatorio que cada cuenta compre por separado; la facturación consolidada no elimina los cargos de transferencia entre cuentas ni regala RI."
  },
  {
    id: "saa-737",
    dominio: 4,
    tema: "Logs y backup baratos",
    tipo: "single",
    enunciado: "Una empresa debe conservar logs de auditoría durante 7 años por cumplimiento. Los logs casi nunca se consultan y, cuando se necesitan, una espera de varias horas para recuperarlos es aceptable. ¿Cuál es el almacenamiento más económico para esta retención a largo plazo?",
    opciones: [
      "Amazon S3 Glacier Deep Archive.",
      "Amazon S3 Standard.",
      "Amazon S3 Standard-IA.",
      "Amazon EBS gp3."
    ],
    correctas: [0],
    explicacion: "S3 Glacier Deep Archive es la clase de menor costo de almacenamiento de AWS, pensada para datos que se conservan años y rara vez se acceden, con tiempos de recuperación de horas (aceptables aquí). S3 Standard y Standard-IA cuestan mucho más por GB para retención de 7 años, y EBS es almacenamiento de bloque persistente y caro para archivado."
  },
  {
    id: "saa-738",
    dominio: 4,
    tema: "CloudFront para reducir egress",
    tipo: "single",
    enunciado: "Un sitio sirve grandes volúmenes de imágenes y videos estáticos directamente desde S3 a usuarios globales, y el costo de transferencia de datos saliente de S3 es elevado. ¿Qué cambio reduce el costo de egress y mejora la latencia?",
    opciones: [
      "Servir el contenido a través de Amazon CloudFront con S3 como origen.",
      "Habilitar S3 Transfer Acceleration en el bucket.",
      "Mover el bucket a S3 One Zone-IA.",
      "Crear un Interface VPC endpoint para S3."
    ],
    correctas: [0],
    explicacion: "CloudFront cachea el contenido en ubicaciones de borde, reduce los accesos al origen y su transferencia saliente suele ser más barata que el egress directo de S3, además de mejorar la latencia global. Transfer Acceleration optimiza subidas, no abarata el egress; One Zone-IA cambia durabilidad/costo de almacenamiento pero no el egress a Internet; un Interface endpoint es para tráfico interno de la VPC."
  },
  {
    id: "saa-739",
    dominio: 4,
    tema: "Snapshots y volúmenes huérfanos",
    tipo: "multiple",
    enunciado: "Una revisión de costos con AWS Trusted Advisor identifica recursos de almacenamiento desperdiciados. ¿Qué acciones reducen costos eliminando recursos ociosos sin afectar cargas en producción? (Elegí dos.)",
    opciones: [
      "Eliminar volúmenes EBS no asociados (unattached) que ya no se usan.",
      "Borrar snapshots EBS antiguos y redundantes que no se necesitan para recuperación.",
      "Eliminar todos los snapshots, incluso los que respaldan AMIs en uso.",
      "Detener todas las instancias EC2 de producción para ahorrar.",
      "Convertir todos los volúmenes gp3 a io2 para 'optimizar'."
    ],
    correctas: [0, 1],
    explicacion: "Los volúmenes EBS no asociados se siguen facturando aunque no estén en uso, y los snapshots redundantes acumulan costo de almacenamiento; eliminar ambos ahorra sin impacto en producción. Borrar snapshots que respaldan AMIs en uso rompería el despliegue; detener producción afecta el servicio; y migrar gp3 a io2 aumenta el costo en vez de reducirlo."
  },
  {
    id: "saa-740",
    dominio: 4,
    tema: "Storage Class Analysis",
    tipo: "single",
    enunciado: "Antes de crear reglas de ciclo de vida para mover objetos de S3 Standard a una clase infrecuente, el equipo quiere datos sobre los patrones de acceso para decidir cuándo conviene la transición. ¿Qué función de S3 provee esa información?",
    opciones: [
      "S3 Storage Class Analysis.",
      "S3 Requester Pays.",
      "S3 Object Lock.",
      "S3 Replication Time Control."
    ],
    correctas: [0],
    explicacion: "S3 Storage Class Analysis observa los patrones de acceso a los objetos y recomienda cuándo transicionarlos a S3 Standard-IA, ayudando a definir reglas de ciclo de vida basadas en datos reales. Requester Pays traslada costos al solicitante; Object Lock es para retención WORM; Replication Time Control es para SLA de replicación, no para análisis de acceso."
  },
  {
    id: "saa-741",
    dominio: 4,
    tema: "Fargate Spot",
    tipo: "single",
    enunciado: "Un conjunto de workers de cola de mensajes corre en Amazon ECS sobre Fargate. Las tareas son sin estado y tolerantes a interrupción. El equipo quiere reducir hasta un 70% el costo de cómputo de estas tareas. ¿Qué opción aplica?",
    opciones: [
      "Ejecutar las tareas con la capacidad Fargate Spot.",
      "Usar Fargate estándar con más vCPU por tarea.",
      "Migrar las tareas a instancias EC2 On-Demand grandes.",
      "Comprar Reserved Instances para Fargate."
    ],
    correctas: [0],
    explicacion: "Fargate Spot ofrece descuentos de hasta ~70% para tareas sin estado y tolerantes a interrupción, exactamente el perfil de estos workers de cola que pueden reintentar. Fargate estándar con más vCPU sube el costo; migrar a EC2 On-Demand pierde la simplicidad serverless; y no existen RI específicas de Fargate (se cubre con Compute Savings Plans, no RI)."
  },
  {
    id: "saa-742",
    dominio: 4,
    tema: "Cost allocation tags",
    tipo: "single",
    enunciado: "Una empresa con múltiples equipos quiere asignar y reportar costos por proyecto y centro de costos en Cost Explorer y en el Cost and Usage Report, filtrando el gasto por estas dimensiones. ¿Qué deben configurar?",
    opciones: [
      "Etiquetas de asignación de costos (cost allocation tags) activadas en la consola de facturación.",
      "Múltiples cuentas AWS separadas por cada proyecto sin etiquetas.",
      "AWS Config rules para cada recurso.",
      "Solo etiquetas técnicas sin activarlas para facturación."
    ],
    correctas: [0],
    explicacion: "Las cost allocation tags (definidas por el usuario o gestionadas por AWS) deben activarse en la consola de facturación para que aparezcan como dimensiones en Cost Explorer y en el CUR, permitiendo desglosar el gasto por proyecto y centro de costos. Crear cuentas separadas es más pesado; AWS Config no asigna costos; y las etiquetas no activadas para facturación no se reflejan en los reportes de costo."
  },
  {
    id: "saa-743",
    dominio: 4,
    tema: "Cross-AZ data transfer",
    tipo: "single",
    enunciado: "Una aplicación distribuye réplicas de un servicio en tres zonas de disponibilidad y genera mucho tráfico entre instancias que viven en AZ distintas, lo que aumenta la factura por transferencia entre zonas. Sin sacrificar disponibilidad de manera inaceptable, ¿qué enfoque reduce ese costo de transferencia cross-AZ?",
    opciones: [
      "Usar enrutamiento con preferencia de zona para que los servicios se comuniquen preferentemente dentro de la misma AZ cuando sea posible.",
      "Mover todas las instancias a una sola AZ para eliminar el tráfico cross-AZ por completo.",
      "Reemplazar el tráfico interno por llamadas a través de Internet pública.",
      "Habilitar un NAT Gateway por AZ para abaratar el tráfico interno."
    ],
    correctas: [0],
    explicacion: "El tráfico entre AZ se factura por GB en ambos sentidos; preferir la comunicación dentro de la misma AZ (por ejemplo con topology-aware o zonal routing) reduce ese costo manteniendo redundancia entre zonas. Colapsar todo en una AZ elimina la transferencia pero sacrifica la alta disponibilidad de forma inaceptable; salir a Internet es más caro e inseguro; y un NAT Gateway no abarata el tráfico interno, lo encarece."
  },
  {
    id: "saa-744",
    dominio: 4,
    tema: "ELB ocioso",
    tipo: "single",
    enunciado: "Durante una auditoría se descubre un Application Load Balancer que no tiene ningún target sano registrado desde hace meses y no recibe tráfico, pero sigue facturando horas de balanceador y LCUs. ¿Cuál es la acción más económica?",
    opciones: [
      "Eliminar el load balancer ocioso si ya no se necesita.",
      "Cambiar el ALB por un Network Load Balancer manteniéndolo encendido.",
      "Agregar más reglas de listener para 'aprovecharlo'.",
      "Convertir el ALB en un Gateway Load Balancer."
    ],
    correctas: [0],
    explicacion: "Un load balancer cobra por hora de funcionamiento aunque no reciba tráfico ni tenga targets sanos; eliminar el recurso ocioso detiene ese costo. Cambiar a NLB o GWLB o agregar reglas no resuelve el desperdicio si el balanceador no se usa: la opción correcta es borrarlo cuando ya no se necesita."
  },
  {
    id: "saa-745",
    dominio: 4,
    tema: "Lambda escala a cero",
    tipo: "single",
    enunciado: "Una API interna recibe tráfico esporádico, con muchas horas sin ninguna solicitud durante la noche. Hoy corre en una instancia EC2 t3.medium encendida 24/7 que está casi siempre ociosa. El equipo quiere pagar solo cuando hay solicitudes. ¿Qué arquitectura es la más rentable?",
    opciones: [
      "Reimplementar la API en AWS Lambda detrás de Amazon API Gateway.",
      "Mantener la t3.medium pero comprar una RI a 3 años.",
      "Migrar a una instancia más grande con auto scaling.",
      "Poner la t3.medium detrás de un ALB."
    ],
    correctas: [0],
    explicacion: "Lambda con API Gateway cobra por invocación y duración, escalando a cero cuando no hay tráfico, lo que elimina el costo durante las horas ociosas de noche, ideal para una API esporádica. Comprar RI fija el costo de una instancia que está ociosa la mayor parte del tiempo; agrandar la instancia o agregar un ALB aumenta el gasto sin resolver la subutilización."
  },
  {
    id: "saa-746",
    dominio: 4,
    tema: "Interface endpoint vs NAT",
    tipo: "single",
    enunciado: "Instancias en subredes privadas necesitan invocar la API de Amazon SQS y de AWS Systems Manager. Hoy el tráfico sale por un NAT Gateway con un costo de procesamiento considerable. SQS y SSM no soportan Gateway endpoints. ¿Qué opción reduce el costo manteniendo el acceso privado?",
    opciones: [
      "Crear Interface VPC endpoints (PrivateLink) para SQS y SSM y dejar de enrutar ese tráfico por el NAT Gateway.",
      "Crear Gateway VPC endpoints para SQS y SSM.",
      "Mover las instancias a subredes públicas.",
      "Aumentar el ancho de banda del NAT Gateway."
    ],
    correctas: [0],
    explicacion: "Para servicios que no ofrecen Gateway endpoint (como SQS y SSM), los Interface endpoints de PrivateLink permiten el acceso privado y evitan el procesamiento de datos del NAT Gateway; aunque el Interface endpoint tiene su propio costo por hora y por GB, suele ser menor que el del NAT cuando el tráfico es alto. Gateway endpoints solo existen para S3 y DynamoDB; mover a subredes públicas reduce seguridad y el NAT no tiene 'ancho de banda' ajustable que abarate el procesamiento."
  },
  {
    id: "saa-747",
    dominio: 4,
    tema: "Cost Explorer recomendaciones de RI/SP",
    tipo: "single",
    enunciado: "El equipo financiero quiere saber, con base en el uso histórico, cuántos Savings Plans o Reserved Instances comprar y qué ahorro estimado obtendría. ¿Qué herramienta de AWS entrega estas recomendaciones de compra?",
    opciones: [
      "Las recomendaciones de Savings Plans y RI dentro de AWS Cost Explorer.",
      "AWS CloudTrail.",
      "Amazon CloudWatch Logs Insights.",
      "AWS Config."
    ],
    correctas: [0],
    explicacion: "Cost Explorer incluye recomendaciones de Savings Plans y Reserved Instances calculadas a partir del uso histórico, indicando el compromiso sugerido y el ahorro estimado. CloudTrail registra llamadas a la API, CloudWatch Logs Insights analiza logs y AWS Config evalúa configuración; ninguno genera recomendaciones de compra de compromisos."
  },
  {
    id: "saa-748",
    dominio: 4,
    tema: "Convertible vs Standard RI",
    tipo: "single",
    enunciado: "Una empresa quiere comprometer cómputo EC2 a 3 años para obtener descuento, pero anticipa que durante ese período podría cambiar de familia de instancia a medida que evolucionan sus cargas. Prioriza la flexibilidad de intercambio por encima del máximo descuento absoluto y prefiere RI antes que Savings Plans por razones de su política interna. ¿Qué tipo de RI deberían comprar?",
    opciones: [
      "Reserved Instances Convertibles a 3 años.",
      "Reserved Instances Standard a 3 años.",
      "Reserved Instances Standard a 1 año.",
      "Scheduled Reserved Instances."
    ],
    correctas: [0],
    explicacion: "Las RI Convertibles permiten intercambiar por RI de otra familia, tamaño, SO o tenancy durante el plazo, ofreciendo la flexibilidad que necesitan a cambio de un descuento algo menor que las Standard. Las RI Standard dan más descuento pero no permiten cambiar de familia; la de 1 año descuenta menos y las Scheduled RI son un producto en desuso para ventanas horarias específicas."
  },
  {
    id: "saa-749",
    dominio: 4,
    tema: "Right-sizing antes de comprometer",
    tipo: "single",
    enunciado: "Antes de comprar Savings Plans para una flota EC2, un arquitecto nota que muchas instancias están sobredimensionadas con menos del 10% de uso de CPU sostenido. ¿Cuál es la secuencia más rentable?",
    opciones: [
      "Hacer right-sizing de las instancias sobredimensionadas primero y luego comprar Savings Plans sobre la flota optimizada.",
      "Comprar Savings Plans de inmediato sobre la flota actual para 'asegurar' el descuento.",
      "Comprar RI Standard a 3 años sobre los tamaños actuales.",
      "Aumentar el tamaño de las instancias para que el uso de CPU se vea más alto."
    ],
    correctas: [0],
    explicacion: "Comprometerse antes de optimizar fija el costo del sobredimensionamiento; lo correcto es primero hacer right-sizing (con Compute Optimizer) y luego comprar Savings Plans o RI sobre la base ya reducida, maximizando el ahorro real. Comprar SP/RI primero o agrandar las instancias consolida el desperdicio en lugar de eliminarlo."
  },
  {
    id: "saa-750",
    dominio: 4,
    tema: "S3 Lifecycle transición y expiración",
    tipo: "single",
    enunciado: "Los logs de aplicación se escriben en S3 Standard. Se acceden mucho durante 30 días, esporádicamente hasta los 90 días, casi nunca hasta el año, y luego ya no se necesitan. Se quiere minimizar el costo de almacenamiento automáticamente. ¿Qué regla de ciclo de vida es la más adecuada?",
    opciones: [
      "Transición a Standard-IA a los 30 días, a Glacier Flexible Retrieval a los 90 días y expiración (eliminación) a los 365 días.",
      "Mantener todo en S3 Standard indefinidamente.",
      "Transición directa a Deep Archive el día 1 sin posibilidad de acceso rápido.",
      "Expirar los objetos a los 30 días para no pagar nada después."
    ],
    correctas: [0],
    explicacion: "Una regla escalonada que transiciona a Standard-IA a los 30 días, a Glacier a los 90 y expira a los 365 alinea el costo de cada clase con el patrón de acceso decreciente y elimina los datos cuando dejan de necesitarse. Mantener todo en Standard es caro; ir a Deep Archive el día 1 impide el acceso frecuente inicial; y expirar a los 30 días borraría datos aún necesarios."
  },
  {
    id: "saa-751",
    dominio: 4,
    tema: "Requester Pays",
    tipo: "single",
    enunciado: "Una organización publica grandes datasets en S3 para que socios externos los descarguen. No quiere absorber el costo de las solicitudes ni de la transferencia de datos saliente generada por esas descargas, sino que cada socio pague por lo que descarga. ¿Qué función debe habilitar?",
    opciones: [
      "S3 Requester Pays en el bucket.",
      "S3 Transfer Acceleration.",
      "CloudFront con OAC.",
      "S3 Intelligent-Tiering."
    ],
    correctas: [0],
    explicacion: "Con Requester Pays, quien realiza la solicitud (el socio autenticado) paga por las solicitudes y la transferencia de datos saliente, trasladando ese costo al consumidor del dato. El dueño del bucket sigue pagando solo el almacenamiento. Transfer Acceleration, CloudFront e Intelligent-Tiering no trasladan el costo de egress al solicitante."
  },
  {
    id: "saa-752",
    dominio: 4,
    tema: "Savings Plan upfront options",
    tipo: "single",
    enunciado: "Una empresa decidió comprar un Compute Savings Plan a 1 año y quiere obtener el mayor descuento posible por ese plazo, y tiene el capital disponible para pagar por adelantado. ¿Qué opción de pago maximiza el ahorro?",
    opciones: [
      "All upfront (todo por adelantado).",
      "No upfront (sin pago inicial).",
      "Partial upfront pagando el 10%.",
      "Pago mensual sin compromiso."
    ],
    correctas: [0],
    explicacion: "Dentro de un mismo plazo y tipo de Savings Plan, la opción All upfront ofrece el mayor descuento, seguida de Partial upfront y luego No upfront. Como la empresa tiene capital disponible, pagar todo por adelantado maximiza el ahorro. 'Pago mensual sin compromiso' es esencialmente On-Demand, sin descuento."
  },
  {
    id: "saa-753",
    dominio: 4,
    tema: "Storage Lens",
    tipo: "single",
    enunciado: "Una organización con cientos de buckets S3 en muchas cuentas quiere una vista centralizada de las métricas de uso y actividad de almacenamiento, con recomendaciones para reducir costos (por ejemplo, detectar buckets sin reglas de ciclo de vida o con muchas versiones). ¿Qué herramienta provee esta visibilidad a escala de organización?",
    opciones: [
      "Amazon S3 Storage Lens.",
      "S3 Inventory por bucket individual.",
      "AWS Trusted Advisor solamente.",
      "Amazon CloudWatch metrics por bucket."
    ],
    correctas: [0],
    explicacion: "S3 Storage Lens entrega visibilidad de toda la organización sobre el uso y la actividad de almacenamiento, con paneles y recomendaciones para optimizar costos (multipart incompletos, versiones, falta de lifecycle). S3 Inventory lista objetos por bucket pero no agrega métricas de toda la organización; Trusted Advisor y las métricas de CloudWatch no ofrecen el mismo análisis centralizado de S3."
  },
  {
    id: "saa-754",
    dominio: 4,
    tema: "Direct Connect data transfer",
    tipo: "single",
    enunciado: "Una empresa transfiere grandes volúmenes de datos entre su data center y AWS sobre Internet, y la tarifa de transferencia de datos saliente de AWS hacia Internet es alta. Buscan reducir ese costo de transferencia para un volumen elevado y sostenido. ¿Qué opción es la más adecuada?",
    opciones: [
      "Establecer una conexión AWS Direct Connect, cuya tarifa de transferencia de datos saliente es menor que la de Internet.",
      "Aumentar el ancho de banda de la VPN sobre Internet.",
      "Usar S3 Transfer Acceleration para todas las transferencias.",
      "Enrutar el tráfico saliente a través de un NAT Gateway."
    ],
    correctas: [0],
    explicacion: "Direct Connect ofrece una tarifa de transferencia de datos saliente (DTO) más baja que la salida a Internet y un rendimiento consistente, lo que reduce el costo para volúmenes altos y sostenidos. Ampliar la VPN sigue usando Internet con su tarifa más alta; Transfer Acceleration es para subidas a S3 y no abarata la salida; el NAT Gateway encarece el tráfico saliente."
  },
  {
    id: "saa-755",
    dominio: 4,
    tema: "Spot vs On-Demand arquitectura",
    tipo: "single",
    enunciado: "Una aplicación web tiene una base de carga constante que debe estar siempre disponible y picos variables tolerantes a interrupción. El arquitecto quiere minimizar el costo total sin comprometer la disponibilidad de la base. ¿Qué combinación es la más rentable?",
    opciones: [
      "Cubrir la base con Savings Plans/On-Demand y los picos elásticos con Spot en un Auto Scaling Group mixto.",
      "Ejecutar absolutamente todo en Spot, incluida la base de carga.",
      "Ejecutar todo en On-Demand sin Spot ni Savings Plans.",
      "Comprar RI Standard para cubrir incluso los picos máximos."
    ],
    correctas: [0],
    explicacion: "Lo más rentable es cubrir la base estable con un compromiso (Savings Plans u On-Demand) para garantizar disponibilidad y atender los picos tolerantes a interrupción con Spot mediante un grupo de capacidad mixta, capturando descuentos sin arriesgar la base. Poner todo en Spot pone en riesgo la base; todo On-Demand desperdicia ahorro; y comprar RI para el pico máximo paga capacidad que casi nunca se usa."
  },
  {
    id: "saa-756",
    dominio: 4,
    tema: "Trusted Advisor optimización",
    tipo: "multiple",
    enunciado: "El equipo de operaciones quiere usar AWS Trusted Advisor para encontrar oportunidades de ahorro. ¿Qué tipos de hallazgos de optimización de costos puede reportar Trusted Advisor? (Elegí dos.)",
    opciones: [
      "Instancias EC2 con baja utilización (idle/underutilized).",
      "Reserved Instances u oportunidades de compromiso que podrían reducir el costo.",
      "El precio Spot exacto que tendrá cada pool la próxima semana.",
      "La factura detallada por etiqueta de centro de costos.",
      "Recomendaciones de qué consultas SQL optimizar en la aplicación."
    ],
    correctas: [0, 1],
    explicacion: "Trusted Advisor incluye chequeos de optimización de costos como instancias EC2 ociosas o subutilizadas y oportunidades de Reserved Instances/Savings Plans. No predice precios Spot futuros, no entrega el desglose por etiqueta (eso es Cost Explorer/CUR con cost allocation tags) ni analiza consultas SQL de la aplicación."
  },
  {
    id: "saa-757",
    dominio: 4,
    tema: "S3 Intelligent-Tiering Archive Instant",
    tipo: "single",
    enunciado: "Un repositorio de imágenes médicas almacena objetos en S3 Intelligent-Tiering. Algunos no se acceden durante más de 90 días, pero cuando se necesitan deben recuperarse en milisegundos, sin esperas de horas. ¿Qué nivel de Intelligent-Tiering satisface esto al menor costo?",
    opciones: [
      "El nivel Archive Instant Access.",
      "El nivel Deep Archive Access.",
      "El nivel Archive Access.",
      "S3 Glacier Deep Archive fuera de Intelligent-Tiering."
    ],
    correctas: [0],
    explicacion: "El nivel Archive Instant Access de Intelligent-Tiering ofrece un costo de almacenamiento bajo para objetos poco accedidos (más de 90 días) pero con recuperación en milisegundos, ideal cuando no se toleran esperas. Archive Access y Deep Archive Access reducen más el costo pero requieren restauración de minutos a horas, lo que no cumple el requisito de acceso inmediato."
  },
  {
    id: "saa-758",
    dominio: 4,
    tema: "On-Demand Capacity Reservations vs descuento",
    tipo: "single",
    enunciado: "Un equipo necesita garantizar que tendrá capacidad EC2 disponible en una AZ específica para un evento crítico, pero solo por unas semanas, y NO busca un descuento de largo plazo. ¿Qué opción cubre la garantía de capacidad sin un compromiso de descuento prolongado?",
    opciones: [
      "On-Demand Capacity Reservations en la AZ requerida, sin Savings Plan.",
      "Reserved Instances Standard a 3 años.",
      "Spot Instances con capacity-optimized.",
      "Compute Savings Plan a 3 años all upfront."
    ],
    correctas: [0],
    explicacion: "Las On-Demand Capacity Reservations reservan capacidad en una AZ específica por el tiempo que se necesite, sin obligar a un compromiso de descuento de 1 o 3 años, justo para un evento corto. Las RI a 3 años y el Compute SP a 3 años son compromisos largos innecesarios; Spot no garantiza capacidad. (Una Capacity Reservation puede combinarse con un Savings Plan para descuento, pero no se requiere aquí.)"
  },
  {
    id: "saa-759",
    dominio: 4,
    tema: "S3 One Zone-IA",
    tipo: "single",
    enunciado: "Una empresa almacena copias secundarias de datos que pueden regenerarse fácilmente desde la fuente original si se perdieran. Se acceden con poca frecuencia y se quiere minimizar el costo de almacenamiento, aceptando una durabilidad menor por estar en una sola zona de disponibilidad. ¿Qué clase de S3 es la más rentable para este caso?",
    opciones: [
      "S3 One Zone-IA.",
      "S3 Standard.",
      "S3 Standard-IA.",
      "S3 Glacier Deep Archive."
    ],
    correctas: [0],
    explicacion: "S3 One Zone-IA cuesta menos que Standard-IA porque almacena los datos en una sola AZ; es adecuada para datos reproducibles y de acceso poco frecuente donde se acepta el riesgo de perder una AZ. Standard y Standard-IA cuestan más por su redundancia multi-AZ; Deep Archive penaliza el acceso ocasional con largos tiempos de recuperación."
  },
  {
    id: "saa-760",
    dominio: 4,
    tema: "Cost optimization integral",
    tipo: "multiple",
    enunciado: "Una startup quiere reducir su factura mensual de AWS de forma estructural sin afectar la producción. Tiene cargas estables predecibles y entornos de desarrollo encendidos día y noche. ¿Qué medidas combinadas optimizan el costo correctamente? (Elegí dos.)",
    opciones: [
      "Comprar Savings Plans para las cargas de producción estables y predecibles.",
      "Programar el apagado automático de los entornos de desarrollo fuera del horario laboral con Instance Scheduler.",
      "Comprar Reserved Instances a 3 años para los entornos de desarrollo que se apagan de noche.",
      "Migrar la base de datos de producción a Spot para ahorrar.",
      "Eliminar la facturación consolidada para 'simplificar'."
    ],
    correctas: [0, 1],
    explicacion: "Para cargas estables y predecibles, los Savings Plans capturan descuento estructural; para entornos de desarrollo que no se usan de noche, programar el apagado con Instance Scheduler elimina el costo en horas valle. Comprar RI a 3 años para recursos que se apagan desperdicia el compromiso; usar Spot para una base de datos de producción arriesga la continuidad; y eliminar la facturación consolidada pierde descuentos por volumen y sharing de SP/RI."
  }
]);
