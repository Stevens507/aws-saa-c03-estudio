window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-561",
    dominio: 4,
    tema: "S3 Intelligent-Tiering",
    tipo: "single",
    enunciado: "Una empresa almacena 50 TB de objetos en S3 cuyos patrones de acceso son impredecibles: algunos se leen a diario y otros no se tocan durante meses. El equipo no quiere administrar reglas de ciclo de vida manualmente ni arriesgarse a recargos por recuperación. ¿Qué opción optimiza el costo cumpliendo el requisito?",
    opciones: [
      "Usar S3 Intelligent-Tiering para que los objetos pasen automáticamente entre niveles de acceso sin cargos de recuperación",
      "Almacenar todo en S3 Glacier Flexible Retrieval para minimizar el costo de almacenamiento",
      "Crear reglas de ciclo de vida que muevan los objetos a S3 Standard-IA después de 30 días",
      "Mantener todo en S3 Standard porque algunos objetos se acceden a diario"
    ],
    correctas: [0],
    explicacion: "S3 Intelligent-Tiering mueve objetos entre niveles de acceso frecuente e infrecuente automáticamente y no cobra cargos de recuperación, ideal para patrones impredecibles. Glacier impone recuperaciones con latencia y recargos. Standard-IA cobra por recuperación y penaliza acceso frecuente. Standard solo es lo más caro sin optimizar."
  },
  {
    id: "saa-562",
    dominio: 4,
    tema: "Compute Savings Plans",
    tipo: "single",
    enunciado: "Una empresa ejecuta cargas en EC2, Fargate y Lambda con un uso base estable de cómputo durante 3 años, pero planea cambiar familias de instancias, regiones y migrar parte a contenedores. Quiere el mayor descuento manteniendo máxima flexibilidad. ¿Qué modelo de compra recomienda?",
    opciones: [
      "Compute Savings Plans con compromiso de 3 años",
      "Standard Reserved Instances específicas por tipo de instancia y AZ",
      "EC2 Instance Savings Plans atados a una familia de instancias",
      "Spot Instances para todo el uso base"
    ],
    correctas: [0],
    explicacion: "Compute Savings Plans aplican a EC2 (cualquier familia/región/tamaño/OS), Fargate y Lambda, dando flexibilidad total con descuento alto. Standard RI no cubren Fargate/Lambda y atan a tipo. EC2 Instance Savings Plans atan a una familia/región. Spot no sirve para uso base estable por interrupciones."
  },
  {
    id: "saa-563",
    dominio: 4,
    tema: "VPC Gateway Endpoint",
    tipo: "single",
    enunciado: "Instancias EC2 en subredes privadas acceden frecuentemente a S3 y enrutan todo el tráfico saliente por un NAT Gateway, generando altos cargos de procesamiento y transferencia de datos. ¿Cuál es la forma MÁS económica de reducir esos costos para el tráfico a S3?",
    opciones: [
      "Crear un VPC Gateway Endpoint para S3, que no tiene cargo por hora ni por GB",
      "Crear un VPC Interface Endpoint (PrivateLink) para S3",
      "Agregar más NAT Gateways en cada AZ para distribuir la carga",
      "Asignar IPs públicas a las instancias EC2 para evitar el NAT Gateway"
    ],
    correctas: [0],
    explicacion: "Un Gateway Endpoint para S3 es gratuito (sin cargo por hora ni por datos) y evita que el tráfico a S3 pase por el NAT Gateway, eliminando esos cargos. El Interface Endpoint sí cobra por hora y por GB. Más NAT Gateways aumentan el costo. IPs públicas exponen instancias y no reducen costo de transferencia."
  },
  {
    id: "saa-564",
    dominio: 4,
    tema: "EC2 Spot",
    tipo: "single",
    enunciado: "Un procesamiento por lotes tolerante a fallos corre en un Auto Scaling group y puede reintentar tareas si una instancia se interrumpe. El equipo quiere minimizar interrupciones y costo usando capacidad sobrante. ¿Qué configuración recomienda?",
    opciones: [
      "Spot Instances con la estrategia de asignación capacity-optimized",
      "Spot Instances con la estrategia lowest-price en un solo tipo de instancia",
      "On-Demand Instances con un Savings Plan de 1 año",
      "Reserved Instances Standard de 3 años all upfront"
    ],
    correctas: [0],
    explicacion: "La estrategia capacity-optimized aprovisiona Spot desde los pools con mayor capacidad disponible, reduciendo la probabilidad de interrupción, ideal para batch tolerante a fallos al menor costo. Lowest-price con un solo tipo aumenta interrupciones. On-Demand y RI son más caros y no aprovechan capacidad sobrante."
  },
  {
    id: "saa-565",
    dominio: 4,
    tema: "Compute Optimizer",
    tipo: "single",
    enunciado: "Un arquitecto sospecha que muchas instancias EC2 están sobredimensionadas pero no tiene datos para justificar cambios. Necesita recomendaciones basadas en métricas de utilización real, sin instalar agentes de terceros y sin costo adicional. ¿Qué servicio usa?",
    opciones: [
      "AWS Compute Optimizer para recibir recomendaciones de right-sizing basadas en CloudWatch",
      "AWS Trusted Advisor en su nivel Basic Support",
      "AWS Config con reglas administradas de tamaño de instancia",
      "AWS Cost Explorer con informes de uso por etiqueta"
    ],
    correctas: [0],
    explicacion: "Compute Optimizer analiza métricas de CloudWatch y entrega recomendaciones de right-sizing para EC2 (y otros) sin costo. Trusted Advisor Basic ofrece checks limitados. Config valida cumplimiento, no right-sizing por utilización. Cost Explorer muestra gasto, no recomendaciones de tamaño detalladas por defecto sin habilitarlas."
  },
  {
    id: "saa-566",
    dominio: 4,
    tema: "EBS gp3",
    tipo: "single",
    enunciado: "Una flota de instancias usa volúmenes EBS gp2 de 1 TB y la empresa quiere reducir costos manteniendo o mejorando el rendimiento de IOPS y throughput sin migrar datos. ¿Qué acción ofrece el menor costo cumpliendo el requisito?",
    opciones: [
      "Migrar los volúmenes de gp2 a gp3, que es más barato por GB e incluye IOPS y throughput base",
      "Migrar a volúmenes io2 Block Express para garantizar rendimiento",
      "Reducir el tamaño de los volúmenes a 500 GB para bajar el costo",
      "Migrar a volúmenes sc1 (Cold HDD) para minimizar el costo de almacenamiento"
    ],
    correctas: [0],
    explicacion: "gp3 cuesta aproximadamente 20% menos por GB que gp2 e incluye 3000 IOPS y 125 MB/s base, con rendimiento configurable independiente del tamaño. io2 es más caro. Reducir tamaño puede no caber. sc1 es HDD de bajo rendimiento, inadecuado para cargas que requieren IOPS."
  },
  {
    id: "saa-567",
    dominio: 4,
    tema: "S3 Lifecycle expiración",
    tipo: "multiple",
    enunciado: "Un bucket con versionado habilitado acumula costos por versiones antiguas no actuales y por cargas multipart incompletas que nunca se completaron. ¿Qué DOS acciones de ciclo de vida reducen el costo? (Elegí 2)",
    opciones: [
      "Configurar la expiración de versiones no actuales después de N días",
      "Configurar el aborto de cargas multipart incompletas después de N días",
      "Deshabilitar el versionado del bucket para borrar todas las versiones antiguas",
      "Habilitar S3 Transfer Acceleration para acelerar las cargas",
      "Mover el bucket a otra región para reducir costos de almacenamiento"
    ],
    correctas: [0, 1],
    explicacion: "Una regla de expiración de versiones no actuales elimina versiones viejas que generan costo, y abortar multipart incompletas libera partes huérfanas que se cobran. Deshabilitar versionado no borra versiones existentes. Transfer Acceleration sube el costo. Cambiar de región no es una acción de ciclo de vida ni necesariamente más barato."
  },
  {
    id: "saa-568",
    dominio: 4,
    tema: "Instance Scheduler",
    tipo: "single",
    enunciado: "Un entorno de desarrollo usa 30 instancias EC2 que solo se necesitan de lunes a viernes de 8 a 18 horas, pero actualmente corren 24/7. ¿Cuál es la forma MÁS económica de reducir su costo de cómputo?",
    opciones: [
      "Implementar AWS Instance Scheduler para apagar y encender las instancias según un horario",
      "Comprar Reserved Instances de 3 años all upfront para las 30 instancias",
      "Migrar las instancias a tipos más grandes para terminar el trabajo más rápido",
      "Mover el entorno a Spot Instances con interrupciones frecuentes"
    ],
    correctas: [0],
    explicacion: "Instance Scheduler detiene las instancias fuera del horario laboral, dejando de pagar cómputo cuando no se usan (aproximadamente 70% de ahorro). Comprar RI para uso parcial es desperdicio. Instancias más grandes aumentan el costo por hora. Spot no garantiza disponibilidad para trabajo interactivo de desarrollo."
  },
  {
    id: "saa-569",
    dominio: 4,
    tema: "Recursos huérfanos",
    tipo: "multiple",
    enunciado: "Una auditoría de costos detecta cargos por recursos no utilizados. ¿Qué DOS recursos generan cargos aunque no estén en uso activo y deberían eliminarse para ahorrar? (Elegí 2)",
    opciones: [
      "Elastic IPs asignadas pero no asociadas a una instancia en ejecución",
      "Volúmenes EBS aprovisionados pero no adjuntos a ninguna instancia",
      "Security groups sin reglas configuradas",
      "Roles de IAM creados pero no usados",
      "Buckets S3 vacíos sin objetos"
    ],
    correctas: [0, 1],
    explicacion: "Las Elastic IPs no asociadas (o asociadas a instancias detenidas) generan cargo por hora, y los volúmenes EBS aprovisionados se cobran por GB aunque no estén adjuntos. Security groups, roles de IAM y buckets vacíos no tienen costo. Eliminar EIP ociosas y volúmenes sin uso reduce el gasto."
  },
  {
    id: "saa-570",
    dominio: 4,
    tema: "Aurora Serverless v2",
    tipo: "single",
    enunciado: "Una aplicación tiene una base de datos relacional con tráfico muy variable e impredecible, con largos períodos de inactividad nocturna. La empresa quiere pagar solo por la capacidad usada y escalar automáticamente. ¿Qué solución optimiza el costo?",
    opciones: [
      "Amazon Aurora Serverless v2, que escala la capacidad de cómputo según la demanda",
      "Amazon RDS con una instancia db.r6g aprovisionada de tamaño fijo grande",
      "Amazon Aurora con instancias provisioned y réplicas de lectura permanentes",
      "Migrar la base a DynamoDB con capacidad provisionada fija"
    ],
    correctas: [0],
    explicacion: "Aurora Serverless v2 escala la capacidad (ACUs) de forma fina según la carga y reduce el costo en períodos de baja demanda, ideal para tráfico impredecible. RDS aprovisionado fijo paga capacidad ociosa de noche. Aurora provisioned con réplicas permanentes es caro. Migrar a DynamoDB cambia el modelo de datos relacional."
  },
  {
    id: "saa-571",
    dominio: 4,
    tema: "DynamoDB on-demand",
    tipo: "single",
    enunciado: "Una nueva aplicación lanzará con patrones de tráfico desconocidos y picos imprevisibles. El equipo no quiere aprovisionar ni gestionar capacidad ni arriesgar throttling. ¿Qué modo de capacidad de DynamoDB recomienda inicialmente?",
    opciones: [
      "Modo de capacidad on-demand para pagar por solicitud sin aprovisionar",
      "Capacidad provisionada con valores altos fijos para evitar throttling",
      "Capacidad provisionada con auto scaling configurado al mínimo posible",
      "Reserved Capacity comprada por adelantado para 1 año"
    ],
    correctas: [0],
    explicacion: "On-demand cobra por solicitud y absorbe picos sin aprovisionar, ideal cuando el tráfico es desconocido al lanzar. Provisionado alto fijo paga capacidad ociosa. Auto scaling reacciona con retraso ante picos bruscos y requiere ajuste. Reserved Capacity exige conocer el patrón de uso de antemano."
  },
  {
    id: "saa-572",
    dominio: 4,
    tema: "CloudFront egress",
    tipo: "single",
    enunciado: "Un sitio web sirve grandes volúmenes de imágenes y videos estáticos directamente desde S3 a usuarios globales, y la transferencia de datos de salida desde S3 es el mayor costo. ¿Qué solución reduce el costo de egress mejorando además el rendimiento?",
    opciones: [
      "Servir el contenido a través de Amazon CloudFront, cuya transferencia de salida es más barata y cacheada",
      "Habilitar S3 Requester Pays para que los usuarios paguen la transferencia",
      "Replicar el bucket a todas las regiones de AWS con Cross-Region Replication",
      "Mover el contenido a S3 Glacier para reducir el costo de almacenamiento"
    ],
    correctas: [0],
    explicacion: "CloudFront cachea contenido en edge locations, reduce la transferencia desde el origen S3 y tiene tarifas de salida más bajas, mejorando latencia. Requester Pays no aplica bien a usuarios anónimos de un sitio público. Replicar a todas las regiones multiplica el costo de almacenamiento. Glacier no sirve contenido web de baja latencia."
  },
  {
    id: "saa-573",
    dominio: 4,
    tema: "Cost Anomaly Detection",
    tipo: "single",
    enunciado: "Un equipo financiero quiere ser alertado automáticamente cuando el gasto de AWS se desvía de los patrones normales por causas inesperadas, sin definir umbrales manuales para cada servicio. ¿Qué herramienta usa?",
    opciones: [
      "AWS Cost Anomaly Detection, que usa machine learning para detectar gastos inusuales",
      "AWS Budgets con un presupuesto fijo mensual por servicio",
      "Amazon CloudWatch con alarmas sobre métricas de facturación estimada",
      "AWS Trusted Advisor con el check de límites de servicio"
    ],
    correctas: [0],
    explicacion: "Cost Anomaly Detection aplica machine learning para identificar desviaciones inusuales del gasto y notifica sin requerir umbrales manuales por servicio. Budgets requiere definir umbrales. Las alarmas de CloudWatch de facturación son umbrales fijos. Trusted Advisor de límites no detecta anomalías de costo."
  },
  {
    id: "saa-574",
    dominio: 4,
    tema: "Graviton",
    tipo: "single",
    enunciado: "Una aplicación basada en contenedores Linux ejecuta cargas estándar (Nginx, Java, Python) y la empresa busca reducir el costo de cómputo hasta un 40% sin cambiar la funcionalidad. ¿Qué cambio recomienda con menor esfuerzo y mejor relación precio-rendimiento?",
    opciones: [
      "Migrar a instancias basadas en AWS Graviton (ARM) compatibles con las cargas",
      "Migrar todas las cargas a instancias x86 metal dedicadas",
      "Aumentar el tamaño de las instancias x86 para mejorar el rendimiento",
      "Mantener x86 y comprar más Reserved Instances Standard"
    ],
    correctas: [0],
    explicacion: "Las instancias Graviton (ARM) ofrecen hasta mejor relación precio-rendimiento (hasta ~40% más económicas) y soportan cargas Linux comunes con recompilación mínima. Metal dedicado es más caro. Instancias x86 más grandes suben el costo. Comprar más RI x86 no reduce la tarifa base como Graviton."
  },
  {
    id: "saa-575",
    dominio: 4,
    tema: "Savings Plans pago",
    tipo: "single",
    enunciado: "Una empresa quiere maximizar el porcentaje de descuento al comprar un Compute Savings Plan de 3 años y tiene capital disponible para pagar por adelantado. ¿Qué opción de pago ofrece el MAYOR descuento?",
    opciones: [
      "All upfront (pago total por adelantado)",
      "Partial upfront (pago parcial por adelantado)",
      "No upfront (sin pago por adelantado)",
      "Pago mensual on-demand sin compromiso"
    ],
    correctas: [0],
    explicacion: "El pago all upfront entrega el mayor descuento porque AWS recibe todo el compromiso por adelantado. Partial upfront da un descuento intermedio y no upfront el menor de los tres. El pago on-demand sin compromiso no tiene descuento de Savings Plan."
  },
  {
    id: "saa-576",
    dominio: 4,
    tema: "Organizations billing",
    tipo: "single",
    enunciado: "Una empresa con 12 cuentas de AWS bajo AWS Organizations quiere que los descuentos por volumen y los Savings Plans/Reserved Instances no usados en una cuenta beneficien a las demás. ¿Qué debe habilitar?",
    opciones: [
      "Facturación consolidada con uso compartido de RI y Savings Plans entre cuentas",
      "Una cuenta separada por servicio con facturación independiente",
      "AWS Budgets en cada cuenta de forma aislada",
      "Tags de asignación de costos en cada recurso de cada cuenta"
    ],
    correctas: [0],
    explicacion: "La facturación consolidada de Organizations agrega el uso de todas las cuentas para alcanzar niveles de descuento por volumen y comparte la cobertura no usada de RI/SP entre cuentas. Cuentas aisladas pierden esos beneficios. Budgets y tags ayudan a monitorear, pero no comparten descuentos."
  },
  {
    id: "saa-577",
    dominio: 4,
    tema: "S3 Storage Class Analysis",
    tipo: "single",
    enunciado: "Antes de definir reglas de ciclo de vida, un arquitecto necesita identificar qué objetos de S3 se vuelven infrecuentes y cuándo, para decidir el momento óptimo de transición y reducir costos. ¿Qué función usa?",
    opciones: [
      "S3 Storage Class Analysis para analizar patrones de acceso y recomendar transiciones",
      "S3 Inventory para listar objetos diariamente en un archivo CSV",
      "S3 Object Lock para evitar borrados accidentales",
      "S3 Replication Time Control para garantizar replicación"
    ],
    correctas: [0],
    explicacion: "Storage Class Analysis observa patrones de acceso y recomienda cuándo conviene transicionar objetos a clases más baratas como Standard-IA, informando las reglas de ciclo de vida. Inventory solo lista objetos. Object Lock y RTC no analizan acceso ni costo de almacenamiento."
  },
  {
    id: "saa-578",
    dominio: 4,
    tema: "Fargate Spot",
    tipo: "single",
    enunciado: "Una aplicación de procesamiento asíncrono corre en tareas de ECS sobre Fargate y puede reintentar trabajos interrumpidos. La empresa quiere reducir el costo de cómputo de contenedores sin administrar instancias EC2. ¿Qué opción recomienda?",
    opciones: [
      "Ejecutar las tareas en Fargate Spot para obtener un descuento por capacidad interrumpible",
      "Migrar a EC2 con Reserved Instances de 3 años",
      "Usar Fargate on-demand a capacidad fija duplicada por seguridad",
      "Usar Lambda con timeout máximo para todas las tareas"
    ],
    correctas: [0],
    explicacion: "Fargate Spot ofrece un descuento significativo para tareas tolerantes a interrupciones sin gestionar EC2, ideal para procesamiento asíncrono que puede reintentar. RI EC2 requieren gestionar el plano de cómputo. Fargate on-demand duplicado es caro. Lambda tiene límites de duración que pueden no encajar."
  },
  {
    id: "saa-579",
    dominio: 4,
    tema: "RI Convertible vs Standard",
    tipo: "single",
    enunciado: "Una empresa quiere comprometerse 3 años con Reserved Instances para una carga estable, pero prevé que podría cambiar de familia de instancias por evolución tecnológica. Prioriza poder intercambiar el tipo de RI aún a costa de un descuento algo menor. ¿Qué tipo elige?",
    opciones: [
      "Convertible Reserved Instances, que permiten cambiar atributos como familia y tamaño",
      "Standard Reserved Instances, que ofrecen el máximo descuento pero menor flexibilidad",
      "Scheduled Reserved Instances para ventanas horarias fijas",
      "Spot Instances con bloque de duración garantizado"
    ],
    correctas: [0],
    explicacion: "Las Convertible RI permiten intercambiar familia, SO y tenencia durante el plazo, a cambio de un descuento algo menor que las Standard, ideal si se prevén cambios de familia. Standard RI maximizan descuento pero no se convierten. Scheduled RI son para horarios fijos. Spot no es para uso estable comprometido."
  },
  {
    id: "saa-580",
    dominio: 4,
    tema: "Archivado a largo plazo",
    tipo: "multiple",
    enunciado: "Una empresa debe retener registros regulatorios por 10 años. El acceso es extremadamente raro (una o dos veces al año) y una recuperación de varias horas es aceptable. ¿Qué DOS acciones minimizan el costo de almacenamiento cumpliendo el requisito? (Elegí 2)",
    opciones: [
      "Almacenar los objetos en S3 Glacier Deep Archive, la clase más barata para archivado profundo",
      "Aplicar una regla de ciclo de vida que transicione los objetos a la clase de archivo y expire tras 10 años",
      "Mantener los registros en S3 Standard para acceso inmediato permanente",
      "Guardar los registros en S3 One Zone-IA para reducir la redundancia",
      "Copiar los registros a volúmenes EBS io2 para mayor durabilidad"
    ],
    correctas: [0, 1],
    explicacion: "Glacier Deep Archive es la clase más barata para retención a largo plazo con acceso muy raro y recuperación de horas; una regla de ciclo de vida automatiza la transición y la expiración a los 10 años. Standard es caro para datos casi nunca accedidos. One Zone-IA sigue costando más por GB que Deep Archive. EBS io2 es almacenamiento de bloques caro, inadecuado para archivado."
  },
  {
    id: "saa-581",
    dominio: 4,
    tema: "Cross-AZ traffic",
    tipo: "single",
    enunciado: "Una aplicación de tres niveles genera grandes volúmenes de tráfico entre instancias de cómputo y una base de datos, y la transferencia de datos entre zonas de disponibilidad está inflando la factura. ¿Qué medida reduce el costo de transferencia interna?",
    opciones: [
      "Colocar las instancias que se comunican intensamente en la misma zona de disponibilidad",
      "Mover todas las instancias a regiones diferentes para distribuir el tráfico",
      "Habilitar un NAT Gateway entre las zonas de disponibilidad",
      "Usar IPs públicas para la comunicación entre niveles"
    ],
    correctas: [0],
    explicacion: "El tráfico entre AZ se cobra por GB en ambas direcciones; colocar componentes que se comunican intensamente en la misma AZ reduce ese costo (a costa de algo de resiliencia). Distintas regiones encarecen aún más. Un NAT Gateway agrega cargos. Las IPs públicas pueden enrutar tráfico por Internet, aumentando costo."
  },
  {
    id: "saa-582",
    dominio: 4,
    tema: "S3 Requester Pays",
    tipo: "single",
    enunciado: "Una organización publica grandes conjuntos de datos en S3 para socios externos y no quiere asumir el costo de transferencia de datos que esos socios generan al descargarlos. ¿Qué función debe habilitar?",
    opciones: [
      "S3 Requester Pays, para que quien descarga pague la transferencia y las solicitudes",
      "S3 Transfer Acceleration para reducir la latencia de descarga",
      "S3 Cross-Region Replication hacia las regiones de los socios",
      "CloudFront con Origin Access Control"
    ],
    correctas: [0],
    explicacion: "Con Requester Pays, los costos de solicitudes y transferencia de datos los paga quien descarga (autenticado), no el dueño del bucket, ideal para compartir grandes datasets. Transfer Acceleration y CloudFront no trasladan el costo al solicitante. CRR multiplica el almacenamiento sin cambiar quién paga la descarga."
  },
  {
    id: "saa-583",
    dominio: 4,
    tema: "Cost Explorer recomendaciones",
    tipo: "single",
    enunciado: "Un arquitecto quiere obtener recomendaciones específicas de compra de Reserved Instances y Savings Plans basadas en el uso histórico de la cuenta, junto con el ahorro estimado. ¿Qué herramienta provee esto de forma nativa?",
    opciones: [
      "AWS Cost Explorer, que genera recomendaciones de RI y Savings Plans con ahorro estimado",
      "AWS Pricing Calculator para estimar costos de arquitecturas nuevas",
      "AWS Compute Optimizer únicamente para right-sizing de EC2",
      "AWS CloudTrail para auditar el uso de instancias"
    ],
    correctas: [0],
    explicacion: "Cost Explorer analiza el uso histórico y recomienda compras de RI y Savings Plans con el ahorro estimado y la cobertura óptima. Pricing Calculator estima costos a futuro de diseños nuevos. Compute Optimizer hace right-sizing, no recomendaciones de compromiso. CloudTrail audita acciones de API."
  },
  {
    id: "saa-584",
    dominio: 4,
    tema: "Lambda escala a cero",
    tipo: "single",
    enunciado: "Una API se invoca esporádicamente, con largos períodos sin tráfico durante la noche y fines de semana. La empresa quiere no pagar nada cuando no hay solicitudes y evitar gestionar servidores. ¿Qué cómputo recomienda?",
    opciones: [
      "AWS Lambda, que solo cobra por invocación y duración y escala a cero",
      "Una instancia EC2 t3.micro pequeña ejecutándose continuamente",
      "Un servicio ECS sobre Fargate con una tarea siempre activa",
      "Un Auto Scaling group con un mínimo de una instancia"
    ],
    correctas: [0],
    explicacion: "Lambda escala a cero y solo cobra por las invocaciones y el tiempo de ejecución, sin costo en períodos sin tráfico, ideal para APIs esporádicas sin gestión de servidores. EC2 t3.micro, Fargate con tarea activa y ASG con mínimo 1 pagan cómputo continuo aunque no haya solicitudes."
  },
  {
    id: "saa-585",
    dominio: 4,
    tema: "S3 Storage Lens",
    tipo: "single",
    enunciado: "Una empresa con cientos de buckets en varias cuentas quiere visibilidad centralizada del uso de almacenamiento, recomendaciones de ahorro y detección de buckets con datos fríos. ¿Qué herramienta entrega métricas y recomendaciones a nivel de organización?",
    opciones: [
      "S3 Storage Lens con su panel y recomendaciones a nivel de cuenta y organización",
      "S3 Inventory generando informes CSV por bucket",
      "Amazon CloudWatch con métricas de almacenamiento por bucket",
      "AWS Config con reglas de cumplimiento de buckets"
    ],
    correctas: [0],
    explicacion: "S3 Storage Lens ofrece visibilidad de almacenamiento en toda la organización, métricas de actividad y recomendaciones de optimización de costos (por ejemplo buckets con datos fríos). Inventory solo lista objetos. CloudWatch da métricas por bucket sin recomendaciones agregadas. Config valida configuración, no costo."
  },
  {
    id: "saa-586",
    dominio: 4,
    tema: "Budgets acciones",
    tipo: "single",
    enunciado: "Una empresa quiere que, al superar el 90% del presupuesto mensual, se apliquen automáticamente políticas que impidan lanzar nuevos recursos costosos, sin intervención manual. ¿Qué configuración logra esto?",
    opciones: [
      "AWS Budgets con Budget Actions que apliquen una política o detengan recursos al alcanzar el umbral",
      "AWS Cost Explorer con un informe programado por correo",
      "Una alarma de CloudWatch que envíe solo una notificación SNS",
      "AWS Trusted Advisor con notificaciones semanales"
    ],
    correctas: [0],
    explicacion: "Las Budget Actions permiten ejecutar acciones automáticas (aplicar SCP/IAM, detener instancias EC2/RDS) cuando se alcanza un umbral, sin intervención manual. Cost Explorer y las alarmas de CloudWatch solo notifican. Trusted Advisor no aplica acciones de presupuesto."
  },
  {
    id: "saa-587",
    dominio: 4,
    tema: "Attribute-based selection",
    tipo: "single",
    enunciado: "Un equipo configura un Auto Scaling group con instancias mixtas y Spot, pero mantener una lista manual de tipos de instancia compatibles es engorroso y limita los pools de capacidad. Quiere que AWS seleccione automáticamente tipos según requisitos como vCPU y memoria. ¿Qué función usa?",
    opciones: [
      "Attribute-Based Instance Type Selection para definir requisitos en lugar de tipos específicos",
      "Una sola plantilla de lanzamiento con un único tipo de instancia",
      "Reserved Instances para fijar el tipo de instancia",
      "Dedicated Hosts para controlar la colocación física"
    ],
    correctas: [0],
    explicacion: "La selección de instancias basada en atributos permite especificar requisitos (vCPU, memoria, etc.) y deja que AWS elija entre muchos tipos compatibles, ampliando los pools de Spot y reduciendo interrupciones y costo. Un solo tipo limita la capacidad. RI y Dedicated Hosts no resuelven la diversificación de Spot."
  },
  {
    id: "saa-588",
    dominio: 4,
    tema: "Interface endpoint costo",
    tipo: "single",
    enunciado: "Instancias en subredes privadas necesitan acceder a DynamoDB sin pasar por un NAT Gateway. El arquitecto quiere la opción de menor costo de red para ese acceso. ¿Qué recomienda?",
    opciones: [
      "Crear un VPC Gateway Endpoint para DynamoDB, que es gratuito",
      "Crear un VPC Interface Endpoint (PrivateLink) para DynamoDB",
      "Mantener el tráfico saliendo por el NAT Gateway",
      "Usar una conexión Direct Connect dedicada a DynamoDB"
    ],
    correctas: [0],
    explicacion: "DynamoDB soporta un Gateway Endpoint gratuito (como S3), evitando el NAT Gateway sin cargo por hora ni por datos. Un Interface Endpoint cobraría por hora y GB. El NAT Gateway genera cargos de procesamiento. Direct Connect es para conectividad híbrida, no para acceso interno a DynamoDB."
  },
  {
    id: "saa-589",
    dominio: 4,
    tema: "Cost allocation tags",
    tipo: "single",
    enunciado: "Una empresa necesita repartir los costos de AWS por departamento y proyecto en sus informes de facturación, para hacer chargeback interno. ¿Qué mecanismo permite categorizar el gasto de esta forma?",
    opciones: [
      "Activar cost allocation tags (etiquetas de asignación de costos) y filtrar por ellas en los informes",
      "Crear una cuenta de AWS separada para cada gasto individual",
      "Usar AWS CloudTrail para rastrear cada llamada de API por departamento",
      "Configurar IAM roles distintos por departamento"
    ],
    correctas: [0],
    explicacion: "Las cost allocation tags (definidas por el usuario o generadas por AWS) permiten categorizar y desglosar el gasto por dimensiones como departamento o proyecto en Cost Explorer y el reporte de costos. CloudTrail audita acciones, no costos. IAM roles controlan acceso. Una cuenta por gasto es inviable."
  },
  {
    id: "saa-590",
    dominio: 4,
    tema: "EC2 Instance Savings Plans",
    tipo: "single",
    enunciado: "Una empresa ejecuta una carga estable que permanecerá siempre en la familia M5 en una región específica durante 3 años, y quiere el descuento más alto posible para esa familia conservando flexibilidad de tamaño y SO dentro de ella. ¿Qué modelo recomienda?",
    opciones: [
      "EC2 Instance Savings Plans atados a la familia M5 en esa región",
      "Compute Savings Plans con la máxima flexibilidad multiplataforma",
      "On-Demand sin compromiso para evitar ataduras",
      "Spot Instances para la carga estable"
    ],
    correctas: [0],
    explicacion: "EC2 Instance Savings Plans ofrecen un descuento mayor que los Compute SP a cambio de comprometerse a una familia y región, permitiendo cambiar tamaño y SO dentro de ella, ideal si la familia no cambiará. Compute SP dan más flexibilidad pero menor descuento. On-Demand no descuenta. Spot no sirve para uso estable comprometido."
  },
  {
    id: "saa-591",
    dominio: 4,
    tema: "ELB ocioso",
    tipo: "multiple",
    enunciado: "Trusted Advisor reporta posibles ahorros por recursos infrautilizados. ¿Qué DOS hallazgos representan costos eliminables por recursos ociosos o de baja utilización? (Elegí 2)",
    opciones: [
      "Un Load Balancer sin instancias saludables registradas que sigue facturando por hora",
      "Snapshots de EBS muy antiguos que ya no se necesitan acumulando costo de almacenamiento",
      "Una tabla DynamoDB en modo on-demand sin solicitudes durante una hora",
      "Una función Lambda que no fue invocada durante el mes",
      "Un Security Group asociado a varias instancias activas"
    ],
    correctas: [0, 1],
    explicacion: "Un ELB sin targets saludables sigue cobrando por hora y es candidato a eliminación, y los snapshots EBS viejos innecesarios acumulan costo de almacenamiento. DynamoDB on-demand y Lambda sin uso no cobran cuando no hay solicitudes. Un Security Group no genera costo."
  },
  {
    id: "saa-592",
    dominio: 4,
    tema: "Direct Connect transferencia",
    tipo: "single",
    enunciado: "Una empresa transfiere grandes volúmenes de datos desde AWS hacia su centro de datos a través de Internet por VPN, y los cargos de transferencia de salida son altos y crecientes. Necesita reducir el costo por GB de esa salida sostenida. ¿Qué solución recomienda?",
    opciones: [
      "Usar AWS Direct Connect, cuya tarifa de transferencia de datos de salida es menor que por Internet",
      "Aumentar el ancho de banda de la VPN sobre Internet",
      "Habilitar S3 Transfer Acceleration para las descargas",
      "Mover los datos a otra región antes de descargarlos"
    ],
    correctas: [0],
    explicacion: "Direct Connect ofrece una tarifa de Data Transfer Out menor que la salida por Internet y rendimiento más consistente, reduciendo el costo de transferencias sostenidas y grandes. Aumentar la VPN no baja la tarifa por GB. Transfer Acceleration sube el costo. Mover de región agrega cargos sin reducir la salida final."
  },
  {
    id: "saa-593",
    dominio: 4,
    tema: "S3 Intelligent-Tiering Archive",
    tipo: "single",
    enunciado: "Un data lake en S3 Intelligent-Tiering contiene objetos que a veces no se acceden por más de 6 meses, y la empresa quiere reducir aún más su costo permitiendo que esos objetos pasen a niveles de archivo automáticamente, asumiendo latencia de recuperación. ¿Qué debe configurar?",
    opciones: [
      "Habilitar los niveles Archive Access y Deep Archive Access opcionales de Intelligent-Tiering",
      "Crear una regla de ciclo de vida que mueva todo a Glacier inmediatamente",
      "Deshabilitar Intelligent-Tiering y usar solo S3 Standard",
      "Habilitar el versionado del bucket para reducir el costo"
    ],
    correctas: [0],
    explicacion: "Intelligent-Tiering tiene niveles opcionales Archive Access y Deep Archive Access que, una vez habilitados, mueven automáticamente objetos no accedidos durante largos períodos a almacenamiento de archivo más barato (con latencia de recuperación). Mover todo a Glacier de inmediato ignora el acceso real. Standard y versionado no reducen el costo."
  },
  {
    id: "saa-594",
    dominio: 4,
    tema: "Spot Fleet interrupciones",
    tipo: "single",
    enunciado: "Una flota de procesamiento usa Spot y sufre terminaciones abruptas que pierden trabajo en curso. El equipo quiere reaccionar a la señal anticipada de interrupción para guardar el progreso antes de que la instancia se recupere. ¿Qué mecanismo debe usar?",
    opciones: [
      "El Spot Instance interruption notice (aviso de 2 minutos) para drenar y guardar el progreso",
      "Reserved Instances para eliminar toda posibilidad de interrupción",
      "Aumentar el precio máximo de Spot al doble del On-Demand",
      "Deshabilitar Auto Scaling para que no se reemplacen instancias"
    ],
    correctas: [0],
    explicacion: "El aviso de interrupción de Spot (2 minutos vía metadata/EventBridge) permite que la aplicación guarde el progreso o drene conexiones antes de la terminación, reduciendo trabajo perdido mientras se mantiene el bajo costo de Spot. RI elimina Spot pero pierde el descuento. Subir el precio máximo no evita interrupciones por capacidad. Deshabilitar ASG no ayuda."
  },
  {
    id: "saa-595",
    dominio: 4,
    tema: "Logs almacenamiento barato",
    tipo: "multiple",
    enunciado: "Una empresa retiene logs en CloudWatch Logs indefinidamente, lo que genera costos crecientes. La mayoría de los logs antiguos rara vez se consultan pero deben conservarse 7 años por cumplimiento. ¿Qué DOS acciones reducen el costo cumpliendo el requisito? (Elegí 2)",
    opciones: [
      "Exportar los logs antiguos a S3 y aplicar ciclo de vida hacia Glacier Deep Archive",
      "Reducir el período de retención de CloudWatch Logs a unos pocos días",
      "Mantener todos los logs en CloudWatch Logs con retención infinita",
      "Copiar los logs a una instancia EC2 con un volumen EBS grande siempre encendida",
      "Almacenar los logs en una tabla de DynamoDB con capacidad provisionada alta"
    ],
    correctas: [0, 1],
    explicacion: "Exportar logs a S3 con ciclo de vida hacia Glacier Deep Archive y a la vez reducir la retención en CloudWatch Logs es mucho más barato que retener todo en CloudWatch, cumpliendo los 7 años. La retención infinita en CloudWatch es cara. EBS en EC2 siempre encendida cobra cómputo y almacenamiento. DynamoDB provisionado alto es caro e inadecuado para archivado masivo."
  },
  {
    id: "saa-596",
    dominio: 4,
    tema: "S3 One Zone-IA",
    tipo: "single",
    enunciado: "Una empresa almacena en S3 copias secundarias de datos que se pueden regenerar fácilmente y se acceden con poca frecuencia. No requiere la redundancia multi-AZ porque puede reproducir los datos si se pierden. ¿Qué clase minimiza el costo?",
    opciones: [
      "S3 One Zone-Infrequent Access",
      "S3 Standard-Infrequent Access",
      "S3 Standard",
      "S3 Glacier Instant Retrieval"
    ],
    correctas: [0],
    explicacion: "One Zone-IA cuesta menos que Standard-IA porque almacena en una sola AZ, adecuado para datos reproducibles e infrecuentes que toleran la menor durabilidad ante fallo de AZ. Standard-IA y Standard cuestan más por la redundancia multi-AZ. Glacier Instant Retrieval es para acceso aún menos frecuente con otro perfil de costo."
  },
  {
    id: "saa-597",
    dominio: 4,
    tema: "Trusted Advisor",
    tipo: "single",
    enunciado: "Un cliente con Business Support quiere un panel que revise automáticamente toda su cuenta y señale oportunidades de optimización de costos, como instancias EC2 de baja utilización y RI poco aprovechadas. ¿Qué servicio cumple esto de inmediato?",
    opciones: [
      "AWS Trusted Advisor con la categoría completa de optimización de costos",
      "AWS Pricing Calculator",
      "AWS Well-Architected Tool solamente",
      "Amazon Inspector"
    ],
    correctas: [0],
    explicacion: "Trusted Advisor (con Business/Enterprise Support) ofrece checks de optimización de costos como instancias EC2 ociosas, RI infrautilizadas, EIP no asociadas y ELB ociosos. Pricing Calculator estima costos de diseños nuevos. Well-Architected Tool es un cuestionario de revisión. Inspector evalúa seguridad."
  },
  {
    id: "saa-598",
    dominio: 4,
    tema: "DynamoDB provisioned autoscaling",
    tipo: "single",
    enunciado: "Una aplicación madura de DynamoDB tiene un patrón de tráfico predecible y recurrente con picos diarios conocidos, y el equipo determinó que on-demand resulta más caro que provisionar. Quiere minimizar el costo ajustando la capacidad a la demanda. ¿Qué recomienda?",
    opciones: [
      "Capacidad provisionada con Auto Scaling para seguir el patrón de tráfico",
      "Modo on-demand para no gestionar capacidad",
      "Capacidad provisionada fija al pico máximo todo el día",
      "Migrar la tabla a Aurora Serverless"
    ],
    correctas: [0],
    explicacion: "Para tráfico predecible y recurrente, la capacidad provisionada con Auto Scaling sigue la demanda y suele ser más barata que on-demand, escalando hacia los picos conocidos. On-demand ya se descartó por costo. Provisionar al pico todo el día desperdicia capacidad. Aurora cambia el modelo de datos innecesariamente."
  },
  {
    id: "saa-599",
    dominio: 4,
    tema: "Modelos de compra comparados",
    tipo: "multiple",
    enunciado: "Una empresa tiene una base de cómputo estable de largo plazo más picos diarios impredecibles y tolerantes a fallos. Quiere minimizar el costo total combinando modelos de compra adecuados. ¿Qué DOS decisiones son correctas? (Elegí 2)",
    opciones: [
      "Cubrir la base estable de largo plazo con un Compute Savings Plan",
      "Atender los picos tolerantes a fallos con Spot Instances",
      "Cubrir toda la carga, base y picos, con On-Demand sin compromiso",
      "Cubrir los picos impredecibles con Reserved Instances Standard de 3 años",
      "Atender la base estable con Spot Instances para máximo ahorro"
    ],
    correctas: [0, 1],
    explicacion: "La base estable de largo plazo se cubre mejor con un Savings Plan (descuento por compromiso), y los picos impredecibles tolerantes a fallos con Spot (capacidad sobrante barata). On-Demand para todo es caro. RI para picos impredecibles desperdicia el compromiso. Spot para la base arriesga interrupciones en uso crítico continuo."
  },
  {
    id: "saa-600",
    dominio: 4,
    tema: "PrivateLink vs NAT",
    tipo: "single",
    enunciado: "Una empresa accede a un servicio SaaS de un partner alojado en AWS y actualmente enruta ese tráfico por un NAT Gateway hacia Internet, pagando procesamiento y transferencia. El partner ofrece su servicio vía AWS PrivateLink. Para reducir costos de NAT y mantener el tráfico privado, ¿qué recomienda?",
    opciones: [
      "Consumir el servicio del partner mediante un VPC Interface Endpoint (PrivateLink), evitando el NAT Gateway",
      "Aumentar la cantidad de NAT Gateways para repartir el tráfico del SaaS",
      "Asignar IPs públicas a las instancias que consumen el SaaS",
      "Establecer un peering de VPC con la cuenta del partner"
    ],
    correctas: [0],
    explicacion: "Consumir el servicio vía PrivateLink (Interface Endpoint) mantiene el tráfico dentro de la red de AWS sin pasar por el NAT Gateway, eliminando sus cargos de procesamiento y transferencia a Internet, además de ser más seguro. Más NAT Gateways encarecen. IPs públicas no son privadas ni más baratas. El peering no aplica a un servicio publicado por PrivateLink."
  }
]);
