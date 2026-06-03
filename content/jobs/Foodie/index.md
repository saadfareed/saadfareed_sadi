---
date: '2025-03-01'
title: 'Software Engineer II'
company: 'Foodie'
location: 'Lahore, PK'
range: 'March 2025 - Present'
---

- Owned the end-to-end backend lifecycle of a multi-tenant, high-throughput order platform; implemented PCI DSS-compliant checkout supporting 4 payment methods (card, cash, wallet, hybrid) using a distributed Saga pattern.

- Built a unified refund system that handles all cancellation scenarios (customer, vendor, system-initiated) across mixed-payment orders, ensuring full financial integrity and auditability at scale.

- Architected core revenue and payout infrastructure for vendors, delivery partners, and influencers; built influencer commission tracking via gRPC-based microservices across Python (Django, FastAPI) and Node.js.

- Designed a multi-database system: MongoDB for menus/social posts, Cassandra for high-write order events, and Elasticsearch for real-time search with sub-100ms response times.

- Built a real-time order notification backbone using MQTT + Redis pub/sub, delivering stage-specific updates to customers and store managers instantly.

- Led a monolith-to-microservices migration, extracting payments, promotions, and orders into independent, scalable services.
