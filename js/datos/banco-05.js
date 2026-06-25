window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-161",
    dominio: 2,
    tema: "RDS Multi-AZ",
    tipo: "single",
    enunciado: "Una empresa ejecuta una base de datos transaccional crítica en Amazon RDS for PostgreSQL en una sola Zona de Disponibilidad. Durante un mantenimiento de hardware reciente, la base de datos quedó inaccesible varias horas, afectando a la aplicación. El equipo necesita minimizar el tiempo de inactividad ante fallos de la AZ o de la instancia, sin cambiar el código de la aplicación. ¿Qué solución cumple este requisito?",
    opciones: [
      "Crear una réplica de lectura de Amazon RDS en otra AZ y redirigir manualmente las escrituras cuando falle la instancia primaria.",
      "Habilitar el despliegue Multi-AZ en la instancia de RDS para tener una réplica en espera con conmutación automática por error.",
      "Migrar la base de datos a una instancia EC2 con replicación nativa de PostgreSQL configurada por el equipo.",
      "Programar snapshots automáticos cada hora y restaurarlos manualmente en otra AZ cuando ocurra un fallo."
    ],
    correctas: [1],
    explicacion: "El despliegue Multi-AZ de RDS mantiene una instancia en espera sincrónica en otra AZ y realiza failover automático mediante el mismo endpoint DNS, sin cambios en la aplicación. Las réplicas de lectura sirven para escalar lecturas y requieren promoción manual; EC2 autogestionado agrega complejidad operativa; los snapshots manuales no cumplen un RTO bajo automático."
  },
  {
    id: "saa-162",
    dominio: 2,
    tema: "Auto Scaling health checks",
    tipo: "single",
    enunciado: "Una aplicación web corre detrás de un Application Load Balancer en un Auto Scaling group. A veces una instancia EC2 sigue en estado 'running' pero la aplicación dentro deja de responder peticiones HTTP, y el grupo no la reemplaza. ¿Qué acción resuelve mejor el problema?",
    opciones: [
      "Reducir el periodo de gracia de health check del Auto Scaling group a cero segundos.",
      "Cambiar el tipo de health check del Auto Scaling group a ELB para que use los health checks del balanceador.",
      "Configurar un health check de Amazon Route 53 sobre cada instancia individual.",
      "Aumentar el número mínimo de instancias del grupo para tener capacidad extra."
    ],
    correctas: [1],
    explicacion: "Con el health check de tipo EC2, el ASG solo verifica el estado de la instancia, no la aplicación. Al usar el health check de tipo ELB, el grupo considera el estado del target en el balanceador; si la aplicación falla el health check HTTP, el ASG marca la instancia como no saludable y la reemplaza. Reducir la gracia a cero o subir el mínimo no detecta el fallo de la app."
  },
  {
    id: "saa-163",
    dominio: 2,
    tema: "Route 53 failover",
    tipo: "single",
    enunciado: "Una empresa aloja su sitio principal en una región de AWS y mantiene un sitio de respaldo estático en Amazon S3 en otra región. Quieren que, si el sitio principal deja de estar disponible, el tráfico se redirija automáticamente al sitio de respaldo. ¿Qué configuración de Amazon Route 53 deben usar?",
    opciones: [
      "Una política de enrutamiento por latencia entre los dos endpoints.",
      "Una política de enrutamiento de failover con un registro primario y uno secundario asociados a health checks.",
      "Una política de enrutamiento ponderado con peso 100 en el primario y 0 en el secundario.",
      "Una política de enrutamiento de geolocalización por continente."
    ],
    correctas: [1],
    explicacion: "El enrutamiento de failover con registros primario y secundario y un health check sobre el primario redirige automáticamente al secundario cuando el primario se vuelve no saludable. La latencia y la geolocalización optimizan rendimiento o ubicación pero no realizan conmutación por fallo; el ponderado con 0 no reacciona a la salud del endpoint."
  },
  {
    id: "saa-164",
    dominio: 2,
    tema: "Disaster Recovery RTO/RPO",
    tipo: "single",
    enunciado: "Una compañía financiera necesita una estrategia de recuperación ante desastres en otra región con un RTO de pocos minutos y un RPO cercano a cero, manteniendo una versión reducida del entorno siempre encendida que pueda escalar rápidamente. ¿Qué estrategia de DR describe mejor este requisito?",
    opciones: [
      "Backup & Restore.",
      "Pilot Light.",
      "Warm Standby.",
      "Multi-Site Active/Active."
    ],
    correctas: [2],
    explicacion: "Warm Standby mantiene una copia funcional pero reducida del entorno siempre en ejecución en la región de DR, lista para escalar a plena capacidad en minutos, lo que da RTO bajo y RPO bajo con costo moderado. Backup & Restore y Pilot Light tienen RTO mayores; Active/Active da RTO casi nulo pero a un costo mucho más alto que el descrito."
  },
  {
    id: "saa-165",
    dominio: 2,
    tema: "SQS desacoplamiento",
    tipo: "single",
    enunciado: "Una aplicación de procesamiento de pedidos pierde solicitudes cuando los servidores de backend se saturan en picos de tráfico. La empresa quiere desacoplar el frontend de los trabajadores de backend para absorber picos y evitar la pérdida de mensajes. ¿Qué servicio cumple mejor este objetivo?",
    opciones: [
      "Colocar una cola de Amazon SQS entre el frontend y los trabajadores para almacenar las solicitudes hasta su procesamiento.",
      "Aumentar el tamaño de instancia de los servidores de backend para soportar más carga.",
      "Usar Amazon SNS para enviar notificaciones directas a cada servidor de backend.",
      "Habilitar sesiones persistentes (sticky sessions) en el Application Load Balancer."
    ],
    correctas: [0],
    explicacion: "Una cola de Amazon SQS desacopla productores y consumidores: el frontend encola las solicitudes y los trabajadores las procesan a su ritmo, absorbiendo picos sin pérdida de mensajes. Escalar verticalmente no garantiza absorber todos los picos; SNS es publicación/suscripción sin buffer persistente para procesar a ritmo; las sticky sessions no resuelven la saturación."
  },
  {
    id: "saa-166",
    dominio: 2,
    tema: "Aurora Global Database",
    tipo: "single",
    enunciado: "Una empresa global ejecuta una aplicación crítica sobre Amazon Aurora MySQL en us-east-1 y necesita recuperación ante desastres en eu-west-1 con replicación de baja latencia, RPO típico menor a un segundo y posibilidad de promover la región secundaria en menos de un minuto. ¿Qué solución cumple estos requisitos?",
    opciones: [
      "Configurar réplicas de lectura entre regiones de Aurora MySQL estándar.",
      "Usar Amazon Aurora Global Database con una región secundaria.",
      "Programar copias cross-region de snapshots de Aurora cada hora.",
      "Habilitar el despliegue Multi-AZ del clúster de Aurora."
    ],
    correctas: [1],
    explicacion: "Aurora Global Database replica con una latencia típica menor a un segundo a regiones secundarias usando infraestructura dedicada de almacenamiento, con RPO típicamente bajo y promoción de la región secundaria en menos de un minuto. Las réplicas estándar y los snapshots cross-region tienen mayor latencia/RPO; Multi-AZ protege dentro de una región, no entre regiones."
  },
  {
    id: "saa-167",
    dominio: 2,
    tema: "S3 Cross-Region Replication",
    tipo: "single",
    enunciado: "Una organización debe mantener una copia de sus objetos de Amazon S3 en otra región de AWS por requisitos de cumplimiento y resiliencia, de forma automática y para los objetos nuevos que se vayan creando. ¿Qué configuración deben aplicar?",
    opciones: [
      "Habilitar S3 Versioning y configurar Cross-Region Replication (CRR) hacia un bucket en otra región.",
      "Activar el cifrado del lado del servidor con AWS KMS en el bucket de origen.",
      "Configurar una regla de ciclo de vida que mueva los objetos a S3 Glacier en otra región.",
      "Usar S3 Transfer Acceleration para copiar manualmente los objetos."
    ],
    correctas: [0],
    explicacion: "La replicación entre regiones (CRR) copia automáticamente los objetos nuevos a un bucket de destino en otra región y requiere que el versionado esté habilitado en origen y destino. El cifrado no replica datos; las reglas de ciclo de vida cambian la clase de almacenamiento pero no copian a otra región; Transfer Acceleration solo acelera transferencias, no automatiza la replicación."
  },
  {
    id: "saa-168",
    dominio: 2,
    tema: "Stateless sessions",
    tipo: "single",
    enunciado: "Una aplicación web detrás de un Auto Scaling group guarda las sesiones de usuario en memoria local de cada instancia EC2. Cuando el grupo escala hacia adentro y termina instancias, los usuarios pierden la sesión. La empresa quiere que las instancias sean efímeras sin afectar la experiencia. ¿Qué solución recomienda?",
    opciones: [
      "Habilitar sticky sessions en el balanceador para fijar cada usuario a una instancia.",
      "Almacenar el estado de sesión en un almacén externo como Amazon ElastiCache for Redis o Amazon DynamoDB.",
      "Aumentar el periodo de gracia de health check para que las instancias no se terminen tan rápido.",
      "Configurar el Auto Scaling group con una sola instancia para evitar la terminación."
    ],
    correctas: [1],
    explicacion: "Externalizar el estado de sesión a un almacén compartido como ElastiCache for Redis o DynamoDB hace que las instancias sean realmente stateless y descartables, conservando la sesión aunque cualquier instancia termine. Las sticky sessions siguen perdiendo la sesión si la instancia termina; las otras opciones reducen escalabilidad y resiliencia."
  },
  {
    id: "saa-169",
    dominio: 2,
    tema: "EFS multi-AZ",
    tipo: "single",
    enunciado: "Una aplicación de procesamiento de contenido corre en varias instancias EC2 distribuidas en tres Zonas de Disponibilidad y todas necesitan leer y escribir en un mismo sistema de archivos compartido con alta disponibilidad. ¿Qué servicio de almacenamiento es el más adecuado?",
    opciones: [
      "Volúmenes de Amazon EBS conectados a cada instancia.",
      "Amazon EFS montado desde las instancias de todas las AZ.",
      "Instance store local en cada instancia EC2.",
      "Amazon S3 montado como sistema de archivos en cada instancia."
    ],
    correctas: [1],
    explicacion: "Amazon EFS es un sistema de archivos compartido NFS, accesible simultáneamente desde múltiples instancias en varias AZ y con almacenamiento redundante entre AZ, ideal para acceso concurrente con alta disponibilidad. EBS se asocia a una sola instancia/AZ; el instance store es efímero; S3 no es un sistema de archivos POSIX compartido nativo."
  },
  {
    id: "saa-170",
    dominio: 2,
    tema: "EC2 Auto Recovery",
    tipo: "single",
    enunciado: "Una instancia EC2 ejecuta una aplicación legada que no puede distribuirse en varias instancias. La empresa quiere que, si la instancia sufre un problema de hardware subyacente, se recupere automáticamente en hardware sano conservando su misma dirección IP privada y sus volúmenes EBS. ¿Qué medida cumple este objetivo?",
    opciones: [
      "Configurar la recuperación automática de la instancia EC2 mediante una alarma de Amazon CloudWatch sobre un fallo de estado del sistema.",
      "Colocar la instancia en un Auto Scaling group con mínimo y máximo de una instancia.",
      "Crear una réplica de lectura de la instancia en otra AZ.",
      "Habilitar la protección contra terminación en la instancia."
    ],
    correctas: [0],
    explicacion: "La recuperación automática de EC2, accionada por una alarma de CloudWatch sobre un fallo de system status check, reinicia la instancia en hardware sano conservando ID de instancia, IP privada, IP elástica y volúmenes EBS. Un ASG de 1/1 reemplazaría con una instancia nueva distinta; la réplica de lectura aplica a bases de datos; la protección contra terminación no recupera ante fallo de hardware."
  },
  {
    id: "saa-171",
    dominio: 2,
    tema: "DynamoDB Global Tables",
    tipo: "single",
    enunciado: "Una aplicación móvil con usuarios en varios continentes usa Amazon DynamoDB y necesita lecturas y escrituras de baja latencia en cada región, además de resiliencia ante la pérdida de una región completa. ¿Qué solución cumple estos requisitos?",
    opciones: [
      "Habilitar DynamoDB Streams y procesar los cambios con AWS Lambda en cada región.",
      "Configurar DynamoDB Global Tables con réplicas multi-región activas.",
      "Crear copias bajo demanda de la tabla y restaurarlas en otras regiones.",
      "Habilitar backups de point-in-time recovery en la tabla principal."
    ],
    correctas: [1],
    explicacion: "Las Global Tables de DynamoDB ofrecen replicación multi-región activa-activa, permitiendo lecturas y escrituras de baja latencia en cada región y resiliencia ante la caída de una región. Los Streams solo capturan cambios; las copias y el point-in-time recovery son para respaldo/restauración, no para servir tráfico multi-región de baja latencia en vivo."
  },
  {
    id: "saa-172",
    dominio: 2,
    tema: "SQS DLQ",
    tipo: "single",
    enunciado: "Un sistema usa Amazon SQS para encolar trabajos. Algunos mensajes con formato inválido hacen fallar repetidamente al consumidor, vuelven a la cola y bloquean el procesamiento del resto. La empresa quiere aislar esos mensajes problemáticos para analizarlos sin detener el flujo. ¿Qué configuración resuelve esto?",
    opciones: [
      "Aumentar el tiempo de visibilidad (visibility timeout) de la cola principal.",
      "Configurar una cola de mensajes muertos (dead-letter queue) con un maxReceiveCount adecuado.",
      "Cambiar la cola a tipo FIFO para garantizar el orden de los mensajes.",
      "Reducir el periodo de retención de mensajes de la cola."
    ],
    correctas: [1],
    explicacion: "Una dead-letter queue captura los mensajes que superan el maxReceiveCount de reintentos, aislando los que fallan repetidamente para analizarlos sin bloquear el procesamiento del resto. Ajustar el visibility timeout o la retención no aísla los mensajes problemáticos; FIFO controla el orden, no el aislamiento de fallos."
  },
  {
    id: "saa-173",
    dominio: 2,
    tema: "CloudFront origin failover",
    tipo: "single",
    enunciado: "Una empresa sirve contenido mediante Amazon CloudFront con un bucket de Amazon S3 como origen. Quieren que, si el bucket de origen principal devuelve errores, CloudFront sirva el contenido desde un bucket secundario automáticamente. ¿Qué característica deben configurar?",
    opciones: [
      "Una política de caché con TTL más largo para servir contenido en caché ante fallos.",
      "Un grupo de orígenes (origin group) de CloudFront con failover de origen primario y secundario.",
      "Una distribución adicional de CloudFront apuntando al bucket secundario.",
      "Lambda@Edge para reescribir las solicitudes hacia el bucket secundario."
    ],
    correctas: [1],
    explicacion: "El origin failover de CloudFront usa un grupo de orígenes con un origen primario y uno secundario; ante códigos de error configurados del primario, CloudFront recurre automáticamente al secundario. Un TTL largo no garantiza disponibilidad de objetos no cacheados; otra distribución requiere conmutación manual; Lambda@Edge es más complejo y no es la solución nativa para failover de origen."
  },
  {
    id: "saa-174",
    dominio: 2,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Una empresa ejecuta una aplicación en endpoints de dos regiones de AWS y quiere conmutación rápida de tráfico entre regiones ante fallos, con direcciones IP estáticas de entrada y mejor rendimiento de red usando la red troncal de AWS. ¿Qué servicio cumple mejor estos requisitos?",
    opciones: [
      "Amazon Route 53 con enrutamiento por latencia.",
      "AWS Global Accelerator con endpoints en ambas regiones.",
      "Amazon CloudFront con varios orígenes.",
      "Un Application Load Balancer interregional."
    ],
    correctas: [1],
    explicacion: "AWS Global Accelerator provee IP anycast estáticas, enruta el tráfico por la red troncal de AWS y realiza failover rápido entre endpoints regionales en función de su salud, sin depender del TTL de DNS. Route 53 depende de propagación/TTL de DNS; CloudFront es para distribución de contenido cacheable; un ALB no abarca varias regiones."
  },
  {
    id: "saa-175",
    dominio: 2,
    tema: "Auto Scaling target tracking",
    tipo: "single",
    enunciado: "Un equipo quiere que su Auto Scaling group mantenga el uso promedio de CPU de la flota alrededor del 50%, agregando o quitando instancias automáticamente según la demanda, con la mínima configuración manual de umbrales. ¿Qué política de escalado deben usar?",
    opciones: [
      "Una política de escalado escalonado (step scaling) con varios umbrales de CPU.",
      "Una política de escalado de seguimiento de objetivo (target tracking) sobre el uso promedio de CPU al 50%.",
      "Una política de escalado simple (simple scaling) que agregue una instancia por alarma.",
      "Escalado programado (scheduled scaling) en horarios fijos."
    ],
    correctas: [1],
    explicacion: "El target tracking scaling mantiene una métrica objetivo (por ejemplo 50% de CPU promedio) ajustando automáticamente la capacidad, con la configuración más sencilla. El step scaling y el simple scaling requieren definir umbrales/alarmas manualmente; el scheduled scaling responde a horarios, no a la demanda en tiempo real."
  },
  {
    id: "saa-176",
    dominio: 2,
    tema: "EBS snapshot cross-region",
    tipo: "single",
    enunciado: "Una empresa necesita poder recuperar sus volúmenes de Amazon EBS en otra región en caso de un desastre regional. Buscan una forma de respaldar y copiar los datos de EBS a esa segunda región de manera periódica y automatizada. ¿Qué enfoque cumple este requisito?",
    opciones: [
      "Habilitar la replicación Multi-AZ de los volúmenes EBS.",
      "Crear snapshots de EBS y copiarlos a otra región, automatizando el proceso con Amazon Data Lifecycle Manager.",
      "Adjuntar el mismo volumen EBS a instancias de ambas regiones.",
      "Convertir los volúmenes EBS a almacenamiento de instancia para mayor durabilidad."
    ],
    correctas: [1],
    explicacion: "Los snapshots de EBS se almacenan en S3 y pueden copiarse a otra región; Amazon Data Lifecycle Manager automatiza la creación de snapshots y su copia cross-region según políticas, dando capacidad de recuperación regional. EBS no es Multi-AZ por sí mismo ni se adjunta a varias regiones; el instance store es efímero y menos durable."
  },
  {
    id: "saa-177",
    dominio: 2,
    tema: "SNS fan-out",
    tipo: "single",
    enunciado: "Cuando se sube una imagen, una empresa necesita que el evento dispare en paralelo tres procesos independientes: generar miniaturas, indexar metadatos y notificar a un sistema externo. Quieren un diseño desacoplado y resiliente donde cada proceso consuma a su propio ritmo. ¿Qué arquitectura recomienda?",
    opciones: [
      "Un tema de Amazon SNS con varias colas de Amazon SQS suscritas (patrón fan-out), una por cada proceso.",
      "Una única cola de Amazon SQS leída secuencialmente por los tres procesos.",
      "Invocaciones síncronas encadenadas de AWS Lambda entre los tres procesos.",
      "Un Application Load Balancer distribuyendo el evento entre los tres servicios."
    ],
    correctas: [0],
    explicacion: "El patrón fan-out con un tema SNS y varias colas SQS suscritas entrega una copia del mensaje a cada cola, permitiendo que cada proceso consuma de forma independiente, desacoplada y resiliente con su propio buffer y reintentos. Una sola cola no entrega a múltiples consumidores independientes; las invocaciones encadenadas acoplan los procesos; un ALB no es para fan-out de eventos."
  },
  {
    id: "saa-178",
    dominio: 2,
    tema: "Multi-AZ ALB",
    tipo: "single",
    enunciado: "Una aplicación web debe seguir disponible aunque falle una Zona de Disponibilidad completa. Actualmente todas las instancias EC2 y el balanceador están configurados en una sola AZ. ¿Qué cambio mejora la alta disponibilidad?",
    opciones: [
      "Aumentar el tamaño de las instancias EC2 existentes en la misma AZ.",
      "Distribuir las instancias EC2 en al menos dos AZ dentro de un Auto Scaling group y habilitar el ALB en esas mismas AZ.",
      "Habilitar la protección contra terminación en las instancias actuales.",
      "Crear una segunda dirección IP elástica para la AZ existente."
    ],
    correctas: [1],
    explicacion: "Distribuir las instancias en al menos dos AZ con un Auto Scaling group y un Application Load Balancer habilitado en esas AZ garantiza que la aplicación siga disponible si una AZ falla. Escalar verticalmente, proteger contra terminación o agregar una IP elástica no aportan tolerancia a la pérdida de una AZ completa."
  },
  {
    id: "saa-179",
    dominio: 2,
    tema: "Pilot Light",
    tipo: "single",
    enunciado: "Una empresa quiere una estrategia de DR de bajo costo en otra región donde solo los datos centrales (la base de datos replicada) se mantengan activos, mientras que los servidores de aplicación están apagados o como plantillas y se encienden solo durante un desastre. ¿Qué estrategia de DR describe esto?",
    opciones: [
      "Backup & Restore.",
      "Pilot Light.",
      "Warm Standby.",
      "Multi-Site Active/Active."
    ],
    correctas: [1],
    explicacion: "Pilot Light mantiene encendidos solo los componentes núcleo, como la replicación de la base de datos, mientras la capa de aplicación permanece apagada o preconfigurada y se aprovisiona durante el desastre, ofreciendo bajo costo con RTO moderado. Backup & Restore no mantiene nada encendido; Warm Standby mantiene una versión reducida ejecutándose; Active/Active mantiene todo activo."
  },
  {
    id: "saa-180",
    dominio: 2,
    tema: "AWS Backup",
    tipo: "single",
    enunciado: "Una organización tiene recursos de Amazon EBS, Amazon RDS, Amazon DynamoDB y Amazon EFS y quiere centralizar y automatizar sus copias de seguridad con políticas de retención uniformes y reportes de cumplimiento desde un único lugar. ¿Qué servicio cumple mejor este objetivo?",
    opciones: [
      "Configurar snapshots manuales por separado para cada servicio.",
      "Usar AWS Backup con planes de respaldo y políticas de retención centralizadas.",
      "Escribir scripts con AWS Lambda programados para respaldar cada recurso.",
      "Habilitar el versionado en cada recurso individualmente."
    ],
    correctas: [1],
    explicacion: "AWS Backup centraliza y automatiza las copias de seguridad de múltiples servicios (EBS, RDS, DynamoDB, EFS y más) mediante planes con políticas de retención y reportes de cumplimiento desde una consola única. Los snapshots manuales, los scripts propios o el versionado individual no ofrecen gestión y reporte centralizados."
  },
  {
    id: "saa-181",
    dominio: 2,
    tema: "Route 53 multivalue",
    tipo: "single",
    enunciado: "Una empresa tiene varias instancias EC2 sanas que sirven la misma aplicación y quiere que Amazon Route 53 devuelva múltiples direcciones IP en las respuestas DNS, comprobando la salud de cada una para no devolver endpoints caídos, distribuyendo así las solicitudes. ¿Qué política de enrutamiento deben usar?",
    opciones: [
      "Enrutamiento simple con un solo registro.",
      "Enrutamiento multivalor (multivalue answer) con health checks asociados a cada registro.",
      "Enrutamiento por geolocalización.",
      "Enrutamiento de failover con primario y secundario."
    ],
    correctas: [1],
    explicacion: "El enrutamiento multivalor de Route 53 devuelve hasta ocho registros saludables en cada respuesta y comprueba la salud de cada uno, omitiendo los no saludables, lo que ayuda a distribuir solicitudes y mejorar la disponibilidad. El simple no hace health checks por valor; la geolocalización enruta por ubicación; el failover es solo primario/secundario."
  },
  {
    id: "saa-182",
    dominio: 2,
    tema: "Lifecycle hooks",
    tipo: "single",
    enunciado: "Antes de que el Auto Scaling group termine una instancia durante un scale-in, la empresa necesita ejecutar una tarea de drenaje que vuelque logs y cierre conexiones de forma ordenada. ¿Qué mecanismo permite pausar la terminación para completar esa tarea?",
    opciones: [
      "Configurar un lifecycle hook de terminación en el Auto Scaling group.",
      "Aumentar el periodo de gracia de health check del grupo.",
      "Habilitar la protección contra scale-in para todas las instancias.",
      "Configurar una política de cooldown más larga."
    ],
    correctas: [0],
    explicacion: "Un lifecycle hook de terminación pone la instancia en estado de espera (Terminating:Wait) y pausa el proceso, dando tiempo a ejecutar acciones como drenar conexiones y volcar logs antes de completar la terminación. La gracia de health check, la protección contra scale-in y el cooldown no proporcionan ese punto de pausa controlada."
  },
  {
    id: "saa-183",
    dominio: 2,
    tema: "Fault tolerance vs HA",
    tipo: "single",
    enunciado: "Un sistema de pagos no puede tolerar ninguna interrupción ante el fallo de un componente: debe seguir operando sin degradación, con capacidad redundante ya activa que asuma la carga al instante. ¿Qué concepto describe mejor este requisito?",
    opciones: [
      "Alta disponibilidad, que minimiza el tiempo de inactividad pero puede tener una breve interrupción durante el failover.",
      "Tolerancia a fallos (fault tolerance), donde el sistema sigue operando sin interrupción ante el fallo de un componente.",
      "Escalabilidad, que ajusta la capacidad según la demanda.",
      "Elasticidad, que agrega y quita recursos automáticamente."
    ],
    correctas: [1],
    explicacion: "La tolerancia a fallos implica que el sistema continúa operando sin interrupción ni degradación cuando falla un componente, gracias a redundancia ya activa. La alta disponibilidad minimiza el downtime pero puede haber una breve interrupción durante el failover; la escalabilidad y la elasticidad se refieren a ajustar capacidad, no a continuidad ante fallos."
  },
  {
    id: "saa-184",
    dominio: 2,
    tema: "SQS FIFO idempotencia",
    tipo: "single",
    enunciado: "Un sistema de procesamiento de transacciones requiere que los mensajes se procesen exactamente una vez y en el mismo orden en que se enviaron, evitando duplicados que generarían cobros repetidos. ¿Qué solución cumple este requisito?",
    opciones: [
      "Usar una cola estándar de Amazon SQS con visibilidad extendida.",
      "Usar una cola FIFO de Amazon SQS, que garantiza el orden y la deduplicación de mensajes.",
      "Usar Amazon SNS estándar con varias suscripciones.",
      "Usar Amazon Kinesis Data Firehose para entregar los mensajes."
    ],
    correctas: [1],
    explicacion: "Las colas FIFO de SQS garantizan el orden de los mensajes y la deduplicación dentro de la ventana de deduplicación, evitando procesamiento duplicado y manteniendo la secuencia, lo que se ajusta a transacciones financieras. Las colas estándar pueden entregar mensajes más de una vez y sin orden estricto; SNS estándar y Firehose no garantizan exactamente una vez y orden de la misma forma."
  },
  {
    id: "saa-185",
    dominio: 2,
    tema: "Aurora replicas failover",
    tipo: "single",
    enunciado: "Una empresa ejecuta un clúster de Amazon Aurora con una instancia de escritura y quiere mejorar la disponibilidad para que, ante el fallo del writer, otra instancia asuma el rol automáticamente con la menor interrupción posible. ¿Qué acción recomienda?",
    opciones: [
      "Agregar una o más réplicas de Aurora en otras AZ dentro del clúster para failover automático.",
      "Habilitar copias de snapshots automáticas cada cinco minutos.",
      "Aumentar la clase de instancia del writer para mayor capacidad.",
      "Configurar un Application Load Balancer delante del clúster de Aurora."
    ],
    correctas: [0],
    explicacion: "Agregar réplicas de Aurora en distintas AZ permite que Aurora promueva automáticamente una réplica a writer ante el fallo del primario, con failover típicamente en menos de un minuto usando el cluster endpoint. Los snapshots son para respaldo, no failover automático; escalar el writer no mejora la disponibilidad; un ALB no gestiona el failover de la base de datos."
  },
  {
    id: "saa-186",
    dominio: 2,
    tema: "Multi-Site Active/Active",
    tipo: "single",
    enunciado: "Una empresa de comercio electrónico no puede permitirse casi ningún downtime y desea que dos regiones de AWS atiendan tráfico de producción simultáneamente, repartiendo usuarios entre ambas y conmutando de forma transparente si una región falla. ¿Qué estrategia de DR es esta?",
    opciones: [
      "Backup & Restore.",
      "Pilot Light.",
      "Warm Standby.",
      "Multi-Site Active/Active."
    ],
    correctas: [3],
    explicacion: "Multi-Site Active/Active mantiene varias regiones sirviendo tráfico de producción al mismo tiempo, lo que ofrece el RTO y RPO más bajos y conmutación transparente ante el fallo de una región, a costa de mayor complejidad y costo. Las demás estrategias tienen al menos una región inactiva o reducida y mayor RTO."
  },
  {
    id: "saa-187",
    dominio: 2,
    tema: "S3 durabilidad y clases",
    tipo: "single",
    enunciado: "Una empresa almacena datos a los que rara vez accede, pero que deben recuperarse de inmediato cuando se necesiten, y requiere alta durabilidad sin la posibilidad de pérdida por fallo de una sola AZ. Busca minimizar el costo de almacenamiento manteniendo resiliencia. ¿Qué clase de almacenamiento de Amazon S3 recomienda?",
    opciones: [
      "S3 One Zone-Infrequent Access.",
      "S3 Standard-Infrequent Access (S3 Standard-IA).",
      "S3 Standard.",
      "S3 Glacier Deep Archive."
    ],
    correctas: [1],
    explicacion: "S3 Standard-IA almacena datos de acceso poco frecuente con recuperación inmediata, replicando entre varias AZ para alta durabilidad y resiliencia ante la pérdida de una AZ, a menor costo que S3 Standard. One Zone-IA usa una sola AZ y no resiste su pérdida; S3 Standard es más caro para datos de acceso poco frecuente; Glacier Deep Archive no da recuperación inmediata."
  },
  {
    id: "saa-188",
    dominio: 2,
    tema: "EventBridge desacoplamiento",
    tipo: "single",
    enunciado: "Una empresa quiere construir una arquitectura dirigida por eventos en la que distintos servicios de AWS y aplicaciones SaaS publiquen eventos y se enruten a múltiples destinos según reglas de filtrado, de forma desacoplada y resiliente. ¿Qué servicio es el más adecuado?",
    opciones: [
      "Amazon EventBridge con reglas que enrutan eventos a varios destinos.",
      "Amazon SQS con una sola cola para todos los eventos.",
      "AWS Step Functions para orquestar cada flujo.",
      "Amazon Kinesis Data Streams con un único consumidor."
    ],
    correctas: [0],
    explicacion: "Amazon EventBridge es un bus de eventos serverless que recibe eventos de servicios de AWS, aplicaciones propias y SaaS, y los enruta a múltiples destinos según reglas de filtrado basado en contenido, permitiendo arquitecturas dirigidas por eventos desacopladas. SQS es una cola punto a punto; Step Functions orquesta flujos; Kinesis es para streaming de datos, no enrutamiento por reglas."
  },
  {
    id: "saa-189",
    dominio: 2,
    tema: "Scheduled scaling",
    tipo: "single",
    enunciado: "Una aplicación tiene picos de carga totalmente predecibles cada día laboral entre las 9 y las 18 horas, y carga muy baja el resto del tiempo. La empresa quiere asegurar capacidad suficiente antes de los picos conocidos para evitar latencia inicial. ¿Qué enfoque de Auto Scaling es el más adecuado?",
    opciones: [
      "Escalado de seguimiento de objetivo (target tracking) sobre la latencia.",
      "Escalado programado (scheduled scaling) que aumente la capacidad antes de las 9 y la reduzca después de las 18.",
      "Escalado simple basado en una alarma de CPU.",
      "Mantener fija la capacidad máxima las 24 horas."
    ],
    correctas: [1],
    explicacion: "El scheduled scaling ajusta la capacidad deseada en horarios planificados, ideal para patrones de carga predecibles: provisiona capacidad antes del pico conocido y la reduce después, evitando latencia inicial. El target tracking y el simple reaccionan después de que sube la carga; mantener el máximo 24 horas desperdicia costo."
  },
  {
    id: "saa-190",
    dominio: 2,
    tema: "RDS Multi-AZ read scaling",
    tipo: "single",
    enunciado: "Una aplicación con RDS Multi-AZ presenta alta carga de lecturas de reportes que afecta el rendimiento de las escrituras transaccionales. La empresa quiere descargar las consultas de solo lectura sin afectar la disponibilidad ni el failover existente. ¿Qué solución recomienda?",
    opciones: [
      "Promover la instancia en espera (standby) de Multi-AZ para atender lecturas.",
      "Agregar una o varias réplicas de lectura de Amazon RDS y dirigir las consultas de reportes a ellas.",
      "Aumentar el almacenamiento provisionado de la instancia primaria.",
      "Convertir la base de datos a Single-AZ para liberar recursos."
    ],
    correctas: [1],
    explicacion: "Las réplicas de lectura de RDS descargan las consultas de solo lectura del primario, mejorando el rendimiento de escritura sin afectar el failover Multi-AZ, que es independiente. La instancia standby de Multi-AZ no sirve lecturas; aumentar almacenamiento no descarga lecturas; pasar a Single-AZ reduce la disponibilidad."
  },
  {
    id: "saa-191",
    dominio: 2,
    tema: "Backup & Restore",
    tipo: "single",
    enunciado: "Una empresa con cargas no críticas quiere la estrategia de DR de menor costo posible, aceptando un RTO de varias horas. Planean respaldar los datos a otra región y, ante un desastre, aprovisionar toda la infraestructura desde cero a partir de los backups. ¿Qué estrategia de DR es esta?",
    opciones: [
      "Backup & Restore.",
      "Pilot Light.",
      "Warm Standby.",
      "Multi-Site Active/Active."
    ],
    correctas: [0],
    explicacion: "Backup & Restore es la estrategia de DR más económica: se respaldan datos a otra región y, ante un desastre, se aprovisiona toda la infraestructura desde los backups, lo que implica el RTO más alto (horas). Pilot Light, Warm Standby y Active/Active mantienen recursos preaprovisionados o activos y logran RTO menores a mayor costo."
  },
  {
    id: "saa-192",
    dominio: 2,
    tema: "ALB cross-zone",
    tipo: "single",
    enunciado: "Una empresa observa que algunas Zonas de Disponibilidad reciben más tráfico que otras y que cuando una AZ tiene menos instancias sanas, el tráfico no se distribuye de manera uniforme entre todas las instancias del balanceador. ¿Qué característica del balanceador ayuda a repartir el tráfico de forma uniforme entre todas las instancias de todas las AZ?",
    opciones: [
      "Habilitar las sticky sessions en el balanceador.",
      "Habilitar el balanceo de carga entre zonas (cross-zone load balancing).",
      "Aumentar el intervalo de health check.",
      "Configurar el desregistro retardado (deregistration delay)."
    ],
    correctas: [1],
    explicacion: "El cross-zone load balancing distribuye las solicitudes de manera uniforme entre todos los targets registrados en todas las AZ, independientemente de cuántas instancias haya por zona, evitando el desbalanceo. Las sticky sessions fijan usuarios a instancias; el intervalo de health check y el deregistration delay no influyen en la distribución entre zonas."
  },
  {
    id: "saa-193",
    dominio: 2,
    tema: "Route 53 alias health",
    tipo: "single",
    enunciado: "Una empresa quiere apuntar el dominio raíz (apex) example.com a un Application Load Balancer y que Route 53 deje de devolver ese registro automáticamente si el balanceador no está saludable, sin pagar por las consultas a ese registro. ¿Qué configuración cumple estos requisitos?",
    opciones: [
      "Un registro CNAME en el apex apuntando al nombre DNS del ALB.",
      "Un registro Alias de Route 53 hacia el ALB con 'Evaluate Target Health' habilitado.",
      "Un registro A con la IP fija del balanceador.",
      "Un registro TXT con el nombre del balanceador."
    ],
    correctas: [1],
    explicacion: "Un registro Alias de Route 53 permite apuntar el apex del dominio a un ALB (algo que un CNAME no puede hacer en el apex), no cobra por sus consultas y, con 'Evaluate Target Health' habilitado, deja de devolver el registro si el target no está saludable. Un CNAME en apex no es válido; un registro A con IP fija no es adecuado porque la IP del ALB cambia; un TXT no resuelve direcciones."
  },
  {
    id: "saa-194",
    dominio: 2,
    tema: "Multi-region resiliencia",
    tipo: "multiple",
    enunciado: "Una aplicación serverless usa Amazon API Gateway, AWS Lambda y Amazon DynamoDB en una sola región. La empresa quiere que siga operativa incluso si toda la región sufre una interrupción. ¿Cuáles DOS medidas mejoran la resiliencia regional? (Elija DOS).",
    opciones: [
      "Replicar los datos con DynamoDB Global Tables hacia una segunda región.",
      "Desplegar la pila de API Gateway y Lambda en una segunda región y usar Amazon Route 53 para conmutar el tráfico entre regiones.",
      "Aumentar la memoria de las funciones Lambda y la capacidad de DynamoDB en la región actual.",
      "Habilitar el versionado de Lambda y los snapshots de DynamoDB en la misma región.",
      "Configurar varias AZ para API Gateway dentro de la misma región."
    ],
    correctas: [0, 1],
    explicacion: "Para resiliencia ante una interrupción regional se replican los datos con DynamoDB Global Tables a otra región y se despliega la pila de API Gateway y Lambda en esa segunda región, usando Route 53 para conmutar el tráfico entre regiones. Aumentar memoria/capacidad, versionar Lambda o usar varias AZ operan dentro de una sola región y no protegen ante la caída de la región completa."
  },
  {
    id: "saa-195",
    dominio: 2,
    tema: "EFS One Zone resiliencia",
    tipo: "single",
    enunciado: "Una empresa necesita un sistema de archivos compartido para una carga de trabajo importante que debe permanecer disponible aun si falla una Zona de Disponibilidad. Buscan el almacenamiento de archivos con mayor resiliencia ante la pérdida de una AZ. ¿Qué opción recomienda?",
    opciones: [
      "Amazon EFS con clases de almacenamiento Standard (regional, multi-AZ).",
      "Amazon EFS con clases de almacenamiento One Zone.",
      "Un volumen de Amazon EBS io2 conectado a una instancia.",
      "Almacenamiento de instancia (instance store) replicado por la aplicación."
    ],
    correctas: [0],
    explicacion: "Las clases de almacenamiento regional (Standard) de Amazon EFS almacenan los datos de forma redundante en múltiples AZ, por lo que el sistema de archivos sigue disponible si una AZ falla. EFS One Zone reside en una sola AZ y no resiste su pérdida; EBS se asocia a una AZ; el instance store es efímero."
  },
  {
    id: "saa-196",
    dominio: 2,
    tema: "Auto Scaling capacidad",
    tipo: "single",
    enunciado: "Un Auto Scaling group está configurado con capacidad mínima de 2, deseada de 2 y máxima de 6, distribuido en tres AZ. Si una instancia falla su health check y se termina, ¿qué hará el Auto Scaling group para mantener la disponibilidad?",
    opciones: [
      "Esperará a la siguiente acción de escalado programada para reemplazar la instancia.",
      "Lanzará una instancia de reemplazo para volver a la capacidad deseada de 2.",
      "Reducirá la capacidad deseada a 1 para ahorrar costos.",
      "Escalará automáticamente hasta la capacidad máxima de 6."
    ],
    correctas: [1],
    explicacion: "El Auto Scaling group mantiene siempre la capacidad deseada: si una instancia no saludable se termina, lanza automáticamente una de reemplazo para volver a 2 instancias, preservando la disponibilidad. No espera a escalados programados, no reduce la deseada por su cuenta ni salta al máximo sin una política de escalado que lo justifique."
  },
  {
    id: "saa-197",
    dominio: 2,
    tema: "DR multi-AZ vs multi-region",
    tipo: "multiple",
    enunciado: "Una empresa quiere mejorar la resiliencia de su aplicación de tres capas en EC2 frente a fallos de infraestructura. ¿Cuáles DOS medidas mejoran la alta disponibilidad ante el fallo de una sola Zona de Disponibilidad? (Elija DOS).",
    opciones: [
      "Desplegar las instancias EC2 de la capa web en un Auto Scaling group distribuido en varias AZ detrás de un Application Load Balancer.",
      "Habilitar el despliegue Multi-AZ en la base de datos Amazon RDS.",
      "Aumentar el tamaño de las instancias EC2 en la única AZ utilizada.",
      "Almacenar el código fuente en un repositorio de control de versiones.",
      "Configurar copias de snapshots de EBS solo dentro de la misma AZ."
    ],
    correctas: [0, 1],
    explicacion: "Distribuir las instancias web en varias AZ con un ASG detrás de un ALB y habilitar Multi-AZ en RDS protegen ante el fallo de una sola AZ con redundancia y failover automático. Escalar verticalmente en una sola AZ no aporta tolerancia a la pérdida de esa AZ; el control de versiones no afecta la disponibilidad en runtime; los snapshots dentro de la misma AZ no resisten su pérdida."
  },
  {
    id: "saa-198",
    dominio: 2,
    tema: "Desacoplamiento resiliente",
    tipo: "multiple",
    enunciado: "Una empresa quiere hacer su procesamiento de pedidos más resiliente y tolerante a picos. ¿Cuáles DOS prácticas ayudan a desacoplar los componentes y aumentar la resiliencia? (Elija DOS).",
    opciones: [
      "Introducir una cola de Amazon SQS entre el productor y los consumidores para absorber picos.",
      "Configurar una dead-letter queue para aislar los mensajes que fallan de forma repetida.",
      "Conectar el frontend directamente a la base de datos con conexiones síncronas de larga duración.",
      "Guardar el estado de sesión en la memoria local de cada servidor.",
      "Aumentar la dependencia entre microservicios mediante llamadas síncronas encadenadas."
    ],
    correctas: [0, 1],
    explicacion: "Una cola SQS desacopla productor y consumidores y absorbe picos, mientras que una dead-letter queue aísla los mensajes que fallan repetidamente, evitando que bloqueen el flujo. Conectar el frontend directo a la base de datos, guardar sesiones en memoria local y encadenar llamadas síncronas aumentan el acoplamiento y reducen la resiliencia."
  },
  {
    id: "saa-199",
    dominio: 2,
    tema: "Route 53 health checks",
    tipo: "multiple",
    enunciado: "Una empresa implementa enrutamiento de failover en Amazon Route 53 entre dos regiones. ¿Cuáles DOS afirmaciones sobre los health checks de Route 53 son correctas? (Elija DOS).",
    opciones: [
      "Los health checks de Route 53 pueden monitorear un endpoint (IP o dominio) y marcar el registro asociado como no saludable si fallan.",
      "Un health check puede monitorear el estado de otros health checks mediante un health check calculado (calculated health check).",
      "Los health checks de Route 53 solo funcionan con recursos dentro de una misma AZ.",
      "Route 53 requiere desplegar un agente en cada instancia EC2 para realizar los health checks.",
      "Los health checks de Route 53 solo admiten el protocolo ICMP (ping)."
    ],
    correctas: [0, 1],
    explicacion: "Los health checks de Route 53 monitorean endpoints por HTTP, HTTPS o TCP y marcan el registro como no saludable cuando fallan, y los calculated health checks pueden combinar el estado de varios health checks. No están limitados a una AZ, no requieren agentes en las instancias y no se limitan a ICMP."
  },
  {
    id: "saa-200",
    dominio: 2,
    tema: "S3 versioning y replicación",
    tipo: "multiple",
    enunciado: "Una empresa quiere proteger los objetos almacenados en Amazon S3 contra eliminaciones accidentales y contra la pérdida de una región completa. ¿Cuáles DOS configuraciones cumplen estos objetivos? (Elija DOS).",
    opciones: [
      "Habilitar S3 Versioning para conservar versiones anteriores ante sobrescrituras o eliminaciones.",
      "Configurar Cross-Region Replication (CRR) hacia un bucket en otra región.",
      "Habilitar S3 Transfer Acceleration en el bucket de origen.",
      "Aplicar una regla de ciclo de vida que elimine permanentemente las versiones anteriores tras un día.",
      "Cambiar la clase de almacenamiento del bucket a S3 One Zone-IA."
    ],
    correctas: [0, 1],
    explicacion: "S3 Versioning conserva versiones previas y protege contra eliminaciones o sobrescrituras accidentales, y la replicación entre regiones (CRR) copia los objetos a otra región, protegiendo ante la pérdida regional. Transfer Acceleration solo acelera transferencias; eliminar versiones rápido reduce la protección; One Zone-IA reside en una sola AZ y disminuye la resiliencia."
  }
]);
