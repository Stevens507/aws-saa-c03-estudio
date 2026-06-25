window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-441",
    dominio: 1,
    tema: "IAM evaluación de políticas",
    tipo: "single",
    enunciado: "Un usuario de IAM tiene una política gestionada que permite 's3:GetObject' sobre un bucket. La SCP de la organización permite todas las acciones de S3, pero una política de bucket basada en recursos contiene un 'Deny' explícito para ese usuario sobre el prefijo 'confidencial/'. El usuario intenta descargar 'confidencial/datos.csv'. ¿Cuál es el resultado y por qué?",
    opciones: [
      "Se deniega el acceso, porque un Deny explícito en cualquier política aplicable siempre prevalece sobre cualquier Allow",
      "Se permite el acceso, porque la política de identidad otorga GetObject de forma explícita",
      "Se permite el acceso, porque las políticas basadas en recursos no pueden denegar a usuarios de la misma cuenta",
      "Se deniega el acceso, porque al no existir Allow en la política de bucket aplica el deny implícito"
    ],
    correctas: [0],
    explicacion: "En la evaluación de IAM, un Deny explícito en cualquier política aplicable (identidad, recurso, SCP, etc.) gana siempre, sin importar cuántos Allow existan. La política de identidad permite la acción, pero la política de bucket la deniega explícitamente para ese prefijo. No es un deny implícito por ausencia de Allow, sino un Deny explícito que prevalece."
  },
  {
    id: "saa-442",
    dominio: 1,
    tema: "IAM NotAction",
    tipo: "single",
    enunciado: "Un arquitecto debe permitir a un rol realizar todas las acciones de EC2 EXCEPTO 'ec2:TerminateInstances', con el mínimo mantenimiento posible aunque AWS agregue nuevas acciones de EC2 en el futuro. ¿Qué construcción de política logra esto de la forma MÁS mantenible?",
    opciones: [
      "Un Statement con Effect Allow y 'NotAction': 'ec2:TerminateInstances' sobre Resource '*'",
      "Un Statement Allow que liste explícitamente cada acción de EC2 salvo TerminateInstances",
      "Un Statement Deny con 'ec2:*' y otro Allow con 'ec2:TerminateInstances'",
      "Un Statement Allow 'ec2:*' combinado con un Statement Deny 'ec2:TerminateInstances'"
    ],
    correctas: [3],
    explicacion: "La forma más segura y mantenible es Allow 'ec2:*' con un Deny explícito de 'ec2:TerminateInstances'; el Deny prevalece y futuras acciones quedan permitidas automáticamente. 'NotAction' con Allow también permitiría TerminateInstances en otros contextos y es propenso a errores. Listar cada acción no escala y rompe al añadirse nuevas acciones."
  },
  {
    id: "saa-443",
    dominio: 1,
    tema: "ABAC con tags",
    tipo: "single",
    enunciado: "Una empresa tiene cientos de proyectos y quiere que cada empleado acceda solo a los recursos de su propio proyecto, sin crear una política por proyecto. Tanto los principales de IAM como los recursos llevan una etiqueta 'proyecto'. ¿Qué enfoque cumple el requisito con el MENOR esfuerzo operativo a medida que crecen los proyectos?",
    opciones: [
      "ABAC: una política con condición que compara 'aws:PrincipalTag/proyecto' con 'aws:ResourceTag/proyecto'",
      "RBAC: un grupo de IAM y una política gestionada por cada proyecto",
      "Una política por usuario que enumere los ARN de los recursos de su proyecto",
      "Una SCP distinta en una OU separada por cada proyecto"
    ],
    correctas: [0],
    explicacion: "ABAC usa condiciones que comparan la etiqueta del principal con la del recurso, por lo que una sola política sirve para todos los proyectos: al crear un proyecto nuevo basta con etiquetar a las personas y los recursos. RBAC, las políticas por usuario y las SCP por OU exigen crear y mantener un artefacto por proyecto, lo que no escala."
  },
  {
    id: "saa-444",
    dominio: 1,
    tema: "IAM Roles Anywhere",
    tipo: "single",
    enunciado: "Servidores on-premises necesitan llamar a APIs de AWS con credenciales temporales, sin almacenar claves de acceso de larga duración. La empresa ya posee una PKI corporativa que emite certificados X.509 a esos servidores. ¿Qué solución entrega credenciales temporales de la forma MÁS segura?",
    opciones: [
      "IAM Roles Anywhere con un trust anchor vinculado a la CA corporativa para obtener credenciales de STS",
      "Crear un usuario IAM por servidor y rotar las claves de acceso con Secrets Manager",
      "Distribuir una clave de acceso compartida y restringirla por dirección IP de origen",
      "Instalar el SSM Agent y usar instance profiles en los servidores on-premises"
    ],
    correctas: [0],
    explicacion: "IAM Roles Anywhere permite que cargas de trabajo fuera de AWS usen certificados X.509 de una CA de confianza (trust anchor) para asumir roles y recibir credenciales temporales de STS, eliminando las claves de larga duración. Los usuarios IAM o las claves compartidas implican secretos persistentes. Los instance profiles requieren registrar las máquinas como managed instances, pero no entregan credenciales basadas en la PKI existente."
  },
  {
    id: "saa-445",
    dominio: 1,
    tema: "STS session policies",
    tipo: "single",
    enunciado: "Una aplicación asume un rol con permisos amplios, pero para cada sesión de usuario solo debe poder leer objetos de un único prefijo de S3 calculado en tiempo de ejecución. No se quiere crear un rol nuevo por usuario. ¿Cuál es el mecanismo MÁS adecuado para acotar los permisos de cada sesión?",
    opciones: [
      "Pasar una session policy en la llamada AssumeRole para restringir los permisos efectivos de esa sesión",
      "Adjuntar una política inline distinta al rol antes de cada AssumeRole",
      "Crear un rol por usuario con una política que limite el prefijo",
      "Aplicar una SCP que limite el prefijo según el usuario"
    ],
    correctas: [0],
    explicacion: "Una session policy se pasa en AssumeRole y, como permiso efectivo, se calcula la intersección entre la política del rol y la session policy: nunca amplía, solo reduce. Es ideal para acotar dinámicamente por sesión sin tocar el rol. Modificar la política del rol en cada llamada es propenso a condiciones de carrera, un rol por usuario no escala y las SCP no se evalúan por sesión de aplicación."
  },
  {
    id: "saa-446",
    dominio: 1,
    tema: "S3 Access Points",
    tipo: "single",
    enunciado: "Un bucket de S3 con datos compartidos es usado por decenas de aplicaciones, cada una con requisitos de acceso distintos. La política de bucket se ha vuelto enorme y difícil de auditar. ¿Qué enfoque simplifica la gestión de permisos por aplicación con el MENOR esfuerzo operativo?",
    opciones: [
      "Crear un S3 Access Point por aplicación, cada uno con su propia política de acceso",
      "Dividir los datos en un bucket separado por aplicación y replicarlos",
      "Mantener un único bucket y seguir ampliando la política de bucket",
      "Generar URLs prefirmadas distintas por aplicación desde una función Lambda"
    ],
    correctas: [0],
    explicacion: "Los S3 Access Points dan a cada aplicación un endpoint y una política independientes sobre el mismo bucket, descomponiendo una política monolítica en políticas pequeñas y auditables por caso de uso. Crear muchos buckets y replicar añade costo y complejidad. Las URLs prefirmadas no resuelven la gestión de permisos a gran escala ni la auditoría."
  },
  {
    id: "saa-447",
    dominio: 1,
    tema: "S3 Multi-Region Access Points",
    tipo: "single",
    enunciado: "Una aplicación global escribe y lee de buckets de S3 replicados en tres regiones. Se necesita un único endpoint que enrute automáticamente a la copia más cercana y soporte conmutación si una región falla. ¿Qué servicio cumple el requisito con el MENOR esfuerzo operativo?",
    opciones: [
      "Un S3 Multi-Region Access Point sobre los buckets replicados",
      "Un Application Load Balancer delante de los endpoints regionales de S3",
      "Registros DNS de Route 53 con latency routing hacia cada bucket",
      "Una distribución de CloudFront con un origen por región"
    ],
    correctas: [0],
    explicacion: "Un S3 Multi-Region Access Point ofrece un único nombre de host global que enruta por la red de AWS a la copia con menor latencia y permite failover entre regiones, ideal para buckets replicados. Un ALB no enruta a S3 directamente, el latency routing de Route 53 no gestiona failover de S3 nativamente y CloudFront optimiza la entrega de lectura pero no es un endpoint de lectura/escritura multi-región para la aplicación."
  },
  {
    id: "saa-448",
    dominio: 1,
    tema: "S3 Block Public Access",
    tipo: "single",
    enunciado: "Tras un incidente de exposición de datos, la dirección exige garantizar que NINGÚN bucket de ninguna cuenta de la organización pueda hacerse público, incluso si un desarrollador aplica por error una ACL o política pública. ¿Qué medida ofrece la garantía MÁS sólida con el MENOR esfuerzo continuo?",
    opciones: [
      "Activar S3 Block Public Access a nivel de cuenta en todas las cuentas (idealmente vía SCP/Config)",
      "Revisar manualmente las políticas de bucket cada semana",
      "Activar Block Public Access solo en los buckets existentes",
      "Habilitar el cifrado por defecto en todos los buckets"
    ],
    correctas: [0],
    explicacion: "S3 Block Public Access a nivel de cuenta anula cualquier ACL o política que intente exponer un bucket, presente o futuro, por lo que es la barrera más robusta; aplicarlo en todas las cuentas mediante automatización lo garantiza a escala. Las revisiones manuales no escalan y son reactivas, aplicarlo solo a buckets existentes deja desprotegidos los nuevos, y el cifrado no impide el acceso público."
  },
  {
    id: "saa-449",
    dominio: 1,
    tema: "KMS key policy vs IAM",
    tipo: "single",
    enunciado: "Un administrador adjunta una política de IAM que permite 'kms:Decrypt' a un usuario sobre una KMS key gestionada por el cliente, pero el usuario sigue recibiendo AccessDenied. La key policy no menciona a ese usuario ni delega en IAM. ¿Cuál es la causa MÁS probable?",
    opciones: [
      "La key policy no delega permisos a IAM, por lo que la política de identidad por sí sola no basta",
      "Las KMS keys ignoran por completo las políticas de IAM",
      "Falta un grant de KMS, único mecanismo válido para Decrypt",
      "El usuario necesita además 'kms:CreateGrant' para poder descifrar"
    ],
    correctas: [0],
    explicacion: "Para que una política de IAM conceda acceso a una KMS key, la key policy debe delegar en IAM (típicamente con un statement que da a la raíz de la cuenta 'kms:*' o permisos equivalentes). Si la key policy no delega, las políticas de identidad no surten efecto. KMS no ignora IAM cuando hay delegación, los grants no son el único mecanismo y CreateGrant no es requisito para Decrypt."
  },
  {
    id: "saa-450",
    dominio: 1,
    tema: "KMS grants",
    tipo: "single",
    enunciado: "Un servicio efímero debe poder cifrar y descifrar con una KMS key solo durante la vida de una tarea, y se quiere poder revocar ese permiso de inmediato al terminar, sin editar la key policy ni las políticas de IAM. ¿Qué mecanismo de KMS es el MÁS adecuado?",
    opciones: [
      "Crear un grant de KMS para el principal con las operaciones necesarias y revocarlo al finalizar",
      "Añadir y luego quitar un statement en la key policy en cada ejecución",
      "Adjuntar y desadjuntar una política de IAM en cada ejecución",
      "Crear una nueva KMS key para cada tarea y eliminarla al terminar"
    ],
    correctas: [0],
    explicacion: "Los grants de KMS otorgan permisos temporales y granulares a un principal sobre una key y pueden revocarse al instante con RetireGrant/RevokeGrant, sin modificar la key policy ni IAM, lo que encaja con cargas efímeras. Editar la key policy o las políticas de IAM en cada ejecución es frágil y propenso a errores, y crear/eliminar keys por tarea es costoso e innecesario."
  },
  {
    id: "saa-451",
    dominio: 1,
    tema: "KMS condición ViaService",
    tipo: "single",
    enunciado: "Se quiere que una KMS key solo pueda usarse para descifrar cuando la petición provenga del servicio Amazon EBS, y no si un usuario llama directamente a la API de KMS. ¿Qué condición en la key policy implementa esta restricción?",
    opciones: [
      "Una condición 'kms:ViaService' con el valor 'ec2.<region>.amazonaws.com'",
      "Una condición 'aws:SourceArn' apuntando al volumen EBS",
      "Una condición 'aws:PrincipalOrgID' con el ID de la organización",
      "Una condición 'kms:GrantIsForAWSResource' en true"
    ],
    correctas: [0],
    explicacion: "La clave de condición 'kms:ViaService' limita el uso de la key a peticiones realizadas en nombre del principal por un servicio de AWS concreto; para EBS se usa el endpoint de EC2. Así un usuario no puede llamar a KMS directamente. 'aws:SourceArn' y 'PrincipalOrgID' no restringen al servicio EBS de esta forma, y 'GrantIsForAWSResource' aplica a grants, no a este control."
  },
  {
    id: "saa-452",
    dominio: 1,
    tema: "KMS keys asimétricas",
    tipo: "single",
    enunciado: "Socios externos deben verificar firmas digitales generadas por un sistema interno, pero la organización no quiere compartir ningún material de clave secreta con ellos. ¿Qué opción de KMS satisface el requisito de la forma MÁS segura?",
    opciones: [
      "Usar una KMS key asimétrica para firmar internamente y distribuir solo la clave pública a los socios",
      "Usar una KMS key simétrica y compartir el material de la clave con cada socio",
      "Generar un secreto compartido en Secrets Manager y entregarlo a los socios",
      "Firmar con HMAC usando una KMS key simétrica y enviar la key a los socios"
    ],
    correctas: [0],
    explicacion: "Una KMS key asimétrica permite firmar con la clave privada (que nunca sale de KMS) y distribuir únicamente la clave pública para que los socios verifiquen, sin exponer secretos. Las keys simétricas y HMAC exigirían compartir material secreto, lo que rompe el requisito de seguridad, y un secreto compartido no es un esquema de firma de clave pública."
  },
  {
    id: "saa-453",
    dominio: 1,
    tema: "CloudHSM",
    tipo: "single",
    enunciado: "Por requisitos regulatorios, una empresa debe controlar de forma exclusiva sus claves criptográficas en hardware certificado FIPS 140-2 nivel 3 de un solo inquilino (single-tenant), sin que AWS tenga ningún acceso al material de clave. ¿Qué servicio cumple el requisito?",
    opciones: [
      "AWS CloudHSM, que ofrece HSMs dedicados de un solo inquilino bajo control exclusivo del cliente",
      "AWS KMS con keys gestionadas por el cliente y rotación automática",
      "AWS KMS con un almacén de claves personalizado respaldado por la cuenta raíz",
      "AWS Certificate Manager con una CA privada"
    ],
    correctas: [0],
    explicacion: "CloudHSM proporciona módulos de seguridad de hardware dedicados de un solo inquilino, validados FIPS 140-2 nivel 3, donde solo el cliente controla las claves y AWS no tiene acceso al material. KMS multiinquilino no cumple el single-tenant exclusivo, y ACM con CA privada es para emisión de certificados, no para custodia exclusiva de claves en HSM dedicado."
  },
  {
    id: "saa-454",
    dominio: 1,
    tema: "Cifrado RDS",
    tipo: "single",
    enunciado: "Un equipo descubre que una instancia de RDS existente y crítica se creó sin cifrado en reposo y debe cifrarse cumpliendo la normativa, minimizando el tiempo de inactividad. ¿Cuál es el procedimiento correcto?",
    opciones: [
      "Crear un snapshot, copiarlo activando el cifrado con una KMS key y restaurar una nueva instancia desde la copia cifrada",
      "Activar el cifrado directamente en la instancia existente desde la consola",
      "Modificar la instancia y adjuntarle una KMS key sin recrearla",
      "Habilitar el cifrado solo en las réplicas de lectura y promover una"
    ],
    correctas: [0],
    explicacion: "El cifrado en reposo de RDS no se puede activar in situ en una instancia ya creada sin cifrar; el procedimiento soportado es tomar un snapshot, copiarlo especificando una KMS key (la copia queda cifrada) y restaurar una nueva instancia desde ese snapshot cifrado. No existe la opción de cifrar la instancia existente directamente ni de promover una réplica para cifrar el primario sin cifrar."
  },
  {
    id: "saa-455",
    dominio: 1,
    tema: "Cifrado SQS/SNS",
    tipo: "multiple",
    enunciado: "Mensajes con datos sensibles transitan por una cola de SQS y un tópico de SNS. Seguridad exige cifrado en reposo gestionado por claves del cliente y poder auditar su uso. ¿Qué DOS afirmaciones son correctas sobre el cifrado de SQS y SNS? (Elegí dos)",
    opciones: [
      "SQS y SNS soportan cifrado del lado del servidor (SSE) con una KMS key gestionada por el cliente",
      "Las llamadas a KMS realizadas por SQS y SNS quedan registradas en CloudTrail, lo que permite auditar el uso de la clave",
      "El cifrado SSE de SQS también cifra los mensajes mientras viajan en tránsito por la red, haciendo innecesario TLS",
      "SQS y SNS no permiten usar claves gestionadas por el cliente, solo claves gestionadas por AWS",
      "Activar SSE en una cola existente requiere recrear la cola desde cero porque no se puede modificar en caliente"
    ],
    correctas: [0, 1],
    explicacion: "SQS y SNS soportan cifrado del lado del servidor (SSE) con una KMS key gestionada por el cliente, y las llamadas a KMS quedan registradas en CloudTrail para auditar su uso. El SSE protege en reposo, no en tránsito (para eso está TLS). Sí se permiten claves gestionadas por el cliente y el cifrado puede activarse en una cola existente sin recrearla."
  },
  {
    id: "saa-456",
    dominio: 1,
    tema: "AWS Certificate Manager",
    tipo: "single",
    enunciado: "Una empresa quiere TLS en su sitio público detrás de un Application Load Balancer sin pagar por certificados ni gestionar su renovación manual. ¿Qué solución cumple el requisito con el MENOR esfuerzo operativo?",
    opciones: [
      "Emitir un certificado público gratuito con ACM y asociarlo al listener HTTPS del ALB; ACM lo renueva automáticamente",
      "Comprar un certificado a una CA externa e instalarlo manualmente en el ALB cada año",
      "Generar un certificado autofirmado y cargarlo en el ALB",
      "Terminar TLS en las instancias EC2 con certificados gestionados por el equipo"
    ],
    correctas: [0],
    explicacion: "ACM emite certificados públicos sin costo, los asocia al listener HTTPS del ALB y gestiona su renovación automática, eliminando el trabajo manual. Comprar e instalar certificados externos implica renovación manual, los autofirmados no son confiables para un sitio público y terminar TLS en EC2 con certificados propios añade gestión innecesaria."
  },
  {
    id: "saa-457",
    dominio: 1,
    tema: "VPC endpoint policy",
    tipo: "single",
    enunciado: "Para evitar exfiltración de datos, una empresa quiere que el tráfico hacia S3 desde su VPC privada solo pueda acceder a buckets de su propia organización y nunca a buckets de terceros, sin pasar por Internet. ¿Qué combinación cumple el requisito de la forma MÁS segura?",
    opciones: [
      "Un Gateway Endpoint a S3 con una endpoint policy que restrinja el acceso a los buckets/cuentas de la organización",
      "Un NAT Gateway con reglas de seguridad que filtren los dominios de S3",
      "Una endpoint policy que permita 's3:*' sobre Resource '*' para máxima compatibilidad",
      "Una SCP que deniegue 's3:PutObject' fuera de horario laboral"
    ],
    correctas: [0],
    explicacion: "Un Gateway Endpoint mantiene el tráfico a S3 dentro de la red de AWS (sin Internet) y su endpoint policy puede limitar las peticiones a los buckets o cuentas de la organización (por ejemplo con aws:ResourceOrgID), impidiendo el acceso a buckets ajenos. Un NAT Gateway envía tráfico por Internet, una endpoint policy con '*' no restringe nada y la SCP por horario no controla el destino."
  },
  {
    id: "saa-458",
    dominio: 1,
    tema: "WAF vs Shield vs Network Firewall",
    tipo: "single",
    enunciado: "Una aplicación web pública sufre ataques de inyección SQL y de scripting entre sitios desde múltiples direcciones IP. El equipo necesita inspeccionar y bloquear estas peticiones de capa 7 en el borde, idealmente con reglas administradas. ¿Qué servicio es el MÁS adecuado?",
    opciones: [
      "AWS WAF con reglas administradas asociado a CloudFront o al ALB",
      "AWS Shield Standard para mitigar la capa de aplicación",
      "AWS Network Firewall en la VPC para filtrar la capa 7",
      "Grupos de seguridad con reglas que bloqueen las IP atacantes"
    ],
    correctas: [0],
    explicacion: "AWS WAF inspecciona peticiones HTTP/HTTPS (capa 7) y ofrece reglas administradas para SQL injection y XSS, asociándose a CloudFront, ALB o API Gateway. Shield protege frente a DDoS, no contra inyección de capa 7. Network Firewall opera a nivel de red/VPC y no provee reglas de aplicación administradas para web. Los security groups filtran por IP/puerto, no inspeccionan el contenido de las peticiones."
  },
  {
    id: "saa-459",
    dominio: 1,
    tema: "Shield Advanced",
    tipo: "single",
    enunciado: "Una empresa de comercio electrónico necesita protección DDoS mejorada para su CloudFront y sus Elastic IP, con acceso a un equipo de respuesta de AWS durante ataques y protección de costos frente a escalados inducidos por DDoS. ¿Qué servicio cumple estos requisitos?",
    opciones: [
      "AWS Shield Advanced",
      "AWS Shield Standard, incluido sin costo para todos",
      "AWS WAF con rate-based rules únicamente",
      "Amazon GuardDuty con detección de anomalías de red"
    ],
    correctas: [0],
    explicacion: "Shield Advanced añade mitigación DDoS de mayor capacidad, acceso al AWS Shield Response Team (SRT) durante ataques, métricas detalladas y protección de costos (cost protection) frente a picos de escalado provocados por DDoS. Shield Standard ofrece protección básica sin SRT ni cost protection. WAF ayuda en capa 7 pero no da SRT ni cost protection, y GuardDuty detecta amenazas pero no mitiga DDoS."
  },
  {
    id: "saa-460",
    dominio: 1,
    tema: "GuardDuty + EventBridge",
    tipo: "single",
    enunciado: "Cuando GuardDuty detecta una instancia EC2 comprometida, la empresa quiere aislarla automáticamente en segundos sin intervención humana. ¿Qué arquitectura logra esta respuesta automática con el MENOR esfuerzo operativo?",
    opciones: [
      "Una regla de EventBridge que filtre los hallazgos de GuardDuty e invoque una Lambda que cambie el security group de la instancia",
      "Revisar el panel de GuardDuty cada hora y aislar las instancias manualmente",
      "Exportar los hallazgos a S3 y procesarlos con un job nocturno de Athena",
      "Configurar una alarma de CloudWatch sobre el uso de CPU para aislar instancias"
    ],
    correctas: [0],
    explicacion: "GuardDuty publica sus hallazgos como eventos; una regla de EventBridge puede filtrarlos por tipo/severidad e invocar una función Lambda que aplique un security group de cuarentena, logrando aislamiento automático en segundos sin operación manual. La revisión manual no es inmediata, un job nocturno introduce gran retardo y una alarma de CPU no detecta el compromiso."
  },
  {
    id: "saa-461",
    dominio: 1,
    tema: "Amazon Macie",
    tipo: "single",
    enunciado: "Cumplimiento necesita descubrir de forma automática y continua si hay datos personales identificables (PII) almacenados en los buckets de S3 de la organización y recibir alertas. ¿Qué servicio cumple el requisito con el MENOR esfuerzo operativo?",
    opciones: [
      "Amazon Macie para detectar y clasificar PII en S3 mediante machine learning",
      "Amazon GuardDuty para clasificar el contenido de los objetos de S3",
      "Amazon Inspector para escanear los datos en busca de PII",
      "Un script de Lambda con expresiones regulares que recorra cada objeto"
    ],
    correctas: [0],
    explicacion: "Macie usa machine learning y patrones para descubrir, clasificar y alertar sobre PII y otros datos sensibles en S3 de forma gestionada y continua. GuardDuty detecta amenazas, no clasifica el contenido de objetos. Inspector evalúa vulnerabilidades de cargas de trabajo, no PII. Un script propio con regex exige construir y mantener toda la lógica, con menor precisión y más esfuerzo."
  },
  {
    id: "saa-462",
    dominio: 1,
    tema: "Amazon Inspector",
    tipo: "single",
    enunciado: "Un equipo quiere evaluar de forma automática y continua las vulnerabilidades conocidas (CVE) de sus instancias EC2, imágenes de ECR y funciones Lambda, con escaneos que se disparen al cambiar los recursos. ¿Qué servicio cumple el requisito con el MENOR esfuerzo operativo?",
    opciones: [
      "Amazon Inspector, que escanea EC2, ECR y Lambda en busca de vulnerabilidades de forma continua",
      "Amazon Macie para detectar vulnerabilidades en las cargas de trabajo",
      "AWS Config con reglas administradas de CVE",
      "Un escáner de vulnerabilidades de terceros instalado y mantenido en cada host"
    ],
    correctas: [0],
    explicacion: "Amazon Inspector evalúa de forma automática y continua vulnerabilidades (CVE) y exposición de red en EC2, imágenes de contenedor en ECR y funciones Lambda, re-escaneando al detectar cambios. Macie clasifica datos sensibles, no vulnerabilidades. Config evalúa conformidad de configuración, no CVE. Un escáner de terceros requiere instalación y mantenimiento, con mayor esfuerzo operativo."
  },
  {
    id: "saa-463",
    dominio: 1,
    tema: "Security Hub",
    tipo: "single",
    enunciado: "Una organización con muchas cuentas y regiones quiere un panel único que agregue los hallazgos de GuardDuty, Inspector y Macie y evalúe el cumplimiento frente a estándares como CIS y AWS Foundational Security Best Practices. ¿Qué servicio cumple el requisito?",
    opciones: [
      "AWS Security Hub como agregador central de hallazgos y comprobaciones de cumplimiento",
      "Amazon CloudWatch como panel unificado de seguridad",
      "AWS Config como agregador de hallazgos de seguridad multi-cuenta",
      "AWS Trusted Advisor para consolidar los hallazgos de seguridad"
    ],
    correctas: [0],
    explicacion: "Security Hub agrega y normaliza hallazgos de GuardDuty, Inspector, Macie y otros servicios y partners, soporta agregación multi-cuenta y multi-región y ejecuta comprobaciones contra estándares como CIS y FSBP. CloudWatch es de métricas y logs, Config evalúa configuración (y alimenta a Security Hub, pero no es el agregador central) y Trusted Advisor da recomendaciones, no es un agregador SIEM-like."
  },
  {
    id: "saa-464",
    dominio: 1,
    tema: "AWS Config remediación",
    tipo: "single",
    enunciado: "La empresa exige que cualquier bucket de S3 que quede sin cifrado por defecto se corrija automáticamente, sin esperar a una revisión manual. ¿Qué solución implementa esta corrección automática con el MENOR esfuerzo operativo?",
    opciones: [
      "Una regla de AWS Config con una acción de remediación automática (documento de SSM Automation) que active el cifrado",
      "Un job de CloudWatch Events que cada noche liste los buckets y avise por correo",
      "Una política de bucket que rechace lecturas si el bucket no está cifrado",
      "Una SCP que impida por completo crear buckets de S3"
    ],
    correctas: [0],
    explicacion: "AWS Config evalúa la conformidad de los recursos y puede asociar una acción de remediación automática basada en un documento de SSM Automation que corrige la desviación (por ejemplo, habilitar el cifrado por defecto) en cuanto se detecta, sin intervención humana. Un aviso nocturno no corrige, una política de bucket no aplica cifrado por defecto y prohibir crear buckets rompe la funcionalidad."
  },
  {
    id: "saa-465",
    dominio: 1,
    tema: "CloudTrail integridad y protección de logs",
    tipo: "multiple",
    enunciado: "Para una auditoría, la empresa debe demostrar que los registros de CloudTrail entregados a S3 no fueron modificados ni eliminados, y reforzar su protección. ¿Qué DOS medidas contribuyen a este objetivo? (Elegí dos)",
    opciones: [
      "Habilitar la validación de integridad de archivos de log de CloudTrail (digest firmados) para verificar criptográficamente que no se alteraron",
      "Aplicar S3 Object Lock o una política restrictiva en el bucket de destino para impedir el borrado de los logs",
      "Activar únicamente el cifrado del lado del servidor, que por sí solo demuestra que los logs no fueron manipulados",
      "Confiar en el Event history de CloudTrail, que conserva un registro inmutable e ilimitado en el tiempo",
      "Replicar los logs a otra región, lo que garantiza por sí mismo la integridad criptográfica"
    ],
    correctas: [0, 1],
    explicacion: "La validación de integridad de CloudTrail genera archivos digest firmados que permiten verificar criptográficamente que los logs no se alteraron ni eliminaron, y proteger el bucket con Object Lock o políticas restrictivas evita su borrado. El cifrado da confidencialidad, no prueba integridad; el Event history es limitado (90 días) y la replicación mejora la durabilidad pero no aporta prueba criptográfica."
  },
  {
    id: "saa-466",
    dominio: 1,
    tema: "CloudTrail organization trail",
    tipo: "single",
    enunciado: "Una organización con AWS Organizations quiere capturar la actividad de la API de TODAS sus cuentas, incluidas las que se creen en el futuro, en un único bucket central, sin configurar un trail por cuenta. ¿Qué solución cumple el requisito con el MENOR esfuerzo operativo?",
    opciones: [
      "Crear un organization trail de CloudTrail desde la cuenta de gestión que abarque todas las cuentas",
      "Crear manualmente un trail en cada cuenta y apuntarlos al mismo bucket",
      "Activar CloudTrail Event history en cada cuenta",
      "Configurar un trail solo en la cuenta de gestión"
    ],
    correctas: [0],
    explicacion: "Un organization trail se configura una vez desde la cuenta de gestión y registra automáticamente la actividad de todas las cuentas miembro, incluidas las nuevas, entregándola a un bucket central. Crear trails manualmente por cuenta no escala y omite las cuentas futuras, el Event history no entrega a S3 de forma persistente y un trail solo en gestión no cubre el resto de cuentas."
  },
  {
    id: "saa-467",
    dominio: 1,
    tema: "CloudTrail data events",
    tipo: "single",
    enunciado: "Seguridad necesita auditar las operaciones a nivel de objeto de S3 (como GetObject y PutObject) sobre un bucket sensible, algo que por defecto CloudTrail no registra. ¿Qué debe configurarse?",
    opciones: [
      "Habilitar data events de S3 en CloudTrail para ese bucket",
      "Confiar en los management events, que ya incluyen las operaciones de objeto",
      "Activar el logging de acceso al servidor solo en la consola de IAM",
      "Habilitar VPC Flow Logs en la VPC del bucket"
    ],
    correctas: [0],
    explicacion: "Por defecto CloudTrail registra management events, pero las operaciones a nivel de objeto de S3 son data events y deben habilitarse explícitamente (con costo adicional) para el bucket deseado. Los management events no incluyen GetObject/PutObject, el logging de acceso de IAM no aplica a S3 y los VPC Flow Logs capturan metadatos de red, no llamadas a la API de objetos."
  },
  {
    id: "saa-468",
    dominio: 1,
    tema: "SSM Session Manager",
    tipo: "single",
    enunciado: "La empresa quiere eliminar los hosts bastión y dejar de abrir el puerto 22 a Internet, pero los operadores aún necesitan acceso shell a instancias EC2 en subredes privadas, con registro de la sesión para auditoría. ¿Qué solución cumple el requisito de la forma MÁS segura?",
    opciones: [
      "Usar AWS Systems Manager Session Manager, sin puertos de entrada abiertos y con logging de sesiones",
      "Mantener un host bastión con la clave SSH compartida entre los operadores",
      "Abrir el puerto 22 solo al rango de IP de la oficina mediante un security group",
      "Asignar IP públicas a las instancias y restringir SSH con una NACL"
    ],
    correctas: [0],
    explicacion: "Session Manager (a través del SSM Agent y endpoints) da acceso shell sin abrir puertos de entrada, sin bastión y sin gestionar claves SSH, controlando el acceso con IAM y registrando las sesiones en CloudWatch Logs o S3 para auditoría. Las demás opciones siguen exponiendo el puerto 22 o requieren IP públicas y claves compartidas, aumentando la superficie de ataque."
  },
  {
    id: "saa-469",
    dominio: 1,
    tema: "Secrets Manager rotación",
    tipo: "single",
    enunciado: "Una aplicación se conecta a una base de datos RDS con credenciales que, por política, deben rotarse cada 30 días sin downtime y sin almacenar la contraseña en el código. ¿Qué solución cumple el requisito con el MENOR esfuerzo operativo?",
    opciones: [
      "Almacenar las credenciales en AWS Secrets Manager con rotación automática mediante una Lambda integrada para RDS",
      "Guardar la contraseña en SSM Parameter Store estándar y rotarla manualmente cada mes",
      "Incrustar la contraseña como variable de entorno y redeplegar al cambiarla",
      "Cifrar la contraseña con KMS y leerla desde un archivo en cada arranque"
    ],
    correctas: [0],
    explicacion: "Secrets Manager almacena las credenciales cifradas y ofrece rotación automática programada con funciones Lambda integradas para RDS, actualizando la contraseña en la base de datos y en el secreto sin downtime ni intervención manual. Parameter Store estándar no rota por sí solo, las variables de entorno exigen redeploys y un archivo cifrado a mano no automatiza la rotación."
  },
  {
    id: "saa-470",
    dominio: 1,
    tema: "Amazon Cognito",
    tipo: "multiple",
    enunciado: "Una aplicación móvil debe autenticar a millones de usuarios con registro, login y federación social (Google, Apple) y luego otorgarles credenciales temporales de AWS para subir archivos a S3. ¿Qué DOS afirmaciones sobre Cognito son correctas para este diseño? (Elegí dos)",
    opciones: [
      "Un Cognito User Pool gestiona el directorio de usuarios, el registro, el login y la federación social",
      "Un Cognito Identity Pool intercambia los tokens de identidad por credenciales temporales de AWS para acceder a S3",
      "Un User Pool por sí solo entrega credenciales temporales de AWS para acceder directamente a servicios como S3",
      "La forma correcta de escalar es crear un usuario IAM por cada usuario final de la aplicación",
      "Un Identity Pool por sí solo gestiona el registro, el inicio de sesión y el directorio de usuarios"
    ],
    correctas: [0, 1],
    explicacion: "El User Pool gestiona el directorio, el registro, el login y la federación social, y el Identity Pool (federated identities) intercambia los tokens por credenciales temporales de AWS para acceder a S3; se complementan. Un User Pool solo no da credenciales de AWS, un Identity Pool solo no gestiona el directorio de usuarios y crear un usuario IAM por persona no escala a millones."
  },
  {
    id: "saa-471",
    dominio: 1,
    tema: "Organizations SCP",
    tipo: "single",
    enunciado: "La organización debe impedir que cualquier cuenta despliegue recursos fuera de las regiones eu-west-1 y eu-central-1, salvo para servicios globales, y de forma que ningún administrador local pueda saltárselo. ¿Qué solución cumple el requisito de la forma MÁS segura?",
    opciones: [
      "Una SCP que deniegue las acciones cuyo 'aws:RequestedRegion' no esté en la lista permitida, excluyendo los servicios globales",
      "Una política de IAM en cada cuenta que limite las regiones permitidas",
      "Una regla de AWS Config que marque los recursos fuera de región",
      "Un límite de permisos (permissions boundary) en cada rol administrativo"
    ],
    correctas: [0],
    explicacion: "Una SCP con un Deny basado en la condición 'aws:RequestedRegion' (con NotAction para los servicios globales) restringe las regiones para todas las cuentas de la OU y ni siquiera la raíz de la cuenta puede saltársela, lo que la hace muy robusta. Las políticas de IAM y los permissions boundaries pueden ser modificados por administradores locales, y Config solo detecta a posteriori, no previene."
  },
  {
    id: "saa-472",
    dominio: 1,
    tema: "AWS RAM",
    tipo: "single",
    enunciado: "Una empresa con varias cuentas quiere que todas compartan las mismas subredes de una VPC central administrada por el equipo de redes, evitando duplicar VPCs y peering. ¿Qué servicio permite compartir esas subredes de forma nativa y segura?",
    opciones: [
      "AWS Resource Access Manager (RAM) para compartir las subredes con las cuentas de la organización",
      "VPC peering entre la VPC central y una VPC por cada cuenta",
      "Una política de IAM entre cuentas que conceda acceso a las subredes",
      "AWS Transit Gateway con una tabla de rutas por cuenta"
    ],
    correctas: [0],
    explicacion: "AWS RAM permite compartir recursos como las subredes de una VPC (shared VPC) con otras cuentas de la organización, de modo que despliegan recursos en una VPC central sin duplicarla ni hacer peering. El peering conecta VPCs separadas pero no comparte subredes, una política de IAM no comparte subredes y Transit Gateway interconecta redes pero no implementa la VPC compartida."
  },
  {
    id: "saa-473",
    dominio: 1,
    tema: "DynamoDB cifrado",
    tipo: "single",
    enunciado: "Un equipo de seguridad pregunta cómo asegurar que las tablas de DynamoDB que contienen datos sensibles estén cifradas en reposo con una clave que la empresa pueda auditar y deshabilitar si es necesario. ¿Qué opción cumple el requisito?",
    opciones: [
      "Configurar el cifrado en reposo de DynamoDB con una KMS key gestionada por el cliente (CMK)",
      "Dejar el cifrado por defecto, ya que DynamoDB no permite controlar la clave",
      "Cifrar manualmente cada atributo en la aplicación antes de escribir",
      "Habilitar el cifrado solo en los índices secundarios globales"
    ],
    correctas: [0],
    explicacion: "DynamoDB cifra siempre en reposo, pero al elegir una KMS key gestionada por el cliente la empresa puede auditar su uso en CloudTrail y deshabilitarla para revocar el acceso a los datos. El cifrado por defecto usa una key gestionada por AWS sin ese control. El cifrado de atributos en la aplicación añade complejidad innecesaria y cifrar solo índices deja la tabla base fuera del control de la clave."
  },
  {
    id: "saa-474",
    dominio: 1,
    tema: "Detección y respuesta a incidentes",
    tipo: "single",
    enunciado: "Tras detectar una posible vulneración, el equipo necesita reconstruir qué llamadas a la API se realizaron, desde qué identidades y direcciones IP, en las últimas semanas para el análisis forense. ¿Qué fuente de datos es la MÁS adecuada?",
    opciones: [
      "Los registros de CloudTrail entregados a S3, consultados con Athena",
      "Los VPC Flow Logs de la VPC afectada",
      "Las métricas de CloudWatch de las instancias EC2",
      "Los hallazgos actuales del panel de GuardDuty únicamente"
    ],
    correctas: [0],
    explicacion: "CloudTrail registra el quién, qué, cuándo y desde dónde de las llamadas a la API; entregado a S3 y consultado con Athena permite reconstruir la actividad histórica para el forense. Los VPC Flow Logs muestran tráfico de red, no llamadas a la API ni identidades; las métricas de CloudWatch no detallan acciones, y los hallazgos de GuardDuty resumen amenazas pero no son el registro completo de la API."
  },
  {
    id: "saa-475",
    dominio: 1,
    tema: "KMS cifrado de sobre (envelope)",
    tipo: "single",
    enunciado: "Una aplicación cifra millones de objetos grandes con KMS y empieza a chocar con los límites de tasa de la API de KMS porque llama a Encrypt/Decrypt por cada objeto. ¿Qué patrón resuelve el problema reduciendo las llamadas a KMS?",
    opciones: [
      "Usar cifrado de sobre: generar una data key con GenerateDataKey, cifrar los datos localmente y reutilizar la data key cacheada",
      "Llamar a KMS Encrypt directamente sobre cada objeto, aumentando el límite de cuota",
      "Cifrar los datos con la clave pública de una KMS key asimétrica en cada objeto",
      "Mover todas las claves a CloudHSM para eliminar los límites"
    ],
    correctas: [0],
    explicacion: "El cifrado de sobre genera una data key con GenerateDataKey y cifra los datos localmente con esa clave; cacheando y reutilizando la data key se reducen drásticamente las llamadas a KMS, evitando los límites de tasa. Llamar a Encrypt por objeto mantiene el problema, las keys asimétricas no son eficientes para datos grandes y migrar a CloudHSM no es necesario para este patrón."
  },
  {
    id: "saa-476",
    dominio: 1,
    tema: "Confused deputy / SourceArn",
    tipo: "single",
    enunciado: "Una cuenta de terceros asume un rol en la cuenta de la empresa para entregar logs. Seguridad quiere evitar el problema del 'confused deputy', garantizando que el rol solo se asuma en nombre del recurso correcto del tercero. ¿Qué control es el MÁS adecuado en la trust policy del rol?",
    opciones: [
      "Añadir una condición con 'sts:ExternalId' (o 'aws:SourceArn'/'aws:SourceAccount') que valide el identificador del tercero",
      "Permitir que cualquier principal de la cuenta del tercero asuma el rol sin condiciones",
      "Conceder al rol permisos de administrador para simplificar la integración",
      "Sustituir el rol por una clave de acceso compartida con el tercero"
    ],
    correctas: [0],
    explicacion: "Para mitigar el confused deputy en accesos entre cuentas, la trust policy debe exigir una condición como 'sts:ExternalId' acordado o 'aws:SourceArn'/'aws:SourceAccount', de modo que el rol solo se asuma para el recurso/identificador esperado. Confiar en toda la cuenta sin condición, dar admin o usar claves compartidas amplía el riesgo en lugar de reducirlo."
  },
  {
    id: "saa-477",
    dominio: 1,
    tema: "Cifrado en tránsito S3",
    tipo: "single",
    enunciado: "Cumplimiento exige que ningún objeto de un bucket de S3 pueda subirse o leerse a través de conexiones no cifradas (HTTP). ¿Qué control aplica esta exigencia de la forma MÁS efectiva?",
    opciones: [
      "Una política de bucket que deniegue las acciones cuando 'aws:SecureTransport' sea false",
      "Activar el cifrado del lado del servidor por defecto en el bucket",
      "Habilitar S3 Block Public Access en el bucket",
      "Configurar el versionado y MFA delete en el bucket"
    ],
    correctas: [0],
    explicacion: "Una política de bucket con un Deny condicionado a 'aws:SecureTransport': false rechaza cualquier petición que no use TLS, forzando HTTPS para subir y leer objetos. El cifrado del lado del servidor protege en reposo, no en tránsito; Block Public Access controla la exposición pública, y el versionado con MFA delete protege contra borrados, ninguno fuerza TLS."
  },
  {
    id: "saa-478",
    dominio: 1,
    tema: "IAM evaluación cross-account",
    tipo: "multiple",
    enunciado: "La cuenta A debe acceder a un bucket de S3 de la cuenta B. ¿Qué DOS condiciones deben cumplirse para que el principal de la cuenta A pueda leer los objetos? (Elegí dos)",
    opciones: [
      "La política de identidad del principal en la cuenta A debe permitir 's3:GetObject' sobre el recurso",
      "La política de bucket en la cuenta B debe permitir el acceso al principal de la cuenta A",
      "Basta con que la política de bucket de la cuenta B permita el acceso, sin permiso en la cuenta A",
      "Basta con que la política de identidad de la cuenta A lo permita, sin tocar la cuenta B",
      "El principal de la cuenta A debe estar definido como usuario IAM dentro de la cuenta B"
    ],
    correctas: [0, 1],
    explicacion: "En el acceso entre cuentas a S3 se requiere permiso en AMBOS lados: la política de identidad del principal en la cuenta A debe permitir la acción Y la política basada en recursos (bucket policy) de la cuenta B debe permitir a ese principal. Por eso ninguna de las dos por sí sola basta. No es necesario (ni posible) que el principal de A sea un usuario IAM dentro de B."
  },
  {
    id: "saa-479",
    dominio: 1,
    tema: "Cifrado EBS",
    tipo: "multiple",
    enunciado: "Una empresa quiere garantizar el cifrado en reposo de los volúmenes de EBS en toda una región. ¿Qué DOS afirmaciones sobre el cifrado de EBS son correctas? (Elegí dos)",
    opciones: [
      "Se puede habilitar el cifrado por defecto de EBS por región para que todos los volúmenes nuevos se cifren automáticamente",
      "Los snapshots creados a partir de un volumen cifrado quedan cifrados, y los volúmenes restaurados desde ellos también",
      "Un volumen EBS sin cifrar puede convertirse a cifrado modificando el volumen en caliente sin copiarlo",
      "El cifrado de EBS reduce de forma notable el rendimiento de E/S del volumen",
      "Solo los volúmenes raíz pueden cifrarse; los volúmenes de datos no admiten cifrado"
    ],
    correctas: [0, 1],
    explicacion: "Se puede activar el cifrado por defecto de EBS a nivel de región para que todos los volúmenes nuevos se cifren con una KMS key, y los snapshots de un volumen cifrado (y los volúmenes restaurados de ellos) heredan el cifrado. No existe conversión in situ de un volumen sin cifrar (se copia vía snapshot), el impacto en rendimiento es mínimo y tanto volúmenes raíz como de datos pueden cifrarse."
  },
  {
    id: "saa-480",
    dominio: 1,
    tema: "Permissions boundaries y delegación",
    tipo: "multiple",
    enunciado: "Una empresa permite que los desarrolladores creen roles de IAM para sus aplicaciones, pero quiere asegurar que esos roles nunca puedan exceder un conjunto máximo de permisos definido por seguridad. ¿Qué DOS afirmaciones son correctas sobre los permissions boundaries? (Elegí dos)",
    opciones: [
      "Un permissions boundary define el máximo de permisos que una identidad puede tener; los permisos efectivos son la intersección de la política de permisos y el boundary",
      "Se puede exigir, mediante una condición en la política del creador, que todo rol nuevo se cree con un permissions boundary determinado",
      "Un permissions boundary otorga por sí mismo los permisos a la identidad sin necesidad de una política de permisos",
      "Los permissions boundaries reemplazan a las SCP a nivel de organización",
      "Un permissions boundary se aplica automáticamente a todas las cuentas de la organización"
    ],
    correctas: [0, 1],
    explicacion: "Un permissions boundary fija el techo de permisos de una identidad: los permisos efectivos son la intersección entre la política de permisos y el boundary, por lo que no concede permisos por sí solo (hace falta también una política de permisos). Mediante condiciones (como 'iam:PermissionsBoundary') se puede obligar a que los roles creados por delegación lleven un boundary concreto. No reemplazan a las SCP ni se propagan solos a toda la organización."
  }
]);
