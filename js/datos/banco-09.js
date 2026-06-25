window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-321",
    dominio: 2,
    tema: "Estrategias DR",
    tipo: "single",
    enunciado: "Una empresa financiera debe diseñar un plan de recuperación ante desastres para una aplicación crítica. El negocio exige un RTO de unos pocos minutos y un RPO de segundos, pero quiere evitar el costo de ejecutar una réplica completa a escala de producción en la región secundaria de forma permanente. ¿Qué estrategia de DR equilibra mejor estos requisitos?",
    opciones: [
      "Backup and Restore: tomar copias periódicas y restaurarlas en la región secundaria solo cuando ocurra el desastre",
      "Pilot Light: mantener una copia mínima de los datos replicada y los servidores apagados o reducidos, escalando al activarse el desastre",
      "Warm Standby: mantener una versión funcional y reducida de toda la pila siempre encendida, escalándola al tamaño de producción durante el failover",
      "Active/Active multi-Region con tráfico repartido por igual entre ambas regiones de forma permanente"
    ],
    correctas: [2],
    explicacion: "Warm Standby mantiene la pila completa funcionando a escala reducida, lo que permite un RTO de minutos y RPO de segundos sin el costo de Active/Active. Backup and Restore y Pilot Light tienen RTO mayores porque deben aprovisionar o escalar recursos; Active/Active cumple pero es el más caro y no se pide aquí."
  },
  {
    id: "saa-322",
    dominio: 2,
    tema: "Estrategias DR",
    tipo: "single",
    enunciado: "Una organización ejecuta una aplicación interna de bajo perfil cuyo negocio acepta un RTO de varias horas y un RPO de 24 horas. Buscan la opción de DR de menor costo posible en otra región. ¿Cuál recomienda el arquitecto?",
    opciones: [
      "Active/Active multi-Region con Route 53 latency-based routing",
      "Warm Standby con instancias reducidas siempre encendidas",
      "Backup and Restore usando AWS Backup con copia cross-region de los snapshots",
      "Pilot Light con una base de datos replicada de forma continua"
    ],
    correctas: [2],
    explicacion: "Con RTO de horas y RPO de 24 horas, Backup and Restore es la estrategia más económica porque no mantiene infraestructura encendida en la región secundaria; solo guarda copias que se restauran ante el desastre. Las demás opciones implican recursos siempre activos o replicación continua que encarecen sin aportar valor a estos objetivos laxos."
  },
  {
    id: "saa-323",
    dominio: 2,
    tema: "Aurora Global Database",
    tipo: "single",
    enunciado: "Una aplicación global usa Amazon Aurora MySQL. El equipo necesita que, ante la caída total de la región primaria, una región secundaria pueda promoverse como primaria con un RPO típico inferior a un segundo y un RTO de aproximadamente un minuto. ¿Qué solución cumple el requisito?",
    opciones: [
      "Crear réplicas de lectura de Aurora en la misma región y usar failover de Multi-AZ",
      "Configurar Aurora Global Database con una región secundaria y usar la promoción manual o gestionada ante desastre",
      "Habilitar copias de snapshots automáticas cross-region cada hora",
      "Usar RDS Multi-AZ con una instancia en espera en otra zona de disponibilidad"
    ],
    correctas: [1],
    explicacion: "Aurora Global Database replica con baja latencia entre regiones usando la capa de almacenamiento, logrando RPO menor a un segundo y permitiendo promover una región secundaria con RTO cercano a un minuto. Las réplicas en la misma región y Multi-AZ no protegen contra fallo regional, y los snapshots cada hora dan un RPO mucho peor."
  },
  {
    id: "saa-324",
    dominio: 2,
    tema: "Aurora Backtrack",
    tipo: "single",
    enunciado: "Un desarrollador ejecutó por error una sentencia que corrompió datos en un clúster Aurora MySQL. El equipo necesita revertir la base de datos a un punto pocos minutos antes del error sin restaurar un snapshot completo a un clúster nuevo. ¿Qué funcionalidad de Aurora deberían usar?",
    opciones: [
      "Aurora Backtrack para rebobinar el clúster a un instante anterior sin crear una instancia nueva",
      "Point-in-time recovery restaurando a un nuevo clúster a partir de los logs",
      "Crear un clon rápido de Aurora y descartar el clúster original",
      "Promover una réplica de lectura para reemplazar al writer dañado"
    ],
    correctas: [0],
    explicacion: "Aurora Backtrack (disponible en Aurora MySQL) permite rebobinar el clúster existente a un momento anterior en segundos, sin restaurar a un clúster nuevo, ideal para deshacer errores recientes. PITR sí funciona pero crea un clúster nuevo y es más lento; los clones y la promoción de réplicas no revierten el cambio dañino."
  },
  {
    id: "saa-325",
    dominio: 2,
    tema: "RDS Multi-AZ",
    tipo: "single",
    enunciado: "Una aplicación usa Amazon RDS for PostgreSQL con Multi-AZ (instancia en espera). El equipo nota que durante el mantenimiento y el failover las lecturas no se distribuyen y la espera no aporta capacidad de lectura. Quieren reducir el tiempo de failover a menos de 35 segundos y además poder leer de las instancias en espera. ¿Qué opción cumple mejor?",
    opciones: [
      "Agregar réplicas de lectura cross-region al despliegue Multi-AZ actual",
      "Migrar a un despliegue Multi-AZ DB cluster con dos instancias en espera legibles",
      "Aumentar el tamaño de la instancia primaria para acelerar el failover",
      "Habilitar Storage Auto Scaling en la instancia primaria"
    ],
    correctas: [1],
    explicacion: "El despliegue Multi-AZ DB cluster usa dos instancias en espera que son legibles y ofrece failover típicamente menor a 35 segundos, a diferencia del Multi-AZ con instancia en espera que no sirve lecturas. Las réplicas de lectura no aceleran el failover de la primaria, y cambiar tamaño o storage scaling no resuelve el requisito."
  },
  {
    id: "saa-326",
    dominio: 2,
    tema: "Route 53 Failover",
    tipo: "single",
    enunciado: "Una empresa aloja su sitio web principal en una región y un sitio estático de respaldo en S3 en otra región. Quieren que, si el endpoint principal falla, los usuarios sean redirigidos automáticamente al respaldo. ¿Cómo se configura en Amazon Route 53?",
    opciones: [
      "Registros weighted routing con 50/50 entre ambos endpoints",
      "Registros de failover (primary/secondary) asociados a un health check sobre el endpoint principal",
      "Registros multivalue answer con health checks en todos los endpoints",
      "Registros geolocation routing por continente"
    ],
    correctas: [1],
    explicacion: "El failover routing de Route 53 usa un registro primario con health check y un registro secundario; si el health check falla, el tráfico se enruta al secundario automáticamente. Weighted reparte sin priorizar, multivalue no garantiza preferencia primario/secundario, y geolocation enruta por ubicación, no por salud."
  },
  {
    id: "saa-327",
    dominio: 2,
    tema: "AWS Backup Vault Lock",
    tipo: "single",
    enunciado: "Una empresa regulada necesita garantizar que sus backups no puedan ser eliminados ni alterados, ni siquiera por un administrador con permisos completos, durante un período de retención obligatorio. ¿Qué característica de AWS Backup cumple este requisito de inmutabilidad WORM?",
    opciones: [
      "Aplicar una política IAM que deniegue la acción de borrado a todos los usuarios",
      "Activar AWS Backup Vault Lock en modo compliance sobre el vault",
      "Habilitar versioning en el vault de backups",
      "Configurar replicación cross-account del plan de backup"
    ],
    correctas: [1],
    explicacion: "Vault Lock en modo compliance hace que los backups sean inmutables (WORM) y no puedan eliminarse hasta cumplir la retención, ni siquiera por la cuenta raíz, satisfaciendo requisitos regulatorios. Las políticas IAM pueden modificarse, el versioning no aplica a vaults de backup y la replicación cross-account no impide el borrado."
  },
  {
    id: "saa-328",
    dominio: 2,
    tema: "S3 CRR con RTC",
    tipo: "single",
    enunciado: "Una aplicación crítica necesita que los objetos cargados en un bucket de S3 se repliquen a otra región dentro de un tiempo predecible y con un acuerdo de nivel de servicio que cubra el 99,99% de los objetos en 15 minutos. ¿Qué debe habilitar el arquitecto?",
    opciones: [
      "Cross-Region Replication estándar sin opciones adicionales",
      "Cross-Region Replication con S3 Replication Time Control (RTC)",
      "S3 Transfer Acceleration en el bucket de origen",
      "Same-Region Replication con métricas de CloudWatch"
    ],
    correctas: [1],
    explicacion: "S3 Replication Time Control (RTC) replica la mayoría de los objetos en segundos y ofrece un SLA de replicación del 99,99% de los objetos dentro de 15 minutos, con métricas de monitoreo. La CRR estándar no tiene SLA de tiempo, Transfer Acceleration acelera cargas pero no replica, y SRR replica en la misma región, no entre regiones."
  },
  {
    id: "saa-329",
    dominio: 2,
    tema: "SQS DLQ",
    tipo: "single",
    enunciado: "Un sistema procesa mensajes desde una cola SQS estándar mediante una flota de workers. Algunos mensajes contienen datos mal formados que hacen fallar al consumidor una y otra vez, generando reintentos infinitos que saturan la flota. ¿Cuál es la forma más resiliente de manejar estos mensajes problemáticos?",
    opciones: [
      "Aumentar el visibility timeout de la cola para reducir reintentos",
      "Configurar una redrive policy con una dead-letter queue y un maxReceiveCount",
      "Cambiar la cola a tipo FIFO para garantizar orden",
      "Reducir el número de workers para disminuir la carga"
    ],
    correctas: [1],
    explicacion: "Una dead-letter queue con redrive policy y maxReceiveCount mueve automáticamente los mensajes que fallan repetidamente fuera de la cola principal, evitando reintentos infinitos y permitiendo analizarlos aparte. Aumentar el visibility timeout o reducir workers no detiene los reintentos, y FIFO no resuelve el problema del mensaje venenoso."
  },
  {
    id: "saa-330",
    dominio: 2,
    tema: "DynamoDB Global Tables",
    tipo: "single",
    enunciado: "Una aplicación móvil con usuarios en varios continentes usa DynamoDB y necesita lecturas y escrituras de baja latencia local en cada región, además de tolerancia a fallos regionales. ¿Qué configuración cumple el requisito?",
    opciones: [
      "DynamoDB Accelerator (DAX) en la región primaria",
      "DynamoDB Global Tables con réplicas multi-Region active/active",
      "Réplicas de lectura de DynamoDB en cada región",
      "Point-in-time recovery habilitado en la tabla primaria"
    ],
    correctas: [1],
    explicacion: "DynamoDB Global Tables ofrece replicación multi-región activa/activa, permitiendo lecturas y escrituras locales de baja latencia en cada región y resiliencia ante fallo regional. DAX solo cachea lecturas en una región, DynamoDB no tiene réplicas de lectura cross-region tradicionales, y PITR es para recuperación temporal, no para distribución global."
  },
  {
    id: "saa-331",
    dominio: 2,
    tema: "Auto Scaling Warm Pools",
    tipo: "single",
    enunciado: "Una aplicación tiene instancias que tardan varios minutos en arrancar por una larga inicialización de aplicación. Durante picos repentinos de tráfico, el escalado tradicional no agrega capacidad lo bastante rápido. ¿Qué característica de Auto Scaling reduce el tiempo para poner instancias en servicio?",
    opciones: [
      "Configurar warm pools con instancias preinicializadas en estado detenido o en espera",
      "Aumentar el cooldown del grupo de Auto Scaling",
      "Usar solo instancias Spot para escalar más rápido",
      "Habilitar instance refresh durante el pico de tráfico"
    ],
    correctas: [0],
    explicacion: "Los warm pools mantienen instancias preinicializadas (detenidas, en hibernación o en ejecución) listas para entrar en servicio rápidamente, eliminando el tiempo de arranque ante picos. Aumentar el cooldown ralentiza el escalado, Spot no acelera la inicialización, e instance refresh sirve para reemplazar instancias, no para acelerar el escalado."
  },
  {
    id: "saa-332",
    dominio: 2,
    tema: "Sesiones externas",
    tipo: "single",
    enunciado: "Una aplicación web detrás de un Application Load Balancer guarda el estado de sesión del usuario en memoria local de cada instancia EC2. Cuando Auto Scaling termina una instancia o el ALB envía al usuario a otra instancia, la sesión se pierde. ¿Cuál es la solución más resiliente?",
    opciones: [
      "Habilitar sticky sessions en el ALB para fijar el usuario a una instancia",
      "Almacenar el estado de sesión en un almacén externo como Amazon ElastiCache for Redis o DynamoDB",
      "Aumentar el deregistration delay del target group",
      "Configurar el ALB para no terminar conexiones durante el escalado"
    ],
    correctas: [1],
    explicacion: "Externalizar la sesión a un almacén compartido como ElastiCache for Redis o DynamoDB hace que la aplicación sea stateless a nivel de instancia, por lo que terminar o cambiar de instancia no pierde la sesión. Las sticky sessions aún pierden la sesión si la instancia desaparece, y los delays solo posponen el problema sin resolverlo."
  },
  {
    id: "saa-333",
    dominio: 2,
    tema: "EC2 Auto Recovery",
    tipo: "single",
    enunciado: "Una instancia EC2 ejecuta una aplicación legada de un solo nodo que no puede distribuirse. El equipo quiere que, si la instancia falla por un problema de hardware subyacente, se recupere automáticamente en hardware sano conservando su ID, IP privada y volúmenes EBS. ¿Qué deben configurar?",
    opciones: [
      "Una alarma de CloudWatch con acción de recuperación de EC2 (auto recovery)",
      "Un grupo de Auto Scaling con mínimo y máximo de una instancia",
      "Un Elastic IP asociado para reconectar tras el reinicio",
      "Una réplica de la instancia en otra zona de disponibilidad"
    ],
    correctas: [0],
    explicacion: "EC2 Auto Recovery, mediante una alarma de CloudWatch con la acción de recuperación, migra la instancia a hardware sano conservando su ID de instancia, IP privada, IP elástica y volúmenes EBS ante fallos de hardware del host. Un Auto Scaling group lanzaría una instancia nueva con distinto ID y sin los datos, y un Elastic IP solo cubre la IP pública."
  },
  {
    id: "saa-334",
    dominio: 2,
    tema: "Elastic Disaster Recovery",
    tipo: "single",
    enunciado: "Una empresa con servidores físicos y máquinas virtuales on-premises quiere una solución de DR hacia AWS que replique los servidores de forma continua a bajo costo y permita lanzarlos en AWS en minutos ante un desastre, con pruebas no disruptivas. ¿Qué servicio recomienda?",
    opciones: [
      "AWS Backup con copias programadas hacia un vault en AWS",
      "AWS Elastic Disaster Recovery (DRS) replicando los servidores a un área de staging de bajo costo",
      "AWS DataSync para mover los datos a S3 periódicamente",
      "AWS Database Migration Service (DMS) para replicar las bases de datos"
    ],
    correctas: [1],
    explicacion: "AWS Elastic Disaster Recovery (DRS) replica de forma continua servidores físicos, virtuales y en la nube a un área de staging económica en AWS, permite lanzar instancias de recuperación en minutos y realizar drills sin interrumpir producción. AWS Backup no replica servidores completos en tiempo real, y DataSync o DMS cubren solo datos o bases de datos."
  },
  {
    id: "saa-335",
    dominio: 2,
    tema: "Direct Connect redundante",
    tipo: "single",
    enunciado: "Una empresa conecta su data center a AWS mediante una única conexión AWS Direct Connect. El negocio requiere conectividad híbrida resiliente, pero quiere evitar el costo de una segunda conexión Direct Connect que rara vez se usaría. ¿Cuál es la opción más rentable que aún provee respaldo?",
    opciones: [
      "Agregar una segunda conexión Direct Connect en otra ubicación",
      "Configurar una VPN Site-to-Site sobre Internet como respaldo de la conexión Direct Connect",
      "Migrar todo el tráfico a una VPN Site-to-Site y eliminar Direct Connect",
      "Usar Transit Gateway sin conexión de respaldo"
    ],
    correctas: [1],
    explicacion: "Una VPN Site-to-Site como respaldo de Direct Connect ofrece failover de conectividad híbrida a un costo mucho menor que una segunda conexión Direct Connect, aunque con menor ancho de banda en caso de uso del respaldo. Una segunda Direct Connect es más resiliente pero más cara, y depender solo de VPN reduce el rendimiento del camino principal."
  },
  {
    id: "saa-336",
    dominio: 2,
    tema: "Route 53 ARC",
    tipo: "single",
    enunciado: "Una aplicación multi-Region necesita un mecanismo de recuperación que no dependa del data plane de Route 53 health checks y que permita a los operadores forzar manualmente el failover de tráfico entre regiones con alta confianza, incluso durante eventos a gran escala. ¿Qué servicio provee routing controls y readiness checks para esto?",
    opciones: [
      "Amazon Route 53 Application Recovery Controller (ARC)",
      "AWS Global Accelerator con endpoints ponderados",
      "Amazon CloudWatch Synthetics canaries",
      "AWS Health Dashboard con notificaciones"
    ],
    correctas: [0],
    explicacion: "Route 53 Application Recovery Controller (ARC) ofrece routing controls (interruptores manuales de tráfico) y readiness checks para verificar y forzar el failover entre celdas o regiones de forma altamente disponible, independiente del comportamiento automático de health checks. Global Accelerator, Synthetics y Health Dashboard no proveen estos controles de recuperación gestionados."
  },
  {
    id: "saa-337",
    dominio: 2,
    tema: "EFS Replication",
    tipo: "single",
    enunciado: "Una aplicación usa Amazon EFS para almacenar archivos compartidos y necesita protección ante un fallo regional, manteniendo una copia de solo lectura del sistema de archivos en otra región actualizada de forma automática y continua. ¿Qué deben implementar?",
    opciones: [
      "Montar el mismo EFS desde instancias en ambas regiones simultáneamente",
      "Habilitar EFS Replication hacia un sistema de archivos de destino en otra región",
      "Programar una tarea de DataSync cada hora para copiar archivos",
      "Tomar snapshots de EFS y copiarlos cross-region manualmente"
    ],
    correctas: [1],
    explicacion: "EFS Replication crea y mantiene de forma automática y continua una réplica de solo lectura del sistema de archivos en otra región, ideal para DR con bajo RPO. EFS no se puede montar entre regiones, DataSync cada hora da un RPO peor, y EFS no usa snapshots manuales como mecanismo nativo de replicación continua."
  },
  {
    id: "saa-338",
    dominio: 2,
    tema: "Multi-AZ ALB",
    tipo: "single",
    enunciado: "Un arquitecto despliega una flota web detrás de un Application Load Balancer. Para máxima resiliencia, el ALB debe seguir sirviendo tráfico aunque una zona de disponibilidad completa quede fuera de servicio. ¿Cuál es el requisito mínimo de configuración?",
    opciones: [
      "Registrar todos los targets en una sola zona de disponibilidad de alta capacidad",
      "Habilitar el ALB en al menos dos zonas de disponibilidad con targets sanos en cada una",
      "Configurar cross-zone load balancing y dejar targets en una sola AZ",
      "Usar un Network Load Balancer en lugar de un ALB"
    ],
    correctas: [1],
    explicacion: "Para tolerar la pérdida de una AZ completa, el ALB debe abarcar al menos dos zonas de disponibilidad y tener targets sanos registrados en cada una, de modo que si una AZ cae, la otra siga atendiendo. Concentrar targets en una sola AZ deja la aplicación sin capacidad si esa AZ falla, sin importar el tipo de balanceador."
  },
  {
    id: "saa-339",
    dominio: 2,
    tema: "Auto Scaling Instance Refresh",
    tipo: "single",
    enunciado: "Un equipo publicó una nueva AMI con parches de seguridad y quiere reemplazar gradualmente todas las instancias del grupo de Auto Scaling sin tiempo de inactividad, controlando el porcentaje mínimo de instancias sanas durante el proceso. ¿Qué mecanismo deben usar?",
    opciones: [
      "Terminar manualmente las instancias una por una y dejar que Auto Scaling las reemplace",
      "Usar instance refresh del grupo de Auto Scaling con una política de healthy percentage",
      "Crear un nuevo grupo de Auto Scaling y eliminar el anterior de inmediato",
      "Aumentar la capacidad deseada al doble y luego reducirla"
    ],
    correctas: [1],
    explicacion: "Instance refresh reemplaza progresivamente las instancias del grupo usando la nueva launch template o AMI, respetando el porcentaje mínimo de instancias sanas (minimum healthy percentage) para evitar downtime. La terminación manual es propensa a errores y los otros enfoques pueden provocar interrupciones o falta de control del rollout."
  },
  {
    id: "saa-340",
    dominio: 2,
    tema: "S3 Versioning y MFA Delete",
    tipo: "single",
    enunciado: "Una empresa almacena datos críticos en S3 y quiere protegerse contra borrados accidentales y maliciosos, asegurando que ninguna versión de objeto pueda eliminarse permanentemente sin una autenticación adicional fuerte. ¿Qué combinación de características de S3 cumple esto?",
    opciones: [
      "Habilitar S3 Object Lock en modo governance únicamente",
      "Habilitar versioning junto con MFA Delete en el bucket",
      "Habilitar solo cifrado SSE-KMS en el bucket",
      "Configurar una política de ciclo de vida que expire versiones antiguas"
    ],
    correctas: [1],
    explicacion: "Versioning conserva todas las versiones de los objetos y MFA Delete exige autenticación multifactor para eliminar permanentemente versiones o cambiar el estado de versioning, protegiendo contra borrados accidentales y maliciosos. El cifrado no impide borrados, las políticas de ciclo de vida incluso pueden eliminar versiones, y Object Lock governance puede ser anulado por usuarios con permisos."
  },
  {
    id: "saa-341",
    dominio: 2,
    tema: "Aurora Réplicas",
    tipo: "single",
    enunciado: "Una aplicación de lectura intensiva usa Aurora PostgreSQL con un único writer. Durante un fallo de la instancia writer, el equipo quiere que la promoción a un nuevo writer sea lo más rápida y predecible posible, controlando qué réplica se promueve primero. ¿Qué configuración ayuda?",
    opciones: [
      "Eliminar todas las réplicas para acelerar el failover del writer",
      "Asignar prioridades de failover (tiers) a las réplicas de lectura de Aurora",
      "Usar una instancia RDS Multi-AZ en lugar de Aurora",
      "Configurar el endpoint del clúster para apuntar siempre a una IP fija"
    ],
    correctas: [1],
    explicacion: "Aurora permite asignar tiers de prioridad de failover a las réplicas; Aurora promueve primero la réplica del tier de mayor prioridad (y mayor tamaño en empates), haciendo el failover predecible. Eliminar réplicas elimina candidatos de failover rápido, RDS Multi-AZ es otra arquitectura, y los endpoints de Aurora se gestionan automáticamente, no con IPs fijas."
  },
  {
    id: "saa-342",
    dominio: 2,
    tema: "EventBridge Retries",
    tipo: "single",
    enunciado: "Una arquitectura orientada a eventos usa Amazon EventBridge para invocar una función Lambda. Ocasionalmente el destino no está disponible y algunos eventos se pierden. El equipo quiere reintentos automáticos y capturar los eventos que sigan fallando para analizarlos después. ¿Qué debe configurarse?",
    opciones: [
      "Aumentar el timeout de la función Lambda de destino",
      "Configurar una dead-letter queue en la regla/target de EventBridge además de la política de reintentos",
      "Cambiar EventBridge por una cola SQS sin DLQ",
      "Habilitar provisioned concurrency en la función Lambda"
    ],
    correctas: [1],
    explicacion: "EventBridge admite políticas de reintento con backoff y permite asignar una dead-letter queue al target para capturar los eventos que no pudieron entregarse tras agotar los reintentos, evitando pérdida de eventos. Cambiar timeouts o concurrency de Lambda no aborda fallos de entrega, y reemplazar EventBridge sin DLQ no resuelve la captura de fallos."
  },
  {
    id: "saa-343",
    dominio: 2,
    tema: "Idempotencia",
    tipo: "single",
    enunciado: "Un sistema consume mensajes de una cola SQS estándar. Debido a la naturaleza de entrega al-menos-una-vez de las colas estándar, ocasionalmente el mismo mensaje se procesa más de una vez, generando cargos duplicados a los clientes. ¿Cuál es la forma más robusta de evitar efectos duplicados?",
    opciones: [
      "Diseñar el procesamiento para que sea idempotente usando un identificador único por transacción",
      "Aumentar el visibility timeout para que nunca se reciba dos veces",
      "Procesar los mensajes en orden estricto usando un solo worker",
      "Reducir el tamaño del batch de recepción a un mensaje"
    ],
    correctas: [0],
    explicacion: "Las colas SQS estándar entregan al menos una vez, por lo que la solución correcta es hacer el procesamiento idempotente, por ejemplo registrando un ID de transacción único y descartando duplicados, de modo que reprocesar no cause efectos repetidos. Ajustar timeouts o el batch reduce la probabilidad pero no garantiza ausencia de duplicados."
  },
  {
    id: "saa-344",
    dominio: 2,
    tema: "Predictive Scaling",
    tipo: "single",
    enunciado: "Una aplicación tiene patrones de tráfico diarios y semanales muy regulares con picos pronunciados a horas conocidas. El escalado reactivo basado en métricas reacciona tarde y provoca breves degradaciones al inicio de cada pico. ¿Qué política de Auto Scaling anticipa la capacidad antes del pico?",
    opciones: [
      "Simple scaling con una alarma de CPU al 70%",
      "Predictive scaling, que usa machine learning sobre datos históricos para aprovisionar capacidad por adelantado",
      "Step scaling con múltiples umbrales",
      "Scheduled scaling con un único horario fijo al mediodía"
    ],
    correctas: [1],
    explicacion: "Predictive scaling analiza datos históricos con machine learning para pronosticar la demanda y aprovisionar capacidad antes de que llegue el pico, evitando la latencia del escalado reactivo. Simple y step scaling reaccionan después del cambio de métrica, y scheduled scaling con un único horario no cubre múltiples patrones recurrentes."
  },
  {
    id: "saa-345",
    dominio: 2,
    tema: "AWS Backup cross-account",
    tipo: "single",
    enunciado: "Una organización usa AWS Organizations y quiere centralizar la protección de backups, copiando automáticamente las copias de seguridad de las cuentas miembro a una cuenta de respaldo aislada para protegerlas incluso si una cuenta es comprometida. ¿Qué capacidad de AWS Backup habilita esto?",
    opciones: [
      "Replicación de S3 entre las cuentas de la organización",
      "Copia cross-account de AWS Backup hacia un vault en una cuenta de backup dedicada",
      "Compartir snapshots de EBS manualmente entre cuentas",
      "Habilitar Vault Lock en cada cuenta miembro por separado"
    ],
    correctas: [1],
    explicacion: "AWS Backup soporta copia cross-account hacia un vault en una cuenta dedicada y aislada (a menudo combinada con Backup policies de Organizations), de modo que las copias sobreviven aunque una cuenta de origen sea comprometida. La replicación de S3 no cubre todos los tipos de backup, y compartir snapshots manualmente no es centralizado ni automático."
  },
  {
    id: "saa-346",
    dominio: 2,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Una aplicación TCP global desplegada en endpoints de varias regiones necesita failover rápido y IPs estáticas de anycast para que los clientes no dependan de la propagación de DNS al cambiar de región. ¿Qué servicio ofrece esto mejorando además la latencia por la red de AWS?",
    opciones: [
      "Amazon CloudFront con orígenes en cada región",
      "AWS Global Accelerator con endpoints regionales y health checks",
      "Route 53 con registros weighted y TTL bajo",
      "Un Application Load Balancer multi-Region"
    ],
    correctas: [1],
    explicacion: "AWS Global Accelerator provee dos IPs estáticas anycast, enruta a los endpoints regionales sanos más cercanos por la red troncal de AWS y hace failover en segundos sin depender de TTLs de DNS. CloudFront es para contenido HTTP/cacheable, Route 53 depende de propagación de DNS, y un ALB no abarca múltiples regiones de forma nativa."
  },
  {
    id: "saa-347",
    dominio: 2,
    tema: "DynamoDB PITR",
    tipo: "single",
    enunciado: "Un equipo descubrió que un despliegue defectuoso corrompió registros en una tabla DynamoDB hace dos días. Necesitan restaurar la tabla a un estado de cualquier segundo dentro de los últimos 35 días. ¿Qué característica deben tener habilitada?",
    opciones: [
      "DynamoDB Streams con una función Lambda de auditoría",
      "Point-in-time recovery (PITR) en la tabla",
      "On-demand backups tomados manualmente cada semana",
      "Global Tables con una réplica en otra región"
    ],
    correctas: [1],
    explicacion: "Point-in-time recovery (PITR) permite restaurar una tabla DynamoDB a cualquier instante de los últimos 35 días, ideal para recuperarse de corrupciones o borrados. Streams captura cambios pero no restaura, los backups semanales no dan granularidad por segundo, y Global Tables replicaría también los datos corruptos."
  },
  {
    id: "saa-348",
    dominio: 2,
    tema: "SNS fan-out resiliente",
    tipo: "single",
    enunciado: "Un evento de pedido debe procesarse de forma independiente por tres servicios (inventario, facturación y notificaciones). El equipo quiere que si un servicio está temporalmente caído no pierda eventos ni bloquee a los demás. ¿Qué patrón es el más resiliente?",
    opciones: [
      "Que el productor invoque directamente las tres APIs de forma síncrona",
      "Publicar el evento en un tema SNS con una cola SQS suscrita por cada servicio (fan-out)",
      "Escribir el evento en una sola cola SQS compartida por los tres servicios",
      "Almacenar el evento en una tabla DynamoDB y que cada servicio haga polling"
    ],
    correctas: [1],
    explicacion: "El patrón fan-out de SNS con una cola SQS por consumidor desacopla los servicios: cada cola amortigua los eventos para su servicio, de modo que si uno está caído sus mensajes se acumulan sin afectar a los demás ni perderse. Las llamadas síncronas acoplan y propagan fallos, y una sola cola compartida no permite procesamiento independiente."
  },
  {
    id: "saa-349",
    dominio: 2,
    tema: "Route 53 Multivalue",
    tipo: "single",
    enunciado: "Una aplicación expone varios endpoints sin balanceador y el equipo quiere que Route 53 devuelva varias direcciones IP sanas en cada respuesta DNS, ofreciendo distribución básica y excluyendo automáticamente las IPs que fallen sus health checks. ¿Qué política de routing usar?",
    opciones: [
      "Simple routing con varios registros A",
      "Multivalue answer routing con health checks asociados a cada registro",
      "Failover routing con un registro primario y uno secundario",
      "Latency-based routing entre regiones"
    ],
    correctas: [1],
    explicacion: "Multivalue answer routing devuelve hasta ocho registros sanos en cada respuesta y omite los que fallan su health check, brindando distribución básica con verificación de salud sin necesidad de un balanceador. Simple routing no excluye endpoints no sanos, failover solo prioriza dos, y latency-based optimiza por latencia, no devuelve múltiples sanos por defecto."
  },
  {
    id: "saa-350",
    dominio: 2,
    tema: "Pilot Light",
    tipo: "single",
    enunciado: "Una empresa mantiene en la región secundaria una base de datos replicada continuamente y AMIs e infraestructura como código listas, pero sin servidores de aplicación encendidos. Ante un desastre, lanza y escala la capa de aplicación a partir de esos elementos. ¿Cómo se denomina esta estrategia de DR?",
    opciones: [
      "Backup and Restore",
      "Pilot Light",
      "Warm Standby",
      "Active/Active multi-Region"
    ],
    correctas: [1],
    explicacion: "Pilot Light mantiene los elementos esenciales (datos replicados e imágenes/IaC) preparados pero con la capa de cómputo apagada, encendiéndola y escalándola al activarse el desastre, lo que da menor RTO que Backup and Restore a bajo costo. Warm Standby mantiene la pila encendida y reducida, y Active/Active la mantiene completa en ambas regiones."
  },
  {
    id: "saa-351",
    dominio: 2,
    tema: "Estrategias DR comparadas",
    tipo: "multiple",
    enunciado: "Un arquitecto compara estrategias de DR según RTO/RPO y costo para varias aplicaciones. ¿Cuáles de las siguientes afirmaciones son correctas? (Elija dos.)",
    opciones: [
      "Backup and Restore ofrece el RTO más bajo de todas las estrategias",
      "Warm Standby mantiene una versión reducida pero siempre funcional de toda la pila en la región secundaria",
      "Active/Active suele ofrecer el RTO y RPO más bajos pero con el mayor costo y complejidad",
      "Pilot Light mantiene todos los servidores de aplicación encendidos a tamaño de producción",
      "Backup and Restore y Pilot Light tienen exactamente el mismo RTO"
    ],
    correctas: [1, 2],
    explicacion: "Warm Standby mantiene la pila completa encendida a escala reducida y Active/Active ofrece los mejores RTO/RPO al costo y complejidad más altos. Es falso que Backup and Restore tenga el RTO más bajo (es el más alto), que Pilot Light mantenga los servidores a tamaño de producción (los mantiene apagados o mínimos), o que Pilot Light y Backup and Restore compartan el mismo RTO."
  },
  {
    id: "saa-352",
    dominio: 2,
    tema: "Resiliencia multi-AZ",
    tipo: "multiple",
    enunciado: "Para diseñar una aplicación web de tres capas que tolere la pérdida de una zona de disponibilidad completa, ¿qué decisiones de arquitectura son apropiadas? (Elija dos.)",
    opciones: [
      "Desplegar el grupo de Auto Scaling con subredes en al menos dos zonas de disponibilidad",
      "Usar RDS Multi-AZ para la base de datos relacional",
      "Colocar todas las instancias en una sola zona para minimizar la latencia entre ellas",
      "Usar un único NAT Gateway en una sola AZ para todo el tráfico saliente",
      "Almacenar el estado de sesión solo en la memoria local de cada instancia"
    ],
    correctas: [0, 1],
    explicacion: "Distribuir el Auto Scaling group en varias AZ y usar RDS Multi-AZ permite sobrevivir a la caída de una AZ. Concentrar instancias o el NAT Gateway en una sola AZ crea un punto único de fallo, y guardar la sesión solo en memoria local la pierde al fallar una instancia."
  },
  {
    id: "saa-353",
    dominio: 2,
    tema: "S3 durabilidad y resiliencia",
    tipo: "multiple",
    enunciado: "Una empresa quiere maximizar la durabilidad y resiliencia de los datos en Amazon S3 frente a fallos y errores humanos. ¿Qué afirmaciones sobre las capacidades de S3 son correctas? (Elija dos.)",
    opciones: [
      "S3 Standard está diseñado para una durabilidad de once nueves (99,999999999%) replicando objetos en múltiples AZ",
      "Habilitar versioning permite recuperar objetos sobrescritos o borrados accidentalmente",
      "S3 One Zone-IA ofrece mayor resiliencia ante fallo de AZ que S3 Standard",
      "Cross-Region Replication requiere desactivar el versioning en el bucket de origen",
      "S3 no protege contra borrados accidentales bajo ninguna configuración"
    ],
    correctas: [0, 1],
    explicacion: "S3 Standard ofrece 11 nueves de durabilidad replicando en varias AZ, y el versioning permite recuperar objetos borrados o sobrescritos. One Zone-IA reside en una sola AZ (menos resiliente), CRR requiere versioning habilitado (no desactivado), y versioning con MFA Delete sí protege contra borrados accidentales."
  },
  {
    id: "saa-354",
    dominio: 2,
    tema: "Desacople resiliente",
    tipo: "multiple",
    enunciado: "Un equipo rediseña un sistema monolítico acoplado para mejorar la resiliencia ante fallos parciales y picos de carga. ¿Qué prácticas de desacoplamiento son recomendables? (Elija dos.)",
    opciones: [
      "Introducir colas SQS entre productores y consumidores para amortiguar la carga",
      "Configurar dead-letter queues para aislar mensajes que fallan repetidamente",
      "Acoplar los servicios mediante llamadas síncronas obligatorias entre todos ellos",
      "Eliminar los reintentos para que los fallos se propaguen de inmediato",
      "Compartir el estado de sesión en la memoria local de cada servicio"
    ],
    correctas: [0, 1],
    explicacion: "Las colas SQS amortiguan picos y desacoplan productores de consumidores, y las dead-letter queues aíslan mensajes problemáticos para que no bloqueen el flujo. El acoplamiento síncrono obligatorio propaga fallos, eliminar reintentos reduce la resiliencia, y el estado en memoria local impide escalar y recuperar sin pérdida."
  },
  {
    id: "saa-355",
    dominio: 2,
    tema: "Recuperación de bases de datos",
    tipo: "multiple",
    enunciado: "Un arquitecto evalúa opciones de recuperación y alta disponibilidad para distintas bases de datos gestionadas en AWS. ¿Qué afirmaciones son correctas? (Elija dos.)",
    opciones: [
      "Aurora Global Database permite promover una región secundaria con un RPO típicamente menor a un segundo",
      "El point-in-time recovery de DynamoDB permite restaurar a cualquier instante de los últimos 35 días",
      "RDS Multi-AZ con instancia en espera permite servir lecturas desde la réplica en espera",
      "Aurora Backtrack está disponible para todos los motores RDS, incluido PostgreSQL gestionado por RDS",
      "Las réplicas de lectura de RDS en la misma región protegen contra un fallo regional completo"
    ],
    correctas: [0, 1],
    explicacion: "Aurora Global Database logra RPO menor a un segundo entre regiones, y el PITR de DynamoDB cubre los últimos 35 días. La instancia en espera de RDS Multi-AZ no sirve lecturas, Backtrack es específico de Aurora MySQL (no de RDS PostgreSQL), y las réplicas en la misma región no protegen contra un fallo regional."
  },
  {
    id: "saa-356",
    dominio: 2,
    tema: "Route 53 health checks",
    tipo: "multiple",
    enunciado: "Un equipo configura Amazon Route 53 para una arquitectura de alta disponibilidad multi-Region. ¿Qué afirmaciones sobre routing y health checks son correctas? (Elija dos.)",
    opciones: [
      "El failover routing usa health checks para enrutar al endpoint secundario cuando el primario no es sano",
      "Los health checks de Route 53 pueden basarse en otros health checks (calculated) o en alarmas de CloudWatch",
      "El simple routing excluye automáticamente los endpoints que fallan health checks",
      "Multivalue answer routing solo devuelve un único registro por consulta",
      "Los health checks de Route 53 solo funcionan con recursos dentro de una única AZ"
    ],
    correctas: [0, 1],
    explicacion: "El failover routing depende de health checks para conmutar al secundario, y Route 53 admite health checks calculados (combinación de otros) y basados en alarmas de CloudWatch. El simple routing no excluye endpoints no sanos, multivalue devuelve varios registros, y los health checks no están limitados a una sola AZ."
  },
  {
    id: "saa-357",
    dominio: 2,
    tema: "Aurora clones",
    tipo: "single",
    enunciado: "Un equipo de QA necesita una copia completa de un clúster Aurora de producción de gran tamaño para pruebas, pero crear la copia con un snapshot tradicional tarda mucho y duplica el almacenamiento. Quieren una copia casi instantánea que comparta el almacenamiento subyacente hasta que se modifique. ¿Qué característica deben usar?",
    opciones: [
      "Aurora database cloning (clones copy-on-write)",
      "Restaurar desde un snapshot manual a un clúster nuevo",
      "Crear una réplica de lectura y promoverla",
      "Exportar la base a S3 e importarla en un clúster nuevo"
    ],
    correctas: [0],
    explicacion: "El database cloning de Aurora crea un clon casi instantáneo mediante copy-on-write, compartiendo el almacenamiento con el clúster original y solo duplicando datos cuando se modifican, lo que ahorra tiempo y costo frente a un snapshot. Restaurar snapshots o exportar a S3 es lento y duplica almacenamiento; promover una réplica no crea una copia aislada para pruebas."
  },
  {
    id: "saa-358",
    dominio: 2,
    tema: "Auto Scaling Mixed Instances",
    tipo: "single",
    enunciado: "Una aplicación tolerante a interrupciones quiere reducir costos usando instancias Spot, pero necesita garantizar una base mínima de capacidad estable con instancias On-Demand y diversificar entre varios tipos de instancia para mejorar la disponibilidad de Spot. ¿Qué capacidad de Auto Scaling lo permite?",
    opciones: [
      "Un grupo de Auto Scaling con una mixed instances policy combinando On-Demand y Spot con varios tipos de instancia",
      "Dos grupos de Auto Scaling separados sin coordinación entre On-Demand y Spot",
      "Un único tipo de instancia Spot para toda la flota",
      "Reserved Instances para toda la capacidad del grupo"
    ],
    correctas: [0],
    explicacion: "Una mixed instances policy permite definir una base On-Demand garantizada y completar con Spot, diversificando entre múltiples tipos de instancia y AZ para mejorar la disponibilidad y resiliencia frente a interrupciones de Spot. Grupos separados sin coordinación, un solo tipo de Spot o Reserved Instances no logran esa combinación flexible y resiliente."
  },
  {
    id: "saa-359",
    dominio: 2,
    tema: "Auto Scaling Cooldown",
    tipo: "single",
    enunciado: "Tras una acción de escalado simple, un grupo de Auto Scaling sigue agregando o quitando instancias en respuesta a métricas que aún reflejan el estado previo, provocando oscilaciones (thrashing). ¿Qué configuración evita que se disparen nuevas acciones antes de que la métrica se estabilice?",
    opciones: [
      "Configurar un cooldown period adecuado tras cada actividad de escalado simple",
      "Eliminar todas las políticas de escalado del grupo",
      "Reducir el período de las métricas de CloudWatch a un segundo",
      "Fijar la capacidad deseada manualmente y desactivar el escalado"
    ],
    correctas: [0],
    explicacion: "El cooldown period en simple scaling hace que Auto Scaling espere un tiempo tras una acción antes de iniciar otra, dejando que las métricas reflejen el efecto del cambio y evitando oscilaciones. Eliminar políticas o fijar la capacidad anula el escalado automático, y reducir el período de métricas agravaría el thrashing."
  },
  {
    id: "saa-360",
    dominio: 2,
    tema: "Conexión híbrida resiliente",
    tipo: "single",
    enunciado: "Una empresa requiere conectividad híbrida de alta disponibilidad con ancho de banda consistente y necesita tolerar tanto el fallo de un dispositivo de red como el de una ubicación de Direct Connect completa. ¿Cuál es la arquitectura más resiliente?",
    opciones: [
      "Una sola conexión Direct Connect con un router redundante en el lado on-premises",
      "Dos conexiones Direct Connect en dos ubicaciones de Direct Connect distintas, terminando en dispositivos y dispositivos de borde separados",
      "Una conexión Direct Connect respaldada únicamente por una VPN de bajo ancho de banda",
      "Múltiples VPNs Site-to-Site sobre la misma conexión a Internet"
    ],
    correctas: [1],
    explicacion: "Para máxima resiliencia AWS recomienda dos conexiones Direct Connect en ubicaciones distintas, terminando en dispositivos separados, de modo que se tolere el fallo de un dispositivo o de una ubicación completa con ancho de banda consistente. Una sola Direct Connect deja un punto único, la VPN de respaldo reduce el ancho de banda, y varias VPNs sobre un mismo enlace a Internet comparten el mismo punto de fallo."
  }
]);
