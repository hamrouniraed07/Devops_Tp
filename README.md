# Application MERN avec Kubernetes

## Aperçu du Projet

Ce projet démontre le déploiement d'une application MERN (MongoDB, Express.js, React, Node.js) sur un cluster Kubernetes. Il inclut :
- Déploiement des conteneurs avec Kubernetes
- Gestion de la configuration via ConfigMap
- Services pour la communication entre les composants
- Mise à l'échelle et mises à jour sans temps d'arrêt

## Structure du Projet

```
kubernetes-mern-app/
├── kubernetes/                  # Fichiers de configuration Kubernetes
│   ├── app-configmap.yaml       # Configuration des variables d'environnement
│   ├── mongodb-deployment.yaml  # Déploiement MongoDB
│   ├── mongodb-service.yaml     # Service MongoDB (ClusterIP)
│   ├── server-deployment.yaml   # Déploiement du serveur Node.js
│   ├── server-service.yaml      # Service du serveur (NodePort 30001)
│   ├── client-deployment.yaml   # Déploiement du client React
│   └── client-service.yaml      # Service du client (NodePort 30002)
└── screenshots/                 # Captures d'écran du déploiement
```

## Prérequis

- Docker Desktop avec Kubernetes activé
- kubectl installé et configuré
- Accès à un cluster Kubernetes (local ou distant)

## Déploiement

1. **Appliquer les configurations**
   ```bash
   cd kubernetes
   kubectl apply -f .
   ```

2. **Vérifier les déploiements**
   ```bash
   kubectl get all
   ```

3. **Accéder à l'application**
   - Client: http://localhost:30002
   - API Server: http://localhost:30001

## Opérations

### Mise à l'échelle
```bash
kubectl scale deployment server-deployment --replicas=5
```

### Mise à jour d'image
```bash
kubectl set image deployment/client-deployment mern-client=raefgaied4/mern-client:v2
```

### Surveillance
```bash
# Voir les logs du serveur
kubectl logs -l app=mern-server

# Voir les logs du client
kubectl logs -l app=mern-client
```

## Journal des Opérations

### 1. Configuration Initiale
- Application du ConfigMap
  ![Apply ConfigMap](screenshots/apply_configmap.png)

- Déploiement de MongoDB
  ![Apply MongoDB](screenshots/apply_mongo.png)
  ![MongoDB Service](screenshots/apply_mongo_service.png)

### 2. Déploiement du Serveur
- Déploiement du serveur
  ![Server Deployment](screenshots/apply_service_deploy.png)
  
- Service du serveur
  ![Server Service](screenshots/apply_server_service.png)

### 3. Déploiement du Client
- Déploiement du client
  ![Client Deployment](screenshots/apply_client_deploy.png)
  
- Service du client
  ![Client Service](screenshots/apply_client_service.png)

### 4. Vérifications
- Vue d'ensemble du cluster
  ![Cluster Nodes](screenshots/cluster_nodes.png)
  
- Détails des déploiements
  ![Deployments](screenshots/get_deployments.png)
  
- État des pods
  ![Pods](screenshots/get_pods.png)

### 5. Logs d'Application
- Logs du serveur
  ![Server Logs](screenshots/logs_app_mern_server.png)
  
- Logs du client
  ![Client Logs](screenshots/logs_app_mern_client.png)

### 6. Mise à l'Échelle
- Scaling à 5 réplicas
  ![Scale to 5 Replicas](screenshots/scale_5_replicate.png)

### 7. Mise à Jour
- Mise à jour de l'image
  ![Set Image](screenshots/set_image.png)

### 8. Vérification de l'Application
- Vue dans le navigateur
  ![Application](screenshots/localhost_check_url.png)
  
- Vue dans Docker/Kubernetes
  ![Docker Kubernetes View](screenshots/vue_dans_docker_kubernetes.png)

### 9. Nettoyage
- Suppression des ressources
  ![Delete Resources](screenshots/delete_ressources.png)

## Nettoyage

Pour supprimer toutes les ressources :
```bash
kubectl delete -f .
```

## Observations

- Tous les composants communiquent correctement
- La configuration via ConfigMap fonctionne comme prévu
- Les opérations de mise à l'échelle sont efficaces
- Les mises à jour se font sans interruption de service

## Auteur & Cours

- **Auteur**: Raef Gaied
- **Cours**: DevOps 2025-26
- **Professeur**: Dr. Salah Gontara
- **Date**: Novembre 2025

