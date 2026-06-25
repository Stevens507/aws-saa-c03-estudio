window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-281",
    dominio: 1,
    tema: "KMS",
    tipo: "single",
    enunciado: "Una empresa cifra objetos en un bucket S3 con una customer managed key de KMS. Un equipo de otra cuenta AWS debe poder leer y descifrar esos objetos. Los administradores ya otorgaron acceso al bucket mediante una bucket policy. Sin embargo, el equipo externo recibe errores de Access Denied al descargar objetos. ¿Qué cambio resuelve el problema con el menor esfuerzo operativo?",
    opciones: [
      "Migrar el bucket a SSE-S3 para evitar la dependencia de permisos de KMS",
      "Agregar a la key policy de la KMS un permiso para que el principal de la cuenta externa pueda usar kms:Decrypt sobre esa clave",
      "Copiar la clave KMS a la cuenta externa usando kms:ReplicateKey",
      "Crear un rol en la cuenta de origen y compartir las credenciales de acceso de larga duración con el equipo externo"
    ],
    correctas: [1],
    explicacion: "El acceso a objetos cifrados con SSE-KMS requiere permisos tanto sobre S3 como sobre la KMS. La key policy debe permitir kms:Decrypt al principal externo (o delegar vía IAM en esa cuenta). SSE-S3 perdería el control granular; las claves KMS no se 'copian' entre cuentas; compartir credenciales de larga duración es una mala práctica de seguridad."
  },
  {
    id: "saa-282",
    dominio: 1,
    tema: "KMS",
    tipo: "single",
    enunciado: "Un servicio de procesamiento genera millones de archivos pequenos por hora y cada uno debe cifrarse de forma independiente. El equipo quiere minimizar las llamadas a la API de KMS para reducir throttling y costos, manteniendo el cifrado fuerte. ¿Qué tecnica aplica AWS para lograrlo?",
    opciones: [
      "Envelope encryption: KMS genera una data key, se usa localmente para cifrar muchos datos y solo la data key se cifra con la CMK",
      "Cifrar cada archivo llamando directamente a kms:Encrypt con los datos completos",
      "Usar SSE-C para que el cliente provea la clave en cada peticion",
      "Almacenar la clave maestra en texto plano en la aplicacion para cifrar localmente"
    ],
    correctas: [0],
    explicacion: "El envelope encryption usa GenerateDataKey: KMS devuelve una data key en texto plano (para cifrar localmente muchos objetos) y su version cifrada (para almacenar). Esto evita enviar grandes volumenes a KMS y reduce llamadas. kms:Encrypt directo limita a 4KB y multiplica llamadas; almacenar claves maestras en texto plano es inseguro."
  },
  {
    id: "saa-283",
    dominio: 1,
    tema: "KMS",
    tipo: "single",
    enunciado: "Una aplicacion global necesita cifrar datos en us-east-1 y descifrarlos en eu-west-1 sin volver a cifrar ni transferir el material de clave a traves de una sola region. ¿Que caracteristica de KMS cumple este requisito?",
    opciones: [
      "Una alias de KMS compartida entre regiones",
      "KMS multi-Region keys, que replican el material criptografico a otras regiones manteniendo el mismo key ID",
      "Una unica CMK regional con replicacion S3 cross-region",
      "Exportar la clave en texto plano y volver a importarla en la otra region"
    ],
    correctas: [1],
    explicacion: "Las multi-Region keys de KMS son replicas con el mismo material de clave e ID relacionado, permitiendo cifrar en una region y descifrar en otra sin re-cifrado. Los alias no comparten material; KMS no permite exportar claves en texto plano; la replicacion S3 no resuelve el descifrado interregional del ciphertext."
  },
  {
    id: "saa-284",
    dominio: 1,
    tema: "KMS",
    tipo: "multiple",
    enunciado: "Un arquitecto debe permitir que una aplicacion de terceros (sin acceso a la consola IAM de la cuenta) use una CMK de KMS de forma temporal y acotada a operaciones especificas. ¿Cuales son DOS afirmaciones correctas sobre KMS grants frente a key policies en este caso?",
    opciones: [
      "Un grant permite delegar permisos de uso de la clave de forma programatica y temporal a un principal especifico",
      "Los grants soportan condiciones de encryption context para acotar el uso de la clave",
      "Un grant reemplaza por completo la necesidad de una key policy en la CMK",
      "Los grants solo pueden otorgarse manualmente desde la consola y no via API",
      "Un grant otorga permisos administrativos completos sobre la cuenta AWS"
    ],
    correctas: [0, 1],
    explicacion: "Los grants de KMS delegan permisos de uso de forma programatica, temporal y granular, y admiten constraints como encryption context. No reemplazan la key policy (que sigue gobernando el acceso); se crean via API (CreateGrant), no solo por consola; y nunca otorgan permisos administrativos de la cuenta."
  },
  {
    id: "saa-285",
    dominio: 1,
    tema: "S3 Encryption",
    tipo: "single",
    enunciado: "Una empresa de salud debe cifrar objetos en S3 pero por requisitos regulatorios el material de clave NO puede residir ni gestionarse en AWS; el cliente debe proveer la clave en cada operacion de subida y descarga. ¿Que opcion de cifrado de S3 satisface esto?",
    opciones: [
      "SSE-S3 (claves gestionadas por S3)",
      "SSE-KMS con una customer managed key",
      "SSE-C (Server-Side Encryption con claves provistas por el cliente)",
      "Cifrado del bucket con AWS Backup"
    ],
    correctas: [2],
    explicacion: "SSE-C permite que el cliente provea su propia clave en cada PUT/GET; AWS realiza el cifrado pero no almacena la clave. SSE-S3 y SSE-KMS gestionan el material dentro de AWS, lo que viola el requisito de que la clave no resida en AWS. AWS Backup no es un mecanismo de cifrado de objetos por clave de cliente."
  },
  {
    id: "saa-286",
    dominio: 1,
    tema: "S3 Encryption",
    tipo: "single",
    enunciado: "Un equipo necesita auditar exactamente quien descifro cada objeto de un bucket S3 y poder revocar permisos de descifrado de forma centralizada sin rotar manualmente claves en cada aplicacion. ¿Que metodo de cifrado de S3 es el mas adecuado?",
    opciones: [
      "SSE-C, porque el cliente controla la clave",
      "SSE-S3, porque es totalmente transparente",
      "SSE-KMS, porque integra con CloudTrail y permite control de acceso via key policy e IAM",
      "Sin cifrado, usando solo bucket policies"
    ],
    correctas: [2],
    explicacion: "SSE-KMS registra cada operacion de KMS en CloudTrail (auditoria de quien descifro) y permite revocar acceso modificando la key policy o las politicas IAM de forma central. SSE-S3 no ofrece auditoria por usuario de KMS; SSE-C no genera trazas de KMS; no cifrar no cumple el requisito."
  },
  {
    id: "saa-287",
    dominio: 1,
    tema: "S3 Security",
    tipo: "single",
    enunciado: "Una organizacion expone datos en S3 a multiples aplicaciones y cuentas, cada una con distintos requisitos de red y permisos. Quieren simplificar la gestion creando endpoints con nombres y politicas dedicadas por aplicacion, en lugar de una unica bucket policy gigante. ¿Que funcion de S3 recomienda?",
    opciones: [
      "S3 Access Points, cada uno con su propia politica de acceso y configuracion de red",
      "Una bucket policy con multiples Sid muy extensa",
      "Cross-Region Replication a buckets separados por aplicacion",
      "S3 Transfer Acceleration por aplicacion"
    ],
    correctas: [0],
    explicacion: "Los S3 Access Points permiten crear puntos de acceso nombrados con politicas independientes y restricciones de red (por ejemplo, VPC) por aplicacion, evitando bucket policies monoliticas. La replicacion duplica datos innecesariamente; Transfer Acceleration optimiza velocidad, no control de acceso."
  },
  {
    id: "saa-288",
    dominio: 1,
    tema: "IAM Policies",
    tipo: "single",
    enunciado: "Una empresa quiere permitir que sus desarrolladores asuman roles, pero impedir que cualquier rol o usuario obtenga mas permisos de los que una linea base define, incluso si un administrador les adjunta politicas amplias. ¿Que mecanismo limita el maximo de permisos efectivos de una identidad IAM?",
    opciones: [
      "Una Service Control Policy aplicada a la cuenta raiz",
      "Un permission boundary adjunto a las identidades IAM",
      "Una resource-based policy en cada recurso",
      "Una session policy pasada en cada llamada de AssumeRole"
    ],
    correctas: [1],
    explicacion: "Un permission boundary define el maximo de permisos que una identidad IAM (usuario o rol) puede tener; aunque se le adjunten politicas amplias, los permisos efectivos son la interseccion. Las SCP actuan a nivel de cuenta/OU, no por identidad individual; las session policies solo aplican a una sesion; las resource-based policies controlan el recurso, no el techo de la identidad."
  },
  {
    id: "saa-289",
    dominio: 1,
    tema: "Organizations SCP",
    tipo: "single",
    enunciado: "Una organizacion con AWS Organizations quiere garantizar que NINGUNA cuenta miembro pueda desactivar CloudTrail ni eliminar trails, sin importar los permisos IAM locales de cada cuenta. ¿Cual es la solucion correcta?",
    opciones: [
      "Adjuntar una IAM policy de denegacion al usuario root de cada cuenta",
      "Aplicar una Service Control Policy que deniegue las acciones cloudtrail:StopLogging y cloudtrail:DeleteTrail en la OU",
      "Configurar un permission boundary global en la cuenta de gestion",
      "Habilitar MFA obligatorio en todas las cuentas"
    ],
    correctas: [1],
    explicacion: "Una SCP que deniega cloudtrail:StopLogging y cloudtrail:DeleteTrail aplica como techo a todas las identidades de las cuentas en la OU, incluido el root, sin que los permisos IAM locales puedan contradecirla. Las IAM policies locales no limitan a otras cuentas; los permission boundaries son por identidad; MFA no impide detener el trail."
  },
  {
    id: "saa-290",
    dominio: 1,
    tema: "IAM Conditions",
    tipo: "single",
    enunciado: "Un arquitecto debe permitir el acceso a una API solo cuando las peticiones provienen del rango de IPs publicas de la oficina corporativa. ¿Que clave de condicion IAM debe usar en la politica?",
    opciones: [
      "aws:SourceVpc",
      "aws:SourceIp con el rango CIDR de la oficina",
      "aws:PrincipalOrgID",
      "aws:userid"
    ],
    correctas: [1],
    explicacion: "aws:SourceIp evalua la IP publica de origen de la peticion y permite restringir por CIDR. aws:SourceVpc se usa para trafico que entra por un VPC endpoint (IP privada), no por IP publica de oficina; aws:PrincipalOrgID filtra por organizacion; aws:userid identifica al principal, no la red."
  },
  {
    id: "saa-291",
    dominio: 1,
    tema: "IAM Conditions",
    tipo: "single",
    enunciado: "Una empresa comparte un bucket S3 con varias cuentas de su organizacion AWS y quiere asegurarse de que solo principales que pertenezcan a su organizacion puedan acceder, sin tener que enumerar cada Account ID manualmente. ¿Que condicion en la bucket policy logra esto?",
    opciones: [
      "aws:SourceIp con el CIDR de la VPC",
      "aws:PrincipalOrgID igual al ID de la organizacion",
      "aws:MultiFactorAuthPresent igual a true",
      "s3:x-amz-server-side-encryption igual a aws:kms"
    ],
    correctas: [1],
    explicacion: "aws:PrincipalOrgID restringe el acceso a principales que pertenecen a la organizacion AWS indicada, evitando mantener listas de Account IDs. aws:SourceIp filtra por red; aws:MultiFactorAuthPresent exige MFA pero no restringe por organizacion; la condicion de SSE controla cifrado, no membresia."
  },
  {
    id: "saa-292",
    dominio: 1,
    tema: "IAM Conditions",
    tipo: "single",
    enunciado: "Una politica IAM debe permitir eliminar objetos de un bucket sensible solo si el usuario se autentico con MFA. ¿Que condicion debe incluirse para forzar este requisito?",
    opciones: [
      "Condicion Bool aws:MultiFactorAuthPresent igual a true",
      "Condicion StringEquals aws:username con MFA",
      "Condicion DateGreaterThan aws:CurrentTime",
      "Condicion IpAddress aws:SourceIp restringida"
    ],
    correctas: [0],
    explicacion: "La clave aws:MultiFactorAuthPresent (Bool true) confirma que la sesion se autentico con MFA, condicion habitual para operaciones sensibles como eliminar objetos. aws:username no refleja MFA; aws:CurrentTime es temporal; aws:SourceIp filtra red, no la presencia de MFA."
  },
  {
    id: "saa-293",
    dominio: 1,
    tema: "IAM Identity Center",
    tipo: "single",
    enunciado: "Una empresa con docenas de cuentas en AWS Organizations quiere que sus empleados inicien sesion con su proveedor de identidad corporativo (SAML/Active Directory) y obtengan acceso federado y temporal a multiples cuentas, sin crear usuarios IAM en cada una. ¿Que servicio recomienda?",
    opciones: [
      "AWS IAM Identity Center (sucesor de AWS SSO) integrado con el IdP corporativo",
      "Amazon Cognito user pools en cada cuenta",
      "Usuarios IAM con claves de acceso replicadas en cada cuenta",
      "AWS Directory Service Simple AD en cada VPC"
    ],
    correctas: [0],
    explicacion: "IAM Identity Center centraliza el acceso federado y temporal a multiples cuentas de la organizacion mediante permission sets, integrando IdP externos via SAML. Cognito es para usuarios de aplicaciones, no acceso administrativo multi-cuenta; usuarios IAM con claves estaticas no escalan ni son temporales; Simple AD no provee federacion multi-cuenta por si solo."
  },
  {
    id: "saa-294",
    dominio: 1,
    tema: "Cognito",
    tipo: "single",
    enunciado: "Una aplicacion movil necesita registrar y autenticar usuarios finales (sign-up, sign-in, recuperacion de contrasena) y luego permitirles subir fotos a un bucket S3 con credenciales AWS temporales. ¿Que combinacion de Cognito es correcta?",
    opciones: [
      "User pool para autenticacion y un identity pool para obtener credenciales AWS temporales hacia S3",
      "Solo un identity pool, que ya gestiona el registro de usuarios",
      "Solo un user pool, que entrega credenciales IAM directamente",
      "Un user pool para credenciales AWS y un identity pool para sign-up"
    ],
    correctas: [0],
    explicacion: "El user pool gestiona el directorio de usuarios y la autenticacion (sign-up/sign-in); el identity pool (federated identities) intercambia el token por credenciales AWS temporales para acceder a S3. El identity pool no gestiona registro de usuarios; el user pool no entrega credenciales IAM directamente; los roles estan invertidos en la ultima opcion."
  },
  {
    id: "saa-295",
    dominio: 1,
    tema: "WAF",
    tipo: "single",
    enunciado: "Una API publica detras de Application Load Balancer sufre abuso: ciertas IPs envian miles de peticiones por minuto. La empresa quiere bloquear automaticamente a quien exceda un umbral de peticiones en una ventana de tiempo. ¿Que solucion aplica?",
    opciones: [
      "Una Security Group rule que limite las conexiones por IP",
      "Una rate-based rule en AWS WAF asociada al ALB",
      "Una Network ACL con reglas de denegacion por IP",
      "Shield Standard con limites de conexion personalizados"
    ],
    correctas: [1],
    explicacion: "Las rate-based rules de AWS WAF cuentan peticiones por IP en una ventana y bloquean automaticamente a quien supere el umbral, asociandose a ALB/CloudFront/API Gateway. Los Security Groups y NACL no cuentan tasa de peticiones HTTP; Shield Standard no ofrece rate limiting a nivel de aplicacion configurable."
  },
  {
    id: "saa-296",
    dominio: 1,
    tema: "WAF",
    tipo: "single",
    enunciado: "Un equipo quiere protegerse rapidamente contra vulnerabilidades web comunes (inyeccion SQL, XSS) sin escribir y mantener manualmente las firmas de ataque. ¿Que ofrece AWS WAF para cubrir esto con bajo esfuerzo?",
    opciones: [
      "AWS Managed Rules (grupos de reglas administradas por AWS, p. ej. Core Rule Set)",
      "Reglas de geo match para bloquear paises",
      "Una rate-based rule por IP",
      "Una regla personalizada con expresiones regulares escritas a mano"
    ],
    correctas: [0],
    explicacion: "Los AWS Managed Rules incluyen conjuntos como el Core Rule Set y reglas especificas (SQLi, XSS) mantenidos y actualizados por AWS, reduciendo el esfuerzo operativo. El geo match filtra por pais; la rate-based rule controla tasa, no patrones de ataque; las regex manuales requieren mantenimiento continuo."
  },
  {
    id: "saa-297",
    dominio: 1,
    tema: "WAF",
    tipo: "single",
    enunciado: "Por regulaciones de licencia, una empresa debe impedir que usuarios ubicados fuera de un conjunto de paises accedan a su sitio servido por CloudFront. ¿Que regla de AWS WAF cumple este requisito?",
    opciones: [
      "Una IP set rule con todos los rangos del mundo permitido",
      "Una geo match rule que permita solo los paises autorizados",
      "Una rate-based rule por region",
      "Una managed rule de reputacion de IP"
    ],
    correctas: [1],
    explicacion: "La geo match rule de WAF filtra por pais de origen segun geolocalizacion de IP, ideal para restricciones regulatorias por geografia. Mantener todos los rangos IP del mundo permitido es inviable; las rate-based rules controlan tasa; la reputacion de IP no filtra por pais especifico."
  },
  {
    id: "saa-298",
    dominio: 1,
    tema: "Shield",
    tipo: "single",
    enunciado: "Una aplicacion critica de comercio electronico necesita proteccion avanzada contra ataques DDoS de gran escala, soporte 24x7 del DDoS Response Team y proteccion ante costos por escalado durante un ataque. ¿Que servicio contrata?",
    opciones: [
      "AWS Shield Standard, incluido sin costo",
      "AWS Shield Advanced",
      "AWS WAF en modo CAPTCHA",
      "Amazon GuardDuty con monitoreo de red"
    ],
    correctas: [1],
    explicacion: "Shield Advanced ofrece mitigacion DDoS avanzada, acceso al DDoS Response Team (DRT) y proteccion de costos (cost protection) ante picos por ataques. Shield Standard es basico y automatico pero sin DRT ni cost protection; WAF mitiga capa 7 pero no es un servicio DDoS gestionado; GuardDuty detecta amenazas pero no mitiga DDoS."
  },
  {
    id: "saa-299",
    dominio: 1,
    tema: "GuardDuty",
    tipo: "single",
    enunciado: "Una empresa quiere detectar de forma continua actividad maliciosa o no autorizada (instancias comunicandose con dominios de mineria de criptomonedas, accesos anomalos, exfiltracion) analizando logs de VPC Flow, DNS y CloudTrail, sin desplegar agentes. ¿Que servicio usa?",
    opciones: [
      "Amazon Macie",
      "Amazon GuardDuty",
      "AWS Config",
      "Amazon Inspector"
    ],
    correctas: [1],
    explicacion: "GuardDuty es un servicio de deteccion de amenazas que analiza VPC Flow Logs, DNS logs y eventos de CloudTrail mediante ML e inteligencia de amenazas, sin agentes. Macie clasifica datos sensibles en S3; Config evalua conformidad de configuracion; Inspector evalua vulnerabilidades de software y exposicion de red."
  },
  {
    id: "saa-300",
    dominio: 1,
    tema: "Macie",
    tipo: "single",
    enunciado: "Una organizacion debe descubrir automaticamente si hay datos personales sensibles (PII, numeros de tarjeta) almacenados sin proteccion en sus buckets S3 y recibir alertas. ¿Que servicio esta disenado para esto?",
    opciones: [
      "Amazon Macie",
      "Amazon GuardDuty",
      "AWS Security Hub",
      "Amazon Detective"
    ],
    correctas: [0],
    explicacion: "Amazon Macie usa machine learning y pattern matching para descubrir y clasificar datos sensibles (PII, PCI) en S3 y alertar sobre exposicion. GuardDuty detecta amenazas de actividad; Security Hub agrega hallazgos de seguridad; Detective investiga la causa raiz de incidentes, no clasifica datos sensibles."
  },
  {
    id: "saa-301",
    dominio: 1,
    tema: "Inspector",
    tipo: "single",
    enunciado: "Un equipo necesita evaluar continuamente vulnerabilidades de software (CVE) en sus instancias EC2 y en imagenes de contenedores almacenadas en ECR, con escaneo automatico cuando aparecen nuevas CVE. ¿Que servicio cumple este objetivo?",
    opciones: [
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Trusted Advisor",
      "AWS Config conformance packs"
    ],
    correctas: [0],
    explicacion: "Amazon Inspector escanea de forma continua y automatica vulnerabilidades de software (CVE) y exposicion de red en EC2, Lambda e imagenes de ECR. Macie clasifica datos sensibles; Trusted Advisor da recomendaciones generales; Config evalua conformidad de configuracion, no CVE de software."
  },
  {
    id: "saa-302",
    dominio: 1,
    tema: "Network Firewall",
    tipo: "single",
    enunciado: "Una empresa necesita inspeccion de trafico de red a nivel de VPC con filtrado de dominios salientes (egress), prevencion de intrusiones (IPS) y reglas con estado aplicadas a todo el trafico que cruza la VPC. ¿Que servicio es el adecuado?",
    opciones: [
      "Security Groups con reglas de salida",
      "Network ACLs en cada subred",
      "AWS Network Firewall",
      "AWS WAF asociado a la VPC"
    ],
    correctas: [2],
    explicacion: "AWS Network Firewall ofrece inspeccion stateful a nivel de VPC, filtrado de dominios/URL salientes e IPS para todo el trafico. Los Security Groups y NACL filtran por IP/puerto sin IPS ni filtrado de dominios; WAF protege aplicaciones HTTP, no todo el trafico de red de la VPC."
  },
  {
    id: "saa-303",
    dominio: 1,
    tema: "Security Groups vs NACL",
    tipo: "multiple",
    enunciado: "Un arquitecto compara Security Groups y Network ACLs para una subred. ¿Cuales DOS afirmaciones son correctas?",
    opciones: [
      "Los Security Groups son stateful: el trafico de respuesta se permite automaticamente",
      "Las Network ACLs son stateless: deben permitirse explicitamente las reglas de entrada y de salida",
      "Los Security Groups admiten reglas de denegacion explicita (deny)",
      "Las Network ACLs se aplican a instancias individuales, no a subredes",
      "Los Security Groups se evaluan por numero de regla de menor a mayor"
    ],
    correctas: [0, 1],
    explicacion: "Los Security Groups son stateful (la respuesta a trafico permitido se admite automaticamente) y solo tienen reglas allow. Las NACL son stateless (hay que permitir explicitamente entrada y salida) y se aplican a nivel de subred, evaluandose por numero de regla. Por eso las opciones 3, 4 y 5 son incorrectas."
  },
  {
    id: "saa-304",
    dominio: 1,
    tema: "PrivateLink",
    tipo: "single",
    enunciado: "Una empresa quiere que sus instancias EC2 en una VPC privada accedan a Amazon S3 sin pasar por Internet, sin NAT Gateway y restringiendo ademas a que buckets se puede acceder. ¿Que solucion combina conectividad privada y control de acceso?",
    opciones: [
      "Un Gateway VPC endpoint para S3 con una endpoint policy que limite los buckets permitidos",
      "Un NAT Gateway con rutas a S3",
      "Una Internet Gateway con bucket policy restrictiva",
      "Un peering de VPC hacia la VPC de S3"
    ],
    correctas: [0],
    explicacion: "El Gateway VPC endpoint para S3 provee acceso privado sin Internet ni NAT, y su endpoint policy puede restringir a que buckets se accede. El NAT Gateway aun usa Internet; la Internet Gateway expone el trafico a Internet; S3 no es una VPC para hacer peering."
  },
  {
    id: "saa-305",
    dominio: 1,
    tema: "PrivateLink",
    tipo: "single",
    enunciado: "Un proveedor SaaS quiere exponer su servicio a clientes en otras VPCs/cuentas de forma privada, sin exponer IPs publicas ni requerir peering, de modo que el trafico no salga a Internet. ¿Que tecnologia usa?",
    opciones: [
      "VPC peering con todas las cuentas cliente",
      "AWS PrivateLink mediante un endpoint service (Interface VPC endpoint)",
      "Transit Gateway compartido con Internet",
      "Un Application Load Balancer publico con WAF"
    ],
    correctas: [1],
    explicacion: "AWS PrivateLink permite publicar un endpoint service que los clientes consumen via Interface VPC endpoints, manteniendo el trafico privado sin peering ni IPs publicas, y escala a muchas cuentas. El peering masivo no escala y mezcla CIDRs; un ALB publico expone el servicio a Internet."
  },
  {
    id: "saa-306",
    dominio: 1,
    tema: "ACM",
    tipo: "single",
    enunciado: "Una empresa necesita habilitar HTTPS en un Application Load Balancer con certificados que se renueven automaticamente y sin costo adicional por el certificado. ¿Que servicio provee los certificados?",
    opciones: [
      "AWS Certificate Manager (ACM) con certificados publicos gestionados",
      "AWS Secrets Manager almacenando el certificado",
      "AWS KMS generando certificados X.509",
      "IAM server certificates importados manualmente cada ano"
    ],
    correctas: [0],
    explicacion: "ACM emite y renueva automaticamente certificados SSL/TLS publicos sin costo y se integra nativamente con ALB, CloudFront y API Gateway. Secrets Manager almacena secretos pero no emite certificados publicos gestionados; KMS gestiona claves, no certificados TLS; los IAM server certificates requieren rotacion manual."
  },
  {
    id: "saa-307",
    dominio: 1,
    tema: "Secrets Manager",
    tipo: "multiple",
    enunciado: "Una aplicacion accede a una base de datos RDS con credenciales que, por politica de seguridad, deben rotarse automaticamente cada 30 dias sin downtime ni cambios de codigo, y el acceso al secreto debe estar auditado. ¿Cuales DOS afirmaciones describen correctamente el uso de AWS Secrets Manager para esto?",
    opciones: [
      "Secrets Manager ofrece rotacion automatica nativa de credenciales para RDS mediante funciones Lambda gestionadas",
      "El acceso al secreto via la API de Secrets Manager queda registrado en CloudTrail para auditoria",
      "Secrets Manager almacena los secretos en texto plano sin cifrado para acelerar el acceso",
      "Variables de entorno cifradas en la instancia rotan automaticamente sin servicios adicionales",
      "AWS KMS por si solo almacena y rota la contrasena de la base de datos"
    ],
    correctas: [0, 1],
    explicacion: "Secrets Manager rota credenciales de RDS de forma nativa con Lambda gestionada y registra cada acceso a la API en CloudTrail. Cifra los secretos con KMS (no en texto plano); las variables de entorno no rotan solas; KMS gestiona claves pero no almacena ni rota contrasenas de bases de datos por si mismo."
  },
  {
    id: "saa-308",
    dominio: 1,
    tema: "Secrets Manager vs Parameter Store",
    tipo: "single",
    enunciado: "Un equipo necesita almacenar parametros de configuracion no sensibles y algunas cadenas cifradas, con el menor costo posible y sin necesidad de rotacion automatica. ¿Que servicio recomienda?",
    opciones: [
      "AWS Secrets Manager para todo, por su rotacion",
      "AWS Systems Manager Parameter Store, usando String y SecureString",
      "Almacenar los valores en un bucket S3 publico",
      "Hardcodear los valores en el codigo de la aplicacion"
    ],
    correctas: [1],
    explicacion: "Parameter Store almacena parametros String y SecureString (cifrados con KMS) sin costo por parametro estandar y sin necesidad de rotacion, ideal cuando no se requiere rotacion automatica. Secrets Manager tiene costo por secreto y su valor esta en la rotacion; un bucket publico expone datos; hardcodear secretos es inseguro."
  },
  {
    id: "saa-309",
    dominio: 1,
    tema: "CloudTrail",
    tipo: "single",
    enunciado: "Una organizacion con muchas cuentas quiere un registro de auditoria centralizado e inmutable de todas las llamadas a la API de AWS de todas las cuentas, configurado desde un unico lugar. ¿Que solucion aplica?",
    opciones: [
      "Un CloudTrail trail individual configurado por separado en cada cuenta",
      "Un organization trail de CloudTrail creado desde la cuenta de gestion",
      "VPC Flow Logs centralizados en S3",
      "AWS Config agregador multi-cuenta"
    ],
    correctas: [1],
    explicacion: "Un organization trail crea y aplica un trail en todas las cuentas de la organizacion desde la cuenta de gestion, centralizando los eventos de la API. Configurar trails uno por uno no es centralizado ni consistente; VPC Flow Logs registran trafico de red, no llamadas a la API; Config evalua configuracion, no registra todas las API calls."
  },
  {
    id: "saa-310",
    dominio: 1,
    tema: "CloudTrail",
    tipo: "single",
    enunciado: "Un auditor exige poder demostrar que los logs de CloudTrail no fueron modificados ni eliminados desde su entrega a S3. ¿Que caracteristica de CloudTrail provee esta garantia de integridad?",
    opciones: [
      "Habilitar S3 Transfer Acceleration en el bucket de logs",
      "Habilitar log file validation (integrity validation) de CloudTrail",
      "Activar versioning sin mas controles",
      "Cifrar los logs solo con SSE-S3"
    ],
    correctas: [1],
    explicacion: "La log file validation de CloudTrail genera archivos digest firmados que permiten verificar criptograficamente que los logs no fueron alterados ni borrados. Transfer Acceleration solo afecta velocidad; el versioning ayuda pero no prueba integridad criptografica; el cifrado protege confidencialidad, no integridad verificable de la cadena de logs."
  },
  {
    id: "saa-311",
    dominio: 1,
    tema: "AWS Config",
    tipo: "single",
    enunciado: "Una empresa debe asegurar que todos los buckets S3 tengan cifrado habilitado y, si alguno aparece sin cifrado, corregirlo automaticamente. ¿Que combinacion de AWS Config logra deteccion y correccion?",
    opciones: [
      "Una Config rule que evalue el cifrado y una accion de remediacion automatica con SSM Automation",
      "Una alarma de CloudWatch sobre el bucket",
      "Un Lambda programado que recorra todos los buckets cada hora",
      "Una SCP que impida crear buckets"
    ],
    correctas: [0],
    explicacion: "AWS Config evalua recursos con managed/custom rules (p. ej. s3-bucket-server-side-encryption-enabled) y puede disparar remediacion automatica via SSM Automation documents para corregir el recurso no conforme. Una alarma no remedia; un Lambda ad hoc reinventa lo que Config ofrece gestionado; una SCP que bloquea creacion es demasiado restrictiva y no corrige los existentes."
  },
  {
    id: "saa-312",
    dominio: 1,
    tema: "AWS Config",
    tipo: "single",
    enunciado: "Una organizacion quiere desplegar de una sola vez un conjunto coherente de reglas de conformidad (por ejemplo, para un estandar regulatorio) en muchas cuentas y regiones, gestionado como paquete. ¿Que funcion de AWS Config usa?",
    opciones: [
      "Config conformance packs",
      "Config aggregators de solo lectura",
      "Una unica Config rule replicada manualmente",
      "AWS Organizations tag policies"
    ],
    correctas: [0],
    explicacion: "Los conformance packs empaquetan un conjunto de Config rules y acciones de remediacion como una unidad desplegable en cuentas y regiones, ideal para estandares regulatorios. Los aggregators solo consolidan datos para visualizacion; replicar una regla manualmente no escala; las tag policies gobiernan etiquetas, no conformidad de configuracion."
  },
  {
    id: "saa-313",
    dominio: 1,
    tema: "Session Manager",
    tipo: "multiple",
    enunciado: "Una empresa quiere eliminar los bastion hosts y permitir acceso shell a instancias EC2 privadas sin abrir el puerto 22 ni gestionar llaves SSH, con registro de la sesion para auditoria. ¿Cuales DOS afirmaciones sobre AWS Systems Manager Session Manager son correctas?",
    opciones: [
      "Permite acceso shell a instancias privadas sin abrir puertos entrantes ni gestionar llaves SSH",
      "Puede registrar el historial completo de las sesiones en S3 o CloudWatch Logs para auditoria",
      "Requiere abrir el puerto 22 en el Security Group de la instancia",
      "Necesita asignar una IP publica a cada instancia para funcionar",
      "Solo funciona si las instancias estan en una subred publica con Internet Gateway"
    ],
    correctas: [0, 1],
    explicacion: "Session Manager da acceso shell a instancias (incluso privadas) sin abrir puertos entrantes ni gestionar llaves SSH, y puede enviar el log de las sesiones a S3/CloudWatch para auditoria. No requiere el puerto 22 abierto ni IP publica; funciona en subredes privadas usando el agente SSM y, de ser necesario, VPC endpoints, no exige Internet Gateway."
  },
  {
    id: "saa-314",
    dominio: 1,
    tema: "Security Hub",
    tipo: "single",
    enunciado: "Una organizacion usa GuardDuty, Inspector, Macie y varias cuentas, y necesita una vista unica y priorizada de hallazgos de seguridad, ademas de comprobaciones automaticas contra estandares como CIS y AWS Foundational Security Best Practices. ¿Que servicio centraliza esto?",
    opciones: [
      "Amazon Detective",
      "AWS Security Hub",
      "AWS Trusted Advisor",
      "Amazon CloudWatch"
    ],
    correctas: [1],
    explicacion: "Security Hub agrega y normaliza hallazgos de GuardDuty, Inspector, Macie y mas, y ejecuta comprobaciones contra estandares (CIS, AWS FSBP, PCI DSS) con una puntuacion de seguridad. Detective investiga causas raiz; Trusted Advisor da recomendaciones generales; CloudWatch monitorea metricas y logs, no centraliza hallazgos de seguridad."
  },
  {
    id: "saa-315",
    dominio: 1,
    tema: "KMS for EBS",
    tipo: "single",
    enunciado: "Por requisitos de cumplimiento, todos los volumenes EBS nuevos en una cuenta deben crearse cifrados, sin depender de que cada usuario marque la opcion manualmente. ¿Cual es la forma mas sencilla de garantizarlo?",
    opciones: [
      "Habilitar EBS encryption by default a nivel de cuenta y region",
      "Crear una Lambda que cifre volumenes existentes cada noche",
      "Aplicar una bucket policy de S3 al volumen",
      "Pedir a los usuarios que recuerden marcar la casilla de cifrado"
    ],
    correctas: [0],
    explicacion: "EBS encryption by default es una configuracion por cuenta y region que fuerza el cifrado de todos los volumenes nuevos con una KMS key, sin intervencion del usuario. Una Lambda nocturna no previene volumenes sin cifrar en el momento de creacion; las bucket policies no aplican a EBS; depender de la memoria de los usuarios no garantiza cumplimiento."
  },
  {
    id: "saa-316",
    dominio: 1,
    tema: "KMS for RDS",
    tipo: "single",
    enunciado: "Una base de datos RDS existente fue creada SIN cifrado y ahora debe cumplir un requisito que exige cifrado en reposo. ¿Cual es el enfoque correcto para cifrarla?",
    opciones: [
      "Activar el cifrado en la instancia existente desde la consola con un click",
      "Crear un snapshot, copiar el snapshot habilitando cifrado con una KMS key y restaurar una nueva instancia cifrada",
      "Adjuntar una KMS key a la instancia mediante una IAM policy",
      "Habilitar SSL/TLS en las conexiones, lo que cifra los datos en reposo"
    ],
    correctas: [1],
    explicacion: "No se puede activar el cifrado en reposo de una instancia RDS ya existente; el procedimiento es crear un snapshot, copiarlo activando el cifrado con una KMS key y restaurar una nueva instancia cifrada. Adjuntar una KMS via IAM no cifra los datos; SSL/TLS cifra datos en transito, no en reposo."
  },
  {
    id: "saa-317",
    dominio: 1,
    tema: "Data in Transit",
    tipo: "single",
    enunciado: "Una aplicacion financiera debe garantizar que TODO el trafico entre los clientes y el Application Load Balancer este cifrado en transito, rechazando conexiones HTTP sin cifrar. ¿Que configuracion lo asegura?",
    opciones: [
      "Un listener HTTPS en el ALB y una regla que redirija o rechace HTTP, usando un certificado de ACM",
      "Cifrado SSE-KMS en el bucket de destino",
      "Una Network ACL que permita solo el puerto 80",
      "Habilitar EBS encryption en las instancias backend"
    ],
    correctas: [0],
    explicacion: "Configurar un listener HTTPS con certificado de ACM y redirigir/rechazar HTTP garantiza cifrado en transito hacia el ALB. SSE-KMS cifra datos en reposo en S3; permitir solo el puerto 80 mantiene trafico sin cifrar; EBS encryption protege discos en reposo, no el transito cliente-ALB."
  },
  {
    id: "saa-318",
    dominio: 1,
    tema: "S3 Cross-Account",
    tipo: "multiple",
    enunciado: "Una cuenta A debe permitir que un rol de la cuenta B escriba objetos en un bucket de la cuenta A, y la cuenta A quiere ser propietaria de los objetos resultantes. ¿Cuales DOS acciones logran un acceso cross-account correcto y la propiedad de los objetos?",
    opciones: [
      "Agregar una bucket policy en la cuenta A que permita s3:PutObject al rol de la cuenta B",
      "Habilitar S3 Object Ownership con Bucket owner enforced para que la cuenta A sea propietaria de los objetos",
      "Compartir las claves de acceso del usuario root de la cuenta A con la cuenta B",
      "Crear un VPC peering entre ambas cuentas para que funcione el PutObject",
      "Deshabilitar por completo el cifrado del bucket"
    ],
    correctas: [0, 1],
    explicacion: "Se requiere una bucket policy en A que conceda s3:PutObject al principal de B, y configurar S3 Object Ownership (Bucket owner enforced) para que la cuenta A sea propietaria de los objetos subidos. Compartir claves root es una grave falla de seguridad; el PutObject no necesita VPC peering; deshabilitar el cifrado no tiene relacion con el acceso cross-account."
  },
  {
    id: "saa-319",
    dominio: 1,
    tema: "KMS Key Policy vs IAM",
    tipo: "single",
    enunciado: "Un administrador adjunto una IAM policy que permite kms:Decrypt a un rol, pero el rol sigue sin poder descifrar con una CMK especifica. La key policy de esa CMK no menciona al rol ni delega en IAM. ¿Cual es la causa raiz?",
    opciones: [
      "La key policy de la CMK debe permitir el acceso (directamente o habilitando la delegacion a politicas IAM); sin eso la IAM policy no basta",
      "Las IAM policies siempre prevalecen sobre las key policies",
      "kms:Decrypt no existe como accion valida",
      "El rol necesita una clave de acceso de larga duracion"
    ],
    correctas: [0],
    explicacion: "Para usar una CMK, la key policy debe otorgar el acceso o habilitar la delegacion a IAM (sentencia que permite a la cuenta usar IAM policies). Si la key policy no lo hace, una IAM policy por si sola no concede acceso. Las IAM policies no prevalecen sobre las key policies; kms:Decrypt es valida; no se requieren claves de larga duracion."
  },
  {
    id: "saa-320",
    dominio: 1,
    tema: "VPC Endpoint Policy",
    tipo: "single",
    enunciado: "Una empresa usa un Gateway VPC endpoint para S3 y quiere asegurarse de que, a traves de ese endpoint, solo se pueda acceder a un conjunto especifico de buckets corporativos y se bloquee cualquier otro bucket. ¿Que mecanismo aplica este control en el propio endpoint?",
    opciones: [
      "Una endpoint policy en el VPC endpoint que restrinja los recursos a los ARNs de los buckets permitidos",
      "Una Network ACL que filtre por nombre de bucket",
      "Una Security Group con reglas por nombre de bucket",
      "Una bucket policy en un bucket de otra cuenta"
    ],
    correctas: [0],
    explicacion: "La endpoint policy del Gateway VPC endpoint controla a que recursos (ARNs de buckets) se puede acceder a traves del endpoint, bloqueando los no listados. Las NACL y Security Groups filtran por IP/puerto, no por nombre de bucket; una bucket policy en otra cuenta no controla el comportamiento del endpoint de esta empresa."
  }
]);
