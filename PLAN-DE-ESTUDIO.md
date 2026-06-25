# Plan de estudio nocturno · AWS SAA-C03 (examen mañana)

> Objetivo realista para una noche: **dominar las decisiones más preguntadas** y entrenar el
> razonamiento por escenarios. No intentes memorizar todo: el examen pregunta *"cuál es la MEJOR
> opción"*, no definiciones. Descansá aunque sea unas horas antes del examen — el cerebro consolida
> mejor con algo de sueño que con cero.

## Datos del examen
- **65 preguntas** (50 puntúan, 15 son piloto y no cuentan) · **130 minutos**.
- Aprobar: **720 / 1000** (~72%).
- Tipos: opción única (1 de 4) y **respuesta múltiple** (2+ de 5+). En las múltiples, lee cuántas pide.
- Dominios: **D1 Seguras 30% · D2 Resilientes 26% · D3 Alto rendimiento 24% · D4 Costos 20%**.

## Ruta de la noche (ajustá las horas a tu disponibilidad)

| Bloque | Tiempo | Qué hacer en la plataforma |
|-------|--------|----------------------------|
| 1 | 0:00–0:30 | **Chuleta** completa. Léela entera; es lo de mayor rendimiento. Volvé a ella entre bloques. |
| 2 | 0:30–2:00 | **Práctica → D1 Seguras** y **D2 Resilientes** (los de más peso). Lee TODA explicación, marca (★) las dudosas. |
| 3 | 2:00–3:00 | **Práctica → D3 Alto rendimiento** y **D4 Costos**. |
| 4 | 3:00–4:00 | **Simulacro** completo (65 pre., cronómetro). Anota tu score y el % por dominio. |
| 5 | 4:00–5:00 | **Repaso inteligente** (solo falladas + marcadas). Repite hasta que las entiendas, no las memorices. |
| 6 | 5:00–6:00 | **Segundo simulacro**. Meta ≥ 80%. Repasá la chuleta una última vez. |
| — | antes del examen | Dormí algo, hidratate, desayuná. Llegá con tiempo. |

## Cómo pensar cada pregunta (técnica de examen)
1. **Lee primero qué se pide**: ¿"más rentable"? ¿"alta disponibilidad"? ¿"mínimo esfuerzo operativo"? Esa palabra define la respuesta.
2. **Descarta las claramente malas** (claves en el código, hacer algo público, una sola AZ, root para todo).
3. Entre las que quedan, elegí la que cumple el requisito clave **con menos costo/operación**.
4. **Marca y avanza** si dudas; volvé al final con el mapa de preguntas. No te claves en una.
5. En **respuesta múltiple**, cada opción es verdadera o falsa por separado; la calificación es todo-o-nada.

## Atajos mentales (palabra clave → pista)
- "sin administrar / gestionado / managed / serverless" → **Lambda, Fargate, Aurora, DynamoDB**.
- "más rentable / menor costo" → la opción barata que cumpla (**Spot, S3-IA/Glacier, serverless, Savings Plans**).
- "altamente disponible / tolerante a fallos" → **Multi-AZ + varias subredes + ASG + LB**.
- "desacoplar / picos / asíncrono" → **SQS** (o **SNS** para fan-out a varios).
- "mínimo esfuerzo operativo" → lo **más gestionado/serverless**.
- "acceso privado / sin Internet" → **VPC Endpoint / PrivateLink**.
- "credenciales/keys en el código" → casi siempre MAL → **IAM Roles**.
- "DR barato, RTO alto" → **Backup & Restore**; "DR rápido" → **Warm Standby / Active-Active**.
- "RPO" = pérdida de datos tolerable; "RTO" = tiempo para recuperarse.

## Temas que más rinde dominar (alto retorno)
1. **S3**: clases (Standard / IA / One Zone-IA / Glacier / Deep Archive / Intelligent-Tiering), Lifecycle, versioning, Object Lock, cifrado, Block Public Access.
2. **Bases de datos**: RDS Multi-AZ (HA) vs Read Replica (escala lectura), Aurora, DynamoDB + DAX.
3. **Redes/VPC**: NAT Gateway vs IGW, Gateway vs Interface Endpoint, SG vs NACL, Peering vs Transit Gateway, Direct Connect vs VPN.
4. **Desacople**: SQS (FIFO/DLQ), SNS (fan-out), EventBridge, Kinesis.
5. **Cómputo**: EC2 (Spot/Reserved/Savings Plans), Lambda (límite 15 min), ECS/EKS Fargate, ASG (target tracking, scheduled, lifecycle hooks).
6. **Alta disponibilidad/DR**: Multi-AZ vs Multi-Region, estrategias de DR, AWS Backup, snapshots cross-region.
7. **Seguridad**: IAM Roles, mínimo privilegio, KMS/Secrets Manager, WAF/Shield, Cognito, Organizations/SCP.
8. **Costos**: Savings Plans/RI vs Spot, S3 Lifecycle, Budgets/Cost Explorer, VPC Endpoints para ahorrar egress.

## Después del simulacro
- Mira el **% por dominio**. El dominio donde estés más flojo es donde más sube tu nota repasar.
- Pasa por **"Revisar todas con explicación"** y lee el porqué de cada error.
- Reglas de pulgar: si en los simulacros sacás **≥ 80%** de forma consistente, vas con buen margen para el 72% real.

¡Éxitos! 🚀
