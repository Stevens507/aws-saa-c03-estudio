window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-201",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una empresa de medios sirve videos y paginas estaticas a usuarios globales desde un bucket S3 en us-east-1. Los usuarios en Asia y Europa reportan tiempos de carga muy altos y elevados costos de transferencia de datos saliente desde S3. El equipo necesita reducir la latencia y los costos de egress sin cambiar la aplicacion. Que solucion es la MAS adecuada?",
    opciones: [
      "Habilitar S3 Transfer Acceleration sobre el bucket existente",
      "Crear una distribucion de Amazon CloudFront con el bucket S3 como origen y servir el contenido desde las ubicaciones de borde",
      "Replicar el bucket S3 a varias regiones con Cross-Region Replication y usar Route 53 latency routing",
      "Migrar el contenido a Amazon EFS montado en instancias EC2 en multiples regiones"
    ],
    correctas: [1],
    explicacion: "CloudFront cachea el contenido en ubicaciones de borde cercanas a los usuarios, reduciendo la latencia y bajando el costo de egress ya que la transferencia desde S3 a CloudFront es gratuita. S3 Transfer Acceleration optimiza subidas/descargas pero no cachea ni reduce el egress repetido. La replicacion multi-region aumenta costo y complejidad. EFS no sirve contenido web global."
  },
  {
    id: "saa-202",
    dominio: 3,
    tema: "ElastiCache",
    tipo: "single",
    enunciado: "Una aplicacion de e-commerce usa una base de datos relacional que sufre carga elevada por consultas repetidas de catalogo. El equipo quiere agregar una capa de cache en memoria que soporte estructuras de datos avanzadas, persistencia, replicas de lectura y failover automatico. Que servicio cumple mejor estos requisitos?",
    opciones: [
      "Amazon ElastiCache for Memcached",
      "Amazon ElastiCache for Redis",
      "Amazon DynamoDB Accelerator (DAX)",
      "Amazon S3 con caching de objetos"
    ],
    correctas: [1],
    explicacion: "ElastiCache for Redis soporta estructuras de datos avanzadas (listas, sets, sorted sets), persistencia, replicas de lectura y failover automatico con Multi-AZ. Memcached es mas simple, multi-hilo, sin persistencia ni replicas. DAX es exclusivo para DynamoDB. S3 no es una cache en memoria."
  },
  {
    id: "saa-203",
    dominio: 3,
    tema: "DynamoDB DAX",
    tipo: "single",
    enunciado: "Una aplicacion que usa Amazon DynamoDB experimenta latencias de lectura de milisegundos pero necesita reducirlas a microsegundos para lecturas muy frecuentes de los mismos items. La aplicacion no debe cambiar su API de acceso significativamente. Que solucion es la mas apropiada?",
    opciones: [
      "Agregar replicas globales de DynamoDB en otra region",
      "Implementar Amazon DynamoDB Accelerator (DAX) como cache totalmente gestionada",
      "Colocar un cluster ElastiCache for Memcached delante de DynamoDB con codigo personalizado",
      "Aumentar la capacidad de lectura provisionada (RCU) de la tabla"
    ],
    correctas: [1],
    explicacion: "DAX es una cache en memoria especifica para DynamoDB que entrega lecturas en microsegundos y es compatible con la API de DynamoDB, requiriendo cambios minimos. Las replicas globales abordan disponibilidad regional, no latencia de lectura local. Memcached requiere logica personalizada de invalidacion. Aumentar RCU mejora throughput pero no baja a microsegundos."
  },
  {
    id: "saa-204",
    dominio: 3,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Una empresa de videojuegos opera servidores TCP/UDP en dos regiones de AWS y necesita enrutar a los jugadores al endpoint mas cercano y saludable, con IPs estaticas y failover rapido a nivel de red. Que servicio cumple mejor este requisito?",
    opciones: [
      "Amazon CloudFront con origenes multiples",
      "AWS Global Accelerator con dos endpoint groups regionales",
      "Route 53 con geolocation routing",
      "Un Application Load Balancer con cross-zone load balancing"
    ],
    correctas: [1],
    explicacion: "Global Accelerator provee dos IPs estaticas anycast, usa la red troncal de AWS para enrutar al endpoint regional mas cercano y saludable, y soporta TCP/UDP con failover rapido. CloudFront es para contenido HTTP/S cacheable. Route 53 hace resolucion DNS sin IPs estaticas anycast ni failover sub-segundo a nivel de red. Un ALB es regional."
  },
  {
    id: "saa-205",
    dominio: 3,
    tema: "Placement Groups",
    tipo: "single",
    enunciado: "Un workload de computo de alto rendimiento (HPC) ejecuta nodos que intercambian grandes volumenes de datos entre si y requiere la menor latencia de red y el mayor throughput entre instancias dentro de una sola Availability Zone. Que estrategia de placement group debe usar el arquitecto?",
    opciones: [
      "Spread placement group",
      "Partition placement group",
      "Cluster placement group",
      "Sin placement group, distribuyendo las instancias en multiples AZ"
    ],
    correctas: [2],
    explicacion: "Un cluster placement group agrupa instancias dentro de una sola AZ para lograr baja latencia y alto throughput de red, ideal para HPC. Spread separa instancias en hardware distinto para minimizar fallas correlacionadas. Partition aisla particiones para cargas distribuidas grandes. Distribuir en multiples AZ aumenta la latencia entre nodos."
  },
  {
    id: "saa-206",
    dominio: 3,
    tema: "EBS",
    tipo: "single",
    enunciado: "Una base de datos transaccional alojada en EC2 necesita un volumen EBS con IOPS muy altas y sostenidas, latencia consistente de sub-milisegundo y la mayor durabilidad para una carga critica. El equipo quiere el rendimiento mas alto disponible en EBS. Que tipo de volumen debe elegir?",
    opciones: [
      "General Purpose SSD (gp3)",
      "Provisioned IOPS SSD (io2 Block Express)",
      "Throughput Optimized HDD (st1)",
      "Cold HDD (sc1)"
    ],
    correctas: [1],
    explicacion: "io2 Block Express ofrece las IOPS mas altas, latencia sub-milisegundo consistente y 99.999% de durabilidad, ideal para bases de datos criticas. gp3 es buen rendimiento general pero con menos IOPS maximas. st1 y sc1 son HDD orientados a throughput secuencial o almacenamiento frio, inadecuados para cargas transaccionales con IOPS altas."
  },
  {
    id: "saa-207",
    dominio: 3,
    tema: "Aurora",
    tipo: "single",
    enunciado: "Una aplicacion con carga de lectura muy variable usa Amazon Aurora MySQL. Durante picos, las replicas de lectura se saturan, y en horas valle hay capacidad ociosa que genera costos. El equipo quiere ajustar automaticamente el numero de replicas de lectura segun la demanda. Que solucion es la mas adecuada?",
    opciones: [
      "Configurar Aurora Auto Scaling para las Aurora Replicas basado en metricas de CPU o conexiones",
      "Migrar a Aurora Serverless v1 con escalado manual",
      "Crear manualmente replicas de lectura adicionales y dejarlas activas siempre",
      "Usar un Network Load Balancer delante de las replicas"
    ],
    correctas: [0],
    explicacion: "Aurora Auto Scaling agrega o elimina Aurora Replicas automaticamente segun metricas como CPU promedio o numero de conexiones, ajustando la capacidad de lectura a la demanda y optimizando costos. Crear replicas fijas no se adapta a la variabilidad. Un NLB no escala la cantidad de replicas; Aurora ya provee un reader endpoint balanceado."
  },
  {
    id: "saa-208",
    dominio: 3,
    tema: "Lambda",
    tipo: "single",
    enunciado: "Una funcion AWS Lambda critica para la latencia sufre cold starts notorios al inicio de cada pico de trafico, afectando la experiencia de usuario en una API sincrona. El equipo necesita eliminar los cold starts para un nivel base de concurrencia conocido. Que configuracion debe aplicar?",
    opciones: [
      "Aumentar la memoria asignada a la funcion al maximo",
      "Configurar Provisioned Concurrency en la funcion para mantener instancias pre-inicializadas",
      "Habilitar Reserved Concurrency en la funcion",
      "Migrar la funcion a un runtime mas reciente"
    ],
    correctas: [1],
    explicacion: "Provisioned Concurrency mantiene un numero definido de entornos de ejecucion inicializados y listos, eliminando los cold starts para esa capacidad base. Reserved Concurrency limita/garantiza la concurrencia maxima pero no pre-calienta entornos. Mas memoria reduce algo el arranque pero no lo elimina. Cambiar de runtime no garantiza eliminar cold starts."
  },
  {
    id: "saa-209",
    dominio: 3,
    tema: "FSx for Lustre",
    tipo: "single",
    enunciado: "Un equipo de machine learning necesita un sistema de archivos compartido de muy alto throughput y baja latencia para procesar datasets de cientos de TB almacenados en Amazon S3, alimentando cientos de instancias de computo durante el entrenamiento. Que servicio de almacenamiento es el mas adecuado?",
    opciones: [
      "Amazon EFS en modo General Purpose",
      "Amazon FSx for Lustre vinculado al bucket S3",
      "Amazon EBS Multi-Attach con io2",
      "Amazon S3 accedido directamente por cada instancia"
    ],
    correctas: [1],
    explicacion: "FSx for Lustre esta optimizado para cargas HPC y ML, ofrece throughput de cientos de GB/s y baja latencia, y se integra nativamente con S3 para cargar y exportar datos. EFS no alcanza el throughput de Lustre para HPC masivo. EBS Multi-Attach es limitado en cantidad de instancias. Acceder a S3 directamente no provee semantica POSIX ni el rendimiento de un FS paralelo."
  },
  {
    id: "saa-210",
    dominio: 3,
    tema: "Kinesis",
    tipo: "single",
    enunciado: "Una plataforma IoT ingiere millones de eventos por segundo y necesita procesarlos en tiempo real con multiples consumidores independientes, manteniendo el orden por dispositivo y permitiendo reproducir datos de las ultimas 24 horas. Que servicio es el mas apropiado?",
    opciones: [
      "Amazon SQS Standard",
      "Amazon Kinesis Data Streams",
      "Amazon Kinesis Data Firehose",
      "Amazon SNS"
    ],
    correctas: [1],
    explicacion: "Kinesis Data Streams ofrece ingesta de alto volumen en tiempo real, multiples consumidores independientes, orden por shard (partition key como el id de dispositivo) y retencion configurable para reproducir datos. SQS no garantiza orden global ni multiples consumidores leyendo lo mismo. Firehose entrega a destinos sin reproduccion ni multi-consumidor en tiempo real. SNS es pub/sub sin retencion ni reproduccion."
  },
  {
    id: "saa-211",
    dominio: 3,
    tema: "SQS Auto Scaling",
    tipo: "multiple",
    enunciado: "Un sistema de procesamiento de imagenes usa instancias EC2 que leen tareas de una cola Amazon SQS. La carga varia mucho durante el dia y el equipo quiere escalar la flota de forma eficiente segun el trabajo pendiente, evitando tanto la saturacion como la capacidad ociosa. Cuales DOS practicas son las mas adecuadas para esta arquitectura desacoplada? (Elegir 2)",
    opciones: [
      "Escalar el Auto Scaling group usando una metrica de backlog por instancia derivada de ApproximateNumberOfMessagesVisible",
      "Configurar el escalado solamente segun el uso promedio de CPU de las instancias",
      "Usar long polling al recibir mensajes para reducir llamadas vacias y mejorar la eficiencia",
      "Escalar segun el numero de conexiones de red entrantes a las instancias",
      "Eliminar la cola SQS y hacer que el productor llame directamente a las instancias por HTTP"
    ],
    correctas: [0, 2],
    explicacion: "El backlog por instancia, derivado de ApproximateNumberOfMessagesVisible, refleja el trabajo pendiente y permite dimensionar la flota a la demanda real; el long polling reduce respuestas vacias y mejora la eficiencia de consumo. La CPU o las conexiones de red no representan el volumen de mensajes. Eliminar SQS reacopla productores y consumidores, perdiendo la resiliencia y elasticidad del patron."
  },
  {
    id: "saa-212",
    dominio: 3,
    tema: "RDS Read Replicas",
    tipo: "single",
    enunciado: "Una aplicacion con base de datos Amazon RDS for PostgreSQL tiene una carga de lectura pesada (reportes y dashboards) que degrada el rendimiento de las escrituras transaccionales en la instancia primaria. El equipo quiere descargar las lecturas sin afectar las escrituras. Que solucion es la mas adecuada?",
    opciones: [
      "Habilitar Multi-AZ en la instancia RDS",
      "Crear una o varias Read Replicas de RDS y dirigir las consultas de reporte hacia ellas",
      "Aumentar el tamano de la instancia primaria",
      "Migrar la base de datos a Amazon Redshift"
    ],
    correctas: [1],
    explicacion: "Las Read Replicas permiten descargar el trafico de lectura (reportes, dashboards) de la primaria, escalando horizontalmente las lecturas sin impactar las escrituras. Multi-AZ es para alta disponibilidad, su standby no atiende lecturas. Escalar verticalmente tiene un limite y costo. Redshift es para data warehousing analitico, no para descarga de lectura transaccional inmediata."
  },
  {
    id: "saa-213",
    dominio: 3,
    tema: "EFS",
    tipo: "single",
    enunciado: "Una aplicacion de analisis genomico necesita un sistema de archivos compartido NFS para cientos de instancias EC2 con un patron de acceso de alto throughput agregado y muchas operaciones en paralelo, escalando automaticamente. El equipo quiere el modo de rendimiento que maximice las operaciones paralelas. Que configuracion de Amazon EFS debe elegir?",
    opciones: [
      "EFS en modo de rendimiento General Purpose",
      "EFS en modo de rendimiento Max I/O",
      "EFS con modo de throughput Bursting solamente",
      "EFS One Zone con General Purpose"
    ],
    correctas: [1],
    explicacion: "El modo Max I/O escala a niveles mas altos de throughput agregado y operaciones por segundo para cargas masivamente paralelas como analisis genomico de gran escala, a costa de una latencia por operacion ligeramente mayor. General Purpose ofrece menor latencia pero un techo de operaciones inferior. El modo de throughput es ortogonal al modo de rendimiento. One Zone afecta durabilidad/costo, no el paralelismo."
  },
  {
    id: "saa-214",
    dominio: 3,
    tema: "Redshift",
    tipo: "single",
    enunciado: "Una empresa necesita ejecutar consultas analiticas complejas sobre petabytes de datos historicos estructurados con joins y agregaciones intensivas, obteniendo el mejor rendimiento para un data warehouse. Que servicio es el mas adecuado?",
    opciones: [
      "Amazon RDS for MySQL con instancias grandes",
      "Amazon Redshift con almacenamiento columnar y procesamiento masivamente paralelo",
      "Amazon DynamoDB con indices secundarios globales",
      "Amazon Athena consultando archivos CSV en S3"
    ],
    correctas: [1],
    explicacion: "Redshift usa almacenamiento columnar y arquitectura MPP optimizada para consultas analiticas complejas con joins y agregaciones sobre grandes volumenes, entregando el mejor rendimiento para data warehousing. RDS es OLTP fila-orientado, no escala a petabytes analiticos. DynamoDB es NoSQL clave-valor, no apto para joins complejos. Athena sobre CSV sin optimizar es lento comparado con Redshift para este patron."
  },
  {
    id: "saa-215",
    dominio: 3,
    tema: "API Gateway Cache",
    tipo: "single",
    enunciado: "Una API REST en Amazon API Gateway recibe muchas peticiones identicas a endpoints cuyos datos cambian con poca frecuencia, generando carga innecesaria en el backend Lambda y aumentando la latencia. El equipo quiere reducir las llamadas al backend y mejorar la latencia. Que solucion es la mas apropiada?",
    opciones: [
      "Habilitar el caching de respuestas en la etapa (stage) de API Gateway con un TTL adecuado",
      "Aumentar el timeout de integracion de Lambda",
      "Mover el backend a EC2 con Auto Scaling",
      "Activar throttling agresivo en el plan de uso"
    ],
    correctas: [0],
    explicacion: "El cache de API Gateway a nivel de stage almacena las respuestas por un TTL configurable, sirviendo respuestas repetidas sin invocar el backend, lo que reduce latencia y carga en Lambda. Aumentar el timeout no reduce llamadas. Cambiar a EC2 no aborda el problema de peticiones repetidas. El throttling limita el trafico pero no cachea ni mejora la latencia de las respuestas validas."
  },
  {
    id: "saa-216",
    dominio: 3,
    tema: "DynamoDB Capacity",
    tipo: "single",
    enunciado: "Una nueva aplicacion lanzara una tabla DynamoDB con un patron de trafico impredecible y picos repentinos, y el equipo no quiere gestionar capacidad ni arriesgar throttling durante lanzamientos virales. Que modo de capacidad debe elegir?",
    opciones: [
      "Provisioned capacity con valores fijos altos",
      "On-demand capacity mode",
      "Provisioned capacity con Auto Scaling y umbrales conservadores",
      "Reserved capacity comprada por adelantado"
    ],
    correctas: [1],
    explicacion: "El modo on-demand ajusta la capacidad instantaneamente segun el trafico sin planificacion, ideal para cargas impredecibles o con picos repentinos, evitando throttling y sin gestion de capacidad. Provisioned fijo arriesga throttling o sobrecosto. Provisioned con Auto Scaling reacciona con retraso ante picos abruptos. Reserved capacity es un descuento de facturacion, no un modo que absorba picos."
  },
  {
    id: "saa-217",
    dominio: 3,
    tema: "Enhanced Networking",
    tipo: "single",
    enunciado: "Un workload que requiere ancho de banda de red muy alto y baja latencia entre instancias EC2 dentro de una VPC no esta alcanzando el rendimiento de red esperado. El equipo verifica que las instancias soportan capacidades avanzadas de red. Que debe habilitar para obtener mayor throughput de paquetes y menor latencia?",
    opciones: [
      "Enhanced Networking con el Elastic Network Adapter (ENA)",
      "Un segundo Elastic IP en cada instancia",
      "Jumbo frames deshabilitados en la VPC",
      "Un NAT Gateway adicional por subred"
    ],
    correctas: [0],
    explicacion: "Enhanced Networking mediante ENA (SR-IOV) ofrece mayor throughput de paquetes por segundo (PPS), menor latencia y menor jitter al hacer bypass del hipervisor. Agregar Elastic IPs no cambia el rendimiento de red. Deshabilitar jumbo frames reduciria el throughput intra-VPC. Un NAT Gateway es para salida a internet, no mejora la red entre instancias."
  },
  {
    id: "saa-218",
    dominio: 3,
    tema: "S3 Transfer Acceleration",
    tipo: "single",
    enunciado: "Usuarios en distintos continentes suben archivos grandes a un bucket S3 ubicado en una sola region y experimentan tiempos de subida muy lentos por la distancia geografica. El equipo quiere acelerar las subidas aprovechando la red de borde de AWS sin cambiar la region del bucket. Que funcion debe habilitar?",
    opciones: [
      "S3 Cross-Region Replication",
      "S3 Transfer Acceleration",
      "S3 Multipart Upload unicamente",
      "S3 Intelligent-Tiering"
    ],
    correctas: [1],
    explicacion: "S3 Transfer Acceleration enruta las subidas a traves de las ubicaciones de borde de CloudFront y la red troncal de AWS, acelerando transferencias de larga distancia hacia el bucket sin cambiar su region. CRR replica datos pero no acelera la subida del usuario. Multipart ayuda pero no resuelve la latencia geografica de la ruta. Intelligent-Tiering optimiza costos de almacenamiento, no la velocidad de subida."
  },
  {
    id: "saa-219",
    dominio: 3,
    tema: "Athena",
    tipo: "single",
    enunciado: "Un equipo necesita ejecutar consultas SQL ad-hoc ocasionales sobre logs en formato Parquet almacenados en Amazon S3, sin aprovisionar ni mantener servidores, pagando solo por los datos escaneados. Que servicio es el mas adecuado y como puede optimizar el rendimiento y costo?",
    opciones: [
      "Amazon Redshift cargando todos los logs en tablas",
      "Amazon Athena consultando directamente S3, usando formato columnar y particionamiento para reducir datos escaneados",
      "Amazon RDS importando los archivos Parquet",
      "Amazon EMR con un cluster permanente"
    ],
    correctas: [1],
    explicacion: "Athena es serverless, consulta datos en S3 con SQL y cobra por datos escaneados; usar formatos columnares como Parquet y particionar reduce el volumen escaneado, mejorando rendimiento y costo. Redshift y EMR requieren aprovisionar infraestructura para consultas ocasionales. RDS no esta disenado para escanear archivos analiticos en S3 de forma ad-hoc."
  },
  {
    id: "saa-220",
    dominio: 3,
    tema: "EFA",
    tipo: "single",
    enunciado: "Una simulacion de dinamica de fluidos (CFD) usa MPI para comunicacion intensiva y de baja latencia entre cientos de nodos EC2. El equipo necesita la interfaz de red que ofrezca el bypass del sistema operativo para comunicaciones HPC a escala. Que debe implementar?",
    opciones: [
      "Elastic Network Adapter (ENA) estandar",
      "Elastic Fabric Adapter (EFA) en un cluster placement group",
      "Multiples interfaces ENI por instancia",
      "Un Transit Gateway entre las instancias"
    ],
    correctas: [1],
    explicacion: "EFA provee una interfaz que permite el bypass del kernel del SO (OS-bypass) para comunicacion de muy baja latencia y alta escala con librerias como MPI, ideal para CFD y HPC. Combinado con un cluster placement group maximiza el rendimiento. ENA estandar no ofrece OS-bypass. Multiples ENIs o un Transit Gateway no aportan la latencia ni la semantica HPC requerida."
  },
  {
    id: "saa-221",
    dominio: 3,
    tema: "OpenSearch",
    tipo: "single",
    enunciado: "Una aplicacion necesita busqueda full-text de baja latencia y analitica sobre logs con dashboards interactivos sobre decenas de millones de documentos. Que servicio gestionado es el mas adecuado para indexacion y busqueda a gran escala?",
    opciones: [
      "Amazon RDS con consultas LIKE",
      "Amazon OpenSearch Service",
      "Amazon DynamoDB con scans",
      "Amazon Neptune"
    ],
    correctas: [1],
    explicacion: "OpenSearch Service esta optimizado para busqueda full-text de baja latencia, analitica de logs e indices invertidos, con dashboards integrados (OpenSearch Dashboards) sobre grandes volumenes. RDS con LIKE no escala para full-text. DynamoDB con scans es ineficiente para busqueda textual. Neptune es una base de grafos, no de busqueda textual."
  },
  {
    id: "saa-222",
    dominio: 3,
    tema: "Instance Store",
    tipo: "multiple",
    enunciado: "Una aplicacion de cache distribuida y base de datos NoSQL temporal requiere el almacenamiento de bloque de menor latencia y mayores IOPS posibles adjunto a la instancia EC2, y puede tolerar la perdida de datos si la instancia se detiene. El equipo evalua opciones de alto rendimiento y sus implicancias. Cuales DOS afirmaciones son correctas? (Elegir 2)",
    opciones: [
      "El Instance Store (NVMe local efimero) ofrece la menor latencia y las mayores IOPS al estar fisicamente adjunto al host",
      "Los datos del Instance Store se pierden si la instancia se detiene o termina, por lo que solo conviene para datos temporales o replicados",
      "El Instance Store persiste los datos automaticamente tras detener la instancia, igual que EBS",
      "Amazon EFS ofrece menor latencia de bloque que el NVMe local",
      "Amazon S3 funciona como un volumen de bloque adjunto de baja latencia"
    ],
    correctas: [0, 1],
    explicacion: "El Instance Store NVMe local entrega la menor latencia y las mayores IOPS por estar adjunto al host, pero su contenido es efimero y se pierde al detener o terminar la instancia, por lo que solo conviene para datos temporales o que se puedan reconstruir/replicar. No persiste como EBS. EFS y S3 son almacenamiento de red con mayor latencia y S3 no es un volumen de bloque."
  },
  {
    id: "saa-223",
    dominio: 3,
    tema: "Auto Scaling",
    tipo: "single",
    enunciado: "Una aplicacion web tiene picos de trafico predecibles cada dia laboral a las 9:00 AM cuando los empleados inician sesion masivamente, lo que causa latencia hasta que el escalado reactivo responde. El equipo quiere que la capacidad este lista antes del pico. Que tipo de politica de Auto Scaling debe configurar?",
    opciones: [
      "Politica de escalado dinamico basada en CPU (target tracking)",
      "Politica de escalado programado (scheduled scaling) para aumentar la capacidad antes de las 9:00 AM",
      "Politica de escalado simple con cooldown largo",
      "Escalado manual cada manana"
    ],
    correctas: [1],
    explicacion: "El scheduled scaling aumenta la capacidad en horarios conocidos de antemano, asegurando que las instancias esten listas antes del pico predecible de las 9:00 AM. El escalado dinamico reacciona despues de detectar carga, dejando latencia inicial. El escalado simple con cooldown es reactivo. El escalado manual no es confiable ni automatico."
  },
  {
    id: "saa-224",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una aplicacion sirve contenido dinamico personalizado por usuario y tambien assets estaticos a traves de una distribucion CloudFront. El equipo nota que el contenido dinamico no debe cachearse mientras los assets estaticos si. Como deben configurarse los cache behaviors para optimizar el rendimiento?",
    opciones: [
      "Un unico cache behavior con TTL cero para todo",
      "Cache behaviors por patron de ruta: TTL cero o caching basado en cabeceras para lo dinamico y TTL largo para los assets estaticos",
      "Deshabilitar CloudFront para el contenido dinamico",
      "Cachear todo con TTL largo y purgar manualmente"
    ],
    correctas: [1],
    explicacion: "CloudFront permite multiples cache behaviors por patron de ruta: para assets estaticos un TTL largo maximiza el hit ratio, mientras que para contenido dinamico personalizado se usa TTL cero o caching basado en cabeceras/cookies. Un TTL cero global desperdicia el cache de estaticos. Deshabilitar CloudFront pierde el beneficio de borde. Cachear todo con TTL largo sirve datos obsoletos a distintos usuarios."
  },
  {
    id: "saa-225",
    dominio: 3,
    tema: "Kinesis Firehose",
    tipo: "single",
    enunciado: "Una empresa quiere ingerir streams de logs y entregarlos automaticamente a Amazon S3 y Amazon Redshift con transformacion y buffering, sin administrar infraestructura de consumo ni escribir codigo de consumidores. Que servicio es el mas adecuado?",
    opciones: [
      "Amazon Kinesis Data Streams con consumidores Lambda personalizados",
      "Amazon Kinesis Data Firehose",
      "Amazon SQS con workers EC2",
      "Amazon MSK (Kafka gestionado)"
    ],
    correctas: [1],
    explicacion: "Kinesis Data Firehose es totalmente gestionado, hace buffering, transformacion opcional con Lambda y entrega automatica a destinos como S3 y Redshift sin administrar consumidores. Data Streams requiere construir y operar consumidores. SQS con workers exige gestionar EC2 y logica de entrega. MSK requiere operar y configurar consumidores Kafka."
  },
  {
    id: "saa-226",
    dominio: 3,
    tema: "Compute Optimized",
    tipo: "single",
    enunciado: "Una aplicacion de procesamiento de video por lotes y modelado cientifico esta limitada por la capacidad de calculo del procesador, con uso de CPU sostenido al 100% y poca necesidad relativa de memoria. Que familia de instancias EC2 ofrece el mejor rendimiento por costo para esta carga?",
    opciones: [
      "Instancias de proposito general (familia M)",
      "Instancias optimizadas para computo (familia C)",
      "Instancias optimizadas para memoria (familia R)",
      "Instancias optimizadas para almacenamiento (familia I)"
    ],
    correctas: [1],
    explicacion: "Las instancias de la familia C (compute optimized) ofrecen la mayor relacion de potencia de CPU por costo, ideales para cargas intensivas en procesador como codificacion de video y modelado cientifico. La familia M es balanceada. La familia R prioriza memoria, innecesaria aqui. La familia I prioriza almacenamiento NVMe, no calculo de CPU."
  },
  {
    id: "saa-227",
    dominio: 3,
    tema: "Fargate",
    tipo: "single",
    enunciado: "Un equipo quiere ejecutar contenedores con escalado rapido y sin gestionar ni parchear servidores EC2 subyacentes, pagando por los recursos asignados a cada tarea para una aplicacion con carga intermitente. Que opcion de computo es la mas adecuada?",
    opciones: [
      "Amazon ECS sobre EC2 autoadministrado",
      "AWS Fargate con Amazon ECS o EKS",
      "Instancias EC2 con Docker instalado manualmente",
      "AWS Batch sobre un Compute Environment de EC2"
    ],
    correctas: [1],
    explicacion: "Fargate ejecuta contenedores sin gestionar servidores, escala rapido por tarea y cobra por los recursos (vCPU/memoria) asignados, ideal para cargas intermitentes sin overhead operativo. ECS/EKS sobre EC2 requiere administrar y parchear la flota. EC2 con Docker manual implica gestion completa. AWS Batch sobre EC2 tambien implica administrar el entorno de computo."
  },
  {
    id: "saa-228",
    dominio: 3,
    tema: "EBS gp3",
    tipo: "single",
    enunciado: "Una aplicacion usa volumenes EBS gp2 y el equipo descubre que necesita mas IOPS y throughput, pero sin verse forzado a aumentar el tamano del volumen (ya que en gp2 el rendimiento escala con el tamano). Quieren mejorar costo y configurar IOPS y throughput de forma independiente del tamano. Que deben hacer?",
    opciones: [
      "Migrar los volumenes a gp3, que permite configurar IOPS y throughput independientemente del tamano",
      "Migrar a io2 con el maximo de IOPS",
      "Aumentar drasticamente el tamano de los volumenes gp2",
      "Migrar a Throughput Optimized HDD (st1)"
    ],
    correctas: [0],
    explicacion: "gp3 desacopla el rendimiento del tamano: se pueden aprovisionar IOPS y throughput de forma independiente, a menor costo base que gp2 para muchas cargas. io2 es mas caro y orientado a IOPS muy altas con durabilidad extrema. Agrandar gp2 desperdicia capacidad para ganar rendimiento. st1 es HDD secuencial, inadecuado para IOPS aleatorias."
  },
  {
    id: "saa-229",
    dominio: 3,
    tema: "DynamoDB Partitions",
    tipo: "single",
    enunciado: "Una tabla DynamoDB sufre throttling a pesar de tener capacidad provisionada suficiente en agregado. La investigacion muestra que la mayoria de las peticiones golpean un pequeno conjunto de valores de clave de particion. Cual es la causa raiz y la mejor solucion?",
    opciones: [
      "La region esta mal elegida; cambiar de region",
      "Existe una hot partition por baja cardinalidad de la partition key; redisenar la clave con mayor cardinalidad o usar write sharding",
      "Falta habilitar cifrado en reposo; activarlo",
      "El modo on-demand causa el throttling; cambiar a provisioned"
    ],
    correctas: [1],
    explicacion: "El throttling con capacidad agregada suficiente indica una hot partition: una partition key de baja cardinalidad concentra el trafico en pocas particiones. La solucion es disenar una clave de alta cardinalidad o aplicar write sharding (sufijos) para distribuir uniformemente. La region y el cifrado no influyen en la distribucion. On-demand no es la causa; tambien se distribuye por particion."
  },
  {
    id: "saa-230",
    dominio: 3,
    tema: "Aurora Read Scaling",
    tipo: "single",
    enunciado: "Una aplicacion lee y escribe en Amazon Aurora MySQL. El equipo quiere que las consultas de solo lectura usen automaticamente las replicas y que las escrituras vayan a la instancia primaria, sin gestionar manualmente las conexiones a cada endpoint. Que mecanismo de Aurora deben utilizar?",
    opciones: [
      "El cluster endpoint para todas las operaciones",
      "El reader endpoint de Aurora para las lecturas y el writer (cluster) endpoint para las escrituras",
      "Una IP fija de una replica especifica",
      "Un Network Load Balancer manual delante de las replicas"
    ],
    correctas: [1],
    explicacion: "Aurora provee un reader endpoint que balancea automaticamente las conexiones de lectura entre las replicas disponibles, mientras el cluster (writer) endpoint dirige las escrituras a la primaria. Usar el cluster endpoint para todo no distribuye lecturas. Una IP fija no balancea ni tolera failover. Un NLB manual reinventa una capacidad que Aurora ya ofrece de forma gestionada."
  },
  {
    id: "saa-231",
    dominio: 3,
    tema: "ElastiCache Memcached",
    tipo: "single",
    enunciado: "Una aplicacion necesita una cache en memoria simple para almacenar resultados de consultas, que pueda escalar horizontalmente agregando nodos y aprovechar multiples nucleos de CPU por nodo, sin requerir persistencia, replicacion ni estructuras de datos complejas. Que motor de ElastiCache es el mas apropiado?",
    opciones: [
      "ElastiCache for Redis con cluster mode",
      "ElastiCache for Memcached",
      "DynamoDB DAX",
      "Amazon CloudFront"
    ],
    correctas: [1],
    explicacion: "Memcached es multi-hilo (aprovecha varios nucleos), escala horizontalmente agregando nodos y es ideal para caching simple de objetos sin necesidad de persistencia, replicacion ni estructuras avanzadas. Redis aporta persistencia y estructuras complejas que aqui no se necesitan. DAX es exclusivo de DynamoDB. CloudFront es una CDN, no una cache en memoria de aplicacion."
  },
  {
    id: "saa-232",
    dominio: 3,
    tema: "EMR",
    tipo: "single",
    enunciado: "Una empresa procesa periodicamente grandes volumenes de datos con frameworks de big data como Apache Spark y Hadoop, y quiere un servicio gestionado que aprovisione clusters elasticos, con opcion de instancias Spot para reducir costos en tareas tolerantes a interrupciones. Que servicio es el mas adecuado?",
    opciones: [
      "Amazon Athena",
      "Amazon EMR",
      "Amazon Redshift",
      "AWS Glue con crawlers unicamente"
    ],
    correctas: [1],
    explicacion: "Amazon EMR gestiona clusters de big data para Spark, Hadoop y otros frameworks, escala elasticamente y permite usar instancias Spot en nodos de tarea para reducir costos en cargas tolerantes a interrupciones. Athena es para consultas SQL serverless, no para procesamiento Spark/Hadoop a medida. Redshift es data warehousing. Glue con crawlers solo cataloga; no es el motor para procesamiento Spark a escala personalizada."
  },
  {
    id: "saa-233",
    dominio: 3,
    tema: "Global Routing Performance",
    tipo: "multiple",
    enunciado: "Una aplicacion esta desplegada en multiples regiones de AWS y el equipo quiere que cada usuario alcance el endpoint que le ofrezca el mejor rendimiento de red para mejorar la experiencia global. Evaluan distintas tecnicas de AWS. Cuales DOS opciones dirigen el trafico priorizando la menor latencia hacia la region optima? (Elegir 2)",
    opciones: [
      "Route 53 con politica de enrutamiento latency-based routing",
      "AWS Global Accelerator, que enruta por la red troncal de AWS al endpoint regional optimo",
      "Route 53 con weighted routing en proporciones fijas",
      "Route 53 con failover routing activo/pasivo",
      "Route 53 con simple routing apuntando a una sola region"
    ],
    correctas: [0, 1],
    explicacion: "El latency-based routing de Route 53 resuelve el DNS hacia la region de menor latencia medida, y Global Accelerator usa la red troncal de AWS con IPs anycast para enrutar al endpoint regional optimo y saludable. Weighted distribuye por proporciones definidas, failover es para HA activo/pasivo y simple routing apunta siempre a un unico destino; ninguno optimiza por latencia global."
  },
  {
    id: "saa-234",
    dominio: 3,
    tema: "Glue",
    tipo: "single",
    enunciado: "Un equipo de datos necesita un servicio ETL serverless que descubra y catalogue esquemas automaticamente, transforme datos a escala usando Spark gestionado y prepare datos para analitica, sin aprovisionar clusters. Que servicio cumple mejor estos requisitos?",
    opciones: [
      "Amazon Kinesis Data Streams",
      "AWS Glue con crawlers, Data Catalog y jobs de Spark serverless",
      "Amazon EMR con clusters permanentes",
      "Amazon QuickSight"
    ],
    correctas: [1],
    explicacion: "AWS Glue es ETL serverless: sus crawlers descubren esquemas y los registran en el Data Catalog, y sus jobs ejecutan transformaciones Spark a escala sin aprovisionar ni gestionar clusters. Kinesis es ingesta de streaming, no ETL por lotes con catalogo. EMR con clusters permanentes implica administracion. QuickSight es visualizacion/BI, no ETL."
  },
  {
    id: "saa-235",
    dominio: 3,
    tema: "Lambda Concurrency",
    tipo: "single",
    enunciado: "Varias funciones Lambda comparten el limite de concurrencia de la cuenta. Una funcion critica de pagos a veces es estrangulada (throttled) porque otras funciones consumen toda la concurrencia disponible durante picos. El equipo quiere garantizar capacidad de ejecucion para la funcion de pagos. Que debe configurar?",
    opciones: [
      "Provisioned Concurrency unicamente",
      "Reserved Concurrency en la funcion de pagos para garantizarle una porcion del limite de la cuenta",
      "Aumentar la memoria de la funcion de pagos",
      "Mover la funcion de pagos a otra region"
    ],
    correctas: [1],
    explicacion: "Reserved Concurrency aparta una porcion del limite de concurrencia de la cuenta exclusivamente para la funcion de pagos, garantizando que siempre tenga capacidad y aislandola del consumo de otras funciones. Provisioned Concurrency reduce cold starts pero no reserva cuota frente a otras funciones por si sola. La memoria no afecta la cuota de concurrencia. Cambiar de region no resuelve el reparto del limite."
  },
  {
    id: "saa-236",
    dominio: 3,
    tema: "EBS Throughput",
    tipo: "single",
    enunciado: "Una aplicacion de big data realiza lecturas y escrituras secuenciales de gran tamano (procesamiento de logs y MapReduce) sobre un volumen EBS y prioriza el throughput por MB/s sobre las IOPS, buscando el menor costo posible para este patron secuencial. Que tipo de volumen es el mas adecuado?",
    opciones: [
      "General Purpose SSD (gp3)",
      "Throughput Optimized HDD (st1)",
      "Provisioned IOPS SSD (io2)",
      "Cold HDD (sc1)"
    ],
    correctas: [1],
    explicacion: "st1 (Throughput Optimized HDD) esta disenado para cargas secuenciales de alto throughput como big data, data warehouses y procesamiento de logs, a bajo costo. gp3 e io2 son SSD optimizados para IOPS, mas caros para throughput secuencial puro. sc1 (Cold HDD) es de menor throughput, pensado para datos accedidos con poca frecuencia."
  },
  {
    id: "saa-237",
    dominio: 3,
    tema: "Partition Placement Group",
    tipo: "single",
    enunciado: "Un cluster distribuido grande de HDFS/Cassandra necesita desplegar muchas instancias EC2 de modo que un fallo de hardware afecte solo a un subconjunto controlado de nodos, manteniendo a la vez conciencia de la topologia para la replicacion de datos. Que estrategia de placement group es la mas apropiada?",
    opciones: [
      "Cluster placement group",
      "Partition placement group",
      "Spread placement group",
      "Sin placement group"
    ],
    correctas: [1],
    explicacion: "El partition placement group agrupa instancias en particiones logicas sobre racks de hardware distintos, de modo que el fallo de una particion no afecta a las demas; es ideal para sistemas distribuidos grandes como HDFS, HBase y Cassandra que aprovechan la topologia para replicar. Cluster prioriza baja latencia pero no aisla por particiones. Spread se limita a pocas instancias por grupo. Sin grupo no hay control de topologia."
  },
  {
    id: "saa-238",
    dominio: 3,
    tema: "CloudFront + S3 Performance",
    tipo: "multiple",
    enunciado: "Una aplicacion sirve un sitio estatico pesado y archivos descargables a una audiencia global desde S3. El equipo quiere maximizar el rendimiento de entrega y minimizar la latencia. Cuales DOS acciones contribuyen directamente a estos objetivos? (Elegir 2)",
    opciones: [
      "Distribuir el contenido con Amazon CloudFront para cachear en ubicaciones de borde cercanas a los usuarios",
      "Habilitar la compresion automatica de objetos en CloudFront para reducir el tamano transferido",
      "Mover los objetos a la clase de almacenamiento S3 Glacier Deep Archive",
      "Deshabilitar HTTP/2 en la distribucion de CloudFront",
      "Servir todo el contenido directamente desde el bucket S3 sin CDN"
    ],
    correctas: [0, 1],
    explicacion: "CloudFront cachea en el borde, reduciendo latencia para usuarios globales, y la compresion automatica disminuye los bytes transferidos, acelerando la entrega. Glacier Deep Archive es para archivado frio con recuperacion de horas, inadecuado para servir contenido. Deshabilitar HTTP/2 empeora el rendimiento. Servir directo desde S3 sin CDN aumenta la latencia global."
  },
  {
    id: "saa-239",
    dominio: 3,
    tema: "Read Scaling Options",
    tipo: "multiple",
    enunciado: "Una aplicacion con base de datos relacional sufre cuellos de botella por una carga de lectura muy alta y repetitiva. El arquitecto quiere escalar la capacidad de lectura y aliviar la base de datos. Cuales DOS soluciones logran descargar y escalar las lecturas? (Elegir 2)",
    opciones: [
      "Agregar Read Replicas a la base de datos para distribuir las consultas de lectura",
      "Introducir una capa de cache con Amazon ElastiCache para las consultas frecuentes",
      "Habilitar Multi-AZ para que el standby atienda lecturas",
      "Reducir el tamano de la instancia primaria para ahorrar costos",
      "Convertir todas las consultas de lectura en escrituras idempotentes"
    ],
    correctas: [0, 1],
    explicacion: "Las Read Replicas distribuyen el trafico de lectura escalando horizontalmente, y ElastiCache sirve resultados frecuentes desde memoria, reduciendo drasticamente la carga sobre la base de datos. El standby de Multi-AZ no atiende lecturas (solo failover). Reducir la instancia empeora el cuello de botella. Convertir lecturas en escrituras no tiene sentido y aumentaria la carga de escritura."
  },
  {
    id: "saa-240",
    dominio: 3,
    tema: "Decoupling and Streaming",
    tipo: "multiple",
    enunciado: "Una arquitectura debe ingerir y procesar eventos a alta escala, desacoplando productores de consumidores para que el sistema escale de forma elastica y resiliente ante picos. Cuales DOS servicios son apropiados para desacoplar e ingerir a alta escala segun el patron de consumo? (Elegir 2)",
    opciones: [
      "Amazon SQS para desacoplar tareas con consumidores que escalan segun la profundidad de la cola",
      "Amazon Kinesis Data Streams para streaming de alto volumen en tiempo real con multiples consumidores",
      "Amazon RDS como bus de mensajes entre microservicios",
      "Un volumen EBS compartido como cola de eventos",
      "Amazon Route 53 para distribuir los eventos entre consumidores"
    ],
    correctas: [0, 1],
    explicacion: "SQS desacopla productores y consumidores y permite escalar la flota segun la profundidad de la cola, absorbiendo picos. Kinesis Data Streams ingiere streams de alto volumen en tiempo real con multiples consumidores independientes y orden por shard. RDS no es un bus de mensajes. EBS no es una cola y no se comparte asi a escala. Route 53 es DNS, no un mecanismo de distribucion de eventos."
  }
]);
