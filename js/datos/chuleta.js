/* Chuleta de decisiones más preguntadas en el SAA-C03.
   Formato: { titulo, items:[...] }. Se permite **negrita** en los items. */
window.CHULETA = [
  {
    titulo: "S3 · clases de almacenamiento (elegir por acceso y costo)",
    items: [
      "Acceso frecuente y caliente → **S3 Standard**.",
      "Patrón de acceso desconocido o cambiante → **S3 Intelligent-Tiering** (mueve solo, sin cargos de recuperación).",
      "Poco frecuente pero acceso inmediato cuando se necesita → **S3 Standard-IA** (1 AZ tolera pérdida → **One Zone-IA**, más barato).",
      "Archivado con recuperación en minutos → **Glacier Flexible Retrieval**; milisegundos → **Glacier Instant Retrieval**.",
      "Archivado más barato, recuperación en horas (~12h) → **Glacier Deep Archive**.",
      "Mover entre clases automáticamente por antigüedad → **S3 Lifecycle policies**.",
    ],
  },
  {
    titulo: "S3 · protección de datos",
    items: [
      "Evitar borrado/sobrescritura accidental → **Versioning** (+ MFA Delete).",
      "Cumplimiento WORM, no se puede borrar por X tiempo → **S3 Object Lock** (modo Compliance/Governance).",
      "Cifrado por defecto → **SSE-S3** (gratis) o **SSE-KMS** (control y auditoría de claves).",
      "Replicar a otra región (DR/latencia) → **Cross-Region Replication (CRR)**; misma región → **SRR**.",
      "Bloquear acceso público → **S3 Block Public Access**. Dar acceso temporal a un objeto → **presigned URL**.",
    ],
  },
  {
    titulo: "Bases de datos relacionales (RDS / Aurora)",
    items: [
      "Alta disponibilidad / failover automático → **RDS Multi-AZ** (réplica síncrona en otra AZ, NO escala lectura).",
      "Escalar lecturas / offload de reportes → **Read Replicas** (asíncronas; pueden ser cross-region).",
      "Máximo rendimiento y HA gestionada, hasta 15 réplicas → **Amazon Aurora**.",
      "Cargas intermitentes/impredecibles, escala a cero → **Aurora Serverless v2**.",
      "No querés administrar servidores ni capacidad → considerá **Aurora** o **DynamoDB** según el modelo.",
      "Migrar BD a AWS con mínimo downtime → **AWS DMS** (+ **SCT** si cambia el motor).",
    ],
  },
  {
    titulo: "DynamoDB (NoSQL)",
    items: [
      "Clave-valor/documento a escala, latencia de milisegundos → **DynamoDB**.",
      "Lecturas microsegundos / caché → **DAX**.",
      "Tráfico impredecible sin planificar capacidad → **On-Demand**; carga estable y predecible → **Provisioned** (+ Auto Scaling).",
      "Multi-región activo-activo → **Global Tables**.",
      "Reaccionar a cambios de ítems (event-driven) → **DynamoDB Streams** (+ Lambda).",
      "Expirar ítems automáticamente → **TTL**.",
    ],
  },
  {
    titulo: "Almacenamiento de bloques y archivos (EBS / EFS / FSx / Instance Store)",
    items: [
      "Disco para UNA instancia EC2, persistente → **EBS** (gp3 general; io2 para IOPS altas).",
      "Sistema de archivos compartido por MUCHAS instancias Linux (NFS) → **Amazon EFS** (escala solo).",
      "Compartido Windows (SMB) / Active Directory → **FSx for Windows File Server**.",
      "HPC / alto rendimiento → **FSx for Lustre**.",
      "Almacenamiento temporal ultra-rápido que se pierde al apagar → **Instance Store**.",
      "EBS es de una sola AZ; para multi-AZ compartido usá EFS.",
    ],
  },
  {
    titulo: "Desacoplar y mensajería (SQS / SNS / EventBridge / Kinesis)",
    items: [
      "Cola para desacoplar y absorber picos (1 productor → 1 consumidor procesa) → **SQS**.",
      "Orden estricto y sin duplicados → **SQS FIFO**.",
      "Pub/Sub: 1 mensaje a MUCHOS suscriptores (fan-out) → **SNS** (combiná SNS+SQS para fan-out durable).",
      "Enrutar eventos por reglas entre servicios/SaaS → **EventBridge**.",
      "Streaming de datos en tiempo real / analítica → **Kinesis Data Streams**.",
      "Mensajes que fallan repetidamente → **Dead-Letter Queue (DLQ)**.",
    ],
  },
  {
    titulo: "Balanceo de carga y Auto Scaling",
    items: [
      "HTTP/HTTPS, routing por path/host, capa 7 → **Application Load Balancer (ALB)**.",
      "TCP/UDP, latencia ultra baja, IP estática, millones de req → **Network Load Balancer (NLB)**.",
      "Escalar EC2 según demanda y reemplazar instancias enfermas → **Auto Scaling Group (ASG)** + health checks.",
      "Distribuir en varias AZ para alta disponibilidad → ASG en **múltiples Subnets/AZ** detrás del LB.",
      "Pre-calentar para picos previsibles → **Scheduled scaling**; por métrica → **Target Tracking**.",
    ],
  },
  {
    titulo: "CloudFront, caché y latencia global",
    items: [
      "Servir contenido estático/dinámico con baja latencia global → **CloudFront** (CDN, edge locations).",
      "Acelerar subidas/descargas globales a S3 → **S3 Transfer Acceleration**.",
      "Caché en memoria para BD (sesiones, leaderboards) → **ElastiCache** (Redis = persistencia/replicación; Memcached = simple).",
      "Restringir acceso a objetos S3 solo vía CloudFront → **Origin Access Control (OAC)**.",
      "Routing inteligente sobre la red de AWS para apps TCP/UDP → **Global Accelerator** (IP anycast estática).",
    ],
  },
  {
    titulo: "Route 53 · políticas de enrutamiento DNS",
    items: [
      "Failover a sitio de respaldo si el primario cae → **Failover routing** + health checks.",
      "Enviar al usuario a la región más cercana → **Latency-based** o **Geolocation/Geoproximity**.",
      "Repartir tráfico por porcentajes (A/B, canary) → **Weighted routing**.",
      "Apuntar el dominio raíz (apex) a un ALB/CloudFront → **Alias record** (no CNAME).",
    ],
  },
  {
    titulo: "VPC y redes",
    items: [
      "Salida a Internet de subred privada (solo egress) → **NAT Gateway** (gestionado, en subred pública).",
      "Entrada/salida a Internet de subred pública → **Internet Gateway (IGW)**.",
      "Acceder a S3/DynamoDB sin pasar por Internet → **Gateway VPC Endpoint** (gratis).",
      "Acceder a otros servicios AWS de forma privada → **Interface Endpoint (PrivateLink)**.",
      "Conectar dos VPC de forma privada → **VPC Peering** (no transitivo) o **Transit Gateway** (muchas VPC).",
      "Conexión privada dedicada al on-premises → **Direct Connect**; cifrada sobre Internet → **Site-to-Site VPN**.",
      "Firewall con estado a nivel instancia → **Security Group** (allow only). Sin estado a nivel subred → **NACL** (allow/deny).",
    ],
  },
  {
    titulo: "Identidad, seguridad y cifrado",
    items: [
      "Que EC2/Lambda accedan a servicios AWS sin claves en código → **IAM Role** (nunca claves de usuario).",
      "Permisos: dar SOLO lo necesario → **Least privilege**; agrupar usuarios → **IAM Groups**.",
      "Login/registro de usuarios de una app (web/móvil) → **Cognito User Pools**; acceso temporal a AWS → **Identity Pools**.",
      "Gestionar y rotar claves de cifrado con auditoría → **KMS**; secretos/credenciales con rotación → **Secrets Manager**.",
      "Proteger contra ataques web (SQLi, XSS) en ALB/CloudFront/API GW → **AWS WAF**; DDoS → **Shield** (Advanced para más).",
      "Aislar y gobernar múltiples cuentas → **AWS Organizations** + **SCPs**.",
      "MFA, no usar la cuenta root para el día a día.",
    ],
  },
  {
    titulo: "Cómputo y serverless",
    items: [
      "Ejecutar código sin servidores, por eventos, pago por uso → **Lambda** (máx 15 min por ejecución).",
      "API REST/HTTP gestionada hacia Lambda/servicios → **API Gateway**.",
      "Contenedores sin administrar servidores → **ECS/EKS on Fargate**.",
      "Workloads tolerantes a interrupción, hasta 90% más barato → **Spot Instances**.",
      "Carga estable 1-3 años, máximo ahorro → **Reserved Instances / Savings Plans**.",
      "Licencias dedicadas / compliance que exige host físico → **Dedicated Hosts**.",
      "Orquestar pasos/flujos serverless → **Step Functions**.",
    ],
  },
  {
    titulo: "Migración y transferencia de datos",
    items: [
      "Mover TB-PB con poco ancho de banda, físico → **AWS Snowball / Snowmobile**.",
      "Extender almacenamiento on-premises a la nube (híbrido) → **Storage Gateway** (File/Volume/Tape).",
      "Migrar bases de datos → **DMS** (+ **SCT** si cambia el motor).",
      "Subir muchos archivos a S3 rápido desde lejos → **S3 Transfer Acceleration** o **DataSync** (sincronización).",
      "Descubrir y planear migración de servidores → **Migration Hub / Application Discovery Service**.",
    ],
  },
  {
    titulo: "Costos · cómo optimizar (Dominio 4)",
    items: [
      "Ver y analizar gasto → **Cost Explorer**; alertas de presupuesto → **AWS Budgets**.",
      "Mover datos fríos a clases baratas automáticamente → **S3 Lifecycle + Intelligent-Tiering**.",
      "Cómputo estable → **Savings Plans / Reserved**; flexible/interrumpible → **Spot**.",
      "Apagar recursos no usados (dev/test fuera de horario) → **Instance Scheduler**.",
      "Pagar por uso real y escalar a cero → **serverless (Lambda, Aurora Serverless, DynamoDB On-Demand)**.",
      "Reducir transferencia de datos cara → cachear con **CloudFront** y usar **VPC Endpoints**.",
    ],
  },
  {
    titulo: "Resiliencia y recuperación ante desastres (DR)",
    items: [
      "Multi-AZ = alta disponibilidad dentro de una región; Multi-Region = DR ante caída de región.",
      "DR de menor costo, RTO/RPO altos → **Backup & Restore**.",
      "Servidor mínimo encendido → **Pilot Light**; entorno reducido siempre on → **Warm Standby**.",
      "Cero downtime, doble infra activa → **Multi-Site Active/Active** (más caro).",
      "Backups centralizados y automáticos → **AWS Backup**.",
      "Snapshots de EBS van a S3; copialos cross-region para DR.",
    ],
  },
  {
    titulo: "Monitoreo y operación",
    items: [
      "Métricas, logs y alarmas → **CloudWatch** (Alarms para reaccionar/escalar).",
      "Quién hizo qué (auditoría de API) → **CloudTrail**.",
      "Evaluar cumplimiento de configuración de recursos → **AWS Config**.",
      "Recomendaciones de costo/seguridad/rendimiento → **Trusted Advisor**.",
      "Inventario y automatización de parches en EC2 → **Systems Manager (SSM)**.",
    ],
  },
  {
    titulo: "Palabras clave del examen → pista de la respuesta",
    items: [
      "\"Sin administrar servidores / gestionado / managed\" → servicio **serverless o gestionado** (Lambda, Fargate, Aurora, DynamoDB).",
      "\"Más rentable / menor costo\" → la opción **más barata que cumpla** (Spot, IA/Glacier, serverless).",
      "\"Altamente disponible / tolerante a fallos\" → **Multi-AZ**, varias subredes, ASG, balanceador.",
      "\"Desacoplar / absorber picos / asíncrono\" → **SQS** (o SNS para fan-out).",
      "\"Mínimo esfuerzo operativo / least operational overhead\" → lo **más gestionado/serverless**.",
      "\"Acceso privado / sin pasar por Internet\" → **VPC Endpoint / PrivateLink**.",
      "\"Credenciales / claves en el código\" → casi siempre MAL; usar **IAM Roles**.",
    ],
  },
];
